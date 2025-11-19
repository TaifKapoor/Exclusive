// components/about/TeamCard.jsx
"use client";
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Twitter, Instagram, Linkedin, Sparkles } from 'lucide-react';

const TeamCard = ({ member }) => {
  return (
    <motion.div
      whileHover={{ y: -12, scale: 1.02 }}
      transition={{ type: "spring", stiffness: 300 }}
      className="group relative overflow-hidden rounded-3xl bg-gradient-to-br from-gray-900/50 to-black/50 backdrop-blur-xl border border-white/10 shadow-2xl"
    >
    
      <div className="absolute inset-0 bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-700 rounded-3xl blur-xl scale-110 -z-10" />
      
     
      <div className="relative h-96 overflow-hidden">
        <Image
          src={member.image}
          alt={member.name}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover transition-transform duration-700 group-hover:scale-110"
        />
        
        
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />
        
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileHover={{ opacity: 1, y: 0 }}
          className="absolute bottom-6 left-6 right-6 flex justify-center gap-5"
        >
          {member.twitter && (
            <a
              href={member.twitter}
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 bg-white/10 backdrop-blur-xl rounded-full hover:bg-white/20 transition-all hover:scale-110"
            >
              <Twitter size={20} className="text-white" />
            </a>
          )}
          {member.instagram && (
            <a
              href={member.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 bg-white/10 backdrop-blur-xl rounded-full hover:bg-white/20 transition-all hover:scale-110"
            >
              <Instagram size={20} className="text-white" />
            </a>
          )}
          {member.linkedin && (
            <a
              href={member.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 bg-white/10 backdrop-blur-xl rounded-full hover:bg-white/20 transition-all hover:scale-110"
            >
              <Linkedin size={20} className="text-white" />
            </a>
          )}
        </motion.div>

      
        <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
          <Sparkles size={24} className="text-yellow-400 animate-pulse" />
        </div>
      </div>

      
      <div className="p-8 text-center relative z-10">
        <h3 className="text-3xl font-black text-white mb-2 tracking-tight">
          {member.name}
        </h3>
        <p className="text-lg font-medium text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">
          {member.role}
        </p>
      </div>

      
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 scale-x-0 group-hover:scale-x-100 transition-transform duration-700 origin-left" />
    </motion.div>
  );
};

export default TeamCard;