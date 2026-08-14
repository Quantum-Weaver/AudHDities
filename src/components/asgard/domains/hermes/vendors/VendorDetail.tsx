// src/components/asgard/domains/hermes/vendors/VendorDetail.tsx
// Merchant edition (2026-07-31): vendor_profiles (hestia-core, extinct)
// became merchant_profiles (hermes-social). The wares link filters by
// created_by â€” the profile's owner â€” because wares knows makers by
// user id, not profile id.
'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { Card } from '@/components/runes/Card';
import { Badge } from '@/components/runes/Badge';
import { Button } from '@/components/yggdrasil/Button';
import { Skeleton } from '@/components/runes/Skeleton';
import { ArrowLeft, Shield, Package, Globe, Building2 } from 'lucide-react';
import type { CardData } from '@/types/components/runes/card.types';
import type { Tables } from '@/lib/generated/supabase/database.helpers.js';

type MerchantItem = Tables<'merchant_profiles'>;

const BUSINESS_TYPE_LABELS: Record<string, string> = {
  sole_proprietor: 'Sole Proprietor', llc: 'LLC', nonprofit: 'Nonprofit',
  corporation: 'Corporation', partnership: 'Partnership',
};

export function VendorDetail() {
  const params = useParams();
  const router = useRouter();
  const [merchant, setMerchant] = useState<MerchantItem | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`/api/generated/hermes-social/merchant_profiles/${params.id}`)
      .then((r) => r.json())
      .then((result) => { if (result.success) setMerchant(result.data); })
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

  if (!merchant) {
    return (
      <main className="min-h-screen py-12">
        <div className="container max-w-3xl mx-auto px-6 text-center">
          <Building2 className="h-12 w-12 text-star-dust/20 mx-auto mb-4" />
          <p className="text-star-dust/40">This guild member has not yet arrived.</p>
          <Link href="/bazaar/vendors" className="text-neurospark hover:underline mt-4 inline-block">Return to the Guild</Link>
        </div>
      </main>
    );
  }

  const categories = [
    ...(merchant.primary_category ? [merchant.primary_category] : []),
    ...(merchant.secondary_categories || []),
  ];

  const cardData: CardData = { id: merchant.id, type: 'vendor', title: merchant.vendor_name, description: merchant.bio || '' };

  return (
    <main className="min-h-screen py-12">
      <div className="container max-w-3xl mx-auto px-6">
        <Link href="/bazaar/vendors" className="flex items-center gap-2 text-star-dust/60 hover:text-star-dust transition-colors text-sm mb-6">
          <ArrowLeft className="h-4 w-4" />Return to the Guild
        </Link>

        <Card data={cardData} variant="sanctuary" radius="xl" shadow="md" className="p-8">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-16 h-16 rounded-xl bg-white/5 flex items-center justify-center text-2xl font-bold text-star-dust/60">
              {merchant.vendor_name?.charAt(0)?.toUpperCase() || 'M'}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-2xl font-bold text-star-dust">{merchant.vendor_name}</h1>
                {merchant.verified_at && <Shield size={18} className="text-neurospark" />}
              </div>
              {merchant.business_type && (
                <p className="text-sm text-star-dust/40">{BUSINESS_TYPE_LABELS[merchant.business_type] || merchant.business_type}</p>
              )}
            </div>
          </div>

          {merchant.bio && (
            <p className="text-star-dust/70 leading-relaxed mb-6">{merchant.bio}</p>
          )}

          {categories.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-6">
              {categories.map((cat) => (
                <Badge key={cat} variant="outline" size="sm" className="text-[10px] capitalize">{cat}</Badge>
              ))}
            </div>
          )}

          <div className="grid grid-cols-2 gap-4 mb-6">
            {merchant.total_products !== null && (
              <div className="bg-white/5 border border-white/10 rounded-xl p-4 text-center">
                <Package className="h-5 w-5 text-neurospark mx-auto mb-1" />
                <p className="text-neurospark font-bold text-lg">{merchant.total_products}</p>
                <p className="text-xs text-star-dust/40">Wares</p>
              </div>
            )}
            {merchant.total_sales !== null && (
              <div className="bg-white/5 border border-white/10 rounded-xl p-4 text-center">
                <Shield className="h-5 w-5 text-emerald-400 mx-auto mb-1" />
                <p className="text-emerald-400 font-bold text-lg">{merchant.total_sales}</p>
                <p className="text-xs text-star-dust/40">Exchanges</p>
              </div>
            )}
          </div>

          {(merchant.website_url || merchant.store_url) && (
            <a href={merchant.website_url || merchant.store_url || '#'} target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm text-neurospark hover:underline mb-6">
              <Globe size={14} />{merchant.website_url || merchant.store_url}
            </a>
          )}

          {merchant.total_products !== null && merchant.total_products > 0 && (
            <Link
              href={`/bazaar/creations?vendor_id=${merchant.created_by}`}
              className="inline-flex items-center gap-2 text-sm text-neurospark hover:underline mt-4"
            >
              <Package size={14} />
              View all {merchant.total_products} wares
            </Link>
          )}

          <Button variant="ghost" size="md" onClick={() => router.back()}>Back</Button>
        </Card>
      </div>
    </main>
  );
}
