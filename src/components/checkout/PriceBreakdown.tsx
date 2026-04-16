// src/components/checkout/PriceBreakdown.tsx
'use client';

import { Card } from '@/components/ui/Card';
import { Info } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/Tooltip';
import { formatPrice } from '@/lib/stripe/formatting';

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
  platformFeePercent = 10,  // Updated from 30% to 10%
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
    <Card className="p-6 space-y-4">
      <h3 className="text-lg font-bold text-white">Price Breakdown</h3>
      
      <div className="space-y-3">
        {/* Subtotal */}
        <div className="flex justify-between items-center">
          <span className="text-white/60">Subtotal</span>
          <span className="text-white font-medium">{formatPrice(subtotal)}</span>
        </div>
        
        {/* Platform Fee */}
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-1">
            <span className="text-white/60">Platform Fee ({platformFeePercent}%)</span>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger>
                  <Info size={14} className="text-white/30" />
                </TooltipTrigger>
                <TooltipContent>
                  <p className="text-sm">10% platform fee — the lowest in the industry. Covers operations and the residual pool.</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
          <span className="text-white/60">{formatPrice(platformFee)}</span>
        </div>
        
        {/* Creator Earnings */}
        <div className="flex justify-between items-center pb-2 border-b border-white/10">
          <span className="text-white/60">Creator Earnings</span>
          <span className="text-green-400 font-medium">{formatPrice(creatorEarnings)}</span>
        </div>
        
        {/* Residual Pool */}
        {showResidualPool && residualPool > 0 && (
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-1">
              <span className="text-white/40 text-sm">→ Residual Pool ({residualPoolPercent}% of fee)</span>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger>
                    <Info size={12} className="text-white/30" />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p className="text-sm">Shared with contributors forever — the "background actor dividend"</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
            <span className="text-purple-400 text-sm">{formatPrice(residualPool)}</span>
          </div>
        )}
        
        {/* Infrastructure */}
        <div className="flex justify-between items-center">
          <span className="text-white/40 text-sm">→ Infrastructure</span>
          <span className="text-cyan-400 text-sm">{formatPrice(infrastructure)}</span>
        </div>
        
        {/* Bigot Tax */}
        {showBigotTax && bigotTaxAmount > 0 && (
          <div className="flex justify-between items-center pt-2 border-t border-white/10">
            <div className="flex items-center gap-1">
              <span className="text-white/60">Bigot Tax</span>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger>
                    <Info size={14} className="text-white/30" />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p className="text-sm">Additional fee for corporate/non-aligned purchases. Funds community access.</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
            <span className="text-yellow-400">{formatPrice(bigotTaxAmount)}</span>
          </div>
        )}
        
        {/* Total */}
        <div className="flex justify-between items-center pt-3 border-t border-white/20">
          <span className="text-white font-bold">Total</span>
          <span className="text-xl font-bold text-white">{formatPrice(total)}</span>
        </div>
      </div>
      
      {/* Note about residuals */}
      {showResidualPool && residualPoolPercent > 0 && (
        <p className="text-xs text-white/30 text-center mt-4">
          * {residualPoolPercent}% of platform fees go to contributors who helped create this product — forever
        </p>
      )}
    </Card>
  );
}