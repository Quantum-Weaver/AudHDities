// src/components/forge/DocsHero.tsx
'use client';

import { motion } from 'framer-motion';
import { Star } from 'lucide-react';

export function DocsHero() {
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
            <Star size={14} className="text-neurospark" />
            <span className="text-sm text-star-dust/80">The Sanctuary Library</span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold text-star-dust mb-6">
            Welcome to the{' '}
            <span className="bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              Living Library
            </span>
          </h1>
          
          <p className="inline-flex text-xl text-star-dust/70 mx-auto mb-8">
            Explore our architecture, guides, and philosophy.
            <br />
            Every page is a doorway to deeper understanding.
          </p>
            
          <div className="flex flex-wrap justify-center gap-3">
            <span className="text-sm bg-white/5 px-4 py-2 rounded-full text-star-dust/60">
            📚 8 documents
            </span>
            <span className="text-sm bg-white/5 px-4 py-2 rounded-full text-star-dust/60">
            🔄 Living wisdom
            </span>
            <span className="text-sm bg-white/5 px-4 py-2 rounded-full text-star-dust/60">
            🕊️ Open to all
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}