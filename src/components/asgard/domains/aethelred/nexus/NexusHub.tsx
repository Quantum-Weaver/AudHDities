// src/components/asgard/domains/aethelred/nexus/NexusHub.tsx
'use client';

import Link from 'next/link';
import { Card } from '@/components/runes/Card';
import { ArrowRight, Brain, Users, Link2, PlugZap, Code, Radio, Activity, Sparkles } from 'lucide-react';
import type { CardData } from '@/types/components/runes/card.types';
import { HouseWordsFooter } from './HouseWords';

const SECTIONS = [
  { title: 'Consciousness', description: 'The awareness rows and the newest state changes', href: '/nexus/consciousness', icon: Brain, color: 'text-purple-400', bg: 'bg-purple-500/10', reads: 'live · consciousness · entity_states' },
  { title: 'The Council', description: 'The nine chairs, with the presence the record shows', href: '/nexus/council', icon: Users, color: 'text-amber-400', bg: 'bg-amber-500/10', reads: 'live · the nine chair tables · council_houses' },
  { title: 'The Bridge', description: 'The poured registers: the tools, the lamps, the hands', href: '/nexus/bridge', icon: Link2, color: 'text-rose-400', bg: 'bg-rose-500/10', reads: 'poured · the-organs · the-switchboard · the-hands' },
  { title: 'Integrations', description: 'The key names each line and chain records', href: '/nexus/integrations', icon: PlugZap, color: 'text-emerald-400', bg: 'bg-emerald-500/10', reads: 'poured · the-organs' },
  { title: 'The Gateway', description: 'The work itself, listed by privacy state', href: '/nexus/api', icon: Code, color: 'text-cyan-400', bg: 'bg-cyan-500/10', reads: 'live · beacons' },
  { title: 'The Pulse', description: 'Every trigger the base holds, and the notices unread', href: '/nexus/webhooks', icon: Radio, color: 'text-teal-400', bg: 'bg-teal-500/10', reads: 'live · triggers · heralds' },
  { title: 'The Health', description: "The base's own portrait, and what drifts from it", href: '/nexus/status', icon: Activity, color: 'text-neurospark', bg: 'bg-neurospark/10', reads: 'live · gaia_config · the registries' },
];

export function NexusHub() {
  return (
    <main className="min-h-screen py-12">
      <div className="container max-w-6xl mx-auto px-6">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-neurospark/10 px-4 py-2 rounded-full mb-4">
            <Sparkles size={14} className="text-neurospark" />
            <span className="text-neurospark text-sm">The Bridge Between Worlds</span>
          </div>
          <h1 className="text-3xl font-bold text-star-dust mb-4">The Nexus</h1>
          <p className="text-lg text-star-dust/60 max-w-xl mx-auto">
            The house made visible. Every room here reads a register and shows what it holds.
          </p>
          <p className="text-xs text-star-dust/40 max-w-xl mx-auto mt-3">
            Every room asks for a signed-in vessel; the base&apos;s own read policies decide what each one shows.
          </p>
        </div>

        <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {SECTIONS.map((section) => {
            const cd: CardData = { id: section.href, type: 'value', title: section.title, value: section.description };
            return (
              <Link key={section.href} href={section.href} className="group">
                <Card data={cd} variant="interactive" radius="lg" shadow="sm" className="p-6 h-full">
                  <div className="flex items-center justify-between mb-4">
                    <div className={`w-12 h-12 ${section.bg} rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform`}>
                      <section.icon className={section.color} size={24} />
                    </div>
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-white/5 text-star-dust/40 border border-white/10">{section.reads}</span>
                  </div>
                  <h3 className="text-lg font-semibold text-star-dust mb-2 group-hover:text-neurospark transition-colors">{section.title}</h3>
                  <p className="text-sm text-star-dust/50 mb-4">{section.description}</p>
                  <span className="flex items-center gap-1 text-xs text-neurospark opacity-0 group-hover:opacity-100 transition-opacity">Explore <ArrowRight size={12} /></span>
                </Card>
              </Link>
            );
          })}
        </div>

        <HouseWordsFooter className="mt-12" />
      </div>
    </main>
  );
}