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
        console.log('Fetched order:', data);
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
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
            <p className="ml-4 text-gray-600">Loading order details...</p>
          </div>
        </div>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="p-8">
        <div className="max-w-5xl mx-auto text-center py-20">
          <p className="text-xl text-gray-600 mb-4">Order not found</p>
          <Link 
            href="/admin/orders" 
            className="inline-block px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
          >
            ← Back to Orders
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <div className="max-w-6xl mx-auto">
        
        <div className="mb-8">
          <Link 
            href="/admin/orders" 
            className="text-indigo-600 hover:text-indigo-800 mb-4 inline-flex items-center gap-2 font-medium"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Orders
          </Link>
          <h1 className="text-4xl font-bold text-gray-900 mt-4">
            Order #{order.orderId}
          </h1>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
         
          <div className="lg:col-span-2 space-y-6">
            
          
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Order Information</h2>
              
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Total Amount</p>
                  <p className="text-2xl font-bold text-green-600">
                    ${(order.totalAmount || 0).toFixed(2)}
                  </p>
                </div>

                <div>
                  <p className="text-sm text-gray-600 mb-1">Payment Method</p>
                  <p className="text-lg font-semibold text-gray-900 uppercase">
                    {order.paymentMethod || 'COD'}
                  </p>
                </div>

                <div>
                  <p className="text-sm text-gray-600 mb-1">Order Status</p>
                  <OrderStatusBadge
                    status={order.status}
                    orderId={order.orderId}
                    onChange={updateStatus}
                  />
                </div>

                <div>
                  <p className="text-sm text-gray-600 mb-1">Order Date</p>
                  <p className="text-sm font-medium text-gray-900">
                    {new Date(order.createdAt).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                  </p>
                </div>
              </div>
            </div>

            
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-6">Order Items</h2>
              
              {order.items && order.items.length > 0 ? (
                <div className="space-y-4">
                  {order.items.map((item, idx) => (
                    <div 
                      key={idx} 
                      className="flex items-center gap-4 pb-4 border-b last:border-b-0"
                    >
                      
                      {item.image && (
                        <div className="w-20 h-20 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                          <img 
                            src={item.image} 
                            alt={item.name} 
                            className="w-full h-full object-cover"
                          />
                        </div>
                      )}
                      
                   
                      <div className="flex-1 min-w-0">
                        <p className="font-semibold text-gray-900 truncate">
                          {item.name}
                        </p>
                        <p className="text-sm text-gray-600 mt-1">
                          Quantity: <span className="font-medium">{item.quantity}</span>
                        </p>
                        <p className="text-sm text-gray-600">
                          Price: <span className="font-medium">${(item.price || 0).toFixed(2)}</span>
                        </p>
                      </div>
                      
                   
                      <div className="text-right">
                        <p className="text-lg font-bold text-gray-900">
                          ${((item.price || 0) * (item.quantity || 0)).toFixed(2)}
                        </p>
                      </div>
                    </div>
                  ))}

                  
                  <div className="pt-6 border-t-2 border-gray-200">
                    <div className="flex justify-between items-center">
                      <span className="text-xl font-bold text-gray-900">Order Total:</span>
                      <span className="text-3xl font-bold text-green-600">
                        ${(order.totalAmount || 0).toFixed(2)}
                      </span>
                    </div>
                  </div>
                </div>
              ) : (
                <p className="text-center text-gray-500 py-8">No items in this order</p>
              )}
            </div>
          </div>

         
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 sticky top-4">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Customer Details</h2>
              
              {order.shippingAddress ? (
                <div className="space-y-4">
                 
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Name</p>
                    <p className="font-semibold text-gray-900">
                      {order.shippingAddress.name}
                    </p>
                  </div>

                  
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Email</p>
                    <p className="text-sm text-gray-900">
                      {order.shippingAddress.email}
                    </p>
                  </div>

                 
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Phone</p>
                    <p className="text-sm text-gray-900">
                      {order.shippingAddress.phone}
                    </p>
                  </div>
                  
                 
                  <div className="pt-4 mt-4 border-t border-gray-200">
                    <p className="text-sm text-gray-600 mb-2">Shipping Address</p>
                    <div className="text-sm text-gray-900 space-y-1">
                      <p>{order.shippingAddress.address}</p>
                      <p>
                        {order.shippingAddress.city}, {order.shippingAddress.zipCode}
                      </p>
                    </div>
                  </div>
                </div>
              ) : (
                <p className="text-gray-500 text-center py-8">
                  No customer information available
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}