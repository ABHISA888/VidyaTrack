/**
 * Pure functions for ASER data processing (no UI logic)
 */

export const getNational = (data, year, grade, metric) => {
  const row = data.find(r => 
    r.State === "All India" && 
    r.Year === parseInt(year) && 
    (grade === 'all' || r.Grade_Num === parseInt(grade))
  );
  if (!row) return null;
  return row[getMetricKey(metric)];
};

export const getStateValue = (data, state, year, grade, metric) => {
  const row = data.find(r => 
    r.State === state && 
    r.Year === parseInt(year) && 
    (grade === 'all' || r.Grade_Num === parseInt(grade))
  );
  if (!row) return null;
  return row[getMetricKey(metric)];
};

export const getTrendSeries = (data, states, grade, metric) => {
  const years = [...new Set(data.filter(r => r.Year).map(r => r.Year))].sort();
  return years.map(yr => {
    const entry = { year: yr };
    states.forEach(state => {
      const row = data.find(r => 
        r.State === state && 
        r.Year === yr && 
        (grade === 'all' || r.Grade_Num === parseInt(grade))
      );
      entry[state] = row ? row[getMetricKey(metric)] : null;
    });
    return entry;
  });
};

export const getStateRanking = (data, year, grade, metric, order = 'asc') => {
  const metricKey = getMetricKey(metric);
  const rows = data.filter(r => 
    r.State !== "All India" && 
    r.Year === parseInt(year) && 
    (grade === 'all' || r.Grade_Num === parseInt(grade)) &&
    r[metricKey] !== null
  );

  return rows.sort((a, b) => {
    if (order === 'asc') return a[metricKey] - b[metricKey];
    return b[metricKey] - a[metricKey];
  }).map(r => ({
    State: r.State,
    Value: r[metricKey],
    Risk_Category: r.Risk_Category
  }));
};

export const getRiskSummaryTable = (data, year) => {
  const states = [...new Set(data.filter(r => r.State !== "All India").map(r => r.State))];
  const nationalGr5Read = getNational(data, year, 5, 'read') || 0;

  return states.map(state => {
    const gr3Read = getStateValue(data, state, year, 3, 'read');
    const gr5Read = getStateValue(data, state, year, 5, 'read');
    const gr3Sub = getStateValue(data, state, year, 3, 'sub');
    const gr5Div = getStateValue(data, state, year, 5, 'div');
    const risk = data.find(r => r.State === state && r.Year === parseInt(year))?.Risk_Category || "Moderate";

    return {
      State: state,
      Risk_Category: risk,
      Gr3_Read: gr3Read,
      Gr5_Read: gr5Read,
      Gr3_Sub: gr3Sub,
      Gr5_Div: gr5Div,
      GapVsNational: gr5Read !== null ? (gr5Read - nationalGr5Read).toFixed(1) : null
    };
  });
};

export const computePriorityScore = (stateRow, nationalAvg) => {
  // score = (nationalAvg.read - state.gr5Read) * 0.40
  //        + (nationalAvg.div - state.gr5Div) * 0.35
  //        + (yearsBelow25pct * 10) * 0.25 (estimating this from current row if trend is not available)
  
  // NOTE: yearsBelow25pct calculation would ideally look at historical data, but if we only have current row:
  const yearsBelow25pct = stateRow.Gr5_Read < 25 ? 1 : 0; 
  
  const score = ((nationalAvg.read - (stateRow.Gr5_Read || 0)) * 0.40) +
                ((nationalAvg.div - (stateRow.Gr5_Div || 0)) * 0.35) +
                ((yearsBelow25pct * 10) * 0.25);

  let label = "P3";
  if (score > 20) label = "P1";
  else if (score > 10) label = "P2";
  else if (score > 0) label = "P3";

  return { score: score.toFixed(1), label };
};

export const getDistributionData = (data, year, grade) => {
  const readPct = getNational(data, year, grade, 'read') || 0;
  // ASER breakdown (story, paragraph, word, letter, nothing)
  // readPct = Std II level (story)
  // We can approximate the distribution using typical ASER curves:
  // story = readPct
  // paragraph = (90 - readPct) * 0.3
  // words = (90 - readPct) * 0.4
  // letters = (90 - readPct) * 0.2
  // cannot = 100 - all above
  
  return [
    { level: 'Cannot Read', value: Math.max(0, 10 - (readPct * 0.05)) },
    { level: 'Letters', value: Math.max(0, (100 - readPct) * 0.2) },
    { level: 'Words', value: Math.max(0, (100 - readPct) * 0.3) },
    { level: 'Paragraph', value: Math.max(0, (100 - readPct) * 0.25) },
    { level: 'Story (Std II)', value: readPct }
  ];
};

export const buildAIContext = (data) => {
  const currentYear = 2024;
  const natReading = getNational(data, currentYear, 5, 'read');
  const natDiv = getNational(data, currentYear, 5, 'div');
  const bottomStates = getStateRanking(data, currentYear, 5, 'read', 'asc').slice(0, 3);
  
  return `VidyaTrack Educational Intelligence Report (Context for AI Advisor)
Dataset: ASER 2018-2024
Current National (Grade 5): Reading ${natReading}%, Division ${natDiv}%
Top 3 Critical States: ${bottomStates.map(s => `${s.State} (${s.Value}%)`).join(', ')}
Key Trends: Reading levels show a COVID drop and slow recovery.
Historical Context: Bihar and Jharkhand consistently show learning gaps despite high enrollment.
Goal: Support DEO in data-driven interventions.`;
};

// Internal mapping
function getMetricKey(metric) {
  switch (metric) {
    case 'read': return 'Reading_AtLevel_Pct';
    case 'sub': return 'Arith_Subtraction_Pct';
    case 'div': return 'Arith_Division_Pct';
    default: return 'Reading_AtLevel_Pct';
  }
}
