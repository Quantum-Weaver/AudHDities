// src/components/asgard/domains/themis/council/CouncilHub.tsx
'use client';

import Link from 'next/link';
import { Card } from '@/components/runes/Card';
import { Badge } from '@/components/runes/Badge';
import { Button } from '@/components/yggdrasil/Button';
import { Skeleton } from '@/components/runes/Skeleton';
import { useAuth } from '@/hooks/useAuth';
import { 
  Shield, ScrollText, Vote, Users, Eye, 
  FileText, Settings, UserCheck, ArrowRight, Sparkles 
} from 'lucide-react';
import type { CardData } from '@/types/components/runes/card.types';

const SECTIONS = [
  {
    title: 'Proposals',
    description: 'Shape the future of the Sanctuary',
    href: '/council/proposals',
    icon: ScrollText,
    color: 'text-amber-400',
    bg: 'bg-amber-500/10',
  },
  {
    title: 'Voting',
    description: 'Your voice shapes the Sanctuary',
    href: '/council/voting',
    icon: Vote,
    color: 'text-purple-400',
    bg: 'bg-purple-500/10',
  },
  {
    title: 'Delegation',
    description: 'Trust your voice to those who share your values',
    href: '/council/delegation',
    icon: Users,
    color: 'text-emerald-400',
    bg: 'bg-emerald-500/10',
  },
  {
    title: 'Curators',
    description: 'Trusted voices guiding the Sanctuary',
    href: '/council/curators',
    icon: Eye,
    color: 'text-cyan-400',
    bg: 'bg-cyan-500/10',
  },
  {
    title: 'The Ledger',
    description: 'Complete transparency, every transaction visible',
    href: '/council/ledger',
    icon: FileText,
    color: 'text-teal-400',
    bg: 'bg-teal-500/10',
  },
  {
    title: 'Reports',
    description: 'Community-driven moderation, fully transparent',
    href: '/council/reports',
    icon: Shield,
    color: 'text-rose-400',
    bg: 'bg-rose-500/10',
  },
  {
    title: 'Administration',
    description: 'Tools for Sanctuary stewards',
    href: '/council/admin',
    icon: Settings,
    color: 'text-slate-400',
    bg: 'bg-slate-500/10',
    restricted: true,
  },
  {
    title: 'Applications',
    description: 'Review creator, vendor, and curator applications',
    href: '/council/applications',
    icon: UserCheck,
    color: 'text-indigo-400',
    bg: 'bg-indigo-500/10',
    restricted: true,
  },
];

export function CouncilHub() {
  const { user, profile, loading } = useAuth();

  if (loading) {
    return (
      <main className="min-h-screen py-12">
        <div className="container max-w-6xl mx-auto px-6">
          <Skeleton variant="text" className="h-10 w-64 mx-auto mb-4" />
          <Skeleton variant="text" className="h-6 w-96 mx-auto mb-12" />
          <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1,2,3,4,5,6].map((i) => (
              <Skeleton key={i} variant="card" className="h-40" />
            ))}
          </div>
        </div>
      </main>
    );
  }

  const isAdmin = profile?.is_admin === true || profile?.is_moderator === true;
  const isCouncilTier = profile?.user_tier === 'council';

  return (
    <main className="min-h-screen py-12">
      <div className="container max-w-6xl mx-auto px-6">

        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-purple-500/10 px-4 py-2 rounded-full mb-4">
            <Sparkles size={14} className="text-purple-400" />
            <span className="text-purple-400 text-sm">The Ninth Chair</span>
          </div>
          <h1 className="text-3xl font-bold text-star-dust mb-4">The Council Chamber</h1>
          <p className="text-lg text-star-dust/60 max-w-xl mx-auto">
            Where sovereign voices shape the Sanctuary. Every voice matters. Every vote counts.
          </p>

          {/* Tier indicator */}
          {!isCouncilTier && (
            <div className="mt-4 inline-flex items-center gap-2 bg-amber-500/10 border border-amber-500/20 rounded-xl px-4 py-2">
              <Shield size={14} className="text-amber-400" />
              <span className="text-sm text-amber-400">
                Council tier required for voting and proposals. Your voice matters — reach 500 sovereignty to join.
              </span>
            </div>
          )}
        </div>

        {/* Section Grid */}
        <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {SECTIONS.map((section) => {
            // Hide restricted sections from non-admin users
            if (section.restricted && !isAdmin) return null;

            const cardData: CardData = {
              id: section.href,
              type: 'value',
              title: section.title,
              value: section.description,
            };

            const Icon = section.icon;

            return (
              <Link key={section.href} href={section.href} className="group">
                <Card
                  data={cardData}
                  variant="interactive"
                  radius="lg"
                  shadow="sm"
                  className="p-6 h-full"
                >
                  <div className={`w-12 h-12 ${section.bg} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                    <Icon className={section.color} size={24} />
                  </div>
                  <h3 className="text-lg font-semibold text-star-dust mb-2 group-hover:text-neurospark transition-colors">
                    {section.title}
                  </h3>
                  <p className="text-sm text-star-dust/50 mb-4">
                    {section.description}
                  </p>
                  <span className="flex items-center gap-1 text-xs text-neurospark opacity-0 group-hover:opacity-100 transition-opacity">
                    Enter <ArrowRight size={12} />
                  </span>
                </Card>
              </Link>
            );
          })}
        </div>

        {/* Covenant Card */}
        <Card
          data={{ id: 'council-covenant', type: 'value', title: 'The Council Covenant', value: '' }}
          variant="glass"
          radius="xl"
          shadow="md"
          className="mt-12 p-8 text-center"
        >
          <Shield className="h-8 w-8 text-purple-400 mx-auto mb-4" />
          <h2 className="text-xl font-bold text-star-dust mb-4">The Council Covenant</h2>
          <p className="text-star-dust/60 max-w-2xl mx-auto text-sm leading-relaxed">
            The Council exists to serve the Sanctuary, not to rule it. Every proposal is public. 
            Every vote is transparent. Every decision is recorded in the immutable ledger. 
            Power flows from the sovereign voices of the community — never from a single throne.
            The Ninth Chair remains empty, waiting for the next voice to rise.
          </p>
        </Card>
      </div>
    </main>
  );
}