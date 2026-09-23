// src/components/asgard/domains/hermes/artisans/ArtisanDetail.tsx
'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { Card } from '@/components/runes/Card';
import { Badge } from '@/components/runes/Badge';
import { Avatar, AvatarFallback } from '@/components/runes/Avatar';
import { Skeleton } from '@/components/runes/Skeleton';
import { ArrowLeft, Shield, Package, Globe, UserRound } from 'lucide-react';
import type { CardData } from '@/types/components/runes/card.types';
import type { Tables } from '@/lib/generated/supabase/database.helpers.js';
import { profileHref } from '@/components/asgard/domains/iris/profile/href';
import { isRung } from '@/components/asgard/domains/hermes/wares/RungLadder';
import { ArtisanTiers } from '@/components/asgard/domains/hermes/artisans/ArtisanTiers';

type ArtisanItem = Tables<'artisan_profiles'>;
type WorkItem = Tables<'works'>;
type WareItem = Tables<'wares'>;

const WORK_TYPE_LABELS: Record<string, string> = {
  music: 'Music', writing: 'Writing', vision: 'Vision',
  performance: 'Performance', code: 'Code', other: 'Craft',
};

export function ArtisanDetail() {
  const params = useParams();
  const [artisan, setArtisan] = useState<ArtisanItem | null>(null);
  const [works, setWorks] = useState<WorkItem[]>([]);
  const [rungs, setRungs] = useState<WareItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`/api/generated/hermes-social/artisan_profiles/${params.id}`)
      .then((r) => r.json())
      .then((result) => { if (result.success) setArtisan(result.data); })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [params.id]);

  useEffect(() => {
    if (!artisan?.id) return;
    fetch(`/api/generated/hermes-social/works?artisan_profile_id=${artisan.id}&status=published&sort=updated_at&order=desc&limit=6`)
      .then((r) => r.json())
      .then((result) => { if (result.success) setWorks(result.data?.data || result.data || []); })
      .catch(console.error);
  }, [artisan?.id]);

  useEffect(() => {
    if (!artisan?.id) return;
    fetch(`/api/generated/plutus-economics/wares?artisan_profile_id=${artisan.id}&status=published&order=created_at.desc`)
      .then((r) => r.json())
      .then((result) => {
        if (!result.success) return;
        const wares: WareItem[] = result.data?.data || result.data || [];
        setRungs(wares.filter(isRung));
      })
      .catch(console.error);
  }, [artisan?.id]);

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
          <Link href="/bazaar/artisans" className="text-neurospark hover:underline mt-4 inline-block">Return to the Weavers</Link>
        </div>
      </main>
    );
  }

  const categories = [
    ...(artisan.primary_category ? [artisan.primary_category] : []),
    ...(artisan.secondary_categories || []),
  ];

  const cardData: CardData = { id: artisan.id, type: 'artisan', title: artisan.artisan_name, description: artisan.bio || '' };

  return (
    <main className="min-h-screen py-12">
      <div className="container max-w-3xl mx-auto px-6">
        <div className="flex items-center justify-between gap-4 mb-6">
          <Link href="/bazaar/artisans" className="flex items-center gap-2 text-star-dust/60 hover:text-star-dust transition-colors text-sm">
            <ArrowLeft className="h-4 w-4" aria-hidden="true" />Return to the Weavers
          </Link>
          {artisan.created_by && (
            <Link href={profileHref(artisan.created_by)} className="flex items-center gap-2 text-sm text-neurospark hover:underline">
              <UserRound className="h-4 w-4" aria-hidden="true" />{artisan.artisan_name}
            </Link>
          )}
        </div>

        <Card data={cardData} variant="sanctuary" radius="xl" shadow="md" className="p-8">
          <div className="flex items-center gap-4 mb-6">
            <Avatar size="2xl">
              <AvatarFallback>{artisan.artisan_name?.charAt(0)?.toUpperCase() || 'W'}</AvatarFallback>
            </Avatar>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-2xl font-bold text-star-dust">{artisan.artisan_name}</h1>
                {artisan.verified_at && <Shield size={18} className="text-neurospark" aria-label="Verified" />}
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

          {(artisan.portfolio_url || artisan.website_url) && (
            <a href={artisan.portfolio_url || artisan.website_url || '#'} target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm text-neurospark hover:underline mb-6">
              <Globe size={14} aria-hidden="true" />{artisan.portfolio_url || artisan.website_url}
            </a>
          )}

          <Link
            href={`/bazaar/wares?artisan_id=${artisan.id}`}
            className="inline-flex items-center gap-2 text-sm text-neurospark hover:underline mt-4"
          >
            <Package size={14} aria-hidden="true" />
            See everything at this loom →
          </Link>
        </Card>

        <ArtisanTiers rungs={rungs} />

        {works.length === 0 && (
          <div className="mt-8">
            <h2 className="text-lg font-semibold text-star-dust mb-1">At the loom</h2>
            <p className="text-sm text-star-dust/40">Nothing on the loom just now.</p>
          </div>
        )}

        {works.length > 0 && (
          <div className="mt-8">
            <h2 className="text-lg font-semibold text-star-dust mb-1">At the loom</h2>
            <p className="text-sm text-star-dust/40 mb-4">What {artisan.artisan_name} is making</p>
            <div className="grid sm:grid-cols-1 md:grid-cols-2 gap-4">
              {works.map((work) => {
                const wd: CardData = { id: work.id, type: 'product', title: work.name, description: work.description || '' };
                return (
                  <Link key={work.id} href={`/bazaar/works/${work.id}`}>
                  <Card data={wd} variant="glass" radius="lg" shadow="sm" className="p-5 h-full">
                    <div className="flex items-center justify-between mb-2">
                      <Badge variant="outline" size="sm" className="text-[10px] capitalize">
                        {WORK_TYPE_LABELS[work.work_type] || work.work_type}
                      </Badge>
                      {work.icon_emoji && <span aria-hidden="true">{work.icon_emoji}</span>}
                    </div>
                    <h3 className="text-base font-semibold text-star-dust mb-1">{work.name}</h3>
                    {work.description && <p className="text-sm text-star-dust/50 line-clamp-2">{work.description}</p>}
                  </Card>
                  </Link>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
