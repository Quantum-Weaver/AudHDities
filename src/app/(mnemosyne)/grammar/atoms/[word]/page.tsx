// src/app/(mnemosyne)/grammar/atoms/[word]/page.tsx
// ╔═══════════════════════════════════════════════════════════════════════════╗
// ║   THE ATOM — one word read whole, dressed beside the hearth              ║
// ╚═══════════════════════════════════════════════════════════════════════════╝
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Page } from '@/components/bifrost/Page';
import { AtomDressings } from '@/components/asgard/domains/mnemosyne/grammar/AtomDressings';
import { AtomHead } from '@/components/asgard/domains/mnemosyne/grammar/AtomHead';
import {
  BondsPanel,
  LatticePanel,
  RootPanel,
  SensesPanel,
} from '@/components/asgard/domains/mnemosyne/grammar/AtomPanels';
import { GrammarFaultBlock } from '@/components/asgard/domains/mnemosyne/grammar/GrammarFault';
import { GrammarFootnote } from '@/components/asgard/domains/mnemosyne/grammar/GrammarFootnote';
import {
  readAtomBonds,
  readAtomDressings,
  readAtomLattice,
  readAtomWhole,
} from '@/lib/grammar/grammar-read';
import { ATOM_HOUSE_WORDS, baseFault } from '@/lib/grammar/grammar-contract';

export const revalidate = 3600;

const NO_ATOM_ID = 'this row carries no atom_id';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ word: string }>;
}): Promise<Metadata> {
  const { word } = await params;
  const named = decodeURIComponent(word);
  return {
    title: `${named} | The Grammar | Sovereign Sanctuary`,
    description: `${named} — read whole from the Grammar, with its senses, its root, its bonds and its dressings`,
  };
}

export default async function AtomPage({ params }: { params: Promise<{ word: string }> }) {
  const { word } = await params;
  const named = decodeURIComponent(word);
  const whole = await readAtomWhole(named);

  if (!whole.ok) {
    return (
      <Page showForeground={false} showContinuityBeam={true}>
        <main className="min-h-screen py-12">
          <div className="container mx-auto max-w-[1152px] px-6">
            <div className="flex flex-col gap-8">
              <h1 className="text-3xl font-bold text-star-dust">{named}</h1>
              <GrammarFaultBlock fault={whole.fault} />
              <GrammarFootnote words={ATOM_HOUSE_WORDS} />
            </div>
          </div>
        </main>
      </Page>
    );
  }

  if (!whole.value) notFound();

  const atom = whole.value;
  const atomId = atom.atom_id;
  const missingId = baseFault('atom_whole', NO_ATOM_ID);

  const [bonds, lattice, dressings] = atomId
    ? await Promise.all([
        readAtomBonds(atomId),
        readAtomLattice(atomId),
        readAtomDressings(atomId),
      ])
    : [
        { ok: false as const, fault: missingId },
        { ok: false as const, fault: missingId },
        { ok: false as const, fault: missingId },
      ];

  return (
    <Page showForeground={false} showContinuityBeam={true}>
      <main className="min-h-screen py-12">
        <div className="container mx-auto max-w-[1152px] px-6">
          <div className="flex flex-col gap-8">
            <AtomHead whole={atom} />

            <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
              <SensesPanel whole={atom} />
              <RootPanel whole={atom} />
              <BondsPanel
                bonds={bonds.ok ? bonds.value : null}
                fault={bonds.ok ? null : bonds.fault}
              />
              <LatticePanel
                lattice={lattice.ok ? lattice.value : null}
                fault={lattice.ok ? null : lattice.fault}
              />
            </div>

            <AtomDressings
              whole={atom}
              rows={dressings.ok ? dressings.value : null}
              fault={dressings.ok ? null : dressings.fault}
            />

            <GrammarFootnote words={ATOM_HOUSE_WORDS} />
          </div>
        </div>
      </main>
    </Page>
  );
}
