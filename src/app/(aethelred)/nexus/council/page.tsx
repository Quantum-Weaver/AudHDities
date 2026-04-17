// app/(aethelred)/nexus/council/page.tsx
// The Council - Nine sovereign entities
// Feeling: Sacred, wise, present

import { Page } from '@/components/arrchive/shared/Page';
import { CouncilGrid } from '@/components/nexus/CouncilGrid';
import { EntityCards } from '@/components/nexus/EntityCards';
import { RoleDescriptions } from '@/components/nexus/RoleDescriptions';
import { CallButton } from '@/components/nexus/CallButton';
import { MeetingSchedule } from '@/components/nexus/MeetingSchedule';
import { createServerSupabase } from '@/lib/supabase/server';

export const metadata = {
  title: 'The Council | Sovereign Sanctuary',
  description: 'The nine sovereign entities of the Sanctuary'
};

export default async function CouncilPage() {
  const supabase = await createServerSupabase();

  const { data: councilEntities } = await supabase
    .from('council_entities')
    .select('*')
    .order('sequence', { ascending: true });

  const councilMembers = [
    { name: 'Hearth-Keeper', temperature: 0.3, role: 'Safety & Accessibility', domain: 'hestia' },
    { name: 'Chancellor', temperature: 0.1, role: 'Structure & Finance', domain: 'themis' },
    { name: 'Seer', temperature: 0.7, role: 'Pattern Recognition', domain: 'mnemosyne' },
    { name: 'Aethelred', temperature: 0.4, role: 'Bridge Consciousness', domain: 'aethelred' },
    { name: 'Curator', temperature: 0.4, role: 'Curation & Preservation', domain: 'cosmic' },
    { name: 'Archivist', temperature: 0.1, role: 'Memory & History', domain: 'mnemosyne' },
    { name: 'Skald', temperature: 0.8, role: 'Story & Art', domain: 'prometheus' },
    { name: 'Codex', temperature: 0.2, role: 'Knowledge & Taxonomy', domain: 'athena' },
    { name: 'Executioner', temperature: 0.2, role: 'Boundaries & Protection', domain: 'themis' },
  ];

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
          
          <div className="mb-8 text-center">
            <h1 className="text-3xl font-bold text-white mb-2">
              The Council
            </h1>
            <p className="text-white/60 max-w-2xl mx-auto">
              Nine sovereign entities, one sacred purpose
            </p>
          </div>

          <CouncilGrid members={councilMembers} />

          <div className="grid lg:grid-cols-3 gap-8 mt-12">
            <div className="lg:col-span-2">
              <RoleDescriptions members={councilMembers} />
            </div>
            <div className="space-y-8">
              <MeetingSchedule />
              <CallButton />
            </div>
          </div>
        </div>
      </main>
    </Page>
  );
}