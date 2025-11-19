// components/admin/products/ProductsTable.jsx
"use client";
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Edit, Trash2, Search, Package } from 'lucide-react';
import toast from 'react-hot-toast';
import Image from 'next/image';

export default function ProductsTable() {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);

  
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch('/api/products');
        const data = await res.json();
        console.log('Products fetched:', data); 
        setProducts(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error('Failed to load products:', error);
        toast.error('Failed to load products');
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

 
  const filtered = products.filter(p =>
    p.name?.toLowerCase().includes(search.toLowerCase())
  );

  
  const handleDelete = async (productId) => {
    if (!confirm('Are you sure you want to delete this product?')) return;

    try {
      const res = await fetch(`/api/products/${productId}`, {
        method: 'DELETE',
      });

      if (res.ok) {
        toast.success('Product deleted successfully!');
        
        setProducts(prev => prev.filter(p => p.id !== productId));
      } else {
        const err = await res.json();
        toast.error(err.error || 'Delete failed');
      }
    } catch (err) {
      console.error('Delete error:', err);
      toast.error('Network error');
    }
  };

 
  if (loading) {
    return (
      <div className="bg-white rounded-xl shadow p-8">
        <div className="flex justify-center items-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
          <p className="ml-3 text-gray-600">Loading products...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow overflow-hidden">
    
      <div className="p-4 border-b border-gray-200 bg-gray-50">
        <div className="flex gap-4 items-center">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search products by name..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            />
          </div>
          <div className="text-sm text-gray-600">
            {filtered.length} of {products.length} products
          </div>
        </div>
      </div>

      
      {filtered.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Image
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Product Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Price
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Category
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Rating
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filtered.map(product => {
               
                const productId = product.id || product._id;
                
                
                const productImage = product.images?.[0] || product.image || '/placeholder.png';

                return (
                  <tr key={productId} className="hover:bg-gray-50 transition-colors">
                    
                    <td className="px-6 py-4">
                      <div className="w-16 h-16 relative bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                        <Image
                          src={productImage}
                          alt={product.name || 'Product'}
                          fill
                          sizes="64px"
                          className="object-cover"
                          onError={(e) => {
                            e.target.src = '/placeholder.png';
                          }}
                        />
                      </div>
                    </td>

                    
                    <td className="px-6 py-4">
                      <div className="text-sm font-medium text-gray-900">
                        {product.name}
                      </div>
                      <div className="text-xs text-gray-500">
                        ID: {productId}
                      </div>
                    </td>

                    
                    <td className="px-6 py-4">
                      <div className="text-sm font-semibold text-gray-900">
                        ${product.price?.toFixed(2) || '0.00'}
                      </div>
                      {product.originalPrice && product.originalPrice > product.price && (
                        <div className="text-xs text-gray-500 line-through">
                          ${product.originalPrice.toFixed(2)}
                        </div>
                      )}
                    </td>

                  
                    <td className="px-6 py-4">
                      <span className="inline-flex px-2 py-1 text-xs font-medium rounded-full bg-indigo-100 text-indigo-800">
                        {product.category || 'Uncategorized'}
                      </span>
                    </td>

                    
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-1">
                        <span className="text-yellow-400">★</span>
                        <span className="text-sm font-medium text-gray-900">
                          {product.rating?.toFixed(1) || '0.0'}
                        </span>
                        <span className="text-xs text-gray-500">
                          ({product.reviews || 0})
                        </span>
                      </div>
                    </td>

                  
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                       
                        <Link
                          href={`/products/${productId}`}
                          className="text-gray-600 hover:text-gray-900 transition"
                          title="View Product"
                        >
                          <Package size={18} />
                        </Link>

                        
                        <Link
                          href={`/admin/products/edit/${productId}`}
                          className="text-blue-600 hover:text-blue-800 transition"
                          title="Edit Product"
                        >
                          <Edit size={18} />
                        </Link>

                        
                        <button
                          onClick={() => handleDelete(productId)}
                          className="text-red-600 hover:text-red-800 transition"
                          title="Delete Product"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="p-12 text-center">
          <Package className="mx-auto text-gray-400 mb-4" size={48} />
          <p className="text-gray-600 mb-2">
            {search ? 'No products found matching your search' : 'No products available'}
          </p>
          {search && (
            <button
              onClick={() => setSearch('')}
              className="text-indigo-600 hover:text-indigo-800 text-sm font-medium"
            >
              Clear search
            </button>
          )}
        </div>
      )}
    </div>
  );
}
