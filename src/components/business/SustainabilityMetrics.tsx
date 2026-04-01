// src/components/business/SustainabilityMetrics.tsx
'use client';

import { motion } from 'framer-motion';
import { TrendingUp, DollarSign, Users, Heart, Shield, Battery, HandCoins, Share2 } from 'lucide-react';

const metrics = [
  {
    icon: TrendingUp,
    label: 'Operational Sustainability',
    description: '100% covered by 10% platform fee (industry standard is 30-50%)',
    status: 'Achieved',
    color: 'cyan',
    year: 'Year 1-2',
    detail: 'Platform runs on 10% fee',
  },
  {
    icon: DollarSign,
    label: 'Creator Earnings',
    description: '90% of sales go to creators + contributors',
    status: 'Ongoing',
    color: 'purple',
    year: 'Continuous',
    detail: '90% creator share',
  },
  {
    icon: HandCoins,
    label: 'Covenant Distribution',
    description: 'Creators pledge 0-50% of earnings to community dignity fund',
    status: 'Voluntary',
    color: 'green',
    year: 'Per creator',
    detail: 'Equal share to all active members',
  },
  {
    icon: Users,
    label: 'Residual Contributors',
    description: 'Anyone who helped create earns forever from residual pool',
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
    label: 'Platform Reserve',
    description: 'Emergency funds + creator grants from operations surplus',
    status: 'Building',
    color: 'yellow',
    year: 'Year 3+',
    detail: 'Mutual aid fund',
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
    description: 'Money flows to contributors, community, and creators, not extracted',
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
          <h3 className="text-white font-bold text-lg mb-2">{metric.label}</h3>
          <p className="text-white/60 text-sm mb-3">{metric.description}</p>
          <div className="flex justify-between items-center">
            <span className={`text-xs px-2 py-1 rounded-full bg-${metric.color}-500/20 text-${metric.color}-400`}>
              {metric.status}
            </span>
            <span className="text-white/40 text-xs">{metric.year}</span>
          </div>
          <p className="text-white/30 text-xs mt-2 pt-2 border-t border-white/10">
            {metric.detail}
          </p>
        </motion.div>
      ))}
    </div>
  );
}