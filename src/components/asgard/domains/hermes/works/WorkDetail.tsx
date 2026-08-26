// src/components/asgard/domains/hermes/works/WorkDetail.tsx
'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { Card } from '@/components/runes/Card';
import { Badge } from '@/components/runes/Badge';
import { Skeleton } from '@/components/runes/Skeleton';
import { ArrowLeft, Package, ExternalLink } from 'lucide-react';
import type { CardData } from '@/types/components/runes/card.types';
import type { Tables } from '@/lib/generated/supabase/database.helpers.js';
import { useUser } from '@/lib/hooks/useUser';

type WorkRow = Tables<'works'>;
type Participant = Tables<'work_participants'>;
type ArtisanProfile = Tables<'artisan_profiles'>;

const WORK_TYPE_LABELS: Record<string, string> = {
  music: 'Music', writing: 'Writing', vision: 'Vision',
  performance: 'Performance', code: 'Code', other: 'Other',
};

export function WorkDetail() {
  const params = useParams();
  const [work, setWork] = useState<WorkRow | null>(null);
  const [participants, setParticipants] = useState<Participant[]>([]);
  const [maker, setMaker] = useState<ArtisanProfile | null>(null);
  const { user } = useUser();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let alive = true;
    fetch(`/api/generated/hermes-social/works/${params.id}`)
      .then((r) => r.json())
      .then((result) => { if (alive && result.success) setWork(result.data); })
      .catch(console.error)
      .finally(() => { if (alive) setLoading(false); });
    return () => { alive = false; };
  }, [params.id]);

  useEffect(() => {
    let alive = true;
    fetch(`/api/generated/hermes-social/work_participants?work_id=${params.id}`)
      .then((r) => r.json())
      .then((result) => {
        if (!alive || !result?.success) return;
        const rows = result.data?.data || result.data || [];
        setParticipants(Array.isArray(rows) ? rows : []);
      })
      .catch(() => { /* the section simply does not appear */ });
    return () => { alive = false; };
  }, [params.id]);

  useEffect(() => {
    if (!work?.artisan_profile_id) return;
    let alive = true;
    fetch(`/api/generated/hermes-social/artisan_profiles/${work.artisan_profile_id}`)
      .then((r) => r.json())
      .then((result) => { if (alive && result.success) setMaker(result.data); })
      .catch(() => { /* the maker's line simply does not appear */ });
    return () => { alive = false; };
  }, [work?.artisan_profile_id]);

  if (loading) {
    return (
      <main className="min-h-screen py-12">
        <div className="container max-w-3xl mx-auto px-6">
          <Skeleton variant="text" className="h-6 w-32 mb-4" />
          <Skeleton variant="card" className="h-64" />
        </div>
      </main>
    );
  }

  if (!work) {
    return (
      <main className="min-h-screen py-12">
        <div className="container max-w-3xl mx-auto px-6 text-center">
          <Package className="h-12 w-12 text-star-dust/20 mx-auto mb-4" aria-hidden="true" />
          <p className="text-star-dust/40">This work is not on the square.</p>
          <Link href="/bazaar/wares" className="text-neurospark hover:underline mt-4 inline-block">Return to the Tapestry</Link>
        </div>
      </main>
    );
  }

  const cardData: CardData = { id: work.id, type: 'product', title: work.name, description: work.description || '' };
  const shown = participants.filter((p) => p.is_public);
  const isOwner = Boolean(user?.id && work.created_by === user.id);

  return (
    <main className="min-h-screen py-12">
      <div className="container max-w-3xl mx-auto px-6">
        <Link href="/bazaar/wares" className="flex items-center gap-2 text-star-dust/60 hover:text-star-dust transition-colors text-sm mb-6">
          <ArrowLeft className="h-4 w-4" aria-hidden="true" />Return to the Tapestry
        </Link>

        <Card data={cardData} variant="sanctuary" radius="xl" shadow="md" className="p-8">
          <div className="flex items-center gap-2 mb-4">
            <Badge variant="outline" size="sm" className="text-[10px]">
              Work · {WORK_TYPE_LABELS[work.work_type] || work.work_type}
            </Badge>
            {work.icon_emoji && <span aria-hidden="true">{work.icon_emoji}</span>}
          </div>
          <h1 className="text-2xl font-bold text-star-dust mb-2">{work.name}</h1>

          {maker && (
            <p className="text-sm text-star-dust/50 mb-4">
              Made at{' '}
              <Link href={`/bazaar/artisans/${maker.id}`} className="text-neurospark hover:underline">
                {maker.artisan_name}
              </Link>
            </p>
          )}

          {work.description && <p className="text-star-dust/70 leading-relaxed mb-6">{work.description}</p>}

          {work.streaming_url && (
            <p className="mb-6">
              <a
                href={work.streaming_url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm text-neurospark hover:underline"
              >
                Hear it where it lives
                <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
              </a>
            </p>
          )}

          {shown.length > 0 && (
            <section className="mb-6" aria-labelledby="work-participants-heading">
              <h2 id="work-participants-heading" className="text-sm font-semibold text-star-dust mb-2">
                Who stood on this
              </h2>
              <ul className="space-y-1" role="list">
                {shown.map((p) => (
                  <li key={p.id} className="text-sm text-star-dust/60">
                    {p.role || 'contributor'}
                  </li>
                ))}
              </ul>
            </section>
          )}

          <p className="text-sm text-star-dust/50">
            This one is not for sale. It is here because it was made.
          </p>

          {isOwner && (
            <p className="mt-6">
              <Link
                href={`/bazaar/studio/ware?from_work=${work.id}`}
                className="text-sm text-neurospark hover:underline"
              >
                Give this work a body →
              </Link>
            </p>
          )}
        </Card>
      </div>
    </main>
  );
}
