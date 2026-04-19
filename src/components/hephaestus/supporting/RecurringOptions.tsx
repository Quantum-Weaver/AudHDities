// src/components/supporting/RecurringOptions.tsx
// Recurring Options - Monthly donation setup

"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Switch } from "@/components/ui/Switch";

interface RecurringOptionsProps {
  className?: string;
  onRecurringChange?: (isRecurring: boolean, frequency: "monthly" | "quarterly" | "yearly") => void;
}

const FREQUENCIES = [
  { value: "monthly" as const, label: "Monthly", discount: 0, icon: "📅" },
  { value: "quarterly" as const, label: "Quarterly", discount: 5, icon: "🗓️" },
  { value: "yearly" as const, label: "Yearly", discount: 10, icon: "📆" },
];

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
    <Card className={cn("p-6", className)}>
      <div className="text-center mb-6">
        <div className="text-4xl mb-2">🔄</div>
        <h2 className="text-xl font-semibold text-white mb-1">Make It Recurring</h2>
        <p className="text-white/60 text-sm">Sustained support, sustained impact</p>
      </div>

      <div className="flex items-center justify-between p-4 bg-white/5 rounded-lg mb-6">
        <div>
          <p className="text-white font-medium">Monthly Giving</p>
          <p className="text-xs text-white/40">Support the Sanctuary every month</p>
        </div>
        <Switch checked={isRecurring} onChange={handleRecurringToggle} />
      </div>

      {isRecurring && (
        <div className="space-y-4">
          <p className="text-sm text-white/60">Choose frequency:</p>
          <div className="grid grid-cols-3 gap-3">
            {FREQUENCIES.map((freq) => (
              <button
                key={freq.value}
                onClick={() => handleFrequencyChange(freq.value)}
                className={cn(
                  "p-3 rounded-xl border text-center transition-all",
                  frequency === freq.value
                    ? "bg-cyan-500/10 border-cyan-500/50"
                    : "bg-white/5 border-white/10 hover:bg-white/10"
                )}
              >
                <div className="text-2xl mb-1">{freq.icon}</div>
                <div className="text-sm text-white">{freq.label}</div>
                {freq.discount > 0 && (
                  <div className="text-xs text-green-400 mt-1">{freq.discount}% off</div>
                )}
              </button>
            ))}
          </div>

          {currentFrequency && currentFrequency.discount > 0 && (
            <div className="p-3 bg-green-500/10 border border-green-500/30 rounded-lg text-center">
              <p className="text-sm text-green-400">
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
          <p className="text-sm text-white/40">
            One-time donations are also deeply appreciated
          </p>
        </div>
      )}
    </Card>
  );
}