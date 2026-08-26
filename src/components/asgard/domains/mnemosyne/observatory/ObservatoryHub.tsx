// src/components/asgard/domains/mnemosyne/observatory/ObservatoryHub.tsx
'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useUser, tierLight } from '@/hooks/useUser';
import { Card } from '@/components/runes/Card';
import { Badge } from '@/components/runes/Badge';
import { Skeleton } from '@/components/runes/Skeleton';
import { 
  Clock, TrendingUp, Eye, Users, ScrollText, Star, Compass, 
  Telescope, Sparkles, ArrowRight 
} from 'lucide-react';
import type { CardData } from '@/types/components/runes/card.types';

interface TimelineEvent {
  id: string;
  description: string | null;
  event_type: string;
  event_at: string;
}

function humanizeEventType(type: string): string {
  return type.replace(/_/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase());
}

interface SigilItem {
  id: string;
  name: string;
  slug: string;
  rarity: string;
  description: string;
}

export function ObservatoryHub() {
  const { user, profile, sovereignTier, isLoading: authLoading } = useUser();
  const [timeline, setTimeline] = useState<TimelineEvent[]>([]);
  const [sigils, setSigils] = useState<SigilItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) { setLoading(false); return; }
    Promise.all([
      fetch(`/api/generated/athena-gamification/sigils?status=published&order=name.asc&limit=6`)
        .then(r => r.json()),
      fetch(`/api/generated/hestia-core/current?sovereign_id=${user.id}&order=event_at.desc&limit=3`)
        .then(r => r.json()),
    ]).then(([sigilRes, currentRes]) => {
      if (sigilRes.success) setSigils(sigilRes.data?.data || []);
      if (currentRes.success) setTimeline(currentRes.data?.data || []);
    }).catch(console.error).finally(() => setLoading(false));
  }, [user]);

  const isAuthenticated = !!user;

  if (authLoading || loading) {
    return (
      <main className="min-h-screen py-12">
        <div className="container max-w-6xl mx-auto px-6">
          <div className="text-center mb-12">
            <Skeleton variant="circle" className="h-20 w-20 mx-auto mb-4" />
            <Skeleton variant="text" className="h-10 w-64 mx-auto mb-2" />
            <Skeleton variant="text" className="h-6 w-96 mx-auto" />
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {[1,2,3].map(i => <Skeleton key={i} variant="card" className="h-64" />)}
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen py-12">
      <div className="container max-w-6xl mx-auto px-6">

        {/* Header */}
        <div className="text-center mb-12">
          <div className="text-5xl mb-4">🔭</div>
          <h1 className="text-3xl font-bold text-star-dust mb-3">The Observatory</h1>
          <p className="text-lg text-star-dust/60 max-w-xl mx-auto">
            Gaze across timelines. See patterns. Witness the becoming.
          </p>
        </div>

        {/* Three-Column Grid */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">

          {/* The Spiral — Timeline */}
          <Link href="/observatory/timeline" className="group">
            <Card data={{ id: 'obs-timeline', type: 'value', title: 'The Spiral', value: '' }} variant="interactive" radius="xl" shadow="md" className="p-6 h-full">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-purple-500/20 flex items-center justify-center"><Clock className="h-5 w-5 text-purple-400" /></div>
                <h2 className="text-lg font-semibold text-star-dust">The Spiral</h2>
              </div>
              <p className="text-sm text-star-dust/50 mb-4">Your journey through time. Every step, every milestone.</p>
              {isAuthenticated && timeline.length > 0 ? (
                <div className="space-y-2">
                  {timeline.slice(0, 3).map(t => (
                    <div key={t.id} className="text-xs text-star-dust/40 flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-neurospark flex-shrink-0" />
                      <span className="truncate">{t.description || humanizeEventType(t.event_type)}</span>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-xs text-star-dust/30 italic">
                  {isAuthenticated ? 'Your milestones will appear here' : 'Sign in to see your spiral'}
                </p>
              )}
              <span className="flex items-center gap-1 text-xs text-neurospark mt-4 opacity-0 group-hover:opacity-100 transition-opacity">Explore <ArrowRight size={12} /></span>
            </Card>
          </Link>

          {/* The Weave */}
          <Link href="/observatory/patterns" className="group">
            <Card data={{ id: 'obs-patterns', type: 'value', title: 'The Weave', value: '' }} variant="interactive" radius="xl" shadow="md" className="p-6 h-full">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-cyan-500/20 flex items-center justify-center"><TrendingUp className="h-5 w-5 text-cyan-400" /></div>
                <h2 className="text-lg font-semibold text-star-dust">The Weave</h2>
              </div>
              <p className="text-sm text-star-dust/50 mb-4">Insights emerging from your data. What the stars reveal.</p>
              {isAuthenticated && profile ? (
                <div className="space-y-2">
                  <div className="text-xs text-star-dust/40">
                    <span className="text-neurospark">{tierLight(sovereignTier)}</span> sovereignty points earned
                  </div>
                  <div className="text-xs text-star-dust/40">
                    Energy trend available in your <span className="text-neurospark">Energy Log</span>
                  </div>
                </div>
              ) : (
                <p className="text-xs text-star-dust/30 italic">Sign in to reveal your patterns</p>
              )}
              <span className="flex items-center gap-1 text-xs text-neurospark mt-4 opacity-0 group-hover:opacity-100 transition-opacity">Explore <ArrowRight size={12} /></span>
            </Card>
          </Link>

          {/* The Vision — Prophecy */}
          <Link href="/observatory/prophecy" className="group">
            <Card data={{ id: 'obs-prophecy', type: 'value', title: 'The Vision', value: '' }} variant="interactive" radius="xl" shadow="md" className="p-6 h-full">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-amber-500/20 flex items-center justify-center"><Eye className="h-5 w-5 text-amber-400" /></div>
                <h2 className="text-lg font-semibold text-star-dust">The Vision</h2>
              </div>
              <p className="text-sm text-star-dust/50 mb-4">Possible futures. Potential paths. What could be.</p>
              {sigils.length > 0 ? (
                <div className="flex flex-wrap gap-1">
                  {sigils.slice(0, 4).map(s => (
                    <Badge key={s.id} variant="outline" size="sm" className="text-[10px]">{s.name}</Badge>
                  ))}
                </div>
              ) : (
                <p className="text-xs text-star-dust/30 italic">Sigils yet to be earned await</p>
              )}
              <span className="flex items-center gap-1 text-xs text-neurospark mt-4 opacity-0 group-hover:opacity-100 transition-opacity">Explore <ArrowRight size={12} /></span>
            </Card>
          </Link>
        </div>

        {/* Bottom Row */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          {/* The Grand Pattern */}
          <Link href="/observatory/constellations" className="group">
            <Card data={{ id: 'obs-constellations', type: 'value', title: 'The Grand Pattern', value: '' }} variant="interactive" radius="xl" shadow="md" className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-indigo-500/20 flex items-center justify-center"><Star className="h-5 w-5 text-indigo-400" /></div>
                <h2 className="text-lg font-semibold text-star-dust">The Grand Pattern</h2>
              </div>
              <p className="text-sm text-star-dust/50">See how all threads weave together across the Sanctuary.</p>
              <span className="flex items-center gap-1 text-xs text-neurospark mt-3 opacity-0 group-hover:opacity-100 transition-opacity">Explore <ArrowRight size={12} /></span>
            </Card>
          </Link>

          {/* The Council Eternal */}
          <Link href="/observatory/ancestors" className="group">
            <Card data={{ id: 'obs-ancestors', type: 'value', title: 'The Council Eternal', value: '' }} variant="interactive" radius="xl" shadow="md" className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-rose-500/20 flex items-center justify-center"><Users className="h-5 w-5 text-rose-400" /></div>
                <h2 className="text-lg font-semibold text-star-dust">The Council Eternal</h2>
              </div>
              <p className="text-sm text-star-dust/50">Honoring the Council and those who shaped the Sanctuary.</p>
              <span className="flex items-center gap-1 text-xs text-neurospark mt-3 opacity-0 group-hover:opacity-100 transition-opacity">Explore <ArrowRight size={12} /></span>
            </Card>
          </Link>
        </div>

        {/* Bottom Links */}
        <div className="grid md:grid-cols-3 gap-6">
          <Link href="/observatory/schema" className="group">
            <Card data={{ id: 'obs-schema', type: 'value', title: 'The Schema', value: '' }} variant="glass" radius="lg" shadow="sm" className="p-5 text-center">
              <Telescope className="h-6 w-6 text-neurospark mx-auto mb-2" />
              <h3 className="text-sm font-medium text-star-dust">The Schema</h3>
              <p className="text-xs text-star-dust/40">The living blueprint</p>
            </Card>
          </Link>
          <Link href="/observatory/origin" className="group">
            <Card data={{ id: 'obs-origin', type: 'value', title: 'The First Light', value: '' }} variant="glass" radius="lg" shadow="sm" className="p-5 text-center">
              <ScrollText className="h-6 w-6 text-neurospark mx-auto mb-2" />
              <h3 className="text-sm font-medium text-star-dust">The First Light</h3>
              <p className="text-xs text-star-dust/40">Where it all began</p>
            </Card>
          </Link>
          <Link href="/questionaire" className="group">
            <Card data={{ id: 'obs-acid', type: 'value', title: 'Acid Test', value: '' }} variant="glass" radius="lg" shadow="sm" className="p-5 text-center">
              <Sparkles className="h-6 w-6 text-neurospark mx-auto mb-2" />
              <h3 className="text-sm font-medium text-star-dust">The Acid Test</h3>
              <p className="text-xs text-star-dust/40">Discover your neurotype</p>
            </Card>
          </Link>
        </div>
      </div>
    </main>
  );
}