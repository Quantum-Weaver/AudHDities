// src/components/asgard/domains/plutus/business/FinancialEcosystemHero.tsx
'use client';

import { motion } from 'framer-motion';
import { ArrowDown, CircleDollarSign, Heart } from 'lucide-react';

export function FinancialEcosystemHero() {
  const scrollToContent = () => {
    const element = document.getElementById('financial-content');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative min-h-[70vh] flex items-center justify-center overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 via-purple-500/5 to-pink-500/5" />
      
      {/* Floating symbols */}
      <div className="absolute top-1/4 left-1/4 w-32 h-32 border border-cyan-400/20 rounded-full animate-pulse" />
      <div className="absolute bottom-1/4 right-1/4 w-48 h-48 border border-purple-400/20 rounded-full animate-pulse delay-700" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 border border-pink-400/10 rounded-full animate-pulse delay-1000" />
      
      <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full mb-8 border border-white/20">
            <CircleDollarSign size={14} className="text-neurospark" />
            <span className="text-neurospark text-sm">✦ The Circulation Engine</span>
            <Heart size={12} className="text-pink-400" />
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold text-star-dust mb-6 leading-tight">
            Value That{' '}
            <span className="bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              Circulates
            </span>
            <br />
            Never Extracts
          </h1>
          
          <p className="text-xl text-star-dust/70 max-w-2xl mx-auto mb-12">
            Every dollar that enters the sanctuary is accounted for, transparent, and distributed.
            No hidden fees. No dark patterns. No extraction.
          </p>
          
          <button
            onClick={scrollToContent}
            className="group inline-flex items-center gap-2 px-8 py-4 bg-white/5 hover:bg-white/10 border border-white/20 rounded-full text-star-dust transition-all duration-300"
          >
            <span>Follow the Flow</span>
            <ArrowDown size={18} className="group-hover:translate-y-1 transition-transform" />
          </button>
        </motion.div>
      </div>
      
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2">
        <div className="w-6 h-10 border border-white/20 rounded-full flex justify-center">
          <div className="w-1 h-2 bg-white/40 rounded-full mt-2 animate-bounce" />
        </div>
      </div>
    </section>
  );
}
