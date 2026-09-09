// src/app/(mnemosyne)/grammar/molecules/[name]/page.tsx
// ╔═══════════════════════════════════════════════════════════════════════════╗
// ║   THE MOLECULE — the atoms it bonds, what it is part of, its lattice      ║
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
import { readMolecule } from '@/lib/grammar/grammar-read';
import {
  COMPOUND_ATOMS_HEADING,
  COMPOUND_HOUSE_WORDS,
  MOLECULE_ATOM_SOURCE,
  MOLECULE_DRESSING_SOURCE,
  NOT_IN_AN_ORGANISM,
  NO_ATOM_BOND,
  ORGANISM_MOLECULE_SOURCE,
  PART_OF_HEADING,
  atomLinks,
  compoundCases,
  compoundFace,
  moleculeBadges,
  nameLinks,
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
    description: `${named} — read whole from the Grammar, with the atoms it bonds, what it is part of and where it sits in the lattice`,
  };
}

export default async function MoleculePage({ params }: { params: Promise<{ name: string }> }) {
  const { name } = await params;
  const named = decodeURIComponent(name);
  const whole = await readMolecule(named);

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

  const molecule = whole.value;

  return (
    <Page showForeground={false} showContinuityBeam={true}>
      <main className="min-h-screen py-12">
        <div className="container mx-auto max-w-[1152px] px-6">
          <div className="flex flex-col gap-8">
            <CompoundHead
              tier="molecules"
              face={compoundFace(molecule.atoms)}
              name={molecule.row.name}
              cases={compoundCases(molecule.row)}
              badges={moleculeBadges(molecule.row)}
              definition={molecule.row.definition}
            />

            <Panel heading={COMPOUND_ATOMS_HEADING} source={MOLECULE_ATOM_SOURCE}>
              <BondChain links={atomLinks(molecule.atoms)} empty={NO_ATOM_BOND} />
            </Panel>

            <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
              <Panel heading={PART_OF_HEADING} source={ORGANISM_MOLECULE_SOURCE}>
                <BondChain
                  links={nameLinks(molecule.organismNames, 'organisms')}
                  empty={NOT_IN_AN_ORGANISM}
                />
              </Panel>
              <CompoundLattice memberships={molecule.memberships} edges={molecule.edges} />
            </div>

            <CompoundDressings
              source={MOLECULE_DRESSING_SOURCE}
              override={molecule.row.sensory_override}
            />

            <GrammarFootnote words={COMPOUND_HOUSE_WORDS} />
          </div>
        </div>
      </main>
    </Page>
  );
}
