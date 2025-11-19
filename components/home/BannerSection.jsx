// components/home/BannerSection.jsx
"use client";                    
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import TimerBox from '../common/TimerBox';

const BannerSection = () => {
  const time = {
    days: 0,
    hours: 23,
    minutes: 5,
    seconds: 59,
  };

  return (
    <div className="relative w-full h-screen max-h-[680px] md:max-h-[700px] overflow-hidden rounded-3xl shadow-2xl">
   
      <motion.div
        initial={{ scale: 1.1 }}
        animate={{ scale: 1 }}
        transition={{ duration: 20, ease: "linear", repeat: Infinity, repeatType: "reverse" }}
        className="absolute inset-0"
      >
        <Image
          src="/images/banners/jbl-speaker.png"
          alt="JBL Boombox - Limited Edition"
          fill
          priority
          sizes="100vw"
          className="object-cover brightness-[0.65]"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/60 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-br from-green-500/20 via-transparent to-purple-600/10 animate-pulse" />
      </motion.div>

      {/* Content */}
      <div className="relative z-10 h-full flex items-center">
        <div className="container mx-auto px-6 md:px-12 lg:px-20">
          <motion.div
            initial={{ opacity: 0, y: 80 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="max-w-3xl"
          >
            <motion.span
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="inline-block px-6 py-2 bg-white/15 backdrop-blur-xl border border-white/30 rounded-full text-sm font-bold tracking-wider text-white mb-8 shadow-2xl"
            >
              PREMIUM AUDIO COLLECTION
            </motion.span>

            <motion.h1
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.9 }}
              className="text-5xl md:text-7xl lg:text-8xl font-black leading-tight text-white mb-8 drop-shadow-2xl"
            >
              Enhance Your
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-500">
                Music Experience
              </span>
            </motion.h1>

            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.8 }}
              className="flex items-center gap-4 md:gap-6 mb-12 flex-wrap"
            >
              <TimerBox value={time.days} label="Days" />
              <TimerBox value={time.hours} label="Hours" />
              <TimerBox value={time.minutes} label="Mins" />
              <TimerBox value={time.seconds} label="Secs" />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.1 }}
            >
              <Link
                href="/products?collection=music"
                className="group relative inline-flex items-center gap-4 px-12 py-6 bg-gradient-to-r from-green-500 to-emerald-600 text-white font-bold text-lg rounded-full shadow-2xl hover:shadow-green-500/40 transform hover:scale-105 transition-all duration-300 overflow-hidden"
              >
                <span className="relative z-10">Buy Now - Limited Stock</span>
                <motion.div
                  className="absolute inset-0 bg-white/20"
                  initial={{ x: "-100%" }}
                  whileHover={{ x: "100%" }}
                  transition={{ duration: 0.6 }}
                />
                <svg className="w-6 h-6 group-hover:translate-x-2 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default BannerSection;
