// src/components/asgard/domains/athena/bubbles/BubbleLimitSlider.tsx

'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/hooks/useAuth';
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
  const { profile } = useAuth();
  const userTier = (profile?.user_tier as string) || 'community';
  const limits = TIER_CEILINGS[userTier] || TIER_CEILINGS.community;

  const [dailyPoints, setDailyPoints] = useState(limits.maxDailyPoints);
  const [hourlyPops, setHourlyPops] = useState(limits.maxHourlyPops);
  const [saved, setSaved] = useState(false);
  const [loading, setLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  // Load current limits
  useEffect(() => {
    if (!profile) return;
    fetch(`/api/generated/hestia-core/user_bubble_limits?user_id=eq.${profile.profiles_id}&limit=1`)
      .then(r => r.json())
      .then(result => {
        const data = result.data?.data?.[0] || result.data?.[0];
        if (data) {
          if (data.daily_points && data.daily_points <= limits.maxDailyPoints) {
            setDailyPoints(data.daily_points);
          }
          if (data.hourly_pops && data.hourly_pops <= limits.maxHourlyPops) {
            setHourlyPops(data.hourly_pops);
          }
        }
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [profile]);

  const handleSave = async () => {
    if (!profile) return;
    setIsSaving(true);
    try {
      await fetch(`/api/generated/hestia-core/user_bubble_limits`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          user_id: profile.profiles_id,
          daily_points: dailyPoints,
          hourly_pops: hourlyPops,
        }),
      });
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    } catch (err) {
      console.error('Failed to save limits:', err);
    } finally {
      setIsSaving(false);
    }
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

      {!['ally', 'corporate', 'council'].includes(userTier) && (
        <p className="text-[10px] text-star-dust/30 text-center mt-3">
          Upgrade your tier to unlock higher limits and rarer bubbles.
        </p>
      )}
    </Card>
  );
}