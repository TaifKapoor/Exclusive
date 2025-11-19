// app/login/page.jsx
"use client";

import Link from 'next/link';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { motion } from 'framer-motion';
import { Loader2, Mail, Lock, ArrowRight, Shield, Sparkles, Fingerprint, CheckCircle2 } from 'lucide-react';
import toast, { Toaster } from 'react-hot-toast';
import { useRouter } from 'next/navigation';

const schema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(1, 'Password is required'),
});

export default function LoginPage() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
        credentials: 'include',
      });

      const result = await res.json();

      if (res.ok) {
        toast.success('Welcome back! Logging you in...', { icon: 'Success' });
        await new Promise(r => setTimeout(r, 800));
        window.location.href = result.redirectTo || '/';
      } else {
        toast.error(result.error || 'Login failed');
      }
    } catch (error) {
      toast.error('Network error. Try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Toaster position="top-center" toastOptions={{ duration: 4000 }} />

      {/* Full Screen Cinematic Background */}
      <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-purple-900 via-black to-pink-900 flex items-center justify-center p-4">
        
        {/* Animated Background Particles */}
        <div className="absolute inset-0">
          {[...Array(8)].map((_, i) => (
            <motion.div
              key={i}
              animate={{
                y: [0, -100, 0],
                opacity: [0, 0.6, 0],
              }}
              transition={{
                duration: 15 + i * 2,
                repeat: Infinity,
                ease: "linear",
              }}
              className="absolute w-2 h-2 bg-purple-400 rounded-full blur-sm"
              style={{
                left: `${10 + i * 12}%`,
                top: `${20 + i * 8}%`,
              }}
            />
          ))}
        </div>

        {/* Floating Glow Orbs */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
          className="absolute top-20 left-20 w-96 h-96 bg-purple-600 rounded-full blur-3xl opacity-20"
        />
        <motion.div
          animate={{ rotate: -360 }}
          transition={{ duration: 80, repeat: Infinity, ease: "linear" }}
          className="absolute bottom-20 right-20 w-80 h-80 bg-pink-600 rounded-full blur-3xl opacity-20"
        />

        {/* Main Login Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 50 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.8, type: "spring" }}
          className="relative w-full max-w-md"
        >
          <div className="bg-white/10 backdrop-blur-3xl rounded-3xl shadow-3xl border border-white/20 p-10 md:p-12 overflow-hidden">
            
            {/* Glowing Border Effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-700 rounded-3xl blur-xl -z-10" />

            {/* Header */}
            <div className="text-center mb-10">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
                className="w-24 h-24 bg-gradient-to-br from-purple-600 to-pink-600 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-2xl"
              >
                <Shield size={48} className="text-white" />
              </motion.div>

              <h1 className="text-5xl font-black text-white mb-3">
                Welcome Back
              </h1>
              <p className="text-xl text-gray-300">Log in to your secure account</p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-7">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 }}
              >
                <label className="flex items-center gap-3 text-white font-bold mb-3">
                  <Mail size={22} />
                  Email Address
                </label>
                <input
                  {...register('email')}
                  type="email"
                  placeholder="admin@example.com"
                  className="w-full px-6 py-5 rounded-2xl bg-white/10 border border-white/30 text-white placeholder-gray-400 focus:border-purple-400 focus:ring-4 focus:ring-purple-500/30 outline-none transition-all font-medium text-lg"
                />
                {errors.email && (
                  <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-red-400 text-sm mt-2">
                    {errors.email.message}
                  </motion.p>
                )}
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6 }}
              >
                <label className="flex items-center gap  gap-3 text-white font-bold mb-3">
                  <Lock size={22} />
                  Password
                </label>
                <input
                  {...register('password')}
                  type="password"
                  placeholder="••••••••"
                  className="w-full px-6 py-5 rounded-2xl bg-white/10 border border-white/30 text-white placeholder-gray-400 focus:border-purple-400 focus:ring-4 focus:ring-purple-500/30 outline-none transition-all font-medium text-lg"
                />
                {errors.password && (
                  <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-red-400 text-sm mt-2">
                    {errors.password.message}
                  </motion.p>
                )}
              </motion.div>

              {/* Login Button */}
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                disabled={loading}
                className="w-full py-6 rounded-2xl bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 text-white font-black text-2xl shadow-2xl hover:shadow-purple-500/50 transition-all duration-300 flex items-center justify-center gap-4 disabled:opacity-70"
              >
                {loading ? (
                  <>
                    <Loader2 className="animate-spin" size={32} />
                    Logging In...
                  </>
                ) : (
                  <>
                    Log In Securely
                    <ArrowRight size={32} />
                  </>
                )}
              </motion.button>
            </form>

            {/* Sign Up Link */}
            <div className="mt-8 text-center">
              <p className="text-gray-300 text-lg">
                New here?{' '}
                <Link href="/signup" className="font-black text-white hover:text-purple-300 transition-all underline underline-offset-4">
                  Create Account
                </Link>
              </p>
            </div>

            {/* Security Badges */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="mt-10 pt-8 border-t border-white/20 flex items-center justify-center gap-6 text-sm text-gray-300"
            >
              <div className="flex items-center gap-2">
                <Fingerprint size={20} className="text-green-400" />
                <span>Encrypted</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 size={20} className="text-green-400" />
                <span>100% Secure</span>
              </div>
              <div className="flex items-center gap-2">
                <Sparkles size={20} className="text-yellow-400" />
                <span>24/7 Protected</span>
              </div>
            </motion.div>

            {/* Test Accounts (Only in Development) */}
            {process.env.NODE_ENV === 'development' && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1 }}
                className="mt-8 p-6 bg-white/5 backdrop-blur rounded-2xl border border-white/10"
              >
                <p className="text-white/80 text-center font-bold mb-3">Test Accounts:</p>
                <div className="text-sm text-gray-300 space-y-2 text-center">
                  <p>Admin: <strong className="text-purple-300">admin@example.com</strong> / admin123</p>
                  <p>User: <strong className="text-pink-300">user@example.com</strong> / user123</p>
                </div>
              </motion.div>
            )}
          </div>
        </motion.div>
      </div>
    </>
  );
}












