// components/products/WishlistCard.jsx
"use client";
import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Trash2, ShoppingCart } from 'lucide-react';
import toast from 'react-hot-toast';

const WishlistCard = ({ product = {}, onRemove }) => {
  const [isRemoving, setIsRemoving] = useState(false);
  const [isAddingToCart, setIsAddingToCart] = useState(false);


  const productId = product.id;

  if (!productId || !product.name) {
    return null;
  }

  const handleRemove = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (isRemoving) return;
    
    setIsRemoving(true);
    
    try {
      await onRemove(productId);
      toast.success('Removed from wishlist');
    } catch (error) {
      console.error('Remove error:', error);
      toast.error('Failed to remove');
    } finally {
      setIsRemoving(false);
    }
  };

 
  const handleAddToCart = async (e) => {
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

      if (res.ok) {
        toast.success('Added to cart! 🛒');
        window.dispatchEvent(new Event('cartUpdated'));
      } else {
        toast.error('Failed to add to cart');
      }
    } catch (error) {
      console.error('Cart error:', error);
      toast.error('Something went wrong');
    } finally {
      setIsAddingToCart(false);
    }
  };

  return (
    <div className="w-full relative group hover:shadow-xl transition-all duration-300 rounded-xl overflow-hidden bg-white border border-gray-100">
      
      
      <div className="relative bg-gray-50 h-64 flex items-center justify-center overflow-hidden">

        
        {product.discount > 0 && (
          <span className="absolute top-3 left-3 px-3 py-1 bg-red-500 text-white text-xs font-bold rounded-lg shadow-lg z-10">
            -{product.discount}%
          </span>
        )}

        
        <button 
          onClick={handleRemove}
          disabled={isRemoving}
          className="absolute top-3 right-3 p-2 rounded-full bg-white text-red-600 hover:bg-red-600 hover:text-white shadow-lg transition-all z-10 disabled:opacity-50"
          title="Remove from wishlist"
        >
          {isRemoving ? (
            <div className="w-5 h-5 border-2 border-red-600 border-t-transparent rounded-full animate-spin" />
          ) : (
            <Trash2 size={20} />
          )}
        </button>

        
        <Link href={`/products/${productId}`} className="block w-3/4 h-3/4 relative">
          <Image 
            src={product.image || '/placeholder.jpg'} 
            alt={product.name} 
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
            style={{ objectFit: 'contain' }}
            className="transition-transform duration-500 group-hover:scale-110"
          />
        </Link>

        
        <button 
          onClick={handleAddToCart}
          disabled={isAddingToCart}
          className="absolute bottom-0 w-full py-3 bg-black text-white text-sm font-semibold flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-red-500 disabled:opacity-50"
        >
          {isAddingToCart ? (
            <>
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              Adding...
            </>
          ) : (
            <>
              <ShoppingCart size={18} />
              Add To Cart
            </>
          )}
        </button>
      </div>

    
      <div className="p-4">
        <Link href={`/products/${productId}`}>
          <h3 className="text-base font-semibold text-gray-900 mb-2 truncate hover:text-red-600 transition-colors">
            {product.name}
          </h3>
        </Link>

        <div className="flex items-center gap-2">
          <span className="text-red-600 font-bold text-lg">
            ${product.price?.toFixed(2) || '0.00'}
          </span>
          
          {product.originalPrice && product.originalPrice > product.price && (
            <span className="text-gray-400 line-through text-sm">
              ${product.originalPrice.toFixed(2)}
            </span>
          )}
        </div>

        
        {product.rating && (
          <div className="flex items-center gap-1 mt-2">
            <span className="text-yellow-400 text-sm">
              {"★".repeat(Math.floor(product.rating))}
              <span className="text-gray-300">
                {"★".repeat(5 - Math.floor(product.rating))}
              </span>
            </span>
            <span className="text-gray-500 text-xs">
              ({product.reviews || 0})
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

export default WishlistCard;