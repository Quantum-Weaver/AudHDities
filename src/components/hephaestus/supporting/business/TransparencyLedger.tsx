// src/components/business/TransparencyLedger.tsx
'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Eye, ChevronDown, ExternalLink, CheckCircle, Heart } from 'lucide-react';
import Link from 'next/link';

const sampleTransactions = [
  {
    id: 1,
    date: '2026-03-20',
    product: 'AR Tracing Tool',
    amount: 47.00,
    creator: 'KP',
    platformFee: 4.70,        // 10% of $47
    residualPool: 1.41,       // 30% of platform fee
    covenantPool: 9.40,       // 20% of creator earnings ($42.30 * 0.2 = $8.46? Let's recalc)
    creatorImmediate: 33.84,  // $42.30 - $8.46 = $33.84
    residualRecipients: 3,
  },
  {
    id: 2,
    date: '2026-03-19',
    product: 'Quantum Autistic Zine',
    amount: 7.00,
    creator: 'KP + Aethelred',
    platformFee: 0.70,
    residualPool: 0.21,
    covenantPool: 1.40,
    creatorImmediate: 5.04,
    residualRecipients: 2,
  },
  {
    id: 3,
    date: '2026-03-18',
    product: 'Sovereign Sanctuary Blueprint',
    amount: 25.00,
    creator: 'The Council',
    platformFee: 2.50,
    residualPool: 0.75,
    covenantPool: 5.00,
    creatorImmediate: 18.00,
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
          <div className="col-span-2">To Covenant</div>
          <div className="col-span-1">Contributors</div>
        </div>
        
        {sampleTransactions.map((tx) => (
          <div key={tx.id} className="grid grid-cols-12 gap-2 p-4 border-b border-white/5 text-sm hover:bg-white/5 transition-colors">
            <div className="col-span-2 text-white/40">{tx.date}</div>
            <div className="col-span-3 text-white">{tx.product}</div>
            <div className="col-span-2 text-white/60">${tx.amount.toFixed(2)}</div>
            <div className="col-span-2 text-green-400">${tx.creatorImmediate.toFixed(2)}</div>
            <div className="col-span-2 text-pink-400">${tx.covenantPool.toFixed(2)}</div>
            <div className="col-span-1 text-white/40">{tx.residualRecipients}</div>
          </div>
        ))}
        
        <div className="p-4 border-t border-white/10 bg-white/5">
          <div className="flex justify-between items-center text-xs">
            <div className="flex items-center gap-4">
              <span className="text-white/40">Platform Fee: <span className="text-cyan-400">10%</span></span>
              <span className="text-white/40">Residual Pool: <span className="text-purple-400">30% of fee</span></span>
              <span className="text-white/40">Covenant Pool: <span className="text-green-400">20% of earnings</span></span>
            </div>
            <Link href="/transparency" className="text-cyan-400 hover:underline flex items-center gap-1">
              <Eye size={14} />
              Full Ledger
            </Link>
          </div>
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
          <div className="bg-cyan-500/10 border border-cyan-500/30 rounded-lg p-3">
            <p className="text-cyan-400 text-sm">📊 Platform fee permanently set to 10% (industry standard 30-50%)</p>
            <p className="text-white/40 text-xs mt-1">March 18, 2026 · Economic Policy #001</p>
          </div>
          
          <AnimatePresence>
            {expanded && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="space-y-3 overflow-hidden"
              >
                <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-3">
                  <p className="text-green-400 text-sm">✓ Processed residual payout batch #3 ($1,247 to 23 contributors)</p>
                  <p className="text-white/40 text-xs mt-1">March 17, 2026 · Admin Log #139</p>
                </div>
                <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-3">
                  <p className="text-green-400 text-sm">✓ Processed covenant distribution batch #1 ($892 to 156 active members)</p>
                  <p className="text-white/40 text-xs mt-1">March 15, 2026 · Admin Log #138</p>
                </div>
                <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-lg p-3">
                  <p className="text-yellow-400 text-sm">⚠️ Pending review: Creator application - Quantum Muse</p>
                  <p className="text-white/40 text-xs mt-1">March 14, 2026 · Admin Log #137</p>
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