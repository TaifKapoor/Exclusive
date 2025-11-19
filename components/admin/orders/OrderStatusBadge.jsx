// components/admin/orders/OrderStatusBadge.jsx
"use client";
import { useState } from 'react';
import toast from 'react-hot-toast';

const statuses = ['pending', 'processing', 'shipped', 'delivered', 'cancelled'];

export default function OrderStatusBadge({ status: initialStatus, onChange, orderId }) {
  const [status, setStatus] = useState(initialStatus);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const colors = {
    pending: 'bg-yellow-100 text-yellow-800',
    processing: 'bg-blue-100 text-blue-800',
    shipped: 'bg-purple-100 text-purple-800',
    delivered: 'bg-green-100 text-green-800',
    cancelled: 'bg-red-100 text-red-800',
  };

  const handleStatusChange = async (newStatus) => {
    if (newStatus === status) {
      setOpen(false);
      return;
    }

    setLoading(true);
    try {
      const res = await fetch(`/api/orders/${orderId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus }),
      });

      if (res.ok) {
        const updatedOrder = await res.json();
        setStatus(updatedOrder.status);
        onChange?.(updatedOrder.status); 
        toast.success(`Status updated to ${newStatus}!`);
      } else {
        const err = await res.json();
        toast.error(err.error || 'Update failed');
      }
    } catch (err) {
      console.error('Status update error:', err);
      toast.error('Network error');
    } finally {
      setLoading(false);
      setOpen(false);
    }
  };

  return (
    <span className="relative inline-block">
      <button
        type="button"
        onClick={() => !loading && setOpen(!open)}
        disabled={loading}
        className={`px-3 py-1 rounded-full text-sm font-medium transition-all ${colors[status]} hover:opacity-90 disabled:opacity-70`}
      >
        {loading ? 'Updating...' : status.charAt(0).toUpperCase() + status.slice(1)} ▼
      </button>

      {open && !loading && (
        <span className="absolute top-full left-0 mt-1 bg-white shadow-lg rounded-lg z-20 min-w-full overflow-hidden border">
          {statuses.map((s) => (
            <button
              key={s}
              type="button"
              onClick={() => handleStatusChange(s)}
              className={`block w-full text-left px-4 py-2 text-sm hover:bg-gray-50 transition ${
                s === status ? 'font-bold bg-indigo-50' : ''
              }`}
            >
              {s.charAt(0).toUpperCase() + s.slice(1)}
            </button>
          ))}
        </span>
      )}
    </span>
  );
}