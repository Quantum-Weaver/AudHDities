// src/components/business/ValueFlowDiagram.tsx
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
      { label: 'Creator', to: 'Immediate Payment', color: 'purple' },
      { label: 'Platform Fee', to: 'Operations', color: 'cyan' },
      { label: 'Residual Pool', to: 'Distributed Forever', color: 'pink' },
    ],
  },
];

const residualRecipients = [
  { icon: Users, label: 'Contributors', description: 'Paid forever for past work', color: 'cyan' },
  { icon: Heart, label: 'Community Members', description: 'Dignity share regardless of activity', color: 'pink' },
  { icon: TrendingUp, label: 'Platform Fund', description: 'Future development & reserves', color: 'purple' },
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
              <h3 className="text-xl font-bold text-white">{stream.title}</h3>
            </div>
            <p className="text-white/60 mb-6">{stream.description}</p>
            
            <div className="space-y-4">
              {stream.flow.map((step, i) => (
                <div key={step.label} className="relative">
                  <div className={`bg-${step.color}-500/10 border border-${step.color}-500/30 rounded-xl p-4`}>
                    <div className="flex justify-between items-center">
                      <span className="text-white font-medium">{step.label}</span>
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
          <span className="text-white/60 text-sm">Value Merges Into</span>
        </div>
      </motion.div>
      
      {/* Residual Pool */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="bg-gradient-to-br from-pink-500/20 to-purple-500/20 border border-pink-500/30 rounded-2xl p-8 text-center"
      >
        <h3 className="text-2xl font-bold text-white mb-2">The Residual Pool</h3>
        <p className="text-white/60 max-w-2xl mx-auto mb-8">
          Where value becomes circulation. Every sale contributes to a pool
          that flows forever to everyone who helped create it.
        </p>
        
        <div className="grid md:grid-cols-3 gap-6">
          {residualRecipients.map((recipient) => (
            <div key={recipient.label} className={`bg-${recipient.color}-500/10 rounded-xl p-4 text-center`}>
              <div className={`w-12 h-12 rounded-full bg-${recipient.color}-500/20 flex items-center justify-center mx-auto mb-3`}>
                <recipient.icon className={`text-${recipient.color}-400`} size={20} />
              </div>
              <h4 className="text-white font-bold mb-1">{recipient.label}</h4>
              <p className="text-xs text-white/40">{recipient.description}</p>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}