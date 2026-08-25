// src/components/asgard/domains/athena/knowledge/KnowledgeDetail.tsx
'use client';

import { useMemo } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { Card } from '@/components/runes/Card';
import { Badge } from '@/components/runes/Badge';
import { Button } from '@/components/yggdrasil/Button';
import { Skeleton } from '@/components/runes/Skeleton';
import { ArrowLeft, BookOpen } from 'lucide-react';
import { useMythologyList } from '@/lib/generated/hooks/athena-gamification/mythology';
import type { CardData } from '@/types/components/runes/card.types';

export function KnowledgeDetail() {
  const params = useParams();
  const router = useRouter();
  const slug = typeof params.slug === 'string' ? params.slug : '';

  // Memoized on the slug — the generated hooks refetch on params identity.
  const scrollParams = useMemo(() => ({ filters: { slug }, limit: 1 }), [slug]);
  const { data: scrolls, loading } = useMythologyList(scrollParams);
  const scroll = scrolls[0] ?? null;

  if (loading) return (<main className="min-h-screen py-12"><div className="container max-w-3xl mx-auto px-6"><Skeleton variant="text" className="h-6 w-32 mb-4" /><Skeleton variant="card" className="h-64" /></div></main>);
  if (!scroll) return (<main className="min-h-screen py-12"><div className="container max-w-3xl mx-auto px-6 text-center"><BookOpen className="h-12 w-12 text-star-dust/20 mx-auto mb-4" /><p className="text-star-dust/40">This scroll has not been written yet.</p><Link href="/library/knowledge" className="text-neurospark hover:underline mt-4 inline-block">Return to the Archive</Link></div></main>);

  const cd: CardData = { id: scroll.id, type: 'value', title: scroll.name, value: scroll.myth_type || '' };

  return (
    <main className="min-h-screen py-12"><div className="container max-w-3xl mx-auto px-6">
      <Link href="/library/knowledge" className="flex items-center gap-2 text-star-dust/60 hover:text-star-dust transition-colors text-sm mb-6"><ArrowLeft className="h-4 w-4" />Return to the Archive</Link>
      <Card data={cd} variant="sanctuary" radius="xl" shadow="md" className="p-8">
        <div className="flex items-center gap-3 mb-4">{scroll.myth_type && <Badge variant="outline" size="sm" className="text-[10px] capitalize">{scroll.myth_type.replace(/_/g, ' ')}</Badge>}{scroll.related_entity && <Badge variant="outline" size="sm" className="text-[10px]">{scroll.related_entity.replace(/_/g, ' ')}</Badge>}</div>
        <h1 className="text-2xl font-bold text-star-dust mb-4">{scroll.name}</h1>
        {scroll.description && <p className="text-star-dust/60 italic leading-relaxed mb-6">{scroll.description}</p>}
        {scroll.story && <div className="prose prose-invert max-w-none mb-6"><p className="text-star-dust/70 leading-relaxed whitespace-pre-wrap">{scroll.story}</p></div>}
        {scroll.teachings && (
          <div className="bg-white/5 rounded-xl p-4 mb-6">
            <h3 className="text-sm font-medium text-star-dust/60 mb-2">What the telling carries</h3>
            <p className="text-star-dust/70 text-sm whitespace-pre-wrap">{scroll.teachings}</p>
          </div>
        )}
        {/* Provenance on every claim is a ground-file law, and this line was
            the least readable text in the realm (11px at /35 = 2.69:1).
            Drawn at 11.5px and /78 = 8.99:1. */}
        {scroll.provenance && (
          <p className="text-[11.5px] text-star-dust/78 leading-relaxed border-t border-white/5 pt-4 mb-6">
            <span className="text-star-dust/78">Provenance:</span> {scroll.provenance}
          </p>
        )}
        <Button variant="ghost" size="md" onClick={() => router.back()}>Back</Button>
      </Card>
    </div></main>
  );
}
