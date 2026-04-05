import React, { useState } from 'react';
import { X, Calendar, MapPin, Activity, FileText } from 'lucide-react';

const LogInterventionModal = ({ isOpen, onClose, onSave, states = [] }) => {
  const [formData, setFormData] = useState({
    state: '',
    type: 'Foundation Literacy',
    date: new Date().toISOString().split('T')[0],
    notes: ''
  });

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({
      ...formData,
      id: Math.random().toString(36).substr(2, 9),
      status: 'In Progress',
      before: '-',
      after: '-'
    });
    setFormData({ state: '', type: 'Foundation Literacy', date: new Date().toISOString().split('T')[0], notes: '' });
  };

  return (
    <div className="fixed inset-0 z-[2000] flex items-center justify-center p-4 bg-navy/80 backdrop-blur-sm animate-fade-in" onClick={onClose}>
      <div 
        className="bg-white w-full max-w-lg rounded-2xl shadow-2xl relative overflow-hidden" 
        onClick={e => e.stopPropagation()}
      >
        <div className="bg-navy p-6 flex justify-between items-center text-white">
          <div className="flex items-center gap-3">
            <div className="bg-teal p-2 rounded-lg">
              <Activity size={24} />
            </div>
            <div>
              <h2 className="text-xl font-syne font-bold uppercase tracking-tight">Log Intervention</h2>
              <p className="text-[10px] font-bold text-blue-300 uppercase tracking-widest mt-1">Track intelligence activities</p>
            </div>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-full transition-colors">
            <X size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-8 space-y-6">
          <div className="space-y-2">
            <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest pl-1 flex items-center gap-2">
              <MapPin size={10} className="text-saffron" /> Target Region/State
            </label>
            <select 
              value={formData.state}
              onChange={e => setFormData({ ...formData, state: e.target.value })}
              className="w-full bg-gray-50 border border-gray-100 px-4 py-3 rounded-xl text-sm font-bold text-navy focus:ring-4 focus:ring-saffron/10 focus:border-saffron focus:outline-none transition-all cursor-pointer"
              required
            >
              <option value="">Select State...</option>
              {states.map((s, idx) => <option key={idx} value={s}>{s}</option>)}
            </select>
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest pl-1 flex items-center gap-2">
                <Activity size={10} className="text-saffron" /> Activity Type
              </label>
              <select 
                value={formData.type}
                onChange={e => setFormData({ ...formData, type: e.target.value })}
                className="w-full bg-gray-50 border border-gray-100 px-4 py-3 rounded-xl text-sm font-bold text-navy focus:ring-4 focus:ring-saffron/10 focus:border-saffron focus:outline-none transition-all"
              >
                <option>Foundation Literacy</option>
                <option>Arithmetic Camps</option>
                <option>Teacher Training</option>
                <option>Community Engagement</option>
                <option>Digital Integration</option>
              </select>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest pl-1 flex items-center gap-2">
                <Calendar size={10} className="text-saffron" /> Launch Date
              </label>
              <input 
                type="date"
                value={formData.date}
                onChange={e => setFormData({ ...formData, date: e.target.value })}
                className="w-full bg-gray-50 border border-gray-100 px-4 py-3 rounded-xl text-sm font-bold text-navy focus:ring-4 focus:ring-saffron/10 focus:border-saffron focus:outline-none transition-all"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest pl-1 flex items-center gap-2">
              <FileText size={10} className="text-saffron" /> Intelligence Notes
            </label>
            <textarea 
              rows="4"
              value={formData.notes}
              onChange={e => setFormData({ ...formData, notes: e.target.value })}
              className="w-full bg-gray-50 border border-gray-100 px-4 py-3 rounded-xl text-sm font-bold text-navy focus:ring-4 focus:ring-saffron/10 focus:border-saffron focus:outline-none transition-all"
              placeholder="Detailed objectives and expected impact..."
            ></textarea>
          </div>

          <button type="submit" className="w-full bg-navy text-white py-4 rounded-xl font-bold font-syne text-xs uppercase tracking-widest hover:bg-navy/90 transition-all shadow-lg hover:translate-y-[-2px] active:translate-y-[0]">
            Confirm & Log Activity
          </button>
        </form>
      </div>
    </div>
  );
};

export default LogInterventionModal;
