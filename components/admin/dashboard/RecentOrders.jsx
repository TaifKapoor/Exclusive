// components/admin/dashboard/RecentOrders.jsx
"use client";
import { useEffect, useState } from 'react';
import Link from 'next/link';
export default function RecentOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/orders?limit=5', { cache: 'no-store' })
      .then(r => r.json())
      .then(data => {
        setOrders(Array.isArray(data) ? data.slice(0, 5) : []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const getStatusColor = (status) => {
    const colors = {
      delivered: 'bg-green-100 text-green-800',
      processing: 'bg-blue-100 text-blue-800',
      shipped: 'bg-purple-100 text-purple-800',
      pending: 'bg-yellow-100 text-yellow-800',
      cancelled: 'bg-red-100 text-red-800',
    };
    return colors[status] || 'bg-gray-100 text-gray-800';
  };

  if (loading) {
    return (
      <div className="bg-white p-6 rounded-xl shadow">
        <h3 className="text-lg font-bold mb-4">Recent Orders</h3>
        <p className="text-center text-gray-500">Loading...</p>
      </div>
    );
  }

  return (
    <div className="bg-white p-6 rounded-xl shadow">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-bold">Recent Orders</h3>
        <Link href="/admin/orders" className="text-indigo-600 text-sm hover:underline">
          View all →
        </Link>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b text-left text-xs font-medium text-gray-500 uppercase">
              <th className="py-2">Order</th>
              <th className="py-2">Customer</th>
              <th className="py-2">Total</th>
              <th className="py-2">Status</th>
            </tr>
          </thead>
          <tbody>
            {orders.length === 0 ? (
              <tr>
                <td colSpan="4" className="text-center py-6 text-gray-500">
                  No orders yet
                </td>
              </tr>
            ) : (
              orders.map(o => (
                <tr key={o._id || o.orderId} className="border-b hover:bg-gray-50">
                  <td className="py-3">
                    <Link 
                      href={`/admin/orders/${o.orderId}`} 
                      className="text-indigo-600 hover:underline font-medium"
                    >
                      #{o.orderId}
                    </Link>
                  </td>
                  <td className="py-3">{o.shippingAddress?.name || 'Guest'}</td>
                  <td className="py-3 font-medium">
                    
                    ${(o.totalAmount || o.total || 0).toFixed(2)}
                  </td>
                  <td className="py-3">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(o.status)}`}>
                      {o.status?.charAt(0).toUpperCase() + o.status?.slice(1) || 'Pending'}
                    </span>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}