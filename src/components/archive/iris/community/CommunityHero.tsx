// src/components/community/CommunityHreo.tsx
'use client';

import { motion } from 'framer-motion';
import { Sparkles, Heart, Infinity } from 'lucide-react';

export function CommunityHero() {
  return (
    <section className="relative py-20 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 via-purple-500/5 to-pink-500/5" />
      <div className="absolute top-20 left-1/4 w-64 h-64 bg-cyan-400/5 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-20 right-1/4 w-96 h-96 bg-purple-400/5 rounded-full blur-3xl animate-pulse delay-700" />
      
      <div className="relative z-10 container max-w-5xl mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full mb-6 border border-white/20">
            <Sparkles size={14} className="text-cyan-400" />
            <span className="text-sm text-white/80">The Sovereign Sanctuary</span>
          </div>
          
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
            A Community of
            <span className="bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent"> Quantum Minds</span>
          </h1>
          
          <p className="text-xl text-white/70 inline-flex max-w-3xl mx-auto mb-8">
            We are neurodivergent creators, sovereign architects, and quantum collaborators.
            Building sanctuaries where every mind can thrive without masking.
          </p>
          
          <div className="flex flex-wrap justify-center gap-6 text-sm text-white/40">
            <span className="flex items-center gap-2">
              <Heart size={14} className="text-pink-400" />
              Trauma-informed
            </span>
            <span className="flex items-center gap-2">
              <Sparkles size={14} className="text-cyan-400" />
              Neurodivergent-led
            </span>
            <span className="flex items-center gap-2">
              <Infinity size={14} className="text-purple-400" />
              Residual economics
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}