// src/app/(mnemosyne)/grammar/folksonomies/page.tsx
// ╔═══════════════════════════════════════════════════════════════════════════╗
// ║   THE FOLKSONOMIES — eight umbrellas, each with its counted dressings    ║
// ╚═══════════════════════════════════════════════════════════════════════════╝
import type { Metadata } from 'next';
import { BookOpen } from 'lucide-react';
import { Page } from '@/components/bifrost/Page';
import { FolksonomyCardFace } from '@/components/asgard/domains/mnemosyne/grammar/FolksonomyCard';
import { GrammarFaultBlock } from '@/components/asgard/domains/mnemosyne/grammar/GrammarFault';
import { GrammarFootnote } from '@/components/asgard/domains/mnemosyne/grammar/GrammarFootnote';
import { withHouseWords } from '@/components/asgard/domains/aethelred/nexus/HouseWords';
import { readFolksonomies } from '@/lib/grammar/grammar-read';
import {
  FOLKSONOMIES_PILL,
  FOLKSONOMIES_TITLE,
  FOLKSONOMY_SENTENCE,
  FOLKSONOMY_SENTENCE_ADDRESS,
  GRAMMAR_HOUSE_WORDS,
  HOUSE_WORDS_ADDRESS,
  NO_FOLKSONOMY,
} from '@/lib/grammar/grammar-contract';

export const metadata: Metadata = {
  title: 'The folksonomies | The Grammar | Sovereign Sanctuary',
  description:
    'Every umbrella of collective meaning the Grammar holds, with its purpose, its standing and its counted dressings',
};

export const revalidate = 3600;

export default async function FolksonomiesPage() {
  const folksonomies = await readFolksonomies();
  const cards = folksonomies.ok ? folksonomies.value : [];

  return (
    <Page showForeground={false} showContinuityBeam={true}>
      <main className="min-h-screen py-12">
        <div className="container mx-auto max-w-[1152px] px-6">
          <div className="flex flex-col gap-10">
            <div className="flex flex-col items-center gap-3 text-center">
              <div className="inline-flex items-center gap-2 rounded-full bg-neurospark/10 px-4 py-2">
                <BookOpen size={14} className="text-neurospark" />
                <span className="text-sm text-neurospark">{FOLKSONOMIES_PILL}</span>
              </div>
              <h1 className="text-3xl font-bold text-star-dust">{FOLKSONOMIES_TITLE}</h1>
              <p className="max-w-2xl leading-relaxed text-star-dust/60">
                {withHouseWords(FOLKSONOMY_SENTENCE, HOUSE_WORDS_ADDRESS)}
              </p>
              <span className="text-[11px] text-star-dust/35">
                {FOLKSONOMY_SENTENCE_ADDRESS}
              </span>
            </div>

            {folksonomies.ok ? null : <GrammarFaultBlock fault={folksonomies.fault} />}
            {folksonomies.ok && cards.length === 0 ? (
              <p className="text-xs text-star-dust/35">{NO_FOLKSONOMY}</p>
            ) : null}

            {cards.length > 0 ? (
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
                {cards.map((card) => (
                  <FolksonomyCardFace key={card.name} card={card} />
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
