// src/app/(marketplace)/products/page.tsx
import { Metadata } from 'next';
import { createServerSupabase } from '@/lib/supabase/server';
import { Page } from '@/components/layout/Page';
import { ProductGrid } from '@/components/products/ProductGrid';
import { Input } from '@/components/ui/Input';
import { Search } from 'lucide-react';
import Link from 'next/link';
import type { productTypeLabels } from '@/types/supabase/tables/products';

export const metadata: Metadata = {
  title: 'All Products | AUDHDITIES Marketplace',
  description: 'Discover creations from the neurodivergent community',
};

interface ProductsPageProps {
  searchParams: Promise<{ q?: string; category?: keyof typeof productTypeLabels; sort?: string }> | { q?: string; category?: keyof typeof productTypeLabels; sort?: string };
}

async function getSearchParams(searchParams: ProductsPageProps['searchParams']): Promise<{ q?: string; category?: keyof typeof productTypeLabels; sort?: string }> {
  if (searchParams instanceof Promise) {
    return await searchParams;
  }
  return searchParams;
}

export default async function ProductsPage({ searchParams }: ProductsPageProps) {
  const params = await getSearchParams(searchParams);
  const supabase = await createServerSupabase();
  
  const searchQuery = params.q || '';
  const categoryFilter = params.category || '';
  const sortBy = params.sort || 'newest';
  
  // Build query
  let query = supabase
    .from('products')
    .select('*', { count: 'exact' })
    .eq('is_published', true)
    .eq('active', true);
  
  if (categoryFilter) {
    query = query.eq('product_type', categoryFilter);
  }
  
  if (searchQuery) {
    query = query.or(`title.ilike.%${searchQuery}%,description.ilike.%${searchQuery}%`);
  }
  
  // Apply sorting
  switch (sortBy) {
    case 'newest':
      query = query.order('created_at', { ascending: false });
      break;
    case 'oldest':
      query = query.order('created_at', { ascending: true });
      break;
    case 'price_low':
      query = query.order('price_ally', { ascending: true });
      break;
    case 'price_high':
      query = query.order('price_ally', { ascending: false });
      break;
    case 'name_asc':
      query = query.order('title', { ascending: true });
      break;
    case 'name_desc':
      query = query.order('title', { ascending: false });
      break;
    default:
      query = query.order('created_at', { ascending: false });
  }
  
  const { data: products, count } = await query.limit(48);
  
  return (
    <Page 
      variant={1}
      environment="marketplace"
      showForeground={false}
      animated={true}
      showContinuityBeam={true}
    >
      <main className="min-h-screen py-12">
        <div className="container max-w-7xl mx-auto px-6">
          
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
              All Products
            </h1>
            <p className="text-white/60">
              Discover {count || 0} creations from the neurodivergent community
            </p>
          </div>
          
          {/* Search Bar */}
          <form action="/products" method="GET" className="mb-8">
            <div className="relative max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-white/40" size={18} />
              <Input
                name="q"
                type="text"
                placeholder="Search products..."
                defaultValue={searchQuery}
                className="pl-10"
              />
              {searchQuery && (
                <Link
                  href="/products"
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-white/40 hover:text-white"
                >
                  ✕
                </Link>
              )}
            </div>
          </form>
          
          {/* Products Grid */}
          <ProductGrid
            products={products || []}
            variant="marketplace"
            showFilters={true}
            showSearch={false}
            showViewToggle={true}
          />
        </div>
      </main>
    </Page>
  );
}