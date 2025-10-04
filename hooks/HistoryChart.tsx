
import React, { useMemo } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine } from 'recharts';
import { ScanResult } from '../types';

interface HistoryChartProps {
  data: ScanResult[];
}

const HistoryChart: React.FC<HistoryChartProps> = ({ data }) => {
  const chartData = useMemo(() => {
    return data
      .slice(0, 30) // Limit to last 30 entries
      .map(item => ({
        name: new Date(item.timestamp).toLocaleDateString('id-ID', { day: '2-digit', month: 'short' }),
        Skor: item.score,
      }))
      .reverse();
  }, [data]);

  if (chartData.length < 2) {
    return (
      <div className="text-center py-10 text-gray-500">
        <p>Data tidak cukup untuk menampilkan grafik.</p>
        <p className="text-sm">Lakukan scan beberapa kali untuk melihat tren.</p>
      </div>
    );
  }

  return (
    <div className="w-full h-64">
      <ResponsiveContainer>
        <LineChart
          data={chartData}
          margin={{
            top: 5,
            right: 20,
            left: -10,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" strokeOpacity={0.2} />
          <XAxis dataKey="name" fontSize={12} tickLine={false} axisLine={false} />
          <YAxis domain={[0, 100]} fontSize={12} tickLine={false} axisLine={false} />
          <Tooltip
            contentStyle={{
              backgroundColor: 'rgba(31, 41, 55, 0.8)',
              border: 'none',
              borderRadius: '0.5rem',
              color: 'white',
            }}
            itemStyle={{ color: 'white' }}
            labelStyle={{ fontWeight: 'bold' }}
          />
          <ReferenceLine y={75} label={{ value: 'Baik', position: 'insideTopLeft', fill: '#4ade80', fontSize: 10 }} stroke="#4ade80" strokeDasharray="3 3" />
          <ReferenceLine y={50} label={{ value: 'Cukup', position: 'insideTopLeft', fill: '#facc15', fontSize: 10 }} stroke="#facc15" strokeDasharray="3 3" />
          <Line type="monotone" dataKey="Skor" stroke="#3b82f6" strokeWidth={2} dot={{ r: 4 }} activeDot={{ r: 6 }} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default HistoryChart;
