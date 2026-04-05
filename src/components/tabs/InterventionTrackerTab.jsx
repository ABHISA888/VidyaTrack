import React, { useState } from 'react';
import { PlusCircle, MoreVertical, Search, CheckCircle, Clock, AlertCircle } from 'lucide-react';
import KPICard from '../shared/KPICard';
import LogInterventionModal from '../modals/LogInterventionModal';
import Toast from '../shared/Toast';

const InterventionTrackerTab = ({ states }) => {
  const [interventions, setInterventions] = useState([
    { id: 1, state: 'Bihar', type: 'Foundation Literacy', date: '2024-03-12', status: 'In Progress', before: 24, after: 27 },
    { id: 2, state: 'Madhya Pradesh', type: 'Arithmetic Camps', date: '2024-02-05', status: 'Completed', before: 38, after: 44 },
    { id: 3, state: 'Jharkhand', type: 'Teacher Training', date: '2024-01-20', status: 'Pending Review', before: 29, after: 30 }
  ]);

  const [showModal, setShowModal] = useState(false);
  const [showToast, setShowToast] = useState(false);

  const kpis = [
    { label: 'Active Interventions', value: interventions.filter(i => i.status !== 'Completed').length, unit: '', color: 'navy' },
    { label: 'Avg Reading Lift', value: 3.2, unit: 'pp', color: 'teal', change: 1.2 },
    { label: 'Avg Math Lift', value: 2.8, unit: 'pp', color: 'saffron', change: 0.5 },
    { label: 'Pending Reviews', value: interventions.filter(i => i.status === 'Pending Review').length, unit: '', color: 'amber-700' }
  ];

  const handleSave = (entry) => {
    setInterventions([entry, ...interventions]);
    setShowModal(false);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 2500);
  };

  const getStatusStyle = (status) => {
    switch (status) {
      case 'Completed': return { dot: 'bg-teal', text: 'text-teal' };
      case 'In Progress': return { dot: 'bg-blue-500', text: 'text-blue-500' };
      case 'Pending Review': return { dot: 'bg-saffron', text: 'text-saffron' };
      default: return { dot: 'bg-gray-400', text: 'text-gray-400' };
    }
  };

  return (
    <div className="space-y-10 animate-fade-in p-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {kpis.map((kpi, idx) => (
          <KPICard 
            key={idx} 
            label={kpi.label} 
            value={kpi.value} 
            unit={kpi.unit} 
            change={kpi.change} 
            accentColor={kpi.color} 
          />
        ))}
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 shadow-xl overflow-hidden">
        <div className="bg-navy p-6 flex justify-between items-center text-white border-b-4 border-teal">
          <div>
            <h3 className="text-xl font-syne font-bold uppercase tracking-tight">Active Intelligence Interventions</h3>
            <p className="text-[10px] font-bold text-blue-300 uppercase tracking-widest mt-1">Foundational Literacy & Numeracy Tracking</p>
          </div>
          <button 
            onClick={() => setShowModal(true)}
            className="bg-teal text-white px-6 py-3 rounded-xl font-bold font-syne text-[10px] uppercase tracking-widest flex items-center gap-2 hover:bg-teal/90 hover:translate-y-[-2px] transition-all shadow-lg active:translate-y-0"
          >
            <PlusCircle size={16} /> Log New Intervention
          </button>
        </div>

        <div className="p-6 border-b border-gray-50 flex justify-between items-center bg-gray-50/50">
          <div className="flex bg-white px-4 py-2 rounded-xl text-navy text-[10px] uppercase font-bold border border-gray-100 shadow-sm">
            <Search size={14} className="mr-3 text-gray-300" />
            <input 
              type="text" 
              placeholder="Filter by school or state..." 
              className="bg-transparent focus:outline-none placeholder-gray-300 w-64" 
            />
          </div>
          <div className="flex bg-white p-1 rounded-lg border border-gray-200">
             <button className="px-3 py-1.5 text-[8px] font-bold uppercase tracking-widest bg-navy text-white rounded-md shadow-sm">All Levels</button>
             <button className="px-3 py-1.5 text-[8px] font-bold uppercase tracking-widest text-gray-400 hover:text-navy transition-colors">Critical Only</button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50/50 border-b border-gray-100">
                <th className="p-5 text-[10px] font-bold text-gray-400 uppercase tracking-widest">Intervention & State</th>
                <th className="p-5 text-[10px] font-bold text-gray-400 uppercase tracking-widest">Status</th>
                <th className="p-5 text-[10px] font-bold text-gray-400 uppercase tracking-widest">Launch Date</th>
                <th className="p-5 text-[10px] font-bold text-gray-400 uppercase tracking-widest">Pre-Baseline</th>
                <th className="p-5 text-[10px] font-bold text-gray-400 uppercase tracking-widest">Current/Exit</th>
                <th className="p-5 text-[10px] font-bold text-gray-400 uppercase tracking-widest">Lift</th>
                <th className="p-5 text-[10px] font-bold text-gray-400 uppercase tracking-widest"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {interventions.map((item, idx) => {
                const status = getStatusStyle(item.status);
                const lift = item.after - item.before;
                return (
                  <tr key={idx} className="hover:bg-gray-50 transition-colors animate-fade-in">
                    <td className="p-5 py-6">
                      <div className="flex flex-col">
                        <span className="font-bold text-navy text-sm uppercase tracking-tight">{item.type}</span>
                        <span className="text-[10px] font-medium text-gray-400 uppercase tracking-widest mt-0.5">{item.state} Region</span>
                      </div>
                    </td>
                    <td className="p-5">
                      <div className="flex items-center gap-2">
                        <div className={`w-2 h-2 rounded-full ${status.dot} animate-pulse`}></div>
                        <span className={`text-[10px] font-bold uppercase tracking-widest ${status.text}`}>{item.status}</span>
                      </div>
                    </td>
                    <td className="p-5 text-sm font-medium text-gray-600 font-syne">{item.date}</td>
                    <td className="p-5 text-sm font-bold text-gray-400">{item.before}%</td>
                    <td className="p-5 text-sm font-bold text-navy">{item.after}%</td>
                    <td className="p-5">
                      <span className={`px-2 py-1 rounded-md text-[10px] font-bold ${lift > 0 ? 'bg-teal/10 text-teal' : 'bg-gray-100 text-gray-500'}`}>
                        {lift > 0 ? `+${lift}pp` : '—'}
                      </span>
                    </td>
                    <td className="p-5 text-right">
                      <button className="p-2 text-gray-300 hover:text-navy transition-colors">
                        <MoreVertical size={16} />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      <LogInterventionModal 
        isOpen={showModal} 
        onClose={() => setShowModal(false)}
        onSave={handleSave}
        states={states}
      />
      <Toast message="Intervention Logged & Updated" show={showToast} />
    </div>
  );
};

export default InterventionTrackerTab;
