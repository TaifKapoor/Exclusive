// components/admin/dashboard/RevenueChart.jsx
"use client";

import { useEffect, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { motion } from 'framer-motion';
import { DollarSign, TrendingUp } from 'lucide-react';

export default function RevenueChart() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/analytics/revenue-by-category', { cache: 'no-store' })
      .then(r => r.json())
      .then(result => {
        const chartData = Object.entries(result)
          .map(([category, revenue]) => ({
            category: category.length > 12 ? category.substring(0, 10) + '...' : category,
            revenue: Number(revenue.toFixed(2)),
            fullCategory: category 
          }))
          .sort((a, b) => b.revenue - a.revenue); 

        setData(chartData);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  
  const COLORS = [
    '#8b5cf6', '#a78bfa', '#c4b5fd', '#e0c3fc',
    '#6366f1', '#818cf8', '#a5b4fc', '#c7d2fe',
    '#ec4899', '#f472b6', '#f9a8d4', '#fdb0c0'
  ];

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload[0]) {
      return (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white/95 backdrop-blur-xl border border-white/20 rounded-2xl shadow-2xl p-5"
        >
          <p className="font-bold text-gray-900 text-lg">
            {payload[0].payload.fullCategory}
          </p>
          <p className="text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600 mt-2">
            ${payload[0].value.toLocaleString()}
          </p>
          <p className="text-sm text-gray-600 mt-1">Revenue</p>
        </motion.div>
      );
    }
    return null;
  };

  if (loading) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="bg-white/10 backdrop-blur-2xl rounded-3xl border border-white/20 shadow-2xl p-8 h-[400px] flex flex-col items-center justify-center"
      >
        <div className="relative">
          <div className="w-20 h-20 border-4 border-white/20 border-t-purple-500 rounded-full animate-spin" />
          <DollarSign size={32} className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-purple-400" />
        </div>
        <p className="text-white/80 text-xl font-medium mt-6">Loading revenue data...</p>
      </motion.div>
    );
  }

  if (data.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white/10 backdrop-blur-2xl rounded-3xl border border-white/20 shadow-2xl p-12 h-[400px] flex flex-col items-center justify-center text-center"
      >
        <div className="w-24 h-24 bg-white/10 rounded-full flex items-center justify-center mb-6">
          <DollarSign size={48} className="text-white/40" />
        </div>
        <h3 className="text-2xl font-bold text-white mb-3">No Revenue Yet</h3>
        <p className="text-gray-400 text-lg max-w-md">
          Start making sales and watch your revenue grow across categories
        </p>
      </motion.div>
    );
  }

  const totalRevenue = data.reduce((sum, item) => sum + item.revenue, 0);

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7 }}
      className="bg-white/10 backdrop-blur-2xl rounded-3xl shadow-2xl border border-white/20 overflow-hidden"
    >
     
      <div className="p-8 border-b border-white/10">
        <div className="flex items-start justify-between">
          <div>
            <h3 className="text-3xl font-black text-white flex items-center gap-3">
              <span className="p-3 bg-gradient-to-br from-purple-500 to-pink-600 rounded-2xl shadow-xl">
                <DollarSign size={28} />
              </span>
              Revenue by Category
            </h3>
            <p className="text-gray-300 mt-3 text-lg">
              Total: <span className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-400">
                ${totalRevenue.toLocaleString()}
              </span>
            </p>
          </div>
          <div className="text-right">
            <div className="inline-flex items-center gap-2 bg-green-500/20 text-green-300 px-4 py-2 rounded-full font-bold">
              <TrendingUp size={20} />
              +{((data[0].revenue / totalRevenue) * 100).toFixed(1)}% from top category
            </div>
          </div>
        </div>
      </div>

      
      <div className="p-8">
        <ResponsiveContainer width="100%" height={380}>
          <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 40 }}>
            <CartesianGrid strokeDasharray="4 8" stroke="rgba(255,255,255,0.08)" />
            <XAxis 
              dataKey="category" 
              tick={{ fill: '#e2e8f0', fontSize: 14, fontWeight: 600 }}
              tickLine={false}
              axisLine={{ stroke: 'rgba(255,255,255,0.1)' }}
            />
            <YAxis 
              tick={{ fill: '#e2e8f0', fontSize: 14 }}
              tickLine={false}
              axisLine={{ stroke: 'rgba(255,255,255,0.1)' }}
              tickFormatter={(value) => `$${value.toLocaleString()}`}
            />
            <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(255,255,255,0.05)' }} />
            <Bar dataKey="revenue" radius={[12, 12, 0, 0]} barSize={50}>
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

    
      {data.length > 0 && (
        <div className="px-8 pb-8">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5 }}
            className="inline-flex items-center gap-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-4 rounded-2xl shadow-2xl font-bold text-lg"
          >
            <span className="text-3xl">Top Category</span>
            <div className="h-1 w-1 bg-white/50 rounded-full" />
            <span className="text-2xl">{data[0].fullCategory}</span>
            <div className="h-1 w-1 bg-white/50 rounded-full" />
            <span className="text-3xl">${data[0].revenue.toLocaleString()}</span>
          </motion.div>
        </div>
      )}
    </motion.div>
  );
}
