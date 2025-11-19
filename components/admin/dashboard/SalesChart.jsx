// components/admin/dashboard/SalesChart.jsx
"use client";
import { useEffect, useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area, AreaChart } from 'recharts';
import { motion } from 'framer-motion';
import { TrendingUp, Zap } from 'lucide-react';

export default function SalesChart() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/analytics/monthly-sales', { cache: 'no-store' })
      .then(r => r.json())
      .then(result => {
        console.log('Monthly Sales API Response:', result); 

        let chartData = [];

        if (result && typeof result === 'object' && Object.keys(result).length > 0) {
          chartData = Object.entries(result).map(([month, sales]) => ({
            name: month.slice(0, 3),
            fullMonth: month,
            sales: Number(sales) || 0,
          }));
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

              chartData = Object.entries(monthly).map(([month, sales]) => ({
                name: month.slice(0, 3),
                fullMonth: month,
                sales: Number(sales.toFixed(2)),
              }));

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
          className="bg-white/95 backdrop-blur-2xl border border-white/30 rounded-2xl shadow-2xl p-6"
        >
          <p className="font-bold text-gray-800 text-lg mb-2">
            {payload[0].payload.fullMonth}
          </p>
          <div className="flex items-center gap-3">
            <Zap size={24} className="text-yellow-500" />
            <p className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-orange-600">
              ${payload[0].value.toLocaleString()}
            </p>
          </div>
          <p className="text-sm text-gray-600 mt-2">Total Sales</p>
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
        className="bg-white/10 backdrop-blur-2xl rounded-3xl border border-white/20 shadow-2xl p-10 h-[420px] flex flex-col items-center justify-center"
      >
        <div className="relative">
          <div className="w-24 h-24 border-4 border-white/20 border-t-red-500 rounded-full animate-spin" />
          <TrendingUp size={36} className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-red-400" />
        </div>
        <p className="text-white/80 text-xl font-bold mt-8">Crunching sales data...</p>
      </motion.div>
    );
  }

  if (data.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white/10 backdrop-blur-2xl rounded-3xl border border-white/20 shadow-2xl p-16 h-[420px] flex flex-col items-center justify-center text-center"
      >
        <div className="w-28 h-28 bg-white/10 rounded-full flex items-center justify-center mb-8">
          <TrendingUp size={64} className="text-white/30" />
        </div>
        <h3 className="text-3xl font-black text-white mb-4">No Sales Yet</h3>
        <p className="text-gray-400 text-lg max-w-md">
          Your sales journey begins here. Make your first sale and watch the magic happen!
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
      <div className="p-8 border-b border-white/10">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div>
            <h3 className="text-3xl font-black text-white flex items-center gap-4">
              <span className="p-3 bg-gradient-to-br from-red-500 to-orange-600 rounded-2xl shadow-2xl">
                <TrendingUp size={32} />
              </span>
              Sales Over Time
            </h3>
            <p className="text-gray-300 mt-3 text-lg">
              Total Sales: <span className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-500">
                ${totalSales.toLocaleString()}
              </span>
            </p>
          </div>

          
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.6 }}
            className="inline-flex items-center gap-4 bg-gradient-to-r from-red-600 to-orange-600 text-white px-6 py-4 rounded-2xl shadow-2xl font-bold"
          >
            <Zap size={28} className="text-yellow-300" />
            <div>
              <p className="text-sm opacity-90">Peak Month</p>
              <p className="text-2xl font-black">{peakMonth.fullMonth}</p>
            </div>
            <div className="text-right">
              <p className="text-3xl font-black">${peakMonth.sales.toLocaleString()}</p>
            </div>
          </motion.div>
        </div>
      </div>

   
      <div className="p-8">
        <ResponsiveContainer width="100%" height={380}>
          <AreaChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
            <defs>
              <linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#ef4444" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#ef4444" stopOpacity={0} />
              </linearGradient>
            </defs>

            <CartesianGrid strokeDasharray="4 8" stroke="rgba(255,255,255,0.08)" />

            <XAxis
              dataKey="name"
              tick={{ fill: '#e2e8f0', fontSize: 16, fontWeight: 600 }}
              tickLine={false}
              axisLine={{ stroke: 'rgba(255,255,255,0.15)' }}
            />

            <YAxis
              tick={{ fill: '#e2e8f0', fontSize: 14 }}
              tickLine={false}
              axisLine={{ stroke: 'rgba(255,255,255,0.15)' }}
              tickFormatter={(value) => `$${value.toLocaleString()}`}
            />

            <Tooltip content={<CustomTooltip />} cursor={{ stroke: '#ef4444', strokeWidth: 2 }} />

            <Area
              type="monotone"
              dataKey="sales"
              stroke="#ef4444"
              strokeWidth={4}
              fillOpacity={1}
              fill="url(#colorSales)"
              dot={{ fill: '#ef4444', strokeWidth: 3, r: 8 }}
              activeDot={{ r: 12, stroke: '#fff', strokeWidth: 3 }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      
      <div className="px-8 pb-8">
        <div className="grid grid-cols-3 gap-6 text-center">
          {[
            { label: "Best Month", value: peakMonth.fullMonth, color: "from-yellow-500 to-orange-600" },
            { label: "Total Sales", value: `$${totalSales.toLocaleString()}`, color: "from-red-500 to-pink-600" },
            { label: "Months Tracked", value: data.length, color: "from-purple-500 to-indigo-600" },
          ].map((stat, i) => (
            <div key={i} className={`bg-gradient-to-br ${stat.color} text-white p-5 rounded-2xl shadow-xl`}>
              <p className="text-sm opacity-90">{stat.label}</p>
              <p className="text-2xl font-black mt-2">{stat.value}</p>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
