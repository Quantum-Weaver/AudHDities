// src/components/asgard/domains/athena/knowledge/KnowledgeGallery.tsx
'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { Card } from '@/components/runes/Card';
import { Badge } from '@/components/runes/Badge';
import { Skeleton } from '@/components/runes/Skeleton';
import { ArrowLeft, BookOpen, Search } from 'lucide-react';
import { useMythologyList } from '@/hooks/generated/athena-gamification/mythology';
import type { CardData } from '@/types/components/runes/card.types';

export function KnowledgeGallery() {
  const [searchTerm, setSearchTerm] = useState('');

  // The Archive reads the returned mythology table (home again at KP's word,
  // 2026-07-29 — docs/sql/005-mythology-returns.sql).
  const { data: scrolls, loading } = useMythologyList({
    filters: { status: 'published' },
    sort: 'display_order',
    order: 'asc',
    limit: 100,
  });

  const filtered = useMemo(() => {
    const term = searchTerm.toLowerCase();
    return scrolls.filter(s =>
      s.name.toLowerCase().includes(term) ||
      (s.description || '').toLowerCase().includes(term) ||
      (s.story || '').toLowerCase().includes(term) ||
      (s.teachings || '').toLowerCase().includes(term)
    );
  }, [scrolls, searchTerm]);

  if (loading) return (<main className="min-h-screen py-12"><div className="container max-w-6xl mx-auto px-6"><Skeleton variant="text" className="h-8 w-48 mb-8" /><div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">{[1,2,3,4,5,6].map(i => <Skeleton key={i} variant="card" className="h-40" />)}</div></div></main>);

  return (
    <main className="min-h-screen py-12"><div className="container max-w-6xl mx-auto px-6">
      <div className="mb-8"><Link href="/library" className="flex items-center gap-2 text-star-dust/60 hover:text-star-dust transition-colors text-sm mb-2"><ArrowLeft className="h-4 w-4" />Return to the Library</Link><h1 className="text-2xl font-bold text-star-dust">The Archive</h1><p className="text-sm text-star-dust/40 mt-1">Mythology, taxonomy, and ancient wisdom</p></div>
      <div className="relative mb-8"><Search className="absolute left-3 top-1/2 -translate-y-1/2 text-star-dust/40" size={16} /><input type="text" placeholder="Search the archive..." value={searchTerm} onChange={e => setSearchTerm(e.target.value)} className="w-full bg-white/5 border border-white/10 rounded-lg pl-10 pr-4 py-2 text-star-dust text-sm placeholder-white/40 focus:border-neurospark focus:outline-none" /></div>
      {filtered.length === 0 && (<div className="text-center py-20"><BookOpen className="h-12 w-12 text-star-dust/20 mx-auto mb-4" /><p className="text-star-dust/40 text-lg">{searchTerm ? 'No scrolls match' : 'The archive awaits its first scrolls'}</p></div>)}
      <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map(s => {
          const cd: CardData = { id: s.id, type: 'value', title: s.name, value: s.myth_type || '' };
          const lede = s.description || s.story || '';
          const preview = lede.length > 100 ? lede.slice(0, 100) + '...' : lede;
          return (
            <Link key={s.id} href={`/library/knowledge/${s.slug}`}><Card data={cd} variant="interactive" radius="lg" shadow="sm" className="p-5 h-full">
              <div className="flex items-center justify-between mb-3">{s.myth_type && <Badge variant="outline" size="sm" className="text-[10px] capitalize">{s.myth_type.replace(/_/g, ' ')}</Badge>}{s.related_entity && <Badge variant="outline" size="sm" className="text-[10px]">{s.related_entity.replace(/_/g, ' ')}</Badge>}</div>
              <h3 className="text-lg font-semibold text-star-dust mb-2">{s.name}</h3><p className="text-sm text-star-dust/50 line-clamp-3">{preview}</p>
            </Card></Link>
          );
        })}
      </div>
    </div></main>
  );
}
