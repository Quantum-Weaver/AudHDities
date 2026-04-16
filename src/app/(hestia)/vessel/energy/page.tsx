// app/(hestia)/energy/page.tsx
// Energy Log - Mood tracking, energy levels
// Feeling: Reflective, healing, restorative
// Environment: support (healing space)

import { redirect } from 'next/navigation';
import { Page } from '@/components/arrchive/layout/Page';
import { MoodTracker } from '@/components/hestia/MoodTracker';
import { EnergyChart } from '@/components/hestia/EnergyChart';
import { SessionTimeline } from '@/components/hestia/SessionTimeline';
import { SpoonCounter } from '@/components/hestia/SpoonCounter';
import { RestRecommendations } from '@/components/hestia/RestRecommendations';
import { createServerSupabase } from '@/lib/supabase/server';
import { auth } from '@/lib/auth';

export const metadata = {
  title: 'Energy Log | Sovereign Sanctuary',
  description: 'Track your energy and mood'
};

export default async function EnergyPage() {
  const supabase = await createServerSupabase();
  const session = await auth();
  
  if (!session) {
    redirect('/enter');
  }

  const { data: energyEntries } = await supabase
    .from('energy_entries')
    .select('*')
    .eq('user_id', session.user.id)
    .order('created_at', { ascending: false })
    .limit(30);

  const { data: moodEntries } = await supabase
    .from('mood_entries')
    .select('*')
    .eq('user_id', session.user.id)
    .order('created_at', { ascending: false })
    .limit(30);

  // Calculate average energy for recommendations
  const avgEnergy = energyEntries?.reduce((sum, e) => sum + (e.energy_level || 0), 0) / (energyEntries?.length || 1);

  // Environment based on energy level
  const environment = avgEnergy < 30 ? 'support' : avgEnergy < 60 ? 'home' : 'music';

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
          
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-white mb-2">
              Energy Log
            </h1>
            <p className="text-white/60">
              Listen to your vessel
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-8">
              <MoodTracker entries={moodEntries || []} />
              <EnergyChart entries={energyEntries || []} />
              <SessionTimeline />
            </div>
            <div className="space-y-8">
              <SpoonCounter currentEnergy={avgEnergy} />
              <RestRecommendations energyLevel={avgEnergy} />
            </div>
          </div>
        </div>
      </main>
    </Page>
  );
}