// src/app/(mnemosyne)/grammar/schemes/page.tsx
// ╔═══════════════════════════════════════════════════════════════════════════╗
// ║   THE LATTICE — four kinds, four shelves, every scheme a door            ║
// ╚═══════════════════════════════════════════════════════════════════════════╝
import type { Metadata } from 'next';
import { BookOpen } from 'lucide-react';
import { Page } from '@/components/bifrost/Page';
import { GrammarFaultBlock } from '@/components/asgard/domains/mnemosyne/grammar/GrammarFault';
import { GrammarFootnote } from '@/components/asgard/domains/mnemosyne/grammar/GrammarFootnote';
import { SchemeShelf } from '@/components/asgard/domains/mnemosyne/grammar/SchemeShelf';
import { readSchemeCounts, readSchemes } from '@/lib/grammar/grammar-read';
import {
  GRAMMAR_HOUSE_WORDS,
  LATTICE_HEADING,
  LATTICE_SENTENCE,
  LATTICE_SENTENCE_ADDRESS,
  LATTICE_TITLE,
  NO_SCHEME,
  latticeDescription,
  shelveSchemeCards,
} from '@/lib/grammar/grammar-contract';

export async function generateMetadata(): Promise<Metadata> {
  const schemes = await readSchemes();
  return {
    title: 'The lattice | The Grammar | Sovereign Sanctuary',
    description: latticeDescription(schemes.ok ? schemes.value.length : null),
  };
}

export const revalidate = 3600;

export default async function SchemesPage() {
  const [schemes, counts] = await Promise.all([readSchemes(), readSchemeCounts()]);
  const shelves = shelveSchemeCards(
    schemes.ok ? schemes.value : [],
    counts.ok ? counts.value : null
  );

  return (
    <Page showForeground={false} showContinuityBeam={true}>
      <main className="min-h-screen py-12">
        <div className="container mx-auto max-w-[1152px] px-6">
          <div className="flex flex-col gap-10">
            <div className="flex flex-col items-center gap-3 text-center">
              <div className="inline-flex items-center gap-2 rounded-full bg-neurospark/10 px-4 py-2">
                <BookOpen size={14} className="text-neurospark" />
                <span className="text-sm text-neurospark">{LATTICE_HEADING}</span>
              </div>
              <h1 className="text-3xl font-bold text-star-dust">{LATTICE_TITLE}</h1>
              <p className="max-w-2xl leading-relaxed text-star-dust/60">{LATTICE_SENTENCE}</p>
              <span className="text-[11px] text-star-dust/35">{LATTICE_SENTENCE_ADDRESS}</span>
            </div>

            {schemes.ok ? null : <GrammarFaultBlock fault={schemes.fault} />}
            {counts.ok ? null : <GrammarFaultBlock fault={counts.fault} />}
            {schemes.ok && shelves.length === 0 ? (
              <p className="text-xs text-star-dust/35">{NO_SCHEME}</p>
            ) : null}

            {shelves.length > 0 ? (
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                {shelves.map((shelf) => (
                  <SchemeShelf key={shelf.kind} shelf={shelf} />
                ))}
              </div>
            ) : null}

            <GrammarFootnote words={GRAMMAR_HOUSE_WORDS} />
          </div>
        </div>
      </main>
    </Page>
  );
}
