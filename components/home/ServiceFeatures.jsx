// components/common/ServiceFeatures.jsx
"use client";
import { Truck, HeadphonesIcon, ShieldCheck, Sparkles } from "lucide-react";
import { motion } from "framer-motion";

const features = [
  {
    Icon: Truck,
    title: "Free & Fast Delivery",
    description: "Free delivery on all orders above ₹999",
    gradient: "from-emerald-500 to-teal-600",
    glow: "emerald-400/30",
  },
  {
    Icon: HeadphonesIcon,
    title: "24/7 Premium Support",
    description: "We're here for you — anytime, anywhere",
    gradient: "from-blue-500 to-cyan-500",
    glow: "cyan-400/30",
  },
  {
    Icon: ShieldCheck,
    title: "100% Secure & Trusted",
    description: "Shop with confidence — 30 days return guaranteed",
    gradient: "from-purple-500 to-pink-600",
    glow: "pink-400/30",
  },
];

const ServiceFeatures = () => {
  return (
    <section className="w-full py-20 md:py-24 lg:py-28 bg-gradient-to-b from-white via-gray-50/50 to-purple-50/20 overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">

        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-14 lg:mb-20"
        >
          <div className="inline-flex items-center gap-3 px-6 py-2 bg-gradient-to-r from-purple-100 to-pink-100 rounded-full text-purple-700 font-black text-sm uppercase tracking-wider mb-4">
            <Sparkles size={18} className="animate-pulse" />
            Why Shop With Us
          </div>
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-black text-gray-900 leading-tight">
            Experience The
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 via-pink-600 to-rose-600">
              {" "}Difference
            </span>
          </h2>
        </motion.div>

        
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 lg:gap-12">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: index * 0.2 }}
              className="group relative"
            >
              
              <div className="relative h-full p-8 md:p-10 rounded-3xl bg-white/70 backdrop-blur-2xl border border-white/40 shadow-xl hover:shadow-2xl transition-all duration-700 overflow-hidden">
                
               
                <div className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-700`} />
                <div className={`absolute -inset-4 bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-20 blur-3xl transition-opacity duration-700`} />

                
                <motion.div
                  whileHover={{ scale: 1.15, rotate: 5 }}
                  className="relative z-10 mb-8 flex justify-center"
                >
                  <div className={`relative w-24 h-24 md:w-28 md:h-28 rounded-full bg-gradient-to-br ${feature.gradient} p-5 shadow-2xl ring-4 ring-white/50`}>
                    <feature.Icon size={48} className="text-white drop-shadow-lg" />
                    
                    <div className={`absolute inset-0 rounded-full animate-ping ${feature.glow}`} />
                  </div>
                </motion.div>

              
                <div className="relative z-10 text-center">
                  <h3 className="text-2xl md:text-3xl font-black text-gray-900 mb-4 tracking-tight">
                    {feature.title}
                  </h3>
                  <p className="text-base md:text-lg text-gray-600 leading-relaxed max-w-xs mx-auto">
                    {feature.description}
                  </p>
                </div>

                
                <motion.div
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  transition={{ duration: 1, delay: index * 0.3 }}
                  className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r ${feature.gradient} origin-left`}
                />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServiceFeatures;