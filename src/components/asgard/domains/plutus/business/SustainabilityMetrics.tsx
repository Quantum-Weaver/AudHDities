// src/components/asgard/domains/plutus/business/SustainabilityMetrics.tsx
'use client';

import { motion } from 'framer-motion';
import { TrendingUp, DollarSign, Users, Heart, Shield, Battery, HandCoins, Share2 } from 'lucide-react';

const metrics = [
  {
    icon: TrendingUp,
    label: 'Operational Sustainability',
    description: '100% covered by 70% of the 10% platform fee (industry standard is 30-50%)',
    status: 'Achieved',
    color: 'cyan',
    year: 'Year 1-2',
    detail: '7% of a sale — the only money that leaves',
  },
  {
    icon: DollarSign,
    label: 'Artisan Profit',
    description: "90% of every sale is the ware's own, divided equally among its contributors",
    status: 'Ongoing',
    color: 'purple',
    year: 'Continuous',
    detail: 'No roles, no ranking',
  },
  {
    icon: HandCoins,
    label: 'Covenant Distribution',
    description: 'Every vessel may pledge 0-50% of their own share of a sale, default 0',
    status: 'Voluntary',
    color: 'green',
    year: 'Per vessel',
    detail: 'Equal share to every opted-in user',
  },
  {
    icon: Users,
    label: 'Residual Roster',
    description: 'One contribution, ever, and the residual pool pays you for life',
    status: 'Projected',
    color: 'pink',
    year: 'Year 3-5',
    detail: '500+ receiving forever income',
  },
  {
    icon: Heart,
    label: 'Community Dignity Share',
    description: 'Equal distribution from covenant pool regardless of activity',
    status: 'Ongoing',
    color: 'green',
    year: 'Continuous',
    detail: 'Disabled members included',
  },
  {
    icon: Shield,
    label: 'Held Funds',
    description: "Money waiting for a distribution is the vessels' — never float, never working capital, never yield for us",
    status: 'Law',
    color: 'yellow',
    year: 'Always',
    detail: 'Segregated, and a liability on our books',
  },
  {
    icon: Battery,
    label: 'Energy Footprint',
    description: 'Optimized for minimal environmental impact',
    status: 'Design priority',
    color: 'blue',
    year: 'Continuous',
    detail: 'Green hosting',
  },
  {
    icon: Share2,
    label: 'Value Circulation',
    description: 'Money flows to a ware’s contributors, to every artisan, and to every user — not out',
    status: 'Core Principle',
    color: 'cyan',
    year: 'Always',
    detail: 'No extraction',
  },
];

export function SustainabilityMetrics() {
  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
      {metrics.map((metric, idx) => (
        <motion.div
          key={metric.label}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: idx * 0.05 }}
          viewport={{ once: true }}
          className={`bg-${metric.color}-500/5 border border-${metric.color}-500/20 rounded-xl p-5 hover:bg-${metric.color}-500/10 transition-all`}
        >
          <div className={`w-12 h-12 rounded-xl bg-${metric.color}-500/20 flex items-center justify-center mb-4`}>
            <metric.icon className={`text-${metric.color}-400`} size={24} />
          </div>
          <h3 className="text-star-dust font-bold text-lg mb-2">{metric.label}</h3>
          <p className="text-star-dust/60 text-sm mb-3">{metric.description}</p>
          <div className="flex justify-between items-center">
            <span className={`text-xs px-2 py-1 rounded-full bg-${metric.color}-500/20 text-${metric.color}-400`}>
              {metric.status}
            </span>
            <span className="text-star-dust/40 text-xs">{metric.year}</span>
          </div>
          <p className="text-star-dust/30 text-xs mt-2 pt-2 border-t border-white/10">
            {metric.detail}
          </p>
        </motion.div>
      ))}
    </div>
  );
}