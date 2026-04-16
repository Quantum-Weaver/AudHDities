// app/(athena)/quests/[id]/page.tsx
// Quest Detail - Single quest view
// Feeling: Challenging, rewarding, transformative

import { notFound } from 'next/navigation';
import { Page } from '@/components/arrchive/layout/Page';
import { QuestDescription } from '@/components/library/QuestDescription';
import { RequirementsList } from '@/components/library/RequirementsList';
import { RewardDisplay } from '@/components/library/RewardDisplay';
import { PrerequisiteCheck } from '@/components/library/PrerequisiteCheck';
import { BeginQuestButton } from '@/components/library/BeginQuestButton';
import { QuestProgress } from '@/components/library/QuestProgress';
import { RelatedQuests } from '@/components/library/RelatedQuests';
import { createServerSupabase } from '@/lib/supabase/server';
import { auth } from '@/lib/auth';

interface QuestPageProps {
  params: Promise<{ id: string }>;
}

export default async function QuestPage({ params }: QuestPageProps) {
  const { id } = await params;
  const supabase = await createServerSupabase();
  const session = await auth();
  
  // Fetch quest
  const { data: quest, error } = await supabase
    .from('quests')
    .select('*')
    .eq('id', id)
    .single();
  
  if (error || !quest) {
    notFound();
  }
  
  // Fetch user progress (if authenticated)
  let userQuest = null;
  if (session) {
    const { data: progress } = await supabase
      .from('user_quests')
      .select('*')
      .eq('quest_id', id)
      .eq('user_id', session.user.id)
      .single();
    userQuest = progress;
  }
  
  // Fetch prerequisite quest (if any)
  let prerequisite = null;
  if (quest.prerequisite_quest_id) {
    const { data: prereq } = await supabase
      .from('quests')
      .select('*')
      .eq('id', quest.prerequisite_quest_id)
      .single();
    prerequisite = prereq;
  }
  
  // Fetch related quests (same house)
  const { data: related } = await supabase
    .from('quests')
    .select('*')
    .eq('house', quest.house)
    .neq('id', id)
    .limit(3);

  // Determine environment based on quest house
  const houseEnvironments: Record<string, string> = {
    hearth_keeper: 'home',
    chancellor: 'invitation',
    seer: 'observatory',
    aethelred: 'nexus',
    curator: 'library',
    archivist: 'library',
    skald: 'music',
    codex: 'library',
    executioner: 'council',
  };
  
  const environment = houseEnvironments[quest.house] || 'library';

  return (
    <Page 
      variant={2}
      environment={environment}
      showForeground={true}
      animated={true}
      showContinuityBeam={true}
    >
      <main className="min-h-screen py-12">
        <div className="container max-w-4xl mx-auto px-6">
          
          {/* Header */}
          <div className="mb-8">
            <div className="text-sm text-white/40 mb-2">
              <span className="hover:text-white/60 transition-colors cursor-pointer">The Path</span>
              <span className="mx-2">/</span>
              <span className="text-white/60">{quest.title}</span>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
              {quest.title}
            </h1>
            <div className="flex items-center gap-3">
              <span className="text-sm px-3 py-1 rounded-full bg-white/10 text-white/60 capitalize">
                {quest.house.replace('_', ' ')}
              </span>
              <span className="text-sm text-white/40">
                Sovereign Reward: +{quest.sovereignty_reward}
              </span>
            </div>
          </div>

          {/* Quest Progress (if in progress) */}
          {userQuest && userQuest.status === 'in_progress' && (
            <div className="mb-8">
              <QuestProgress quest={quest} userQuest={userQuest} />
            </div>
          )}

          {/* Main Content */}
          <div className="grid lg:grid-cols-3 gap-8">
            
            {/* Left Column - Quest Content */}
            <div className="lg:col-span-2 space-y-6">
              <QuestDescription quest={quest} />
              
              {userQuest && userQuest.status === 'in_progress' && (
                <div className="bg-white/5 border border-white/10 rounded-xl p-6">
                  <h3 className="text-lg font-semibold text-white mb-4">Submission</h3>
                  <p className="text-white/60 mb-4">
                    Submit your completion proof here.
                  </p>
                  {/* Submission form would go here */}
                </div>
              )}
            </div>
            
            {/* Right Column - Meta Info */}
            <div className="space-y-6">
              <RequirementsList quest={quest} userQuest={userQuest} />
              
              <RewardDisplay quest={quest} />
              
              {prerequisite && (
                <PrerequisiteCheck prerequisite={prerequisite} userProgress={userQuest} />
              )}
              
              {(!userQuest || userQuest.status === 'available') && (
                <BeginQuestButton questId={quest.id} prerequisite={prerequisite} />
              )}
            </div>
          </div>

          {/* Related Quests */}
          {related && related.length > 0 && (
            <div className="mt-12">
              <h2 className="text-2xl font-bold text-white mb-6">Related Quests</h2>
              <RelatedQuests quests={related} />
            </div>
          )}
        </div>
      </main>
    </Page>
  );
}