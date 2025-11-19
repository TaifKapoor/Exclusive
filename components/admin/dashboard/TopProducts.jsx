// components/admin/dashboard/TopProducts.jsx
"use client";
import { useEffect, useState } from 'react';
import Link from 'next/link';
export default function TopProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/analytics/top-products?limit=4', { cache: 'no-store' })
      .then(r => r.json())
      .then(data => {
        setProducts(Array.isArray(data) ? data : []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="bg-white p-6 rounded-xl shadow">
        <h3 className="text-lg font-bold mb-4">Top Products</h3>
        <p className="text-center text-gray-500">Loading...</p>
      </div>
    );
  }

  return (
    <div className="bg-white p-6 rounded-xl shadow">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-bold">Top Products</h3>
        <Link href="/admin/products" className="text-indigo-600 text-sm hover:underline">
          View all →
        </Link>
      </div>

      <div className="space-y-3">
        {products.length === 0 ? (
          <p className="text-center text-gray-500 py-4">No sales yet</p>
        ) : (
          products.map((p, i) => (
            
            <div 
              key={p.id || p._id || `product-${i}`} 
              className="flex justify-between items-center group"
            >
              <div className="flex items-center gap-3">
                <span className="text-xs font-bold text-gray-400 w-6">#{i + 1}</span>
                <div>
                  <p className="text-sm font-medium group-hover:text-indigo-600 transition">
                    {p.name || 'Unknown Product'}
                  </p>
                  <p className="text-xs text-gray-500">{p.sales || 0} sold</p>
                </div>
              </div>
              <span className="text-sm font-semibold text-indigo-600">
                ${(p.revenue || 0).toFixed(2)}
              </span>
            </div>
          ))
        )}
      </div>
    </div>
  );
}