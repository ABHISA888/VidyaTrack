import React, { useMemo } from 'react';
import KPICard from '../shared/KPICard';
import StackedLevelBar from '../charts/StackedLevelBar';
import HorizontalBarChart from '../charts/HorizontalBarChart';
import TrendLineChart from '../charts/TrendLineChart';
import InsightBox from '../shared/InsightBox';
import { useFilters } from '../../context/FilterContext';
import { getNational, getTrendSeries, getDistributionData, getStateRanking } from '../../data/dataUtils';

const OverviewTab = ({ data }) => {
  const { filters } = useFilters();
  const { year } = filters;

  const kpis = useMemo(() => {
    const prevYear = year === 2024 ? 2022 : (year === 2022 ? 2021 : (year === 2021 ? 2019 : 2018));
    
    const getVal = (g, m, y) => getNational(data, y, g, m);
    
    const metrics = [
      { label: 'Grade 5 Reading', g: 5, m: 'read' },
      { label: 'Grade 3 Reading', g: 3, m: 'read' },
      { label: 'Grade 5 Division', g: 5, m: 'div' },
      { label: 'Grade 3 Subtraction', g: 3, m: 'sub' }
    ];

    return metrics.map(m => {
      const val = getVal(m.g, m.m, year);
      const oldVal = getVal(m.g, m.m, prevYear);
      return {
        label: m.label,
        value: val,
        change: (val !== null && oldVal !== null) ? (val - oldVal) : null,
        context: `ALL INDIA • ${year}`
      };
    });
  }, [data, year]);

  const distributionData = useMemo(() => getDistributionData(data, year, 5), [data, year]);
  
  const divisionRankings = useMemo(() => {
    const all = getStateRanking(data, year, 5, 'div', 'desc');
    return all.slice(0, 5).map(r => ({ name: r.State, value: r.Value, color: '#0A6E5E' }));
  }, [data, year]);

  const biharTrend = useMemo(() => getTrendSeries(data, ['Bihar', 'All India'], 5, 'read'), [data]);
  const govtTrend = useMemo(() => getTrendSeries(data, ['All India'], 5, 'read'), [data]);

  return (
    <div className="space-y-10 animate-fade-in p-8">
      {/* Row 1: KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {kpis.map((kpi, idx) => (
          <KPICard 
            key={idx}
            label={kpi.label}
            value={kpi.value}
            change={kpi.change}
            context={kpi.context}
            accentColor={idx % 2 === 0 ? 'navy' : 'saffron'}
          />
        ))}
      </div>

      {/* Row 2: Reading Distribution & Division cliff */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm flex flex-col justify-between">
          <div>
            <h3 className="text-sm font-bold text-gray-400 uppercase tracking-[0.2em] mb-8">Reading Proficiency Distribution (Grade 5)</h3>
            <StackedLevelBar 
              segments={[
                { label: 'Cannot Read', value: distributionData[0].value, color: '#fca5a5' },
                { label: 'Letters', value: distributionData[1].value, color: '#fdba74' },
                { label: 'Words', value: distributionData[2].value, color: '#fbbf24' },
                { label: 'Paragraph', value: distributionData[3].value, color: '#5eead4' },
                { label: 'Story (Std II)', value: distributionData[4].value, color: '#0A6E5E' }
              ]} 
            />
          </div>
          <div className="mt-10">
            <InsightBox 
              label="Learning Recovery Insight"
              text={`Post-COVID data indicates a significant increase in the "Word" band, while "Story" level reading shows a ${kpis[0].change < 0 ? 'decline' : 'slight recovery'} of ${Math.abs(kpis[0].change).toFixed(1)}pp.`}
              highlightNumber={kpis[0].value}
              highlightLabel="National Proficiency"
            />
          </div>
        </div>

        <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm flex flex-col justify-between">
          <div>
            <h3 className="text-sm font-bold text-gray-400 uppercase tracking-[0.2em] mb-8">Top Performing States (Grade 5 Division)</h3>
            <HorizontalBarChart data={divisionRankings} targetLine={kpis[2].value} />
          </div>
          <div className="mt-4">
            <InsightBox 
              label="The Division Cliff"
              text="Grade 5 Division is a critical 'cliff' metric. States falling below 40% typically see high dropout rates in middle school."
              highlightNumber={`${kpis[2].value}%`}
              highlightLabel="National Average"
            />
          </div>
        </div>
      </div>

      {/* Row 3: Trends */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm">
          <h3 className="text-sm font-bold text-gray-400 uppercase tracking-[0.2em] mb-8">Bihar Proficiency Benchmark (Grade 5 Reading)</h3>
          <TrendLineChart 
            data={biharTrend} 
            lines={[
              { key: 'Bihar', color: '#C94C0C', label: 'Bihar' },
              { key: 'All India', color: '#1A3356', label: 'All India', dashed: true }
            ]} 
          />
        </div>

        <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm">
          <h3 className="text-sm font-bold text-gray-400 uppercase tracking-[0.2em] mb-8">Government School Progress (Grade 5 Reading)</h3>
          <TrendLineChart 
            data={govtTrend} 
            lines={[
              { key: 'All India', color: '#1A3356', label: 'All India (Govt Schools)' }
            ]} 
          />
        </div>
      </div>

      {/* Row 4: Static Features */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 opacity-80">
        {[
          { title: "Evidence Based", desc: "Powered by 15 years of ASER household data cycles." },
          { title: "DEO Focused", desc: "Designed for district administrative decision support." },
          { title: "Action Oriented", desc: "Links insights directly to intervention logging." }
        ].map((item, idx) => (
          <div key={idx} className="bg-white/50 border border-dashed border-gray-200 p-6 rounded-xl">
            <h4 className="font-syne font-bold uppercase text-[11px] text-navy mb-2 tracking-widest">{item.title}</h4>
            <p className="text-xs text-gray-500 font-medium">{item.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OverviewTab;
