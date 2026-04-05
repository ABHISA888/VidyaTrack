import { useState, useEffect } from 'react';
import Papa from 'papaparse';

const CSV_PATH = '/data/ASER_FULL_Grade3_4_5_AllStates.csv';

export const useASERData = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(CSV_PATH);
        if (!response.ok) throw new Error('Failed to fetch dataset');
        const csvString = await response.text();

        Papa.parse(csvString, {
          header: true,
          dynamicTyping: true,
          skipEmptyLines: true,
          complete: (results) => {
            const processed = results.data.map(row => ({
              ...row,
              Year: parseInt(row.Year) || null,
              Grade_Num: parseInt(row.Grade_Num) || null,
              Reading_AtLevel_Pct: parseToFloat(row.Reading_AtLevel_Pct),
              Arith_Subtraction_Pct: parseToFloat(row.Arith_Subtraction_Pct),
              Arith_Division_Pct: parseToFloat(row.Arith_Division_Pct),
            }));
            setData(processed);
            setLoading(false);
          },
          error: (err) => {
            setError(`Parsing error: ${err.message}`);
            setLoading(false);
          }
        });
      } catch (err) {
        setError(`Fetch error: ${err.message}`);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return { data, loading, error };
};

function parseToFloat(val) {
  if (val === 'NA' || val === '' || val === null || val === undefined) return null;
  const num = parseFloat(val);
  return isNaN(num) ? null : num;
}
