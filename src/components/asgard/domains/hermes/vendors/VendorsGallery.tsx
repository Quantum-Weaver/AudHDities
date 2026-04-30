// src/components/asgard/domains/hermes/vendors/VendorsGallery.tsx
'use client';

import { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import { Skeleton } from '@/components/runes/Skeleton';
import { VendorCardRenderer } from '@/components/asgard/domains/hermes/vendors/VendorCardRenderer';
import { ArrowLeft, Building2, Search } from 'lucide-react';
import { CardData } from '@/types/components/runes/card.types';

interface VendorItem {
  vendors_id: string; business_name: string; 
  business_description: string | null;
  business_type: string | null; 
  product_categories: string[] | null;
  verification_status: string | null; 
  verified_badge: boolean | null;
  total_products: number | null; 
  website_url: string | null;
}

export function VendorsGallery() {
  const [vendors, setVendors] = useState<VendorItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetch('/api/generated/hestia-core/vendor_profiles?verification_status=verified&order=business_name.asc')
      .then((r) => r.json())
      .then((result) => {
        if (result.success) setVendors(result.data?.data || result.data || []);
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const filtered = useMemo(() =>
    vendors.filter((v) =>
      v.business_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (v.business_description || '').toLowerCase().includes(searchTerm.toLowerCase())
    ), [vendors, searchTerm]);

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
            <ArrowLeft className="h-4 w-4" />Return to the Bazaar
          </Link>
          <h1 className="text-2xl font-bold text-star-dust">The Guild</h1>
          <p className="text-sm text-star-dust/40 mt-1">Meet the vendors of the Sanctuary</p>
        </div>

        <div className="relative mb-8">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-star-dust/40" size={16} />
          <input type="text" placeholder="Search vendors..." value={searchTerm}
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
          {filtered.map((v) => (
            <Link key={v.vendors_id} href={`/bazaar/vendors/${v.vendors_id}`}>
              <VendorCardRenderer
                variant="interactive"
                radius="lg"
                shadow="sm"
                data={{
                  id: v.vendors_id, type: 'vendor', title: v.business_name,
                  description: v.business_description || undefined,
                  businessType: v.business_type || undefined,
                  productCount: v.total_products || 0,
                  isVerified: v.verified_badge || false,
                  website: v.website_url || undefined,
                } as CardData}
              />
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}