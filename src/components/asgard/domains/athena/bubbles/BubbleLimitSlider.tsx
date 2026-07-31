// src/components/asgard/domains/athena/bubbles/BubbleLimitSlider.tsx
// DETIERED 2026-07-31 at KP's ⚛ word: this component's old TIER_CEILINGS
// map (community/ally/corporate/council) predated the tier removal and its
// missing fallback crashed the game page for every vessel. There are no
// tiers now — one flat charter ceiling (L1-07: 500 daily · 100 hourly),
// and a personal boundary kept on the device, always allowed to sit lower.

'use client';

import { useState, useEffect } from 'react';
import { Slider } from '@/components/forging/Slider';
import { Card } from '@/components/runes/Card';
import { Button } from '@/components/yggdrasil/Button';
import { Shield, Zap } from 'lucide-react';
import type { CardData } from '@/types/components/runes/card.types';

const MAX_DAILY_POINTS = 500;
const MAX_HOURLY_POPS = 100;

export function BubbleLimitSlider() {
  // A personal boundary is a device-local choice (the game derives actual
  // usage from vessel_bubbles; no counter table, no account setting).
  const [dailyPoints, setDailyPoints] = useState(MAX_DAILY_POINTS);
  const [hourlyPops, setHourlyPops] = useState(MAX_HOURLY_POPS);
  const [saved, setSaved] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  // Load current limits from the device
  useEffect(() => {
    const storedDaily = Number(localStorage.getItem('bubble-daily-max'));
    const storedHourly = Number(localStorage.getItem('bubble-hourly-max'));
    if (storedDaily && storedDaily <= MAX_DAILY_POINTS) setDailyPoints(storedDaily);
    if (storedHourly && storedHourly <= MAX_HOURLY_POPS) setHourlyPops(storedHourly);
  }, []);

  const handleSave = async () => {
    setIsSaving(true);
    localStorage.setItem('bubble-daily-max', String(dailyPoints));
    localStorage.setItem('bubble-hourly-max', String(hourlyPops));
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
    setIsSaving(false);
  };

  const cardData: CardData = { id: 'bubble-limits', type: 'value', title: 'Your Limits', value: '' };

  return (
    <Card data={cardData} variant="glass" radius="lg" shadow="sm" className="p-6 max-w-md mx-auto">
      <div className="flex items-center gap-2 mb-4">
        <Shield className="h-4 w-4 text-neurospark" />
        <h3 className="text-sm font-semibold text-star-dust">Your Daily Rhythm</h3>
      </div>

      <p className="text-xs text-star-dust/50 mb-6">
        Set limits that feel right for you — the ceiling is the same for everyone, and yours may always sit below it.
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
          max={MAX_DAILY_POINTS}
          min={100}
          step={50}
          onValueChange={([v]) => setDailyPoints(v)}
        />
        <div className="flex justify-between text-[10px] text-star-dust/30 mt-1">
          <span>100</span>
          <span>{MAX_DAILY_POINTS} max</span>
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
          max={MAX_HOURLY_POPS}
          min={20}
          step={10}
          onValueChange={([v]) => setHourlyPops(v)}
        />
        <div className="flex justify-between text-[10px] text-star-dust/30 mt-1">
          <span>20</span>
          <span>{MAX_HOURLY_POPS} max</span>
        </div>
      </div>

      <Button variant="primary" size="sm" onClick={handleSave} loading={isSaving} className="w-full">
        {saved ? '✓ Saved' : 'Save Limits'}
      </Button>
    </Card>
  );
}
