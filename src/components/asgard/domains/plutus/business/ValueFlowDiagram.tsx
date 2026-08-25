// src/components/asgard/domains/plutus/business/ValueFlowDiagram.tsx
'use client';

import { motion } from 'framer-motion';
import { DollarSign, Users, Palette, Heart, TrendingUp, Share2 } from 'lucide-react';

const streams = [
  {
    title: 'Advertising Stream',
    icon: DollarSign,
    color: 'cyan',
    description: 'Vetted, values-aligned advertisers',
    flow: [
      { label: 'Ad Revenue', to: 'Covers Operations', color: 'cyan' },
      { label: 'Remaining', to: 'Distributed Equally', color: 'purple' },
      { label: 'Recipients', to: 'All Opt-in Users', color: 'pink' },
    ],
  },
  {
    title: 'Sales Stream',
    icon: Palette,
    color: 'purple',
    description: 'Creator products and services',
    flow: [
      { label: 'Artisan Profit', to: '90% → the pledge, then equal shares', color: 'purple' },
      { label: 'Platform Fee', to: '10% → 70% machine, 30% residual pool', color: 'cyan' },
      { label: 'Residual Pledge', to: '0-50% of the profit → residual pool', color: 'pink' },
      { label: 'Covenant Pledge', to: '0-50% of your own share → covenant pool', color: 'green' },
    ],
  },
];

// A fourth recipient, "Mutual Aid — emergency support," stood here until 2026-08-24.
// No such fund exists; the four below are all of them.
const residualRecipients = [
  { icon: Users, label: "This Ware's Contributors", description: 'What is left of the 90% after the pledge, divided equally', color: 'cyan' },
  { icon: Share2, label: 'Every Artisan', description: 'The residual pool, in equal shares — one contribution ever is enough', color: 'pink' },
  { icon: Heart, label: 'Every Opted-In User', description: 'The covenant pool, in equal shares — the dignity floor', color: 'green' },
  { icon: TrendingUp, label: 'The Machine', description: '70% of the fee — 7% of the sale, and the only money that leaves', color: 'purple' },
];

export function ValueFlowDiagram() {
  return (
    <div className="space-y-16">
      {/* Two Streams */}
      <div className="grid lg:grid-cols-2 gap-8">
        {streams.map((stream, idx) => (
          <motion.div
            key={stream.title}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.2 }}
            viewport={{ once: true }}
            className={`bg-gradient-to-br from-${stream.color}-500/10 to-transparent border border-${stream.color}-500/20 rounded-2xl p-6`}
          >
            <div className="flex items-center gap-3 mb-4">
              <div className={`w-12 h-12 rounded-xl bg-${stream.color}-500/20 flex items-center justify-center`}>
                <stream.icon className={`text-${stream.color}-400`} size={24} />
              </div>
              <h3 className="text-xl font-bold text-star-dust">{stream.title}</h3>
            </div>
            <p className="text-star-dust/60 mb-6">{stream.description}</p>
            
            <div className="space-y-4">
              {stream.flow.map((step, i) => (
                <div key={step.label} className="relative">
                  <div className={`bg-${step.color}-500/10 border border-${step.color}-500/30 rounded-xl p-4`}>
                    <div className="flex justify-between items-center">
                      <span className="text-star-dust font-medium">{step.label}</span>
                      <span className={`text-${step.color}-400 text-sm`}>→</span>
                      <span className={`text-${step.color}-400`}>{step.to}</span>
                    </div>
                  </div>
                  {i < stream.flow.length - 1 && (
                    <div className="flex justify-center my-2">
                      <div className="w-0.5 h-4 bg-white/20" />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
      
      {/* Merge Point */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        className="text-center py-8"
      >
        <div className="inline-flex items-center gap-2 px-6 py-2 bg-white/5 rounded-full">
          <Share2 size={16} className="text-pink-400" />
          <span className="text-star-dust/60 text-sm">Value Flows Into Circulation</span>
        </div>
      </motion.div>
      
      {/* Distribution Recipients */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="bg-gradient-to-br from-pink-500/20 to-purple-500/20 border border-pink-500/30 rounded-2xl p-8 text-center"
      >
        <h3 className="text-2xl font-bold text-star-dust mb-2">The Circulation Engine</h3>
        <p className="text-star-dust/60 max-w-2xl mx-auto mb-8">
          Every sale creates multiple streams of value that flow to everyone who helped build the sanctuary.
        </p>
        
        <div className="grid md:grid-cols-4 gap-6">
          {residualRecipients.map((recipient) => (
            <div key={recipient.label} className={`bg-${recipient.color}-500/10 rounded-xl p-4 text-center`}>
              <div className={`w-12 h-12 rounded-full bg-${recipient.color}-500/20 flex items-center justify-center mx-auto mb-3`}>
                <recipient.icon className={`text-${recipient.color}-400`} size={20} />
              </div>
              <h4 className="text-star-dust font-bold mb-1">{recipient.label}</h4>
              <p className="text-xs text-star-dust/40">{recipient.description}</p>
            </div>
          ))}
        </div>
        
        <div className="mt-8 pt-4 border-t border-white/10">
          <p className="text-sm text-star-dust/40">
            ✦ Platform fee is fixed at 10% (industry standard is 30-50%) — 70% funds the machine, 30% returns to the residual pool<br />
            ✦ A ware’s main artisan sets its residual pledge (0-50% of that ware’s profit, default 0)<br />
            ✦ Each vessel sets their own covenant pledge (0-50% of their own share of a sale, default 0) in the Sanctum
          </p>
        </div>
      </motion.div>
    </div>
  );
}