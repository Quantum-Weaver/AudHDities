// app/(hestia)/energy/[id]/page.tsx
// Energy Entry Detail - Single energy log entry
// Feeling: Reflective, healing, insightful

import { notFound, redirect } from 'next/navigation';
import { Page } from '@/components/arrchive/layout/Page';
import { EnergyEntryView } from '@/components/hestia/EnergyEntryView';
import { EnergyChart } from '@/components/hestia/EnergyChart';
import { MoodSnapshot } from '@/components/hestia/MoodSnapshot';
import { EntryNavigation } from '@/components/hestia/EntryNavigation';
import { EntryActions } from '@/components/hestia/EntryActions';
import { RelatedEntries } from '@/components/hestia/RelatedEntries';
import { RestRecommendations } from '@/components/hestia/RestRecommendations';
import { createServerSupabase } from '@/lib/supabase/server';
import { auth } from '@/lib/auth';

interface EnergyEntryPageProps {
  params: Promise<{ id: string }>;
}

export default async function EnergyEntryPage({ params }: EnergyEntryPageProps) {
  const { id } = await params;
  const supabase = await createServerSupabase();
  const session = await auth();
  
  if (!session) {
    redirect('/enter');
  }

  // Fetch the energy entry
  const { data: entry } = await supabase
    .from('energy_entries')
    .select('*, mood_entries(*)')
    .eq('id', id)
    .eq('user_id', session.user.id)
    .single();

  if (!entry) {
    notFound();
  }

  // Fetch adjacent entries for navigation
  const { data: adjacent } = await supabase
    .from('energy_entries')
    .select('id, energy_level, created_at')
    .eq('user_id', session.user.id)
    .order('created_at', { ascending: false });

  const currentIndex = adjacent?.findIndex(e => e.id === id) || 0;
  const prevEntry = adjacent?.[currentIndex + 1];
  const nextEntry = adjacent?.[currentIndex - 1];

  // Fetch related entries (same energy range)
  const { data: relatedEntries } = await supabase
    .from('energy_entries')
    .select('id, energy_level, created_at')
    .eq('user_id', session.user.id)
    .neq('id', id)
    .gte('energy_level', (entry.energy_level || 0) - 10)
    .lte('energy_level', (entry.energy_level || 0) + 10)
    .order('created_at', { ascending: false })
    .limit(3);

  // Environment based on energy level
  const environment = (entry.energy_level || 50) < 30 ? 'support' : 'home';

  return (
    <Page 
      variant={2}
      environment={environment}
      showForeground={false}
      animated={true}
      showContinuityBeam={true}
    >
      <main className="min-h-screen py-12">
        <div className="container max-w-4xl mx-auto px-6">
          
          <EntryNavigation 
            prevEntry={prevEntry} 
            nextEntry={nextEntry}
            basePath="/vessel/energy"
          />

          <div className="bg-black/40 backdrop-blur-md rounded-xl p-8 mb-8">
            <EnergyEntryView entry={entry} />
            <EntryActions entryId={entry.id} type="energy" />
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <EnergyChart 
              entries={adjacent?.slice(0, 7) || []} 
              highlightId={entry.id}
            />
            <MoodSnapshot 
              mood={entry.mood} 
              date={entry.created_at}
              energyLevel={entry.energy_level}
            />
          </div>

          {relatedEntries && relatedEntries.length > 0 && (
            <div className="mt-8">
              <RelatedEntries entries={relatedEntries} type="energy" />
            </div>
          )}

          <div className="mt-8">
            <RestRecommendations energyLevel={entry.energy_level || 50} />
          </div>
        </div>
      </main>
    </Page>
  );
}