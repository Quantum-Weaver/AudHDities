// src/components/business/ResidualDistribution.tsx
'use client';

import { motion } from 'framer-motion';
import { Users, Heart, TrendingUp, Award } from 'lucide-react';

const recipients = [
  {
    icon: Award,
    label: 'Contributors',
    description: 'Anyone who helped create the product—code, design, testing, ideas—receives their share forever',
    color: 'cyan',
    share: 'Based on contribution percentage',
  },
  {
    icon: Users,
    label: 'Community Members',
    description: 'Every active community member receives a dignity share, regardless of activity level',
    color: 'pink',
    share: 'Equal distribution',
  },
  {
    icon: TrendingUp,
    label: 'Platform Sustainability',
    description: 'Future development, emergency reserves, and creator grants',
    color: 'purple',
    share: 'Variable based on needs',
  },
  {
    icon: Heart,
    label: 'Mutual Aid',
    description: 'Direct support for community members in crisis',
    color: 'green',
    share: 'Discretionary with transparency',
  },
];

export function ResidualDistribution() {
  return (
    <div className="space-y-6">
      <h4 className="text-white font-bold text-lg mb-4">The Residual Pool Distribution</h4>
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
        {recipients.map((recipient, idx) => (
          <motion.div
            key={recipient.label}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            viewport={{ once: true }}
            className={`bg-${recipient.color}-500/5 border border-${recipient.color}-500/20 rounded-xl p-4`}
          >
            <div className={`w-10 h-10 rounded-lg bg-${recipient.color}-500/20 flex items-center justify-center mb-3`}>
              <recipient.icon className={`text-${recipient.color}-400`} size={18} />
            </div>
            <h5 className="text-white font-bold text-sm mb-1">{recipient.label}</h5>
            <p className="text-white/40 text-xs mb-2">{recipient.description}</p>
            <p className={`text-${recipient.color}-400 text-xs font-mono`}>{recipient.share}</p>
          </motion.div>
        ))}
      </div>
      
      <div className="bg-white/5 rounded-xl p-4 mt-4">
        <p className="text-white/60 text-sm text-center">
          ✦ The residual pool is the heart of circulation. Every sale contributes to a fund that flows forever to everyone who helped create it.
        </p>
      </div>
    </div>
  );
}