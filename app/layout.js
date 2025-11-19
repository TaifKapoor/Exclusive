// app/layout.jsx
import { Poppins } from "next/font/google";
import "./globals.css";
import { CartProvider } from "@/lib/cartContext";
import ConditionalLayout from "@/components/layout/ConditionalLayout";


const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-poppins",
});

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={poppins.className}>
      <body>
        <CartProvider>
          <ConditionalLayout>{children}</ConditionalLayout>
        </CartProvider>
      </body>
    </html>
  );
}