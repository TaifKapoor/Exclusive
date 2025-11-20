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
          className="bg-white/95 backdrop-blur-xl border border-white/20 rounded-xl shadow-2xl p-3 sm:p-4"
        >
          <p className="font-bold text-gray-900 text-sm sm:text-base truncate max-w-[200px]">
            {payload[0].payload.fullCategory}
          </p>
          <p className="text-lg sm:text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600 mt-1">
            ${payload[0].value.toLocaleString()}
          </p>
          <p className="text-xs sm:text-sm text-gray-600">Revenue</p>
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
        className="bg-white/10 backdrop-blur-2xl rounded-2xl sm:rounded-3xl border border-white/20 shadow-2xl p-6 sm:p-8 h-[300px] sm:h-[400px] flex flex-col items-center justify-center"
      >
        <div className="relative">
          <div className="w-16 h-16 sm:w-20 sm:h-20 border-4 border-white/20 border-t-purple-500 rounded-full animate-spin" />
          <DollarSign size={28} className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-purple-400 sm:w-8 sm:h-8" />
        </div>
        <p className="text-white/80 text-base sm:text-xl font-medium mt-4 sm:mt-6">Loading...</p>
      </motion.div>
    );
  }

  if (data.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white/10 backdrop-blur-2xl rounded-2xl sm:rounded-3xl border border-white/20 shadow-2xl p-8 sm:p-12 h-[300px] sm:h-[400px] flex flex-col items-center justify-center text-center"
      >
        <div className="w-16 h-16 sm:w-24 sm:h-24 bg-white/10 rounded-full flex items-center justify-center mb-4 sm:mb-6">
          <DollarSign size={36} className="text-white/40 sm:w-12 sm:h-12" />
        </div>
        <h3 className="text-xl sm:text-2xl font-bold text-white mb-2 sm:mb-3">No Revenue Yet</h3>
        <p className="text-gray-400 text-sm sm:text-lg max-w-md px-4">
          Start making sales and watch your revenue grow
        </p>
      </motion.div>
    );
  }

  const totalRevenue = data.reduce((sum, item) => sum + item.revenue, 0);
  const topCategoryPercent = ((data[0].revenue / totalRevenue) * 100).toFixed(1);

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7 }}
      className="bg-white/10 backdrop-blur-2xl rounded-2xl sm:rounded-3xl shadow-2xl border border-white/20 overflow-hidden"
    >
  
      <div className="p-4 sm:p-6 lg:p-8 border-b border-white/10">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
         
          <div className="flex-1">
            <div className="flex items-center gap-3">
              <span className="p-2 sm:p-3 bg-gradient-to-br from-purple-500 to-pink-600 rounded-xl sm:rounded-2xl shadow-xl">
                <DollarSign size={20} className="sm:w-7 sm:h-7" />
              </span>
              <h3 className="text-xl sm:text-2xl lg:text-3xl font-black text-white">
                Revenue by Category
              </h3>
            </div>
            <p className="text-gray-300 mt-2 sm:mt-3 text-sm sm:text-base lg:text-lg">
              Total: <span className="text-xl sm:text-2xl lg:text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-400">
                ${totalRevenue.toLocaleString()}
              </span>
            </p>
          </div>
          
          
          <div className="self-start sm:self-auto">
            <div className="inline-flex items-center gap-2 bg-green-500/20 text-green-300 px-3 py-1.5 sm:px-4 sm:py-2 rounded-full font-bold text-xs sm:text-sm">
              <TrendingUp size={16} className="sm:w-5 sm:h-5" />
              <span className="whitespace-nowrap">+{topCategoryPercent}% top</span>
            </div>
          </div>
        </div>
      </div>

     
      <div className="p-4 sm:p-6 lg:p-8">
        <ResponsiveContainer width="100%" height={300} className="sm:!h-[350px] lg:!h-[380px]">
          <BarChart 
            data={data} 
            margin={{ 
              top: 10, 
              right: 10, 
              left: 0, 
              bottom: 20 
            }}
          >
            <CartesianGrid strokeDasharray="4 8" stroke="rgba(255,255,255,0.08)" />
            
            
            <XAxis 
              dataKey="category" 
              tick={{ 
                fill: '#e2e8f0', 
                fontSize: window.innerWidth < 640 ? 10 : 14, 
                fontWeight: 600 
              }}
              tickLine={false}
              axisLine={{ stroke: 'rgba(255,255,255,0.1)' }}
              angle={window.innerWidth < 640 ? -45 : 0}
              textAnchor={window.innerWidth < 640 ? "end" : "middle"}
              height={window.innerWidth < 640 ? 60 : 40}
            />
            
            
            <YAxis 
              tick={{ 
                fill: '#e2e8f0', 
                fontSize: window.innerWidth < 640 ? 10 : 14 
              }}
              tickLine={false}
              axisLine={{ stroke: 'rgba(255,255,255,0.1)' }}
              tickFormatter={(value) => window.innerWidth < 640 
                ? `$${(value / 1000).toFixed(0)}k` 
                : `$${value.toLocaleString()}`
              }
              width={window.innerWidth < 640 ? 40 : 60}
            />
            
            <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(255,255,255,0.05)' }} />
            
       
            <Bar 
              dataKey="revenue" 
              radius={[8, 8, 0, 0]} 
              barSize={window.innerWidth < 640 ? 30 : window.innerWidth < 1024 ? 40 : 50}
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

     
      {data.length > 0 && (
        <div className="px-4 pb-4 sm:px-6 sm:pb-6 lg:px-8 lg:pb-8">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5 }}
            className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white px-4 py-3 sm:px-6 sm:py-4 rounded-xl sm:rounded-2xl shadow-2xl"
          >
            <span className="text-lg sm:text-xl lg:text-2xl font-bold">🏆 Top Category</span>
            <div className="hidden sm:block h-1 w-1 bg-white/50 rounded-full" />
            <span className="text-base sm:text-lg lg:text-xl font-semibold truncate max-w-[150px] sm:max-w-none">
              {data[0].fullCategory}
            </span>
            <div className="hidden sm:block h-1 w-1 bg-white/50 rounded-full" />
            <span className="text-xl sm:text-2xl lg:text-3xl font-black">
              ${data[0].revenue.toLocaleString()}
            </span>
          </motion.div>
        </div>
      )}
    </motion.div>
  );
}