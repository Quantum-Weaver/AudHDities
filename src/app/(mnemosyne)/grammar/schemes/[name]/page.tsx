// src/app/(mnemosyne)/grammar/schemes/[name]/page.tsx
// ╔═══════════════════════════════════════════════════════════════════════════╗
// ║   THE SCHEME — one dimension of the lattice, its members and its edges   ║
// ╚═══════════════════════════════════════════════════════════════════════════╝
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Page } from '@/components/bifrost/Page';
import { GrammarFaultBlock } from '@/components/asgard/domains/mnemosyne/grammar/GrammarFault';
import { GrammarFootnote } from '@/components/asgard/domains/mnemosyne/grammar/GrammarFootnote';
import { SchemeEdges } from '@/components/asgard/domains/mnemosyne/grammar/SchemeEdges';
import { SchemeHead } from '@/components/asgard/domains/mnemosyne/grammar/SchemeHead';
import { SchemeMembers } from '@/components/asgard/domains/mnemosyne/grammar/SchemeMembers';
import { readScheme } from '@/lib/grammar/grammar-read';
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
    title: `${named} | The lattice | The Grammar | Sovereign Sanctuary`,
    description: `${named} — one scheme of the lattice, its members with their primacy and the edges typed within it`,
  };
}

export default async function SchemePage({ params }: { params: Promise<{ name: string }> }) {
  const { name } = await params;
  const named = decodeURIComponent(name);
  const scheme = await readScheme(named);

  if (!scheme.ok) {
    return (
      <Page showForeground={false} showContinuityBeam={true}>
        <main className="min-h-screen py-12">
          <div className="container mx-auto max-w-[1152px] px-6">
            <div className="flex flex-col gap-8">
              <h1 className="text-3xl font-bold text-star-dust">{named}</h1>
              <GrammarFaultBlock fault={scheme.fault} />
              <GrammarFootnote words={GRAMMAR_HOUSE_WORDS} />
            </div>
          </div>
        </main>
      </Page>
    );
  }

  if (!scheme.value) notFound();

  const whole = scheme.value;

  return (
    <Page showForeground={false} showContinuityBeam={true}>
      <main className="min-h-screen py-12">
        <div className="container mx-auto max-w-[1152px] px-6">
          <div className="flex flex-col gap-8">
            <SchemeHead whole={whole} />

            <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
              <SchemeMembers members={whole.members} />
              <SchemeEdges edges={whole.edges} />
            </div>

            <GrammarFootnote words={GRAMMAR_HOUSE_WORDS} />
          </div>
        </div>
      </main>
    </Page>
  );
}
