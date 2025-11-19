// components/home/FlashSales.jsx
import Link from "next/link";
import { Flame, Zap, Clock, Package, Loader2 } from "lucide-react";
import ProductCard from "../products/ProductCard";
import CountdownTimer from "../common/CountdownTimer";

const FlashSales = async () => {
  let products = [];

  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/products?limit=4&flash=true`, {
      cache: 'no-store',
    });
    if (res.ok) {
      const data = await res.json();
      products = Array.isArray(data) ? data.slice(0, 8) : [];
    }
  } catch (err) {
    console.error('FlashSales error:', err);
  }

  return (
    <section className="relative w-full py-24 bg-gradient-to-br from-red-600 via-pink-600 to-purple-700 overflow-hidden">
      
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-10 left-10 w-96 h-96 bg-orange-500 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-10 w-80 h-80 bg-yellow-500 rounded-full blur-3xl animate-pulse delay-1000" />
      </div>

      <div className="container mx-auto px-6 lg:px-10 max-w-7xl relative z-10">

      
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-4 mb-6">
            <Flame className="w-12 h-12 text-yellow-400 animate-pulse" />
            <span className="px-6 py-2 bg-white/20 backdrop-blur-md rounded-full text-yellow-300 font-black text-sm tracking-widest uppercase border border-white/30">
              Limited Time Only
            </span>
            <Zap className="w-12 h-12 text-yellow-400 animate-bounce" />
          </div>

          <h2 className="text-6xl md:text-8xl font-black text-white mb-4">
            FLASH
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-500">
              {" "}SALE
            </span>
          </h2>
          <p className="text-2xl text-white/90 font-bold">
            Up to <span className="text-yellow-400 text-4xl">80% OFF</span> – Ends Soon!
          </p>
        </div>

      
        <div className="flex justify-center mb-16">
          <div className="inline-flex items-center gap-8 bg-black/40 backdrop-blur-2xl rounded-3xl px-12 py-8 border border-white/20 shadow-2xl">
            <div className="flex items-center gap-3">
              <Clock className="w-10 h-10 text-yellow-400 animate-spin-slow" />
              <span className="text-white/80 font-medium text-lg">Sale Ends In</span>
            </div>
            <CountdownTimer 
              targetDate="2025-12-31T23:59:59"
              className="text-5xl font-black text-yellow-400"
            />
          </div>
        </div>

      
        {products.length === 0 ? (
          <div className="text-center py-32">
            <div className="w-40 h-40 mx-auto mb-8 bg-white/10 backdrop-blur-xl rounded-3xl flex items-center justify-center border border-white/20">
              <Package size={80} className="text-white/50" />
            </div>
            <h3 className="text-4xl font-bold text-white mb-4">No Flash Deals Right Now</h3>
            <p className="text-xl text-white/80">Check back soon – lightning deals drop every hour!</p>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {products.map((product, index) => (
              <div
                key={product._id || product.id}
                className="group relative"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                
                <div className="absolute top-4 left-4 z-30">
                  <div className="px-4 py-2 bg-gradient-to-r from-yellow-400 to-orange-500 text-black font-black text-xs rounded-full shadow-2xl flex items-center gap-1 animate-pulse">
                    <Zap size={16} />
                    FLASH
                  </div>
                </div>

               
                {product.stock < 10 && (
                  <div className="absolute top-4 right-4 z-30 bg-red-600 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg animate-bounce">
                    Only {product.stock} left!
                  </div>
                )}

               
                <div className="relative transform transition-all duration-700 hover:-translate-y-12 hover:scale-105 hover:shadow-3xl rounded-3xl overflow-hidden">
                  <ProductCard product={product} />
                </div>
              </div>
            ))}
          </div>
        )}

       
        <div className="text-center mt-20">
          <Link
            href="/flash-sale"
            className="group relative inline-flex items-center gap-5 px-16 py-7 bg-white text-black font-black text-2xl rounded-full shadow-2xl hover:shadow-white/50 transform hover:scale-110 transition-all duration-500 overflow-hidden"
          >
            <span className="relative z-10 flex items-center gap-4">
              <Flame className="w-10 h-10 text-orange-500 group-hover:animate-pulse" />
              Grab Deals Before They're Gone!
              <Zap className="w-10 h-10 text-yellow-500 group-hover:animate-bounce" />
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-yellow-400 to-orange-500 translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-700" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FlashSales;