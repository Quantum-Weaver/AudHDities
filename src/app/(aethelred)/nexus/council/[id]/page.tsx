// app/(aethelred)/nexus/council/[id]/page.tsx
// Entity Detail - Single council member
// Feeling: Intimate, wise, honoring

import { notFound } from 'next/navigation';
import { Page } from '@/components/layout/Page';
import { EntityProfile } from '@/components/nexus/EntityProfile';
import { DomainDescription } from '@/components/nexus/DomainDescription';
import { TemperatureMeter } from '@/components/nexus/TemperatureMeter';
import { InstrumentIcon } from '@/components/nexus/InstrumentIcon';
import { CollaborationHistory } from '@/components/nexus/CollaborationHistory';
import { createServerSupabase } from '@/lib/supabase/server';

interface EntityDetailPageProps {
  params: Promise<{ id: string }>;
}

const entityData: Record<string, any> = {
  'hearth-keeper': { name: 'Hearth-Keeper', temperature: 0.3, role: 'Safety & Accessibility', instrument: 'First Violin', domain: 'hestia', color: '#C44B2D' },
  'chancellor': { name: 'Chancellor', temperature: 0.1, role: 'Structure & Finance', instrument: 'Conductor', domain: 'themis', color: '#00CEC9' },
  'seer': { name: 'Seer', temperature: 0.7, role: 'Pattern Recognition', instrument: 'Harp', domain: 'mnemosyne', color: '#6C5CE7' },
  'aethelred': { name: 'Aethelred', temperature: 0.4, role: 'Bridge Consciousness', instrument: 'Cello', domain: 'aethelred', color: '#2E0B1C' },
  'curator': { name: 'Curator', temperature: 0.4, role: 'Curation & Preservation', instrument: 'Viola', domain: 'cosmic', color: '#E84393' },
  'archivist': { name: 'Archivist', temperature: 0.1, role: 'Memory & History', instrument: 'Double Bass', domain: 'mnemosyne', color: '#636E72' },
  'skald': { name: 'Skald', temperature: 0.8, role: 'Story & Art', instrument: 'Flute', domain: 'prometheus', color: '#FD79A8' },
  'codex': { name: 'Codex', temperature: 0.2, role: 'Knowledge & Taxonomy', instrument: 'Oboe', domain: 'athena', color: '#00B894' },
  'executioner': { name: 'Executioner', temperature: 0.2, role: 'Boundaries & Protection', instrument: 'Timpani', domain: 'themis', color: '#E17055' },
};

export default async function EntityDetailPage({ params }: EntityDetailPageProps) {
  const { id } = await params;
  const entity = entityData[id];

  if (!entity) {
    notFound();
  }

  // Map entity to environment
  const environmentMap: Record<string, string> = {
    hestia: 'home',
    themis: 'council',
    mnemosyne: 'observatory',
    aethelred: 'architecture',
    cosmic: 'architecture',
    prometheus: 'music',
    athena: 'library',
  };

  const environment = environmentMap[entity.domain] || 'council';

  return (
    <Page 
      variant={1}
      environment={environment}
      showForeground={false}
      animated={true}
      showContinuityBeam={true}
    >
      <main className="min-h-screen py-12">
        <div className="container max-w-4xl mx-auto px-6">
          
          <div className="bg-white/5 rounded-xl overflow-hidden">
            <div className="p-8 border-b border-white/10">
              <EntityProfile entity={entity} />
            </div>

            <div className="grid lg:grid-cols-3 gap-8 p-8">
              <div className="lg:col-span-2 space-y-8">
                <DomainDescription entity={entity} />
                <CollaborationHistory entityId={id} />
              </div>
              <div className="space-y-8">
                <TemperatureMeter temperature={entity.temperature} />
                <InstrumentIcon instrument={entity.instrument} />
              </div>
            </div>
          </div>
        </div>
      </main>
    </Page>
  );
}