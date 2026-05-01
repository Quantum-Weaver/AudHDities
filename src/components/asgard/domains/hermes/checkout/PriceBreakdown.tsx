// src/components/asgard/domains/hermes/checkout/PriceBreakdown.tsx
'use client';

import { Card } from '@/components/runes/Card';
import { Info } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/seidr/Tooltip';
import { formatPrice } from '@/lib/utils/components/runes/card.utils';

interface PriceBreakdownProps {
  subtotal: number;
  platformFeePercent?: number;
  showResidualPool?: boolean;
  residualPoolPercent?: number;
  showBigotTax?: boolean;
  bigotTaxAmount?: number;
}

export function PriceBreakdown({
  subtotal,
  platformFeePercent = 10,
  showResidualPool = true,
  residualPoolPercent = 50,
  showBigotTax = false,
  bigotTaxAmount = 0,
}: PriceBreakdownProps) {
  const platformFee = (subtotal * platformFeePercent) / 100;
  const residualPool = showResidualPool ? platformFee * (residualPoolPercent / 100) : 0;
  const infrastructure = platformFee - residualPool;
  const creatorEarnings = subtotal - platformFee;
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
                  <p className="text-sm">10% platform fee — the lowest in the industry. Covers operations and the residual pool.</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
          <span className="text-[var(--color-star-dust)]/60">{formatPrice(platformFee)}</span>
        </div>
        
        {/* Creator Earnings */}
        <div className="flex justify-between items-center pb-2 border-b border-[var(--color-star-dust)]/10">
          <span className="text-[var(--color-star-dust)]/60">Creator Earnings</span>
          <span className="text-[var(--color-sanctuary-green)] font-medium">{formatPrice(creatorEarnings)}</span>
        </div>
        
        {/* Residual Pool */}
        {showResidualPool && residualPool > 0 && (
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-1">
              <span className="text-[var(--color-star-dust)]/40 text-sm">→ Residual Pool ({residualPoolPercent}% of fee)</span>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger>
                    <Info size={12} className="text-[var(--color-star-dust)]/30" />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p className="text-sm">Shared with contributors forever — the "background actor dividend"</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
            <span className="text-[var(--color-quantum-purple)] text-sm">{formatPrice(residualPool)}</span>
          </div>
        )}
        
        {/* Infrastructure */}
        <div className="flex justify-between items-center">
          <span className="text-[var(--color-star-dust)]/40 text-sm">→ Infrastructure</span>
          <span className="text-[var(--color-neurospark)] text-sm">{formatPrice(infrastructure)}</span>
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
                    <p className="text-sm">Additional fee for corporate/non-aligned purchases. Funds community access.</p>
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
      
      {/* Note about residuals */}
      {showResidualPool && residualPoolPercent > 0 && (
        <p className="text-xs text-[var(--color-star-dust)]/30 text-center mt-4">
          * {residualPoolPercent}% of platform fees go to contributors who helped create this product — forever
        </p>
      )}
    </Card>
  );
}