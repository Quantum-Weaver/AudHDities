// @/components/hermes/PriceTiers.tsx
// Community/Ally/Corporate price display

"use client";

import { cn } from "@/lib/utils";
import { Card } from "@/components/shared/Card";

export interface PriceTiersProps {
  communityPrice: number | null;
  allyPrice: number | null;
  corporatePrice: number | null;
  selectedTier?: "community" | "ally" | "corporate";
  onSelectTier?: (tier: "community" | "ally" | "corporate") => void;
  className?: string;
}

export function PriceTiers({
  communityPrice,
  allyPrice,
  corporatePrice,
  selectedTier,
  onSelectTier,
  className,
}: PriceTiersProps) {
  const tiers = [
    {
      id: "community" as const,
      label: "Community Tier",
      price: communityPrice,
      description: "For neurodivergent community members",
      color: "cyan",
      badge: "Subsidized",
    },
    {
      id: "ally" as const,
      label: "Ally Tier",
      price: allyPrice,
      description: "Standard pricing for supporters",
      color: "purple",
      badge: null,
    },
    {
      id: "corporate" as const,
      label: "Corporate Tier",
      price: corporatePrice,
      description: "For organizations and businesses",
      color: "pink",
      badge: null,
    },
  ].filter((tier) => tier.price !== null && tier.price >= 0);

  if (tiers.length === 0) return null;

  const isInteractive = !!onSelectTier;

  return (
    <div className={cn("space-y-3", className)}>
      <p className="text-white/60 text-sm">Choose your tier:</p>
      <div className="grid gap-3">
        {tiers.map((tier) => (
          <div
            key={tier.id}
            onClick={() => isInteractive && onSelectTier?.(tier.id)}
            className={cn(
              "flex items-center justify-between p-4 rounded-xl border transition-all",
              isInteractive && "cursor-pointer",
              selectedTier === tier.id
                ? `bg-${tier.color}-500/10 border-${tier.color}-500/50 shadow-lg shadow-${tier.color}-500/10`
                : "bg-white/5 border-white/10 hover:bg-white/10"
            )}
          >
            <div>
              <div className="flex items-center gap-2">
                <span className="text-white font-medium">{tier.label}</span>
                {tier.badge && (
                  <span className="px-2 py-0.5 bg-green-500/20 text-green-400 text-xs rounded-full">
                    {tier.badge}
                  </span>
                )}
              </div>
              <p className="text-sm text-white/40">{tier.description}</p>
            </div>
            <div className={cn("text-xl font-bold", `text-${tier.color}-400`)}>
              {tier.price === 0 ? "Free" : `$${tier.price}`}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}