// components/admin/orders/OrdersTable.jsx
"use client";
import { useEffect, useState } from 'react';
import Link from 'next/link';
import OrderStatusBadge from '@/components/admin/orders/OrderStatusBadge';
import toast from 'react-hot-toast';

export default function OrdersTable() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/orders')
      .then(r => r.json())
      .then(data => {
        setOrders(Array.isArray(data) ? data : []);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Failed to load orders:', error);
        toast.error('Failed to load orders');
        setLoading(false);
      });
  }, []);

  const updateStatus = async (orderId, newStatus) => {
    if (!orderId) {
      toast.error('Invalid order ID');
      return;
    }

    try {
      const res = await fetch(`/api/orders/${orderId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus }),
      });

      if (res.ok) {
       
        setOrders(prev =>
          prev.map(o => o.orderId === orderId ? { ...o, status: newStatus } : o)
        );
        toast.success(`Status updated to ${newStatus}!`);
      } else {
        const err = await res.json();
        toast.error(err.error || 'Update failed');
      }
    } catch (error) {
      console.error('Network error:', error);
      toast.error('Network error');
    }
  };

  if (loading) {
    return (
      <div className="bg-white rounded-xl shadow p-8">
        <div className="flex justify-center items-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
          <p className="ml-3 text-gray-600">Loading orders...</p>
        </div>
      </div>
    );
  }

  if (orders.length === 0) {
    return (
      <div className="bg-white rounded-xl shadow p-8">
        <p className="text-center text-gray-500">No orders found</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Order ID
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Customer
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Total
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Date
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {orders.map(o => (
              <tr key={o._id || o.orderId} className="hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4 whitespace-nowrap">
                  <Link 
                    href={`/admin/orders/${o.orderId}`} 
                    className="text-indigo-600 hover:text-indigo-800 font-medium"
                  >
                    #{o.orderId}
                  </Link>
                </td>
                
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm">
                    <div className="font-medium text-gray-900">
                      {o.shippingAddress?.name || 'Guest'}
                    </div>
                    <div className="text-gray-500">
                      {o.shippingAddress?.email || ''}
                    </div>
                  </div>
                </td>
                
                <td className="px-6 py-4 whitespace-nowrap">
                  
                  <div className="text-sm font-semibold text-gray-900">
                    ${(o.totalAmount || o.total || 0).toFixed(2)}
                  </div>
                </td>
                
                <td className="px-6 py-4 whitespace-nowrap">
                  <OrderStatusBadge
                    status={o.status}
                    orderId={o.orderId}
                    onChange={(newStatus) => updateStatus(o.orderId, newStatus)}
                  />
                </td>
                
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {new Date(o.createdAt).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'short',
                    day: 'numeric'
                  })}
                </td>
                
                <td className="px-6 py-4 whitespace-nowrap text-sm">
                  <Link
                    href={`/admin/orders/${o.orderId}`}
                    className="text-indigo-600 hover:text-indigo-900 font-medium"
                  >
                    View Details →
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}