// src/app/(mnemosyne)/grammar/senses/page.tsx
// ╔═══════════════════════════════════════════════════════════════════════════╗
// ║   THE SENSES — the emoji wall, and the colours beneath it                ║
// ╚═══════════════════════════════════════════════════════════════════════════╝
import type { Metadata } from 'next';
import { BookOpen } from 'lucide-react';
import { Page } from '@/components/bifrost/Page';
import { ColourShelf } from '@/components/asgard/domains/mnemosyne/grammar/ColourShelf';
import { GrammarFaultBlock } from '@/components/asgard/domains/mnemosyne/grammar/GrammarFault';
import { GrammarFootnote } from '@/components/asgard/domains/mnemosyne/grammar/GrammarFootnote';
import { SenseWall } from '@/components/asgard/domains/mnemosyne/grammar/SenseWall';
import { readSenses } from '@/lib/grammar/grammar-read';
import {
  GRAMMAR_HOUSE_WORDS,
  SENSES_PILL,
  SENSES_SENTENCE,
  SENSES_SENTENCE_ADDRESS,
  SENSES_TITLE,
} from '@/lib/grammar/grammar-contract';

export const metadata: Metadata = {
  title: 'The senses | The Grammar | Sovereign Sanctuary',
  description:
    'Every mark the Grammar carries once, with the atoms that wear it, and the colours chosen beneath',
};

export const revalidate = 3600;

export default async function SensesPage() {
  const senses = await readSenses();

  return (
    <Page showForeground={false} showContinuityBeam={true}>
      <main className="min-h-screen py-12">
        <div className="container mx-auto max-w-[1152px] px-6">
          <div className="flex flex-col gap-10">
            <div className="flex flex-col items-center gap-3 text-center">
              <div className="inline-flex items-center gap-2 rounded-full bg-neurospark/10 px-4 py-2">
                <BookOpen size={14} className="text-neurospark" />
                <span className="text-sm text-neurospark">{SENSES_PILL}</span>
              </div>
              <h1 className="text-3xl font-bold text-star-dust">{SENSES_TITLE}</h1>
              <p className="max-w-2xl leading-relaxed text-star-dust/60">{SENSES_SENTENCE}</p>
              <span className="text-[11px] text-star-dust/35">{SENSES_SENTENCE_ADDRESS}</span>
            </div>

            {senses.ok ? (
              <>
                <SenseWall wall={senses.value} />
                <ColourShelf wall={senses.value} />
              </>
            ) : (
              <GrammarFaultBlock fault={senses.fault} />
            )}

            <GrammarFootnote words={GRAMMAR_HOUSE_WORDS} />
          </div>
        </div>
      </main>
    </Page>
  );
}
