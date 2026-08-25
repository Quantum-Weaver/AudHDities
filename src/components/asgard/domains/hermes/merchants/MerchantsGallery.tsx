// src/components/asgard/domains/hermes/merchants/MerchantsGallery.tsx
// Merchant edition (2026-07-31): vendor_profiles (hestia-core, extinct)
// became merchant_profiles (hermes-social) — the makers live in this
// realm's own deity now. profile_status has no 'verified' value: the
// directory shows status=active; the verified badge reads verified_at.
'use client';

import { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import { Skeleton } from '@/components/runes/Skeleton';
import { MerchantCardRenderer } from '@/components/asgard/domains/hermes/merchants/MerchantCardRenderer';
import { ArrowLeft, Building2, Search } from 'lucide-react';
import { CardData } from '@/types/components/runes/card.types';
import type { Tables } from '@/lib/generated/supabase/database.helpers.js';

type MerchantItem = Tables<'merchant_profiles'>;

/** The finite-list sentence's own words. Never a stored count — only what arrived. */
function say(n: number, one: string, many: string): string {
  const words = ['No', 'One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine'];
  const word = n < words.length ? words[n] : String(n);
  return `${word} ${n === 1 ? one : many}`;
}

export function MerchantsGallery() {
  const [merchants, setMerchants] = useState<MerchantItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetch('/api/generated/hermes-social/merchant_profiles?status=active&order=vendor_name.asc')
      .then((r) => r.json())
      .then((result) => {
        if (result.success) setMerchants(result.data?.data || result.data || []);
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const filtered = useMemo(() =>
    merchants.filter((m) =>
      m.vendor_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (m.tagline || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
      (m.bio || '').toLowerCase().includes(searchTerm.toLowerCase())
    ), [merchants, searchTerm]);

  if (loading) {
    return (
      <main className="min-h-screen py-12">
        <div className="container max-w-6xl mx-auto px-6">
          <Skeleton variant="text" className="h-8 w-48 mb-8" />
          <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1,2,3,4,5,6].map((i) => (<Skeleton key={i} variant="card" className="h-40" />))}
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
            <ArrowLeft className="h-4 w-4" aria-hidden="true" />Return to the Bazaar
          </Link>
          <h1 className="text-2xl font-bold text-star-dust">The Guild</h1>
          <p className="text-sm text-star-dust/40 mt-1">Meet the merchants of the Sanctuary</p>
        </div>

        <div className="relative mb-8">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-star-dust/40" size={16} aria-hidden="true" />
          <input type="text" placeholder="Search merchants..." value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-white/5 border border-white/10 rounded-lg pl-10 pr-4 py-2 text-star-dust text-sm placeholder-white/40 focus:border-neurospark focus:outline-none"
          />
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-20">
            <Building2 className="h-12 w-12 text-star-dust/20 mx-auto mb-4" />
            <p className="text-star-dust/40 text-lg mb-2">{searchTerm ? 'No guild members match' : 'The guild is forming'}</p>
          </div>
        )}

        <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((m) => (
            <Link key={m.id} href={`/bazaar/merchants/${m.id}`}>
              <MerchantCardRenderer
                variant="interactive"
                radius="lg"
                shadow="sm"
                data={{
                  id: m.id, type: 'vendor', title: m.vendor_name,
                  description: m.tagline || m.bio || undefined,
                  businessType: m.business_type || undefined,
                  isVerified: !!m.verified_at,
                  website: m.website_url || m.store_url || undefined,
                } as CardData}
              />
            </Link>
          ))}
        </div>

        {!searchTerm && filtered.length > 0 && (
          <p className="text-center text-xs text-star-dust/30 mt-10">
            {say(filtered.length, 'guild member', 'guild members')}. That is all of them.
          </p>
        )}
      </div>
    </main>
  );
}
