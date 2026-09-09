// src/app/(mnemosyne)/grammar/folksonomies/[name]/page.tsx
// ╔═══════════════════════════════════════════════════════════════════════════╗
// ║   THE FOLKSONOMY — one umbrella, each dressing beside its hearth         ║
// ╚═══════════════════════════════════════════════════════════════════════════╝
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Page } from '@/components/bifrost/Page';
import { DressingsBesideHearth } from '@/components/asgard/domains/mnemosyne/grammar/DressingBeside';
import { FolksonomyHead } from '@/components/asgard/domains/mnemosyne/grammar/FolksonomyHead';
import { GrammarFaultBlock } from '@/components/asgard/domains/mnemosyne/grammar/GrammarFault';
import { GrammarFootnote } from '@/components/asgard/domains/mnemosyne/grammar/GrammarFootnote';
import { readFolksonomy } from '@/lib/grammar/grammar-read';
import { GRAMMAR_HOUSE_WORDS } from '@/lib/grammar/grammar-contract';

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
    description: `${named} — the umbrella's purpose, and every dressing it holds beside the hearth`,
  };
}

export default async function FolksonomyPage({ params }: { params: Promise<{ name: string }> }) {
  const { name } = await params;
  const named = decodeURIComponent(name);
  const folksonomy = await readFolksonomy(named);

  if (!folksonomy.ok) {
    return (
      <Page showForeground={false} showContinuityBeam={true}>
        <main className="min-h-screen py-12">
          <div className="container mx-auto max-w-[1152px] px-6">
            <div className="flex flex-col gap-8">
              <h1 className="text-3xl font-bold text-star-dust">{named}</h1>
              <GrammarFaultBlock fault={folksonomy.fault} />
              <GrammarFootnote words={GRAMMAR_HOUSE_WORDS} />
            </div>
          </div>
        </main>
      </Page>
    );
  }

  if (!folksonomy.value) notFound();

  const whole = folksonomy.value;

  return (
    <Page showForeground={false} showContinuityBeam={true}>
      <main className="min-h-screen py-12">
        <div className="container mx-auto max-w-[1152px] px-6">
          <div className="flex flex-col gap-8">
            <FolksonomyHead row={whole.row} dressings={whole.dressings.length} />
            <DressingsBesideHearth dressings={whole.dressings} />
            <GrammarFootnote words={GRAMMAR_HOUSE_WORDS} />
          </div>
        </div>
      </main>
    </Page>
  );
}
