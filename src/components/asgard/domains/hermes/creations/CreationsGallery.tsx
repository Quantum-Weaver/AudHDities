// src/components/asgard/domains/hermes/creations/CreationsGallery.tsx
'use client';

import { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import { Card } from '@/components/runes/Card';
import { Badge } from '@/components/runes/Badge';
import { Skeleton } from '@/components/runes/Skeleton';
import { ArrowLeft, Package, Search, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { CardData } from '@/types/components/runes/card.types';
import { useSearchParams } from 'next/navigation';

interface ProductItem {
  products_id: string;
  title: string;
  description: string | null;
  product_type: string;
  price_community: number | null;
  price_ally: number | null;
  price_corporate: number | null;
  creator_id: string;
  is_published: boolean;
}

const TYPE_LABELS: Record<string, string> = {
  digital_course: 'Course', digital_download: 'Download', physical_product: 'Physical',
  audio: 'Audio', video: 'Video', music: 'Music', event_live: 'Live Event',
  workshop: 'Workshop', service: 'Service', mutual_aid: 'Mutual Aid',
  clothing: 'Clothing', accessory: 'Accessory', bundle: 'Bundle',
};

export function CreationsGallery() {
  const [products, setProducts] = useState<ProductItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState<string | null>(null);
  const searchParams = useSearchParams();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const params = new URLSearchParams();
        params.set('is_published', 'true');
        params.set('active', 'true');
        params.set('order', 'created_at.desc');
        
        const creatorId = searchParams.get('creator_id');
        const vendorId = searchParams.get('vendor_id');
        if (creatorId) params.set('creator_id', creatorId);
        if (vendorId) params.set('owner_id', vendorId);
        
        const response = await fetch(`/api/generated/plutus-economics/products?${params.toString()}`);
        const result = await response.json();
        if (result.success) {
          setProducts(result.data?.data || result.data || []);
        }
      } catch (err) {
        console.error('Failed to fetch products:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, [searchParams]);
 
  const types = useMemo(() => {
    const set = new Set<string>();
    products.forEach((p) => set.add(p.product_type));
    return Array.from(set);
  }, [products]);

  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      const matchesSearch = p.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (p.description || '').toLowerCase().includes(searchTerm.toLowerCase());
      const matchesType = !selectedType || p.product_type === selectedType;
      return matchesSearch && matchesType;
    });
  }, [products, searchTerm, selectedType]);

  const formatPrice = (cents: number | null) => {
    if (!cents) return null;
    return `$${(cents / 100).toFixed(2)}`;
  };

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
          <p className="text-sm text-star-dust/40 mt-1">Discover creations from sovereign souls</p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-star-dust/40" size={16} />
            <input type="text" placeholder="Search creations..." value={searchTerm}
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

        {filteredProducts.length === 0 && (
          <div className="text-center py-20">
            <Package className="h-12 w-12 text-star-dust/20 mx-auto mb-4" />
            <p className="text-star-dust/40 text-lg mb-2">{searchTerm ? 'No creations match' : 'The tapestry awaits its first threads'}</p>
          </div>
        )}

        <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.map((product) => {
            const cardData: CardData = { id: product.products_id, type: 'product', title: product.title, description: product.description || '' };
            const allyPrice = product.price_ally;
            const communityPrice = product.price_community;
            return (
              <Link key={product.products_id} href={`/bazaar/creations/${product.products_id}`}>
                <Card data={cardData} variant="interactive" radius="lg" shadow="sm" className="p-5 h-full">
                  <div className="flex items-center justify-between mb-3">
                    <Badge variant="outline" size="sm" className="text-[10px] capitalize">{TYPE_LABELS[product.product_type] || product.product_type}</Badge>
                  </div>
                  <h3 className="text-lg font-semibold text-star-dust mb-2">{product.title}</h3>
                  {product.description && <p className="text-sm text-star-dust/50 line-clamp-2 mb-4">{product.description}</p>}
                  <div className="flex items-center gap-3 mt-auto">
                    {allyPrice && <span className="text-neurospark font-medium">${allyPrice}</span>}
                    {communityPrice && allyPrice && communityPrice < allyPrice && (
                      <span className="text-xs text-star-dust/30 line-through">${allyPrice}</span>
                    )}
                    {communityPrice && <span className="text-xs text-emerald-400">from ${communityPrice} community</span>}
                  </div>
                </Card>
              </Link>
            );
          })}
        </div>
      </div>
    </main>
  );
}