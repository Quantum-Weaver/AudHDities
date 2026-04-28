// src/components/hermes/bazaar/residual/ResidualHero.tsx
'use client';

import { motion } from 'framer-motion';
import { Coins, Users, Infinity } from 'lucide-react';

export function ResidualHero() {
  return (
    <section className="relative py-20 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 via-purple-500/5 to-pink-500/5" />
      <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-cyan-400/5 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-400/5 rounded-full blur-3xl animate-pulse delay-700" />
      
      <div className="relative z-10 container max-w-4xl mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full mb-6 border border-white/20">
            <Infinity size={14} className="text-neurospark" />
            <span className="text-sm text-star-dust/80">Forever Value</span>
          </div>
          
          <h1 className="text-4xl md:text-6xl font-bold text-star-dust mb-6">
            The Residual System
          </h1>
          
          <p className="text-xl text-star-dust/70 max-w-2xl mx-auto mb-8">
            Where value circulates forever.
            <br />
            Everyone who helps create earns forever.
          </p>
          
          <div className="flex flex-wrap justify-center gap-6 text-sm text-star-dust/40">
            <span className="flex items-center gap-2">
              <Coins size={14} className="text-neurospark" />
              Automatic
            </span>
            <span className="flex items-center gap-2">
              <Users size={14} className="text-purple-400" />
              For Everyone
            </span>
            <span className="flex items-center gap-2">
              <Infinity size={14} className="text-pink-400" />
              Forever
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}