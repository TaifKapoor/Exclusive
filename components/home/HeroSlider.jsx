"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, ChevronRight, Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const banners = [
  {
    title: "iPhone 16 Pro Max",
    subtitle: "The Ultimate iPhone Experience",
    discount: "Up to 15% OFF + Free Case",
    image: "/images/banners/iPhone.jpg",
    link: "/products/iphone-16-pro",
  },
  {
    title: "Galaxy Z Fold 6",
    subtitle: "Unfold the Future",
    discount: "Launch Offer – Save ₹25,000",
    image: "/images/banners/Galaxy.jpg",
    link: "/products/galaxy-z-fold6",
  },
  {
    title: "MacBook Pro M4",
    subtitle: "Power. Redefined.",
    discount: "Starting at ₹1,69,900",
    image: "/images/banners/MacBook.jpg",
    link: "/products/macbook-pro-m4",
  },
  {
    title: "AirPods Pro 2",
    subtitle: "Hear the Magic",
    discount: "Best Price of the Year",
    image: "/images/banners/AirPods.jpg",
    link: "/products/airpods-pro-2",
  },
];

const HeroSlider = () => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % banners.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => setCurrent((prev) => (prev + 1) % banners.length);
  const prevSlide = () => setCurrent((prev) => (prev - 1 + banners.length) % banners.length);

  return (
    <div className="relative w-full h-screen max-h-[680px] md:max-h-[780px] overflow-hidden bg-black">
      <AnimatePresence mode="wait">
        <motion.div
          key={current}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.2, ease: "easeInOut" }}
          className="absolute inset-0"
        >
          <Image
            src={banners[current].image}
            alt={banners[current].title}
            fill
            priority
            className="object-cover object-center brightness-[0.85] scale-105 transition-all duration-1000"
          />

          <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/30 to-transparent" />

          <div className="relative z-10 h-full flex items-center">
            <div className="container mx-auto px-6 sm:px-12 lg:px-20">
              <motion.div
                initial={{ y: 80, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.4, duration: 0.9 }}
                className="max-w-3xl"
              >
                <div className="inline-flex items-center gap-2 bg-white/15 backdrop-blur-lg border border-white/30 rounded-full px-6 py-3 mb-6">
                  <Sparkles className="w-5 h-5 text-yellow-400" />
                  <span className="text-sm font-semibold text-white">Limited Time Offer</span>
                </div>

                <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-white leading-tight mb-4 drop-shadow-2xl">
                  {banners[current].title}
                </h1>

                <motion.p
                  initial={{ y: 30, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.6 }}
                  className="text-2xl sm:text-3xl md:text-4xl font-light text-gray-100 mb-6"
                >
                  {banners[current].subtitle}
                </motion.p>

                <motion.div
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.8 }}
                  className="inline-block bg-gradient-to-r from-red-600 to-pink-600 text-white px-9 py-5 rounded-full text-xl font-bold mb-8 shadow-2xl"
                >
                  {banners[current].discount}
                </motion.div>

                <motion.div initial={{ y: 40, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 1 }}>
                  <Link
                    href= "/products"
                    className="group inline-flex items-center gap-4 bg-white text-black font-bold px-12 py-6 rounded-full text-lg hover:bg-gray-100 transition-all duration-300 shadow-2xl hover:shadow-red-500/40"
                  >
                    <span>Shop Now</span>
                    <ChevronRight className="w-7 h-7 group-hover:translate-x-2 transition-transform" />
                  </Link>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      
      <button
        onClick={prevSlide}
        className="absolute left-3 sm:left-6 top-1/2 -translate-y-1/2 z-20 
                   bg-white/10 hover:bg-white/25 backdrop-blur-md text-white 
                   p-2 sm:p-3 rounded-full transition-all duration-300 
                   border border-white/20 shadow-lg"
      >
        <ChevronLeft size={20} className="sm:w-9 sm:h-9" />
      </button>

      <button
        onClick={nextSlide}
        className="absolute right-3 sm:right-6 top-1/2 -translate-y-1/2 z-20 
                   bg-white/10 hover:bg-white/25 backdrop-blur-md text-white 
                   p-2 sm:p-3 rounded-full transition-all duration-300 
                   border border-white/20 shadow-lg"
      >
        <ChevronRight size={20} className="sm:w-9 sm:h-9" />
      </button>

    
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex gap-3 z-20">
        {banners.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={`transition-all duration-500 ${
              i === current
                ? "w-12 sm:w-14 h-3 bg-white rounded-full shadow-lg"
                : "w-3 h-3 bg-white/50 rounded-full hover:bg-white/80"
            }`}
          />
        ))}
      </div>

     
      <div className="absolute bottom-0 left-0 w-full h-1 bg-white/20">
        <motion.div
          key={current}
          initial={{ width: "0%" }}
          animate={{ width: "100%" }}
          transition={{ duration: 6, ease: "linear" }}
          className="h-full bg-gradient-to-r from-red-500 to-pink-500"
        />
      </div>
    </div>
  );
};

export default HeroSlider;