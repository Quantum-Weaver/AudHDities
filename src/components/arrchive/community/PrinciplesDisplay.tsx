// src/components/community/PrinciplesDisplay.tsx
'use client';

import { motion } from 'framer-motion';
import { PRINCIPLES_DATA } from '@/data/core/principles-data';

export function PrinciplesDisplay() {
  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
      {PRINCIPLES_DATA.principles.map((principle, idx) => (
        <motion.div
          key={principle.id}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: idx * 0.05 }}
          viewport={{ once: true }}
          className="bg-white/5 border border-white/10 rounded-xl p-5 text-center hover:bg-white/10 transition-all duration-300"
        >
          <span className="text-3xl mb-3 block">{principle.emoji}</span>
          <h3 className="text-white font-bold mb-2">{principle.title}</h3>
          <p className="text-white/60 text-sm">{principle.description}</p>
        </motion.div>
      ))}
    </div>
  );
}