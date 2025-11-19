// app/checkout/page.jsx
"use client";
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import toast, { Toaster } from 'react-hot-toast';

export default function CheckoutPage() {
  const router = useRouter();
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [cartLoading, setCartLoading] = useState(true);
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    zipCode: ''
  });

 
  useEffect(() => {
    const fetchCart = async () => {
      try {
        setCartLoading(true);
        console.log('Fetching cart...');
        
        const res = await fetch('/api/cart');
        const cartItems = await res.json();
        
        console.log('Cart items:', cartItems);
        
        if (!cartItems || cartItems.length === 0) {
          toast.error('Cart is empty!');
          setTimeout(() => router.push('/cart'), 1500);
          return;
        }

       
        const productIds = cartItems.map(item => item.productId).join(',');
        console.log('Fetching products:', productIds);
        
        const productsRes = await fetch(`/api/products?ids=${productIds}`);
        const products = await productsRes.json();
        
        console.log('Products:', products);

       
        const enriched = cartItems.map(cartItem => {
          const product = products.find(p => p.id === cartItem.productId);
          return {
            productId: cartItem.productId,
            name: product?.name || 'Unknown Product',
            price: product?.price || 0,
            quantity: cartItem.quantity,
            image: product?.images?.[0] || '/placeholder.png'
          };
        });

        console.log('Enriched items:', enriched);
        setItems(enriched);
        
      } catch (error) {
        console.error('Cart fetch error:', error);
        toast.error('Failed to load cart');
      } finally {
        setCartLoading(false);
      }
    };

    fetchCart();
  }, [router]);

  const totalAmount = items.reduce((sum, item) => 
    sum + (item.price * item.quantity), 0
  );

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const validateForm = () => {
    const { name, email, phone, address, city, zipCode } = formData;
    
    console.log('Validating form:', formData);
    
    if (!name || name.trim() === '') {
      toast.error('Please enter your name');
      return false;
    }
    
    if (!email || email.trim() === '') {
      toast.error('Please enter your email');
      return false;
    }
    
    if (!/\S+@\S+\.\S+/.test(email)) {
      toast.error('Please enter a valid email');
      return false;
    }
    
    if (!phone || phone.trim() === '') {
      toast.error('Please enter your phone number');
      return false;
    }
    
    if (phone.length < 10) {
      toast.error('Phone number must be at least 10 digits');
      return false;
    }
    
    if (!address || address.trim() === '') {
      toast.error('Please enter your address');
      return false;
    }
    
    if (!city || city.trim() === '') {
      toast.error('Please enter your city');
      return false;
    }
    
    if (!zipCode || zipCode.trim() === '') {
      toast.error('Please enter your ZIP code');
      return false;
    }

    console.log('Form validation passed');
    return true;
  };

  const confirmPayment = async () => {
    console.log(' confirmPayment called');
    console.log('Current items:', items);
    console.log('Current formData:', formData);
    console.log('Total amount:', totalAmount);
    
   
    if (!validateForm()) {
      console.log(' Form validation failed');
      return;
    }
    
 
    if (!items || items.length === 0) {
      console.log(' No items in cart');
      toast.error('Cart is empty!');
      return;
    }

    console.log(' Starting order creation...');
    setLoading(true);

    try {
      
      const orderData = {
        items: items.map(item => ({
          productId: item.productId,
          name: item.name,
          price: item.price,
          quantity: item.quantity,
          image: item.image
        })),
        totalAmount: totalAmount,
        shippingAddress: {
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          address: formData.address,
          city: formData.city,
          zipCode: formData.zipCode
        },
        paymentMethod: 'cod'
      };

      console.log(' Sending order data:', JSON.stringify(orderData, null, 2));

      
      const response = await fetch('/api/orders', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(orderData)
      });

      console.log(' Response status:', response.status);
      console.log('Response ok:', response.ok);

      const data = await response.json();
      console.log(' Response data:', data);

      if (!response.ok) {
        console.error(' Order creation failed:', data);
        throw new Error(data.error || data.details || 'Failed to create order');
      }

    
      const orderId = data.order?.orderId || data.orderId;
      
      if (!orderId) {
        console.error(' No order ID in response:', data);
        throw new Error('Order ID not received from server');
      }

      console.log(' Order created successfully! ID:', orderId);

    
      console.log('Clearing cart...');
      try {
        const clearResponse = await fetch('/api/cart', {
          method: 'DELETE',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ clearAll: true })
        });
        
        if (clearResponse.ok) {
          console.log(' Cart cleared');
        } else {
          console.log(' Cart clear failed (ignoring)');
        }
      } catch (clearError) {
        console.log(' Cart clear error (ignoring):', clearError);
      }

      
      toast.success('Order placed successfully! ', {
        duration: 3000,
      });
      
     
      console.log('Redirecting to:', `/orders/${orderId}`);
      setTimeout(() => {
        router.push(`/orders/${orderId}`);
      }, 1000);

    } catch (error) {
      console.error(' Order error:', error);
      toast.error(error.message || 'Failed to place order', {
        duration: 4000,
      });
    } finally {
      setLoading(false);
      console.log('Order process completed');
    }
  };

  
  if (cartLoading) {
    return (
      <div className="container mx-auto py-20 text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600 mx-auto mb-4"></div>
        <p className="text-gray-600">Loading cart...</p>
      </div>
    );
  }

  
  if (items.length === 0) {
    return (
      <div className="container mx-auto py-20 text-center">
        <p className="text-gray-600 mb-4">Your cart is empty</p>
        <button
          onClick={() => router.push('/')}
          className="bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700"
        >
          Continue Shopping
        </button>
      </div>
    );
  }

  return (
    <>
      <Toaster position="top-center" />
      
      <div className="container mx-auto py-8 px-4 max-w-6xl">
        <h1 className="text-3xl font-bold mb-8">Checkout</h1>

        <div className="grid lg:grid-cols-3 gap-8">
        
          <div className="lg:col-span-2 bg-white p-6 rounded-xl shadow-md">
            <h2 className="text-xl font-semibold mb-6">Shipping Information</h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Full Name *
                </label>
                <input
                  type="text"
                  name="name"
                  placeholder="John Doe"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email *
                </label>
                <input
                  type="email"
                  name="email"
                  placeholder="john@example.com"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Phone Number *
                </label>
                <input
                  type="tel"
                  name="phone"
                  placeholder="1234567890"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Street Address *
                </label>
                <input
                  type="text"
                  name="address"
                  placeholder="123 Main Street"
                  value={formData.address}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  required
                />
              </div>
              
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    City *
                  </label>
                  <input
                    type="text"
                    name="city"
                    placeholder="New York"
                    value={formData.city}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    ZIP Code *
                  </label>
                  <input
                    type="text"
                    name="zipCode"
                    placeholder="10001"
                    value={formData.zipCode}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                    required
                  />
                </div>
              </div>
            </div>
          </div>

        
          <div className="bg-white p-6 rounded-xl shadow-md h-fit sticky top-4">
            <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
            
            <div className="space-y-3 mb-6 max-h-64 overflow-y-auto">
              {items.map((item, idx) => (
                <div key={idx} className="flex justify-between text-sm pb-2 border-b">
                  <span className="flex-1 truncate">{item.name}</span>
                  <span className="font-medium ml-2">
                    {item.quantity} × ${item.price.toFixed(2)}
                  </span>
                </div>
              ))}
            </div>

            <div className="border-t-2 pt-4 mb-6">
              <div className="flex justify-between items-center">
                <span className="text-lg font-semibold">Total:</span>
                <span className="text-2xl font-bold text-green-600">
                  ${totalAmount.toFixed(2)}
                </span>
              </div>
            </div>

            <button
              onClick={confirmPayment}
              disabled={loading}
              type="button"
              className={`w-full py-3 px-4 rounded-lg font-semibold text-white transition-all duration-200 ${
                loading 
                  ? 'bg-gray-400 cursor-not-allowed' 
                  : 'bg-red-600 hover:bg-red-700 active:scale-95'
              }`}
            >
              {loading ? (
                <span className="flex items-center justify-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Processing...
                </span>
              ) : (
                'Place Order (Cash on Delivery)'
              )}
            </button>

            <p className="text-xs text-gray-500 text-center mt-3">
              Payment will be collected upon delivery
            </p>
          </div>
        </div>
      </div>
    </>
  );
}