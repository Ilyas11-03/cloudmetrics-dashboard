"use client";

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

const formatTime = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleTimeString('fr-FR', { 
    hour: '2-digit', 
    minute: '2-digit', 
    second: '2-digit' 
  });
};

export default function MetricsChart({ data }: { data: any[] }) {
  // Debug : afficher les données dans la console
  console.log("📊 Données reçues dans le graphique:", data.length, "mesures");

  const chartData = data.reverse().map((m) => ({
    time: formatTime(m.timestamp.toISOString()),
    CPU: m.cpu_usage,
    RAM: m.ram_usage,
  }));

  return (
    <div className="w-full" style={{ height: '400px' }}>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
          <XAxis dataKey="time" stroke="#9CA3AF" />
          <YAxis stroke="#9CA3AF" domain={[0, 100]} />
          <Tooltip
            contentStyle={{ 
              backgroundColor: '#1F2937', 
              border: '1px solid #374151', 
              borderRadius: '8px', 
              color: '#fff' 
            }}
          />
          <Legend />
          <Line 
            type="monotone" 
            dataKey="CPU" 
            stroke="#4ade80" 
            strokeWidth={3} 
            dot={{ r: 4 }} 
            activeDot={{ r: 6 }} 
          />
          <Line 
            type="monotone" 
            dataKey="RAM" 
            stroke="#facc15" 
            strokeWidth={3} 
            dot={{ r: 4 }} 
            activeDot={{ r: 6 }} 
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}