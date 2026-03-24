// src/components/business/TransparencyLedger.tsx
'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Eye, ChevronDown, ExternalLink, CheckCircle } from 'lucide-react';
import Link from 'next/link';

const sampleTransactions = [
  {
    id: 1,
    date: '2026-03-20',
    product: 'AR Tracing Tool',
    amount: 47.00,
    creator: 'KP',
    toResidual: 14.10,
    toInfrastructure: 4.70,
    toCreator: 28.20,
    residualRecipients: 3,
  },
  {
    id: 2,
    date: '2026-03-19',
    product: 'Quantum Autistic Zine',
    amount: 7.00,
    creator: 'KP + Aethelred',
    toResidual: 2.10,
    toInfrastructure: 0.70,
    toCreator: 4.20,
    residualRecipients: 2,
  },
  {
    id: 3,
    date: '2026-03-18',
    product: 'Sovereign Sanctuary Blueprint',
    amount: 25.00,
    creator: 'The Council',
    toResidual: 7.50,
    toInfrastructure: 2.50,
    toCreator: 15.00,
    residualRecipients: 9,
  },
];

export function TransparencyLedger() {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="space-y-6">
      {/* Public Ledger Preview */}
      <div className="bg-white/5 border border-white/10 rounded-xl overflow-hidden">
        <div className="grid grid-cols-12 gap-2 p-4 border-b border-white/10 text-white/40 text-xs font-medium">
          <div className="col-span-2">Date</div>
          <div className="col-span-3">Product</div>
          <div className="col-span-2">Amount</div>
          <div className="col-span-2">To Creator</div>
          <div className="col-span-2">To Residual</div>
          <div className="col-span-1">Recipients</div>
        </div>
        
        {sampleTransactions.map((tx) => (
          <div key={tx.id} className="grid grid-cols-12 gap-2 p-4 border-b border-white/5 text-sm hover:bg-white/5 transition-colors">
            <div className="col-span-2 text-white/40">{tx.date}</div>
            <div className="col-span-3 text-white">{tx.product}</div>
            <div className="col-span-2 text-white/60">${tx.amount.toFixed(2)}</div>
            <div className="col-span-2 text-green-400">${tx.toCreator.toFixed(2)}</div>
            <div className="col-span-2 text-cyan-400">${tx.toResidual.toFixed(2)}</div>
            <div className="col-span-1 text-white/40">{tx.residualRecipients}</div>
          </div>
        ))}
        
        <div className="p-4 text-center">
          <Link href="/transparency" className="text-cyan-400 text-sm hover:underline flex items-center justify-center gap-1">
            <Eye size={14} />
            View Full Public Ledger
          </Link>
        </div>
      </div>
      
      {/* Admin Logs Preview */}
      <div className="bg-white/5 border border-white/10 rounded-xl p-4">
        <div className="flex items-center justify-between mb-4">
          <h4 className="text-white font-bold text-sm flex items-center gap-2">
            <CheckCircle size={14} className="text-green-400" />
            Recent Governance Actions
          </h4>
          <button 
            onClick={() => setExpanded(!expanded)}
            className="text-white/40 hover:text-white/60 text-xs flex items-center gap-1"
          >
            {expanded ? 'Show less' : 'Show more'}
            <ChevronDown size={12} className={`transition-transform ${expanded ? 'rotate-180' : ''}`} />
          </button>
        </div>
        
        <div className="space-y-3">
          <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-3">
            <p className="text-green-400 text-sm">✓ Verified creator: @tjdpoetry</p>
            <p className="text-white/40 text-xs mt-1">March 20, 2026 · Admin Log #142</p>
          </div>
          <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-3">
            <p className="text-green-400 text-sm">✓ Approved vendor application: Blackwing Textiles</p>
            <p className="text-white/40 text-xs mt-1">March 19, 2026 · Admin Log #141</p>
          </div>
          
          <AnimatePresence>
            {expanded && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="space-y-3 overflow-hidden"
              >
                <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-lg p-3">
                  <p className="text-yellow-400 text-sm">⚠️ Pending review: Creator application - Quantum Muse</p>
                  <p className="text-white/40 text-xs mt-1">March 18, 2026 · Admin Log #140</p>
                </div>
                <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-3">
                  <p className="text-green-400 text-sm">✓ Processed residual payout batch #3</p>
                  <p className="text-white/40 text-xs mt-1">March 17, 2026 · Admin Log #139</p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        
        <Link href="/transparency" className="block text-center text-cyan-400 text-sm hover:underline mt-4">
          View all governance actions →
        </Link>
      </div>
    </div>
  );
}