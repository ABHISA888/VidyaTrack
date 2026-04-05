import React from 'react';
import { 
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer 
} from 'recharts';

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-navy border-none p-4 rounded-xl shadow-2xl text-white">
        <p className="text-gray-400 text-[10px] font-bold tracking-widest uppercase mb-1">Year {label}</p>
        <div className="space-y-1">
          {payload.map((entry, index) => (
            <div key={index} className="flex justify-between items-center gap-4">
              <span className="text-xs font-medium" style={{ color: entry.stroke }}>{entry.name}</span>
              <span className="text-lg font-syne font-bold">{entry.value}%</span>
            </div>
          ))}
        </div>
      </div>
    );
  }
  return null;
};

const TrendLineChart = ({ data, lines, yMin=0, yMax=100, height=250 }) => {
  return (
    <div style={{ width: '100%', height }}>
      <ResponsiveContainer>
        <LineChart data={data} margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#eee" />
          <XAxis 
            dataKey="year" 
            axisLine={false} 
            tickLine={false} 
            tick={{ fontSize: 11, fill: '#888', fontWeight: 600 }}
            padding={{ left: 20, right: 20 }}
          />
          <YAxis 
            domain={[yMin, yMax]} 
            axisLine={false} 
            tickLine={false} 
            tick={{ fontSize: 11, fill: '#888', fontWeight: 600 }}
            tickFormatter={(val) => `${val}%`}
          />
          <Tooltip content={<CustomTooltip />} />
          <Legend 
            verticalAlign="top" 
            align="right" 
            iconType="circle" 
            wrapperStyle={{ paddingBottom: '20px', fontSize: '10px', textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: 700 }}
          />
          {lines.map((line, idx) => (
            <Line
              key={idx}
              type="monotone"
              dataKey={line.key}
              name={line.label || line.key}
              stroke={line.color || '#1A3356'}
              strokeWidth={3}
              strokeDasharray={line.dashed ? "5 5" : undefined}
              dot={{ r: 4, strokeWidth: 2, fill: '#fff' }}
              activeDot={{ r: 6, strokeWidth: 0 }}
              animationDuration={1500}
            />
          ))}
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default TrendLineChart;
