// src/components/asgard/domains/hestia/vessel/VesselContent.tsx
// Repointed 2026-07-18 to the evolved schema: identity from
// community_profiles via useUser (roles, sovereign_tier), earned sigils from
// vessel_sigils joined to sigils, milestones from the `current` event stream.
// The old sovereignty_score (0–1000) became the sovereign_tier journey:
// dweller → guild → outlander → sovereign_weaver.
'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useUser } from '@/hooks/useUser';
import { Card } from '@/components/runes/Card';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/runes/Avatar';
import { Badge } from '@/components/runes/Badge';
import { Progress } from '@/components/runes/Progress';
import { Skeleton } from '@/components/runes/Skeleton';
import { Button } from '@/components/yggdrasil/Button';
import { Settings, Zap, BookOpen, Users, Droplets, Palette, Award, Clock, TrendingUp, Bell, Home } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { CardData } from '@/types/components/runes/card.types';
import { QuickLinks } from '@/components/asgard/domains/hestia/vessel/QuickLinks';

interface EarnedSigil {
  id: string;
  name: string;
  slug: string;
  rarity: string | null;
}

interface CurrentEvent {
  id: string;
  event_type: string;
  description: string | null;
  event_at: string;
}

const RARITY_COLORS: Record<string, string> = {
  common: 'bg-slate-500/20 text-slate-400 border-slate-500/30',
  rare: 'bg-cyan-500/20 text-cyan-400 border-cyan-500/30',
  epic: 'bg-purple-500/20 text-purple-400 border-purple-500/30',
  legendary: 'bg-amber-500/20 text-amber-400 border-amber-500/30',
  mythic: 'bg-rose-500/20 text-rose-400 border-rose-500/30',
};

// The sovereignty journey, in order. Tier replaces the old numeric score.
const TIER_ORDER = ['dweller', 'guild', 'outlander', 'sovereign_weaver'] as const;
const TIER_LABELS: Record<string, string> = {
  dweller: 'Dweller',
  guild: 'Guild',
  outlander: 'Outlander',
  sovereign_weaver: 'Sovereign Weaver',
};
const TIER_MESSAGES: Record<string, string> = {
  dweller: 'Every journey begins with a single step.',
  guild: 'Your light grows stronger among kindred.',
  outlander: 'You walk paths of your own making.',
  sovereign_weaver: 'You radiate sovereign light.',
};

function prettify(text: string): string {
  return text.replace(/_/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase());
}

export function VesselContent() {
  const { user, profile, roles, sovereignTier, isQuantumWeaver, isLoading, refetch } = useUser();
  const [sigils, setSigils] = useState<EarnedSigil[]>([]);
  const [events, setEvents] = useState<CurrentEvent[]>([]);

  useEffect(() => { refetch(); }, []);

  // Earned sigils: vessel_sigils (the vessel's own) joined to the sigil canon
  useEffect(() => {
    if (!user) return;
    Promise.all([
      fetch(`/api/generated/hestia-core/vessel_sigils?created_by=${user.id}&sort=created_at&order=desc&limit=6`).then(r => r.json()),
      fetch(`/api/generated/athena-gamification/sigils?limit=100`).then(r => r.json()),
    ]).then(([unlockRes, sigilRes]) => {
      if (!unlockRes.success || !sigilRes.success) return;
      const unlocks: Array<{ sigil_id?: string }> = unlockRes.data?.data || [];
      const canon: Array<{ id: string; name: string; slug: string; rarity: string | null }> = sigilRes.data?.data || [];
      const byId = new Map(canon.map(s => [s.id, s]));
      setSigils(
        unlocks
          .map(u => (u.sigil_id ? byId.get(u.sigil_id) : undefined))
          .filter((s): s is EarnedSigil => !!s)
      );
    }).catch(() => {});
  }, [user]);

  // Milestones: the `current` event stream (the timelines successor)
  useEffect(() => {
    if (!user) return;
    fetch(`/api/generated/hestia-core/current?sovereign_id=${user.id}&sort=event_at&order=desc&limit=5`)
      .then(r => r.json()).then(res => { if (res.success) setEvents(res.data?.data || []); }).catch(() => {});
  }, [user]);

  if (isLoading) {
    return (
      <div className="container max-w-4xl mx-auto px-6">
        <div className="flex flex-col items-center mb-12">
          <Skeleton variant="circle" className="h-24 w-24 mb-4" />
          <Skeleton variant="text" className="h-7 w-48 mb-2" />
          <Skeleton variant="text" className="h-4 w-32 mb-4" />
          <Skeleton variant="text" className="h-4 w-64" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Skeleton variant="card" className="h-40" />
          <Skeleton variant="card" className="h-40" />
        </div>
      </div>
    );
  }

  if (!user || !profile) {
    return (
      <div className="container max-w-4xl mx-auto px-6 text-center">
        <p className="text-star-dust/60">Sign in to view your Vessel.</p>
      </div>
    );
  }

  const quickLinks = [
    // The home — the scene renderer's door (Run 08, the finishing session)
    { href: '/vessel/home', label: 'The Home', icon: Home, id: 'home' },
    { href: '/vessel/energy', label: 'Energy Log', icon: Zap, id: 'energy' },
    { href: '/vessel/journal', label: 'The Scroll', icon: BookOpen, id: 'journal' },
    { href: '/library/bubbles', label: 'Bubbles', icon: Droplets, id: 'bubbles' },
    { href: '/notifications', label: 'The Call', icon: Bell, id: 'notifications' },
  ];

  if (roles.includes('creator') || isQuantumWeaver) {
    quickLinks.push({ href: '/bazaar/studio', label: 'The Loom', icon: Palette, id: 'studio' });
  }

  const tier = sovereignTier ?? 'dweller';
  const tierStep = TIER_ORDER.indexOf(tier as (typeof TIER_ORDER)[number]) + 1 || 1;

  const sovereigntyCardData: CardData = {
    id: `${user.id}-sovereignty`, type: 'stat', title: 'Sovereign Light',
    value: TIER_LABELS[tier] ?? prettify(tier), target: TIER_LABELS.sovereign_weaver,
  };

  const profileCardData: CardData = {
    id: user.id, type: 'value', title: profile.display_name || profile.slug || 'Sovereign',
    value: TIER_LABELS[tier] ?? prettify(tier),
  };

  return (
    <div className="container max-w-4xl mx-auto px-6">

      {/* Profile Header */}
      <div className="flex flex-col items-center mb-12">
        <Avatar size="xl" className="mb-4">
          <AvatarImage src={profile.avatar_url || undefined} />
          <AvatarFallback>
            {profile.display_name?.charAt(0)?.toUpperCase() || profile.slug?.charAt(0)?.toUpperCase() || 'S'}
          </AvatarFallback>
        </Avatar>

        <h1 className="text-2xl font-bold text-star-dust mb-1">
          {profile.display_name || profile.slug || 'Sovereign'}
        </h1>

        <div className="flex items-center gap-2 mb-4 flex-wrap justify-center">
          <Badge variant="default">{TIER_LABELS[tier] ?? prettify(tier)}</Badge>
          {roles.includes('creator') && <Badge variant="default">Creator</Badge>}
          {roles.includes('vendor') && <Badge variant="default">Vendor</Badge>}
          {roles.includes('curator') && <Badge variant="default">Curator</Badge>}
          {roles.includes('council') && <Badge variant="default">Council</Badge>}
          {isQuantumWeaver && <Badge variant="default">Quantum Weaver</Badge>}
        </div>

        {profile.bio && <p className="text-star-dust/60 text-center max-w-lg mb-4">{profile.bio}</p>}

        {/* Earned Sigils */}
        {sigils.length > 0 && (
          <div className="flex flex-wrap gap-2 justify-center mb-4">
            {sigils.map(s => (
              <Link key={s.id} href={`/library/badges/${s.slug}`}>
                <Badge variant="outline" size="sm" className={cn('text-[10px] cursor-pointer', (s.rarity && RARITY_COLORS[s.rarity]) || '')}>
                  <Award className="h-3 w-3 mr-1 inline" />{s.name}
                </Badge>
              </Link>
            ))}
          </div>
        )}

        <div className="mt-2">
          <Link href="/vessel/sanctum">
            <Button variant="primary" size="sm"><Settings className="h-4 w-4 mr-2" />Shape Your Vessel</Button>
          </Link>
        </div>
      </div>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {/* Sovereignty — the tier journey */}
        <Card variant="quantum" data={sovereigntyCardData} radius="lg" shadow="md" className="p-6">
          <div className="flex items-center gap-3 mb-3"><Zap className="h-5 w-5 text-neurospark" /><h3 className="text-lg font-semibold text-star-dust">Sovereign Light</h3></div>
          <div className="text-3xl font-bold text-neurospark mb-2">{TIER_LABELS[tier] ?? prettify(tier)}</div>
          <Progress value={tierStep} max={TIER_ORDER.length} variant="default" size="sm" />
          <p className="text-xs text-star-dust/40 mt-2">{TIER_MESSAGES[tier] ?? TIER_MESSAGES.dweller}</p>
        </Card>

        {/* House — awaiting its home in the evolved schema */}
        <Card variant="default" data={profileCardData} radius="lg" shadow="md" className="p-6">
          <div className="flex items-center gap-3 mb-3"><Users className="h-5 w-5 text-star-dust/60" /><h3 className="text-lg font-semibold text-star-dust">Council House</h3></div>
          <p className="text-star-dust/60 text-sm mb-3">You have not yet joined a Council House.</p>
          <p className="text-xs text-star-dust/40">Complete the Acid Test to discover your house.</p>
        </Card>
      </div>

      {/* Recent Milestones — the `current` stream */}
      {events.length > 0 && (
        <div className="mb-8">
          <h3 className="text-sm font-medium text-star-dust/40 mb-3 flex items-center gap-2"><Clock className="h-4 w-4" />Recent Milestones</h3>
          <div className="space-y-2">
            {events.map(t => (
              <Card key={t.id} data={{ id: t.id, type: 'value', title: prettify(t.event_type), value: '' }} variant="glass" radius="md" shadow="sm" className="p-3">
                <div className="flex items-center gap-3">
                  <TrendingUp className="h-4 w-4 text-neurospark flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-star-dust font-medium">{prettify(t.event_type)}</p>
                    {t.description && <p className="text-xs text-star-dust/50 line-clamp-1">{t.description}</p>}
                  </div>
                  <span className="text-xs text-star-dust/30 flex-shrink-0">{new Date(t.event_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</span>
                </div>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* Quick Links */}
      <QuickLinks links={quickLinks} userId={user.id} columns={4} />

    </div>
  );
}
