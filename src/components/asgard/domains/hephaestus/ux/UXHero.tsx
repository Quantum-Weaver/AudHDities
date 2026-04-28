// src/components/ux/UXHero.tsx
'use client';

import { motion } from 'framer-motion';
import { Brain, Sparkles } from 'lucide-react';

export function UXHero() {
  return (
    <section className="relative py-20 overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 via-pink-500/5 to-cyan-500/5" />
      <div className="absolute top-20 left-1/4 w-64 h-64 bg-purple-400/5 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-20 right-1/4 w-96 h-96 bg-pink-400/5 rounded-full blur-3xl animate-pulse delay-700" />
      
      <div className="relative z-10 container max-w-4xl mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full mb-6 border border-white/20">
            <Brain size={14} className="text-purple-400" />
            <span className="text-sm text-star-dust/80">Design Philosophy</span>
          </div>
          
          <h1 className="text-4xl md:text-6xl font-bold text-star-dust mb-6">
            Neurodivergent UX
          </h1>
          
          <p className="text-xl text-star-dust/70 max-w-2xl mx-auto mb-8">
            Built by neurodivergent minds, for neurodivergent minds.
            <br />
            We design for the beautiful spectrum of human cognition.
          </p>
          
          <div className="flex justify-center gap-6 text-sm text-star-dust/40">
            <span>Last updated: March 15, 2026</span>
            <span>•</span>
            <span>Interactive Guide</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}