// src/components/asgard/domains/athena/library/LibraryHub.tsx
'use client';

import Link from 'next/link';
import { Card } from '@/components/runes/Card';
import { BookOpen, Compass, GraduationCap, FileText, Award, Droplets, Puzzle, ArrowRight } from 'lucide-react';
import type { CardData } from '@/types/components/runes/card.types';

const SECTIONS = [
  { title: 'The Path', description: 'Quests that shape your sovereignty', href: '/library/quests', icon: Compass, color: 'text-amber-400', bg: 'bg-amber-500/10' },
  { title: 'The Curriculum', description: 'Structured courses for deep learning', href: '/library/courses', icon: GraduationCap, color: 'text-emerald-400', bg: 'bg-emerald-500/10' },
  { title: 'The Lessons', description: 'Individual lessons across all domains', href: '/library/lessons', icon: FileText, color: 'text-purple-400', bg: 'bg-purple-500/10' },
  { title: 'The Archive', description: 'Mythology, taxonomy, and ancient wisdom', href: '/library/knowledge', icon: BookOpen, color: 'text-entity-curator', bg: 'bg-entity-curator/10' },
  { title: 'The Honors', description: 'Sigils earned through sovereignty', href: '/library/badges', icon: Award, color: 'text-cyan-400', bg: 'bg-cyan-500/10' },
  // 2026-08-25, refine/athena: "Collect bubbles and earn points" retired.
  // "earn points" is pointsification vocabulary, refused by name on E4's
  // column, and it made a hall about a score before you had opened it
  // (REALM-BUS.md:436-440). The replacement is board ①'s own sentence.
  { title: 'The Floating Stars', description: 'Stars drift past. Pop what catches your eye.', href: '/library/bubbles', icon: Droplets, color: 'text-teal-400', bg: 'bg-teal-500/10' },
  { title: 'The Dailies', description: 'Word puzzles drawn from the Grammar', href: '/library/dailies', icon: Puzzle, color: 'text-indigo-400', bg: 'bg-indigo-500/10' },
];

export function LibraryHub() {
  return (
    <main className="min-h-screen py-12">
      <div className="container max-w-6xl mx-auto px-6">
        {/* The pill that read "The Archive" retired 2026-08-25: it named a
            hall that is also the fourth card below, and the h1 already says
            where you are. */}
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-star-dust mb-4">The Library</h1>
          <p className="text-lg text-star-dust/60 max-w-xl mx-auto">
            Seven halls, open. Wander at whatever pace the day allows.
          </p>
        </div>

        <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {SECTIONS.map((s) => {
            const cd: CardData = { id: s.href, type: 'value', title: s.title, value: s.description };
            return (
              <Link
                key={s.href}
                href={s.href}
                aria-label={`${s.title} — ${s.description}`}
                className="group block rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-hearth-gold focus-visible:ring-offset-2 focus-visible:ring-offset-deep-space"
              >
                <Card data={cd} variant="interactive" radius="lg" shadow="sm" className="p-6 h-full">
                  <div className={`w-12 h-12 ${s.bg} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform motion-reduce:transition-none`}>
                    <s.icon className={s.color} size={24} />
                  </div>
                  <h3 className="text-lg font-semibold text-star-dust mb-2 group-hover:text-neurospark transition-colors motion-reduce:transition-none">{s.title}</h3>
                  <p className="text-sm text-star-dust/70 mb-4">{s.description}</p>
                  {/* Always visible, quiet. On a phone the hover-only Explore
                      never appeared at all, and a keyboard walker met a card
                      whose next step was hidden. */}
                  <span className="flex items-center gap-1 text-xs text-neurospark">Explore <ArrowRight size={12} /></span>
                </Card>
              </Link>
            );
          })}
        </div>
      </div>
    </main>
  );
}