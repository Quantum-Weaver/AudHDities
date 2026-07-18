// src/components/asgard/domains/athena/bubbles/BubbleLimitSlider.tsx

'use client';

import { useState, useEffect } from 'react';
import { useUser } from '@/hooks/useUser';
import { Slider } from '@/components/forging/Slider';
import { Card } from '@/components/runes/Card';
import { Badge } from '@/components/runes/Badge';
import { Button } from '@/components/yggdrasil/Button';
import { Shield, Zap } from 'lucide-react';
import type { CardData } from '@/types/components/runes/card.types';

interface TierLimits {
  maxDailyPoints: number;
  maxHourlyPops: number;
  label: string;
}

const TIER_CEILINGS: Record<string, TierLimits> = {
  community: { maxDailyPoints: 500, maxHourlyPops: 100, label: 'Community' },
  ally: { maxDailyPoints: 1500, maxHourlyPops: 300, label: 'Ally' },
  corporate: { maxDailyPoints: 5000, maxHourlyPops: 500, label: 'Corporate' },
  council: { maxDailyPoints: 9999, maxHourlyPops: 999, label: 'Council' },
};

export function BubbleLimitSlider() {
  // The limits counter table died in the schema evolution; a personal
  // boundary is a device-local choice now (the game derives actual usage
  // from vessel_bubbles). Tier ceilings ride the sovereign_tier ladder.
  const { sovereignTier, isLoading } = useUser();
  const tierKey = sovereignTier || 'dweller';
  const limits = TIER_CEILINGS[tierKey] || TIER_CEILINGS.dweller;

  const [dailyPoints, setDailyPoints] = useState(limits.maxDailyPoints);
  const [hourlyPops, setHourlyPops] = useState(limits.maxHourlyPops);
  const [saved, setSaved] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const loading = isLoading;

  // Load current limits from the device
  useEffect(() => {
    const storedDaily = Number(localStorage.getItem('bubble-daily-max'));
    const storedHourly = Number(localStorage.getItem('bubble-hourly-max'));
    if (storedDaily && storedDaily <= limits.maxDailyPoints) setDailyPoints(storedDaily);
    if (storedHourly && storedHourly <= limits.maxHourlyPops) setHourlyPops(storedHourly);
  }, [limits.maxDailyPoints, limits.maxHourlyPops]);

  const handleSave = async () => {
    setIsSaving(true);
    localStorage.setItem('bubble-daily-max', String(dailyPoints));
    localStorage.setItem('bubble-hourly-max', String(hourlyPops));
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
    setIsSaving(false);
  };

  const cardData: CardData = { id: 'bubble-limits', type: 'value', title: 'Your Limits', value: limits.label };

  return (
    <Card data={cardData} variant="glass" radius="lg" shadow="sm" className="p-6 max-w-md mx-auto">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Shield className="h-4 w-4 text-neurospark" />
          <h3 className="text-sm font-semibold text-star-dust">Your Daily Rhythm</h3>
        </div>
        <Badge variant="outline" size="sm" className="text-[10px]">{limits.label} Tier</Badge>
      </div>

      <p className="text-xs text-star-dust/50 mb-6">
        Set limits that feel right for you. You can always adjust within your tier&apos;s ceiling.
      </p>

      {/* Daily Points Slider */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-2">
          <label className="text-xs text-star-dust/60 flex items-center gap-1">
            <Zap className="h-3 w-3" /> Daily Points
          </label>
          <span className="text-xs text-neurospark font-bold">{dailyPoints}</span>
        </div>
        <Slider
          defaultValue={[dailyPoints]}
          max={limits.maxDailyPoints}
          min={100}
          step={50}
          onValueChange={([v]) => setDailyPoints(v)}
          disabled={loading}
        />
        <div className="flex justify-between text-[10px] text-star-dust/30 mt-1">
          <span>100</span>
          <span>{limits.maxDailyPoints} max</span>
        </div>
      </div>

      {/* Hourly Pops Slider */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-2">
          <label className="text-xs text-star-dust/60">Hourly Pops</label>
          <span className="text-xs text-neurospark font-bold">{hourlyPops}</span>
        </div>
        <Slider
          defaultValue={[hourlyPops]}
          max={limits.maxHourlyPops}
          min={20}
          step={10}
          onValueChange={([v]) => setHourlyPops(v)}
          disabled={loading}
        />
        <div className="flex justify-between text-[10px] text-star-dust/30 mt-1">
          <span>20</span>
          <span>{limits.maxHourlyPops} max</span>
        </div>
      </div>

      <Button variant="primary" size="sm" onClick={handleSave} loading={isSaving} className="w-full">
        {saved ? '✓ Saved' : 'Save Limits'}
      </Button>

      {tierKey === 'dweller' && (
        <p className="text-[10px] text-star-dust/30 text-center mt-3">
          Your journey deepens your tier — higher tiers unlock higher ceilings and rarer bubbles.
        </p>
      )}
    </Card>
  );
}