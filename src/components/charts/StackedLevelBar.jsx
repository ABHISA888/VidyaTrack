import React from 'react';

const StackedLevelBar = ({ segments }) => {
  const total = segments.reduce((acc, s) => acc + s.value, 0);

  return (
    <div className="w-full">
      <div className="flex h-12 w-full rounded-full overflow-hidden shadow-inner border border-gray-100 bg-gray-50">
        {segments.map((segment, idx) => {
          const width = (segment.value / total) * 100;
          if (width === 0) return null;
          return (
            <div 
              key={idx}
              className="h-full transition-all-700 relative group cursor-default"
              style={{ width: `${width}%`, backgroundColor: segment.color }}
            >
              {/* Tooltip on hover */}
              <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-2 bg-navy text-white text-[10px] font-bold rounded-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-50 shadow-2xl uppercase tracking-widest border border-white/20">
                {segment.label}: {segment.value.toFixed(1)}%
                <div className="absolute top-full left-1/2 -translate-x-1/2 border-[6px] border-transparent border-t-navy"></div>
              </div>
            </div>
          );
        })}
      </div>
      
      {/* Legend */}
      <div className="flex flex-wrap gap-4 mt-6">
        {segments.map((segment, idx) => (
          <div key={idx} className="flex items-center gap-2">
            <div className="w-3 height-3 rounded-full" style={{ backgroundColor: segment.color }}></div>
            <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest leading-none">{segment.label}</span>
            <span className="text-xs font-syne font-bold text-navy">{segment.value.toFixed(1)}%</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StackedLevelBar;
