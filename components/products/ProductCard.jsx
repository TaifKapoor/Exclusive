// components/products/ProductCard.jsx
"use client";
import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Heart, Eye, ShoppingCart, Star } from "lucide-react";
import toast from "react-hot-toast";
import { motion } from "framer-motion";

const ProductCard = ({ product }) => {
  const [isAddingToWishlist, setIsAddingToWishlist] = useState(false);
  const [isAddingToCart, setIsAddingToCart] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const productId = product.id;


  const addToWishlist = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (isAddingToWishlist) return;
    setIsAddingToWishlist(true);

    try {
      const res = await fetch('/api/wishlist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ productId }),
        credentials: 'include'
      });

      const data = await res.json();
      if (res.ok) {
        toast.success('Added to wishlist! ');

        window.dispatchEvent(new Event("wishlistUpdated"));
      } else {
        toast.error(data.error || 'Failed');
      }
    } catch (error) {
      toast.error('Network error');
    } finally {
      setIsAddingToWishlist(false);
    }
  };


  const addToCart = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (isAddingToCart) return;
    setIsAddingToCart(true);

    try {
      const res = await fetch('/api/cart', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ productId, quantity: 1 }),
        credentials: 'include'
      });

      if (res.status === 401) {
        toast.error("Please login first!");
        window.location.href = "/login";
        return;
      }

      if (res.ok) {
        toast.success('Added to cart!');
        window.dispatchEvent(new Event('cartUpdated'));
      } else {
        toast.error('Failed to add');
      }
    } catch (error) {
      toast.error('Something went wrong');
    } finally {
      setIsAddingToCart(false);
    }
  };

  const renderStars = (rating = 0) => {
    return [...Array(5)].map((_, i) => (
      <Star
        key={i}
        size={16}
        className={`transition-all ${i < Math.round(rating)
            ? "fill-amber-400 text-amber-400"
            : "fill-gray-200 text-gray-300"
          }`}
      />
    ));
  };

  return (
    <motion.div
      whileHover={{ y: -12 }}
      transition={{ duration: 0.4 }}
      className="group relative bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-100"
     
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onTouchStart={() => setIsHovered(true)}   
      onTouchEnd={() => setTimeout(() => setIsHovered(false), 2000)}
    >
      <div className="relative aspect-square bg-gradient-to-br from-gray-50 via-white to-gray-100 overflow-hidden">

  
        {product.discount > 0 && (
          <motion.span
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="absolute top-5 left-5 z-30 bg-gradient-to-r from-red-600 to-pink-600 text-white text-sm font-black px-5 py-2.5 rounded-full shadow-2xl"
          >
            -{product.discount}%
          </motion.span>
        )}

        
        <div
          className={`absolute top-5 right-5 flex flex-col gap-3 z-30 transition-all duration-500 ${isHovered
              ? 'opacity-100 translate-x-0'
              : 'opacity-0 translate-x-16'
            }`}
        >
          <button
            onClick={addToWishlist}
            disabled={isAddingToWishlist}
            className="w-12 h-12 rounded-full bg-white/95 backdrop-blur-xl shadow-2xl hover:bg-red-500 hover:text-white flex items-center justify-center transition-all border border-gray-200"
          >
            {isAddingToWishlist ? (
              <div className="w-5 h-5 border-2 border-red-500 border-t-transparent rounded-full animate-spin" />
            ) : (
              <Heart size={22} className={`transition-all ${isAddingToWishlist ? 'fill-red-500' : ''}`} />
            )}
          </button>

          <Link
            href={`/products/${productId}`}
            className="w-12 h-12 rounded-full bg-white/95 backdrop-blur-xl shadow-2xl hover:bg-black hover:text-white flex items-center justify-center transition-all border border-gray-200"
          >
            <Eye size={22} />
          </Link>
        </div>

        
        <Link href={`/products/${productId}`} className="block w-full h-full">
          <Image
            src={encodeURI(product.image || product.images?.[0] || '/placeholder.jpg')}
            alt={product.name}
            fill
            sizes="(max-width: 768px) 50vw, 25vw"
            className="object-contain p-10 transition-transform duration-700 group-hover:scale-110"
          />
        </Link>

        
        <motion.div
          className={`absolute inset-x-0 bottom-0 transition-transform duration-500 ease-out ${isHovered ? 'translate-y-0' : 'translate-y-full'
            }`}
          initial={false}
        >
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={addToCart}
            disabled={isAddingToCart}
            className="w-full py-5 bg-gradient-to-r from-black to-gray-900 text-white font-bold text-lg tracking-wide flex items-center justify-center gap-3 shadow-2xl hover:from-red-600 hover:to-pink-600 transition-all duration-300"
          >
            {isAddingToCart ? (
              <>
                <div className="w-6 h-6 border-3 border-white border-t-transparent rounded-full animate-spin" />
                Adding...
              </>
            ) : (
              <>
                <ShoppingCart size={24} />
                Add to Cart
              </>
            )}
          </motion.button>
        </motion.div>
      </div>


      <div className="p-6 space-y-4 bg-white">
        <Link href={`/products/${productId}`}>
          <h3 className="font-bold text-xl text-gray-900 line-clamp-2 hover:text-red-600 transition-colors">
            {product.name}
          </h3>
        </Link>

        <div className="flex items-center gap-4">
          <span className="text-3xl font-black text-red-600">
            ${product.price?.toFixed(2)}
          </span>
          {product.originalPrice > product.price && (
            <span className="text-lg text-gray-400 line-through">
              ${product.originalPrice.toFixed(2)}
            </span>
          )}
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1">
            {renderStars(product.rating)}
          </div>
          <span className="text-sm font-medium text-gray-600">
            ({product.reviews || 0})
          </span>
        </div>
      </div>
    </motion.div>
  );
};

export default ProductCard;