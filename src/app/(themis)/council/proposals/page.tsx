// app/(themis)/council/proposals/page.tsx
// Proposals - All governance proposals
// Feeling: Collaborative, transparent, engaging

import { Page } from '@/components/arrchive/layout/Page';
import { ProposalCards } from '@/components/council/ProposalCards';
import { StatusFilters } from '@/components/council/StatusFilters';
import { CategoryTags } from '@/components/council/CategoryTags';
import { CreationButton } from '@/components/council/CreationButton';
import { SearchBar } from '@/components/council/SearchBar';
import { createServerSupabase } from '@/lib/supabase/server';
import { auth } from '@/lib/auth';

interface ProposalsPageProps {
  searchParams: Promise<{
    status?: string;
    category?: string;
    q?: string;
  }>;
}

export default async function ProposalsPage({ searchParams }: ProposalsPageProps) {
  const params = await searchParams;
  const supabase = await createServerSupabase();
  const session = await auth();

  const statusFilter = params.status || '';
  const categoryFilter = params.category || '';
  const searchQuery = params.q || '';

  let query = supabase
    .from('proposals')
    .select('*, proposer:proposer_id(*)')
    .order('created_at', { ascending: false });

  if (statusFilter) {
    query = query.eq('status', statusFilter);
  }
  if (categoryFilter) {
    query = query.eq('category', categoryFilter);
  }
  if (searchQuery) {
    query = query.or(`title.ilike.%${searchQuery}%,description.ilike.%${searchQuery}%`);
  }

  const { data: proposals } = await query;

  return (
    <Page 
      variant={2}
      environment="council"
      showForeground={false}
      animated={true}
      showContinuityBeam={true}
    >
      <main className="min-h-screen py-12">
        <div className="container max-w-7xl mx-auto px-6">
          
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
            <div>
              <h1 className="text-3xl font-bold text-white mb-2">
                Proposals
              </h1>
              <p className="text-white/60">
                Shape the future of the Sanctuary
              </p>
            </div>
            {session && (
              <CreationButton />
            )}
          </div>

          <div className="flex flex-col md:flex-row gap-4 mb-8">
            <div className="flex-1">
              <SearchBar defaultValue={searchQuery} />
            </div>
            <div className="flex gap-3">
              <StatusFilters currentStatus={statusFilter} />
              <CategoryTags currentCategory={categoryFilter} />
            </div>
          </div>

          <ProposalCards proposals={proposals || []} />

          {(!proposals || proposals.length === 0) && (
            <div className="text-center py-16">
              <div className="text-6xl mb-4">📜</div>
              <h3 className="text-xl font-bold text-white mb-2">No Proposals Found</h3>
              <p className="text-white/60">
                Be the first to create a proposal
              </p>
            </div>
          )}
        </div>
      </main>
    </Page>
  );
}