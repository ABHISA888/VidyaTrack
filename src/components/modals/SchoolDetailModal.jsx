import React from 'react';
import { X, MapPin, TrendingUp, BookOpen, AlertCircle } from 'lucide-react';
import Badge from '../shared/Badge';

const SchoolDetailModal = ({ isOpen, onClose, stateName, data }) => {
  if (!isOpen || !data) return null;

  const StatTile = ({ label, value, icon: Icon, color }) => (
    <div className="bg-gray-50 p-4 rounded-xl border border-gray-100 group hover:bg-white hover:shadow-lg transition-all">
      <div className="flex justify-between items-start mb-2">
        <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{label}</span>
        <Icon size={16} className={color} />
      </div>
      <p className="text-2xl font-syne font-bold text-navy">{value || '—'}%</p>
    </div>
  );

  return (
    <div className="fixed inset-0 z-[2000] flex items-center justify-center p-4 bg-navy/80 backdrop-blur-sm animate-fade-in" onClick={onClose}>
      <div 
        className="bg-white w-full max-w-2xl rounded-2xl shadow-2xl relative overflow-hidden animate-scale-up" 
        onClick={e => e.stopPropagation()}
      >
        <div className="bg-navy p-6 flex justify-between items-center text-white border-b-4 border-saffron">
          <div className="flex items-center gap-3">
            <div className="bg-saffron p-2 rounded-lg">
              <MapPin size={24} />
            </div>
            <div>
              <h2 className="text-xl font-syne font-bold uppercase tracking-tight">{stateName}</h2>
              <div className="flex items-center gap-2 mt-1">
                <Badge label={data.Risk_Category} variant={data.Risk_Category} />
                <span className="text-[10px] font-bold text-blue-300 uppercase tracking-widest">State Intelligence Profile</span>
              </div>
            </div>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-full transition-colors">
            <X size={24} />
          </button>
        </div>

        <div className="p-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
            <StatTile label="Gr3 Reading" value={data.Gr3_Read} icon={BookOpen} color="text-saffron" />
            <StatTile label="Gr5 Reading" value={data.Gr5_Read} icon={BookOpen} color="text-teal" />
            <StatTile label="Gr3 Subtraction" value={data.Gr3_Sub} icon={TrendingUp} color="text-amber-500" />
            <StatTile label="Gr5 Division" value={data.Gr5_Div} icon={TrendingUp} color="text-red-500" />
          </div>

          <div className="bg-blue-50/50 p-6 rounded-2xl border border-blue-100 mb-8">
            <div className="flex items-center gap-2 mb-3">
              <AlertCircle size={18} className="text-navy" />
              <h4 className="text-xs font-bold font-syne text-navy uppercase tracking-widest">Regional Intelligence Insight</h4>
            </div>
            <p className="text-sm text-navy/80 leading-relaxed">
              {stateName} is currently showing a <span className="font-bold text-navy">{Math.abs(data.GapVsNational)} percentage point</span> {data.GapVsNational < 0 ? 'deficit' : 'surplus'} relative to the national average in Grade 5 reading proficiency. Targeted interventions for foundation literacy are recommended.
            </p>
          </div>

          <div className="flex gap-4">
            <button className="flex-1 bg-navy text-white py-4 rounded-xl font-bold font-syne text-xs uppercase tracking-widest hover:bg-navy/90 transition-all shadow-lg">
              Download Full Report
            </button>
            <button className="flex-1 bg-white text-navy border border-navy/20 py-4 rounded-xl font-bold font-syne text-xs uppercase tracking-widest hover:border-navy transition-all">
              Schedule Intervention
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SchoolDetailModal;
