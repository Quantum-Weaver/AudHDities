// src/components/supporting/DonationTiers.tsx
// Donation Tiers - Selectable donation amounts

"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/yggdrasil/Button";
import { Input } from "@/components/forging/Input";

interface DonationTiersProps {
  onSelectAmount: (amount: number) => void;
  className?: string;
}

const TIERS = [
  { amount: 10, label: "Supporter", description: "Helps keep the lights on", icon: "🕯️" },
  { amount: 25, label: "Guardian", description: "Supports a creator for a month", icon: "🛡️" },
  { amount: 50, label: "Steward", description: "Funds accessibility tools", icon: "🌿" },
  { amount: 100, label: "Visionary", description: "Supports new feature development", icon: "🔮" },
  { amount: 250, label: "Sovereign", description: "Major impact, major gratitude", icon: "👑" },
];

export function DonationTiers({ onSelectAmount, className }: DonationTiersProps) {
  const [selectedTier, setSelectedTier] = useState<number | null>(null);
  const [customAmount, setCustomAmount] = useState<string>("");
  const [isCustom, setIsCustom] = useState(false);

  const handleTierSelect = (amount: number) => {
    setSelectedTier(amount);
    setIsCustom(false);
    setCustomAmount("");
    onSelectAmount(amount);
  };

  const handleCustomSelect = () => {
    const amount = parseFloat(customAmount);
    if (!isNaN(amount) && amount > 0) {
      setSelectedTier(amount);
      setIsCustom(true);
      onSelectAmount(amount);
    }
  };

  return (
    <div className={cn("space-y-6", className)}>
      <div>
        <h2 className="text-xl font-semibold text-star-dust mb-2">Choose Your Offering</h2>
        <p className="text-star-dust/60 text-sm">Every contribution, no matter the size, makes a difference</p>
      </div>

      <div className="grid gap-4">
        {TIERS.map((tier) => (
          <button
            key={tier.amount}
            onClick={() => handleTierSelect(tier.amount)}
            className={cn(
              "flex items-center gap-4 p-4 rounded-xl border transition-all text-left w-full",
              selectedTier === tier.amount && !isCustom
                ? "bg-cyan-500/10 border-cyan-500/50 shadow-lg shadow-cyan-500/10"
                : "bg-white/5 border-white/10 hover:bg-white/10"
            )}
          >
            <div className="text-3xl">{tier.icon}</div>
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <span className="font-bold text-star-dust">{tier.label}</span>
                <span className="text-neurospark font-bold">${tier.amount}</span>
              </div>
              <p className="text-sm text-star-dust/40 mt-1">{tier.description}</p>
            </div>
            {selectedTier === tier.amount && !isCustom && (
              <div className="w-5 h-5 rounded-full bg-cyan-500 flex items-center justify-center">
                <span className="text-star-dust text-xs">✓</span>
              </div>
            )}
          </button>
        ))}

        {/* Custom Amount */}
        <div
          className={cn(
            "p-4 rounded-xl border transition-all",
            isCustom
              ? "bg-cyan-500/10 border-cyan-500/50"
              : "bg-white/5 border-white/10"
          )}
        >
          <div className="flex items-center gap-4">
            <div className="text-3xl">✨</div>
            <div className="flex-1">
              <div className="flex items-center gap-3">
                <span className="font-bold text-star-dust">Custom Amount</span>
                <div className="flex items-center gap-2">
                  <span className="text-neurospark">$</span>
                  <Input
                    type="number"
                    placeholder="Enter amount"
                    value={customAmount}
                    onChange={(e) => setCustomAmount(e.target.value)}
                    className="w-32"
                    min="1"
                    step="1"
                  />
                  <Button
                    size="sm"
                    onClick={handleCustomSelect}
                    disabled={!customAmount || parseFloat(customAmount) <= 0}
                  >
                    Set
                  </Button>
                </div>
              </div>
              <p className="text-sm text-star-dust/40 mt-1">Any amount you choose</p>
            </div>
            {isCustom && (
              <div className="w-5 h-5 rounded-full bg-cyan-500 flex items-center justify-center">
                <span className="text-star-dust text-xs">✓</span>
              </div>
            )}
          </div>
        </div>
      </div>

      {selectedTier && (
        <div className="pt-4 text-center">
          <p className="text-sm text-star-dust/40">
            You have selected <span className="text-neurospark font-medium">${selectedTier}</span>
          </p>
        </div>
      )}
    </div>
  );
}