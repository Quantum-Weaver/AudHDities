// app/(athena)/badges/page.tsx
// The Honors - All badges gallery
// Feeling: Celebratory, motivating, aspirational

import { Page } from '@/components/arrchive/layout/Page';
import { BadgeGallery } from '@/components/library/BadgeGallery';
import { CategoryFilters } from '@/components/library/CategoryFilters';
import { EarnedBadges } from '@/components/library/EarnedBadges';
import { LockedBadges } from '@/components/library/LockedBadges';
import { ProgressToNext } from '@/components/library/ProgressToNext';
import { SearchBar } from '@/components/library/SearchBar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/Tabs';
import { createServerSupabase } from '@/lib/supabase/server';
import { auth } from '@/lib/auth';

interface BadgesPageProps {
  searchParams: Promise<{
    category?: string;
    q?: string;
  }>;
}

export default async function BadgesPage({ searchParams }: BadgesPageProps) {
  const params = await searchParams;
  const supabase = await createServerSupabase();
  const session = await auth();
  
  const category = params.category || '';
  const searchQuery = params.q || '';
  
  // Fetch all badges
  let query = supabase
    .from('badges')
    .select('*');
  
  if (category) {
    query = query.eq('category', category);
  }
  
  if (searchQuery) {
    query = query.or(`name.ilike.%${searchQuery}%,description.ilike.%${searchQuery}%`);
  }
  
  const { data: allBadges } = await query.order('rarity', { ascending: true });
  
  // Fetch user's earned badges (if authenticated)
  let earnedBadgeIds: string[] = [];
  if (session) {
    const { data: earned } = await supabase
      .from('user_badges')
      .select('badge_id')
      .eq('user_id', session.user.id);
    earnedBadgeIds = earned?.map(b => b.badge_id) || [];
  }
  
  const earnedBadgesList = allBadges?.filter(b => earnedBadgeIds.includes(b.id)) || [];
  const lockedBadgesList = allBadges?.filter(b => !earnedBadgeIds.includes(b.id)) || [];

  return (
    <Page 
      variant={1}
      environment="council"
      showForeground={false}
      animated={true}
      showContinuityBeam={true}
    >
      <main className="min-h-screen py-12">
        <div className="container max-w-7xl mx-auto px-6">
          
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
              The Honors
            </h1>
            <p className="text-white/60">
              Each badge is a story. Each story is a milestone.
            </p>
          </div>

          {/* Search & Filters */}
          <div className="flex flex-col md:flex-row gap-4 mb-8">
            <div className="flex-1">
              <SearchBar defaultValue={searchQuery} />
            </div>
            <CategoryFilters currentCategory={category} />
          </div>

          {/* Progress (authenticated only) */}
          {session && (
            <div className="mb-8">
              <ProgressToNext 
                earnedCount={earnedBadgesList.length} 
                totalCount={allBadges?.length || 0} 
              />
            </div>
          )}

          {/* Badge Tabs */}
          <Tabs defaultValue="all">
            <TabsList className="w-full">
              <TabsTrigger value="all">All Badges ({allBadges?.length || 0})</TabsTrigger>
              {session && (
                <>
                  <TabsTrigger value="earned">Earned ({earnedBadgesList.length})</TabsTrigger>
                  <TabsTrigger value="locked">Locked ({lockedBadgesList.length})</TabsTrigger>
                </>
              )}
            </TabsList>
            
            <TabsContent value="all" className="mt-6">
              <BadgeGallery badges={allBadges || []} earnedIds={earnedBadgeIds} />
            </TabsContent>
            
            {session && (
              <>
                <TabsContent value="earned" className="mt-6">
                  <EarnedBadges badges={earnedBadgesList} />
                </TabsContent>
                
                <TabsContent value="locked" className="mt-6">
                  <LockedBadges badges={lockedBadgesList} />
                </TabsContent>
              </>
            )}
          </Tabs>
        </div>
      </main>
    </Page>
  );
}