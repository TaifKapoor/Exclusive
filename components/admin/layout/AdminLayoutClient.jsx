// components/admin/layout/AdminLayoutClient.jsx
"use client";

import { useState } from 'react';
import { usePathname } from 'next/navigation';
import { 
  Grid3X3, 
  ShoppingCart, 
  Package, 
  Users, 
  BarChart3,
  Menu, 
  X,
  LogOut
} from 'lucide-react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import AdminTopbar from './AdminTopbar'; 

export default function AdminLayoutClient({ children, user }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const pathname = usePathname();

  const navItems = [
    { href: '/admin', icon: Grid3X3, label: 'Dashboard' },
    { href: '/admin/orders', icon: ShoppingCart, label: 'Orders' },
    { href: '/admin/products', icon: Package, label: 'Products' },
    { href: '/admin/customers', icon: Users, label: 'Customers' },
    { href: '/admin/analytics', icon: BarChart3, label: 'Analytics' },
    { href: '/', icon: BarChart3, label: 'Back to Home' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white">
      
     
      <header className="fixed top-0 left-0 right-0 z-40">
        <AdminTopbar user={user} />
      </header>

     
      <button
        onClick={() => setSidebarOpen(true)}
        className="lg:hidden fixed top-3 left-3 z-50 p-2.5 bg-indigo-600 hover:bg-indigo-700 rounded-xl shadow-lg transition-all"
        aria-label="Open menu"
      >
        <Menu size={22} className="text-white" />
      </button>

      
      <AnimatePresence>
        {sidebarOpen && (
          <>
            
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSidebarOpen(false)}
              className="lg:hidden fixed inset-0 z-50 bg-black/60 backdrop-blur-sm"
            />

           
            <motion.div
              initial={{ x: -320 }}
              animate={{ x: 0 }}
              exit={{ x: -320 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="lg:hidden fixed left-0 top-0 bottom-0 z-50 w-80 bg-gradient-to-b from-slate-900 via-purple-900 to-slate-900 border-r border-white/10 shadow-2xl flex flex-col"
            >
              
              <div className="p-6 border-b border-white/10 flex items-center justify-between">
                <h2 className="text-2xl font-black bg-clip-text text-transparent bg-gradient-to-r from-pink-400 to-purple-400">
                  Retro Admin
                </h2>
                <button
                  onClick={() => setSidebarOpen(false)}
                  className="p-2 bg-white/10 rounded-xl hover:bg-white/20 transition-all"
                  aria-label="Close menu"
                >
                  <X size={24} />
                </button>
              </div>

              
              <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
                {navItems.map((item) => {
                  const isActive = pathname === item.href;
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setSidebarOpen(false)}
                      className={`relative flex items-center gap-4 px-6 py-4 rounded-2xl transition-all duration-300 group ${
                        isActive
                          ? 'bg-gradient-to-r from-pink-500/20 to-purple-500/20 border border-pink-500/50 text-white font-semibold'
                          : 'hover:bg-white/10 text-gray-400 hover:text-white'
                      }`}
                    >
                      <item.icon size={24} className={isActive ? 'text-pink-400' : ''} />
                      <span className="text-lg">{item.label}</span>
                    </Link>
                  );
                })}
              </nav>

              
              <div className="p-6 border-t border-white/10">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-pink-500 to-purple-500 rounded-full flex items-center justify-center font-bold text-lg">
                    {user?.name?.[0]?.toUpperCase() || 'A'}
                  </div>
                  <div>
                    <p className="font-semibold">{user?.name || 'Admin'}</p>
                    <p className="text-sm text-gray-400">{user?.email || 'admin@retro.com'}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      
      <aside className="hidden lg:block fixed left-0 top-0 h-screen w-72 bg-gradient-to-b from-slate-900 via-purple-900 to-slate-900 border-r border-white/10 shadow-2xl z-30">
        <div className="flex flex-col h-full">
        
          <div className="p-6 border-b border-white/10 mt-20">
            <h1 className="text-3xl font-black bg-clip-text text-transparent bg-gradient-to-r from-pink-400 via-purple-400 to-indigo-400">
              Retro Admin
            </h1>
          </div>

        
          <nav className="flex-1 p-6 space-y-3 overflow-y-auto">
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`relative flex items-center gap-4 px-6 py-4 rounded-2xl transition-all duration-300 group overflow-hidden ${
                    isActive
                      ? 'text-white font-bold'
                      : 'text-gray-400 hover:text-white'
                  }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="desktopActive"
                      className="absolute inset-0 bg-gradient-to-r from-pink-500/30 to-purple-500/30 rounded-2xl"
                      transition={{ type: "spring", stiffness: 300 }}
                    />
                  )}
                  <item.icon size={26} className="relative z-10" />
                  <span className="relative z-10 text-lg font-medium">{item.label}</span>
                  <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl" />
                </Link>
              );
            })}
          </nav>

        
          <div className="p-6 border-t border-white/10">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-gradient-to-br from-pink-500 to-purple-500 rounded-full flex items-center justify-center font-bold text-xl">
                {user?.name?.[0]?.toUpperCase() || 'A'}
              </div>
              <div>
                <p className="font-semibold">{user?.name || 'Admin'}</p>
                <p className="text-sm text-gray-400">{user?.email || 'admin@retro.com'}</p>
              </div>
            </div>
          </div>
        </div>
      </aside>

      
      <main className="pt-20 lg:ml-72 pb-20 lg:pb-8 min-h-screen">
        <div className="max-w-7xl mx-auto px-4 lg:px-8 py-6">
          {children}
        </div>
      </main>

      
      <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/10 backdrop-blur-2xl border-t border-white/10">
        <div className="grid grid-cols-6 py-2">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`relative flex flex-col items-center py-3 rounded-2xl transition-all ${
                  isActive
                    ? 'text-pink-400 font-bold'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                <item.icon size={24} />
                <span className="text-xs mt-1">{item.label}</span>
                {isActive && (
                  <motion.div
                    layoutId="mobileActive"
                    className="absolute -top-1 left-1/2 -translate-x-1/2 w-12 h-1 bg-gradient-to-r from-pink-500 to-purple-500 rounded-full"
                  />
                )}
              </Link>
            );
          })}
        </div>
      </nav>
    </div>
  );
}