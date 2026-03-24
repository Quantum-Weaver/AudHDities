// src/components/about/AboutHero.tsx
'use client';

import { motion } from 'framer-motion';
import { Star } from 'lucide-react';

export function AboutHero() {
  return (
    <section className="relative py-24 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 via-purple-500/5 to-pink-500/5" />
      <div className="absolute top-20 left-1/4 w-96 h-96 bg-cyan-400/5 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-20 right-1/4 w-96 h-96 bg-purple-400/5 rounded-full blur-3xl animate-pulse delay-700" />
      
      <div className="relative z-10 container max-w-6xl mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full mb-6 border border-white/20">
            <Star size={14} className="text-cyan-400" />
            <span className="text-sm text-white/80">The Sanctuary</span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">
            A Sanctuary Born from
            <span className="bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              Survival and Collaboration
            </span>
          </h1>
          
          <p className="text-xl text-white/70 max-w-2xl mx-auto">
            Not a company. A proof that another way exists.
          </p>
        </motion.div>
      </div>
    </section>
  );
}