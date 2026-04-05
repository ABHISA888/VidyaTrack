import React, { useMemo, useState } from 'react';
import { ChevronUp, ChevronDown, Search, ArrowUpRight } from 'lucide-react';
import HorizontalBarChart from '../charts/HorizontalBarChart';
import SchoolDetailModal from '../modals/SchoolDetailModal';
import Badge from '../shared/Badge';
import { useFilters } from '../../context/FilterContext';
import { getStateRanking, getRiskSummaryTable } from '../../data/dataUtils';

const StateRiskTab = ({ data }) => {
  const { filters } = useFilters();
  const { year } = filters;
  
  const [sortKey, setSortKey] = useState('Gr5_Read');
  const [sortOrder, setSortOrder] = useState('asc');
  const [selectedState, setSelectedState] = useState(null);

  const topBottomData = useMemo(() => {
    const all = getStateRanking(data, year, 5, 'read', 'asc');
    return {
      bottom: all.slice(0, 6).map(r => ({ name: r.State, value: r.Value, color: '#C94C0C' })),
      top: [...all].sort((a,b) => b.Value - a.Value).slice(0, 5).map(r => ({ name: r.State, value: r.Value, color: '#0A6E5E' }))
    };
  }, [data, year]);

  const tableData = useMemo(() => {
    const raw = getRiskSummaryTable(data, year);
    return raw.sort((a, b) => {
      const valA = a[sortKey];
      const valB = b[sortKey];
      if (valA === null) return 1;
      if (valB === null) return -1;
      return sortOrder === 'asc' ? valA - valB : valB - valA;
    });
  }, [data, year, sortKey, sortOrder]);

  const handleSort = (key) => {
    if (sortKey === key) setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    else {
      setSortKey(key);
      setSortOrder('desc');
    }
  };

  const getCellColor = (val, metric) => {
    if (val === null) return '';
    if (metric === 'read') {
      if (val < 25) return 'bg-red-50 text-red-700 font-bold';
      if (val < 45) return 'bg-amber-50 text-amber-700 font-bold';
      if (val > 60) return 'bg-green-50 text-green-700 font-bold';
    }
    return '';
  };

  return (
    <div className="space-y-10 animate-fade-in p-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm">
          <h3 className="text-sm font-bold text-red-700 uppercase tracking-[0.2em] mb-8">Priority Attention: Bottom 6 States (Reading Prof.)</h3>
          <HorizontalBarChart data={topBottomData.bottom} />
        </div>

        <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm">
          <h3 className="text-sm font-bold text-teal uppercase tracking-[0.2em] mb-8">Role Models: Top 5 Performing States (Reading Prof.)</h3>
          <HorizontalBarChart data={topBottomData.top} />
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 shadow-xl overflow-hidden">
        <div className="bg-navy p-6 flex flex-wrap justify-between items-center gap-4 border-b-4 border-saffron">
          <div>
            <h3 className="text-white font-syne font-bold uppercase tracking-tight text-lg">State Performance Intelligence Table</h3>
            <p className="text-[10px] font-bold text-blue-300 uppercase tracking-widest mt-1">Foundational Literacy & Arithmetic Matrix • {year}</p>
          </div>
          <div className="flex bg-white/10 px-4 py-2 rounded-xl text-white text-xs border border-white/10">
            <Search size={14} className="mr-3 text-blue-300" />
            <span className="text-blue-200">Interactive Sort & Drill-down Mode</span>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-100">
                <th className="p-5 text-[10px] font-bold text-gray-400 uppercase tracking-widest cursor-pointer group" onClick={() => handleSort('State')}>
                  <div className="flex items-center gap-2">State {sortKey === 'State' && <ChevronUp size={12} className={sortOrder === 'desc' ? 'rotate-180' : ''} />}</div>
                </th>
                <th className="p-5 text-[10px] font-bold text-gray-400 uppercase tracking-widest cursor-pointer group" onClick={() => handleSort('Risk_Category')}>
                  <div className="flex items-center gap-2">Risk Band {sortKey === 'Risk_Category' && <ChevronUp size={12} className={sortOrder === 'desc' ? 'rotate-180' : ''} />}</div>
                </th>
                <th className="p-5 text-[10px] font-bold text-gray-400 uppercase tracking-widest cursor-pointer" onClick={() => handleSort('Gr3_Read')}>
                  <div className="flex items-center gap-2">Gr3 Read% {sortKey === 'Gr3_Read' && <ChevronUp size={12} className={sortOrder === 'desc' ? 'rotate-180' : ''} />}</div>
                </th>
                <th className="p-5 text-[10px] font-bold text-gray-400 uppercase tracking-widest cursor-pointer" onClick={() => handleSort('Gr5_Read')}>
                  <div className="flex items-center gap-2">Gr5 Read% {sortKey === 'Gr5_Read' && <ChevronUp size={12} className={sortOrder === 'desc' ? 'rotate-180' : ''} />}</div>
                </th>
                <th className="p-5 text-[10px] font-bold text-gray-400 uppercase tracking-widest cursor-pointer" onClick={() => handleSort('Gr3_Sub')}>
                  <div className="flex items-center gap-2">Gr3 Sub% {sortKey === 'Gr3_Sub' && <ChevronUp size={12} className={sortOrder === 'desc' ? 'rotate-180' : ''} />}</div>
                </th>
                <th className="p-5 text-[10px] font-bold text-gray-400 uppercase tracking-widest cursor-pointer" onClick={() => handleSort('Gr5_Div')}>
                  <div className="flex items-center gap-2">Gr5 Div% {sortKey === 'Gr5_Div' && <ChevronUp size={12} className={sortOrder === 'desc' ? 'rotate-180' : ''} />}</div>
                </th>
                <th className="p-5 text-[10px] font-bold text-gray-400 uppercase tracking-widest cursor-pointer" onClick={() => handleSort('GapVsNational')}>
                  <div className="flex items-center gap-2">Gap Vs Nat. {sortKey === 'GapVsNational' && <ChevronUp size={12} className={sortOrder === 'desc' ? 'rotate-180' : ''} />}</div>
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {tableData.map((row, idx) => (
                <tr 
                  key={idx} 
                  className="hover:bg-blue-50/50 transition-colors cursor-pointer group"
                  onClick={() => setSelectedState(row)}
                >
                  <td className="p-5 py-4">
                    <div className="flex items-center gap-3">
                      <span className="font-bold text-navy text-sm uppercase tracking-tight">{row.State}</span>
                      <ArrowUpRight size={14} className="text-navy/20 group-hover:text-navy group-hover:translate-x-1 transition-all" />
                    </div>
                  </td>
                  <td className="p-5 py-4"><Badge label={row.Risk_Category} variant={row.Risk_Category} /></td>
                  <td className={`p-5 py-4 text-xs font-bold ${getCellColor(row.Gr3_Read, 'read')}`}>{row.Gr3_Read || '—'}%</td>
                  <td className={`p-5 py-4 text-xs font-bold ${getCellColor(row.Gr5_Read, 'read')}`}>{row.Gr5_Read || '—'}%</td>
                  <td className="p-5 py-4 text-xs font-medium text-gray-600">{row.Gr3_Sub || '—'}%</td>
                  <td className="p-5 py-4 text-xs font-medium text-gray-600">{row.Gr5_Div || '—'}%</td>
                  <td className={`p-5 py-4 text-xs font-bold ${row.GapVsNational < 0 ? 'text-red-600' : 'text-teal'}`}>
                    {row.GapVsNational > 0 ? `+${row.GapVsNational}` : row.GapVsNational} pp
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <SchoolDetailModal 
        isOpen={!!selectedState} 
        onClose={() => setSelectedState(null)} 
        stateName={selectedState?.State} 
        data={selectedState} 
      />
    </div>
  );
};

export default StateRiskTab;
