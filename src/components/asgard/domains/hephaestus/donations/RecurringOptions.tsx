// src/components/supporting/RecurringOptions.tsx
"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { Card } from "@/components/runes/Card";
import { Button } from "@/components/yggdrasil/Button";
import { Switch } from "@/components/forging/Switch";
import type { CardData } from "@/types/components/runes/card.types";

interface RecurringOptionsProps {
  className?: string;
  onRecurringChange?: (isRecurring: boolean, frequency: "monthly" | "quarterly" | "yearly") => void;
}

const FREQUENCIES = [
  { value: "monthly" as const, label: "Monthly", discount: 0, icon: "📅" },
  { value: "quarterly" as const, label: "Quarterly", discount: 5, icon: "🗓️" },
  { value: "yearly" as const, label: "Yearly", discount: 10, icon: "📆" },
];

const cardData: CardData = {
  id: 'recurring-options',
  type: 'value',
  title: 'Make It Recurring',
  value: '',
};

export function RecurringOptions({ className, onRecurringChange }: RecurringOptionsProps) {
  const [isRecurring, setIsRecurring] = useState(false);
  const [frequency, setFrequency] = useState<"monthly" | "quarterly" | "yearly">("monthly");

  const handleRecurringToggle = (checked: boolean) => {
    setIsRecurring(checked);
    onRecurringChange?.(checked, frequency);
  };

  const handleFrequencyChange = (newFrequency: typeof frequency) => {
    setFrequency(newFrequency);
    onRecurringChange?.(isRecurring, newFrequency);
  };

  const currentFrequency = FREQUENCIES.find(f => f.value === frequency);

  return (
    <Card data={cardData} variant="default" radius="lg" shadow="md" className={cn("p-6", className)}>
      <div className="text-center mb-6">
        <div className="text-4xl mb-2">🔄</div>
        <h2 className="text-xl font-semibold text-star-dust mb-1">Make It Recurring</h2>
        <p className="text-star-dust/60 text-sm">Sustained support, sustained impact</p>
      </div>

      <div className="flex items-center justify-between p-4 bg-white/5 rounded-lg mb-6">
        <div>
          <p className="text-star-dust font-medium">Monthly Giving</p>
          <p className="text-xs text-star-dust/40">Support the Sanctuary every month</p>
        </div>
        <Switch checked={isRecurring} onChange={handleRecurringToggle} />
      </div>

      {isRecurring && (
        <div className="space-y-4">
          <p className="text-sm text-star-dust/60">Choose frequency:</p>
          <div className="grid grid-cols-3 gap-3">
            {FREQUENCIES.map((freq) => (
              <button
                key={freq.value}
                onClick={() => handleFrequencyChange(freq.value)}
                className={cn(
                  "p-3 rounded-xl border text-center transition-all",
                  frequency === freq.value
                    ? "bg-neurospark/10 border-neurospark/50"
                    : "bg-white/5 border-white/10 hover:bg-white/10"
                )}
              >
                <div className="text-2xl mb-1">{freq.icon}</div>
                <div className="text-sm text-star-dust">{freq.label}</div>
                {freq.discount > 0 && (
                  <div className="text-xs text-sanctuary-green mt-1">{freq.discount}% off</div>
                )}
              </button>
            ))}
          </div>

          {currentFrequency && currentFrequency.discount > 0 && (
            <div className="p-3 bg-sanctuary-green/10 border border-sanctuary-green/30 rounded-lg text-center">
              <p className="text-sm text-sanctuary-green">
                ✨ Save {currentFrequency.discount}% with {currentFrequency.label.toLowerCase()} giving
              </p>
            </div>
          )}

          <Button variant="outline" size="sm" className="w-full mt-2">
            <span className="flex items-center justify-center gap-2">
              <span>💳</span>
              <span>Set up recurring donation</span>
            </span>
          </Button>
        </div>
      )}

      {!isRecurring && (
        <div className="text-center py-4">
          <p className="text-sm text-star-dust/40">
            One-time donations are also deeply appreciated
          </p>
        </div>
      )}
    </Card>
  );
}