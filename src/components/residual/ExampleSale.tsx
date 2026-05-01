// src/components/residual/ExampleSale.tsx
'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Calculator, DollarSign, Users, Heart } from 'lucide-react';
import { Slider } from '@/components/ui/Slider';

export function ExampleSale() {
  const [price, setPrice] = useState(100);
  const [platformFeePercent, setPlatformFeePercent] = useState(10); // UPDATED: 10% default
  const [residualPercent, setResidualPercent] = useState(30); // % of platform fee
  const [covenantPercent, setCovenantPercent] = useState(20); // NEW: % of creator earnings

  const platformFee = (price * platformFeePercent) / 100;
  const creatorEarnings = price - platformFee;
  
  // Residual Pool (from platform fee)
  const residualPool = platformFee * (residualPercent / 100);
  const platformOperations = platformFee - residualPool;
  
  // Covenant Pool (from creator earnings)
  const covenantPool = creatorEarnings * (covenantPercent / 100);
  const creatorImmediate = creatorEarnings - covenantPool;

  const contributors = [
    { name: 'Designer', share: 40, amount: (residualPool * 0.4).toFixed(2) },
    { name: 'Developer', share: 35, amount: (residualPool * 0.35).toFixed(2) },
    { name: 'Tester', share: 25, amount: (residualPool * 0.25).toFixed(2) },
  ];

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h3 className="text-2xl font-bold text-white mb-2">Interactive Example</h3>
        <p className="text-white/60">Adjust the numbers to see how value flows</p>
      </div>

      {/* Controls */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div>
          <Slider
            label="Product Price"
            value={price}
            onChange={setPrice}
            min={10}
            max={500}
            step={10}
            showValue={true}
            formatValue={(v) => `$${v}`}
            variant="primary"
          />
        </div>
        
        <div>
          <Slider
            label="Platform Fee"
            value={platformFeePercent}
            onChange={setPlatformFeePercent}
            min={10}
            max={10}  // FIXED at 10% - no slider needed, just display
            step={1}
            showValue={true}
            formatValue={(v) => `${v}%`}
            variant="default"
            disabled={true}
            helperText="Fixed at 10% (industry standard is 30-50%)"
          />
        </div>
        
        <div>
          <Slider
            label="Residual Pool (% of fee)"
            value={residualPercent}
            onChange={setResidualPercent}
            min={0}
            max={50}
            step={5}
            showValue={true}
            formatValue={(v) => `${v}%`}
            variant="purple"
            helperText="Shared with product contributors (creator sets per product)"
          />
        </div>
        
        <div>
          <Slider
            label="Covenant Pledge (% of earnings)"
            value={covenantPercent}
            onChange={setCovenantPercent}
            min={0}
            max={50}
            step={5}
            showValue={true}
            formatValue={(v) => `${v}%`}
            variant="primary"
            helperText="Voluntary pledge to community dignity fund (creator sets in profile)"
          />
        </div>
      </div>

      {/* Results */}
      <motion.div
        key={`${price}-${platformFeePercent}-${residualPercent}-${covenantPercent}`}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white/5 border border-white/10 rounded-2xl p-6"
      >
        <div className="grid md:grid-cols-2 gap-8">
          {/* Left Column - Fee Breakdown */}
          <div className="space-y-4">
            <h4 className="text-white font-bold">Platform Fee Flow</h4>
            <div className="flex justify-between items-center border-b border-white/10 pb-2">
              <span className="text-white/60">Platform Fee (10%)</span>
              <span className="text-cyan-400 font-bold">${platformFee.toFixed(2)}</span>
            </div>
            <div className="flex justify-between items-center pl-4">
              <span className="text-white/40 text-sm">→ Operations</span>
              <span className="text-white/40">${platformOperations.toFixed(2)}</span>
            </div>
            <div className="flex justify-between items-center pl-4">
              <span className="text-white/40 text-sm">→ Residual Pool ({residualPercent}%)</span>
              <span className="text-pink-400">${residualPool.toFixed(2)}</span>
            </div>
          </div>
          
          {/* Right Column - Creator Flow */}
          <div className="space-y-4">
            <h4 className="text-white font-bold">Creator Earnings Flow</h4>
            <div className="flex justify-between items-center border-b border-white/10 pb-2">
              <span className="text-white/60">Creator Earnings (90%)</span>
              <span className="text-purple-400 font-bold">${creatorEarnings.toFixed(2)}</span>
            </div>
            <div className="flex justify-between items-center pl-4">
              <span className="text-white/40 text-sm">→ Immediate Payment</span>
              <span className="text-purple-400">${creatorImmediate.toFixed(2)}</span>
            </div>
            <div className="flex justify-between items-center pl-4">
              <span className="text-white/40 text-sm">→ Covenant Pool ({covenantPercent}%)</span>
              <span className="text-green-400">${covenantPool.toFixed(2)}</span>
            </div>
          </div>
        </div>
        
        {/* Contributor Distribution */}
        {residualPool > 0 && (
          <div className="mt-6 pt-4 border-t border-white/10">
            <h4 className="text-white font-bold mb-3">Residual Pool Distribution</h4>
            <div className="grid md:grid-cols-3 gap-3">
              {contributors.map((c) => (
                <div key={c.name} className="bg-pink-500/5 border border-pink-500/20 rounded-lg p-3 text-center">
                  <div className="text-white/60 text-sm">{c.name}</div>
                  <div className="text-pink-400 font-bold">${c.amount}</div>
                  <div className="text-white/40 text-xs">{c.share}% share</div>
                </div>
              ))}
            </div>
          </div>
        )}
      </motion.div>
      
      <p className="text-center text-xs text-white/30">
        Platform fee is fixed at 10%. Creators set residual percentage (0-50% of fee) per product, and covenant pledge (0-50% of earnings) in their profile.
      </p>
    </div>
  );
}