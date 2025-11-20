// components/admin/dashboard/SalesChart.jsx
"use client";

import { useEffect, useState } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { motion } from 'framer-motion';
import { TrendingUp, Zap } from 'lucide-react';

export default function SalesChart() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/analytics/monthly-sales', { cache: 'no-store' })
      .then(r => r.json())
      .then(result => {
        let chartData = [];

        if (result && typeof result === 'object' && Object.keys(result).length > 0) {
          chartData = Object.entries(result)
            .map(([month, sales]) => ({
              name: month.slice(0, 3),
              fullMonth: month,
              sales: Number(sales) || 0,
            }))
            .sort((a, b) => new Date(a.fullMonth) - new Date(b.fullMonth)); order
        } else {
         
          fetch('/api/orders')
            .then(r => r.json())
            .then(orders => {
              const monthly = {};
              orders.forEach(order => {
                const date = new Date(order.createdAt);
                const monthKey = date.toLocaleString('en-US', { month: 'short', year: 'numeric' });
                monthly[monthKey] = (monthly[monthKey] || 0) + order.total;
              });
              chartData = Object.entries(monthly)
                .map(([month, sales]) => ({
                  name: month.slice(0, 3),
                  fullMonth: month,
                  sales: Number(sales.toFixed(2)),
                }))
                .sort((a, b) => new Date(a.fullMonth) - new Date(b.fullMonth));
              setData(chartData);
              setLoading(false);
            });
          return;
        }
        setData(chartData);
        setLoading(false);
      })
      .catch(err => {
        console.error("Error:", err);
        setLoading(false);
      });
  }, []);

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload[0]) {
      return (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white/95 backdrop-blur-2xl border border-white/30 rounded-2xl shadow-2xl p-5"
        >
          <p className="font-bold text-gray-800 text-base sm:text-lg">{payload[0].payload.fullMonth}</p>
          <div className="flex items-center gap-3 mt-2">
            <Zap size={22} className="text-yellow-500" />
            <p className="text-2xl sm:text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-orange-600">
              ${payload[0].value.toLocaleString()}
            </p>
          </div>
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
        className="bg-white/10 backdrop-blur-2xl rounded-3xl border border-white/20 shadow-2xl p-10 h-96 flex flex-col items-center justify-center"
      >
        <div className="relative">
          <div className="w-20 h-20 border-4 border-white/20 border-t-red-500 rounded-full animate-spin" />
          <TrendingUp size={32} className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-red-400" />
        </div>
        <p className="text-white/80 text-lg font-bold mt-6">Loading sales...</p>
      </motion.div>
    );
  }

  if (data.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white/10 backdrop-blur-2xl rounded-3xl border border-white/20 shadow-2xl p-10 h-96 flex flex-col items-center justify-center text-center"
      >
        <div className="w-24 h-24 bg-white/10 rounded-full flex items-center justify-center mb-6">
          <TrendingUp size={56} className="text-white/30" />
        </div>
        <h3 className="text-2xl font-black text-white mb-3">No Sales Yet</h3>
        <p className="text-gray-400 text-base max-w-xs">
          Your sales journey begins here. Make your first sale!
        </p>
      </motion.div>
    );
  }

  const totalSales = data.reduce((sum, item) => sum + item.sales, 0);
  const peakMonth = data.reduce((prev, current) => (prev.sales > current.sales) ? prev : current);

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="bg-white/10 backdrop-blur-2xl rounded-3xl shadow-2xl border border-white/20 overflow-hidden"
    >
      {/* Header */}
      <div className="p-6 sm:p-8 border-b border-white/10">
        <div className="flex flex-col gap-6">
          <div>
            <h3 className="text-2xl sm:text-3xl font-black text-white flex items-center gap-3">
              <span className="p-3 bg-gradient-to-br from-red-500 to-orange-600 rounded-2xl shadow-xl">
                <TrendingUp size={28} />
              </span>
              Sales Over Time
            </h3>
            <p className="text-gray-300 mt-3 text-lg sm:text-2xl">
              Total: <span className="text-3xl sm:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-500">
                ${totalSales.toLocaleString()}
              </span>
            </p>
          </div>

         
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="flex flex-col sm:flex-row items-start sm:items-center gap-4 bg-gradient-to-r from-red-600 to-orange-600 text-white p-5 rounded-2xl shadow-2xl"
          >
            <div className="flex items-center gap-3">
              <Zap size={28} className="text-yellow-300" />
              <div>
                <p className="text-sm opacity-90">Peak Month</p>
                <p className="text-xl font-black">{peakMonth.fullMonth}</p>
              </div>
            </div>
            <div className="ml-auto text-right">
              <p className="text-2xl sm:text-3xl font-black">${peakMonth.sales.toLocaleString()}</p>
            </div>
          </motion.div>
        </div>
      </div>

      
      <div className="p-4 sm:p-8">
        <ResponsiveContainer width="100%" height={320}>
          <AreaChart data={data} margin={{ top: 20, right: 20, left: 0, bottom: 10 }}>
            <defs>
              <linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#ef4444" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#ef4444" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="4 8" stroke="rgba(255,255,255,0.08)" />
            <XAxis
              dataKey="name"
              tick={{ fill: '#e2e8f0', fontSize: 12 }}
              tickLine={false}
              axisLine={{ stroke: 'rgba(255,255,255,0.15)' }}
            />
            <YAxis
              tick={{ fill: '#e2e8f0', fontSize: 12 }}
              tickLine={false}
              axisLine={{ stroke: 'rgba(255,255,255,0.15)' }}
              tickFormatter={(value) => value >= 1000 ? `$${(value/1000).toFixed(0)}k` : `$${value}`}
            />
            <Tooltip content={<CustomTooltip />} cursor={{ stroke: '#ef4444', strokeWidth: 2 }} />
            <Area
              type="monotone"
              dataKey="sales"
              stroke="#ef4444"
              strokeWidth={3}
              fillOpacity={1}
              fill="url(#colorSales)"
              dot={{ fill: '#ef4444', r: 6 }}
              activeDot={{ r: 10, stroke: '#fff', strokeWidth: 3 }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

     
      <div className="px-6 pb-6 sm:px-8 sm:pb-8">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {[
            { label: "Best Month", value: peakMonth.fullMonth, color: "from-yellow-500 to-orange-600" },
            { label: "Total Sales", value: `$${totalSales.toLocaleString()}`, color: "from-red-500 to-pink-600" },
            { label: "Months Tracked", value: data.length, color: "from-purple-500 to-indigo-600" },
          ].map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className={`bg-gradient-to-br ${stat.color} text-white p-5 rounded-2xl shadow-xl text-center`}
            >
              <p className="text-sm opacity-90">{stat.label}</p>
              <p className="text-2xl font-black mt-2">{stat.value}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}