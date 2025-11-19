// app/products/page.jsx
import Link from 'next/link';
import ProductCard from '@/components/products/ProductCard';
import { ChevronDown, Package } from 'lucide-react';
import SortFilter from '@/components/products/SortFilter';

export const dynamic = 'force-dynamic';

const AllProductsPage = async ({ searchParams }) => {
  const category = searchParams.category || '';
  const search = searchParams.search || '';
  const sort = searchParams.sort || 'newest';

  const url = new URL(`${process.env.NEXT_PUBLIC_URL}/api/products`);
  if (category) url.searchParams.set('category', category);
  if (search) url.searchParams.set('search', search);
  if (sort) url.searchParams.set('sort', sort);

  let products = [];
  try {
    const res = await fetch(url, { cache: 'no-store' });
    if (res.ok) {
      const data = await res.json();
      products = Array.isArray(data) ? data : [];
    }
  } catch (err) {
    console.error('Products page error:', err);
  }

  const categoryName = category
    ? category.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())
    : 'All Products';

  return (
    <div className="container mx-auto px-4 py-10 max-w-7xl">
      
      <nav className="flex items-center gap-2 text-sm text-gray-600 mb-8">
        <Link href="/" className="hover:text-primary transition-colors">Home</Link>
        <span className="text-gray-400">/</span>
        <Link href="/products" className="hover:text-primary transition-colors">Products</Link>
        {category && (
          <>
            <span className="text-gray-400">/</span>
            <span className="font-medium text-foreground">{categoryName}</span>
          </>
        )}
      </nav>

      
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-10 gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-foreground">
            {categoryName}
          </h1>
          <p className="text-sm text-gray-600 mt-1">
            Showing <span className="font-semibold">{products.length}</span> results
          </p>
        </div>

       
        <SortFilter currentSort={sort} searchParams={searchParams} />
      </div>

     
      {products.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8">
          {products.map((product) => (
            <div
              key={product._id}
              className="transform transition-all duration-300 hover:scale-105 hover:-translate-y-1"
            >
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <Package size={64} className="text-gray-300 mb-4" />
          <h3 className="text-xl font-semibold text-gray-800 mb-2">
            No products found
          </h3>
          <p className="text-gray-600 max-w-md">
            {category
              ? `No products in "${categoryName}" category.`
              : 'Try adjusting your search or filters.'}
          </p>
          <Link
            href="/products"
            className="mt-6 px-6 py-3 bg-primary text-white rounded-xl font-medium hover:shadow-lg transform hover:scale-105 transition"
          >
            View All Products
          </Link>
        </div>
      )}

     
      {products.length > 0 && (
        <div className="flex justify-center items-center mt-16 space-x-2">
          <button className="px-4 py-2.5 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition disabled:opacity-50 disabled:cursor-not-allowed">
            Previous
          </button>
          <div className="flex gap-1">
            <span className="px-4 py-2.5 bg-primary text-white rounded-lg text-sm font-medium">1</span>
            <span className="px-4 py-2.5 bg-gray-100 text-gray-700 rounded-lg text-sm font-medium">2</span>
            <span className="px-4 py-2.5 bg-gray-100 text-gray-700 rounded-lg text-sm font-medium">3</span>
          </div>
          <button className="px-4 py-2.5 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition">
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default AllProductsPage;