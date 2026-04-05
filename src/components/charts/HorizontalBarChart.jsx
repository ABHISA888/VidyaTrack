import React from 'react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell, ReferenceLine
} from 'recharts';

const HorizontalBarChart = ({ data, maxValue = 100, targetLine }) => {
  return (
    <div style={{ width: '100%', height: 300 }}>
      <ResponsiveContainer>
        <BarChart 
          data={data} 
          layout="vertical" 
          margin={{ top: 20, right: 30, left: 20, bottom: 0 }}
        >
          <CartesianGrid strokeDasharray="1 1" horizontal={true} vertical={false} stroke="#f0f0f0" />
          <XAxis 
            type="number" 
            domain={[0, maxValue]} 
            axisLine={false} 
            tickLine={false} 
            tick={{ fontSize: 10, fill: '#aaa' }}
          />
          <YAxis 
            dataKey="name" 
            type="category" 
            axisLine={false} 
            tickLine={false} 
            tick={{ fontSize: 11, fill: '#555', fontWeight: 600 }}
            width={120}
          />
          <Tooltip 
            cursor={{ fill: 'rgba(0,0,0,0.02)' }}
            contentStyle={{ backgroundColor: '#1A3356', border: 'none', borderRadius: '8px', color: '#fff', fontSize: '12px' }}
            itemStyle={{ color: '#fff', fontWeight: 'bold' }}
            formatter={(val) => `${val}%`}
          />
          {targetLine && (
            <ReferenceLine x={targetLine} stroke="#FFB000" strokeDasharray="3 3" label={{ position: 'top', value: 'National Avg', fill: '#FFB000', fontSize: 10, fontWeight: 700 }} />
          )}
          <Bar dataKey="value" radius={[0, 4, 4, 0]} barSize={20}>
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color || '#1A3356'} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default HorizontalBarChart;
