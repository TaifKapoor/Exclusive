// app/admin/page.jsx

import RecentOrders from '@/components/admin/dashboard/RecentOrders';
import SalesChart from '@/components/admin/dashboard/SalesChart';
import TopProducts from '@/components/admin/dashboard/TopProducts';
import { DollarSign, ShoppingCart, Users, TrendingUp } from 'lucide-react';

async function getStats() {
  const baseUrl = process.env.NEXT_PUBLIC_URL || 'http://localhost:3000';
  try {
    const res = await fetch(`${baseUrl}/api/analytics/stats`, { 
      cache: 'no-store',
      next: { revalidate: 30 }
    });
    if (!res.ok) throw new Error();
    return await res.json();
  } catch {
    return {
      totalRevenue: 2303,
      totalOrders: 4,
      newCustomers: 4,
      productsSold: 156,
      revenueChange: 23.5,
      ordersChange: 18.2,
      customersChange: 32.7,
      salesChange: 45.1,
    };
  }
}

export default async function AdminDashboard() {
  const stats = await getStats();

  const cards = [
    { title: "Revenue", value: `$${Number(stats.totalRevenue).toLocaleString()}`, change: stats.revenueChange, icon: DollarSign, gradient: "from-emerald-500 to-teal-600" },
    { title: "Orders", value: stats.totalOrders.toLocaleString(), change: stats.ordersChange, icon: ShoppingCart, gradient: "from-blue-500 to-cyan-600" },
    { title: "Customers", value: stats.newCustomers.toLocaleString(), change: stats.customersChange, icon: Users, gradient: "from-purple-500 to-pink-600" },
    { title: "Products Sold", value: stats.productsSold.toLocaleString(), change: stats.salesChange, icon: TrendingUp, gradient: "from-orange-500 to-red-600" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-6 md:p-8">
      <div className="max-w-7xl mx-auto space-y-10">

     
        <div className="text-center md:text-left animate-in fade-in slide-in-from-bottom-8 duration-700 mt-8">
          <h1 className="text-5xl md:text-6xl font-black text-white mb-4 bg-clip-text bg-gradient-to-r from-white to-gray-400 ">
            Admin Dashboard
          </h1>
          <p className="text-xl text-gray-300">Your empire is growing</p>
        </div>

        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {cards.map((card, i) => (
            <div
              key={i}
              className={`relative group animate-in fade-in slide-in-from-bottom-12 duration-700`}
              style={{ animationDelay: `${i * 100}ms` }}
            >
              <div className="absolute inset-0 bg-white/10 rounded-3xl blur-xl group-hover:blur-2xl transition-all duration-500" />
              <div className="relative bg-white/10 backdrop-blur-2xl border border-white/20 rounded-3xl p-8 shadow-2xl hover:scale-105 transition-all duration-300 overflow-hidden">
                <div className={`absolute inset-0 bg-gradient-to-br ${card.gradient} opacity-70`} />
                
                <div className="relative text-white">
                  <div className="flex justify-between items-start mb-6">
                    <div className="p-4 bg-white/20 rounded-2xl backdrop-blur">
                      <card.icon size={36} />
                    </div>
                    <span className="px-3 py-1 bg-green-500/20 text-green-300 rounded-full text-sm font-bold flex items-center gap-1">
                      <TrendingUp size={16} /> +{card.change}%
                    </span>
                  </div>
                  <p className="text-4xl md:text-5xl font-black">{card.value}</p>
                  <p className="text-white/80 mt-2 text-lg">{card.title}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

       
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
           
            <div className="bg-white/10 backdrop-blur-2xl rounded-3xl border border-white/20 shadow-2xl overflow-hidden animate-in fade-in slide-in-from-left duration-700">
              <div className="p-8 border-b border-white/10">
                <h2 className="text-3xl font-black text-white flex items-center gap-3">
                  <TrendingUp className="text-green-400" size={36} />
                  Sales Overview
                </h2>
              </div>
              <div className="p-6">
                <SalesChart />
              </div>
            </div>
          </div>

          <div>
           
            <div className="bg-white rounded-3xl border border-gray-200 shadow-2xl overflow-hidden animate-in fade-in slide-in-from-right duration-700">
              <div className="p-8 border-b border-gray-100">
                
                <h2 className="text-3xl font-black text-gray-900">Top Products</h2>
              </div>
              <div className="p-6 text-gray-900">
                <TopProducts />
              </div>
            </div>
          </div>
        </div>

      
        <div className="bg-white rounded-3xl border border-gray-200 shadow-2xl overflow-hidden animate-in fade-in slide-in-from-bottom-20 duration-700">
          <div className="p-8 border-b border-gray-100">
           
            <h2 className="text-3xl font-black text-gray-900">Recent Orders</h2>
          </div>
          <div className="p-6 text-gray-900"> 
            <RecentOrders />
          </div>
        </div>

      </div>
    </div>
  );
}