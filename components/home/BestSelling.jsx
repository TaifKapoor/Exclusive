// components/home/BestSelling.jsx
import SectionHeader from "../common/SectionHeader";
import ProductCard from "../products/ProductCard";
import Link from "next/link";
import { Package, Loader2, Sparkles } from "lucide-react";

const BestSelling = async () => {
  let bestSellingProducts = [];
  let error = false;

  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/products?limit=4&sort=sales`, {
      cache: 'no-store',
    });

    if (!res.ok) throw new Error('Failed to fetch');

    const data = await res.json();
    bestSellingProducts = Array.isArray(data) ? data.slice(0, 8) : [];
  } catch (err) {
    console.error('BestSelling fetch error:', err);
    error = true;
  }

  return (
    <section className="w-full py-16 sm:py-20 lg:py-24 bg-gradient-to-b from-gray-50 via-white to-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">

     
        <div className="mb-12 lg:mb-16">
          <div className="flex items-center gap-3 mb-4">
            <Sparkles className="w-6 h-6 sm:w-7 sm:h-7 text-yellow-500 animate-pulse" />
            <span className="text-xs sm:text-sm font-bold tracking-widest text-yellow-600 uppercase">
              This Month's Champions
            </span>
          </div>
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-black text-gray-900 leading-none">
            Best Selling<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-600 via-pink-600 to-purple-600">
              Products
            </span>
          </h2>
          <p className="text-base sm:text-lg text-gray-600 mt-4 max-w-xl">
            Most loved by thousands of customers worldwide
          </p>
        </div>

       
        {bestSellingProducts.length === 0 && !error && (
          <div className="text-center py-24">
            <Loader2 className="w-16 h-16 mx-auto text-red-600 animate-spin mb-6" />
            <p className="text-lg text-gray-600">Loading top sellers...</p>
          </div>
        )}

        {error && (
          <div className="text-center py-24">
            <Package className="w-20 h-20 mx-auto text-gray-400 mb-6" />
            <p className="text-xl text-gray-600">Something went wrong!</p>
          </div>
        )}

        
        {bestSellingProducts.length > 0 && (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8 xl:gap-10">
              {bestSellingProducts.map((product) => (
                <div key={product._id || product.id} className="group">
               

                  <div className="transform transition-all duration-500 hover:-translate-y-4 hover:shadow-2xl rounded-2xl sm:rounded-3xl overflow-hidden bg-white">
                    <ProductCard product={product} />
                  </div>
                </div>
              ))}
            </div>

           
            <div className="mt-12 text-center lg:hidden">
              <Link
                href="/products?sort=best-selling"
                className="inline-flex items-center gap-4 px-10 py-5 bg-black text-white font-bold text-lg rounded-full shadow-2xl hover:bg-gray-900 transition-all"
              >
                View All Products
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </div>
          </>
        )}
      </div>
    </section>
  );
};

export default BestSelling;