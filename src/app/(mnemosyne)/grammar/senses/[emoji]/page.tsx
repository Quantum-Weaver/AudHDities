// src/app/(mnemosyne)/grammar/senses/[emoji]/page.tsx
// ╔═══════════════════════════════════════════════════════════════════════════╗
// ║   THE MARK — every atom that wears it, and what else it means            ║
// ╚═══════════════════════════════════════════════════════════════════════════╝
import type { Metadata } from 'next';
import { Page } from '@/components/bifrost/Page';
import { GrammarFaultBlock } from '@/components/asgard/domains/mnemosyne/grammar/GrammarFault';
import { GrammarFootnote } from '@/components/asgard/domains/mnemosyne/grammar/GrammarFootnote';
import { OtherMeanings } from '@/components/asgard/domains/mnemosyne/grammar/OtherMeanings';
import { SenseHead } from '@/components/asgard/domains/mnemosyne/grammar/SenseHead';
import { TierGroup } from '@/components/asgard/domains/mnemosyne/grammar/TierGroup';
import { readSense } from '@/lib/grammar/grammar-read';
import {
  GRAMMAR_HOUSE_WORDS,
  SENSE_SOURCE,
  senseTier,
} from '@/lib/grammar/grammar-contract';

export const revalidate = 3600;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ emoji: string }>;
}): Promise<Metadata> {
  const { emoji } = await params;
  const mark = decodeURIComponent(emoji);
  return {
    title: `${mark} | The Grammar | Sovereign Sanctuary`,
    description: `${mark} — every atom that wears this mark, and what it means in each folksonomy`,
  };
}

export default async function SensePage({ params }: { params: Promise<{ emoji: string }> }) {
  const { emoji } = await params;
  const mark = decodeURIComponent(emoji);
  const sense = await readSense(mark);

  if (!sense.ok) {
    return (
      <Page showForeground={false} showContinuityBeam={true}>
        <main className="min-h-screen py-12">
          <div className="container mx-auto max-w-[1152px] px-6">
            <div className="flex flex-col gap-8">
              <h1 className="text-3xl font-bold text-star-dust">{mark}</h1>
              <GrammarFaultBlock fault={sense.fault} />
              <GrammarFootnote words={GRAMMAR_HOUSE_WORDS} />
            </div>
          </div>
        </main>
      </Page>
    );
  }

  const whole = sense.value;

  return (
    <Page showForeground={false} showContinuityBeam={true}>
      <main className="min-h-screen py-12">
        <div className="container mx-auto max-w-[1152px] px-6">
          <div className="flex flex-col gap-8">
            <SenseHead emoji={whole.emoji} total={whole.total} />
            <TierGroup result={senseTier(whole)} source={SENSE_SOURCE} />
            <OtherMeanings meanings={whole.meanings} />
            <GrammarFootnote words={GRAMMAR_HOUSE_WORDS} />
          </div>
        </div>
      </main>
    </Page>
  );
}
