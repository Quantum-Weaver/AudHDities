// src/components/asgard/domains/hermes/checkout/PriceBreakdown.tsx
'use client';

import { Card } from '@/components/runes/Card';
import { Info } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/seidr/Tooltip';
import {
  computeSplitTotals,
  formatMinorUnits,
  FEE_TO_RESIDUAL_POOL_PERCENT,
} from '@/lib/economics/split';

interface PriceBreakdownProps {
  subtotal: number;
  platformFeePercent?: number;
  showResidualPool?: boolean;
  /** This ware's own residual_pool_percent — a share of its profit, 0-50, default 0. */
  residualPoolPercent?: number;
}

export function PriceBreakdown({
  subtotal,
  platformFeePercent = 10,
  showResidualPool = true,
  residualPoolPercent = 0,
}: PriceBreakdownProps) {
  const pledgePercent = showResidualPool ? residualPoolPercent : 0;
  const totals = computeSplitTotals(
    Math.round(subtotal * 100),
    platformFeePercent,
    pledgePercent,
  );

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
          <span className="text-[var(--color-star-dust)] font-medium">
            {formatMinorUnits(totals.grossMinorUnits)}
          </span>
        </div>

        {/* Platform Fee */}
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-1">
            <span className="text-[var(--color-star-dust)]/60">Platform Fee ({platformFeePercent}%)</span>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger>
                  <Info size={14} className="text-[var(--color-star-dust)]/30" aria-hidden="true" />
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
          <span className="text-[var(--color-star-dust)]/60">
            {formatMinorUnits(totals.platformFeeMinorUnits)}
          </span>
        </div>

        {/* The fee's own split — fixed, no dial */}
        <div className="flex justify-between items-center">
          <span className="text-[var(--color-star-dust)]/40 text-sm">
            → Residual pool ({FEE_TO_RESIDUAL_POOL_PERCENT}% of the fee)
          </span>
          <span className="text-[var(--color-quantum-purple)] text-sm">
            {formatMinorUnits(totals.feeToResidualPoolMinorUnits)}
          </span>
        </div>
        <div className="flex justify-between items-center pb-2 border-b border-[var(--color-star-dust)]/10">
          <span className="text-[var(--color-star-dust)]/40 text-sm">
            → The machine ({100 - FEE_TO_RESIDUAL_POOL_PERCENT}% of the fee)
          </span>
          <span className="text-[var(--color-neurospark)] text-sm">
            {formatMinorUnits(totals.feeToMachineMinorUnits)}
          </span>
        </div>

        {/* The ware's profit */}
        <div className="flex justify-between items-center">
          <span className="text-[var(--color-star-dust)]/60">Artisan Profit</span>
          <span className="text-[var(--color-sanctuary-green)] font-medium">
            {formatMinorUnits(totals.artisanProfitMinorUnits)}
          </span>
        </div>

        {/* The residual pledge, out of that profit */}
        {totals.pledgedMinorUnits > 0 && (
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-1">
              <span className="text-[var(--color-star-dust)]/40 text-sm">
                → Pledged to the residual pool ({pledgePercent}%)
              </span>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger>
                    <Info size={12} className="text-[var(--color-star-dust)]/30" aria-hidden="true" />
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
            <span className="text-[var(--color-quantum-purple)] text-sm">
              {formatMinorUnits(totals.pledgedMinorUnits)}
            </span>
          </div>
        )}

        {/* What is left, divided equally */}
        <div className="flex justify-between items-center">
          <span className="text-[var(--color-star-dust)]/40 text-sm">
            → This ware&apos;s contributors, equally
          </span>
          <span className="text-[var(--color-sanctuary-green)] text-sm">
            {formatMinorUnits(totals.toContributorsMinorUnits)}
          </span>
        </div>

        {/* Total */}
        <div className="flex justify-between items-center pt-3 border-t border-[var(--color-star-dust)]/20">
          <span className="text-[var(--color-star-dust)] font-bold">Total</span>
          <span className="text-xl font-bold text-[var(--color-star-dust)]">
            {formatMinorUnits(totals.grossMinorUnits)}
          </span>
        </div>
      </div>

      {/* Note about the pledge */}
      <p className="text-xs text-[var(--color-star-dust)]/30 text-center mt-4">
        {totals.pledgedMinorUnits > 0
          ? `* ${pledgePercent}% of this ware's profit is pledged to the residual pool, which pays every artisan on the platform. What is left divides equally among this ware's contributors.`
          : "* This ware's profit divides equally among its contributors. The residual pool still receives 30% of the fee, as it does on every sale."}
      </p>
    </Card>
  );
}
