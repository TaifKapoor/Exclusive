// components/cart/CartSummary.jsx
"use client";
import Link from "next/link";
import { ArrowRight, Truck, Shield, Tag, CreditCard, Sparkles, Zap } from "lucide-react";
import { motion } from "framer-motion";

const CartSummary = ({ subtotal = 0, shipping = 0, total = 0 }) => {
  const freeShippingThreshold = 500;
  const remainingForFreeShipping = Math.max(0, freeShippingThreshold - subtotal);
  const progress = Math.min(100, (subtotal / freeShippingThreshold) * 100);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="relative overflow-hidden rounded-3xl bg-white/70 backdrop-blur-2xl border border-white/50 shadow-2xl"
    >
      
      <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 via-pink-500/5 to-blue-500/5" />
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600" />

      <div className="p-6 md:p-8 lg:p-10">

        
        <div className="flex items-center gap-3 mb-8">
          <div className="p-3 rounded-2xl bg-gradient-to-br from-purple-600 to-pink-600 shadow-xl">
            <CreditCard size={28} className="text-white" />
          </div>
          <div>
            <h3 className="text-2xl md:text-3xl font-black text-gray-900">Order Summary</h3>
            <p className="text-sm text-gray-500 font-medium">Secure • Fast • Trusted</p>
          </div>
        </div>

        
        <div className="space-y-5 mb-8">

          <div className="flex justify-between items-center">
            <span className="text-gray-600 font-medium">Subtotal</span>
            <motion.span
              key={subtotal}
              initial={{ scale: 1.1 }}
              animate={{ scale: 1 }}
              className="text-xl font-bold text-gray-900"
            >
              ${subtotal.toFixed(2)}
            </motion.span>
          </div>

          <div className="flex justify-between items-center">
            <span className="text-gray-600 font-medium">Shipping</span>
            <span className={`text-xl font-bold ${shipping === 0 ? 'text-green-600' : 'text-gray-900'}`}>
              {shipping === 0 ? "FREE" : `$${shipping.toFixed(2)}`}
            </span>
          </div>

          
          {subtotal > 0 && (
            <div className="relative bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl p-5 border border-purple-200/50">
              <div className="flex items-center gap-3 mb-3">
                <Zap size={22} className="text-purple-600 animate-pulse" />
                <p className="font-bold text-purple-900">
                  {subtotal >= freeShippingThreshold ? (
                    <span className="flex items-center gap-2">
                      <Sparkles size={20} className="text-yellow-500" />
                      Congratulations! Free Shipping Unlocked
                    </span>
                  ) : (
                    `Add $${remainingForFreeShipping.toFixed(2)} for FREE shipping`
                  )}
                </p>
              </div>

              <div className="relative h-3 bg-white/70 rounded-full overflow-hidden shadow-inner">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 1, ease: "easeOut" }}
                  className="absolute inset-y-0 left-0 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full shadow-lg"
                />
                <div className="absolute inset-0 bg-white/30 backdrop-blur-sm" />
              </div>
            </div>
          )}
        </div>

        
        <div className="relative bg-gradient-to-r from-purple-600/10 to-pink-600/10 rounded-3xl p-6 mb-8 border border-purple-300/30">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-lg font-semibold text-gray-700">Total Amount</p>
              <p className="text-xs text-gray-500">Including taxes & fees</p>
            </div>
            <motion.div
              key={total}
              initial={{ scale: 1.15 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 300 }}
              className="text-right"
            >
              <span className="text-4xl md:text-5xl font-black bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 bg-clip-text text-transparent">
                ${total.toFixed(2)}
              </span>
            </motion.div>
          </div>
        </div>

        
        <Link href="/checkout">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full relative group overflow-hidden rounded-2xl bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 py-5 shadow-2xl hover:shadow-purple-500/50 transition-all duration-500"
          >
            <div className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-full transition-transform duration-700" />
            <span className="relative flex items-center justify-center gap-3 text-white font-black text-xl">
              Proceed to Checkout
              <ArrowRight size={26} className="group-hover:translate-x-2 transition-transform" />
            </span>
          </motion.button>
        </Link>

        
        <div className="grid grid-cols-2 gap-4 mt-8">
          <div className="flex items-center gap-3 bg-green-50/70 backdrop-blur rounded-2xl p-4 border border-green-200/50">
            <div className="p-2.5 bg-green-600 rounded-xl">
              <Truck size={20} className="text-white" />
            </div>
            <span className="text-sm font-semibold text-green-800">Free Shipping</span>
          </div>
          <div className="flex items-center gap-3 bg-blue-50/70 backdrop-blur rounded-2xl p-4 border border-blue-200/50">
            <div className="p-2.5 bg-blue-600 rounded-xl">
              <Shield size={20} className="text-white" />
            </div>
            <span className="text-sm font-semibold text-blue-800">100% Secure</span>
          </div>
        </div>

        
        <div className="mt-8 pt-6 border-t border-gray-200/50">
          <div className="flex items-center gap-2 mb-4">
            <Tag size={20} className="text-purple-600" />
            <p className="font-bold text-gray-900">Got a promo code?</p>
          </div>
          <div className="flex gap-3">
            <input
              type="text"
              placeholder="Enter code"
              className="flex-1 px-5 py-4 rounded-2xl bg-gray-50 border border-gray-300 focus:border-purple-500 focus:ring-4 focus:ring-purple-500/20 outline-none transition-all text-sm font-medium"
            />
            <button className="px-6 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold rounded-2xl hover:shadow-xl transition-all active:scale-95">
              Apply
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default CartSummary;
