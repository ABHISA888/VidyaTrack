import React from 'react';
import { 
  BarChart3, TrendingUp, AlertTriangle, ListChecks, Activity, BrainCircuit 
} from 'lucide-react';

const tabs = [
  { id: 'overview', label: 'Overview', icon: BarChart3 },
  { id: 'trends', label: 'Grade Trends', icon: TrendingUp },
  { id: 'risk', label: 'State Risk', icon: AlertTriangle },
  { id: 'priority', label: 'Priority Queue', icon: ListChecks },
  { id: 'tracker', label: 'Interventions', icon: Activity },
  { id: 'advisor', label: 'AI Advisor', icon: BrainCircuit },
];

const TabBar = ({ activeTab, setActiveTab }) => {
  return (
    <div className="bg-white border-b border-gray-200 sticky top-[72px] z-[900] shadow-sm">
      <div className="flex gap-8 px-8 overflow-x-auto no-scrollbar">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-3 py-6 px-1 border-b-4 transition-all whitespace-nowrap group ${
                isActive 
                  ? 'border-saffron text-navy font-bold' 
                  : 'border-transparent text-gray-400 hover:text-navy'
              }`}
            >
              <Icon 
                size={18} 
                className={`transition-colors ${isActive ? 'text-saffron' : 'text-gray-300 group-hover:text-navy'}`} 
              />
              <span className={`text-xs uppercase tracking-widest ${isActive ? 'font-syne' : 'font-medium'}`}>
                {tab.label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default TabBar;
