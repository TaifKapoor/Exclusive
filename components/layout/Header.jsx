// "use client";

// import { useState, useEffect } from "react";
// import {
//   Search, Heart, ShoppingCart, Menu, X, User, LogOut, Sparkles, Crown
// } from "lucide-react";
// import toast from "react-hot-toast";
// import { motion } from "framer-motion";

// const Header = () => {
//   const [menuOpen, setMenuOpen] = useState(false);
//   const [searchTerm, setSearchTerm] = useState('');
//   const [cartCount, setCartCount] = useState(0);
//   const [wishlistCount, setWishlistCount] = useState(0);
//   const [user, setUser] = useState(null);
//   const [loading, setLoading] = useState(true);

//   const fetchCounts = async () => {
//     try {
 
//       const [cartRes, wishlistRes] = await Promise.all([
//         fetch('/api/cart'),
//         fetch('/api/wishlist')
//       ]);
//       const cartItems = await cartRes.json();
//       const wishlistItems = await wishlistRes.json();
    
//       setCartCount(cartItems.reduce((sum, i) => sum + i.quantity, 0));
     
//       setWishlistCount(wishlistItems.length);
//     } catch (error) {
//       console.error('Count fetch failed:', error);
//     }
//   };

//   const checkAuth = async () => {
//     try {
//       const res = await fetch('/api/auth/me');
//       if (res.ok) {
//         const data = await res.json();
//         setUser(data.user);
//       }
//     } catch (error) {
//       console.error('Auth check failed:', error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleSearch = (e) => {
//     e.preventDefault();
//     if (searchTerm.trim()) {
//       window.location.href = `/products?search=${encodeURIComponent(searchTerm)}`;
//     }
//   };

//   const handleLogout = async () => {
//     try {
//       const res = await fetch('/api/auth/logout', { method: 'POST', credentials: 'include' });
//       if (res.ok) {
//         setUser(null);
//         toast.success('Logged out successfully!');
        
//         window.location.href = '/';
//       }
//     } catch (error) {
//       toast.error('Logout failed');
//     }
//   };

//   useEffect(() => {
//     checkAuth();
//     fetchCounts();

//     const handleUpdate = () => fetchCounts();
    
//     window.addEventListener('cartUpdated', handleUpdate);
//     window.addEventListener('wishlistUpdated', handleUpdate);
    

//     return () => {
      
//       window.removeEventListener('cartUpdated', handleUpdate);
//       window.removeEventListener('wishlistUpdated', handleUpdate);
//     };
//   }, []);

//   const navLinks = [
//     { name: "Home", href: "/" },
//     { name: "Products", href: "/products" },
//     { name: "About", href: "/about" },
//     { name: "Contact", href: "/contact" },
//   ];

//   return (
//     <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-xl border-b border-gray-100 shadow-lg">
      
//       <div className="bg-gradient-to-r from-purple-600 via-pink-600 to-red-600 text-white py-3 text-sm font-medium">
//         <div className="container mx-auto flex justify-center items-center gap-3 px-4">
//           <Sparkles className="w-5 h-5 animate-pulse" />
//           <span>Flash Sale Live – Up to 70% OFF + Free Shipping!</span>
//           <a href="/products" className="font-bold underline hover:text-yellow-300">Shop Now</a>
//         </div>
//       </div>

     
//       <nav className="container mx-auto px-4 py-5">
//         <div className="flex items-center justify-between">

         
//           <a href="/" className="flex items-center gap-3 group">
//             <motion.div
//               whileHover={{ rotate: 360, scale: 1.1 }}
//               transition={{ duration: 0.6 }}
//               className="w-12 h-12 bg-gradient-to-br from-purple-600 to-pink-600 rounded-2xl flex items-center justify-center shadow-2xl"
//             >
//               <span className="text-white font-black text-2xl">E</span>
//             </motion.div>
//             <h1 className="text-3xl font-black tracking-tighter">
//               Exclusive<span className="text-red-600">.</span>
//             </h1>
//           </a>

         
//           <div className="hidden lg:flex items-center gap-12">
//             {navLinks.map((link) => (
//               <a
//                 key={link.name}
//                 href={link.href}
//                 className="relative text-gray-800 font-semibold text-lg hover:text-red-600 transition-all after:absolute after:-bottom-1 after:left-0 after:w-0 after:h-0.5 after:bg-gradient-to-r after:from-red-500 after:to-pink-500 after:transition-all hover:after:w-full"
//               >
//                 {link.name}
//               </a>
//             ))}
//           </div>

         
//           <div className="flex items-center gap-5">

//             <form onSubmit={handleSearch} className="hidden md:flex items-center bg-gray-100/80 backdrop-blur-md rounded-full px-5 py-3 border border-gray-200 focus-within:border-red-500 transition-all group">
//               <input
//                 type="text"
//                 placeholder="Search products..."
//                 value={searchTerm}
//                 onChange={(e) => setSearchTerm(e.target.value)}
//                 className="bg-transparent outline-none w-56 focus:w-72 transition-all duration-500 text-sm placeholder-gray-500"
//               />
//               <button type="submit" className="text-gray-600 group-hover:text-red-600 transition">
//                 <Search size={20} />
//               </button>
//             </form>

          
//             <a href="/wishlist" className="relative group">
//               <motion.div whileHover={{ scale: 1.2 }} whileTap={{ scale: 0.9 }}>
//                 <Heart size={26} className="text-gray-700 group-hover:fill-red-500 group-hover:text-red-500 transition-all duration-300" />
//               </motion.div>
//               {wishlistCount > 0 && (
//                 <motion.span
//                   initial={{ scale: 0 }}
//                   animate={{ scale: 1 }}
//                   className="absolute -top-2 -right-2 bg-gradient-to-r from-red-500 to-pink-500 text-white text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center shadow-lg animate-pulse"
//                 >
//                   {wishlistCount}
//                 </motion.span>
//               )}
//             </a>

            
//             <a href="/cart" className="relative group">
//               <motion.div whileHover={{ scale: 1.2 }} whileTap={{ scale: 0.9 }}>
//                 <ShoppingCart size={26} className="text-gray-700 group-hover:text-red-600 transition-all" />
//               </motion.div>
//               {cartCount > 0 && (
//                 <motion.span
//                   initial={{ scale: 0 }}
//                   animate={{ scale: 1 }}
//                   className="absolute -top-2 -right-2 bg-gradient-to-r from-red-500 to-pink-500 text-white text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center shadow-lg animate-pulse"
//                 >
//                   {cartCount}
//                 </motion.span>
//               )}
//             </a>

            
//             {!loading && (
//               user ? (
//                 <div className="relative group">
//                   <motion.div
//                     whileHover={{ scale: 1.1 }}
//                     className="w-11 h-11 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white font-bold text-lg shadow-xl cursor-pointer ring-4 ring-white/40"
//                   >
//                     {user.name.charAt(0).toUpperCase()}
//                   </motion.div>

                  
//                   <div className="absolute right-0 mt-4 w-64 bg-white/95 backdrop-blur-2xl rounded-2xl shadow-2xl border border-gray-100 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300">
//                     <div className="p-5 border-b border-gray-100">
//                       <p className="font-bold text-gray-800">{user.name}</p>
//                       <p className="text-sm text-gray-500">{user.email}</p>
//                     </div>
//                     <div className="py-3">
//                       {user.role === "admin" && (
//                         <a href="/admin" className="flex items-center gap-3 px-5 py-3 hover:bg-purple-50 text-purple-600 font-semibold">
//                           <Crown size={18} /> Admin Dashboard
//                         </a>
//                       )}
//                       <button onClick={handleLogout} className="flex items-center gap-3 px-5 py-3 hover:bg-red-50 text-red-600 w-full text-left">
//                         <LogOut size={18} /> Logout
//                       </button>
//                     </div>
//                   </div>
//                 </div>
//               ) : (
//                 <a
//                   href="/login"
//                   className="bg-gradient-to-r from-red-500 to-pink-600 text-white px-7 py-3.5 rounded-full font-bold shadow-xl hover:shadow-2xl hover:shadow-red-500/50 transform hover:scale-105 transition-all duration-300 text-sm"
//                 >
//                   Login
//                 </a>
//               )
//             )}

           
//             <button
//               onClick={() => setMenuOpen(!menuOpen)}
//               className="lg:hidden p-3 rounded-xl bg-gray-100/70 backdrop-blur-md hover:bg-gray-200 transition-all"
//             >
//               {menuOpen ? <X size={28} /> : <Menu size={28} />}
//             </button>
//           </div>
//         </div>
//       </nav>

      
//       {menuOpen && (
//         <motion.div
//           initial={{ height: 0, opacity: 0 }}
//           animate={{ height: "auto", opacity: 1 }}
//           exit={{ height: 0, opacity: 0 }}
//           className="lg:hidden bg-white/95 backdrop-blur-3xl border-t border-gray-100 shadow-2xl overflow-hidden"
//         >
//           <div className="container mx-auto px-6 py-8 space-y-6">
//             {navLinks.map((link) => (
//               <a key={link.name} href={link.href} onClick={() => setMenuOpen(false)} className="block text-2xl font-semibold text-gray-800 hover:text-red-600 transition">
//                 {link.name}
//               </a>
//             ))}

//             <form onSubmit={handleSearch} className="flex items-center bg-gray-100 rounded-full px-5 py-4 shadow-inner">
//               <input type="text" placeholder="Search..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="bg-transparent outline-none flex-1 text-lg" />
//               <Search size={24} className="text-gray-600" />
//             </form>

//             {!loading && user ? (
//               <div className="space-y-5 pt-6 border-t border-gray-200">
//                 <div className="flex items-center gap-4">
//                   <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white text-3xl font-bold shadow-xl">
//                     {user.name.charAt(0).toUpperCase()}
//                   </div>
//                   <div>
//                     <p className="font-bold text-xl">Hi, {user.name.split(' ')[0]}!</p>
//                     <p className="text-gray-600">{user.email}</p>
//                   </div>
//                 </div>
//                 {user.role === "admin" && (
//                   <a href="/admin" onClick={() => setMenuOpen(false)} className="block text-center bg-gradient-to-r from-purple-600 to-pink-600 text-white py-4 rounded-xl font-bold">
//                     Admin Panel
//                   </a>
//                 )}
//                 <button onClick={handleLogout} className="w-full bg-red-500 text-white py-4 rounded-xl font-bold hover:bg-red-600 transition">
//                   Logout
//                 </button>
//               </div>
//             ) : (
//               <div className="space-y-4 pt-6 border-t border-gray-200">
//                 <a href="/login" onClick={() => setMenuOpen(false)} className="block text-center bg-gradient-to-r from-red-500 to-pink-600 text-white py-5 rounded-xl font-bold text-lg shadow-xl">
//                   Login
//                 </a>
//                 <a href="/register" onClick={() => setMenuOpen(false)} className="block text-center bg-gray-900 text-white py-5 rounded-xl font-bold text-lg shadow-xl">
//                   Create Account
//                 </a>
//               </div>
//             )}
//           </div>
//         </motion.div>
//       )}
//     </header>
//   );
// };

// export default Header;




// components/Header.jsx or layout/Header.jsx
"use client";

import { useState, useEffect } from "react";
import {
  Search, Heart, ShoppingCart, Menu, X, User, LogOut, Sparkles, Crown
} from "lucide-react";
import toast from "react-hot-toast";
import { motion } from "framer-motion";
import Link from "next/link";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [cartCount, setCartCount] = useState(0);
  const [wishlistCount, setWishlistCount] = useState(0);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchCounts = async () => {
    try {
      const [cartRes, wishlistRes] = await Promise.all([
        fetch('/api/cart'),
        fetch('/api/wishlist')
      ]);
      const cartItems = await cartRes.json();
      const wishlistItems = await wishlistRes.json();
      setCartCount(cartItems.reduce((sum, i) => sum + i.quantity, 0));
      setWishlistCount(wishlistItems.length);
    } catch (error) {
      console.error('Count fetch failed:', error);
    }
  };

  const checkAuth = async () => {
    try {
      const res = await fetch('/api/auth/me');
      if (res.ok) {
        const data = await res.json();
        setUser(data.user);
      }
    } catch (error) {
      console.error('Auth check failed:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      window.location.href = `/products?search=${encodeURIComponent(searchTerm)}`;
    }
  };

  const handleLogout = async () => {
    try {
      const res = await fetch('/api/auth/logout', { method: 'POST', credentials: 'include' });
      if (res.ok) {
        setUser(null);
        toast.success('Logged out successfully!');
        window.location.href = '/';
      }
    } catch (error) {
      toast.error('Logout failed');
    }
  };

  useEffect(() => {
    checkAuth();
    fetchCounts();
    const handleUpdate = () => fetchCounts();
    window.addEventListener('cartUpdated', handleUpdate);
    window.addEventListener('wishlistUpdated', handleUpdate);
    return () => {
      window.removeEventListener('cartUpdated', handleUpdate);
      window.removeEventListener('wishlistUpdated', handleUpdate);
    };
  }, []);

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Products", href: "/products" },
    { name: "About", href: "/about" },
    { name: "Contact", href: "/contact" },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-xl border-b border-gray-100 shadow-lg">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-purple-600 via-pink-600 to-red-600 text-white py-3 text-sm font-medium">
        <div className="container mx-auto flex justify-center items-center gap-3 px-4 text-center">
          <Sparkles className="w-5 h-5 animate-pulse hidden sm:inline" />
          <span className="text-xs sm:text-sm">Flash Sale Live – Up to 70% OFF + Free Shipping!</span>
          <Link href="/products" className="font-bold underline hover:text-yellow-300 text-xs sm:text-sm">Shop Now</Link>
        </div>
      </div>

      {/* Main Header */}
      <nav className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between gap-4">

          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 sm:gap-3 flex-shrink-0">
            <motion.div
              whileHover={{ rotate: 360, scale: 1.1 }}
              transition={{ duration: 0.6 }}
              className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-purple-600 to-pink-600 rounded-2xl flex items-center justify-center shadow-2xl"
            >
              <span className="text-white font-black text-xl sm:text-2xl">E</span>
            </motion.div>
            <h1 className="text-2xl sm:text-3xl font-black tracking-tighter">
              Exclusive<span className="text-red-600">.</span>
            </h1>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-8 xl:gap-12 flex-1 justify-center">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="relative text-gray-800 font-semibold text-base xl:text-lg hover:text-red-600 transition-all after:absolute after:-bottom-1 after:left-0 after:w-0 after:h-0.5 after:bg-gradient-to-r after:from-red-500 after:to-pink-500 after:transition-all hover:after:w-full"
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* Right Side Icons + Login */}
          <div className="flex items-center gap-3 sm:gap-4 lg:gap-5">

            {/* Search - Hidden on very small screens */}
            <form onSubmit={handleSearch} className="hidden sm:flex items-center bg-gray-100/80 backdrop-blur-md rounded-full px-4 py-2.5 border border-gray-200 focus-within:border-red-500 transition-all">
              <input
                type="text"
                placeholder="Search..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="bg-transparent outline-none w-40 lg:w-56 text-sm placeholder-gray-500"
              />
              <button type="submit" className="text-gray-600">
                <Search size={18} />
              </button>
            </form>

            {/* Wishlist */}
            <Link href="/wishlist" className="relative group">
              <motion.div whileHover={{ scale: 1.2 }} whileTap={{ scale: 0.9 }}>
                <Heart size={24} className="text-gray-700 group-hover:fill-red-500 group-hover:text-red-500 transition-all" />
              </motion.div>
              {wishlistCount > 0 && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute -top-2 -right-2 bg-gradient-to-r from-red-500 to-pink-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center shadow-lg"
                >
                  {wishlistCount}
                </motion.span>
              )}
            </Link>

            {/* Cart */}
            <Link href="/cart" className="relative group">
              <motion.div whileHover={{ scale: 1.2 }} whileTap={{ scale: 0.9 }}>
                <ShoppingCart size={24} className="text-gray-700 group-hover:text-red-600 transition-all" />
              </motion.div>
              {cartCount > 0 && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute -top-2 -right-2 bg-gradient-to-r from-red-500 to-pink-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center shadow-lg"
                >
                  {cartCount}
                </motion.span>
              )}
            </Link>

            {/* User / Login */}
            {!loading && (
              user ? (
                <div className="relative group hidden sm:block">
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white font-bold text-lg shadow-xl cursor-pointer"
                  >
                    {user.name.charAt(0).toUpperCase()}
                  </motion.div>
                  <div className="absolute right-0 mt-3 w-64 bg-white/95 backdrop-blur-2xl rounded-2xl shadow-2xl border border-gray-100 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300">
                    <div className="p-5 border-b border-gray-100">
                      <p className="font-bold text-gray-800">{user.name}</p>
                      <p className="text-sm text-gray-500">{user.email}</p>
                    </div>
                    <div className="py-3">
                      {user.role === "admin" && (
                        <Link href="/admin" className="flex items-center gap-3 px-5 py-3 hover:bg-purple-50 text-purple-600 font-semibold">
                          <Crown size={18} /> Admin Dashboard
                        </Link>
                      )}
                      <button onClick={handleLogout} className="flex items-center gap-3 px-5 py-3 hover:bg-red-50 text-red-600 w-full text-left">
                        <LogOut size={18} /> Logout
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                <Link
                  href="/login"
                  className="hidden sm:block bg-gradient-to-r from-red-500 to-pink-600 text-white px-5 py-2.5 rounded-full font-bold text-sm shadow-xl hover:scale-105 transition-all"
                >
                  Login
                </Link>
              )
            )}

            {/* Mobile Menu Button - SABSE LAST MEIN */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="p-2.5 rounded-xl bg-gray-100/70 backdrop-blur-md hover:bg-gray-200 transition-all lg:hidden"
            >
              {menuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      {menuOpen && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          className="lg:hidden bg-white/95 backdrop-blur-3xl border-t border-gray-100 shadow-2xl overflow-hidden"
        >
          <div className="container mx-auto px-6 py-8 space-y-6">
            {navLinks.map((link) => (
              <Link key={link.name} href={link.href} onClick={() => setMenuOpen(false)} className="block text-2xl font-semibold text-gray-800 hover:text-red-600 transition">
                {link.name}
              </Link>
            ))}

            <form onSubmit={handleSearch} className="flex items-center bg-gray-100 rounded-full px-5 py-4 shadow-inner">
              <input type="text" placeholder="Search products..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="bg-transparent outline-none flex-1 text-lg" />
              <Search size={24} className="text-gray-600" />
            </form>

            {!loading && user ? (
              <div className="space-y-5 pt-6 border-t border-gray-200">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white text-3xl font-bold shadow-xl">
                    {user.name.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <p className="font-bold text-xl">Hi, {user.name.split(' ')[0]}!</p>
                    <p className="text-gray-600">{user.email}</p>
                  </div>
                </div>
                {user.role === "admin" && (
                  <Link href="/admin" onClick={() => setMenuOpen(false)} className="block text-center bg-gradient-to-r from-purple-600 to-pink-600 text-white py-4 rounded-xl font-bold">
                    Admin Panel
                  </Link>
                )}
                <button onClick={handleLogout} className="w-full bg-red-500 text-white py-4 rounded-xl font-bold hover:bg-red-600 transition">
                  Logout
                </button>
              </div>
            ) : (
              <div className="space-y-4 pt-6 border-t border-gray-200">
                <Link href="/login" onClick={() => setMenuOpen(false)} className="block text-center bg-gradient-to-r from-red-500 to-pink-600 text-white py-5 rounded-xl font-bold text-lg shadow-xl">
                  Login
                </Link>
                <Link href="/register" onClick={() => setMenuOpen(false)} className="block text-center bg-gray-900 text-white py-5 rounded-xl font-bold text-lg shadow-xl">
                  Create Account
                </Link>
              </div>
            )}
          </div>
        </motion.div>
      )}
    </header>
  );
};

export default Header;