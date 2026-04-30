// src/components/asgard/domains/hermes/creators/CreatorDetail.tsx
'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { Card } from '@/components/runes/Card';
import { Badge } from '@/components/runes/Badge';
import { Avatar, AvatarFallback } from '@/components/runes/Avatar';
import { Button } from '@/components/yggdrasil/Button';
import { Skeleton } from '@/components/runes/Skeleton';
import { ArrowLeft, Shield, Package, Globe } from 'lucide-react';
import type { CardData } from '@/types/components/runes/card.types';

interface CreatorItem {
  creators_id: string; creator_moniker: string; creative_description: string | null;
  creative_categories: string[] | null; portfolio_url: string | null;
  verification_status: string | null; verified_badge: boolean | null;
  total_products: number | null; total_sales: number | null;
  total_earnings: number | null; default_residual_pool: number | null;
}

export function CreatorDetail() {
  const params = useParams();
  const router = useRouter();
  const [creator, setCreator] = useState<CreatorItem | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`/api/generated/hestia-core/creator_profiles/${params.id}`)
      .then((r) => r.json())
      .then((result) => { if (result.success) setCreator(result.data); })
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

  if (!creator) {
    return (
      <main className="min-h-screen py-12">
        <div className="container max-w-3xl mx-auto px-6 text-center">
          <p className="text-star-dust/40">This weaver has not yet arrived.</p>
          <Link href="/bazaar/creators" className="text-neurospark hover:underline mt-4 inline-block">Return to the Weavers</Link>
        </div>
      </main>
    );
  }

  const cardData: CardData = { id: creator.creators_id, type: 'creator', title: creator.creator_moniker, description: creator.creative_description || '' };

  return (
    <main className="min-h-screen py-12">
      <div className="container max-w-3xl mx-auto px-6">
        <Link href="/bazaar/creators" className="flex items-center gap-2 text-star-dust/60 hover:text-star-dust transition-colors text-sm mb-6">
          <ArrowLeft className="h-4 w-4" />Return to the Weavers
        </Link>

        <Card data={cardData} variant="sanctuary" radius="xl" shadow="md" className="p-8">
          <div className="flex items-center gap-4 mb-6">
            <Avatar size="2xl">
              <AvatarFallback>{creator.creator_moniker?.charAt(0)?.toUpperCase() || 'C'}</AvatarFallback>
            </Avatar>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-2xl font-bold text-star-dust">{creator.creator_moniker}</h1>
                {creator.verified_badge && <Shield size={18} className="text-neurospark" />}
              </div>
              <p className="text-sm text-star-dust/40">Creator</p>
            </div>
          </div>

          {creator.creative_description && (
            <p className="text-star-dust/70 leading-relaxed mb-6">{creator.creative_description}</p>
          )}

          {creator.creative_categories && creator.creative_categories.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-6">
              {creator.creative_categories.map((cat) => (
                <Badge key={cat} variant="outline" size="sm" className="text-[10px] capitalize">{cat}</Badge>
              ))}
            </div>
          )}

          <div className="grid grid-cols-3 gap-4 mb-6">
            {creator.total_products !== null && (
              <div className="bg-white/5 border border-white/10 rounded-xl p-4 text-center">
                <Package className="h-5 w-5 text-neurospark mx-auto mb-1" />
                <p className="text-neurospark font-bold text-lg">{creator.total_products}</p>
                <p className="text-xs text-star-dust/40">Creations</p>
              </div>
            )}
            {creator.total_sales !== null && (
              <div className="bg-white/5 border border-white/10 rounded-xl p-4 text-center">
                <Shield className="h-5 w-5 text-emerald-400 mx-auto mb-1" />
                <p className="text-emerald-400 font-bold text-lg">{creator.total_sales}</p>
                <p className="text-xs text-star-dust/40">Sales</p>
              </div>
            )}
            {creator.default_residual_pool !== null && (
              <div className="bg-white/5 border border-white/10 rounded-xl p-4 text-center">
                <span className="text-purple-400 font-bold text-lg block mb-1">{creator.default_residual_pool}%</span>
                <p className="text-xs text-star-dust/40">Residual Pool</p>
              </div>
            )}
          </div>

          {creator.portfolio_url && (
            <a href={creator.portfolio_url} target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm text-neurospark hover:underline mb-6">
              <Globe size={14} />{creator.portfolio_url}
            </a>
          )}

          <Button variant="ghost" size="md" onClick={() => router.back()}>Back</Button>
        </Card>
      </div>
    </main>
  );
}