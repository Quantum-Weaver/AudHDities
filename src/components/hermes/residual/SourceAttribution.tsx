// src/components/residual/SourceAttribution.tsx
'use client';

import { motion } from 'framer-motion';
import { Database, Code, FileText } from 'lucide-react';

const sources = [
  { name: 'products.residual_pool_percent', icon: Database, color: 'cyan', description: 'Sets the percentage of platform fees that flow to contributors' },
  { name: 'contributions table', icon: Database, color: 'purple', description: 'Stores who contributed what and their share percentage' },
  { name: 'residual_payouts table', icon: Database, color: 'pink', description: 'Records every residual payment to every contributor' },
  { name: 'Database Triggers', icon: Code, color: 'green', description: 'Automatically calculate and create payouts on every sale' },
  { name: 'Public Ledger View', icon: FileText, color: 'orange', description: 'Viewable by anyone for full transparency' },
];

export function SourceAttribution() {
  return (
    <div className="space-y-4">
      {sources.map((source, idx) => (
        <motion.div
          key={source.name}
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ delay: idx * 0.1 }}
          viewport={{ once: true }}
          className={`flex items-center gap-4 p-4 bg-${source.color}-500/5 border border-${source.color}-500/20 rounded-lg`}
        >
          <div className={`w-10 h-10 rounded-lg bg-${source.color}-500/20 flex items-center justify-center`}>
            <source.icon className={`text-${source.color}-400`} size={18} />
          </div>
          <div>
            <div className="text-white font-mono text-sm">{source.name}</div>
            <div className="text-xs text-white/40">{source.description}</div>
          </div>
        </motion.div>
      ))}
    </div>
  );
}