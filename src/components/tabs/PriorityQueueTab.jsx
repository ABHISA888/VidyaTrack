import React, { useMemo, useState } from 'react';
import { Target, AlertTriangle, Play, HelpCircle } from 'lucide-react';
import HorizontalBarChart from '../charts/HorizontalBarChart';
import LogInterventionModal from '../modals/LogInterventionModal';
import Badge from '../shared/Badge';
import Toast from '../shared/Toast';
import { useFilters } from '../../context/FilterContext';
import { getRiskSummaryTable, computePriorityScore, getNational } from '../../data/dataUtils';

const PriorityQueueTab = ({ data }) => {
  const { filters } = useFilters();
  const { year, region } = filters;
  
  const [showLogModal, setShowLogModal] = useState(false);
  const [selectedState, setSelectedState] = useState(null);
  const [showToast, setShowToast] = useState(false);

  const nationalMetrics = useMemo(() => ({
    read: getNational(data, year, 5, 'read') || 0,
    div: getNational(data, year, 5, 'div') || 0
  }), [data, year]);

  const priorityRanking = useMemo(() => {
    const states = getRiskSummaryTable(data, year);
    const ranked = states.map(s => {
      const { score, label } = computePriorityScore(s, nationalMetrics);
      return { ...s, priorityScore: parseFloat(score), priorityLabel: label };
    }).sort((a,b) => b.priorityScore - a.priorityScore);

    if (region !== 'all') {
       return ranked.filter(s => s.Risk_Category.toLowerCase().replace(' ', '') === region);
    }
    return ranked;
  }, [data, year, nationalMetrics, region]);

  const riskDistribution = useMemo(() => {
    const counts = { 'Critical': 0, 'High Risk': 0, 'Moderate': 0, 'Good': 0 };
    priorityRanking.forEach(s => {
      if (counts[s.Risk_Category] !== undefined) counts[s.Risk_Category]++;
    });
    return Object.entries(counts).map(([name, count]) => ({ 
      name, 
      value: count, 
      color: name === 'Critical' ? '#B91C1C' : (name === 'High Risk' ? '#C94C0C' : (name === 'Moderate' ? '#B45309' : '#0A6E5E')) 
    }));
  }, [priorityRanking]);

  const handleSaveIntervention = (entry) => {
    setShowLogModal(false);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 2500);
  };

  return (
    <div className="space-y-10 animate-fade-in p-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        <div className="bg-navy p-8 rounded-2xl text-white shadow-2xl relative overflow-hidden border-b-4 border-saffron">
          <div className="flex justify-between items-start mb-10">
            <div>
              <h3 className="text-saffron font-bold text-[10px] uppercase tracking-[0.2em] mb-2 flex items-center gap-2">
                <Target size={12} /> Predictive Scoring Logic
              </h3>
              <p className="text-2xl font-syne font-bold uppercase tracking-tight">Priority Ranking Formula</p>
            </div>
            <HelpCircle size={20} className="text-blue-300 opacity-20 cursor-help" />
          </div>
          
          <div className="space-y-6">
            <div className="flex items-center gap-4">
              <div className="flex-1 space-y-2">
                <div className="flex justify-between text-[10px] font-bold uppercase tracking-widest text-blue-300">
                  <span>Reading Gap (L1)</span>
                  <span>40% Weight</span>
                </div>
                <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                  <div className="h-full bg-saffron w-[40%]"></div>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex-1 space-y-2">
                <div className="flex justify-between text-[10px] font-bold uppercase tracking-widest text-blue-300">
                  <span>Division Cliff (Arith)</span>
                  <span>35% Weight</span>
                </div>
                <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                  <div className="h-full bg-teal w-[35%]"></div>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex-1 space-y-2">
                <div className="flex justify-between text-[10px] font-bold uppercase tracking-widest text-blue-300">
                  <span>Historical Stagnation</span>
                  <span>25% Weight</span>
                </div>
                <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                  <div className="h-full bg-blue-500 w-[25%]"></div>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-8 bg-white/5 p-4 rounded-xl border border-white/10 text-[10px] font-medium text-blue-200">
            Priority P1: Score &gt; 20 | P2: Score &gt; 10 | P3: Score &gt; 0
          </div>
        </div>

        <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm">
          <h3 className="text-sm font-bold text-gray-400 uppercase tracking-[0.2em] mb-8">States Count by Risk Band (Current Filters)</h3>
          <HorizontalBarChart data={riskDistribution} maxValue={Math.max(...riskDistribution.map(r => r.value)) + 2} />
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 shadow-xl overflow-hidden">
        <div className="p-8 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
          <div>
            <h3 className="text-navy font-syne font-bold uppercase tracking-tight text-lg">Intelligent Priority Queue</h3>
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-1">Foundational Intelligence (Sorted by Composite Priority Score)</p>
          </div>
          <div className="flex items-center gap-4">
             <div className="flex items-center gap-2 text-[10px] font-bold text-blue-600 bg-blue-50 px-3 py-1.5 rounded-full border border-blue-100">
               <AlertTriangle size={12} />
               {priorityRanking.filter(s => s.priorityLabel === 'P1').length} CRITICAL ACTIONS PENDING
             </div>
          </div>
        </div>

        <div className="divide-y divide-gray-100">
          {priorityRanking.map((state, idx) => (
            <div key={idx} className={`p-6 flex flex-wrap justify-between items-center transition-all hover:bg-gray-50/80 group ${state.priorityLabel === 'P1' ? 'border-l-8 border-red-600 bg-red-50/10' : (state.priorityLabel === 'P2' ? 'border-l-8 border-saffron bg-amber-50/5' : 'border-l-8 border-blue-400')}`}>
              <div className="flex items-center gap-8 min-w-[300px]">
                <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center font-syne font-bold text-navy shadow-sm border border-gray-100 group-hover:scale-110 transition-transform">
                  #{idx + 1}
                </div>
                <div>
                  <div className="flex items-center gap-3 mb-1">
                    <h4 className="font-bold text-navy text-lg uppercase tracking-tight">{state.State}</h4>
                    <Badge label={state.priorityLabel} variant={state.priorityLabel} />
                  </div>
                  <div className="flex items-center gap-4 text-[10px] font-bold text-gray-500 uppercase tracking-widest">
                    <span>Score: <span className="text-navy">{state.priorityScore}</span></span>
                    <span className="w-1 h-1 bg-gray-300 rounded-full"></span>
                    <span>Gap Vs Nat: <span className={state.GapVsNational < 0 ? 'text-red-600' : 'text-teal'}>{state.GapVsNational} pp</span></span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-10">
                <div className="hidden md:flex gap-8">
                  <div className="text-center">
                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em] mb-1">Gr5 Read</p>
                    <p className="text-sm font-syne font-extrabold text-navy">{state.Gr5_Read || '—'}%</p>
                  </div>
                  <div className="text-center">
                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em] mb-1">Gr5 Div</p>
                    <p className="text-sm font-syne font-extrabold text-navy">{state.Gr5_Div || '—'}%</p>
                  </div>
                </div>

                <button 
                  onClick={() => { setSelectedState(state.State); setShowLogModal(true); }}
                  className="bg-navy text-white px-6 py-3 rounded-xl font-bold font-syne text-[10px] uppercase tracking-widest flex items-center gap-2 hover:bg-navy/90 hover:translate-y-[-2px] transition-all shadow-md group-hover:bg-saffron"
                >
                  <Play size={12} fill="currentColor" /> Log Action
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <LogInterventionModal 
        isOpen={showLogModal} 
        onClose={() => setShowLogModal(false)}
        onSave={handleSaveIntervention}
        states={priorityRanking.map(s => s.State)}
      />
      <Toast message="Intervention Logged Successfully" show={showToast} />
    </div>
  );
};

export default PriorityQueueTab;
