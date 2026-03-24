// src/components/business/SustainabilityMetrics.tsx
'use client';

import { motion } from 'framer-motion';
import { TrendingUp, DollarSign, Users, Heart, Shield, Battery } from 'lucide-react';

const metrics = [
  {
    icon: TrendingUp,
    label: 'Operational Sustainability',
    description: '100% covered by advertising revenue',
    status: 'Achieved',
    color: 'cyan',
    year: 'Year 1-2',
  },
  {
    icon: DollarSign,
    label: 'Creator Earnings',
    description: 'Full-time incomes for 50+ creators',
    status: 'Projected',
    color: 'purple',
    year: 'Year 6-10',
  },
  {
    icon: Users,
    label: 'Contributor Payouts',
    description: '500+ receiving residual income forever',
    status: 'Projected',
    color: 'pink',
    year: 'Year 6-10',
  },
  {
    icon: Heart,
    label: 'Community Distribution',
    description: 'Dignity share for all members',
    status: 'Ongoing',
    color: 'green',
    year: 'Continuous',
  },
  {
    icon: Shield,
    label: 'Platform Reserve',
    description: 'Emergency funds + creator grants',
    status: 'Building',
    color: 'yellow',
    year: 'Year 3+',
  },
  {
    icon: Battery,
    label: 'Energy Footprint',
    description: 'Optimized for minimal environmental impact',
    status: 'Design priority',
    color: 'blue',
    year: 'Continuous',
  },
];

export function SustainabilityMetrics() {
  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
      {metrics.map((metric, idx) => (
        <motion.div
          key={metric.label}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: idx * 0.1 }}
          viewport={{ once: true }}
          className={`bg-${metric.color}-500/5 border border-${metric.color}-500/20 rounded-xl p-5`}
        >
          <div className={`w-12 h-12 rounded-xl bg-${metric.color}-500/20 flex items-center justify-center mb-4`}>
            <metric.icon className={`text-${metric.color}-400`} size={24} />
          </div>
          <h3 className="text-white font-bold text-lg mb-2">{metric.label}</h3>
          <p className="text-white/60 text-sm mb-3">{metric.description}</p>
          <div className="flex justify-between items-center">
            <span className={`text-xs px-2 py-1 rounded-full bg-${metric.color}-500/10 text-${metric.color}-400`}>
              {metric.status}
            </span>
            <span className="text-white/40 text-xs">{metric.year}</span>
          </div>
        </motion.div>
      ))}
    </div>
  );
}