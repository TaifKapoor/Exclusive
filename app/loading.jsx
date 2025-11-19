// app/loading.jsx
"use client"
import { Loader2, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Loading() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-pink-900 to-rose-900 flex items-center justify-center p-6">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="text-center space-y-12"
      >
        {/* Animated Logo */}
        <motion.div
          animate={{ 
            rotate: [0, 360],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "linear"
          }}
          className="relative w-32 h-32 mx-auto"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-purple-500 to-pink-500 rounded-3xl blur-3xl opacity-70 animate-pulse" />
          <div className="relative w-full h-full bg-white/10 backdrop-blur-2xl rounded-3xl border border-white/20 flex items-center justify-center shadow-2xl">
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="text-6xl font-black bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent"
            >
              E
            </motion.div>
          </div>
        </motion.div>

        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="space-y-4"
        >
          <h1 className="text-5xl md:text-7xl font-black text-white tracking-tighter">
            Exclusive<span className="text-pink-400">.</span>
          </h1>
          <p className="text-xl md:text-2xl text-pink-200 font-light">
            Loading your shopping paradise...
          </p>
        </motion.div>

        {/* Animated Loader */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="flex items-center justify-center gap-6"
        >
          <motion.div
            animate={{ rotate: 360 }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "linear"
            }}
          >
            <Loader2 size={48} className="text-pink-400" />
          </motion.div>

          <div className="flex gap-3">
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                animate={{
                  y: [0, -20, 0],
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  delay: i * 0.2,
                  ease: "easeInOut"
                }}
                className="w-4 h-4 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full shadow-lg"
              />
            ))}
          </div>

          <motion.div
            animate={{ rotate: -360 }}
            transition={{
              duration: 2.5,
              repeat: Infinity,
              ease: "linear"
            }}
          >
            <Sparkles size={40} className="text-yellow-400" />
          </motion.div>
        </motion.div>

        {/* Progress Bar */}
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: "100%" }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "linear"
          }}
          className="max-w-md mx-auto mt-12"
        >
          <div className="h-2 bg-white/20 rounded-full overflow-hidden backdrop-blur">
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: "100%" }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "linear"
              }}
              className="h-full bg-gradient-to-r from-purple-500 via-pink-500 to-rose-500 shadow-lg shadow-pink-500/50"
            />
          </div>
        </motion.div>

        {/* Footer Text */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: [0.4, 1, 0.4] }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="text-pink-300 text-sm font-medium tracking-wider"
        >
          PREPARING SOMETHING AMAZING FOR YOU
        </motion.p>
      </motion.div>
    </div>
  );
}