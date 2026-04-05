import React from 'react';
import { Info } from 'lucide-react';

const InsightBox = ({ label, text, highlightNumber, highlightLabel }) => {
  return (
    <div className="bg-navy rounded-xl p-5 text-white flex items-start gap-4 shadow-lg border-l-4 border-saffron">
      <div className="bg-white/10 p-2 rounded-lg">
        <Info className="text-saffron" size={24} />
      </div>
      <div>
        <h4 className="font-syne font-bold uppercase tracking-wider text-saffron text-sm mb-1">{label}</h4>
        <p className="text-blue-100 text-sm leading-relaxed mb-4">{text}</p>
        
        {highlightNumber !== undefined && (
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-bold font-syne text-saffron">{highlightNumber}</span>
            <span className="text-xs uppercase tracking-widest text-blue-300 font-medium">{highlightLabel}</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default InsightBox;
