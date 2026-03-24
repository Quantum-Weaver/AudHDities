// src/app/(marketplace)/vendors/page.tsx
import { Metadata } from 'next';
import { createServerSupabase } from '@/lib/supabase/server';
import { Page } from '@/components/layout/Page';
import { VendorCard } from '@/components/profiles/VendorCard';
import { Input } from '@/components/ui/Input';
import { Search, Store } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Vendors | AUDHDITIES Marketplace',
  description: 'Discover vendors from the neurodivergent community',
};

export default async function VendorsPage({
  searchParams,
}: {
  searchParams: { q?: string };
}) {
  const supabase = await createServerSupabase();
  const searchQuery = searchParams.q || '';
  
  // Fetch vendors using explicit foreign key reference
  let query = supabase
    .from('profiles')
    .select(`
      id,
      username,
      display_name,
      avatar_url,
      bio,
      vendor_profiles!vendor_profiles_id_fkey (
        business_name,
        business_type,
        verified_badge,
        product_categories,
        total_products,
        total_sales
      )
    `)
    .eq('is_vendor', true);
  
  if (searchQuery) {
    query = query.or(`vendor_profiles.business_name.ilike.%${searchQuery}%,display_name.ilike.%${searchQuery}%,username.ilike.%${searchQuery}%`);
  }
  
  const { data: vendors, error } = await query.limit(48);
  
  if (error) {
    console.error('Error fetching vendors:', error);
  }
  
  // Filter out vendors without vendor_profiles and handle nulls
  const validVendors = (vendors || [])
    .filter(vendor => vendor.vendor_profiles !== null)
    .map(vendor => ({
      id: vendor.id,
      username: vendor.username,
      display_name: vendor.display_name,
      avatar_url: vendor.avatar_url,
      bio: vendor.bio,
      vendor_profiles: {
        business_name: vendor.vendor_profiles?.business_name ?? 'Unnamed Business',
        business_type: vendor.vendor_profiles?.business_type ?? null,
        verified_badge: vendor.vendor_profiles?.verified_badge ?? false,
        product_categories: vendor.vendor_profiles?.product_categories ?? [],
        total_products: vendor.vendor_profiles?.total_products ?? 0,
        total_sales: vendor.vendor_profiles?.total_sales ?? 0,
      }
    }));
  
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
            <div className="flex items-center gap-3 mb-2">
              <Store className="text-cyan-400" size={28} />
              <h1 className="text-3xl md:text-4xl font-bold text-white">
                Vendors
              </h1>
            </div>
            <p className="text-white/60">
              Discover {validVendors.length} vendors from the neurodivergent community
            </p>
          </div>
          
          {/* Search Bar */}
          <form action="/vendors" method="GET" className="mb-8">
            <div className="relative max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-white/40" size={18} />
              <Input
                name="q"
                type="text"
                placeholder="Search vendors by name or business..."
                defaultValue={searchQuery}
                className="pl-10"
              />
            </div>
          </form>
          
          {/* Vendors Grid */}
          {validVendors.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {validVendors.map((vendor) => (
                <VendorCard key={vendor.id} vendor={vendor} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-white/5 flex items-center justify-center">
                <Store size={32} className="text-white/20" />
              </div>
              <h3 className="text-white font-bold mb-2">No vendors found</h3>
              <p className="text-white/40 text-sm">
                {searchQuery ? "Try a different search term." : "Be the first vendor to join!"}
              </p>
            </div>
          )}
        </div>
      </main>
    </Page>
  );
}