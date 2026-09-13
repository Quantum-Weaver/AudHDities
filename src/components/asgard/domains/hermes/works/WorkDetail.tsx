// src/components/asgard/domains/hermes/works/WorkDetail.tsx
'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { Card } from '@/components/runes/Card';
import { Badge } from '@/components/runes/Badge';
import { Skeleton } from '@/components/runes/Skeleton';
import { CheckoutButton } from '@/components/asgard/domains/hermes/checkout/CheckoutButton';
import { PriceBreakdown } from '@/components/asgard/domains/hermes/checkout/PriceBreakdown';
import { formatMinorUnits } from '@/lib/economics/split';
import { ArrowLeft, Package, ExternalLink, TrendingUp } from 'lucide-react';
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

/** A work carries a price only under the two models the Exchange can cross. */
function isPriced(work: WorkRow): boolean {
  return (
    (work.pricing_model === 'fixed' || work.pricing_model === 'pay_what_you_want') &&
    work.price !== null &&
    work.price > 0
  );
}

function priceLabel(work: WorkRow): string {
  const base = formatMinorUnits(Math.round((work.price ?? 0) * 100));
  return work.pricing_model === 'pay_what_you_want' ? `${base}+` : base;
}

function unpricedLine(work: WorkRow): string {
  if (work.pricing_model === 'free') return 'Gifted. It is here because it was made.';
  if (work.pricing_model === 'patronage_only') return 'This one comes through patronage of its maker.';
  return 'This one is not for sale. It is here because it was made.';
}

export function WorkDetail() {
  const params = useParams();
  const [work, setWork] = useState<WorkRow | null>(null);
  const [participants, setParticipants] = useState<Participant[]>([]);
  const [maker, setMaker] = useState<ArtisanProfile | null>(null);
  const [held, setHeld] = useState<boolean>(false);
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

  useEffect(() => {
    if (!work || !user) return;
    let alive = true;
    fetch(`/api/generated/plutus-economics/exchanges?work_id=${work.id}&status=completed&buyer_id=${user.id}`)
      .then((r) => r.json())
      .then((result) => {
        if (!alive || !result?.success) return;
        const rows = result.data?.data || result.data || [];
        if (Array.isArray(rows) && rows.length > 0) setHeld(true);
      })
      .catch(() => { /* the page simply offers the verb */ });
    return () => { alive = false; };
  }, [work, user]);

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
          <Link href="/bazaar/works" className="text-neurospark hover:underline mt-4 inline-block">Return to the works</Link>
        </div>
      </main>
    );
  }

  const cardData: CardData = { id: work.id, type: 'product', title: work.name, description: work.description || '' };
  const shown = participants.filter((p) => p.is_public);
  const isOwner = Boolean(user?.id && work.created_by === user.id);
  const priced = isPriced(work);

  return (
    <main className="min-h-screen py-12">
      <div className="container max-w-3xl mx-auto px-6">
        <Link href="/bazaar/works" className="flex items-center gap-2 text-star-dust/60 hover:text-star-dust transition-colors text-sm mb-6">
          <ArrowLeft className="h-4 w-4" aria-hidden="true" />Return to the works
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

          {priced ? (
            <>
              <div className="bg-white/5 border border-white/10 rounded-xl p-5 mb-6 text-center">
                <p className="text-xs text-star-dust/40 mb-1">
                  {work.pricing_model === 'pay_what_you_want' ? 'From' : ''}
                </p>
                <p className="text-neurospark font-bold text-2xl">{priceLabel(work)}</p>
                {work.pricing_model === 'fixed' && (
                  <p className="text-xs text-star-dust/40 mt-2">Solidarity pricing applied at the Exchange — you see the full split before anything is charged</p>
                )}
                {work.pricing_model === 'pay_what_you_want' && (
                  <p className="text-xs text-star-dust/40 mt-2">Pay what you want — the split is shown before anything is charged</p>
                )}
              </div>

              <div className="mb-2">
                <PriceBreakdown
                  subtotal={work.price as number}
                  showResidualPool={!!work.residual_pool_percent && work.residual_pool_percent > 0}
                  residualPoolPercent={work.residual_pool_percent ?? 0}
                />
              </div>

              <p className="text-xs text-star-dust/40 mb-6">
                <Link href="/bazaar/checkout" className="hover:underline">
                  How the Exchange works
                </Link>
              </p>

              {work.residual_pool_percent !== null && work.residual_pool_percent > 0 && (
                <p className="text-xs text-star-dust/40 text-center flex items-center justify-center gap-1.5 mb-6">
                  <TrendingUp className="h-3.5 w-3.5 text-sanctuary-green" aria-hidden="true" />
                  {work.residual_pool_percent}% flows to the residual pool
                </p>
              )}

              <div className="flex flex-wrap gap-3 mt-6 items-center">
                {held ? (
                  <p className="text-sm text-star-dust" role="status">This one is already in your keeping.</p>
                ) : (
                  <CheckoutButton product={work} kind="work" size="md" />
                )}
              </div>
            </>
          ) : (
            <p className="text-sm text-star-dust/50">{unpricedLine(work)}</p>
          )}

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
