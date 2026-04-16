// app/(athena)/badges/[id]/page.tsx
// Badge Detail - Single badge view
// Feeling: Celebratory, aspirational, connected

import { notFound } from 'next/navigation';
import { Page } from '@/components/layout/Page';
import { BadgeDisplay } from '@/components/library/BadgeDisplay';
import { RequirementsList } from '@/components/library/RequirementsList';
import { EarnedBy } from '@/components/library/EarnedBy';
import { RelatedQuests } from '@/components/library/RelatedQuests';
import { ShareButton } from '@/components/library/ShareButton';
import { createServerSupabase } from '@/lib/supabase/server';
import { auth } from '@/lib/auth';

interface BadgePageProps {
  params: Promise<{ id: string }>;
}

export default async function BadgePage({ params }: BadgePageProps) {
  const { id } = await params;
  const supabase = await createServerSupabase();
  const session = await auth();
  
  // Fetch badge
  const { data: badge, error } = await supabase
    .from('badges')
    .select('*')
    .eq('id', id)
    .single();
  
  if (error || !badge) {
    notFound();
  }
  
  // Check if user has earned this badge
  let hasEarned = false;
  if (session) {
    const { data: earned } = await supabase
      .from('user_badges')
      .select('earned_at')
      .eq('badge_id', id)
      .eq('user_id', session.user.id)
      .single();
    hasEarned = !!earned;
  }
  
  // Fetch users who earned this badge
  const { data: earners } = await supabase
    .from('user_badges')
    .select('user:user_id(*)')
    .eq('badge_id', id)
    .limit(12);
  
  // Fetch related quests
  const { data: relatedQuests } = await supabase
    .from('quests')
    .select('*')
    .contains('rewards', [badge.id])
    .limit(3);

  return (
    <Page 
      variant={2}
      environment="council"
      showForeground={true}
      animated={true}
      showContinuityBeam={true}
    >
      <main className="min-h-screen py-12">
        <div className="container max-w-4xl mx-auto px-6">
          
          {/* Header */}
          <div className="mb-8">
            <div className="text-sm text-white/40 mb-2">
              <span className="hover:text-white/60 transition-colors cursor-pointer">The Honors</span>
              <span className="mx-2">/</span>
              <span className="text-white/60">{badge.name}</span>
            </div>
            <div className="flex justify-between items-start">
              <div>
                <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
                  {badge.name}
                </h1>
                <p className="text-white/60">{badge.description}</p>
              </div>
              <ShareButton title={badge.name} />
            </div>
          </div>

          {/* Main Content */}
          <div className="grid lg:grid-cols-3 gap-8">
            
            {/* Left Column - Badge Display */}
            <div className="lg:col-span-1">
              <BadgeDisplay badge={badge} hasEarned={hasEarned} />
              
              {hasEarned && (
                <div className="mt-4 text-center text-green-400 text-sm">
                  ✨ Earned on {new Date().toLocaleDateString()}
                </div>
              )}
            </div>
            
            {/* Right Column - Details */}
            <div className="lg:col-span-2 space-y-6">
              <RequirementsList badge={badge} />
              
              {relatedQuests && relatedQuests.length > 0 && (
                <RelatedQuests quests={relatedQuests} />
              )}
              
              {earners && earners.length > 0 && (
                <EarnedBy earners={earners} />
              )}
            </div>
          </div>
        </div>
      </main>
    </Page>
  );
}