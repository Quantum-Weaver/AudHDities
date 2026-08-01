// src/components/asgard/domains/hermes/creators/CreatorDetail.tsx
// Artisan edition (2026-07-31): creator_profiles (hestia-core, extinct)
// became artisan_profiles (hermes-social). The stats grid follows the
// new columns: creations + followers (total_sales and the residual
// default were the old table's; earnings never belonged on a public
// profile). The works link filters wares by created_by — the profile's
// owner — because wares knows makers by user id, not profile id.
'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { Card } from '@/components/runes/Card';
import { Badge } from '@/components/runes/Badge';
import { Avatar, AvatarFallback } from '@/components/runes/Avatar';
import { Button } from '@/components/yggdrasil/Button';
import { Skeleton } from '@/components/runes/Skeleton';
import { ArrowLeft, Shield, Package, Globe, Heart } from 'lucide-react';
import type { CardData } from '@/types/components/runes/card.types';
import type { Tables } from '@/types/supabase/database.helpers.js';

type ArtisanItem = Tables<'artisan_profiles'>;

export function CreatorDetail() {
  const params = useParams();
  const router = useRouter();
  const [artisan, setArtisan] = useState<ArtisanItem | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`/api/generated/hermes-social/artisan_profiles/${params.id}`)
      .then((r) => r.json())
      .then((result) => { if (result.success) setArtisan(result.data); })
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

  if (!artisan) {
    return (
      <main className="min-h-screen py-12">
        <div className="container max-w-3xl mx-auto px-6 text-center">
          <p className="text-star-dust/40">This weaver has not yet arrived.</p>
          <Link href="/bazaar/creators" className="text-neurospark hover:underline mt-4 inline-block">Return to the Weavers</Link>
        </div>
      </main>
    );
  }

  const categories = [
    ...(artisan.primary_category ? [artisan.primary_category] : []),
    ...(artisan.secondary_categories || []),
  ];

  const cardData: CardData = { id: artisan.id, type: 'creator', title: artisan.artisan_name, description: artisan.bio || '' };

  return (
    <main className="min-h-screen py-12">
      <div className="container max-w-3xl mx-auto px-6">
        <Link href="/bazaar/creators" className="flex items-center gap-2 text-star-dust/60 hover:text-star-dust transition-colors text-sm mb-6">
          <ArrowLeft className="h-4 w-4" />Return to the Weavers
        </Link>

        <Card data={cardData} variant="sanctuary" radius="xl" shadow="md" className="p-8">
          <div className="flex items-center gap-4 mb-6">
            <Avatar size="2xl">
              <AvatarFallback>{artisan.artisan_name?.charAt(0)?.toUpperCase() || 'W'}</AvatarFallback>
            </Avatar>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-2xl font-bold text-star-dust">{artisan.artisan_name}</h1>
                {artisan.verified_at && <Shield size={18} className="text-neurospark" />}
              </div>
              <p className="text-sm text-star-dust/40">{artisan.tagline || 'Weaver'}</p>
            </div>
          </div>

          {artisan.bio && (
            <p className="text-star-dust/70 leading-relaxed mb-6">{artisan.bio}</p>
          )}

          {categories.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-6">
              {categories.map((cat) => (
                <Badge key={cat} variant="outline" size="sm" className="text-[10px] capitalize">{cat}</Badge>
              ))}
            </div>
          )}

          <div className="grid grid-cols-2 gap-4 mb-6">
            {artisan.total_creations !== null && (
              <div className="bg-white/5 border border-white/10 rounded-xl p-4 text-center">
                <Package className="h-5 w-5 text-neurospark mx-auto mb-1" />
                <p className="text-neurospark font-bold text-lg">{artisan.total_creations}</p>
                <p className="text-xs text-star-dust/40">Works</p>
              </div>
            )}
            {artisan.total_followers !== null && (
              <div className="bg-white/5 border border-white/10 rounded-xl p-4 text-center">
                <Heart className="h-5 w-5 text-emerald-400 mx-auto mb-1" />
                <p className="text-emerald-400 font-bold text-lg">{artisan.total_followers}</p>
                <p className="text-xs text-star-dust/40">Followers</p>
              </div>
            )}
          </div>

          {(artisan.portfolio_url || artisan.website_url) && (
            <a href={artisan.portfolio_url || artisan.website_url || '#'} target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm text-neurospark hover:underline mb-6">
              <Globe size={14} />{artisan.portfolio_url || artisan.website_url}
            </a>
          )}

          {artisan.total_creations !== null && artisan.total_creations > 0 && (
            <Link
              href={`/bazaar/creations?creator_id=${artisan.created_by}`}
              className="inline-flex items-center gap-2 text-sm text-neurospark hover:underline mt-4"
            >
              <Package size={14} />
              View all {artisan.total_creations} works by {artisan.artisan_name}
            </Link>
          )}

          <Button variant="ghost" size="md" onClick={() => router.back()}>Back</Button>
        </Card>
      </div>
    </main>
  );
}
