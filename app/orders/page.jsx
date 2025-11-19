// app/orders/page.jsx
"use client";
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Package, Loader2, AlertCircle } from 'lucide-react';

export default function OrdersPage() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await fetch('/api/orders');
        
        if (!res.ok) {
          throw new Error(`HTTP ${res.status}: ${res.statusText}`);
        }

        const data = await res.json();

        if (!Array.isArray(data)) {
          console.warn('Orders data is not array:', data);
          setOrders([]);
        } else {
          setOrders(data);
        }

      } catch (err) {
        console.error('Fetch orders error:', err);
        setError(err.message);
        setOrders([]);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  if (loading) {
    return (
      <div className="container mx-auto py-20 text-center">
        <Loader2 className="animate-spin mx-auto text-red-600" size={48} />
        <p className="mt-4 text-gray-600">Loading your orders...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto py-20 text-center">
        <AlertCircle className="mx-auto text-red-600" size={64} />
        <p className="mt-4 text-xl text-red-600">Error: {error}</p>
        <button 
          onClick={() => window.location.reload()} 
          className="mt-4 px-6 py-2 bg-red-600 text-white rounded hover:bg-red-700"
        >
          Retry
        </button>
      </div>
    );
  }

  if (orders.length === 0) {
    return (
      <div className="container mx-auto py-20 text-center">
        <Package className="mx-auto text-gray-400" size={80} />
        <p className="mt-6 text-xl text-gray-600">No orders yet.</p>
        <Link href="/" className="mt-4 inline-block px-8 py-3 bg-red-600 text-white rounded hover:bg-red-700">
          Shop Now
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8 px-4 max-w-5xl">
      <h1 className="text-3xl font-bold mb-8 text-center">My Orders</h1>
      <div className="space-y-4">
        {orders.map((order) => (
          <Link
            href={`/orders/${order.orderId}`}
            key={order._id || order.orderId}
            className="block bg-white p-6 rounded-xl shadow hover:shadow-lg border border-gray-100 transition-all"
          >
            <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
              <div>
                <p className="text-xl font-bold text-gray-800">Order #{order.orderId}</p>
                <p className="text-sm text-gray-600">
                  {new Date(order.createdAt).toLocaleDateString('en-US', {
                    weekday: 'long',
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </p>
                {order.shippingAddress?.name && (
                  <p className="text-sm text-gray-500 mt-1">
                    Customer: {order.shippingAddress.name}
                  </p>
                )}
              </div>
              <div className="text-right">
                
                <p className="text-2xl font-bold text-red-600">
                  ${(order.totalAmount || order.total || 0).toFixed(2)}
                </p>
                <p className="text-sm font-medium capitalize text-green-600 bg-green-50 px-3 py-1 rounded-full inline-block mt-1">
                  {order.status || 'pending'}
                </p>
              </div>
            </div>

            
            {order.items && order.items.length > 0 && (
              <div className="mt-4 pt-4 border-t">
                <p className="text-sm text-gray-600 mb-2">
                  {order.items.length} item{order.items.length > 1 ? 's' : ''}
                </p>
                <div className="flex gap-2 flex-wrap">
                  {order.items.slice(0, 3).map((item, idx) => (
                    <span key={idx} className="text-xs bg-gray-100 px-2 py-1 rounded">
                      {item.name}
                    </span>
                  ))}
                  {order.items.length > 3 && (
                    <span className="text-xs text-gray-500 px-2 py-1">
                      +{order.items.length - 3} more
                    </span>
                  )}
                </div>
              </div>
            )}
          </Link>
        ))}
      </div>
    </div>
  );
}