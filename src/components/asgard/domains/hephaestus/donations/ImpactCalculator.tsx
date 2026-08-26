// src/components/supporting/ImpactCalculator.tsx
// ═════════════════════════════════════════════════════════════════════════
//    outlooks."
// ═════════════════════════════════════════════════════════════════════════
"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { Card } from "@/components/runes/Card";
import { Progress } from "@/components/runes/Progress";
import type { CardData } from "@/types/components/runes/card.types";

interface ImpactCalculatorProps {
  amount: number;
  className?: string;
}

interface ImpactMetric {
  label: string;
  description: string;
  unitCost: number;
  icon: string;
}

const IMPACT_METRICS: ImpactMetric[] = [
  { label: "Artisan Support", description: "Funds an artisan for one day", unitCost: 5, icon: "🎨" },
  { label: "Server Time", description: "Keeps the Sanctuary online", unitCost: 0.10, icon: "🖥️" },
  { label: "Accessibility Tools", description: "Provides screen reader licenses", unitCost: 20, icon: "♿" },
  { label: "Community Events", description: "Sponsors a community gathering", unitCost: 50, icon: "🎉" },
  { label: "Feature Development", description: "Builds new tools for everyone", unitCost: 100, icon: "⚙️" },
];

const cardData: CardData = {
  id: 'impact-calculator',
  type: 'value',
  title: 'Your Impact',
  value: '',
};

export function ImpactCalculator({ amount, className }: ImpactCalculatorProps) {
  const [impacts, setImpacts] = useState<Array<{ metric: ImpactMetric; count: number }>>([]);

  useEffect(() => {
    const calculated = IMPACT_METRICS.map((metric) => ({
      metric,
      count: Math.floor(amount / metric.unitCost),
    }));
    setImpacts(calculated);
  }, [amount]);

  const totalImpact = impacts.reduce((sum, i) => sum + i.count, 0);
  const hasAmount = amount > 0;

  return (
    <Card data={cardData} variant="default" radius="lg" shadow="md" className={cn("p-6", className)}>
      <div className="text-center mb-6">
        <div className="text-4xl mb-2">📊</div>
        <h2 className="text-xl font-semibold text-star-dust mb-1">Your Impact</h2>
        <p className="text-star-dust/60 text-sm">See what your contribution makes possible</p>
      </div>

      {!hasAmount ? (
        <div className="text-center py-8 text-star-dust/40">
          <p>Select a donation amount to see your impact</p>
        </div>
      ) : (
        <>
          <div className="mb-6 p-4 bg-gradient-to-br from-neurospark/10 to-quantum-purple/10 rounded-xl text-center">
            <div className="text-3xl font-bold text-neurospark">${amount}</div>
            <div className="text-sm text-star-dust/40 mt-1">Your offering</div>
          </div>

          <div className="space-y-4">
            {impacts.map(({ metric, count }) => (
              <div key={metric.label} className="space-y-1">
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2">
                    <span className="text-lg">{metric.icon}</span>
                    <span className="text-star-dust">{metric.label}</span>
                  </div>
                  <span className="text-neurospark font-mono">{count}</span>
                </div>
                <Progress value={Math.min(100, (count * metric.unitCost / amount) * 100)} className="h-1.5" />
                <p className="text-xs text-star-dust/40">{metric.description}</p>
              </div>
            ))}
          </div>

          <div className="mt-6 pt-4 border-t border-white/10 text-center">
            <div className="text-2xl font-bold text-star-dust">{totalImpact}</div>
            <div className="text-xs text-star-dust/40">Total impacts supported</div>
          </div>

          <div className="mt-4 p-3 bg-white/5 rounded-lg text-center">
            <p className="text-sm text-star-dust/60">
              ✨ Your contribution creates ripples of positive change
            </p>
          </div>
        </>
      )}
    </Card>
  );
}