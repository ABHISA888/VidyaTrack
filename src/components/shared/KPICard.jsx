import React from 'react';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';

const KPICard = ({ label, value, unit="%", change, changeLabel, context, accentColor='navy' }) => {
  const isPositive = change > 0;
  const isNeutral = change === 0 || change === null;
  const displayValue = value === null ? "—" : `${value}${unit}`;

  return (
    <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm transition-all hover:shadow-md">
      <div className="flex justify-between items-start mb-2">
        <span className="text-gray-500 text-sm font-medium tracking-wide uppercase">{label}</span>
        {change !== null && (
          <div className={`flex items-center px-2 py-0.5 rounded-full text-xs font-bold ${
            isPositive ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'
          }`}>
            {isPositive ? <TrendingUp size={12} className="mr-1" /> : <TrendingDown size={12} className="mr-1" />}
            {Math.abs(change).toFixed(1)}pp
          </div>
        )}
      </div>
      
      <div className={`text-3xl font-bold font-syne mb-1 text-${accentColor}`}>
        {displayValue}
      </div>
      
      {changeLabel && <p className="text-gray-400 text-xs mt-1">{changeLabel}</p>}
      {context && <div className="mt-3 text-xs font-medium text-gray-500 bg-gray-50 px-2 py-1 rounded-md inline-block uppercase tracking-wider">{context}</div>}
    </div>
  );
};

export default KPICard;
