// app/products/[id]/page.jsx
"use client";

import { use } from 'react';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import ProductCard from '@/components/products/ProductCard';
import { Heart, Truck, RefreshCw, ChevronLeft, ChevronRight, ShoppingCart, Star, Package, Shield } from 'lucide-react';
import toast from 'react-hot-toast';
import { motion } from 'framer-motion';

export const dynamic = 'force-dynamic';

const StarRating = ({ rating = 4.85, reviews = 128 }) => (
  <div className="flex items-center gap-3">
    <div className="flex items-center">
      {[...Array(5)].map((_, i) => (
        <Star
          key={i}
          size={20}
          className={`transition-all ${i < Math.floor(rating)
            ? 'text-yellow-500 fill-yellow-500'
            : 'text-gray-300'
            }`}
        />
      ))}
    </div>
    <span className="text-sm font-medium text-gray-600">({reviews} reviews)</span>
    <span className="text-sm font-bold text-green-600 bg-green-50 px-3 py-1 rounded-full">In Stock</span>
  </div>
);

export default function ProductDetailPage({ params }) {
  const { id } = use(params);
  const [product, setProduct] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [mainImageIndex, setMainImageIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [isAddingToCart, setIsAddingToCart] = useState(false);
  const [isAddingToWishlist, setIsAddingToWishlist] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [productRes, relatedRes] = await Promise.all([
          fetch(`/api/products/${id}`, { cache: 'no-store' }),
          fetch(`/api/products?limit=4`, { cache: 'no-store' })
        ]);

        if (productRes.ok) {
          const data = await productRes.json();
          setProduct(data);
        } else {
          toast.error('Product not found');
        }

        if (relatedRes.ok) {
          const data = await relatedRes.json();
          setRelatedProducts(data.filter(p => p._id !== id));
        }
      } catch (error) {
        toast.error('Failed to load product');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50 p-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg2grid-cols-2 gap-12 animate-pulse">
            <div className="space-y-6">
              <div className="bg-white/70 backdrop-blur-xl rounded-3xl h-96 shadow-2xl" />
              <div className="grid grid-cols-5 gap-4">
                {[...Array(5)].map((_, i) => (
                  <div key={i} className="bg-white/70 backdrop-blur-xl rounded-2xl h-24 shadow-lg" />
                ))}
              </div>
            </div>
            <div className="space-y-6">
              <div className="h-12 bg-white/70 backdrop-blur-xl rounded-2xl w-3/4" />
              <div className="h-8 bg-white/70 backdrop-blur-xl rounded-2xl w-1/2" />
              <div className="h-20 bg-white/70 backdrop-blur-xl rounded-2xl" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50 flex items-center justify-center p-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <h1 className="text-4xl font-black text-gray-800 mb-4">Product Not Found</h1>
          <Link href="/products" className="inline-block px-8 py-4 bg-gradient-to-r from-pink-500 to-purple-600 text-white font-bold rounded-full shadow-2xl hover:shadow-pink-500/50 transition">
            Browse Products
          </Link>
        </motion.div>
      </div>
    );
  }

  const images = product.images && product.images.length > 0
    ? product.images
    : ['https://via.placeholder.com/800x800.png?text=No+Image'];

  const handleAddToCart = async () => {
    setIsAddingToCart(true);
    try {
      const res = await fetch('/api/cart', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ productId: product._id || product.id, quantity: 1 }),
        credentials: 'include'
      });

      if (res.ok) {
        toast.success('Added to cart!', { icon: 'Success' });
        window.dispatchEvent(new Event('cartUpdated'));
      } else if (res.status === 401) {
        toast.error('Please login first!');
        window.location.href = '/login';
      } else {
        toast.error('Failed to add to cart');
      }
    } catch {
      toast.error('Something went wrong');
    } finally {
      setIsAddingToCart(false);
    }
  };

  const handleAddToWishlist = async () => {
    setIsAddingToWishlist(true);
    try {
      const res = await fetch('/api/wishlist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ productId: product._id || product.id }),
        credentials: 'include'
      });
      if (res.ok) toast.success('Added to wishlist!', { icon: 'Success' });
      else toast.error('Failed to add to wishlist');
    } catch {
      toast.error('Something went wrong');
    } finally {
      setIsAddingToWishlist(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-rose-50">
      <div className="max-w-7xl mx-auto p-6 pt-10">

        {/* Breadcrumb */}
        <motion.nav
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-sm mb-8 flex items-center gap-3 flex-wrap"
        >
          <Link href="/" className="text-gray-600 hover:text-purple-600 font-medium">Home</Link>
          <ChevronRight size={16} className="text-gray-400" />
          <Link href="/products" className="text-gray-600 hover:text-purple-600 font-medium">Products</Link>
          <ChevronRight size={16} className="text-gray-400" />
          <span className="font-bold text-purple-700 truncate max-w-md">{product.name}</span>
        </motion.nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">

          
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
          
            <div className="relative bg-white/80 backdrop-blur-2xl rounded-3xl overflow-hidden shadow-2xl border border-white/50">
              <Image
                src={images[mainImageIndex]}
                alt={product.name}
                width={800}
                height={800}
                className="w-full h-auto object-contain p-8"
                priority
              />

             
              {images.length > 1 && (
                <>
                  <button
                    onClick={() => setMainImageIndex((prev) => (prev - 1 + images.length) % images.length)}
                    className="absolute left-6 top-1/2 -translate-y-1/2 bg-white/90 backdrop-blur-xl p-4 rounded-full shadow-2xl hover:scale-110 transition"
                  >
                    <ChevronLeft size={28} className="text-gray-800" />
                  </button>
                  <button
                    onClick={() => setMainImageIndex((prev) => (prev + 1) % images.length)}
                    className="absolute right-6 top-1/2 -translate-y-1/2 bg-white/90 backdrop-blur-xl p-4 rounded-full shadow-2xl hover:scale-110 transition"
                  >
                    <ChevronRight size={28} className="text-gray-800" />
                  </button>
                </>
              )}
            </div>

            
            <div className="grid grid-cols-5 gap-4">
              {images.map((img, i) => (
                <motion.button
                  key={i}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setMainImageIndex(i)}
                  className={`relative rounded-2xl overflow-hidden shadow-lg border-4 transition-all ${mainImageIndex === i
                    ? 'border-purple-600 ring-4 ring-purple-300'
                    : 'border-white/50 hover:border-purple-400'
                    }`}
                >
                  <Image
                    src={img}
                    alt={`Thumbnail ${i + 1}`}
                    width={200}
                    height={200}
                    className="w-full h-full object-cover"
                  />
                </motion.button>
              ))}
            </div>
          </motion.div>

          
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-8"
          >
            <div>
              <h1 className="text-4xl lg:text-5xl font-black text-gray-900 mb-4 leading-tight">
                {product.name}
              </h1>
              <StarRating rating={product.rating || 4.8} reviews={product.reviews || 342} />
            </div>

            
            <div className="flex items-baseline gap-4">
              <span className="text-5xl font-black text-purple-700">
                ${Number(product.price).toFixed(2)}
              </span>
              {product.originalPrice > product.price && (
                <span className="text-3xl text-gray-400 line-through">
                  ${Number(product.originalPrice).toFixed(2)}
                </span>
              )}
              <span className="text-2xl font-bold text-green-600 bg-green-100 px-4 py-2 rounded-full">
                {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% OFF
              </span>
            </div>

            <p className="text-lg text-gray-700 leading-relaxed">
              {product.description || "Experience premium quality with this handcrafted product. Designed for comfort and durability, perfect for everyday use."}
            </p>

            <hr className="border-gray-200" />

            
            <div className="flex gap-4">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleAddToCart}
                disabled={isAddingToCart}
                className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 text-white py-5 px-8 rounded-2xl font-bold text-xl shadow-2xl hover:shadow-purple-500/50 transition flex items-center justify-center gap-3 disabled:opacity-70">
                {isAddingToCart ? (
                  <>Adding...</>
                ) : (
                  <>
                    <ShoppingCart size={28} />
                    Add to Cart
                  </>
                )}
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={handleAddToWishlist}
                className="p-5 bg-white border-2 border-purple-600 rounded-2xl shadow-xl hover:bg-purple-50 transition"
              >
                <Heart size={28} className={isAddingToWishlist ? 'fill-purple-600 text-purple-600' : 'text-purple-600'} />
              </motion.button>
            </div>

     
            <div className="grid grid-cols-1 gap-6 bg-white/70 backdrop-blur-xl rounded-3xl p-8 shadow-2xl border border-white/50">
              <div className="flex gap-4">
                <div className="p-4 bg-green-100 rounded-2xl">
                  <Truck size={32} className="text-green-600" />
                </div>
                <div>
                  <h4 className="font-bold text-lg">Free Delivery</h4>
                  <p className="text-gray-600">On orders above $50</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="p-4 bg-blue-100 rounded-2xl">
                  <RefreshCw size={32} className="text-blue-600" />
                </div>
                <div>
                  <h4 className="font-bold text-lg">30-Day Returns</h4>
                  <p className="text-gray-600">No questions asked</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="p-4 bg-purple-100 rounded-2xl">
                  <Shield size={32} className="text-purple-600" />
                </div>
                <div>
                  <h4 className="font-bold text-lg">2-Year Warranty</h4>
                  <p className="text-gray-600">100% genuine product</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        
        {relatedProducts.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="mt-24"
          >
            <h2 className="text-4xl font-black text-center mb-12 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              You Might Also Like
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
              {relatedProducts.map((p, i) => (
                <motion.div
                  key={p._id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                >
                  <ProductCard product={p} />
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}