// src/components/community/RandomQuote.tsx
'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Quote } from 'lucide-react';
import { quantumWeaverQuotes } from '@/data/entities/quotes-data';

export function RandomQuote() {
  const [quote, setQuote] = useState(quantumWeaverQuotes[0]);
  const [key, setKey] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      const randomIndex = Math.floor(Math.random() * quantumWeaverQuotes.length);
      setQuote(quantumWeaverQuotes[randomIndex]);
      setKey(prev => prev + 1);
    }, 10000);
    return () => clearInterval(interval);
  }, []);

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={key}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.5 }}
        className="bg-white/5 border border-white/10 rounded-2xl p-8 text-center"
      >
        <Quote className="text-cyan-400 mx-auto mb-4" size={32} />
        <p className="text-xl text-white/80 italic leading-relaxed">
          "{quote}"
        </p>
        <p className="text-sm text-cyan-400 mt-4">— Quantum Weaver</p>
      </motion.div>
    </AnimatePresence>
  );
}