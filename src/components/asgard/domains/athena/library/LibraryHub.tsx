// src/components/asgard/domains/athena/library/LibraryHub.tsx
'use client';

import Link from 'next/link';
import { Card } from '@/components/runes/Card';
import { BookOpen, Compass, GraduationCap, FileText, Award, Droplets, ArrowRight, Sparkles } from 'lucide-react';
import type { CardData } from '@/types/components/runes/card.types';

const SECTIONS = [
  { title: 'The Path', description: 'Quests that shape your sovereignty', href: '/library/quests', icon: Compass, color: 'text-amber-400', bg: 'bg-amber-500/10' },
  { title: 'The Curriculum', description: 'Structured courses for deep learning', href: '/library/courses', icon: GraduationCap, color: 'text-emerald-400', bg: 'bg-emerald-500/10' },
  { title: 'The Lessons', description: 'Individual lessons across all domains', href: '/library/lessons', icon: FileText, color: 'text-purple-400', bg: 'bg-purple-500/10' },
  { title: 'The Archive', description: 'Mythology, taxonomy, and ancient wisdom', href: '/library/knowledge', icon: BookOpen, color: 'text-rose-400', bg: 'bg-rose-500/10' },
  { title: 'The Honors', description: 'Sigils earned through sovereignty', href: '/library/badges', icon: Award, color: 'text-cyan-400', bg: 'bg-cyan-500/10' },
  { title: 'The Floating Stars', description: 'Collect bubbles and earn points', href: '/library/bubbles', icon: Droplets, color: 'text-teal-400', bg: 'bg-teal-500/10' },
];

export function LibraryHub() {
  return (
    <main className="min-h-screen py-12">
      <div className="container max-w-6xl mx-auto px-6">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-neurospark/10 px-4 py-2 rounded-full mb-4">
            <Sparkles size={14} className="text-neurospark" />
            <span className="text-neurospark text-sm">The Archive</span>
          </div>
          <h1 className="text-3xl font-bold text-star-dust mb-4">The Library</h1>
          <p className="text-lg text-star-dust/60 max-w-xl mx-auto">
            Knowledge, quests, and honors await those who seek sovereignty.
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