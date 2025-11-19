// app/signup/page.jsx
"use client";

import Link from 'next/link';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { motion } from 'framer-motion';
import { Loader2, Mail, Lock, User, ArrowRight, Shield, Sparkles, CheckCircle2 } from 'lucide-react';
import toast, { Toaster } from 'react-hot-toast';

const schema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

export default function SignupPage() {
  const [loading, setLoading] = useState(false);

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const res = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
        credentials: 'include',
      });

      const result = await res.json();

      if (res.ok) {
        toast.success('Account created successfully! Welcome aboard', { icon: 'Success' });
        await new Promise(r => setTimeout(r, 1000));
        window.location.href = result.redirectTo || '/';
      } else {
        toast.error(result.error || 'Signup failed');
      }
    } catch (error) {
      toast.error('Network error. Try again.');
    } finally {
      setLoading(false);
    }
  };

  // Premium Input Class — Autofill 100% Clean (No Yellow!)
  const inputClass = `
  w-full px-6 py-5 rounded-2xl 
  bg-white/10 backdrop-blur-md 
  border border-white/30 
  text-white 
  placeholder:text-gray-300 
  focus:placeholder:text-gray-400 
  focus:border-purple-400 
  focus:ring-4 focus:ring-purple-500/20 
  outline-none transition-all duration-300 
  font-medium text-lg 

  /* ← YE 5 LINES AUTOFILL KO MAAR DETI HAIN — 100% WORKING */
  [-webkit-text-fill-color:white!important] 
  [-webkit-box-shadow:0_0_0px_1000px_transparent_inset!important]
  [transition:background-color_5000s_ease-in-out_0s!important]
  [background-color:transparent!important]
  [color:white!important]
`;

  return (
    <>
      <Toaster position="top-center" toastOptions={{ duration: 5000 }} />

      {/* Full Cinematic Background */}
      <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-purple-900 via-black to-pink-900 flex items-center justify-center p-4">

        {/* Animated Particles */}
        <div className="absolute inset-0">
          {[...Array(10)].map((_, i) => (
            <motion.div
              key={i}
              animate={{ y: [0, -140, 0], opacity: [0, 0.8, 0] }}
              transition={{ duration: 16 + i * 2, repeat: Infinity, ease: "linear" }}
              className="absolute w-2 h-2 bg-purple-300 rounded-full blur-sm"
              style={{ left: `${5 + i * 11}%`, top: `${10 + i * 12}%` }}
            />
          ))}
        </div>

        {/* Glow Orbs */}
        <motion.div animate={{ rotate: 360 }} transition={{ duration: 80, repeat: Infinity, ease: "linear" }}
          className="absolute top-0 left-0 w-96 h-96 bg-purple-600 rounded-full blur-3xl opacity-20" />
        <motion.div animate={{ rotate: -360 }} transition={{ duration: 100, repeat: Infinity, ease: "linear" }}
          className="absolute bottom-0 right-0 w-80 h-80 bg-pink-600 rounded-full blur-3xl opacity-20" />

        {/* Signup Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 70 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.9, type: "spring", stiffness: 120 }}
          className="relative w-full max-w-md"
        >
          <div className="bg-white/10 backdrop-blur-3xl rounded-3xl shadow-3xl border border-white/20 p-10 md:p-12">

            {/* Header */}
            <div className="text-center mb-10">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
                className="w-24 h-24 bg-gradient-to-br from-purple-600 to-pink-600 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-2xl"
              >
                <Sparkles size={50} className="text-white" />
              </motion.div>

              <h1 className="text-5xl font-black text-white mb-3">Join Exclusive</h1>
              <p className="text-xl text-gray-300">Create your account in seconds</p>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-7">

              {/* Name */}
              <motion.div initial={{ opacity: 0, x: -70 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.4 }}>
                <label className="flex items-center gap-3 text-white font-bold mb-3">
                  <User size={22} /> Full Name
                </label>
                <input
                  {...register('name')}
                  type="text"
                  autoComplete="name"
                  // placeholder="John Doe"
                  className={inputClass}
                />
                {errors.name && <p className="text-red-400 text-sm mt-2">{errors.name.message}</p>}
              </motion.div>

              {/* Email */}
              <motion.div initial={{ opacity: 0, x: -70 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.5 }}>
                <label className="flex items-center gap-3 text-white font-bold mb-3">
                  <Mail size={22} /> Email Address
                </label>
                <input
                  {...register('email')}
                  type="email"
                  autoComplete="email"
                  // placeholder="john@example.com"
                  className={inputClass}
                />
                {errors.email && <p className="text-red-400 text-sm mt-2">{errors.email.message}</p>}
              </motion.div>

              {/* Password */}
              <motion.div initial={{ opacity: 0, x: -70 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.6 }}>
                <label className="flex items-center gap-3 text-white font-bold mb-3">
                  <Lock size={22} /> Create Password
                </label>
                <input
                  {...register('password')}
                  type="password"
                  autoComplete="new-password"
                  // placeholder="••••••••"
                  className={inputClass}
                />
                {errors.password && <p className="text-red-400 text-sm mt-2">{errors.password.message}</p>}
              </motion.div>

              {/* Submit Button */}
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                type="submit"
                disabled={loading}
                className="w-full py-6 rounded-2xl bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 text-white font-black text-2xl shadow-2xl hover:shadow-purple-500/60 transition-all flex items-center justify-center gap-4 disabled:opacity-70"
              >
                {loading ? (
                  <> <Loader2 className="animate-spin" size={32} /> Creating Account... </>
                ) : (
                  <> Create Account <ArrowRight size={32} /> </>
                )}
              </motion.button>
            </form>

            {/* Login Link */}
            <div className="mt-8 text-center">
              <p className="text-gray-300 text-lg">
                Already have an account?{' '}
                <Link href="/login" className="font-black text-white hover:text-purple-300 underline underline-offset-4 transition-all">
                  Log In Here
                </Link>
              </p>
            </div>

            {/* Trust Badges */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.9 }}
              className="mt-10 pt-8 border-t border-white/20 flex flex-wrap justify-center gap-6 text-gray-300"
            >
              <div className="flex items-center gap-2"><Shield size={20} className="text-green-400" /><span>Secure Signup</span></div>
              <div className="flex items-center gap-2"><CheckCircle2 size={20} className="text-green-400" /><span>Instant Access</span></div>
              <div className="flex items-center gap-2"><Sparkles size={20} className="text-yellow-400" /><span>No Spam Ever</span></div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </>
  );
}
