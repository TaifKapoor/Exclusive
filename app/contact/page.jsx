// app/contact/page.jsx
"use client";

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, MapPin, Phone, Mail, Clock, Sparkles, CheckCircle2 } from 'lucide-react';
import toast, { Toaster } from 'react-hot-toast';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '', email: '', phone: '', message: ''
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.phone || !formData.message) {
      toast.error('Please fill all fields');
      return;
    }

    setLoading(true);
    // Simulate sending
    await new Promise(resolve => setTimeout(resolve, 1500));
    toast.success('Message sent successfully! We\'ll contact you soon');
    setFormData({ name: '', email: '', phone: '', message: '' });
    setLoading(false);
  };

  return (
    <>
      <Toaster position="top-center" />

      
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-purple-900 via-black to-pink-900">
        <div className="absolute inset-0 bg-black/60 backdrop-blur-3xl" />

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="relative z-10 text-center px-6 max-w-5xl mx-auto"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.4, type: "spring" }}
            className="inline-flex items-center gap-3 px-8 py-4 bg-white/10 backdrop-blur-xl rounded-full border border-white/20 mb-8"
          >
            <Sparkles className="text-yellow-400" />
            <span className="text-white font-bold text-lg">We Reply Within 2 Hours</span>
          </motion.div>

          <h1 className="text-6xl md:text-8xl font-black text-white mb-8 leading-tight">
            Let's Connect
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">
              We're Here For You
            </span>
          </h1>

          <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto">
            Have a question? Want to say hi? Drop us a message — our team is always excited to hear from you!
          </p>
        </motion.div>
      </section>

    
      <section className="py-24 px-6 -mt-32 relative z-20">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-3 gap-10">

            
            <div className="space-y-8">
              {[
                { icon: MapPin, title: "Visit Us", text: "Mumbai, Maharashtra\nIndia 400001" },
                { icon: Phone, title: "Call Us", text: "+91 98765 43210\nMon-Sun: 9AM - 9PM" },
                { icon: Mail, title: "Email Us", text: "hello@exclusive.in\nsupport@exclusive.in" },
              ].map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.2 }}
                  className="group relative bg-white/10 backdrop-blur-xl rounded-3xl p-8 border border-white/20 shadow-2xl hover:shadow-purple-500/30 transition-all duration-500"
                >
                  <div className="flex items-start gap-6">
                    <div className="p-4 bg-gradient-to-br from-purple-600 to-pink-600 rounded-2xl shadow-xl group-hover:scale-110 transition-transform">
                      <item.icon size={32} className="text-white" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-black text-white mb-3">{item.title}</h3>
                      <p className="text-gray-300 whitespace-pre-line leading-relaxed">{item.text}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="lg:col-span-2"
            >
              <div className="bg-white/10 backdrop-blur-2xl rounded-3xl shadow-3xl border border-white/20 p-10 md:p-12">
                <div className="flex items-center gap-4 mb-10">
                  <div className="p-4 bg-gradient-to-br from-purple-600 to-pink-600 rounded-2xl shadow-2xl">
                    <Send size={36} className="text-white" />
                  </div>
                  <div>
                    <h2 className="text-4xl font-black text-white">Send Us a Message</h2>
                    <p className="text-gray-300">We'll get back to you faster than Flash</p>
                  </div>
                </div>

                <form onSubmit={handleSubmit} className="space-y-8">
                  <div className="grid md:grid-cols-3 gap-6">
                    {[
                      { name: "name", placeholder: "Your Name *", type: "text" },
                      { name: "email", placeholder: "Your Email *", type: "email" },
                      { name: "phone", placeholder: "Your Phone *", type: "tel" },
                    ].map((field) => (
                      <motion.input
                        key={field.name}
                        whileFocus={{ scale: 1.02 }}
                        name={field.name}
                        type={field.type}
                        placeholder={field.placeholder}
                        value={formData[field.name]}
                        onChange={handleChange}
                        required
                        className="w-full px-6 py-5 rounded-2xl bg-white/10 border border-white/30 text-white placeholder-gray-400 focus:border-purple-400 focus:ring-4 focus:ring-purple-500/20 outline-none transition-all font-medium"
                      />
                    ))}
                  </div>

                  <motion.textarea
                    whileFocus={{ scale: 1.01 }}
                    name="message"
                    rows={8}
                    placeholder="Your Message *"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    className="w-full px-6 py-5 rounded-2xl bg-white/10 border border-white/30 text-white placeholder-gray-400 focus:border-purple-400 focus:ring-4 focus:ring-purple-500/20 outline-none resize-none transition-all font-medium"
                  />

                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    type="submit"
                    disabled={loading}
                    className="w-full py-6 rounded-2xl bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 text-white font-black text-2xl shadow-2xl hover:shadow-purple-500/50 transition-all duration-300 flex items-center justify-center gap-4 disabled:opacity-70"
                  >
                    {loading ? (
                      <>Sending...</>
                    ) : (
                      <>
                        Send Message
                        <Send size={32} />
                      </>
                    )}
                  </motion.button>
                </form>

                <div className="mt-10 flex items-center justify-center gap-3 text-green-400">
                  <CheckCircle2 size={28} />
                  <p className="text-white font-bold">Average Response Time: Under 2 Hours</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      
      <section className="py-16 bg-black/50 backdrop-blur-xl">
        <div className="max-w-4xl mx-auto text-center px-6">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-2xl md:text-3xl font-bold text-white"
          >
            50,000+ Customers Trust Us Daily
          </motion.p>
          <div className="flex justify-center gap-10 mt-8">
            {[1, 2, 3, 4, 5].map((i) => (
              <motion.div
                key={i}
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 2, repeat: Infinity, delay: i * 0.2 }}
                className="text-yellow-400"
              >
                ★
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}