// app/admin/customers/[id]/page.jsx
"use client";

import { useParams } from 'next/navigation';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { motion } from 'framer-motion';
import { ArrowLeft, Mail, Phone, Calendar, ShoppingBag, DollarSign, TrendingUp, Package, User } from 'lucide-react';

export default function CustomerDetailPage() {
  const { id } = useParams();
  const [customer, setCustomer] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;

    fetch(`/api/analytics/customers/${id}`, { cache: 'no-store' })
      .then(r => {
        if (!r.ok) throw new Error('Not found');
        return r.json();
      })
      .then(data => {
        setCustomer(data);
        setLoading(false);
      })
      .catch(() => {
        toast.error('Customer not found');
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-6">
        <div className="max-w-7xl mx-auto">
          <div className="animate-pulse">
            <div className="h-10 bg-gray-200 rounded w-48 mb-8"></div>
            <div className="grid md:grid-cols-2 gap-6">
              {[1, 2].map(i => (
                <div key={i} className="bg-white rounded-2xl p-8 shadow-lg">
                  <div className="h-8 bg-gray-200 rounded w-40 mb-6"></div>
                  <div className="space-y-4">
                    {[1, 2, 3].map(j => (
                      <div key={j} className="h-5 bg-gray-200 rounded"></div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!customer) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center p-6 mb-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center bg-white rounded-3xl shadow-2xl p-12 max-w-md"
        >
          <div className="w-24 h-24 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <User size={48} className="text-red-600" />
          </div>
          <h2 className="text-3xl font-bold text-gray-800 mb-4">Customer Not Found</h2>
          <Link
            href="/admin/customers"
            className="inline-flex items-center gap-3 px-8 py-4 bg-indigo-600 text-white font-bold rounded-xl hover:bg-indigo-700 transition-all hover:shadow-lg"
          >
            <ArrowLeft size={20} />
            Back to Customers
          </Link>
        </motion.div>
      </div>
    );
  }

  const avgOrderValue = customer.totalOrders > 0 ? customer.totalSpent / customer.totalOrders : 0;

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">

        
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <Link
            href="/admin/customers"
            className="inline-flex items-center gap-3 text-indigo-600 font-bold hover:text-indigo-800 transition-all mb-6 group"
          >
            <ArrowLeft size={24} className="group-hover:-translate-x-1 transition-transform" />
            Back to Customers
          </Link>

          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 bg-white rounded-3xl shadow-xl p-8 border border-gray-100">
            <div className="flex items-center gap-6">
              <div className="w-24 h-24 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-3xl flex items-center justify-center text-white text-4xl font-black shadow-2xl">
                {customer.name.charAt(0).toUpperCase()}
              </div>
              <div>
                <h1 className="text-4xl font-black text-gray-900">{customer.name}</h1>
                <p className="text-xl text-gray-600 mt-2 flex items-center gap-2">
                  <Mail size={20} />
                  {customer.email}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
              <div className="bg-gradient-to-br from-indigo-500 to-purple-600 text-white p-6 rounded-2xl shadow-lg">
                <ShoppingBag size={32} className="mx-auto mb-2" />
                <p className="text-3xl font-black">{customer.totalOrders}</p>
                <p className="text-sm opacity-90">Total Orders</p>
              </div>
              <div className="bg-gradient-to-br from-green-500 to-emerald-600 text-white p-6 rounded-2xl shadow-lg">
                <DollarSign size={32} className="mx-auto mb-2" />
                <p className="text-3xl font-black">${customer.totalSpent.toFixed(0)}</p>
                <p className="text-sm opacity-90">Total Spent</p>
              </div>
              <div className="bg-gradient-to-br from-purple-500 to-pink-600 text-white p-6 rounded-2xl shadow-lg">
                <TrendingUp size={32} className="mx-auto mb-2" />
                <p className="text-3xl font-black">${avgOrderValue.toFixed(0)}</p>
                <p className="text-sm opacity-90">Avg Order</p>
              </div>
              <div className="bg-gradient-to-br from-orange-500 to-red-600 text-white p-6 rounded-2xl shadow-lg">
                <Calendar size={32} className="mx-auto mb-2" />
                <p className="text-2xl font-black">
                  {new Date(customer.joined).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}
                </p>
                <p className="text-sm opacity-90">Member Since</p>
              </div>
            </div>
          </div>
        </motion.div>

        
        <div className="grid lg:grid-cols-2 gap-8 mb-8">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-3xl shadow-xl p-8 border border-gray-100"
          >
            <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-3">
              <User size={28} className="text-indigo-600" />
              Contact Information
            </h2>
            <div className="space-y-5 text-lg">
              <div className="flex items-center gap-4">
                <Mail className="text-gray-500" size={24} />
                <span className="font-medium text-gray-900">{customer.email}</span>
              </div>
              <div className="flex items-center gap-4">
                <Phone className="text-gray-500" size={24} />
                <span className="text-gray-600">{customer.phone || 'Not provided'}</span>
              </div>
              <div className="flex items-center gap-4">
                <Calendar className="text-gray-500" size={24} />
                <span className="text-gray-600">
                  Joined on {new Date(customer.joined).toLocaleDateString('en-US', {
                    weekday: 'long',
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </span>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-gradient-to-br from-indigo-600 to-purple-700 text-white rounded-3xl shadow-2xl p-8"
          >
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
              <TrendingUp size={28} />
              Customer Stats
            </h2>
            <div className="grid grid-cols-2 gap-6 text-center">
              <div>
                <p className="text-5xl font-black">${customer.totalSpent.toFixed(2)}</p>
                <p className="text-white/80 mt-2">Lifetime Value</p>
              </div>
              <div>
                <p className="text-5xl font-black">{customer.totalOrders}</p>
                <p className="text-white/80 mt-2">Total Orders</p>
              </div>
              <div>
                <p className="text-4xl font-black">${avgOrderValue.toFixed(2)}</p>
                <p className="text-white/80 mt-2">Average Order</p>
              </div>
              <div>
                <p className="text-4xl font-black">
                  {Math.round((new Date() - new Date(customer.joined)) / (1000 * 60 * 60 * 24))} days
                </p>
                <p className="text-white/80 mt-2">With You</p>
              </div>
            </div>
          </motion.div>
        </div>

        
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden"
        >
          <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-8 text-white">
            <h2 className="text-3xl font-black flex items-center gap-4">
              <Package size={36} />
              Recent Orders
            </h2>
          </div>

          <div className="p-8">
            {customer.recentOrders?.length > 0 ? (
              <div className="space-y-6">
                {customer.recentOrders.map((order, i) => (
                  <motion.div
                    key={order.orderId}
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 * i }}
                    className="flex flex-col md:flex-row md:items-center md:justify-between p-6 bg-gray-50 rounded-2xl hover:bg-gray-100 transition-all group"
                  >
                    <div className="flex items-center gap-6">
                      <div className="w-16 h-16 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl flex items-center justify-center text-white font-black text-xl shadow-lg">
                        #{order.orderId.slice(-4)}
                      </div>
                      <div>
                        <Link
                          href={`/admin/orders/${order.orderId}`}
                          className="text-2xl font-bold text-indigo-600 hover:text-indigo-800 group-hover:underline"
                        >
                          Order #{order.orderId}
                        </Link>
                        <p className="text-gray-600 mt-1">
                          {new Date(order.createdAt).toLocaleDateString('en-US', {
                            weekday: 'long',
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric'
                          })}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-8 mt-4 md:mt-0">
                      <div className="text-right">
                        <p className="text-3xl font-black text-green-600">
                          ${order.total.toFixed(2)}
                        </p>
                        <p className="text-sm text-gray-500">Total Amount</p>
                      </div>
                      <div className={`px-6 py-3 rounded-full font-bold text-white ${
                        order.status === 'delivered' ? 'bg-green-500' :
                        order.status === 'pending' ? 'bg-yellow-500' :
                        order.status === 'cancelled' ? 'bg-red-500' :
                        'bg-indigo-500'
                      }`}>
                        {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            ) : (
              <div className="text-center py-16">
                <Package size={80} className="mx-auto text-gray-300 mb-6" />
                <p className="text-xl text-gray-500">No orders placed yet</p>
                <p className="text-gray-400 mt-2">This customer hasn't made any purchases</p>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
}