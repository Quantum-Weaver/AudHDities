// app/(hermes)/page.tsx
// The Bazaar - Marketplace hub
// Feeling: Abundant, curious, playful, connected
// Environment: community (social marketplace)

import { Page } from '@/components/arrchive/shared/Page';
import { ProductGrid } from '@/components/hermes/ProductGrid';
import { SearchBar } from '@/components/hermes/SearchBar';
import { FilterSidebar } from '@/components/hermes/FilterSidebar';
import { SortDropdown } from '@/components/hermes/SortDropdown';
import { CategoryTabs } from '@/components/hermes/CategoryTabs';
import { TrendingCarousel } from '@/components/hermes/TrendingCarousel';
import { createServerSupabase } from '@/lib/supabase/server';

export const metadata = {
  title: 'The Bazaar | Sovereign Sanctuary',
  description: 'Discover creations from the neurodivergent community'
};

export default async function BazaarPage() {
  const supabase = await createServerSupabase();

  // Fetch trending products
  const { data: trending } = await supabase
    .from('products')
    .select('*, creator:creator_id(*)')
    .eq('is_published', true)
    .eq('active', true)
    .order('sales_count', { ascending: false })
    .limit(10);

  // Fetch recent products
  const { data: recent } = await supabase
    .from('products')
    .select('*, creator:creator_id(*)')
    .eq('is_published', true)
    .eq('active', true)
    .order('created_at', { ascending: false })
    .limit(12);

  // Community environment for marketplace
  const environment = 'community';

  return (
    <Page 
      variant={1}
      environment={environment}
      showForeground={false}
      animated={true}
      showContinuityBeam={true}
    >
      <main className="min-h-screen py-12">
        <div className="container max-w-7xl mx-auto px-6">
          
          <div className="mb-8 text-center">
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
              The Bazaar
            </h1>
            <p className="text-white/60 max-w-2xl mx-auto">
              Where sovereign creators share their gifts
            </p>
          </div>

          {/* Search and Filters */}
          <div className="flex flex-col md:flex-row gap-4 mb-8">
            <div className="flex-1">
              <SearchBar />
            </div>
            <div className="flex gap-3">
              <SortDropdown />
              <FilterSidebar />
            </div>
          </div>

          {/* Category Tabs */}
          <div className="mb-8">
            <CategoryTabs />
          </div>

          {/* Trending Section */}
          {trending && trending.length > 0 && (
            <div className="mb-12">
              <h2 className="text-xl font-semibold text-white mb-4">
                🔥 Trending Now
              </h2>
              <TrendingCarousel products={trending} />
            </div>
          )}

          {/* Recent Creations */}
          <div>
            <h2 className="text-xl font-semibold text-white mb-4">
              ✨ Recent Creations
            </h2>
            <ProductGrid products={recent || []} />
          </div>
        </div>
      </main>
    </Page>
  );
}