// src/components/supporting/ImpactCalculator.tsx
// Impact Calculator - Shows donation impact

"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { Card } from "@/components/runes/cards/Card";
import { Progress } from "@/components/runes/Progress";

interface ImpactCalculatorProps {
  amount: number;
  className?: string;
}

interface ImpactMetric {
  label: string;
  description: string;
  unitCost: number;
  icon: string;
  color: string;
}

const IMPACT_METRICS: ImpactMetric[] = [
  { label: "Creator Support", description: "Funds a creator for one day", unitCost: 5, icon: "🎨", color: "from-purple-500 to-pink-500" },
  { label: "Server Time", description: "Keeps the Sanctuary online", unitCost: 0.10, icon: "🖥️", color: "from-cyan-500 to-blue-500" },
  { label: "Accessibility Tools", description: "Provides screen reader licenses", unitCost: 20, icon: "♿", color: "from-green-500 to-emerald-500" },
  { label: "Community Events", description: "Sponsors a community gathering", unitCost: 50, icon: "🎉", color: "from-orange-500 to-red-500" },
  { label: "Feature Development", description: "Builds new tools for everyone", unitCost: 100, icon: "⚙️", color: "from-indigo-500 to-purple-500" },
];

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
    <Card className={cn("p-6", className)}>
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
          <div className="mb-6 p-4 bg-gradient-to-br from-cyan-500/10 to-purple-500/10 rounded-xl text-center">
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