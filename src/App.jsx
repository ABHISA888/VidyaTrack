import React, { useState } from 'react';
import NavBar from './components/layout/NavBar';
import TabBar from './components/layout/TabBar';
import FilterBar from './components/layout/FilterBar';
import OverviewTab from './components/tabs/OverviewTab';
import GradeTrendsTab from './components/tabs/GradeTrendsTab';
import StateRiskTab from './components/tabs/StateRiskTab';
import PriorityQueueTab from './components/tabs/PriorityQueueTab';
import InterventionTrackerTab from './components/tabs/InterventionTrackerTab';
import AIAdvisorTab from './components/tabs/AIAdvisorTab';
import { useASERData } from './data/useASERData';
import { FilterProvider } from './context/FilterContext';
import { AuthProvider, useAuth } from './context/AuthContext';
import LoginPage from './components/auth/LoginPage';
import { Loader2, AlertCircle } from 'lucide-react';

const AppContent = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const { user, loading: authLoading } = useAuth();
  const { data, loading: dataLoading, error: dataError } = useASERData();

  if (authLoading) {
    return (
      <div className="h-screen w-full flex flex-col items-center justify-center bg-gray-50">
        <Loader2 className="animate-spin text-navy" size={48} />
      </div>
    );
  }

  if (!user) {
    return <LoginPage />;
  }

  if (dataLoading) {
    return (
      <div className="h-screen w-full flex flex-col items-center justify-center bg-gray-50 uppercase tracking-[0.4em] font-syne text-xs font-extrabold text-navy">
        <div className="bg-navy p-6 rounded-3xl shadow-2xl relative mb-8">
           <div className="absolute inset-0 bg-saffron rounded-3xl animate-ping opacity-20"></div>
           <Loader2 className="animate-spin text-white" size={48} />
        </div>
        Initializing Intelligence Protocol
      </div>
    );
  }

  if (dataError) {
    return (
      <div className="h-screen w-full flex flex-col items-center justify-center bg-red-50 p-10">
        <div className="bg-white p-10 rounded-3xl shadow-2xl border-4 border-red-200 max-w-xl text-center">
           <AlertCircle className="text-red-600 mx-auto mb-6" size={64} />
           <h2 className="text-2xl font-syne font-bold text-navy uppercase tracking-tighter mb-4">Intelligence Access Failed</h2>
           <p className="text-gray-500 font-medium mb-8 leading-relaxed">
             We encountered a critical error while loading the ASER intelligence dataset.
           </p>
           <div className="bg-red-50 p-4 rounded-xl text-xs font-mono text-red-700 text-left mb-8 overflow-auto max-h-32">
             {dataError}
           </div>
           <button 
             onClick={() => window.location.reload()}
             className="w-full bg-navy text-white px-6 py-4 rounded-xl font-bold font-syne text-[10px] uppercase tracking-[0.2em] shadow-lg hover:bg-navy/90"
           >
             Request System Re-authentication
           </button>
        </div>
      </div>
    );
  }

  const renderTab = () => {
    switch (activeTab) {
      case 'overview': return <OverviewTab data={data} />;
      case 'trends': return <GradeTrendsTab data={data} />;
      case 'risk': return <StateRiskTab data={data} />;
      case 'priority': return <PriorityQueueTab data={data} />;
      case 'tracker': return <InterventionTrackerTab data={data} states={[...new Set(data.map(r => r.State))]} />;
      case 'advisor': return <AIAdvisorTab data={data} />;
      default: return <OverviewTab data={data} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <NavBar />
      <TabBar activeTab={activeTab} setActiveTab={setActiveTab} />
      <FilterBar data={data} />
      <main className="max-w-[1600px] mx-auto pb-20 px-6">
        {renderTab()}
      </main>
    </div>
  );
};

function App() {
  return (
    <AuthProvider>
      <FilterProvider>
        <AppContent />
      </FilterProvider>
    </AuthProvider>
  );
}

export default App;

