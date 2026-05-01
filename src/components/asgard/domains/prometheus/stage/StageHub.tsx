// src/components/asgard/domains/prometheus/stage/StageHub.tsx
'use client';

import Link from 'next/link';
import { Card } from '@/components/runes/Card';
import { Music, Mic, Calendar, Play, Radio, Sparkles, ArrowRight } from 'lucide-react';
import type { CardData } from '@/types/components/runes/card.types';

const SECTIONS = [
  { title: 'Now Playing', description: 'Live performances happening now', href: '/stage/live', icon: Radio, color: 'text-red-400', bg: 'bg-red-500/10' },
  { title: 'The Calendar', description: 'Upcoming performances and events', href: '/stage/schedule', icon: Calendar, color: 'text-amber-400', bg: 'bg-amber-500/10' },
  { title: 'The Echo', description: 'Past performances live on', href: '/stage/recordings', icon: Play, color: 'text-purple-400', bg: 'bg-purple-500/10' },
  { title: 'The Comedy Hearth', description: 'Where laughter heals', href: '/stage/comedy', icon: Mic, color: 'text-pink-400', bg: 'bg-pink-500/10' },
  { title: 'The Music Realm', description: 'Where sound becomes substance', href: '/stage/music', icon: Music, color: 'text-cyan-400', bg: 'bg-cyan-500/10' },
  { title: 'The Studio', description: 'Prepare your performance', href: '/stage/studio', icon: Sparkles, color: 'text-emerald-400', bg: 'bg-emerald-500/10' },
];

export function StageHub() {
  return (
    <main className="min-h-screen py-12">
      <div className="container max-w-6xl mx-auto px-6">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-neurospark/10 px-4 py-2 rounded-full mb-4">
            <Sparkles size={14} className="text-neurospark" />
            <span className="text-neurospark text-sm">The Venue</span>
          </div>
          <h1 className="text-3xl font-bold text-star-dust mb-4">The Stage</h1>
          <p className="text-lg text-star-dust/60 max-w-xl mx-auto">
            Where sovereign souls share their gifts. Music, comedy, storytelling, and more.
          </p>
        </div>

        <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {SECTIONS.map((s) => {
            const cd: CardData = { id: s.href, type: 'value', title: s.title, value: s.description };
            return (
              <Link key={s.href} href={s.href} className="group">
                <Card data={cd} variant="interactive" radius="lg" shadow="sm" className="p-6 h-full">
                  <div className={`w-12 h-12 ${s.bg} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                    <s.icon className={s.color} size={24} />
                  </div>
                  <h3 className="text-lg font-semibold text-star-dust mb-2 group-hover:text-neurospark transition-colors">{s.title}</h3>
                  <p className="text-sm text-star-dust/50 mb-4">{s.description}</p>
                  <span className="flex items-center gap-1 text-xs text-neurospark opacity-0 group-hover:opacity-100 transition-opacity">Explore <ArrowRight size={12} /></span>
                </Card>
              </Link>
            );
          })}
        </div>
      </div>
    </main>
  );
}