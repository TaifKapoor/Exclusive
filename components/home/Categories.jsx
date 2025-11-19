// components/home/Categories.jsx
"use client";
import { useState, useEffect, useRef } from "react";
import { 
  ArrowLeft, ArrowRight, Package,
  Smartphone, Laptop, Watch, Camera, Headphones, 
  Gamepad2, Shirt, Home, Heart, Dumbbell, BookOpen, Sparkles
} from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

const categoryIcons = {
  "phones": Smartphone,
  "computers": Laptop,
  "smart-watches": Watch,
  "cameras": Camera,
  "headphones": Headphones,
  "gaming": Gamepad2,
  "mens-fashion": Shirt,
  "womens-fashion": Shirt,
  "health-beauty": Heart,
  "home-living": Home,
  "sports-fitness": Dumbbell,
  "books": BookOpen,
};

const Categories = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const scrollRef = useRef(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch('/api/categories');
        if (!res.ok) throw new Error('Failed');
        const data = await res.json();
        setCategories(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error('Categories error:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchCategories();
  }, []);

  const scroll = (direction) => {
    if (!scrollRef.current) return;
    const scrollAmount = direction === "left" ? -320 : 320;
    scrollRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
  };

  if (loading) {
    return (
      <section className="w-full py-20 bg-gradient-to-b from-white via-purple-50/20 to-white">
        <div className="container mx-auto px-6">
          <div className="flex justify-center items-center h-64">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
            >
              <Sparkles size={56} className="text-purple-600" />
            </motion.div>
          </div>
        </div>
      </section>
    );
  }

  if (categories.length === 0) {
    return (
      <section className="w-full py-20 text-center">
        <Package size={80} className="mx-auto text-gray-300 mb-6" />
        <p className="text-xl text-gray-600 font-medium">No categories yet. Coming soon!</p>
      </section>
    );
  }

  return (
    <section className="w-full py-16 md:py-20 lg:py-24 bg-gradient-to-b from-white via-purple-50/30 to-pink-50/20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-10 max-w-7xl">

      
        <div className="text-center mb-12 lg:mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <span className="inline-block px-6 py-2 bg-gradient-to-r from-purple-100 to-pink-100 text-purple-700 font-black text-sm uppercase tracking-wider rounded-full mb-4">
              Shop by Category
            </span>
            <h2 className="text-5xl sm:text-6xl lg:text-7xl font-black text-gray-900 leading-tight">
              Find Your
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 via-pink-600 to-red-600">
                {" "}Vibe
              </span>
            </h2>
          </motion.div>
        </div>

      
        <div className="relative">
         
          <button
            onClick={() => scroll("left")}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 hidden lg:flex items-center justify-center w-14 h-14 rounded-full bg-white/90 backdrop-blur-xl shadow-2xl hover:shadow-purple-500/50 hover:bg-purple-600 hover:text-white transition-all duration-300 border border-gray-200"
          >
            <ArrowLeft size={28} />
          </button>
          <button
            onClick={() => scroll("right")}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 hidden lg:flex items-center justify-center w-14 h-14 rounded-full bg-white/90 backdrop-blur-xl shadow-2xl hover:shadow-purple-500/50 hover:bg-purple-600 hover:text-white transition-all duration-300 border border-gray-200"
          >
            <ArrowRight size={28} />
          </button>

          
          <div
            ref={scrollRef}
            className="flex gap-6 overflow-x-auto scroll-smooth scrollbar-hide snap-x snap-mandatory pb-6 -mx-4 px-4 lg:mx-0 lg:px-0"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {categories.map((category, index) => {
              const Icon = categoryIcons[category.slug] || Package;
              return (
                <motion.div
                  key={category.id}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05 }}
                  className="snap-center flex-none w-52 sm:w-60 lg:w-64"
                >
                  <Link
                    href={`/products?category=${category.slug}`}
                    className="block group"
                  >
                    <motion.div
                      whileHover={{ y: -12 }}
                      whileTap={{ scale: 0.95 }}
                      className="relative h-64 bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden border border-gray-100 group-hover:border-purple-300"
                    >
                      
                      <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 via-pink-500/10 to-red-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                      
                      <div className="absolute top-8 left-1/2 -translate-x-1/2 w-24 h-24 rounded-full bg-gradient-to-br from-purple-100 to-pink-100 flex items-center justify-center shadow-xl group-hover:scale-110 transition-transform duration-500">
                        <Icon size={48} className="text-purple-600 group-hover:text-purple-700" />
                      </div>

                      
                      <div className="absolute bottom-0 left-0 right-0 p-6 text-center">
                        <h3 className="text-xl font-black text-gray-900 mb-1 group-hover:text-purple-700 transition">
                          {category.name}
                        </h3>
                        <p className="text-sm text-gray-500 font-medium">
                          {category.count || 0} Products
                        </p>
                      </div>

                      
                      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700">
                        <div className="absolute inset-0 bg-gradient-to-t from-white/30 to-transparent" />
                      </div>
                    </motion.div>
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </div>


        <div className="lg:hidden text-center mt-8">
          <p className="text-sm text-gray-500 font-medium flex items-center justify-center gap-3">
            <ArrowLeft size={18} className="animate-pulse" />
            Swipe to explore more
            <ArrowRight size={18} className="animate-pulse" />
          </p>
        </div>
      </div>
    </section>
  );
};

export default Categories;