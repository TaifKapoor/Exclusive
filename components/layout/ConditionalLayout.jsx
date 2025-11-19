"use client";

import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";
import { usePathname } from "next/navigation";


export default function ConditionalLayout({ children }) {
  const pathname = usePathname();
  

  const isAdminPage = pathname?.startsWith('/admin');

  
  if (isAdminPage) {
    return <>{children}</>;
  }

  
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">{children}</main>
      <Footer />
    </div>
  );
}