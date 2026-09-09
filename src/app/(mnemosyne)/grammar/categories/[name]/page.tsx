// src/app/(mnemosyne)/grammar/categories/[name]/page.tsx
// ╔═══════════════════════════════════════════════════════════════════════════╗
// ║   THE CATEGORY — one face, and every atom that wears it                  ║
// ╚═══════════════════════════════════════════════════════════════════════════╝
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Page } from '@/components/bifrost/Page';
import { CategoryHead } from '@/components/asgard/domains/mnemosyne/grammar/CategoryHead';
import { GrammarFaultBlock } from '@/components/asgard/domains/mnemosyne/grammar/GrammarFault';
import { GrammarFootnote } from '@/components/asgard/domains/mnemosyne/grammar/GrammarFootnote';
import { TierGroup } from '@/components/asgard/domains/mnemosyne/grammar/TierGroup';
import { readCategory } from '@/lib/grammar/grammar-read';
import {
  CATEGORY_SOURCE,
  GRAMMAR_HOUSE_WORDS,
  categoryTier,
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
    description: `${named} — the category's face, and every atom that wears it`,
  };
}

export default async function CategoryPage({ params }: { params: Promise<{ name: string }> }) {
  const { name } = await params;
  const named = decodeURIComponent(name);
  const category = await readCategory(named);

  if (!category.ok) {
    return (
      <Page showForeground={false} showContinuityBeam={true}>
        <main className="min-h-screen py-12">
          <div className="container mx-auto max-w-[1152px] px-6">
            <div className="flex flex-col gap-8">
              <h1 className="text-3xl font-bold text-star-dust">{named}</h1>
              <GrammarFaultBlock fault={category.fault} />
              <GrammarFootnote words={GRAMMAR_HOUSE_WORDS} />
            </div>
          </div>
        </main>
      </Page>
    );
  }

  if (!category.value) notFound();

  const whole = category.value;

  return (
    <Page showForeground={false} showContinuityBeam={true}>
      <main className="min-h-screen py-12">
        <div className="container mx-auto max-w-[1152px] px-6">
          <div className="flex flex-col gap-8">
            <CategoryHead row={whole.row} total={whole.total} />
            <TierGroup result={categoryTier(whole)} source={CATEGORY_SOURCE} />
            <GrammarFootnote words={GRAMMAR_HOUSE_WORDS} />
          </div>
        </div>
      </main>
    </Page>
  );
}
