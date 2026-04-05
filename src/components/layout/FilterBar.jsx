import React from 'react';
import { Filter, Calendar, BookOpen, BarChart2, MapPin } from 'lucide-react';
import { useFilters } from '../../context/FilterContext';

const FilterBar = ({ data = [] }) => {
  const { filters, updateFilter } = useFilters();
  
  const years = [2018, 2019, 2021, 2022, 2024];
  const grades = [
    { label: 'All Grades', value: 'all' },
    { label: 'Grade 3', value: '3' },
    { label: 'Grade 4', value: '4' },
    { label: 'Grade 5', value: '5' }
  ];
  const metrics = [
    { label: 'Reading Level (%)', value: 'read' },
    { label: 'Subtraction (%)', value: 'sub' },
    { label: 'Division (%)', value: 'div' }
  ];
  const regions = [
    { label: 'All Risk Bands', value: 'all' },
    { label: 'Critical Only', value: 'critical' },
    { label: 'High Risk Only', value: 'highrisk' },
    { label: 'Good Only', value: 'good' }
  ];

  const Select = ({ icon: Icon, label, value, onChange, options }) => (
    <div className="flex flex-col gap-2 relative">
      <div className="flex items-center gap-2 text-[10px] uppercase font-bold text-gray-500 tracking-widest pl-1">
        <Icon size={12} className="text-saffron" />
        {label}
      </div>
      <div className="relative">
        <select 
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="appearance-none bg-white border border-gray-100 px-4 py-2.5 pr-10 rounded-xl text-sm font-bold text-navy shadow-sm focus:ring-4 focus:ring-saffron/10 focus:border-saffron focus:outline-none transition-all cursor-pointer w-full md:w-56"
        >
          {options.map((opt, idx) => (
            <option key={idx} value={typeof opt === 'object' ? opt.value : opt}>
              {typeof opt === 'object' ? opt.label : opt}
            </option>
          ))}
        </select>
        <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">
          <Filter size={14} />
        </div>
      </div>
    </div>
  );

  return (
    <div className="bg-gray-50/80 backdrop-blur-md px-8 py-6 flex flex-wrap gap-x-12 gap-y-6 sticky top-[136px] z-[800] border-b border-gray-200/50 items-end animate-fade-in shadow-inner">
      <Select 
        icon={Calendar} 
        label="ASER Cycle" 
        value={filters.year} 
        onChange={(v) => updateFilter('year', v)} 
        options={years} 
      />
      <Select 
        icon={BookOpen} 
        label="Grade Level" 
        value={filters.grade} 
        onChange={(v) => updateFilter('grade', v)} 
        options={grades} 
      />
      <Select 
        icon={BarChart2} 
        label="Priority Metric" 
        value={filters.metric} 
        onChange={(v) => updateFilter('metric', v)} 
        options={metrics} 
      />
       <Select 
        icon={MapPin} 
        label="Risk Category" 
        value={filters.region} 
        onChange={(v) => updateFilter('region', v)} 
        options={regions} 
      />

      <div className="ml-auto">
        <button 
          onClick={() => {
            updateFilter('year', 2024);
            updateFilter('grade', 'all');
            updateFilter('metric', 'read');
            updateFilter('region', 'all');
          }}
          className="px-4 py-2 text-[10px] font-bold uppercase tracking-widest text-navy bg-white/50 border border-gray-200 rounded-lg hover:bg-white hover:shadow-sm transition-all"
        >
          Reset Filters
        </button>
      </div>
    </div>
  );
};

export default FilterBar;
