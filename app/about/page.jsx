// app/about/page.jsx
"use client";
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ArrowRight, Sparkles, Users, Target, Zap } from 'lucide-react';
import ServiceFeatures from '@/components/home/ServiceFeatures';
import TeamCard from '@/components/about/TeamCard';

const teamMembers = [
  { name: "Tom Cruise", role: "Founder & Chairman", image: "/images/team/tom.png" },
  { name: "Emma Watson", role: "Managing Director", image: "/images/team/emma.png" },
  { name: "Will Smith", role: "Chief Product Officer", image: "/images/team/will.png" },
];

const stats = [
  { value: "50K+", label: "Happy Customers" },
  { value: "100+", label: "Premium Brands" },
  { value: "4.9", label: "Customer Rating" },
  { value: "24/7", label: "Support Available" },
];

export default function AboutPage() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-purple-900 via-black to-pink-900">
        <div className="absolute inset-0 bg-black/50 backdrop-blur-3xl" />
        
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="relative z-10 text-center px-6 max-w-5xl mx-auto"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.5, type: "spring" }}
            className="inline-flex items-center gap-3 px-8 py-4 bg-white/10 backdrop-blur-xl rounded-full border border-white/20 mb-8"
          >
            <Sparkles className="text-yellow-400" />
            <span className="text-white font-bold text-lg">Since 2019 • Building Trust</span>
          </motion.div>

          <h1 className="text-6xl md:text-8xl font-black text-white mb-8 leading-tight">
            We Don't Just Sell
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">
              We Deliver Dreams
            </span>
          </h1>

          <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Exclusive was born from a simple idea: Make premium shopping accessible, fast, and delightful for everyone.
          </p>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="mt-12"
          >
            <Link href="#story" className="inline-flex items-center gap-3 px-10 py-5 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-black text-xl rounded-full shadow-2xl hover:shadow-purple-500/50 transition-all hover:scale-105">
              Our Journey
              <ArrowRight size={28} />
            </Link>
          </motion.div>
        </motion.div>

        {/* Floating Particles */}
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              animate={{
                y: [0, -30, 0],
                opacity: [0.3, 0.7, 0.3],
              }}
              transition={{
                duration: 8 + i,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="absolute w-2 h-2 bg-purple-400 rounded-full"
              style={{
                left: `${20 + i * 15}%`,
                top: `${20 + i * 10}%`,
              }}
            />
          ))}
        </div>
      </section>

      {/* Our Story Section */}
      <section id="story" className="py-24 px-6 bg-gradient-to-b from-black to-gray-900">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="grid lg:grid-cols-2 gap-16 items-center"
          >
            <div>
              <motion.h2
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                className="text-5xl md:text-7xl font-black text-white mb-8"
              >
                Our Story Begins
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">
                  With You
                </span>
              </motion.h2>

              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
                className="space-y-6 text-gray-300 text-lg leading-relaxed"
              >
                <p>
                  Founded in 2019, <span className="text-purple-400 font-bold">Exclusive</span> started as a dream to revolutionize online shopping in India.
                </p>
                <p>
                  We saw customers frustrated with slow delivery, fake products, and poor support. So we built something different — a platform that puts <span className="text-pink-400 font-bold">trust, speed, and happiness</span> first.
                </p>
                <p>
                  Today, we're proud to serve over 50,000+ happy customers with lightning-fast delivery, genuine products, and 24/7 human support.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="mt-12 grid grid-cols-2 gap-8"
              >
                {stats.map((stat, i) => (
                  <div key={i} className="text-center">
                    <h3 className="text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">
                      {stat.value}
                    </h3>
                    <p className="text-gray-400 mt-2 font-medium">{stat.label}</p>
                  </div>
                ))}
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              className="relative h-[600px] rounded-3xl overflow-hidden shadow-3xl border-4 border-purple-500/20"
            >
              <Image
                src="/images/about-vision.png"
                alt="Our Vision"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
              <div className="absolute bottom-8 left-8 text-white">
                <h3 className="text-4xl font-black mb-2">Building the Future</h3>
                <p className="text-xl">One happy customer at a time</p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

<section className="py-24 px-6 bg-gradient-to-b from-gray-900 to-black">
  <div className="max-w-7xl mx-auto text-center">
    <motion.h2
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      className="text-6xl md:text-7xl font-black text-white mb-20"
    >
      Meet The
      <span className="block text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400">
        Visionaries
      </span>
    </motion.h2>

    <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
      {teamMembers.map((member, i) => (
        <motion.div
          key={member.name}
          initial={{ opacity: 0, y: 100 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.2 }}
          viewport={{ once: true }}
        >
          {/* YEHI JAGAH HAI — AB TeamCard USE HO RAHA HAI */}
          <TeamCard member={member} />
        </motion.div>
      ))}
    </div>
  </div>
</section>
      {/* Reusable Service Features */}
      <ServiceFeatures />
    </>
  );
}