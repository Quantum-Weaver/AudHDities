// src/components/asgard/domains/plutus/business/ProjectionTable.tsx
'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, TrendingUp, Users, DollarSign, Heart, HandCoins } from 'lucide-react';

const projections = [
  {
    year: 'Year 1-2',
    phase: 'Foundation',
    metrics: [
      { label: 'Platform Fee', value: '10%', icon: TrendingUp, color: 'cyan', description: 'Fixed rate' },
      { label: 'Creator Earnings', value: '$50K', icon: DollarSign, color: 'purple', description: 'From sales' },
      { label: 'Contributor Payouts', value: '$10K', icon: Users, color: 'pink', description: 'From residual pool' },
      { label: 'Covenant Distribution', value: '$5K', icon: Heart, color: 'green', description: 'Community dignity share' },
    ],
  },
  {
    year: 'Year 3-5',
    phase: 'Growth',
    metrics: [
      { label: 'Platform Fee', value: '10%', icon: TrendingUp, color: 'cyan', description: 'Fixed rate (unchanged)' },
      { label: 'Creator Earnings', value: '$500K - $1M', icon: DollarSign, color: 'purple', description: 'Full-time incomes' },
      { label: 'Contributor Payouts', value: '$100K - $250K', icon: Users, color: 'pink', description: 'Long-tail residual income' },
      { label: 'Covenant Distribution', value: '$50K - $100K', icon: Heart, color: 'green', description: 'Basic dignity for all members' },
    ],
  },
  {
    year: 'Year 6-10',
    phase: 'Mature Ecosystem',
    metrics: [
      { label: 'Platform Fee', value: '10%', icon: TrendingUp, color: 'cyan', description: 'Fixed rate (unchanged)' },
      { label: 'Creator Earnings', value: '$2M - $5M', icon: DollarSign, color: 'purple', description: '50+ full-time creators' },
      { label: 'Contributor Payouts', value: '$500K - $1M', icon: Users, color: 'pink', description: '500+ receiving forever' },
      { label: 'Covenant Distribution', value: '$250K - $500K', icon: Heart, color: 'green', description: 'Universal basic dignity' },
    ],
  },
];

export function ProjectionTable() {
  const [expandedYear, setExpandedYear] = useState<string | null>('Year 3-5');

  return (
    <div className="space-y-4">
      {projections.map((projection) => (
        <motion.div
          key={projection.year}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="border border-white/10 rounded-xl overflow-hidden"
        >
          <button
            onClick={() => setExpandedYear(expandedYear === projection.year ? null : projection.year)}
            className="w-full flex justify-between items-center p-6 bg-white/5 hover:bg-white/10 transition-colors"
          >
            <div className="text-left">
              <h3 className="text-xl font-bold text-star-dust">{projection.year}</h3>
              <p className="text-sm text-neurospark">{projection.phase}</p>
              <p className="text-xs text-star-dust/40 mt-1">Platform fee fixed at 10% across all phases</p>
            </div>
            <motion.div
              animate={{ rotate: expandedYear === projection.year ? 180 : 0 }}
              transition={{ duration: 0.3 }}
            >
              <ChevronDown className="text-star-dust/40" size={20} />
            </motion.div>
          </button>
          
          <AnimatePresence>
            {expandedYear === projection.year && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden"
              >
                <div className="p-6 pt-0 grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                  {projection.metrics.map((metric) => (
                    <div key={metric.label} className={`bg-${metric.color}-500/5 border border-${metric.color}-500/20 rounded-lg p-4 text-center`}>
                      <metric.icon className={`text-${metric.color}-400 mx-auto mb-2`} size={20} />
                      <div className={`text-2xl font-bold text-${metric.color}-400`}>{metric.value}</div>
                      <div className="text-star-dust/60 text-sm">{metric.label}</div>
                      <div className="text-star-dust/30 text-xs mt-1">{metric.description}</div>
                    </div>
                  ))}
                </div>
                <div className="px-6 pb-6">
                  <div className="bg-white/5 rounded-lg p-3 text-center">
                    <p className="text-xs text-star-dust/40">
                      ✦ All numbers represent value distributed, not extracted<br />
                      ✦ Platform fee: 10% (vs industry 30-50%)<br />
                      ✦ 90% of every sale stays in the ecosystem; 7% is all that leaves
                    </p>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      ))}
    </div>
  );
}