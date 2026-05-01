// src/components/asgard/domains/themis/curators/CuratorsGallery.tsx
'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Card } from '@/components/runes/Card';
import { Avatar, AvatarFallback } from '@/components/runes/Avatar';
import { Badge } from '@/components/runes/Badge';
import { Button } from '@/components/yggdrasil/Button';
import { Skeleton } from '@/components/runes/Skeleton';
import { ArrowLeft, Eye, Shield, UserCheck, Star } from 'lucide-react';
import type { CardData } from '@/types/components/runes/card.types';

export function CuratorsGallery() {
  const [curators, setCurators] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // In production: fetch from community_profiles where is_curator = true
    setTimeout(() => { setCurators([]); setLoading(false); }, 800);
  }, []);

  if (loading) {
    return (
      <main className="min-h-screen py-12">
        <div className="container max-w-6xl mx-auto px-6">
          <Skeleton variant="text" className="h-8 w-48 mb-8" />
          <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1,2,3].map((i) => (<Skeleton key={i} variant="card" className="h-40" />))}
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
          <p className="text-sm text-star-dust/40 mt-1">Trusted voices guiding the Sanctuary</p>
        </div>

        {curators.length === 0 ? (
          <div className="text-center py-20">
            <Eye className="h-12 w-12 text-star-dust/20 mx-auto mb-4" />
            <p className="text-star-dust/40 text-lg mb-2">Curators are emerging</p>
            <p className="text-star-dust/30 text-sm">As the community grows, trusted voices will rise to guide the Sanctuary.</p>
          </div>
        ) : (
          <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {curators.map((c) => {
              const cardData: CardData = { id: c.id, type: 'value', title: c.name, value: c.role || 'Curator' };
              return (
                <Card key={c.id} data={cardData} variant="interactive" radius="lg" shadow="sm" className="p-5 h-full">
                  <div className="flex items-center gap-3 mb-3">
                    <Avatar size="lg"><AvatarFallback>{c.name?.[0] || 'C'}</AvatarFallback></Avatar>
                    <div>
                      <h3 className="text-star-dust font-semibold">{c.name}</h3>
                      <p className="text-xs text-star-dust/40">{c.role || 'Curator'}</p>
                    </div>
                    {c.isVerified && <Shield className="h-4 w-4 text-neurospark ml-auto" />}
                  </div>
                  <div className="flex items-center gap-3 text-xs text-star-dust/40">
                    <span className="flex items-center gap-1"><Star size={12} />{c.endorsements || 0} endorsements</span>
                    <span className="flex items-center gap-1"><UserCheck size={12} />{c.delegates || 0} delegates</span>
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