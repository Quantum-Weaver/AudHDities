// src/components/asgard/domains/mnemosyne/ancestors/AncestorsCouncil.tsx
'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Card } from '@/components/runes/Card';
import { Badge } from '@/components/runes/Badge';
import { Skeleton } from '@/components/runes/Skeleton';
import { ArrowLeft, Users } from 'lucide-react';
import type { CardData } from '@/types/components/runes/card.types';

interface CouncilHouse {
  council_houses_id: string;
  name: string;
  display_name: string;
  description: string;
  emoji: string;
  color: string;
  primary_domain: string | null;
}

const DOMAIN_LABELS: Record<string, string> = {
  hearth: 'Hearth — Safety & Welcome',
  governance: 'Governance — Structure & Economics',
  vision: 'Vision — Patterns & Prophecy',
  bridge: 'Bridge — Human-AI Collaboration',
  curation: 'Curation — Content & Quality',
  memory: 'Memory — Archives & History',
  storytelling: 'Storytelling — Art & Expression',
  knowledge: 'Knowledge — Learning & Taxonomy',
  boundaries: 'Boundaries — Protection & Justice',
};

export function AncestorsCouncil() {
  const [houses, setHouses] = useState<CouncilHouse[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/generated/themis-governance/council_houses?is_active=true&order=order_index.asc')
      .then(r => r.json()).then(res => { if (res.success) setHouses(res.data?.data || []); }).catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  if (loading) return (<main className="min-h-screen py-12"><div className="container max-w-4xl mx-auto px-6"><Skeleton variant="text" className="h-8 w-48 mb-8" /><div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">{[1,2,3,4,5,6,7,8,9].map(i=><Skeleton key={i} variant="card" className="h-48" />)}</div></div></main>);

  return (
    <main className="min-h-screen py-12">
      <div className="container max-w-4xl mx-auto px-6">
        <Link href="/observatory" className="flex items-center gap-2 text-star-dust/60 hover:text-star-dust transition-colors text-sm mb-6"><ArrowLeft className="h-4 w-4" />Return to the Observatory</Link>
        <h1 className="text-2xl font-bold text-star-dust mb-2">The Council Eternal</h1>
        <p className="text-sm text-star-dust/40 mb-8">The nine sovereign entities who guide the Sanctuary</p>

        <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {houses.map(h => {
            const cd: CardData = { id: h.council_houses_id, type: 'council', title: h.display_name, description: h.description };
            return (
              <Link key={h.council_houses_id} href={`/nexus/council/${h.name}`}>
                <Card data={cd} variant="council" radius="lg" shadow="sm" className="p-6 h-full text-center">
                  <div className="text-5xl mb-4">{h.emoji}</div>
                  <h3 className="text-lg font-bold text-star-dust mb-2">{h.display_name}</h3>
                  <p className="text-sm text-star-dust/50 mb-3 line-clamp-2">{h.description}</p>
                  {h.primary_domain && (
                    <Badge variant="outline" size="sm" className="text-[10px]" style={{ borderColor: h.color, color: h.color }}>
                      {DOMAIN_LABELS[h.primary_domain] || h.primary_domain}
                    </Badge>
                  )}
                </Card>
              </Link>
            );
          })}
        </div>
      </div>
    </main>
  );
}