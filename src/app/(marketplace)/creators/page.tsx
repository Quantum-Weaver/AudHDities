// src/app/(marketplace)/creators/page.tsx
import { Metadata } from 'next';
import { createServerSupabase } from '@/lib/supabase/server';
import { Page } from '@/components/layout/Page';
import { CreatorCard } from '@/components/profiles/CreatorCard';
import { Input } from '@/components/ui/Input';
import { Search } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Creators | AUDHDITIES Marketplace',
  description: 'Discover creators from the neurodivergent community',
};

export default async function CreatorsPage({
  searchParams,
}: {
  searchParams: { q?: string };
}) {
  const supabase = await createServerSupabase();
  const searchQuery = searchParams.q || '';
  
  // Use the explicit foreign key name: creator_profiles_id_fkey
  let query = supabase
    .from('profiles')
    .select(`
      id,
      username,
      display_name,
      avatar_url,
      bio,
      creator_profiles!creator_profiles_id_fkey (
        verified_badge,
        creative_categories,
        total_products,
        total_sales
      )
    `)
    .eq('is_creator', true);
  
  if (searchQuery) {
    query = query.or(`display_name.ilike.%${searchQuery}%,username.ilike.%${searchQuery}%`);
  }
  
  const { data: creators, error } = await query.limit(48);
  
  // Log any errors for debugging
  if (error) {
    console.error('Error fetching creators:', error);
  }
  
  // Filter out any creators without creator_profiles (shouldn't happen with inner join)
  const validCreators = (creators || []).filter(creator => creator.creator_profiles !== null);
  
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
              Creators
            </h1>
            <p className="text-white/60">
              Discover {validCreators.length} creators from the neurodivergent community
            </p>
          </div>
          
          {/* Search Bar */}
          <form action="/creators" method="GET" className="mb-8">
            <div className="relative max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-white/40" size={18} />
              <Input
                name="q"
                type="text"
                placeholder="Search creators..."
                defaultValue={searchQuery}
                className="pl-10"
              />
            </div>
          </form>
          
          {/* Creators Grid */}
          {validCreators.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {validCreators.map((creator) => (
                <CreatorCard key={creator.id} creator={creator} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-white/5 flex items-center justify-center">
                <Search size={32} className="text-white/20" />
              </div>
              <h3 className="text-white font-bold mb-2">No creators found</h3>
              <p className="text-white/40 text-sm">
                {searchQuery ? "Try a different search term." : "Be the first creator to join!"}
              </p>
            </div>
          )}
        </div>
      </main>
    </Page>
  );
}