// app/(hermes)/creations/page.tsx
// Creations - All products listing
// Feeling: Abundant, discoverable, inspiring
// Environment: community

import { Page } from '@/components/arrchive/layout/Page';
import { ProductGrid } from '@/components/hermes/ProductGrid';
import { SearchBar } from '@/components/hermes/SearchBar';
import { FilterSidebar } from '@/components/hermes/FilterSidebar';
import { SortDropdown } from '@/components/hermes/SortDropdown';
import { Pagination } from '@/components/shared/Pagination';
import { createServerSupabase } from '@/lib/supabase/server';

interface CreationsPageProps {
  searchParams: Promise<{
    q?: string;
    category?: string;
    sort?: string;
    page?: string;
  }>;
}

export const metadata = {
  title: 'Creations | Sovereign Sanctuary',
  description: 'All creations in the Bazaar'
};

export default async function CreationsPage({ searchParams }: CreationsPageProps) {
  const params = await searchParams;
  const supabase = await createServerSupabase();

  const searchQuery = params.q || '';
  const categoryFilter = params.category || '';
  const sortBy = params.sort || 'newest';
  const currentPage = parseInt(params.page || '1');
  const itemsPerPage = 24;

  let query = supabase
    .from('products')
    .select('*, creator:creator_id(*)', { count: 'exact' })
    .eq('is_published', true)
    .eq('active', true);

  if (categoryFilter) {
    query = query.eq('product_type', categoryFilter);
  }
  if (searchQuery) {
    query = query.or(`title.ilike.%${searchQuery}%,description.ilike.%${searchQuery}%`);
  }

  // Sorting
  switch (sortBy) {
    case 'price_low': query = query.order('price_ally', { ascending: true }); break;
    case 'price_high': query = query.order('price_ally', { ascending: false }); break;
    case 'name_asc': query = query.order('title', { ascending: true }); break;
    case 'name_desc': query = query.order('title', { ascending: false }); break;
    default: query = query.order('created_at', { ascending: false });
  }

  const from = (currentPage - 1) * itemsPerPage;
  const to = from + itemsPerPage - 1;
  query = query.range(from, to);

  const { data: products, count } = await query;
  const totalPages = Math.ceil((count || 0) / itemsPerPage);

  const environment = 'community';

  return (
    <Page 
      variant={2}
      environment={environment}
      showForeground={false}
      animated={true}
      showContinuityBeam={true}
    >
      <main className="min-h-screen py-12">
        <div className="container max-w-7xl mx-auto px-6">
          
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-white mb-2">
              All Creations
            </h1>
            <p className="text-white/60">
              {count || 0} sovereign creations
            </p>
          </div>

          <div className="flex flex-col md:flex-row gap-4 mb-8">
            <div className="flex-1">
              <SearchBar defaultValue={searchQuery} />
            </div>
            <div className="flex gap-3">
              <SortDropdown currentSort={sortBy} />
              <FilterSidebar currentCategory={categoryFilter} />
            </div>
          </div>

          <ProductGrid products={products || []} />

          {totalPages > 1 && (
            <div className="mt-8">
              <Pagination currentPage={currentPage} totalPages={totalPages} />
            </div>
          )}
        </div>
      </main>
    </Page>
  );
}