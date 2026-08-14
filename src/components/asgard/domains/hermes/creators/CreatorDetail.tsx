// src/components/asgard/domains/hermes/creators/CreatorDetail.tsx
// Artisan edition (2026-07-31): creator_profiles (hestia-core, extinct)
// became artisan_profiles (hermes-social). The stats grid follows the
// new columns: creations + followers (total_sales and the residual
// default were the old table's; earnings never belonged on a public
// profile). The works link filters wares by created_by â€” the profile's
// owner â€” because wares knows makers by user id, not profile id.
//
// The maker's room (2026-08-01, KP's word via the E4 study): the stall
// is the artisan's own small room â€” "At the loom" shows their works,
// the making itself, so worth is felt as human before price is read as
// number. Presence, never pressure: the works display; nothing sells.
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
import type { Tables } from '@/lib/generated/supabase/database.helpers.js';

type ArtisanItem = Tables<'artisan_profiles'>;
type WorkItem = Tables<'works'>;

const WORK_TYPE_LABELS: Record<string, string> = {
  music: 'Music', writing: 'Writing', vision: 'Vision',
  performance: 'Performance', code: 'Code', other: 'Craft',
};

export function CreatorDetail() {
  const params = useParams();
  const router = useRouter();
  const [artisan, setArtisan] = useState<ArtisanItem | null>(null);
  const [works, setWorks] = useState<WorkItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`/api/generated/hermes-social/artisan_profiles/${params.id}`)
      .then((r) => r.json())
      .then((result) => { if (result.success) setArtisan(result.data); })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [params.id]);

  useEffect(() => {
    if (!artisan?.created_by) return;
    fetch(`/api/generated/hermes-social/works?created_by=${artisan.created_by}&status=published&order=updated_at.desc&limit=6`)
      .then((r) => r.json())
      .then((result) => { if (result.success) setWorks(result.data?.data || result.data || []); })
      .catch(console.error);
  }, [artisan?.created_by]);

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

        {/* At the loom â€” the making itself, visible. Presence, never pressure. */}
        {works.length > 0 && (
          <div className="mt-8">
            <h2 className="text-lg font-semibold text-star-dust mb-1">At the loom</h2>
            <p className="text-sm text-star-dust/40 mb-4">What {artisan.artisan_name} is making</p>
            <div className="grid sm:grid-cols-1 md:grid-cols-2 gap-4">
              {works.map((work) => {
                const wd: CardData = { id: work.id, type: 'product', title: work.name, description: work.description || '' };
                return (
                  <Card key={work.id} data={wd} variant="glass" radius="lg" shadow="sm" className="p-5 h-full">
                    <div className="flex items-center justify-between mb-2">
                      <Badge variant="outline" size="sm" className="text-[10px] capitalize">
                        {WORK_TYPE_LABELS[work.work_type] || work.work_type}
                      </Badge>
                      {work.icon_emoji && <span aria-hidden>{work.icon_emoji}</span>}
                    </div>
                    <h3 className="text-base font-semibold text-star-dust mb-1">{work.name}</h3>
                    {work.description && <p className="text-sm text-star-dust/50 line-clamp-2">{work.description}</p>}
                  </Card>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
