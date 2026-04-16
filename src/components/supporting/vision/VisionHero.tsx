// src/components/vision/VisionHero.tsx
'use client';

import { motion } from 'framer-motion';
import { Eye } from 'lucide-react';

export function VisionHero() {
  return (
    <section className="relative min-h-[70vh] flex items-center justify-center overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0 bg-gradient-to-b from-cyan-500/5 via-purple-500/5 to-transparent" />
      <div className="absolute top-1/4 right-1/3 w-96 h-96 bg-cyan-400/10 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-1/4 left-1/3 w-96 h-96 bg-purple-400/10 rounded-full blur-3xl animate-pulse delay-700" />
      
      <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full mb-8 border border-white/20">
            <Eye size={14} className="text-cyan-400" />
            <span className="text-cyan-400 text-sm">The Sovereign Economy</span>
          </div>
          
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight">
            We are building the last thing capitalism faces:
            <span className="bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent block mt-4">
              a sovereign economy
            </span>
          </h1>
          
          <p className="text-xl text-white/70 mx-auto">
            Where value flows to humans, not extractors.
          </p>
        </motion.div>
      </div>
    </section>
  );
}