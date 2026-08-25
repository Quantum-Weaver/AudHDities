// src/components/asgard/domains/hermes/checkout/PriceBreakdown.tsx
// Trued to the model 2026-08-24 (docs/architecture/residual-system.md):
// the fee splits fixed, 30% to the residual pool and 70% to the machine; the
// residual PLEDGE is a share of the ware's own 90% profit, never of the fee;
// what is left of that profit divides equally among the ware's contributors.
'use client';

import { Card } from '@/components/runes/Card';
import { Info } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/seidr/Tooltip';
import { formatPrice } from '@/lib/utils/components/runes/card.utils';

/** Of every platform fee, this share returns to the residual pool. Fixed, always. */
const FEE_TO_RESIDUAL_POOL_PERCENT = 30;

interface PriceBreakdownProps {
  subtotal: number;
  platformFeePercent?: number;
  showResidualPool?: boolean;
  /** This ware's own residual_pool_percent — a share of its profit, 0-50, default 0. */
  residualPoolPercent?: number;
  showBigotTax?: boolean;
  bigotTaxAmount?: number;
}

export function PriceBreakdown({
  subtotal,
  platformFeePercent = 10,
  showResidualPool = true,
  residualPoolPercent = 0,
  showBigotTax = false,
  bigotTaxAmount = 0,
}: PriceBreakdownProps) {
  const platformFee = (subtotal * platformFeePercent) / 100;
  const feeToResidualPool = (platformFee * FEE_TO_RESIDUAL_POOL_PERCENT) / 100;
  const feeToMachine = platformFee - feeToResidualPool;

  const artisanProfit = subtotal - platformFee;
  const pledged = showResidualPool ? (artisanProfit * residualPoolPercent) / 100 : 0;
  const toContributors = artisanProfit - pledged;

  const total = subtotal + (showBigotTax ? bigotTaxAmount : 0);

  return (
    <Card
      data={{ id: 'price-breakdown', title: 'Price Breakdown', type: 'product' }}
      variant="default"
      radius="lg"
      shadow="sm"
      padding="lg"
    >
      <h3 className="text-lg font-bold text-[var(--color-star-dust)] mb-4">Price Breakdown</h3>

      <div className="space-y-3">
        {/* Subtotal */}
        <div className="flex justify-between items-center">
          <span className="text-[var(--color-star-dust)]/60">Subtotal</span>
          <span className="text-[var(--color-star-dust)] font-medium">{formatPrice(subtotal)}</span>
        </div>

        {/* Platform Fee */}
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-1">
            <span className="text-[var(--color-star-dust)]/60">Platform Fee ({platformFeePercent}%)</span>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger>
                  <Info size={14} className="text-[var(--color-star-dust)]/30" />
                </TooltipTrigger>
                <TooltipContent>
                  <p className="text-sm">
                    {platformFeePercent}% platform fee. 70% of it funds the machine — the only money
                    that leaves; 30% of it returns to the residual pool on every sale.
                  </p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
          <span className="text-[var(--color-star-dust)]/60">{formatPrice(platformFee)}</span>
        </div>

        {/* The fee's own split — fixed, no dial */}
        <div className="flex justify-between items-center">
          <span className="text-[var(--color-star-dust)]/40 text-sm">
            → Residual pool ({FEE_TO_RESIDUAL_POOL_PERCENT}% of the fee)
          </span>
          <span className="text-[var(--color-quantum-purple)] text-sm">{formatPrice(feeToResidualPool)}</span>
        </div>
        <div className="flex justify-between items-center pb-2 border-b border-[var(--color-star-dust)]/10">
          <span className="text-[var(--color-star-dust)]/40 text-sm">
            → The machine ({100 - FEE_TO_RESIDUAL_POOL_PERCENT}% of the fee)
          </span>
          <span className="text-[var(--color-neurospark)] text-sm">{formatPrice(feeToMachine)}</span>
        </div>

        {/* The ware's profit */}
        <div className="flex justify-between items-center">
          <span className="text-[var(--color-star-dust)]/60">Artisan Profit</span>
          <span className="text-[var(--color-sanctuary-green)] font-medium">{formatPrice(artisanProfit)}</span>
        </div>

        {/* The residual pledge, out of that profit */}
        {showResidualPool && pledged > 0 && (
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-1">
              <span className="text-[var(--color-star-dust)]/40 text-sm">
                → Pledged to the residual pool ({residualPoolPercent}%)
              </span>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger>
                    <Info size={12} className="text-[var(--color-star-dust)]/30" />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p className="text-sm">
                      The residual pool is platform-wide: it pays every artisan on the platform in
                      equal shares, not only the people who made this ware. Those contributors are
                      paid from the line below.
                    </p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
            <span className="text-[var(--color-quantum-purple)] text-sm">{formatPrice(pledged)}</span>
          </div>
        )}

        {/* What is left, divided equally */}
        <div className="flex justify-between items-center">
          <span className="text-[var(--color-star-dust)]/40 text-sm">
            → This ware&apos;s contributors, equally
          </span>
          <span className="text-[var(--color-sanctuary-green)] text-sm">{formatPrice(toContributors)}</span>
        </div>

        {/* Bigot Tax */}
        {showBigotTax && bigotTaxAmount > 0 && (
          <div className="flex justify-between items-center pt-2 border-t border-[var(--color-star-dust)]/10">
            <div className="flex items-center gap-1">
              <span className="text-[var(--color-star-dust)]/60">Bigot Tax</span>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger>
                    <Info size={14} className="text-[var(--color-star-dust)]/30" />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p className="text-sm">Additional fee for corporate/non-aligned exchanges. Funds community access.</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
            <span className="text-[var(--color-fire-base)]">{formatPrice(bigotTaxAmount)}</span>
          </div>
        )}

        {/* Total */}
        <div className="flex justify-between items-center pt-3 border-t border-[var(--color-star-dust)]/20">
          <span className="text-[var(--color-star-dust)] font-bold">Total</span>
          <span className="text-xl font-bold text-[var(--color-star-dust)]">{formatPrice(total)}</span>
        </div>
      </div>

      {/* Note about the pledge */}
      <p className="text-xs text-[var(--color-star-dust)]/30 text-center mt-4">
        {showResidualPool && residualPoolPercent > 0
          ? `* ${residualPoolPercent}% of this ware's profit is pledged to the residual pool, which pays every artisan on the platform. What is left divides equally among this ware's contributors.`
          : "* This ware's profit divides equally among its contributors. The residual pool still receives 30% of the fee, as it does on every sale."}
      </p>
    </Card>
  );
}
