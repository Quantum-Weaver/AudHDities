// src/app/(mnemosyne)/grammar/organisms/[name]/page.tsx
// ╔═══════════════════════════════════════════════════════════════════════════╗
// ║   THE ORGANISM — the molecules it holds, its own atoms, its lattice       ║
// ╚═══════════════════════════════════════════════════════════════════════════╝
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Page } from '@/components/bifrost/Page';
import { BondChain } from '@/components/asgard/domains/mnemosyne/grammar/BondChain';
import { CompoundHead } from '@/components/asgard/domains/mnemosyne/grammar/CompoundHead';
import { CompoundDressings } from '@/components/asgard/domains/mnemosyne/grammar/CompoundDressings';
import { CompoundLattice } from '@/components/asgard/domains/mnemosyne/grammar/CompoundLattice';
import { GrammarFaultBlock } from '@/components/asgard/domains/mnemosyne/grammar/GrammarFault';
import { GrammarFootnote } from '@/components/asgard/domains/mnemosyne/grammar/GrammarFootnote';
import { Panel } from '@/components/asgard/domains/mnemosyne/grammar/Panel';
import { readOrganism } from '@/lib/grammar/grammar-read';
import {
  COMPOUND_ATOMS_HEADING,
  COMPOUND_HOUSE_WORDS,
  COMPOUND_MOLECULES_HEADING,
  NO_ATOM_BOND,
  NO_MOLECULE_HELD,
  ORGANISM_ATOM_SOURCE,
  ORGANISM_DRESSING_SOURCE,
  ORGANISM_MOLECULE_SOURCE,
  atomLinks,
  compoundCases,
  compoundFace,
  moleculeLinks,
  organismBadges,
} from '@/lib/grammar/grammar-contract';

export const revalidate = 3600;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ name: string }>;
}): Promise<Metadata> {
  const { name } = await params;
  const named = decodeURIComponent(name);
  return {
    title: `${named} | The Grammar | Sovereign Sanctuary`,
    description: `${named} — read whole from the Grammar, with the molecules it holds, its own atoms and where it sits in the lattice`,
  };
}

export default async function OrganismPage({ params }: { params: Promise<{ name: string }> }) {
  const { name } = await params;
  const named = decodeURIComponent(name);
  const whole = await readOrganism(named);

  if (!whole.ok) {
    return (
      <Page showForeground={false} showContinuityBeam={true}>
        <main className="min-h-screen py-12">
          <div className="container mx-auto max-w-[1152px] px-6">
            <div className="flex flex-col gap-8">
              <h1 className="text-3xl font-bold text-star-dust">{named}</h1>
              <GrammarFaultBlock fault={whole.fault} />
              <GrammarFootnote words={COMPOUND_HOUSE_WORDS} />
            </div>
          </div>
        </main>
      </Page>
    );
  }

  if (!whole.value) notFound();

  const organism = whole.value;

  return (
    <Page showForeground={false} showContinuityBeam={true}>
      <main className="min-h-screen py-12">
        <div className="container mx-auto max-w-[1152px] px-6">
          <div className="flex flex-col gap-8">
            <CompoundHead
              tier="organisms"
              face={compoundFace(organism.atoms)}
              name={organism.row.name}
              cases={compoundCases(organism.row)}
              badges={organismBadges(organism.row)}
              definition={organism.row.definition}
            />

            <Panel heading={COMPOUND_MOLECULES_HEADING} source={ORGANISM_MOLECULE_SOURCE}>
              <BondChain links={moleculeLinks(organism.molecules)} empty={NO_MOLECULE_HELD} />
            </Panel>

            <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
              <Panel heading={COMPOUND_ATOMS_HEADING} source={ORGANISM_ATOM_SOURCE}>
                <BondChain links={atomLinks(organism.atoms)} empty={NO_ATOM_BOND} />
              </Panel>
              <CompoundLattice memberships={organism.memberships} edges={organism.edges} />
            </div>

            <CompoundDressings
              source={ORGANISM_DRESSING_SOURCE}
              override={organism.row.sensory_override}
            />

            <GrammarFootnote words={COMPOUND_HOUSE_WORDS} />
          </div>
        </div>
      </main>
    </Page>
  );
}
