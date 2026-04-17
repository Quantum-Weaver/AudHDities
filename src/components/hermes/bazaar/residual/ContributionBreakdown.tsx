// src/components/hermes/bazaar/residual/ContributionBreakdown.tsx
'use client';

import { motion } from 'framer-motion';
import { Code, Palette, Lightbulb, Users, Package, Settings } from 'lucide-react';

const contributionTypes = [
  { icon: Code, label: 'Code', color: 'cyan', description: 'Technical implementation' },
  { icon: Palette, label: 'Design', color: 'purple', description: 'Visual & user experience' },
  { icon: Lightbulb, label: 'Concept', color: 'pink', description: 'Ideas & intellectual property' },
  { icon: Users, label: 'Testing', color: 'green', description: 'Quality assurance & feedback' },
  { icon: Package, label: 'Content', color: 'orange', description: 'Writing, art, media' },
  { icon: Settings, label: 'Infrastructure', color: 'yellow', description: 'Hosting & operations' },
];

export function ContributionBreakdown() {
  return (
    <div>
      <div className="text-center mb-8">
        <h3 className="text-2xl font-bold text-white mb-2">Every Contribution Matters</h3>
        <p className="text-white/60">Different types of contributions earn different shares</p>
      </div>
      
      <div className="grid md:grid-cols-3 gap-4">
        {contributionTypes.map((type, idx) => (
          <motion.div
            key={type.label}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            viewport={{ once: true }}
            className={`bg-${type.color}-500/5 border border-${type.color}-500/20 rounded-xl p-4 text-center`}
          >
            <div className={`w-12 h-12 rounded-lg bg-${type.color}-500/20 flex items-center justify-center mx-auto mb-3`}>
              <type.icon className={`text-${type.color}-400`} size={24} />
            </div>
            <div className="text-white font-medium mb-1">{type.label}</div>
            <div className="text-xs text-white/40">{type.description}</div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}