import React, { useMemo } from 'react';
import TrendLineChart from '../charts/TrendLineChart';
import HorizontalBarChart from '../charts/HorizontalBarChart';
import { useFilters } from '../../context/FilterContext';
import { getTrendSeries, getNational } from '../../data/dataUtils';

const GradeTrendsTab = ({ data }) => {
  const { filters } = useFilters();
  const { year } = filters;

  const readingTrend = useMemo(() => {
    // Generate trends for All India across grades 3, 4, 5
    const years = [2018, 2019, 2021, 2022, 2024];
    return years.map(yr => ({
      year: yr,
      'Grade 3': getNational(data, yr, 3, 'read'),
      'Grade 4': getNational(data, yr, 4, 'read'),
      'Grade 5': getNational(data, yr, 5, 'read')
    }));
  }, [data]);

  const mathTrend = useMemo(() => {
    const years = [2018, 2019, 2021, 2022, 2024];
    return years.map(yr => ({
      year: yr,
      'Gr3 Subtraction': getNational(data, yr, 3, 'sub'),
      'Gr5 Division': getNational(data, yr, 5, 'div')
    }));
  }, [data]);

  const masteryData = useMemo(() => {
    return {
      reading: [
        { name: 'Std II Text (Gr5)', value: getNational(data, year, 5, 'read'), color: '#0A6E5E' },
        { name: 'Std II Text (Gr4)', value: getNational(data, year, 4, 'read'), color: '#5eead4' },
        { name: 'Std II Text (Gr3)', value: getNational(data, year, 3, 'read'), color: '#99f6e4' }
      ],
      arithmetic: [
        { name: 'Division (Gr5)', value: getNational(data, year, 5, 'div'), color: '#C94C0C' },
        { name: 'Subtraction (Gr3)', value: getNational(data, year, 3, 'sub'), color: '#fbbf24' }
      ]
    };
  }, [data, year]);

  return (
    <div className="space-y-10 animate-fade-in p-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm">
          <h3 className="text-sm font-bold text-gray-400 uppercase tracking-[0.2em] mb-8">Reading Proficiency Evolution (All India)</h3>
          <TrendLineChart 
            data={readingTrend} 
            lines={[
              { key: 'Grade 3', color: '#94a3b8', label: 'Grade 3' },
              { key: 'Grade 4', color: '#64748b', label: 'Grade 4' },
              { key: 'Grade 5', color: '#1A3356', label: 'Grade 5' }
            ]} 
          />
        </div>

        <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm">
          <h3 className="text-sm font-bold text-gray-400 uppercase tracking-[0.2em] mb-8">The Arithmetic Gap: Subtraction to Division</h3>
          <TrendLineChart 
            data={mathTrend} 
            lines={[
              { key: 'Gr3 Subtraction', color: '#fbbf24', label: 'Gr3 Subtraction' },
              { key: 'Gr5 Division', color: '#C94C0C', label: 'Gr5 Division' }
            ]} 
          />
        </div>
      </div>

      <div className="bg-white p-10 rounded-2xl border border-gray-100 shadow-sm">
        <div className="flex justify-between items-end mb-10">
          <div>
            <h3 className="text-sm font-bold text-gray-400 uppercase tracking-[0.2em] mb-2">Mastery Ladder</h3>
            <p className="text-2xl font-syne font-bold text-navy uppercase tracking-tight">Competency Benchmarks • {year}</p>
          </div>
          <div className="bg-navy px-4 py-2 rounded-lg text-white text-[10px] font-bold uppercase tracking-widest border-b-2 border-saffron">
            National Performance
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
          <div>
            <h4 className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-6 border-l-2 border-teal pl-3">Literacy Mastery</h4>
            <HorizontalBarChart data={masteryData.reading} />
          </div>
          <div>
            <h4 className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-6 border-l-2 border-saffron pl-3">Arithmetic Mastery</h4>
            <HorizontalBarChart data={masteryData.arithmetic} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default GradeTrendsTab;
