// src/app/(mnemosyne)/grammar/page.tsx
// ╔═══════════════════════════════════════════════════════════════════════════╗
// ║   THE GRAMMAR — the door: the tables counted, the four rooms             ║
// ╚═══════════════════════════════════════════════════════════════════════════╝
import type { Metadata } from 'next';
import { BookOpen } from 'lucide-react';
import { Page } from '@/components/bifrost/Page';
import { DoorCards } from '@/components/asgard/domains/mnemosyne/grammar/DoorCards';
import { DoorTiles } from '@/components/asgard/domains/mnemosyne/grammar/DoorTiles';
import { GrammarFootnote } from '@/components/asgard/domains/mnemosyne/grammar/GrammarFootnote';
import { readDoorCounts } from '@/lib/grammar/grammar-read';
import {
  GRAMMAR_HOUSE_WORDS,
  GRAMMAR_PILL,
  GRAMMAR_TITLE,
  HEART_SENTENCE,
  HEARTH_SENTENCE,
  HOUSE_WORDS,
  HOUSE_WORDS_ANCHOR,
  HOUSE_WORDS_HEADING,
} from '@/lib/grammar/grammar-contract';

export const metadata: Metadata = {
  title: 'The Grammar | Sovereign Sanctuary',
  description: 'The shared vocabulary of the Sanctuary — atoms, molecules, organisms and their bonds',
};

export const revalidate = 3600;

export default async function GrammarPage() {
  const counts = await readDoorCounts();

  return (
    <Page showForeground={false} showContinuityBeam={true}>
      <main className="min-h-screen py-12">
        <div className="container mx-auto max-w-[1152px] px-6">
          <div className="flex flex-col gap-10">
            <div className="flex flex-col items-center gap-3 text-center">
              <div className="inline-flex items-center gap-2 rounded-full bg-neurospark/10 px-4 py-2">
                <BookOpen size={14} className="text-neurospark" />
                <span className="text-sm text-neurospark">{GRAMMAR_PILL}</span>
              </div>
              <h1 className="text-3xl font-bold text-star-dust">{GRAMMAR_TITLE}</h1>
              <p className="max-w-2xl leading-relaxed text-star-dust/60">{HEARTH_SENTENCE}</p>
              <p className="max-w-2xl leading-relaxed text-star-dust/60">{HEART_SENTENCE}</p>
            </div>

            <DoorTiles counts={counts} />
            <DoorCards />

            <section id={HOUSE_WORDS_ANCHOR} className="flex flex-col gap-3 scroll-mt-24">
              <h2 className="text-sm font-medium uppercase tracking-wide text-star-dust/50">
                {HOUSE_WORDS_HEADING}
              </h2>
              <ul className="flex flex-col gap-2">
                {HOUSE_WORDS.map((entry) => (
                  <li key={entry.word} className="text-sm leading-relaxed text-star-dust/60">
                    <span className="font-semibold text-star-dust">{entry.word}</span>
                    {' — '}
                    {entry.meaning}
                  </li>
                ))}
              </ul>
            </section>

            <GrammarFootnote words={GRAMMAR_HOUSE_WORDS} />
          </div>
        </div>
      </main>
    </Page>
  );
}
