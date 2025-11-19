"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Package,
  ShoppingCart,
  Users,
  Settings,
  Home,
  BarChart3,
  Tag,
} from "lucide-react";

const menuItems = [
  { name: "Dashboard", icon: LayoutDashboard, href: "/admin" },
  { name: "Products", icon: Package, href: "/admin/products" },
  { name: "Orders", icon: ShoppingCart, href: "/admin/orders" },
  { name: "Customers", icon: Users, href: "/admin/customers" },
  { name: "Analytics", icon: BarChart3, href: "/admin/analytics" },
  // { name: "Categories", icon: Tag, href: "/admin/categories" },
  { name: "Settings", icon: Settings, href: "/admin/settings" },
];

export default function AdminSidebar({ onLinkClick }) {
  const pathname = usePathname();

  return (
    <div className="h-full flex flex-col bg-white/90 backdrop-blur-xl border-r border-gray-200 shadow-xl">
      {/* Logo */}
      <div className="p-6 border-b border-gray-200">
        <Link
          href="/admin"
          className="flex items-center gap-3 hover:opacity-80 transition"
          onClick={onLinkClick}
        >
          <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl flex items-center justify-center text-white text-xl font-bold shadow-lg">
            A
          </div>
          <div>
            <h1 className="text-xl font-bold text-gray-900">Admin Panel</h1>
            <p className="text-xs text-gray-500">E-Commerce</p>
          </div>
        </Link>
      </div>

      {/* Menu */}
      <nav className="flex-1 px-3 py-4 overflow-y-auto space-y-1">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all group ${
                isActive
                  ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg"
                  : "text-gray-700 hover:bg-gray-100 hover:shadow-sm"
              }`}
              onClick={onLinkClick}
            >
              <Icon size={20} className={`${isActive ? "text-white" : "text-gray-600 group-hover:text-black"}`} />
              {item.name}
            </Link>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-gray-200">
        <Link
          href="/"
          className="flex items-center gap-3 px-4 py-3 rounded-xl text-gray-700 hover:bg-gray-100 hover:shadow transition-all"
          onClick={onLinkClick}
        >
          <Home size={20} />
          <span className="font-semibold">Back to Site</span>
        </Link>
      </div>
    </div>
  );
}