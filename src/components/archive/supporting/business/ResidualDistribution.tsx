// src/components/business/ResidualDistribution.tsx
'use client';

import { motion } from 'framer-motion';
import { Users, Heart, TrendingUp, Award, HandCoins, Shield } from 'lucide-react';

const recipients = [
  {
    icon: Award,
    label: 'Product Contributors',
    description: 'Anyone who helped create the product—code, design, testing, ideas—receives their share forever',
    color: 'cyan',
    source: 'Residual Pool (30-50% of platform fee)',
    distribution: 'Based on contribution percentage set by creator',
  },
  {
    icon: Users,
    label: 'Community Members',
    description: 'Every active community member receives a dignity share, regardless of activity level',
    color: 'pink',
    source: 'Covenant Pool (0-50% of creator earnings)',
    distribution: 'Equal distribution among all active members',
  },
  {
    icon: HandCoins,
    label: 'Creator Immediate',
    description: 'The creator keeps their share after covenant pledge',
    color: 'purple',
    source: '90% of sale minus covenant pledge',
    distribution: 'Direct payout at time of sale',
  },
  {
    icon: TrendingUp,
    label: 'Platform Operations',
    description: 'Hosting, development, support, and future growth',
    color: 'green',
    source: '70% of platform fee (7% of sale)',
    distribution: 'Platform sustainability',
  },
  {
    icon: Shield,
    label: 'Mutual Aid Reserve',
    description: 'Emergency support for community members in crisis',
    color: 'yellow',
    source: 'Discretionary from platform operations surplus',
    distribution: 'Community-led with transparency',
  },
];

export function ResidualDistribution() {
  return (
    <div className="space-y-6">
      <h4 className="text-star-dust font-bold text-lg mb-4">The Value Circulation System</h4>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
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
            <h5 className="text-star-dust font-bold text-sm mb-1">{recipient.label}</h5>
            <p className="text-star-dust/40 text-xs mb-2">{recipient.description}</p>
            <p className={`text-${recipient.color}-400 text-xs font-mono`}>{recipient.source}</p>
            <p className="text-star-dust/30 text-xs mt-1">{recipient.distribution}</p>
          </motion.div>
        ))}
      </div>
      
      <div className="bg-white/5 rounded-xl p-4 mt-4">
        <p className="text-star-dust/60 text-sm text-center">
          ✦ The platform fee is fixed at <span className="text-neurospark">10%</span> (industry standard is 30-50%)<br />
          ✦ Creators set <span className="text-purple-400">residual percentage</span> (0-50% of fee) per product<br />
          ✦ Creators set <span className="text-green-400">covenant pledge</span> (0-50% of earnings) in their profile
        </p>
      </div>
    </div>
  );
}