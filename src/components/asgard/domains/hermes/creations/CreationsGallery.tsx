// src/components/asgard/domains/hermes/creations/CreationsGallery.tsx
// Wares edition (2026-07-31): products became wares â€” one base price plus a
// pricing_model, status enum instead of is_published/active, created_by
// instead of creator_id/owner_id.
// The quiet square (2026-08-01, KP's ruling via the E4 study): gallery
// cards carry no price â€” the work and its maker lead; the price speaks
// plainly at the stall (CreationDetail), with the split beside it.
// Worth felt as human before price read as number.
'use client';

import { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import { Card } from '@/components/runes/Card';
import { Badge } from '@/components/runes/Badge';
import { Skeleton } from '@/components/runes/Skeleton';
import { ArrowLeft, Package, Search } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { CardData } from '@/types/components/runes/card.types';
import type { Tables } from '@/lib/generated/supabase/database.helpers.js';
import { useSearchParams } from 'next/navigation';

type WareItem = Tables<'wares'>;

const TYPE_LABELS: Record<string, string> = {
  physical: 'Physical', digital: 'Digital', service: 'Service',
};

export function CreationsGallery() {
  const [wares, setWares] = useState<WareItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState<string | null>(null);
  const searchParams = useSearchParams();

  useEffect(() => {
    const fetchWares = async () => {
      try {
        const params = new URLSearchParams();
        params.set('status', 'published');
        params.set('order', 'created_at.desc');

        // Maker links arrive as ?creator_id= or ?vendor_id=; wares knows one owner column.
        const makerId = searchParams.get('creator_id') || searchParams.get('vendor_id');
        if (makerId) params.set('created_by', makerId);

        const response = await fetch(`/api/generated/plutus-economics/wares?${params.toString()}`);
        const result = await response.json();
        if (result.success) {
          setWares(result.data?.data || result.data || []);
        }
      } catch (err) {
        console.error('Failed to fetch wares:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchWares();
  }, [searchParams]);

  const types = useMemo(() => {
    const set = new Set<string>();
    wares.forEach((w) => set.add(w.ware_type));
    return Array.from(set);
  }, [wares]);

  const filteredWares = useMemo(() => {
    return wares.filter((w) => {
      const matchesSearch = w.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (w.description || '').toLowerCase().includes(searchTerm.toLowerCase());
      const matchesType = !selectedType || w.ware_type === selectedType;
      return matchesSearch && matchesType;
    });
  }, [wares, searchTerm, selectedType]);

  if (loading) {
    return (
      <main className="min-h-screen py-12">
        <div className="container max-w-6xl mx-auto px-6">
          <Skeleton variant="text" className="h-8 w-48 mb-8" />
          <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((i) => (<Skeleton key={i} variant="card" className="h-48" />))}
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen py-12">
      <div className="container max-w-6xl mx-auto px-6">

        <div className="mb-8">
          <Link href="/bazaar" className="flex items-center gap-2 text-star-dust/60 hover:text-star-dust transition-colors text-sm mb-2">
            <ArrowLeft className="h-4 w-4" />Return to the Bazaar
          </Link>
          <h1 className="text-2xl font-bold text-star-dust">The Tapestry</h1>
          <p className="text-sm text-star-dust/40 mt-1">Discover works from sovereign souls</p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-star-dust/40" size={16} />
            <input type="text" placeholder="Search works..." value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-lg pl-10 pr-4 py-2 text-star-dust text-sm placeholder-white/40 focus:border-neurospark focus:outline-none"
            />
          </div>
          <div className="flex flex-wrap gap-2">
            <button onClick={() => setSelectedType(null)}
              className={cn('px-3 py-1.5 rounded-full text-xs font-medium border', !selectedType ? 'bg-neurospark/20 text-neurospark border-neurospark/40' : 'bg-white/5 text-star-dust/50 border-white/10')}
            >All Types</button>
            {types.map((t) => (
              <button key={t} onClick={() => setSelectedType(selectedType === t ? null : t)}
                className={cn('px-3 py-1.5 rounded-full text-xs font-medium border capitalize', selectedType === t ? 'bg-neurospark/20 text-neurospark border-neurospark/40' : 'bg-white/5 text-star-dust/50 border-white/10')}
              >{TYPE_LABELS[t] || t}</button>
            ))}
          </div>
        </div>

        {filteredWares.length === 0 && (
          <div className="text-center py-20">
            <Package className="h-12 w-12 text-star-dust/20 mx-auto mb-4" />
            <p className="text-star-dust/40 text-lg mb-2">{searchTerm ? 'No works match' : 'The tapestry awaits its first threads'}</p>
          </div>
        )}

        <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredWares.map((ware) => {
            const cardData: CardData = { id: ware.id, type: 'product', title: ware.name, description: ware.description || '' };
            return (
              <Link key={ware.id} href={`/bazaar/creations/${ware.id}`}>
                <Card data={cardData} variant="interactive" radius="lg" shadow="sm" className="p-5 h-full">
                  <div className="flex items-center justify-between mb-3">
                    <Badge variant="outline" size="sm" className="text-[10px] capitalize">{TYPE_LABELS[ware.ware_type] || ware.ware_type}</Badge>
                    {ware.icon_emoji && <span aria-hidden>{ware.icon_emoji}</span>}
                  </div>
                  <h3 className="text-lg font-semibold text-star-dust mb-2">{ware.name}</h3>
                  {ware.description && <p className="text-sm text-star-dust/50 line-clamp-2 mb-4">{ware.description}</p>}
                  {ware.pricing_model === 'free' && (
                    <span className="text-xs text-emerald-400 mt-auto">freely given</span>
                  )}
                </Card>
              </Link>
            );
          })}
        </div>
      </div>
    </main>
  );
}
