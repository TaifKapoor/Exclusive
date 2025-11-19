// app/wishlist/page.jsx
"use client";
import { useState, useEffect } from "react";
import WishlistCard from '@/components/products/WishlistCard';
import ProductCard from '@/components/products/ProductCard';
import SectionHeader from '@/components/common/SectionHeader';
import { ArrowLeft, ArrowRight, Heart, ShoppingBag } from 'lucide-react';
import toast from 'react-hot-toast';

const WishlistPage = () => {
  const [wishlist, setWishlist] = useState([]);
  const [recommended, setRecommended] = useState([]);
  const [loading, setLoading] = useState(true);
  const [movingToCart, setMovingToCart] = useState(false);

  useEffect(() => {
    fetchWishlist();
    fetchRecommended();

   
    const handleWishlistUpdate = () => {
      fetchWishlist();
    };

    window.addEventListener('wishlistUpdated', handleWishlistUpdate);
    
    return () => {
      window.removeEventListener('wishlistUpdated', handleWishlistUpdate);
    };
  }, []);

  const fetchWishlist = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/wishlist', {
        credentials: 'include'
      });
      
      if (res.ok) {
        const data = await res.json();
        console.log(' Wishlist fetched:', data);
        setWishlist(data);
      } else {
        console.error('Failed to fetch wishlist');
        setWishlist([]);
      }
    } catch (error) {
      console.error('Wishlist fetch error:', error);
      setWishlist([]);
    } finally {
      setLoading(false);
    }
  };

  const fetchRecommended = async () => {
    try {
      const res = await fetch('/api/products?limit=4');
      if (res.ok) {
        const data = await res.json();
        setRecommended(data);
      }
    } catch (error) {
      console.error('Recommended fetch error:', error);
    }
  };

  const removeFromWishlist = async (productId) => {
    try {
      const res = await fetch('/api/wishlist', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ productId }),
        credentials: 'include'
      });

      if (res.ok) {
        
        setWishlist(prev => prev.filter(p => p.id  !== productId));
      } else {
        toast.error('Failed to remove item');
      }
    } catch (error) {
      console.error('Remove error:', error);
      toast.error('Something went wrong');
    }
  };

  const moveAllToCart = async () => {
    if (wishlist.length === 0) {
      toast.error('Your wishlist is empty');
      return;
    }

    setMovingToCart(true);
    
    try {
      let successCount = 0;
      
      for (const product of wishlist) {
        const productId = product.id 
        
        const res = await fetch('/api/cart', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ productId, quantity: 1 }),
          credentials: 'include'
        });

        if (res.ok) {
          successCount++;
        }
      }

      if (successCount > 0) {
        toast.success(`${successCount} items moved to cart! 🛒`);
        window.dispatchEvent(new Event('cartUpdated'));
        
      } else {
        toast.error('Failed to move items');
      }
    } catch (error) {
      console.error('Move to cart error:', error);
      toast.error('Something went wrong');
    } finally {
      setMovingToCart(false);
    }
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-16">
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-center">
            <div className="w-16 h-16 border-4 border-red-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-gray-600">Loading your wishlist...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 lg:py-16">
     
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <div className="flex items-center gap-3">
          <Heart className="text-red-500" size={28} />
          <h1 className="text-2xl lg:text-3xl font-bold text-gray-900">
            My Wishlist ({wishlist.length})
          </h1>
        </div>
        
        <button 
          onClick={moveAllToCart}
          disabled={wishlist.length === 0 || movingToCart}
          className="px-6 py-2.5 border-2 border-gray-900 text-gray-900 text-sm font-semibold rounded-lg hover:bg-gray-900 hover:text-white transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
        >
          {movingToCart ? (
            <>
              <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
              Moving...
            </>
          ) : (
            <>
              <ShoppingBag size={18} />
              Move All To Cart
            </>
          )}
        </button>
      </div>

      
      {wishlist.length === 0 ? (
        <div className="text-center py-16">
          <Heart className="w-24 h-24 text-gray-300 mx-auto mb-4" />
          <h2 className="text-2xl font-semibold text-gray-900 mb-2">Your wishlist is empty</h2>
          <p className="text-gray-600 mb-6">Start adding items you love!</p>
          <a 
            href="/products"
            className="inline-block px-8 py-3 bg-red-500 text-white font-semibold rounded-lg hover:bg-red-600 transition-colors"
          >
            Browse Products
          </a>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 lg:gap-6 mb-16">
          {wishlist.map((product) => (
            <WishlistCard
              key={product._id || product.id}
              product={product}
              onRemove={removeFromWishlist}
            />
          ))}
        </div>
      )}

      
      {recommended.length > 0 && (
        <>
          <div className="flex justify-between items-end mb-8">
            <SectionHeader badgeText="Just For You" title="You May Also Like" />
            <div className="hidden sm:flex gap-2">
              <button className="p-2 rounded-full bg-gray-100 hover:bg-gray-900 hover:text-white transition-colors">
                <ArrowLeft size={24} />
              </button>
              <button className="p-2 rounded-full bg-gray-100 hover:bg-gray-900 hover:text-white transition-colors">
                <ArrowRight size={24} />
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 lg:gap-6">
            {recommended.map((product) => (
              <ProductCard key={product.id || product._id} product={product} />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default WishlistPage;