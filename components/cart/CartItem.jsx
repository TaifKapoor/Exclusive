// components/cart/CartItem.jsx
"use client";
import Image from "next/image";
import Link from "next/link";
import { Trash2, Plus, Minus } from "lucide-react";
import { motion } from "framer-motion";
import { useState } from "react";

const CartItem = ({ item, removeFromCart, updateQuantity }) => {
  const [isRemoving, setIsRemoving] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);

  const handleRemove = async () => {
    setIsRemoving(true);
    try {
      await removeFromCart(item.productId);
    } finally {
      setIsRemoving(false);
    }
  };

  const handleQuantityChange = async (newQty) => {
    if (isUpdating || newQty < 1 || newQty > 99) return;
    setIsUpdating(true);
    try {
      await updateQuantity(item.productId, newQty);
    } finally {
      setIsUpdating(false);
    }
  };

  const price = Number(item.price) || 0;
  const subtotal = price * item.quantity;

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, x: -300 }}
      transition={{ duration: 0.4 }}
      className="group relative bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden border border-gray-100"
    >
     
      <div className="absolute inset-0 bg-gradient-to-r from-purple-500/5 to-pink-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

      <div className="p-4 sm:p-6">

       
        <div className="flex flex-col sm:flex-row gap-5 items-start">

         
          <div className="flex items-start gap-4 flex-1 w-full">
            <Link href={`/products/${item.productId}`} className="flex-shrink-0">
              <div className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-2xl overflow-hidden shadow-xl ring-4 ring-white/70">
                <Image
                  src={item.image || "/placeholder.jpg"}
                  alt={item.name}
                  fill
                  sizes="(max-width: 640px) 96px, 112px"
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                />
              </div>
            </Link>

            <div className="flex-1 min-w-0">
              <Link href={`/products/${item.productId}`}>
                <h3 className="font-bold text-lg text-gray-900 hover:text-purple-600 transition-colors line-clamp-2">
                  {item.name || "Product Name"}
                </h3>
              </Link>

              
              <div className="mt-2 sm:hidden">
                <span className="text-xl font-bold text-purple-600">
                  ${price.toFixed(2)}
                </span>
              </div>
            </div>
          </div>

          
          <div className="flex flex-col sm:flex-row items-end sm:items-center gap-4 w-full sm:w-auto">

            
            <div className="flex items-center gap-3 bg-gray-50 rounded-2xl p-2 shadow-inner">
              <button
                onClick={() => handleQuantityChange(item.quantity - 1)}
                disabled={item.quantity <= 1 || isUpdating}
                className="p-2.5 rounded-xl bg-white shadow hover:shadow-md disabled:opacity-50 transition-all active:scale-95"
              >
                <Minus size={18} className="text-gray-700" />
              </button>

              <span className="w-12 text-center text-lg font-bold text-gray-900">
                {isUpdating ? "..." : item.quantity}
              </span>

              <button
                onClick={() => handleQuantityChange(item.quantity + 1)}
                disabled={isUpdating}
                className="p-2.5 rounded-xl bg-white shadow hover:shadow-md transition-all active:scale-95"
              >
                <Plus size={18} className="text-gray-700" />
              </button>
            </div>

       
            <div className="text-right">
              <span className="text-sm text-gray-500 sm:hidden block mb-1">Total</span>
              <motion.span
                key={subtotal}
                initial={{ scale: 1.1 }}
                animate={{ scale: 1 }}
                className="text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600"
              >
                ${subtotal.toFixed(2)}
              </motion.span>
            </div>
          </div>
        </div>

      
        <div className="hidden sm:block text-center mt-4">
          <span className="text-2xl font-black text-gray-900">
            ${price.toFixed(2)}
          </span>
        </div>
      </div>

   
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={handleRemove}
        disabled={isRemoving}
        className="absolute top-19 right-4 p-3 rounded-full bg-red-500/10 backdrop-blur text-red-600 hover:bg-red-500 hover:text-white shadow-lg transition-all duration-300"
      >
        {isRemoving ? (
          <div className="w-5 h-5 border-2 border-red-600 border-t-transparent rounded-full animate-spin" />
        ) : (
          <Trash2 size={20} />
        )}
      </motion.button>

     
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500 opacity-0 group-hover:opacity-100 transition-opacity" />
    </motion.div>
  );
};

export default CartItem;