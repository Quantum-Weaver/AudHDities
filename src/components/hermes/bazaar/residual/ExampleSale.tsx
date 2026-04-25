'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Calculator, DollarSign, Users, Heart } from 'lucide-react';
import { Slider } from '@/components/ui/Slider';
import { Card } from '@/components/ui/Card';
import { CardHeader, CardContent, CardFooter } from '@/components/ui/cards';
import type { CardData } from '@/types/components/runes/card.types';

// ============================================================================
// CARD DATA
// ============================================================================

const exampleSaleData: CardData = {
  id: 'example-sale',
  type: 'stat',
  title: 'Interactive Example',
  description: 'Adjust the numbers to see how value flows',
  value: '$100',
};

// ============================================================================
// CONTRIBUTOR TYPE
// ============================================================================

interface Contributor {
  name: string;
  share: number;
}

// ============================================================================
// EXAMPLE SALE COMPONENT
// ============================================================================

export function ExampleSale() {
  const [price, setPrice] = useState(100);
  const [platformFeePercent] = useState(10);
  const [residualPercent, setResidualPercent] = useState(30);
  const [covenantPercent, setCovenantPercent] = useState(20);

  // Calculations
  const platformFee = (price * platformFeePercent) / 100;
  const creatorEarnings = price - platformFee;

  const residualPool = platformFee * (residualPercent / 100);
  const platformOperations = platformFee - residualPool;

  const covenantPool = creatorEarnings * (covenantPercent / 100);
  const creatorImmediate = creatorEarnings - covenantPool;

  const contributors: Contributor[] = [
    { name: 'Designer', share: 40 },
    { name: 'Developer', share: 35 },
    { name: 'Tester', share: 25 },
  ];

  return (
    <Card
      data={exampleSaleData}
      variant="interactive"
      radius="lg"
      shadow="md"
      className="p-8"
    >
      <CardHeader
        title="Interactive Example"
        subtitle="Adjust the numbers to see how value flows"
        badge={
          <div className="w-10 h-10 rounded-lg bg-[var(--color-cosmic-blue)]/20 flex items-center justify-center">
            <Calculator size={20} className="text-[var(--color-cosmic-blue)]" />
          </div>
        }
      />

      <CardContent>
        <div className="space-y-8">
          {/* Controls */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Slider
              label="Product Price"
              value={price}
              onChange={setPrice}
              min={10}
              max={500}
              step={10}
              showValue={true}
              formatValue={(v) => `$${v}`}
              variant="default"
            />

            <Slider
              label="Platform Fee"
              value={platformFeePercent}
              min={10}
              max={10}
              step={1}
              showValue={true}
              formatValue={(v) => `${v}%`}
              variant="default"
              disabled={true}
              helperText="Fixed at 10% (industry standard is 30-50%)"
            />

            <Slider
              label="Residual Pool (% of fee)"
              value={residualPercent}
              onChange={setResidualPercent}
              min={0}
              max={50}
              step={5}
              showValue={true}
              formatValue={(v) => `${v}%`}
              variant="fire"
              helperText="Shared with product contributors (creator sets per product)"
            />

            <Slider
              label="Covenant Pledge (% of earnings)"
              value={covenantPercent}
              onChange={setCovenantPercent}
              min={0}
              max={50}
              step={5}
              showValue={true}
              formatValue={(v) => `${v}%`}
              variant="default"
              helperText="Voluntary pledge to community dignity fund (creator sets in profile)"
            />
          </div>

          {/* Results Panel */}
          <motion.div
            key={`${price}-${platformFeePercent}-${residualPercent}-${covenantPercent}`}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-[var(--color-surface)]/5 border border-[var(--color-star-dust)]/10 rounded-2xl p-6"
          >
            <div className="grid md:grid-cols-2 gap-8">
              {/* Left Column — Platform Fee Flow */}
              <div className="space-y-4">
                <h4 className="text-white font-bold text-sm uppercase tracking-wider">
                  Platform Fee Flow
                </h4>
                <div className="flex justify-between items-center border-b border-[var(--color-star-dust)]/10 pb-2">
                  <span className="text-[var(--color-star-dust)]/60">Platform Fee (10%)</span>
                  <span className="text-[var(--color-cosmic-blue)] font-bold">
                    ${platformFee.toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between items-center pl-4">
                  <span className="text-[var(--color-star-dust)]/40 text-sm">→ Operations</span>
                  <span className="text-[var(--color-star-dust)]/40">
                    ${platformOperations.toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between items-center pl-4">
                  <span className="text-[var(--color-star-dust)]/40 text-sm">
                    → Residual Pool ({residualPercent}%)
                  </span>
                  <span className="text-[var(--color-fire-base)]">
                    ${residualPool.toFixed(2)}
                  </span>
                </div>
              </div>

              {/* Right Column — Creator Earnings Flow */}
              <div className="space-y-4">
                <h4 className="text-white font-bold text-sm uppercase tracking-wider">
                  Creator Earnings Flow
                </h4>
                <div className="flex justify-between items-center border-b border-[var(--color-star-dust)]/10 pb-2">
                  <span className="text-[var(--color-star-dust)]/60">Creator Earnings (90%)</span>
                  <span className="text-[var(--color-quantum-purple)] font-bold">
                    ${creatorEarnings.toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between items-center pl-4">
                  <span className="text-[var(--color-star-dust)]/40 text-sm">
                    → Immediate Payment
                  </span>
                  <span className="text-[var(--color-quantum-purple)]">
                    ${creatorImmediate.toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between items-center pl-4">
                  <span className="text-[var(--color-star-dust)]/40 text-sm">
                    → Covenant Pool ({covenantPercent}%)
                  </span>
                  <span className="text-[var(--color-sanctuary-green)]">
                    ${covenantPool.toFixed(2)}
                  </span>
                </div>
              </div>
            </div>

            {/* Contributor Distribution */}
            {residualPool > 0 && (
              <div className="mt-6 pt-4 border-t border-[var(--color-star-dust)]/10">
                <h4 className="text-white font-bold mb-3 text-sm uppercase tracking-wider">
                  Residual Pool Distribution
                </h4>
                <div className="grid md:grid-cols-3 gap-3">
                  {contributors.map((c) => (
                    <div
                      key={c.name}
                      className="bg-[var(--color-fire-base)]/5 border border-[var(--color-fire-base)]/20 rounded-lg p-3 text-center"
                    >
                      <div className="text-[var(--color-star-dust)]/60 text-sm">{c.name}</div>
                      <div className="text-[var(--color-fire-base)] font-bold">
                        ${((residualPool * c.share) / 100).toFixed(2)}
                      </div>
                      <div className="text-[var(--color-star-dust)]/40 text-xs">{c.share}% share</div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </motion.div>
        </div>
      </CardContent>

      <CardFooter
        actions={[
          <p
            key="disclaimer"
            className="text-center text-xs text-[var(--color-star-dust)]/30 w-full"
          >
            Platform fee is fixed at 10%. Creators set residual percentage (0-50% of fee) per
            product, and covenant pledge (0-50% of earnings) in their profile.
          </p>,
        ]}
      />
    </Card>
  );
}