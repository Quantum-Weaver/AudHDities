// src/components/schema/SchemaHero.tsx
'use client';

import { motion } from 'framer-motion';
import { Database, Shield } from 'lucide-react';

export function SchemaHero() {
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
            <Database size={14} className="text-cyan-400" />
            <span className="text-sm text-white/80">The Blueprint</span>
          </div>
          
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
            Database Schema
          </h1>
          
          <p className="text-xl text-white/70 max-w-2xl mx-auto mb-8">
            The living blueprint of our sanctuary. Every table, every relationship,
            every column—always accurate, always transparent.
          </p>
          
          <div className="flex justify-center gap-6 text-sm text-white/40">
            <span className="flex items-center gap-2">
              <Shield size={14} className="text-cyan-400" />
              Row Level Security
            </span>
            <span className="flex items-center gap-2">
              <Database size={14} className="text-purple-400" />
              PostgreSQL
            </span>
            <span className="flex items-center gap-2">
              <span className="text-green-400">✓</span>
              Auto-generated
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}