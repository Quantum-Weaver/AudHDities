// src/components/asgard/domains/hermes/creations/CreationDetail.tsx
// Wares edition (2026-07-31): the three-tier price grid died with the
// products table â€” one base price + pricing_model, solidarity pricing
// computed server-side at the Exchange (the buyer sees the split there:
// PriceBreakdown is this realm's protected feature). The exchange verbs
// are the realm's ceremony: Receive (freely) Â· Bring home (exchanged).
// The plain stall (2026-08-01, KP's ruling via the E4 study): the square
// is quiet; HERE the price speaks plainly with the split beside it. And
// when the last has gone home, the stall says so in the settled register
// â€” never a countdown on the way down.
'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { Card } from '@/components/runes/Card';
import { Badge } from '@/components/runes/Badge';
import { Button } from '@/components/yggdrasil/Button';
import { Skeleton } from '@/components/runes/Skeleton';
import { CheckoutButton } from '@/components/asgard/domains/hermes/checkout/CheckoutButton';
import { PriceBreakdown } from '@/components/asgard/domains/hermes/checkout/PriceBreakdown';
import { formatPrice } from '@/lib/utils/components/runes/card.utils';
import { ArrowLeft, Package, TrendingUp } from 'lucide-react';
import type { CardData } from '@/types/components/runes/card.types';
import type { Tables } from '@/lib/generated/supabase/database.helpers.js';

type WareItem = Tables<'wares'>;

const TYPE_LABELS: Record<string, string> = {
  physical: 'Physical', digital: 'Digital', service: 'Service',
};

function priceLabel(ware: WareItem): string {
  if (ware.pricing_model === 'free') return 'Freely given';
  if (ware.pricing_model === 'patronage_only') return 'Through patronage';
  if (ware.price === null || ware.price <= 0) return 'â€”';
  const base = formatPrice(ware.price) ?? 'â€”';
  return ware.pricing_model === 'pay_what_you_want' ? `${base}+` : base;
}

const FORMAT_LABELS: Record<string, string> = { android: 'Android', pc: 'PC' };

function formatsOf(ware: WareItem): string[] {
  const meta = ware.metadata;
  if (!meta || typeof meta !== 'object' || Array.isArray(meta)) return [];
  const formats = (meta as Record<string, unknown>).formats;
  if (!Array.isArray(formats)) return [];
  return formats.filter((f): f is string => typeof f === 'string');
}

export function CreationDetail() {
  const params = useParams();
  const router = useRouter();
  const [ware, setWare] = useState<WareItem | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`/api/generated/plutus-economics/wares/${params.id}`)
      .then((r) => r.json())
      .then((result) => { if (result.success) setWare(result.data); })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [params.id]);

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
          <Package className="h-12 w-12 text-star-dust/20 mx-auto mb-4" />
          <p className="text-star-dust/40">This work has been unwoven.</p>
          <Link href="/bazaar/creations" className="text-neurospark hover:underline mt-4 inline-block">Return to the Tapestry</Link>
        </div>
      </main>
    );
  }

  const cardData: CardData = { id: ware.id, type: 'product', title: ware.name, description: ware.description || '' };
  const soldOut = ware.quantity_available !== null && ware.quantity_available <= 0;

  return (
    <main className="min-h-screen py-12">
      <div className="container max-w-3xl mx-auto px-6">
        <Link href="/bazaar/creations" className="flex items-center gap-2 text-star-dust/60 hover:text-star-dust transition-colors text-sm mb-6">
          <ArrowLeft className="h-4 w-4" />Return to the Tapestry
        </Link>

        <Card data={cardData} variant="sanctuary" radius="xl" shadow="md" className="p-8">
          <div className="flex items-center gap-2 mb-4">
            <Badge variant="outline" size="sm" className="text-[10px] capitalize">{TYPE_LABELS[ware.ware_type] || ware.ware_type}</Badge>
            {ware.icon_emoji && <span aria-hidden>{ware.icon_emoji}</span>}
          </div>
          <h1 className="text-2xl font-bold text-star-dust mb-4">{ware.name}</h1>
          {ware.description && <p className="text-star-dust/70 leading-relaxed mb-6">{ware.description}</p>}

          {formatsOf(ware).length > 0 && (
            <p className="text-xs text-star-dust/40 mb-6">
              Available for {formatsOf(ware).map((f) => FORMAT_LABELS[f] || f).join(' Â· ')}
            </p>
          )}

          <div className="bg-white/5 border border-white/10 rounded-xl p-5 mb-6 text-center">
            <p className="text-xs text-star-dust/40 mb-1">
              {ware.pricing_model === 'pay_what_you_want' ? 'From' : ''}
            </p>
            <p className="text-neurospark font-bold text-2xl">{priceLabel(ware)}</p>
            {ware.pricing_model === 'fixed' && (
              <p className="text-xs text-star-dust/40 mt-2">Solidarity pricing applied at the Exchange â€” you see the full split before anything is charged</p>
            )}
            {ware.pricing_model === 'pay_what_you_want' && (
              <p className="text-xs text-star-dust/40 mt-2">Pay what you want â€” the split is shown before anything is charged</p>
            )}
          </div>

          {/* The split, beside the price (KP's ruling: the stall speaks plainly) */}
          {(ware.pricing_model === 'fixed' || ware.pricing_model === 'pay_what_you_want') && ware.price !== null && ware.price > 0 && (
            <div className="mb-6">
              <PriceBreakdown
                subtotal={ware.price}
                showResidualPool={!!ware.residual_pool_percent && ware.residual_pool_percent > 0}
                residualPoolPercent={ware.residual_pool_percent ?? 0}
              />
            </div>
          )}

          {ware.residual_pool_percent !== null && ware.residual_pool_percent > 0 && (
            <p className="text-xs text-star-dust/40 text-center flex items-center justify-center gap-1.5 mb-6">
              <TrendingUp className="h-3.5 w-3.5 text-emerald-400" />
              {ware.residual_pool_percent}% flows to the residual pool
            </p>
          )}

          <div className="flex gap-3 mt-6">
            {soldOut ? (
              <p className="text-sm text-star-dust/60 italic">
                These have all gone home â€” the maker may weave more.
              </p>
            ) : ware.pricing_model === 'free' ? (
              <Button variant="primary" size="md">Receive</Button>
            ) : (
              <CheckoutButton product={ware} size="md" />
            )}
            <Button variant="ghost" size="md" onClick={() => router.back()}>Back</Button>
          </div>
        </Card>
      </div>
    </main>
  );
}
