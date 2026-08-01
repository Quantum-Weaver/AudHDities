// src/components/asgard/domains/athena/lessons/LessonsGallery.tsx
'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { Card } from '@/components/runes/Card';
import { Badge } from '@/components/runes/Badge';
import { Skeleton } from '@/components/runes/Skeleton';
import { ArrowLeft, FileText, Search, Clock } from 'lucide-react';
import { useLessonsList } from '@/hooks/generated/athena-gamification/lessons';
import type { CardData } from '@/types/components/runes/card.types';

// content_type became lesson_type in the evolved dialect; same palette.
const TYPE_COLORS: Record<string, string> = {
  text: 'bg-slate-500/20 text-slate-400', video: 'bg-cyan-500/20 text-cyan-400',
  audio: 'bg-purple-500/20 text-purple-400', interactive: 'bg-emerald-500/20 text-emerald-400',
  quiz: 'bg-amber-500/20 text-amber-400',
};

// Stable params — the generated list hooks refetch on params IDENTITY
// (the StatusBar pattern); an inline object here would loop the fetch.
const LESSONS_PARAMS = {
  filters: { status: 'published' },
  sort: 'display_order',
  order: 'asc' as const,
  limit: 100,
};

export function LessonsGallery() {
  const [searchTerm, setSearchTerm] = useState('');

  const { data: lessons, loading } = useLessonsList(LESSONS_PARAMS);

  const filtered = useMemo(() => lessons.filter(l => l.name.toLowerCase().includes(searchTerm.toLowerCase()) || (l.description || '').toLowerCase().includes(searchTerm.toLowerCase())), [lessons, searchTerm]);

  if (loading) return (<main className="min-h-screen py-12"><div className="container max-w-6xl mx-auto px-6"><Skeleton variant="text" className="h-8 w-48 mb-8" /><div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">{[1,2,3,4,5,6].map(i => <Skeleton key={i} variant="card" className="h-40" />)}</div></div></main>);

  return (
    <main className="min-h-screen py-12"><div className="container max-w-6xl mx-auto px-6">
      <div className="mb-8"><Link href="/library" className="flex items-center gap-2 text-star-dust/60 hover:text-star-dust transition-colors text-sm mb-2"><ArrowLeft className="h-4 w-4" />Return to the Library</Link><h1 className="text-2xl font-bold text-star-dust">The Lessons</h1><p className="text-sm text-star-dust/40 mt-1">Individual lessons across all domains</p></div>
      <div className="relative mb-8"><Search className="absolute left-3 top-1/2 -translate-y-1/2 text-star-dust/40" size={16} /><input type="text" placeholder="Search lessons..." value={searchTerm} onChange={e => setSearchTerm(e.target.value)} className="w-full bg-white/5 border border-white/10 rounded-lg pl-10 pr-4 py-2 text-star-dust text-sm placeholder-white/40 focus:border-neurospark focus:outline-none" /></div>
      {filtered.length === 0 && (<div className="text-center py-20"><FileText className="h-12 w-12 text-star-dust/20 mx-auto mb-4" /><p className="text-star-dust/40 text-lg">{searchTerm ? 'No lessons match' : 'The lessons are being prepared'}</p></div>)}
      <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map(l => {
          const cd: CardData = { id: l.id, type: 'value', title: l.name, value: l.lesson_type || '' };
          return (
            <Link key={l.id} href={`/library/lessons/${l.slug}`}><Card data={cd} variant="interactive" radius="lg" shadow="sm" className="p-5 h-full">
              <div className="flex items-center justify-between mb-3">{l.lesson_type && <Badge variant="outline" size="sm" className={`text-[10px] capitalize ${TYPE_COLORS[l.lesson_type] || ''}`}>{l.lesson_type.replace(/_/g, ' ')}</Badge>}{l.estimated_duration && <span className="flex items-center gap-1 text-xs text-star-dust/40"><Clock size={12} />{l.estimated_duration}</span>}</div>
              <h3 className="text-lg font-semibold text-star-dust mb-2">{l.name}</h3><p className="text-sm text-star-dust/50 line-clamp-2">{l.description}</p>
            </Card></Link>
          );
        })}
      </div>
    </div></main>
  );
}
