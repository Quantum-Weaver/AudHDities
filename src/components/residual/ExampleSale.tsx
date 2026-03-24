// src/components/residual/ExampleSale.tsx
'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Calculator, DollarSign, Users } from 'lucide-react';
import { Slider } from '@/components/ui/Slider';

export function ExampleSale() {
  const [price, setPrice] = useState(100);
  const [platformFeePercent, setPlatformFeePercent] = useState(30);
  const [residualPercent, setResidualPercent] = useState(50);

  const platformFee = (price * platformFeePercent) / 100;
  const creatorPool = price - platformFee;
  const creatorImmediate = creatorPool * (1 - residualPercent / 100);
  const contributorPool = creatorPool * (residualPercent / 100);

  const contributors = [
    { name: 'Designer', share: 40, amount: (contributorPool * 0.4).toFixed(2) },
    { name: 'Developer', share: 35, amount: (contributorPool * 0.35).toFixed(2) },
    { name: 'Tester', share: 25, amount: (contributorPool * 0.25).toFixed(2) },
  ];

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h3 className="text-2xl font-bold text-white mb-2">Interactive Example</h3>
        <p className="text-white/60">Adjust the numbers to see how value flows</p>
      </div>

      {/* Controls */}
      <div className="grid md:grid-cols-3 gap-6">
        <div>
          <label className="block text-sm text-white/60 mb-2">Product Price</label>
          <div className="flex items-center gap-4">
            <DollarSign size={18} className="text-cyan-400" />
            <Slider
              value={price} 
              onChange={setPrice} 
              min={10}
              max={500}
              step={10}
              className="flex-1"
            />
            <span className="text-white font-mono w-16">${price}</span>
          </div>
        </div>
        
        <div>
          <label className="block text-sm text-white/60 mb-2">Platform Fee</label>
          <div className="flex items-center gap-4">
            <Calculator size={18} className="text-purple-400" />
            <Slider
              value={platformFeePercent}
              onChange={setPlatformFeePercent}
              min={10}
              max={50}
              step={5}
              className="flex-1"
            />
            <span className="text-white font-mono w-16">{platformFeePercent}%</span>
          </div>
        </div>
        
        <div>
          <label className="block text-sm text-white/60 mb-2">Residual Pool</label>
          <div className="flex items-center gap-4">
            <Users size={18} className="text-pink-400" />
            <Slider
              value={residualPercent}
              onChange={setResidualPercent}
              min={0}
              max={50}
              step={5}
              className="flex-1"
            />
            <span className="text-white font-mono w-16">{residualPercent}%</span>
          </div>
        </div>
      </div>

      {/* Results */}
      <motion.div
        key={`${price}-${platformFeePercent}-${residualPercent}`}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white/5 border border-white/10 rounded-2xl p-6"
      >
        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="flex justify-between items-center border-b border-white/10 pb-2">
              <span className="text-white/60">Platform Fee</span>
              <span className="text-cyan-400 font-bold">${platformFee.toFixed(2)}</span>
            </div>
            <div className="flex justify-between items-center border-b border-white/10 pb-2">
              <span className="text-white/60">Creator Immediate</span>
              <span className="text-purple-400 font-bold">${creatorImmediate.toFixed(2)}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-white/60">Contributor Pool</span>
              <span className="text-pink-400 font-bold">${contributorPool.toFixed(2)}</span>
            </div>
          </div>
          
          <div className="space-y-2">
            <div className="text-sm text-white/40 mb-2">Distributed to contributors:</div>
            {contributors.map((c) => (
              <div key={c.name} className="flex justify-between items-center">
                <span className="text-white/60 text-sm">{c.name} ({c.share}%)</span>
                <span className="text-white font-mono">${c.amount}</span>
              </div>
            ))}
          </div>
        </div>
      </motion.div>
      
      <p className="text-center text-xs text-white/30">
        Creators set their own residual percentage (0-50%). This example uses 50% of creator pool.
      </p>
    </div>
  );
}