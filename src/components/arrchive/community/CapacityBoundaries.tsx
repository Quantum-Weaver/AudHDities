// src/components/community/CapacityBoundaries.tsx
'use client';

import { motion } from 'framer-motion';
import { capacityItems } from '@/data/community/capacity-boundaries';

export function CapacityBoundaries() {
  const advantageItems = capacityItems.filter(item => item.type === 'advantage');
  const canItems = capacityItems.filter(item => item.type === 'can');
  const cannotItems = capacityItems.filter(item => item.type === 'cannot');

  return (
    <div className="grid md:grid-cols-3 gap-6">
      {/* What We Can Do (Advantage) */}
      <div className="space-y-4">
        <h3 className="text-lg font-bold text-cyan-400 text-center">✨ Our Advantage</h3>
        {advantageItems.map((item, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ delay: idx * 0.05 }}
            viewport={{ once: true }}
            className="bg-cyan-500/5 border border-cyan-500/20 rounded-lg p-4"
          >
            <p className="text-white/80 text-sm">{item.description}</p>
          </motion.div>
        ))}
      </div>

      {/* What We Can Do */}
      <div className="space-y-4">
        <h3 className="text-lg font-bold text-green-400 text-center">✅ We Can</h3>
        {canItems.map((item, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 0 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.05 }}
            viewport={{ once: true }}
            className="bg-green-500/5 border border-green-500/20 rounded-lg p-4"
          >
            <p className="text-white/80 text-sm">{item.description}</p>
          </motion.div>
        ))}
      </div>

      {/* What We Cannot Do */}
      <div className="space-y-4">
        <h3 className="text-lg font-bold text-pink-400 text-center">❌ We Cannot</h3>
        {cannotItems.map((item, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ delay: idx * 0.05 }}
            viewport={{ once: true }}
            className="bg-pink-500/5 border border-pink-500/20 rounded-lg p-4"
          >
            <p className="text-white/80 text-sm">{item.description}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}