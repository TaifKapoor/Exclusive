// app/cart/page.jsx
"use client";
import { useState, useEffect } from "react";
import CartItem from "@/components/cart/CartItem";
import CartSummary from "@/components/cart/CartSummary";
import Link from "next/link";
import { ShoppingCart, ArrowLeft, Loader2 } from "lucide-react";
import toast from "react-hot-toast";

const CartPage = () => {
  const [cart, setCart] = useState([]);
  const [products, setProducts] = useState({});
  const [loading, setLoading] = useState(true);

  const fetchCart = async () => {
    try {
      const res = await fetch('/api/cart', { cache: 'no-store' });
      if (!res.ok) throw new Error(`Cart fetch failed: ${res.status}`);
      
      const data = await res.json();
      console.log('Cart items:', data);
      setCart(data || []);

      const productIds = (data || []).map(i => i.productId).filter(Boolean);
      console.log('Product IDs to fetch:', productIds);

      if (productIds.length === 0) {
        setProducts({});
        return;
      }

      const prodRes = await fetch(`/api/products?ids=${productIds.join(',')}`);
      if (!prodRes.ok) {
        const errorText = await prodRes.text();
        console.error('Products API failed:', prodRes.status, errorText);
        throw new Error(`Products fetch failed: ${prodRes.status}`);
      }

      const prodData = await prodRes.json();
      console.log('Fetched products:', prodData);

      if (!Array.isArray(prodData)) {
        console.error('prodData is not array:', prodData);
        setProducts({});
        return;
      }

      const map = {};
      prodData.forEach(p => {
        if (p.id) map[p.id] = { ...p, image: p.images?.[0] || '/placeholder.png' };
      });
      setProducts(map);

    } catch (error) {
      console.error('fetchCart error:', error.message);
      setCart([]);
      setProducts({});
      toast.error('Failed to load cart');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCart();
    
    const handleUpdate = () => fetchCart();
    window.addEventListener('cartUpdated', handleUpdate);
    return () => window.removeEventListener('cartUpdated', handleUpdate);
  }, []);

  const removeFromCart = async (productId) => {
    try {
      const res = await fetch('/api/cart', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ productId })
      });

      if (!res.ok) throw new Error('Failed to remove');

      toast.success('Item removed from cart');
      await fetchCart();
      window.dispatchEvent(new Event('cartUpdated'));
    } catch (error) {
      console.error('Remove error:', error);
      toast.error('Failed to remove item');
    }
  };

  const updateQuantity = async (productId, newQuantity) => {
    if (newQuantity <= 0) return removeFromCart(productId);

    const currentItem = cart.find(i => i.productId === productId);
    if (!currentItem) return;
    
    const diff = newQuantity - currentItem.quantity;

    try {
      const res = await fetch('/api/cart', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ productId, quantity: diff })
      });

      if (!res.ok) throw new Error('Update failed');

      await fetchCart();
      window.dispatchEvent(new Event('cartUpdated'));
    } catch (error) {
      console.error('Update error:', error);
      toast.error('Failed to update quantity');
    }
  };

  const enrichedCart = cart
    .map(item => ({
      ...item,
      ...(products[item.productId] || { name: 'Loading...', image: '/placeholder.png', price: 0 })
    }))
    .filter(item => item.productId);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="container mx-auto px-4 py-16">
          <div className="flex flex-col items-center justify-center min-h-[400px]">
            <Loader2 className="w-12 h-12 text-blue-600 animate-spin mb-4" />
            <p className="text-gray-600 font-medium">Loading your cart...</p>
          </div>
        </div>
      </div>
    );
  }

  const subtotal = enrichedCart.reduce((sum, item) => sum + (item.price || 0) * item.quantity, 0);
  const shipping = subtotal > 500 ? 0 : 50;
  const total = subtotal + shipping;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-8 lg:py-12">
      <div className="container mx-auto px-4">
        
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-blue-100 rounded-lg">
              <ShoppingCart className="w-6 h-6 text-blue-600" />
            </div>
            <h1 className="text-3xl lg:text-4xl font-bold text-gray-900">
              Shopping Cart
            </h1>
          </div>
          <p className="text-gray-600 ml-14">
            {enrichedCart.length} {enrichedCart.length === 1 ? 'item' : 'items'} in your cart
          </p>
        </div>

        {enrichedCart.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-2xl shadow-lg">
            <div className="max-w-md mx-auto">
              <div className="w-32 h-32 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <ShoppingCart className="w-16 h-16 text-gray-400" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-3">Your cart is empty</h2>
              <p className="text-gray-600 mb-8">Start adding some awesome products!</p>
              <Link 
                href="/products" 
                className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold rounded-xl hover:from-blue-700 hover:to-blue-800 transition-all shadow-lg hover:shadow-xl"
              >
                <ArrowLeft size={20} />
                Start Shopping
              </Link>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
            
            <div className="lg:col-span-2">
              <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
                
                <div className="hidden md:grid md:grid-cols-12 gap-4 px-6 py-4 bg-gradient-to-r from-gray-50 to-gray-100 border-b border-gray-200">
                  <span className="col-span-5 font-semibold text-gray-700">Product</span>
                  <span className="col-span-2 text-center font-semibold text-gray-700">Price</span>
                  <span className="col-span-3 text-center font-semibold text-gray-700">Quantity</span>
                  <span className="col-span-2 text-center font-semibold text-gray-700">Subtotal</span>
                </div>

                {/* Items */}
                <div className="divide-y divide-gray-200">
                  {enrichedCart.map((item) => (
                    <CartItem
                      key={item.productId}
                      item={item}
                      removeFromCart={removeFromCart}
                      updateQuantity={updateQuantity}
                    />
                  ))}
                </div>
              </div>

             
              <div className="mt-6">
                <Link 
                  href="/products" 
                  className="inline-flex items-center gap-2 px-6 py-3 border-2 border-gray-300 text-gray-700 font-medium rounded-xl hover:bg-gray-50 hover:border-gray-400 transition-all"
                >
                  <ArrowLeft size={20} />
                  Continue Shopping
                </Link>
              </div>
            </div>

            
            <div className="lg:col-span-1">
              <div className="lg:sticky lg:top-6">
                <CartSummary subtotal={subtotal} shipping={shipping} total={total} />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartPage;