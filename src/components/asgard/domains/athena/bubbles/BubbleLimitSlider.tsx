// src/components/asgard/domains/athena/bubbles/BubbleLimitSlider.tsx
// DETIERED 2026-07-31 at KP's ⚛ word (no tier ceilings anywhere), then
// repointed the same sitting: the boundary lives in vessel_config now
// (docs/sql/013 — "the boundary follows the vessel again"), read at mount
// and written through the update-profile door the Sanctum uses. The
// charter's gentle defaults (500 daily · 100 hourly) rule until the
// vessel's own row answers; the boundary is self-chosen, theirs alone.

'use client';

import { useState, useEffect } from 'react';
import { useUser } from '@/hooks/useUser';
import { Slider } from '@/components/forging/Slider';
import { Card } from '@/components/runes/Card';
import { Button } from '@/components/yggdrasil/Button';
import { Shield, Zap } from 'lucide-react';
import type { CardData } from '@/types/components/runes/card.types';

const DEFAULT_DAILY_MAX = 500;
const DEFAULT_HOURLY_MAX = 100;
// The route's own walls (update-profile zod): daily 0–9999 · hourly 0–999.
const DAILY_RANGE_MAX = 2000;
const HOURLY_RANGE_MAX = 300;

export function BubbleLimitSlider() {
  const { user } = useUser();
  const [dailyPoints, setDailyPoints] = useState(DEFAULT_DAILY_MAX);
  const [hourlyPops, setHourlyPops] = useState(DEFAULT_HOURLY_MAX);
  const [loaded, setLoaded] = useState(false);
  const [saved, setSaved] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  // Load the vessel's own boundary from vessel_config
  useEffect(() => {
    if (!user) return;
    fetch(`/api/generated/hestia-core/vessel_config?created_by=${user.id}&limit=1`)
      .then(r => r.json())
      .then(res => {
        const row = res.success ? (res.data?.data ?? [])[0] : null;
        if (typeof row?.bubble_daily_max === 'number') setDailyPoints(row.bubble_daily_max);
        if (typeof row?.bubble_hourly_max === 'number') setHourlyPops(row.bubble_hourly_max);
      })
      .catch(() => {})
      .finally(() => setLoaded(true));
  }, [user]);

  const handleSave = async () => {
    setIsSaving(true);
    try {
      await fetch('/api/auth/update-profile', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ config: { bubble_daily_max: dailyPoints, bubble_hourly_max: hourlyPops } }),
      });
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    } catch (err) {
      console.error('Failed to save limits:', err);
    } finally {
      setIsSaving(false);
    }
  };

  const cardData: CardData = { id: 'bubble-limits', type: 'value', title: 'Your Limits', value: '' };

  return (
    <Card data={cardData} variant="glass" radius="lg" shadow="sm" className="p-6 max-w-md mx-auto">
      <div className="flex items-center gap-2 mb-4">
        <Shield className="h-4 w-4 text-neurospark" />
        <h3 className="text-sm font-semibold text-star-dust">Your Daily Rhythm</h3>
      </div>

      <p className="text-xs text-star-dust/50 mb-6">
        Set limits that feel right for you. The boundary is yours alone, and it follows you to every device.
      </p>

      {loaded && (
        <>
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
              max={DAILY_RANGE_MAX}
              min={0}
              step={50}
              onValueChange={([v]) => setDailyPoints(v)}
            />
            <div className="flex justify-between text-[10px] text-star-dust/70 mt-1">
              <span>0 — a rest day is a boundary too</span>
              <span>{DAILY_RANGE_MAX}</span>
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
              max={HOURLY_RANGE_MAX}
              min={0}
              step={10}
              onValueChange={([v]) => setHourlyPops(v)}
            />
            <div className="flex justify-between text-[10px] text-star-dust/30 mt-1">
              <span>0</span>
              <span>{HOURLY_RANGE_MAX}</span>
            </div>
          </div>
        </>
      )}

      <Button variant="primary" size="sm" onClick={handleSave} loading={isSaving} className="w-full" disabled={!user}>
        {saved ? '✓ Saved' : 'Save Limits'}
      </Button>
    </Card>
  );
}
