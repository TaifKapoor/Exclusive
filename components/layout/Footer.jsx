'use client';
import Link from 'next/link';
import Image from 'next/image';
import { Send, Facebook, Twitter, Instagram, Linkedin, QrCode } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-black text-gray-300 pt-16 pb-8 px-6 md:px-20">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-10 border-b border-gray-800 pb-10">
        
        <div>
          <h3 className="text-3xl font-bold text-white mb-5">Exclusive</h3>
          <p className="text-lg font-medium mb-3">Subscribe</p>
          <p className="text-sm text-gray-400 mb-5">
            Get 10% off your first order
          </p>

          <div className="relative">
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full bg-gray-900 border border-gray-700 text-gray-200 placeholder-gray-400 px-4 py-2 rounded-full pr-10 outline-none focus:border-gray-500 transition"
            />
            <Send
              size={20}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white cursor-pointer transition"
            />
          </div>
        </div>

        <div>
          <h3 className="text-lg font-semibold text-white mb-5">Support</h3>
          <p className="text-sm mb-2 text-gray-400">
            111 Bijoy sarani, Dhaka, DH 1515, Bangladesh.
          </p>
          <p className="text-sm mb-1 text-gray-400">exclusive@gmail.com</p>
          <p className="text-sm text-gray-400">+88015-88888-9999</p>
        </div>

        <div>
          <h3 className="text-lg font-semibold text-white mb-5">Account</h3>
          <ul className="space-y-3">
            <li>
              <Link href="/account/login" className="hover:text-white transition">
                Login / Register
              </Link>
            </li>
            <li>
              <Link href="/cart" className="hover:text-white transition">
                Cart
              </Link>
            </li>
            <li>
              <Link href="/wishlist" className="hover:text-white transition">
                Wishlist
              </Link>
            </li>
            <li>
              <Link href="/products" className="hover:text-white transition">
                Shop
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="text-lg font-semibold text-white mb-5">Quick Links</h3>
          <ul className="space-y-3">
            <li>
              <Link href="/privacy-policy" className="hover:text-white transition">
                Privacy Policy
              </Link>
            </li>
            <li>
              <Link href="/terms" className="hover:text-white transition">
                Terms Of Use
              </Link>
            </li>
            <li>
              <Link href="/faq" className="hover:text-white transition">
                FAQ
              </Link>
            </li>
            <li>
              <Link href="/contact" className="hover:text-white transition">
                Contact
              </Link>
            </li>
          </ul>
        </div>

        
        <div>
          <h3 className="text-lg font-semibold text-white mb-4">Download App</h3>
          <p className="text-xs text-gray-400 mb-4">
            Save $3 with App New User Only
          </p>

          <div className="flex space-x-3 mb-5">
            
            <div className="bg-white p-2 rounded-md flex items-center justify-center">
              <QrCode size={50} className="text-black" />
            </div>

            
            <div className="flex flex-col space-y-2">
              <Image
                src="/images/app-stores/google-play.png"
                alt="Google Play"
                width={110}
                height={35}
                className="cursor-pointer hover:opacity-90 transition"
              />
              <Image
                src="/images/app-stores/app-store.png"
                alt="App Store"
                width={110}
                height={35}
                className="cursor-pointer hover:opacity-90 transition"
              />
            </div>
          </div>

        
          <div className="flex space-x-5 mt-4">
            {[
              { icon: Facebook, link: '#' },
              { icon: Twitter, link: '#' },
              { icon: Instagram, link: '#' },
              { icon: Linkedin, link: '#' },
            ].map(({ icon: Icon, link }, index) => (
              <Link
                key={index}
                href={link}
                className="p-2 rounded-full bg-gray-900 hover:bg-gray-800 transition"
              >
                <Icon size={18} className="text-gray-400 hover:text-white transition" />
              </Link>
            ))}
          </div>
        </div>
      </div>

      
      <div className="text-center mt-10">
        <p className="text-sm text-gray-500">
          © {new Date().getFullYear()} <span className="text-white">Rimel</span>. All Rights Reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
