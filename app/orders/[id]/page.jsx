// app/admin/orders/[id]/page.jsx
"use client";
import { useEffect, useState } from 'react';
import Link from 'next/link';
import OrderStatusBadge from '@/components/admin/orders/OrderStatusBadge';
import toast from 'react-hot-toast';

export default function AdminOrderDetailPage({ params }) {
  const [id, setId] = useState(null);
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  
  useEffect(() => {
    const unwrapParams = async () => {
      const unwrappedParams = await params;
      setId(unwrappedParams.id);
    };
    unwrapParams();
  }, [params]);

 
  useEffect(() => {
    if (!id) return;

    fetch(`/api/orders/${id}`)
      .then(r => r.json())
      .then(data => {
        setOrder(data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Failed to fetch order:', err);
        toast.error('Failed to load order');
        setLoading(false);
      });
  }, [id]);

  const updateStatus = async (newStatus) => {
    if (!id) return;

    try {
      const res = await fetch(`/api/orders/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus }),
      });

      if (res.ok) {
        setOrder(prev => ({ ...prev, status: newStatus }));
        toast.success(`Status updated to ${newStatus}`);
      } else {
        const err = await res.json();
        toast.error(err.error || 'Update failed');
      }
    } catch (error) {
      console.error('Update error:', error);
      toast.error('Failed to update status');
    }
  };

  if (loading) {
    return (
      <div className="p-8">
        <div className="max-w-5xl mx-auto">
          <p className="text-center text-gray-600">Loading order details...</p>
        </div>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="p-8">
        <div className="max-w-5xl mx-auto text-center">
          <p className="text-gray-600 mb-4">Order not found</p>
          <Link href="/admin/orders" className="text-indigo-600 hover:underline">
            ← Back to Orders
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="p-8">
      <div className="max-w-5xl mx-auto">
        
        <div className="mb-6">
          <Link 
            href="/admin/orders" 
            className="text-indigo-600 hover:underline mb-4 inline-block"
          >
            ← Back to Orders
          </Link>
          <h1 className="text-3xl font-bold">Order #{order.orderId}</h1>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          
          <div className="lg:col-span-2 space-y-6">
           
            <div className="bg-white p-6 rounded-xl shadow">
              <h2 className="text-xl font-bold mb-4">Order Info</h2>
             
              <p className="mb-1">
                <strong>Total:</strong> ${(order.totalAmount || order.total || 0).toFixed(2)}
              </p>
              <p className="mb-1">
                <strong>Status:</strong>{' '}
                <OrderStatusBadge
                  status={order.status}
                  orderId={order.orderId}
                  onChange={updateStatus}
                />
              </p>
              <p className="mb-1">
                <strong>Date:</strong>{' '}
                {new Date(order.createdAt).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit'
                })}
              </p>
              <p className="mb-1">
                <strong>Payment:</strong> {order.paymentMethod?.toUpperCase() || 'COD'}
              </p>
            </div>

            
            <div className="bg-white p-6 rounded-xl shadow">
              <h2 className="text-xl font-bold mb-4">Order Items</h2>
              <div className="space-y-4">
                {order.items?.map((item, idx) => (
                  <div key={idx} className="flex items-center gap-4 pb-4 border-b last:border-b-0">
                    {item.image && (
                      <div className="w-16 h-16 bg-gray-100 rounded overflow-hidden flex-shrink-0">
                        <img 
                          src={item.image} 
                          alt={item.name} 
                          className="w-full h-full object-cover"
                        />
                      </div>
                    )}
                    <div className="flex-1">
                      <p className="font-medium">{item.name}</p>
                      <p className="text-sm text-gray-600">
                        {item.quantity} × ${(item.price || 0).toFixed(2)}
                      </p>
                    </div>
                    <div className="font-semibold">
                      ${((item.price || 0) * (item.quantity || 0)).toFixed(2)}
                    </div>
                  </div>
                ))}

                
                <div className="pt-4 border-t-2">
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-bold">Total:</span>
                    <span className="text-2xl font-bold text-green-600">
                      ${(order.totalAmount || order.total || 0).toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          
          <div className="lg:col-span-1">
            <div className="bg-white p-6 rounded-xl shadow sticky top-4">
              <h2 className="text-xl font-bold mb-4">Customer Details</h2>
              {order.shippingAddress ? (
                <div className="space-y-2 text-sm">
                  <p className="font-semibold text-gray-900">
                    {order.shippingAddress.name}
                  </p>
                  <p className="text-gray-600">{order.shippingAddress.email}</p>
                  <p className="text-gray-600">{order.shippingAddress.phone}</p>
                  
                  <div className="pt-4 mt-4 border-t">
                    <p className="font-semibold mb-2">Shipping Address:</p>
                    <p className="text-gray-600">{order.shippingAddress.address}</p>
                    <p className="text-gray-600">
                      {order.shippingAddress.city}, {order.shippingAddress.zipCode}
                    </p>
                  </div>
                </div>
              ) : (
                <p className="text-gray-500">No customer info available</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}