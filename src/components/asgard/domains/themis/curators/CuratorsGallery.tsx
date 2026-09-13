// src/components/asgard/domains/themis/curators/CuratorsGallery.tsx
'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Card } from '@/components/runes/Card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/runes/Avatar';
import { Badge } from '@/components/runes/Badge';
import { Skeleton } from '@/components/runes/Skeleton';
import { createClient } from '@/lib/supabase/client';
import { ArrowLeft, Eye, Shield } from 'lucide-react';
import type { CommunityProfilesRow } from '@/lib/generated/types/hestia-core/community_profiles';
import type { CardData } from '@/types/components/runes/card.types';

type Curator = Pick<
  CommunityProfilesRow,
  'id' | 'display_name' | 'slug' | 'bio' | 'avatar_url' | 'icon_emoji' | 'sovereign_tier' | 'roles'
>;

const TIER_LABELS: Record<Curator['sovereign_tier'], string> = {
  dweller: 'Dweller',
  guild: 'Guild',
  outlander: 'Outlander',
  sovereign_weaver: 'Sovereign Weaver',
};

export function CuratorsGallery() {
  const [curators, setCurators] = useState<Curator[]>([]);
  const [reading, setReading] = useState(true);
  const [fault, setFault] = useState<string | null>(null);

  useEffect(() => {
    let alive = true;

    const read = async () => {
      const supabase = createClient();
      const { data, error } = await supabase
        .from('community_profiles')
        .select('id, display_name, slug, bio, avatar_url, icon_emoji, sovereign_tier, roles')
        .contains('roles', ['curator'])
        .eq('status', 'active')
        .order('display_name', { ascending: true });

      if (!alive) return;
      if (error) setFault(error.message);
      else setCurators(data ?? []);
      setReading(false);
    };

    void read();
    return () => { alive = false; };
  }, []);

  if (reading) {
    return (
      <main className="min-h-screen py-12">
        <div className="container max-w-6xl mx-auto px-6">
          <Skeleton variant="text" className="h-8 w-48 mb-8" />
          <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (<Skeleton key={i} variant="card" className="h-40" />))}
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen py-12">
      <div className="container max-w-6xl mx-auto px-6">

        <div className="mb-8">
          <Link href="/council" className="flex items-center gap-2 text-star-dust/60 hover:text-star-dust transition-colors text-sm mb-2">
            <ArrowLeft className="h-4 w-4" />Return to the Council
          </Link>
          <h1 className="text-2xl font-bold text-star-dust">Curators</h1>
          <p className="text-sm text-star-dust/40 mt-1">Vessels who carry the curator role</p>
        </div>

        {fault && (
          <div className="mb-6 p-4 bg-fire-base/10 border border-fire-base/30 rounded-lg">
            <p className="text-fire-base text-sm">{fault}</p>
          </div>
        )}

        {curators.length === 0 ? (
          <div className="text-center py-20">
            <Eye className="h-12 w-12 text-star-dust/20 mx-auto mb-4" />
            <p className="text-star-dust/40 text-lg mb-2">No vessel carries the curator role</p>
            <p className="text-star-dust/30 text-sm">The role is granted by the Council when a curator is named.</p>
          </div>
        ) : (
          <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {curators.map((c) => {
              const cardData: CardData = {
                id: c.id,
                type: 'value',
                title: c.display_name,
                value: TIER_LABELS[c.sovereign_tier],
                description: c.bio ?? undefined,
              };
              return (
                <Card key={c.id} data={cardData} variant="interactive" radius="lg" shadow="sm" className="p-5 h-full">
                  <div className="flex items-center gap-3 mb-3">
                    <Avatar size="lg">
                      {c.avatar_url && <AvatarImage src={c.avatar_url} alt={c.display_name} />}
                      <AvatarFallback>{c.icon_emoji ?? c.display_name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <h2 className="text-star-dust font-semibold">{c.display_name}</h2>
                      <p className="text-xs text-star-dust/40">{TIER_LABELS[c.sovereign_tier]}</p>
                    </div>
                    <Shield className="h-4 w-4 text-neurospark ml-auto" />
                  </div>
                  {c.bio && <p className="text-sm text-star-dust/50 line-clamp-3 mb-3">{c.bio}</p>}
                  <div className="flex flex-wrap gap-1.5">
                    {c.roles.map((role) => (
                      <Badge key={role} variant="outline" size="sm" className="text-[10px] capitalize">{role}</Badge>
                    ))}
                  </div>
                </Card>
              );
            })}
          </div>
        )}
      </div>
    </main>
  );
}
