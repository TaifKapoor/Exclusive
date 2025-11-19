// components/home/ExploreProducts.jsx
import Link from "next/link";
import { ArrowLeft, ArrowRight, Sparkles } from "lucide-react";
import ProductCard from "../products/ProductCard";

const ExploreProducts = async () => {
  let exploreProducts = [];

  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/products?limit=8`, {
      cache: 'no-store',
    });
    if (res.ok) {
      const data = await res.json();
      exploreProducts = Array.isArray(data) ? data.slice(0, 12) : [];
    }
  } catch (err) {
    console.error('ExploreProducts error:', err);
  }

  return (
    <section className="w-full py-24 bg-gradient-to-b from-white via-gray-50 to-white">
      <div className="container mx-auto px-6 lg:px-10 max-w-7xl">

      
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-8 mb-16">
          <div className="max-w-2xl">
            <div className="flex items-center gap-3 mb-4">
              <Sparkles className="w-8 h-8 text-purple-600 animate-pulse" />
              <span className="text-sm font-bold tracking-wider text-purple-600 uppercase">
                Curated Collection
              </span>
            </div>
            <h2 className="text-5xl md:text-6xl lg:text-7xl font-black text-gray-900 leading-tight">
              Explore Our
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 via-pink-600 to-red-600">
                {" "}Products
              </span>
            </h2>
            <p className="text-xl text-gray-600 mt-4">
              Discover handpicked items that define style, quality & innovation
            </p>
          </div>

          
          <div className="flex items-center gap-4">
            <Link
              href="/products"
              className="group relative inline-flex items-center gap-4 px-10 py-5 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold text-lg rounded-2xl shadow-2xl hover:shadow-purple-500/40 transform hover:scale-105 transition-all duration-300 overflow-hidden"
            >
              <span className="relative z-10">View All Products</span>
              <div className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-full transition-transform duration-700" />
              <svg className="w-6 h-6 group-hover:translate-x-2 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>
        </div>

        
        {exploreProducts.length === 0 ? (
          <div className="text-center py-32">
            <div className="w-32 h-32 mx-auto mb-8 bg-gray-100 rounded-3xl flex items-center justify-center">
              <Sparkles size={64} className="text-gray-300" />
            </div>
            <h3 className="text-3xl font-bold text-gray-800 mb-3">No Products Found</h3>
            <p className="text-gray-600 text-lg">Check back soon for amazing new arrivals!</p>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 lg:gap-10">
            {exploreProducts.map((product, index) => (
              <div
                key={product.id || product._id}
                className="group"
                style={{ animationDelay: `${index * 80}ms` }}
              >
                
                <div className="relative transform transition-all duration-500 hover:-translate-y-8 hover:scale-[1.02] hover:shadow-3xl rounded-3xl overflow-hidden">
                  <ProductCard product={product} />
                </div>

               
                {index < 3 && (
                  <div className="absolute -top-4 -left-4 z-30">
                    <div className={`w-14 h-14 rounded-full flex items-center justify-center font-black text-white text-xl shadow-2xl ${
                      index === 0 ? "bg-gradient-to-br from-yellow-400 to-amber-600" :
                      index === 1 ? "bg-gradient-to-br from-gray-400 to-gray-600" :
                      "bg-gradient-to-br from-orange-600 to-red-700"
                    }`}>
                      #{index + 1}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

       
        <div className="mt-20 pt-10 border-t border-gray-200">
          <div className="h-1 w-32 mx-auto bg-gradient-to-r from-purple-600 to-pink-600 rounded-full shadow-lg"></div>
        </div>
      </div>
    </section>
  );
};

export default ExploreProducts;