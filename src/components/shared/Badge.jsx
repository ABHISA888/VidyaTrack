import React from 'react';

const Badge = ({ label, variant = 'moderate' }) => {
  const getStyles = () => {
    switch (variant.toLowerCase()) {
      case 'critical':
      case 'p1':
        return 'bg-red-50 text-red-700 border-red-200';
      case 'highrisk':
      case 'p2':
        return 'bg-saffron/10 text-saffron border-saffron/20';
      case 'moderate':
      case 'p3':
        return 'bg-amber-50 text-amber-700 border-amber-200';
      case 'good':
        return 'bg-teal/10 text-teal border-teal/20';
      default:
        return 'bg-gray-50 text-gray-700 border-gray-200';
    }
  };

  return (
    <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-widest border border-dashed animate-fade-in ${getStyles()}`}>
      {label}
    </span>
  );
};

export default Badge;
