// src/components/community/BreakthroughGrid.tsx
'use client';

import { motion } from 'framer-motion';
import { keyBreakthroughs } from '@/data/core/breakthroughs-data';

export function BreakthroughGrid() {
  const displayedBreakthroughs = keyBreakthroughs.slice(0, 12);

  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
      {displayedBreakthroughs.map((breakthrough, idx) => (
        <motion.div
          key={idx}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: idx * 0.05 }}
          viewport={{ once: true }}
          className="bg-white/5 border border-white/10 rounded-xl p-5 hover:bg-white/10 transition-all duration-300 hover:scale-[1.02]"
        >
          <p className="text-white/90 text-sm leading-relaxed">{breakthrough}</p>
        </motion.div>
      ))}
    </div>
  );
}