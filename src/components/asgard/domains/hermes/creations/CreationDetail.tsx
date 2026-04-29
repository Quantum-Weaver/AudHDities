// src/components/asgard/domains/hermes/creations/CreationDetail.tsx
'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { Card } from '@/components/runes/Card';
import { Badge } from '@/components/runes/Badge';
import { Button } from '@/components/yggdrasil/Button';
import { Skeleton } from '@/components/runes/Skeleton';
import { ArrowLeft, Package, Shield, Users } from 'lucide-react';
import type { CardData } from '@/types/components/runes/card.types';

interface ProductItem {
  id: string; title: string; description: string | null; product_type: string;
  price_community: number | null; price_ally: number | null; price_corporate: number | null;
  creator_id: string; residual_pool_percent: number | null;
}

const TYPE_LABELS: Record<string, string> = {
  digital_course: 'Course', digital_download: 'Download', physical_product: 'Physical',
  audio: 'Audio', video: 'Video', music: 'Music',
};

export function CreationDetail() {
  const params = useParams();
  const router = useRouter();
  const [product, setProduct] = useState<ProductItem | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`/api/generated/plutus-economics/products/${params.id}`)
      .then((r) => r.json())
      .then((result) => { if (result.success) setProduct(result.data); })
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

  if (!product) {
    return (
      <main className="min-h-screen py-12">
        <div className="container max-w-3xl mx-auto px-6 text-center">
          <Package className="h-12 w-12 text-star-dust/20 mx-auto mb-4" />
          <p className="text-star-dust/40">This creation has been unwoven.</p>
          <Link href="/bazaar/creations" className="text-neurospark hover:underline mt-4 inline-block">Return to the Tapestry</Link>
        </div>
      </main>
    );
  }

  const cardData: CardData = { id: product.id, type: 'product', title: product.title, description: product.description || '' };

  return (
    <main className="min-h-screen py-12">
      <div className="container max-w-3xl mx-auto px-6">
        <Link href="/bazaar/creations" className="flex items-center gap-2 text-star-dust/60 hover:text-star-dust transition-colors text-sm mb-6">
          <ArrowLeft className="h-4 w-4" />Return to the Tapestry
        </Link>

        <Card data={cardData} variant="sanctuary" radius="xl" shadow="md" className="p-8">
          <Badge variant="outline" size="sm" className="text-[10px] capitalize mb-4">{TYPE_LABELS[product.product_type] || product.product_type}</Badge>
          <h1 className="text-2xl font-bold text-star-dust mb-4">{product.title}</h1>
          {product.description && <p className="text-star-dust/70 leading-relaxed mb-6">{product.description}</p>}

          <div className="grid grid-cols-3 gap-4 mb-6">
            {product.price_community && (
              <div className="bg-emerald-500/5 border border-emerald-500/20 rounded-xl p-4 text-center">
                <Users className="h-5 w-5 text-emerald-400 mx-auto mb-2" />
                <p className="text-xs text-star-dust/40 mb-1">Community</p>
                <p className="text-emerald-400 font-bold text-xl">${product.price_community}</p>
              </div>
            )}
            {product.price_ally && (
              <div className="bg-white/5 border border-white/10 rounded-xl p-4 text-center">
                <Shield className="h-5 w-5 text-neurospark mx-auto mb-2" />
                <p className="text-xs text-star-dust/40 mb-1">Ally</p>
                <p className="text-neurospark font-bold text-xl">${product.price_ally}</p>
              </div>
            )}
            {product.price_corporate && (
              <div className="bg-purple-500/5 border border-purple-500/20 rounded-xl p-4 text-center">
                <Package className="h-5 w-5 text-purple-400 mx-auto mb-2" />
                <p className="text-xs text-star-dust/40 mb-1">Corporate</p>
                <p className="text-purple-400 font-bold text-xl">${product.price_corporate}</p>
              </div>
            )}
          </div>

          {product.residual_pool_percent && (
            <p className="text-xs text-star-dust/40 text-center">
              {product.residual_pool_percent}% of platform fee goes to contributors
            </p>
          )}

          <div className="flex gap-3 mt-6">
            <Button variant="primary" size="md">Purchase</Button>
            <Button variant="ghost" size="md" onClick={() => router.back()}>Back</Button>
          </div>
        </Card>
      </div>
    </main>
  );
}