// components/admin/customers/CustomersTable.jsx
"use client";

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { User, ShoppingBag, DollarSign, ArrowRight } from 'lucide-react';

export default function CustomersTable() {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/analytics/customers', { cache: 'no-store' })
      .then(r => r.json())
      .then(data => {
        setCustomers(Array.isArray(data) ? data : []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-64 mb-6"></div>
          {[...Array(5)].map((_, i) => (
            <div key={i} className="flex gap-6 py-5 border-b border-gray-100">
              <div className="w-12 h-12 bg-gray-200 rounded-full"></div>
              <div className="flex-1 space-y-3">
                <div className="h-5 bg-gray-200 rounded w-48"></div>
                <div className="h-4 bg-gray-200 rounded w-64"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden"
    >
      {/* Header */}
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 px-8 py-6 text-white">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-white/20 rounded-xl">
              <User size={28} />
            </div>
            <div>
              <h2 className="text-2xl font-bold">All Customers</h2>
              <p className="text-white/80">{customers.length} total customers</p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-3xl font-black">
              ${customers.reduce((a, c) => a + c.totalSpent, 0).toFixed(0)}
            </p>
            <p className="text-sm text-white/80">Total Revenue</p>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="text-left px-8 py-5 text-sm font-bold text-gray-700 uppercase tracking-wider">
                Customer
              </th>
              <th className="text-left px-8 py-5 text-sm font-bold text-gray-700 uppercase tracking-wider hidden md:table-cell">
                Email
              </th>
              <th className="text-center px-8 py-5 text-sm font-bold text-gray-700 uppercase tracking-wider">
                Orders
              </th>
              <th className="text-right px-8 py-5 text-sm font-bold text-gray-700 uppercase tracking-wider">
                Total Spent
              </th>
              <th className="text-center px-8 py-5 text-sm font-bold text-gray-700 uppercase tracking-wider">
                Action
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {customers.length === 0 ? (
              <tr>
                <td colSpan={5} className="text-center py-16 text-gray-500 text-lg">
                  <User size={64} className="mx-auto mb-4 opacity-30" />
                  <p>No customers found yet</p>
                </td>
              </tr>
            ) : (
              customers.map((c, i) => (
                <motion.tr
                  key={c._id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: i * 0.05 }}
                  className="hover:bg-gray-50 transition-colors"
                >
                 
                  <td className="px-8 py-6">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-lg shadow-md">
                        {c.name.charAt(0).toUpperCase()}
                      </div>
                      <div>
                        <p className="font-semibold text-gray-900 text-lg">{c.name}</p>
                        <p className="text-gray-500 text-sm md:hidden">{c.email}</p>
                      </div>
                    </div>
                  </td>

                  {/* Email */}
                  <td className="px-8 py-6 text-gray-600 hidden md:table-cell">
                    {c.email}
                  </td>

                  {/* Orders */}
                  <td className="px-8 py-6 text-center">
                    <span className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-100 text-indigo-700 rounded-full font-bold text-sm">
                      <ShoppingBag size={16} />
                      {c.orders}
                    </span>
                  </td>

                  {/* Total Spent */}
                  <td className="px-8 py-6 text-right">
                    <p className="text-2xl font-bold text-green-600">
                      ${c.totalSpent.toFixed(2)}
                    </p>
                  </td>

                  {/* Action */}
                  <td className="px-8 py-6 text-center">
                    <Link
                      href={`/admin/customers/${c._id}`}
                      className="inline-flex items-center gap-2 px-5 py-2.5 bg-indigo-600 text-white font-semibold rounded-xl hover:bg-indigo-700 transition-all hover:gap-3"
                    >
                      View
                      <ArrowRight size={18} />
                    </Link>
                  </td>
                </motion.tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      
      {customers.length > 0 && (
        <div className="bg-gray-50 px-8 py-6 border-t border-gray-200">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <p className="text-gray-600 text-sm">Customers</p>
              <p className="text-3xl font-black text-gray-900">{customers.length}</p>
            </div>
            <div>
              <p className="text-gray-600 text-sm">Total Orders</p>
              <p className="text-3xl font-black text-indigo-600">
                {customers.reduce((a, c) => a + c.orders, 0)}
              </p>
            </div>
            <div>
              <p className="text-gray-600 text-sm">Revenue</p>
              <p className="text-3xl font-black text-green-600">
                ${customers.reduce((a, c) => a + c.totalSpent, 0).toFixed(2)}
              </p>
            </div>
            <div>
              <p className="text-gray-600 text-sm">Avg Order</p>
              <p className="text-3xl font-black text-purple-600">
                ${customers.length > 0
                  ? (customers.reduce((a, c) => a + c.totalSpent, 0) / 
                     customers.reduce((a, c) => a + (c.orders || 1), 0)).toFixed(2)
                  : '0.00'}
              </p>
            </div>
          </div>
        </div>
      )}
    </motion.div>
  );
}