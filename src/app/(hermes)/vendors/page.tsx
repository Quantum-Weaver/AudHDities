// app/(hermes)/vendors/page.tsx
// Vendors - Directory of sovereign vendors
// Feeling: Trustworthy, abundant, ethical

import { Page } from '@/components/arrchive/layout/Page';
import { VendorGrid } from '@/components/bazaar/VendorGrid';
import { SearchBar } from '@/components/bazaar/SearchBar';
import { FilterSidebar } from '@/components/bazaar/FilterSidebar';
import { SortDropdown } from '@/components/bazaar/SortDropdown';
import { Pagination } from '@/components/shared/Pagination';
import { createServerSupabase } from '@/lib/supabase/server';

interface VendorsPageProps {
  searchParams: Promise<{
    q?: string;
    type?: string;
    sort?: string;
    page?: string;
  }>;
}

export default async function VendorsPage({ searchParams }: VendorsPageProps) {
  const params = await searchParams;
  const supabase = await createServerSupabase();
  
  const searchQuery = params.q || '';
  const businessType = params.type || '';
  const sortBy = params.sort || 'popular';
  const currentPage = parseInt(params.page || '1');
  const itemsPerPage = 24;
  
  // Build query
  let query = supabase
    .from('vendor_profiles')
    .select('*, user:profiles(*)', { count: 'exact' })
    .eq('verification_status', 'verified');
  
  if (searchQuery) {
    query = query.or(`business_name.ilike.%${searchQuery}%,user.display_name.ilike.%${searchQuery}%`);
  }
  
  if (businessType) {
    query = query.eq('business_type', businessType);
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
      query = query.order('business_name', { ascending: true });
      break;
    default:
      query = query.order('total_sales', { ascending: false });
  }
  
  // Apply pagination
  const from = (currentPage - 1) * itemsPerPage;
  const to = from + itemsPerPage - 1;
  query = query.range(from, to);
  
  const { data: vendors, count } = await query;
  const totalPages = Math.ceil((count || 0) / itemsPerPage);

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
              Sovereign Vendors
            </h1>
            <p className="text-white/60">
              Ethical merchants building a better economy
            </p>
          </div>

          {/* Search & Filters */}
          <div className="flex flex-col md:flex-row gap-4 mb-8">
            <div className="flex-1">
              <SearchBar 
                placeholder="Search vendors..." 
                defaultValue={searchQuery}
              />
            </div>
            <div className="flex gap-3">
              <FilterSidebar type="vendors" currentType={businessType} />
              <SortDropdown type="vendors" currentSort={sortBy} />
            </div>
          </div>

          {/* Results Count */}
          <div className="text-sm text-white/40 mb-4">
            {count || 0} sovereign vendors
          </div>

          {/* Vendor Grid */}
          <VendorGrid vendors={vendors || []} />

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="mt-8">
              <Pagination currentPage={currentPage} totalPages={totalPages} />
            </div>
          )}

          {/* Empty State */}
          {(!vendors || vendors.length === 0) && (
            <div className="text-center py-16">
              <div className="text-6xl mb-4">🏪</div>
              <h3 className="text-xl font-bold text-white mb-2">No vendors found</h3>
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