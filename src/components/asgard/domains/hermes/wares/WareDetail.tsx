// src/components/asgard/domains/hermes/wares/WareDetail.tsx
'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { Card } from '@/components/runes/Card';
import { Badge } from '@/components/runes/Badge';
import { Skeleton } from '@/components/runes/Skeleton';
import { CheckoutButton } from '@/components/asgard/domains/hermes/checkout/CheckoutButton';
import { PriceBreakdown } from '@/components/asgard/domains/hermes/checkout/PriceBreakdown';
import { TheBodies } from '@/components/asgard/domains/hermes/wares/TheBodies';
import { formatMinorUnits } from '@/lib/economics/split';
import { recurrenceOf, intervalPhrase } from '@/lib/economics/recurrence';
import { ArrowLeft, Package, TrendingUp } from 'lucide-react';
import type { CardData } from '@/types/components/runes/card.types';
import type { Tables } from '@/lib/generated/supabase/database.helpers.js';

type WareItem = Tables<'wares'>;
type ArtisanProfile = Tables<'artisan_profiles'>;

const TYPE_LABELS: Record<string, string> = {
  physical: 'Physical', digital: 'Digital', service: 'Service',
};

function priceLabel(ware: WareItem): string {
  if (ware.pricing_model === 'free') return 'Gifted';
  if (ware.pricing_model === 'patronage_only') return 'Through patronage';
  if (ware.price === null || ware.price <= 0) return 'Price not set';
  const base = formatMinorUnits(Math.round(ware.price * 100));
  return ware.pricing_model === 'pay_what_you_want' ? `${base}+` : base;
}

export function WareDetail() {
  const params = useParams();
  const [ware, setWare] = useState<WareItem | null>(null);
  const [maker, setMaker] = useState<ArtisanProfile | null>(null);
  const [standing, setStanding] = useState<boolean>(false);
  const [held, setHeld] = useState<boolean>(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let alive = true;
    fetch(`/api/generated/plutus-economics/wares/${params.id}`)
      .then((r) => r.json())
      .then((result) => { if (alive && result.success) setWare(result.data); })
      .catch(console.error)
      .finally(() => { if (alive) setLoading(false); });
    return () => { alive = false; };
  }, [params.id]);

  useEffect(() => {
    if (!ware?.artisan_profile_id) return;
    let alive = true;
    fetch(`/api/generated/hermes-social/artisan_profiles/${ware.artisan_profile_id}`)
      .then((r) => r.json())
      .then((result) => { if (alive && result.success) setMaker(result.data); })
      .catch(() => { /* the maker's line simply does not appear */ });
    return () => { alive = false; };
  }, [ware?.artisan_profile_id]);

  useEffect(() => {
    if (!ware) return;
    let alive = true;
    fetch(`/api/generated/plutus-economics/exchanges?ware_id=${ware.id}&status=completed`)
      .then((r) => r.json())
      .then((result) => {
        if (!alive || !result?.success) return;
        const rows = result.data?.data || result.data || [];
        if (Array.isArray(rows) && rows.length > 0) {
          setHeld(true);
          if (recurrenceOf(ware)) setStanding(true);
        }
      })
      .catch(() => { /* the page simply offers the verb */ });
    return () => { alive = false; };
  }, [ware]);

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

  if (!ware) {
    return (
      <main className="min-h-screen py-12">
        <div className="container max-w-3xl mx-auto px-6 text-center">
          <Package className="h-12 w-12 text-star-dust/20 mx-auto mb-4" aria-hidden="true" />
          <p className="text-star-dust/40">This work has been unwoven.</p>
          <Link href="/bazaar/wares" className="text-neurospark hover:underline mt-4 inline-block">Return to the Tapestry</Link>
        </div>
      </main>
    );
  }

  const cardData: CardData = { id: ware.id, type: 'product', title: ware.name, description: ware.description || '' };
  const settled = ware.quantity_available !== null && ware.quantity_available <= 0;
  const recurrence = recurrenceOf(ware);
  const isGifted = ware.pricing_model === 'free';
  const showsSplit =
    (ware.pricing_model === 'fixed' || ware.pricing_model === 'pay_what_you_want') &&
    ware.price !== null && ware.price > 0;

  return (
    <main className="min-h-screen py-12">
      <div className="container max-w-3xl mx-auto px-6">
        <Link href="/bazaar/wares" className="flex items-center gap-2 text-star-dust/60 hover:text-star-dust transition-colors text-sm mb-6">
          <ArrowLeft className="h-4 w-4" aria-hidden="true" />Return to the Tapestry
        </Link>

        <Card data={cardData} variant="sanctuary" radius="xl" shadow="md" className="p-8">
          <div className="flex items-center gap-2 mb-4">
            <Badge variant="outline" size="sm" className="text-[10px]">
              Ware · {TYPE_LABELS[ware.ware_type] || ware.ware_type}
            </Badge>
            {ware.icon_emoji && <span aria-hidden="true">{ware.icon_emoji}</span>}
          </div>
          <h1 className="text-2xl font-bold text-star-dust mb-2">{ware.name}</h1>

          {maker && (
            <p className="text-sm text-star-dust/50 mb-4">
              Made at{' '}
              <Link href={`/bazaar/artisans/${maker.id}`} className="text-neurospark hover:underline">
                {maker.artisan_name}
              </Link>
            </p>
          )}

          {ware.description && <p className="text-star-dust/70 leading-relaxed mb-6">{ware.description}</p>}

          <div className="bg-white/5 border border-white/10 rounded-xl p-5 mb-6 text-center">
            <p className="text-xs text-star-dust/40 mb-1">
              {ware.pricing_model === 'pay_what_you_want' ? 'From' : ''}
            </p>
            <p className="text-neurospark font-bold text-2xl">
              {priceLabel(ware)}
              {recurrence && (
                <span className="text-base font-normal text-star-dust/60"> {intervalPhrase(recurrence.interval)}</span>
              )}
            </p>
            {isGifted && (
              <p className="text-xs text-star-dust/40 mt-2">No exchange. It is yours.</p>
            )}
            {ware.pricing_model === 'fixed' && !isGifted && (
              <p className="text-xs text-star-dust/40 mt-2">Solidarity pricing applied at the Exchange — you see the full split before anything is charged</p>
            )}
            {ware.pricing_model === 'pay_what_you_want' && (
              <p className="text-xs text-star-dust/40 mt-2">Pay what you want — the split is shown before anything is charged</p>
            )}
            {recurrence && (
              <p className="text-xs text-star-dust/40 mt-2">
                It renews {intervalPhrase(recurrence.interval)} until you end it, and ending it takes
                one press. Nothing is charged before a renewal and nothing is charged after it ends.
              </p>
            )}
          </div>

          {showsSplit && (
            <div className="mb-2">
              <PriceBreakdown
                subtotal={ware.price as number}
                showResidualPool={!!ware.residual_pool_percent && ware.residual_pool_percent > 0}
                residualPoolPercent={ware.residual_pool_percent ?? 0}
              />
            </div>
          )}

          {showsSplit && (
            <p className="text-xs text-star-dust/40 mb-6">
              <Link href="/bazaar/checkout" className="hover:underline">
                How the Exchange works
              </Link>
            </p>
          )}

          {ware.residual_pool_percent !== null && ware.residual_pool_percent > 0 && (
            <p className="text-xs text-star-dust/40 text-center flex items-center justify-center gap-1.5 mb-6">
              <TrendingUp className="h-3.5 w-3.5 text-sanctuary-green" aria-hidden="true" />
              {ware.residual_pool_percent}% flows to the residual pool
            </p>
          )}

          <div className="flex flex-wrap gap-3 mt-6 items-center">
            {standing ? (
              <>
                <p className="text-sm text-star-dust" role="status">You are standing with this.</p>
                <Link href="/vessel/home" className="text-sm text-neurospark hover:underline">End it</Link>
                <Link href="/bazaar/wares" className="text-sm text-neurospark hover:underline">Change the rung</Link>
              </>
            ) : settled ? (
              <p className="text-sm text-star-dust/60 italic">
                These have all gone home — the maker may weave more.
              </p>
            ) : isGifted ? (
              <p className="text-sm text-star-dust/60">Take it below — nothing is exchanged.</p>
            ) : held ? (
              <p className="text-sm text-star-dust" role="status">This one is already in your keeping.</p>
            ) : (
              <CheckoutButton product={ware} size="md" />
            )}
          </div>

          {(isGifted || held) && <TheBodies wareId={ware.id} />}
        </Card>
      </div>
    </main>
  );
}
