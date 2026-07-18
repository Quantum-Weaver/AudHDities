// src/components/asgard/domains/hestia/energy/EnergyLog.tsx
'use client';

import { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import { useAuth } from '@/hooks/useAuth';
import { Card } from '@/components/runes/Card';
import { Progress } from '@/components/runes/Progress';
import { Button } from '@/components/yggdrasil/Button';
import { Badge } from '@/components/runes/Badge';
import { Skeleton } from '@/components/runes/Skeleton';
import { Form, FormActions } from '@/components/forging/Form';
import { FormField } from '@/components/forging/FormField';
import { Select } from '@/components/forging/Select';
import { ArrowLeft, Plus, Zap, Clock, TrendingUp, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { CardData } from '@/types/components/runes/card.types';

// ═══════════════════════════════════════════════════════════════════════════
// TYPES
// ═══════════════════════════════════════════════════════════════════════════

interface EnergyEntry {
  id: string;
  energy_level: number;
  notes?: string | null;
  // The "activity" concept rides in the schema's mood_tags array
  // (energy_entries has no activity column; first tag = activity).
  mood_tags?: string[] | null;
  logged_at: string;
}

interface EnergyTrend {
  average: number;
  trend: 'rising' | 'steady' | 'falling';
  insight: string;
}

// ═══════════════════════════════════════════════════════════════════════════
// CONSTANTS
// ═══════════════════════════════════════════════════════════════════════════

const ENERGY_LABELS: Record<number, string> = {
  1: 'Drained',
  2: 'Low',
  3: 'Tired',
  4: 'Dim',
  5: 'Steady',
  6: 'Alright',
  7: 'Good',
  8: 'Bright',
  9: 'Glowing',
  10: 'Radiant',
};

const ENERGY_OPTIONS = Array.from({ length: 10 }, (_, i) => ({
  value: String(i + 1),
  label: `${i + 1} — ${ENERGY_LABELS[i + 1]}`,
}));

const ACTIVITY_OPTIONS = [
  { value: '', label: 'No specific activity' },
  { value: 'resting', label: 'Resting' },
  { value: 'creating', label: 'Creating' },
  { value: 'connecting', label: 'Connecting' },
  { value: 'learning', label: 'Learning' },
  { value: 'working', label: 'Working' },
  { value: 'moving', label: 'Moving' },
  { value: 'healing', label: 'Healing' },
  { value: 'exploring', label: 'Exploring' },
];

// ═══════════════════════════════════════════════════════════════════════════
// ENERGY ALGORITHM
// ═══════════════════════════════════════════════════════════════════════════

function analyzeEnergyTrend(entries: EnergyEntry[]): EnergyTrend {
  if (entries.length < 3) {
    const avg = entries.length > 0
      ? entries.reduce((sum, e) => sum + e.energy_level, 0) / entries.length
      : 0;
    return {
      average: Math.round(avg * 10) / 10,
      trend: 'steady',
      insight: entries.length === 0
        ? 'Begin logging to see your rhythm.'
        : 'Keep logging to reveal your pattern.',
    };
  }

  const recent = entries.slice(0, 3);
  const older = entries.slice(3, 6);

  const recentAvg = recent.reduce((sum, e) => sum + e.energy_level, 0) / recent.length;
  const olderAvg = older.length > 0
    ? older.reduce((sum, e) => sum + e.energy_level, 0) / older.length
    : recentAvg;

  const allAvg = entries.reduce((sum, e) => sum + e.energy_level, 0) / entries.length;
  const diff = recentAvg - olderAvg;

  let trend: 'rising' | 'steady' | 'falling' = 'steady';
  if (diff > 0.75) trend = 'rising';
  else if (diff < -0.75) trend = 'falling';

  const insights: Record<string, string> = {
    rising: 'Your energy is rising. Whatever you are doing, it is working.',
    steady: 'Your energy is steady. A good rhythm sustains you.',
    falling: 'Your energy is dipping. This is not failure — it is a signal to rest.',
  };

  // Day-of-week pattern detection (simple)
  const dayCounts: Record<string, number[]> = {};
  for (const entry of entries) {
    const day = new Date(entry.logged_at).toLocaleDateString('en-US', { weekday: 'long' });
    if (!dayCounts[day]) dayCounts[day] = [];
    dayCounts[day].push(entry.energy_level);
  }

  let lowestDay = '';
  let lowestAvg = 10;
  for (const [day, levels] of Object.entries(dayCounts)) {
    const avg = levels.reduce((s, l) => s + l, 0) / levels.length;
    if (avg < lowestAvg && levels.length >= 2) {
      lowestAvg = avg;
      lowestDay = day;
    }
  }

  let insight = insights[trend];
  if (lowestDay) {
    insight += ` You tend to have lower energy on ${lowestDay}s. Would you like to plan rest for those days?`;
  }

  return {
    average: Math.round(allAvg * 10) / 10,
    trend,
    insight,
  };
}

function getEnergyColor(level: number): string {
  if (level <= 2) return '#636E72';
  if (level <= 4) return '#74B9FF';
  if (level <= 6) return '#00CEC9';
  if (level <= 8) return '#FDCB6E';
  return '#00B894';
}

// ═══════════════════════════════════════════════════════════════════════════
// COMPONENT
// ═══════════════════════════════════════════════════════════════════════════

export function EnergyLog() {
  const { user, loading: authLoading } = useAuth();
  const [entries, setEntries] = useState<EnergyEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const fetchEntries = async () => {
    if (!user) return;
    setLoading(true);
    try {
      const response = await fetch(
        `/api/generated/hestia-core/energy_entries?created_by=${user.id}&sort=logged_at&order=desc&limit=30`
      );
      const result = await response.json();
      if (result.success) {
        setEntries(result.data?.data || result.data || []);
      }
    } catch (err) {
      console.error('Failed to fetch energy logs:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEntries();
  }, [user]);

  const handleCreate = async (data: Record<string, any>) => {
    if (!user) return;
    setIsSaving(true);
    try {
      const response = await fetch('/api/generated/hestia-core/energy_entries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          // created_by is stamped server-side from the session
          energy_level: parseInt(data.energy_level),
          notes: data.notes || null,
          mood_tags: data.activity ? [data.activity] : null,
          logged_at: new Date().toISOString(),
        }),
      });
      const result = await response.json();
      if (result.success) {
        setShowForm(false);
        fetchEntries();
      }
    } catch (err) {
      console.error('Failed to log energy:', err);
    } finally {
      setIsSaving(false);
    }
  };

  const trend = useMemo(() => analyzeEnergyTrend(entries), [entries]);

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
    });
  };

  const formatTime = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
    });
  };

  // ─── Loading ──────────────────────────────────────────────────────────
  if (authLoading || loading) {
    return (
      <main className="min-h-screen py-12">
        <div className="container max-w-2xl mx-auto px-6">
          <Skeleton variant="text" className="h-8 w-48 mb-8" />
          <Skeleton variant="card" className="h-40 mb-4" />
          <div className="space-y-3">
            {[1, 2, 3].map((i) => (
              <Skeleton key={i} variant="card" className="h-20" />
            ))}
          </div>
        </div>
      </main>
    );
  }

  // ─── Unauthenticated ─────────────────────────────────────────────────
  if (!user) {
    return (
      <main className="min-h-screen py-12">
        <div className="container max-w-2xl mx-auto px-6 text-center">
          <p className="text-star-dust/60">Sign in to log your energy.</p>
        </div>
      </main>
    );
  }

  const trendCardData: CardData = {
    id: `${user.id}-energy-trend`,
    type: 'stat',
    title: 'Your Rhythm',
    value: trend.average,
    trend: trend.trend,
  };

  return (
    <main className="min-h-screen py-12">
      <div className="container max-w-2xl mx-auto px-6">

        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <Link
              href="/vessel"
              className="flex items-center gap-2 text-star-dust/60 hover:text-star-dust transition-colors text-sm mb-2"
            >
              <ArrowLeft className="h-4 w-4" />
              Return to Vessel
            </Link>
            <h1 className="text-2xl font-bold text-star-dust">Energy Log</h1>
            <p className="text-sm text-star-dust/40 mt-1">Listen to your vessel</p>
          </div>
          <Button variant="primary" size="sm" onClick={() => setShowForm(!showForm)}>
            {showForm ? <X className="h-4 w-4 mr-2" /> : <Plus className="h-4 w-4 mr-2" />}
            {showForm ? 'Cancel' : 'Log Energy'}
          </Button>
        </div>

        {/* Create Form */}
        {showForm && (
          <Card
            data={{ id: 'new-energy', type: 'value', title: 'Log Energy', value: '' }}
            variant="sanctuary"
            radius="lg"
            shadow="md"
            className="p-6 mb-8"
          >
            <Form onSubmit={handleCreate}>
              <FormField label="How does your vessel feel?" required>
                <Select
                  name="energy_level"
                  options={ENERGY_OPTIONS}
                  placeholder="Select your energy level..."
                />
              </FormField>
              <FormField label="Activity" optional helper="What were you doing?">
                <Select
                  name="activity"
                  options={ACTIVITY_OPTIONS}
                  placeholder="Select activity..."
                />
              </FormField>
              <FormActions>
                <Button type="submit" variant="primary" loading={isSaving}>
                  <Zap className="h-4 w-4 mr-2" />
                  Log Energy
                </Button>
              </FormActions>
            </Form>
          </Card>
        )}

        {/* Trend Card */}
        {entries.length > 0 && (
          <Card
            data={trendCardData}
            variant="quantum"
            radius="lg"
            shadow="md"
            className="p-6 mb-8"
          >
            <div className="flex items-center gap-3 mb-3">
              <TrendingUp className="h-5 w-5 text-neurospark" />
              <h3 className="text-lg font-semibold text-star-dust">Your Rhythm</h3>
            </div>
            <div className="flex items-end gap-3 mb-4">
              <span className="text-3xl font-bold text-neurospark">
                {trend.average}
              </span>
              <span className="text-sm text-star-dust/40 mb-1">/ 10 average</span>
            </div>
            <Progress
              value={Math.round(trend.average * 10)}
              max={100}
              variant="default"
              size="sm"
              className="mb-3"
            />
            <p className="text-sm text-star-dust/50">{trend.insight}</p>
          </Card>
        )}

        {/* Timeline */}
        {entries.length === 0 ? (
          <div className="text-center py-20">
            <Zap className="h-12 w-12 text-star-dust/20 mx-auto mb-4" />
            <p className="text-star-dust/40 text-lg mb-2">Begin listening to your vessel</p>
            <p className="text-star-dust/30 text-sm">Tap &ldquo;Log Energy&rdquo; to record how you feel</p>
          </div>
        ) : (
          <div className="space-y-3">
            <h3 className="text-sm font-medium text-star-dust/40 mb-4">Recent Entries</h3>
            {entries.map((entry, index) => {
              const cardData: CardData = {
                id: entry.id,
                type: 'stat',
                title: ENERGY_LABELS[entry.energy_level] || 'Unknown',
                value: entry.energy_level,
              };

              return (
                <Card
                  key={entry.id}
                  data={cardData}
                  variant="glass"
                  radius="md"
                  shadow="sm"
                  className="p-4"
                >
                  <div className="flex items-center gap-4">
                    {/* Energy Level Circle */}
                    <div
                      className="w-12 h-12 rounded-full flex items-center justify-center text-lg font-bold flex-shrink-0"
                      style={{
                        backgroundColor: `${getEnergyColor(entry.energy_level)}20`,
                        color: getEnergyColor(entry.energy_level),
                        border: `2px solid ${getEnergyColor(entry.energy_level)}40`,
                      }}
                    >
                      {entry.energy_level}
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-medium text-star-dust">
                          {ENERGY_LABELS[entry.energy_level]}
                        </span>
                        {entry.mood_tags?.[0] && (
                          <Badge variant="outline" size="sm" className="text-[10px]">
                            {entry.mood_tags[0]}
                          </Badge>
                        )}
                      </div>
                      {entry.notes && (
                        <p className="text-sm text-star-dust/50 line-clamp-1">{entry.notes}</p>
                      )}
                      <div className="flex items-center gap-3 mt-2">
                        <span className="flex items-center gap-1 text-xs text-star-dust/30">
                          <Clock size={10} />
                          {formatDate(entry.logged_at)} at {formatTime(entry.logged_at)}
                        </span>
                      </div>
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>
        )}
      </div>
    </main>
  );
}