// src/components/asgard/domains/plutus/residual/ExampleSale.tsx
'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Calculator } from 'lucide-react';
import { Slider } from '@/components/forging/Slider';
import { Card } from '@/components/runes/Card';
import { CardHeader, CardContent, CardFooter } from '@/components/runes/cards';
import type { CardData } from '@/types/components/runes/card.types';

// ============================================================================
// CARD DATA
// ============================================================================

const exampleSaleData: CardData = {
  id: 'example-sale',
  type: 'stat',
  title: 'Interactive Example',
  description: 'Move the dials and watch where a sale actually goes',
  value: '$100',
};

// ============================================================================
// CONSTANTS
// ============================================================================

/** Fixed for every sale. Of this fee, 30% returns to the residual pool and
 *  70% funds the machine — see docs/architecture/residual-system.md. */
const PLATFORM_FEE_PERCENT = 10;
const FEE_TO_RESIDUAL_POOL_PERCENT = 30;

/** The ware in this example has three contributors; the main artisan is one
 *  of them, and all three take the same share. */
const CONTRIBUTORS = ['Designer', 'Developer', 'Tester'] as const;

// ============================================================================
// EXAMPLE SALE COMPONENT
// ============================================================================

export function ExampleSale() {
  const [price, setPrice] = useState(100);
  const [residualPercent, setResidualPercent] = useState(0);
  const [covenantPercent, setCovenantPercent] = useState(0);

  // Worked in whole cents, so the columns add up exactly.
  const priceCents = Math.round(price * 100);
  const feeCents = Math.round((priceCents * PLATFORM_FEE_PERCENT) / 100);
  const feeToPoolCents = Math.round((feeCents * FEE_TO_RESIDUAL_POOL_PERCENT) / 100);
  const feeToMachineCents = feeCents - feeToPoolCents;

  const profitCents = priceCents - feeCents;
  const pledgedCents = Math.round((profitCents * residualPercent) / 100);
  const contributorsCents = profitCents - pledgedCents;

  const shareCents = Math.floor(contributorsCents / CONTRIBUTORS.length);
  const oddCents = contributorsCents - shareCents * CONTRIBUTORS.length;

  const covenantPerShareCents = Math.round((shareCents * covenantPercent) / 100);
  const keptPerShareCents = shareCents - covenantPerShareCents;

  const residualPoolCents = feeToPoolCents + pledgedCents;
  const covenantPoolCents = covenantPerShareCents * CONTRIBUTORS.length;

  const money = (cents: number) => `$${(cents / 100).toFixed(2)}`;

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
        subtitle="Move the dials and watch where a sale actually goes"
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
              value={PLATFORM_FEE_PERCENT}
              min={10}
              max={10}
              step={1}
              showValue={true}
              formatValue={(v) => `${v}%`}
              variant="default"
              disabled={true}
              helperText="Fixed at 10% (industry standard is 30-50%). 70% of it funds the machine; 30% returns to the residual pool."
            />

            <Slider
              label="Residual Pledge (% of this ware's profit)"
              value={residualPercent}
              onChange={setResidualPercent}
              min={0}
              max={50}
              step={5}
              showValue={true}
              formatValue={(v) => `${v}%`}
              variant="fire"
              helperText="Set per ware by its main artisan, default 0 — pledged out of the 90%, never out of the fee"
            />

            <Slider
              label="Covenant Pledge (% of your own share)"
              value={covenantPercent}
              onChange={setCovenantPercent}
              min={0}
              max={50}
              step={5}
              showValue={true}
              formatValue={(v) => `${v}%`}
              variant="default"
              helperText="Set once in the Sanctum, default 0 — a slice of your own share of a sale, never of a pool payout"
            />
          </div>

          {/* Results Panel */}
          <motion.div
            key={`${price}-${residualPercent}-${covenantPercent}`}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-[var(--color-surface)]/5 border border-[var(--color-star-dust)]/10 rounded-2xl p-6"
          >
            <div className="grid md:grid-cols-2 gap-8">
              {/* Left Column — The Fee, split fixed */}
              <div className="space-y-4">
                <h4 className="text-star-dust font-bold text-sm uppercase tracking-wider">
                  The Fee, Split Fixed
                </h4>
                <div className="flex justify-between items-center border-b border-[var(--color-star-dust)]/10 pb-2">
                  <span className="text-[var(--color-star-dust)]/60">Platform Fee (10%)</span>
                  <span className="text-[var(--color-cosmic-blue)] font-bold">
                    {money(feeCents)}
                  </span>
                </div>
                <div className="flex justify-between items-center pl-4">
                  <span className="text-[var(--color-star-dust)]/40 text-sm">
                    → The machine (70% of the fee)
                  </span>
                  <span className="text-[var(--color-star-dust)]/40">
                    {money(feeToMachineCents)}
                  </span>
                </div>
                <div className="flex justify-between items-center pl-4">
                  <span className="text-[var(--color-star-dust)]/40 text-sm">
                    → Residual pool (30% of the fee, always)
                  </span>
                  <span className="text-[var(--color-fire-base)]">
                    {money(feeToPoolCents)}
                  </span>
                </div>
              </div>

              {/* Right Column — The ware's profit, split by the pledge */}
              <div className="space-y-4">
                <h4 className="text-star-dust font-bold text-sm uppercase tracking-wider">
                  The Ware&apos;s Profit
                </h4>
                <div className="flex justify-between items-center border-b border-[var(--color-star-dust)]/10 pb-2">
                  <span className="text-[var(--color-star-dust)]/60">Artisan Profit (90%)</span>
                  <span className="text-[var(--color-quantum-purple)] font-bold">
                    {money(profitCents)}
                  </span>
                </div>
                <div className="flex justify-between items-center pl-4">
                  <span className="text-[var(--color-star-dust)]/40 text-sm">
                    → Pledged to the residual pool ({residualPercent}%)
                  </span>
                  <span className="text-[var(--color-fire-base)]">
                    {money(pledgedCents)}
                  </span>
                </div>
                <div className="flex justify-between items-center pl-4">
                  <span className="text-[var(--color-star-dust)]/40 text-sm">
                    → Left for this ware&apos;s contributors
                  </span>
                  <span className="text-[var(--color-quantum-purple)]">
                    {money(contributorsCents)}
                  </span>
                </div>
              </div>
            </div>

            {/* Contributor Distribution — equal, always */}
            <div className="mt-6 pt-4 border-t border-[var(--color-star-dust)]/10">
              <h4 className="text-star-dust font-bold mb-1 text-sm uppercase tracking-wider">
                Divided Equally Among the Contributors
              </h4>
              <p className="text-[var(--color-star-dust)]/40 text-xs mb-3">
                Three contributors, the main artisan one of them. The role changes nothing.
              </p>
              <div className="grid md:grid-cols-3 gap-3">
                {CONTRIBUTORS.map((name) => (
                  <div
                    key={name}
                    className="bg-[var(--color-quantum-purple)]/5 border border-[var(--color-quantum-purple)]/20 rounded-lg p-3 text-center"
                  >
                    <div className="text-[var(--color-star-dust)]/60 text-sm">{name}</div>
                    <div className="text-[var(--color-quantum-purple)] font-bold">
                      {money(shareCents)}
                    </div>
                    <div className="text-[var(--color-star-dust)]/40 text-xs">
                      {covenantPercent > 0
                        ? `keeps ${money(keptPerShareCents)} · ${money(covenantPerShareCents)} on to the covenant pool`
                        : 'an equal third, kept whole'}
                    </div>
                  </div>
                ))}
              </div>
              {oddCents > 0 && (
                <p className="text-[var(--color-star-dust)]/50 text-xs mt-3 text-center">
                  {money(contributorsCents)} does not divide evenly by three:{' '}
                  {oddCents === 1 ? 'one cent' : `${oddCents} cents`} is left over. Where the odd
                  cent goes is a build question, and it is asked rather than quietly rounded.
                </p>
              )}
            </div>

            {/* Where this one sale ends up */}
            <div className="mt-6 pt-4 border-t border-[var(--color-star-dust)]/10 grid md:grid-cols-3 gap-3 text-center">
              <div>
                <div className="text-[var(--color-fire-base)] font-bold">
                  {money(residualPoolCents)}
                </div>
                <div className="text-[var(--color-star-dust)]/40 text-xs">
                  into the residual pool — every artisan on the platform, equally
                </div>
              </div>
              <div>
                <div className="text-[var(--color-sanctuary-green)] font-bold">
                  {money(covenantPoolCents)}
                </div>
                <div className="text-[var(--color-star-dust)]/40 text-xs">
                  into the covenant pool — every opted-in user, equally
                </div>
              </div>
              <div>
                <div className="text-[var(--color-cosmic-blue)] font-bold">
                  {money(feeToMachineCents)}
                </div>
                <div className="text-[var(--color-star-dust)]/40 text-xs">
                  the only money that leaves
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </CardContent>

      <CardFooter
        actions={[
          <p
            key="disclaimer"
            className="text-center text-xs text-[var(--color-star-dust)]/30 w-full"
          >
            The platform fee is fixed at 10%, and 30% of it returns to the residual pool on every
            sale. A ware&apos;s main artisan sets its residual pledge (0-50% of that ware&apos;s
            profit, default 0); each vessel sets their own covenant pledge (0-50% of their own
            share of a sale, default 0) in the Sanctum. Both pools pay at intervals, and both
            arrive whole.
          </p>,
        ]}
      />
    </Card>
  );
}
