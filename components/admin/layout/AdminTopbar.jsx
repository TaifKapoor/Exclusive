// components/admin/layout/AdminTopbar.jsx
"use client";
import { Search, LogOut, X } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";

export default function AdminTopbar({ user }) {
  const [searchOpen, setSearchOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const logout = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/auth/logout", { method: "POST" });
      if (res.ok) {
        toast.success("Logged out successfully");
        window.location.href = "/login";
      } else {
        toast.error("Logout failed");
      }
    } catch {
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
  
    <div className="w-full bg-white/10 backdrop-blur-2xl border-b border-white/10 shadow-2xl">
      <div className="px-4 lg:px-8 py-3">
        <div className="flex items-center justify-between gap-3">
          
         
          <div className="flex items-center gap-4 flex-1">
          
            <div className={`${searchOpen ? 'hidden' : 'block'} lg:block`}>
              <h2 className="text-lg lg:text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-pink-400 via-purple-400 to-indigo-400">
                Admin Panel
              </h2>
            </div>

          
            <button
              onClick={() => setSearchOpen(!searchOpen)}
              className="lg:hidden p-2 rounded-lg bg-white/10 hover:bg-white/20 border border-white/20 transition text-white"
            >
              {searchOpen ? <X size={20} /> : <Search size={20} />}
            </button>

            
            <div className="hidden lg:block flex-1 max-w-md">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                <input
                  type="text"
                  placeholder="Search products, orders..."
                  className="w-full pl-10 pr-4 py-2 bg-white/10 border border-white/20 rounded-lg text-sm text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent backdrop-blur-sm"
                />
              </div>
            </div>
          </div>

          
          <div className="flex items-center gap-3">
            
            <div className="hidden lg:flex items-center gap-3 px-3 py-2 bg-white/10 rounded-lg border border-white/20">
              <div className="text-right">
                <p className="text-sm font-semibold text-white">
                  {user?.name || "Admin"}
                </p>
                <p className="text-xs text-gray-300">
                  {user?.role || "Administrator"}
                </p>
              </div>
              <div className="w-10 h-10 bg-gradient-to-br from-pink-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
                {user?.name?.[0]?.toUpperCase() || "A"}
              </div>
            </div>

           
            {!searchOpen && (
              <div className="lg:hidden w-10 h-10 bg-gradient-to-br from-pink-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
                {user?.name?.[0]?.toUpperCase() || "A"}
              </div>
            )}

            
            <button
              onClick={logout}
              disabled={loading}
              className="p-2 bg-red-500/20 text-red-300 hover:bg-red-500/30 rounded-lg border border-red-500/50 disabled:opacity-50 transition"
              title="Logout"
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-red-300 border-t-transparent rounded-full animate-spin" />
              ) : (
                <LogOut size={20} />
              )}
            </button>
          </div>
        </div>

        
        {searchOpen && (
          <div className="lg:hidden mt-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              <input
                type="text"
                placeholder="Search products, orders..."
                autoFocus
                className="w-full pl-10 pr-12 py-2 bg-white/10 border border-white/20 rounded-lg text-sm text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent backdrop-blur-sm"
              />
              
              <button
                onClick={() => setSearchOpen(false)}
                className="absolute right-3 top-1/2 -translate-y-1/2 p-1 bg-white/10 hover:bg-white/20 rounded-full transition"
              >
                <X size={16} className="text-gray-300" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}