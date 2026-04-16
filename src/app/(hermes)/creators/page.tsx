// app/(hermes)/creators/page.tsx
// Creators - Directory of sovereign creators
// Feeling: Connected, inspired, supportive

import { Page } from '@/components/arrchive/layout/Page';
import { CreatorGrid } from '@/components/bazaar/CreatorGrid';
import { SearchBar } from '@/components/bazaar/SearchBar';
import { FilterSidebar } from '@/components/bazaar/FilterSidebar';
import { SortDropdown } from '@/components/bazaar/SortDropdown';
import { Pagination } from '@/components/shared/Pagination';
import { createServerSupabase } from '@/lib/supabase/server';

interface CreatorsPageProps {
  searchParams: Promise<{
    q?: string;
    category?: string;
    sort?: string;
    page?: string;
  }>;
}

export default async function CreatorsPage({ searchParams }: CreatorsPageProps) {
  const params = await searchParams;
  const supabase = await createServerSupabase();
  
  const searchQuery = params.q || '';
  const category = params.category || '';
  const sortBy = params.sort || 'popular';
  const currentPage = parseInt(params.page || '1');
  const itemsPerPage = 24;
  
  // Build query for creator profiles
  let query = supabase
    .from('creator_profiles')
    .select('*, user:profiles(*)', { count: 'exact' })
    .eq('verification_status', 'verified');
  
  if (searchQuery) {
    query = query.or(`creator_moniker.ilike.%${searchQuery}%,user.display_name.ilike.%${searchQuery}%`);
  }
  
  if (category) {
    query = query.contains('creative_categories', [category]);
  }
  
  // Apply sorting
  switch (sortBy) {
    case 'popular':
      query = query.order('total_sales', { ascending: false });
      break;
    case 'newest':
      query = query.order('created_at', { ascending: false });
      break;
    case 'name_asc':
      query = query.order('creator_moniker', { ascending: true });
      break;
    default:
      query = query.order('total_sales', { ascending: false });
  }
  
  // Apply pagination
  const from = (currentPage - 1) * itemsPerPage;
  const to = from + itemsPerPage - 1;
  query = query.range(from, to);
  
  const { data: creators, count } = await query;
  const totalPages = Math.ceil((count || 0) / itemsPerPage);

  return (
    <Page 
      variant={1}
      environment="community"
      showForeground={false}
      animated={true}
      showContinuityBeam={true}
    >
      <main className="min-h-screen py-12">
        <div className="container max-w-7xl mx-auto px-6">
          
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
              Sovereign Creators
            </h1>
            <p className="text-white/60">
              Meet the souls weaving the Sanctuary into being
            </p>
          </div>

          {/* Search & Filters */}
          <div className="flex flex-col md:flex-row gap-4 mb-8">
            <div className="flex-1">
              <SearchBar 
                placeholder="Search creators..." 
                defaultValue={searchQuery}
              />
            </div>
            <div className="flex gap-3">
              <FilterSidebar type="creators" currentCategory={category} />
              <SortDropdown type="creators" currentSort={sortBy} />
            </div>
          </div>

          {/* Results Count */}
          <div className="text-sm text-white/40 mb-4">
            {count || 0} sovereign creators
          </div>

          {/* Creator Grid */}
          <CreatorGrid creators={creators || []} />

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="mt-8">
              <Pagination currentPage={currentPage} totalPages={totalPages} />
            </div>
          )}

          {/* Empty State */}
          {(!creators || creators.length === 0) && (
            <div className="text-center py-16">
              <div className="text-6xl mb-4">✨</div>
              <h3 className="text-xl font-bold text-white mb-2">No creators found</h3>
              <p className="text-white/60">
                Try adjusting your search or filter criteria
              </p>
            </div>
          )}
        </div>
      </main>
    </Page>
  );
}