// src/components/asgard/domains/athena/knowledge/KnowledgeDetail.tsx
'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { Card } from '@/components/runes/Card';
import { Badge } from '@/components/runes/Badge';
import { Button } from '@/components/yggdrasil/Button';
import { Skeleton } from '@/components/runes/Skeleton';
import { ArrowLeft, BookOpen } from 'lucide-react';
import type { CardData } from '@/types/components/runes/card.types';

interface KnowledgeItem {
  knowledge_id: string; title: string; content: string; slug: string;
  type: string; house: string | null; author_id: string;
}

export function KnowledgeDetail() {
  const params = useParams(); const router = useRouter();
  const [item, setItem] = useState<KnowledgeItem | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`/api/generated/mnemosyne-assessment/mythology?slug=eq.${params.slug}&limit=1`)
      .then(r => r.json()).then(result => { const items = result.data?.data || result.data || []; if (items.length) setItem(items[0]); })
      .catch(console.error).finally(() => setLoading(false));
  }, [params.slug]);

  if (loading) return (<main className="min-h-screen py-12"><div className="container max-w-3xl mx-auto px-6"><Skeleton variant="text" className="h-6 w-32 mb-4" /><Skeleton variant="card" className="h-64" /></div></main>);
  if (!item) return (<main className="min-h-screen py-12"><div className="container max-w-3xl mx-auto px-6 text-center"><BookOpen className="h-12 w-12 text-star-dust/20 mx-auto mb-4" /><p className="text-star-dust/40">This scroll has not been written yet.</p><Link href="/library/knowledge" className="text-neurospark hover:underline mt-4 inline-block">Return to the Archive</Link></div></main>);

  const cd: CardData = { id: item.knowledge_id, type: 'value', title: item.title, value: item.type };

  return (
    <main className="min-h-screen py-12"><div className="container max-w-3xl mx-auto px-6">
      <Link href="/library/knowledge" className="flex items-center gap-2 text-star-dust/60 hover:text-star-dust transition-colors text-sm mb-6"><ArrowLeft className="h-4 w-4" />Return to the Archive</Link>
      <Card data={cd} variant="sanctuary" radius="xl" shadow="md" className="p-8">
        <div className="flex items-center gap-3 mb-4"><Badge variant="outline" size="sm" className="text-[10px] capitalize">{item.type}</Badge>{item.house && <Badge variant="outline" size="sm" className="text-[10px]">{item.house.replace(/_/g, ' ')}</Badge>}</div>
        <h1 className="text-2xl font-bold text-star-dust mb-4">{item.title}</h1>
        <div className="prose prose-invert max-w-none"><p className="text-star-dust/70 leading-relaxed whitespace-pre-wrap">{item.content}</p></div>
        <Button variant="ghost" size="md" className="mt-6" onClick={() => router.back()}>Back</Button>
      </Card>
    </div></main>
  );
}