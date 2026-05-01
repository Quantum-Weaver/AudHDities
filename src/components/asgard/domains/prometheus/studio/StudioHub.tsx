// src/components/asgard/domains/prometheus/studio/StudioHub.tsx
'use client';

import Link from 'next/link';
import { Card } from '@/components/runes/Card';
import { ArrowRight, Music, Palette, Film, Mic, Video, PenTool, Image, Wand2, Download, Sparkles } from 'lucide-react';
import type { CardData } from '@/types/components/runes/card.types';

const STUDIOS = [
  { title: 'Music Studio', description: 'Where sound becomes substance', href: '/studio/music', icon: Music, color: 'text-purple-400', bg: 'bg-purple-500/10' },
  { title: 'Art Studio', description: 'Where vision takes form', href: '/studio/art', icon: Palette, color: 'text-pink-400', bg: 'bg-pink-500/10' },
  { title: 'Animation Studio', description: 'Where stillness learns to dance', href: '/studio/animation', icon: Film, color: 'text-amber-400', bg: 'bg-amber-500/10' },
  { title: 'Audio Studio', description: 'Where silence finds its voice', href: '/studio/audio', icon: Mic, color: 'text-emerald-400', bg: 'bg-emerald-500/10' },
  { title: 'Video Studio', description: 'Where moments become eternal', href: '/studio/video', icon: Video, color: 'text-rose-400', bg: 'bg-rose-500/10' },
  { title: 'Writing Studio', description: 'Where words weave worlds', href: '/studio/writing', icon: PenTool, color: 'text-cyan-400', bg: 'bg-cyan-500/10' },
  { title: 'Graphics Lab', description: 'Where images transform', href: '/studio/graphics', icon: Image, color: 'text-teal-400', bg: 'bg-teal-500/10' },
  { title: 'Effects Lab', description: 'Where magic is engineered', href: '/studio/effects', icon: Wand2, color: 'text-violet-400', bg: 'bg-violet-500/10' },
  { title: 'The Gateway', description: 'Where creations enter the world', href: '/studio/export', icon: Download, color: 'text-neurospark', bg: 'bg-neurospark/10' },
];

export function StudioHub() {
  return (
    <main className="min-h-screen py-12">
      <div className="container max-w-6xl mx-auto px-6">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-neurospark/10 px-4 py-2 rounded-full mb-4">
            <Sparkles size={14} className="text-neurospark" />
            <span className="text-neurospark text-sm">The Creative Realm</span>
          </div>
          <h1 className="text-3xl font-bold text-star-dust mb-4">The Loom</h1>
          <p className="text-lg text-star-dust/60 max-w-xl mx-auto">
            Every creation begins with a single thread. Choose your instrument and weave something sovereign.
          </p>
        </div>

        <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {STUDIOS.map((studio) => {
            const cd: CardData = { id: studio.href, type: 'value', title: studio.title, value: studio.description };
            return (
              <Link key={studio.href} href={studio.href} className="group">
                <Card data={cd} variant="interactive" radius="lg" shadow="sm" className="p-6 h-full">
                  <div className={`w-12 h-12 ${studio.bg} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                    <studio.icon className={studio.color} size={24} />
                  </div>
                  <h3 className="text-lg font-semibold text-star-dust mb-2 group-hover:text-neurospark transition-colors">{studio.title}</h3>
                  <p className="text-sm text-star-dust/50 mb-4">{studio.description}</p>
                  <span className="flex items-center gap-1 text-xs text-neurospark opacity-0 group-hover:opacity-100 transition-opacity">Enter <ArrowRight size={12} /></span>
                </Card>
              </Link>
            );
          })}
        </div>
      </div>
    </main>
  );
}