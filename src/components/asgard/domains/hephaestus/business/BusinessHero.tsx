// src/components/hephaestus/business/BusinessHero.tsx
'use client';

import { motion } from 'framer-motion';
import { ArrowDown } from 'lucide-react';

export function BusinessHero() {
  const scrollToContent = () => {
    const element = document.getElementById('business-content');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative min-h-[70vh] flex items-center justify-center overflow-hidden">
      {/* Animated background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 via-purple-500/5 to-pink-500/5" />
      
      {/* Floating orbs */}
      <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-cyan-400/10 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-400/10 rounded-full blur-3xl animate-pulse delay-1000" />
      
      <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full mb-8 border border-white/20">
            <span className="text-neurospark text-sm">✦ The Quantum Weaver</span>
            <span className="text-star-dust/40 text-sm">|</span>
            <span className="text-purple-400 text-sm">A New Economy</span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold text-star-dust mb-6 leading-tight">
            A World Where{' '}
            <span className="bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              Value Circulates
            </span>
            <br />
            Never Extracts
          </h1>
          
          <p className="text-xl text-star-dust/70 max-w-2xl mx-auto mb-12">
            The first economic ecosystem designed for dignity, not growth. 
            Where every contributor earns forever, every community member 
            shares in success, and no one is left behind.
          </p>
          
          <button
            onClick={scrollToContent}
            className="group inline-flex items-center gap-2 px-8 py-4 bg-white/5 hover:bg-white/10 border border-white/20 rounded-full text-star-dust transition-all duration-300"
          >
            <span>Explore the Sanctuary Economy</span>
            <ArrowDown size={18} className="group-hover:translate-y-1 transition-transform" />
          </button>
        </motion.div>
      </div>
      
      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2">
        <div className="w-6 h-10 border border-white/20 rounded-full flex justify-center">
          <div className="w-1 h-2 bg-white/40 rounded-full mt-2 animate-bounce" />
        </div>
      </div>
    </section>
  );
}