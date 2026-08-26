// src/components/asgard/domains/plutus/business/ResidualDistribution.tsx
'use client';

import { motion } from 'framer-motion';
import { Users, TrendingUp, Award, HandCoins } from 'lucide-react';

const recipients = [
  {
    icon: Award,
    label: "This Ware's Contributors",
    description:
      'Everyone on the ware’s roster — code, design, testing, ideas — with the main artisan one of them',
    color: 'cyan',
    source: 'What is left of the 90% after the residual pledge',
    distribution: 'Divided equally — no roles, no ranking, no percentages',
  },
  {
    icon: TrendingUp,
    label: 'Every Artisan on the Platform',
    description:
      'Any vessel who has ever appeared, even once, as an artisan or on a contributor roster. Once on the roster, never off',
    color: 'pink',
    source: 'Residual pool: 30% of every fee, plus each ware’s pledge (0-50% of its profit)',
    distribution: 'Equal shares at intervals, arriving whole',
  },
  {
    icon: Users,
    label: 'Every User Who Has Opted In',
    description:
      'The dignity floor. A user who opts in to be identified is included in every distribution from then on',
    color: 'green',
    source: 'Covenant pool: each vessel’s own 0-50% of their share of a sale',
    distribution: 'Equal shares at intervals, arriving whole',
  },
  {
    icon: HandCoins,
    label: 'The Machine',
    description: 'Hosting, development, support, payment costs',
    color: 'purple',
    source: '70% of the platform fee (7% of the sale)',
    distribution: 'The only money that ever leaves',
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
          ✦ The platform fee is fixed at <span className="text-neurospark">10%</span> (industry standard is 30-50%) — 70% of it funds the machine, 30% returns to the residual pool<br />
          ✦ A ware’s main artisan sets its <span className="text-purple-400">residual pledge</span> (0-50% of that ware’s profit, default 0)<br />
          ✦ Each vessel sets their own <span className="text-green-400">covenant pledge</span> (0-50% of their own share of a sale, default 0) in the Sanctum
        </p>
      </div>
    </div>
  );
}