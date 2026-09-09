// src/app/(mnemosyne)/grammar/explore/page.tsx
// ╔═══════════════════════════════════════════════════════════════════════════╗
// ║   EXPLORE — the three tiers searched, the faces, the lattice             ║
// ╚═══════════════════════════════════════════════════════════════════════════╝
import type { Metadata } from 'next';
import Link from 'next/link';
import { BookOpen } from 'lucide-react';
import { Page } from '@/components/bifrost/Page';
import { CategoryFaces } from '@/components/asgard/domains/mnemosyne/grammar/CategoryFaces';
import { GrammarFootnote } from '@/components/asgard/domains/mnemosyne/grammar/GrammarFootnote';
import { SchemeShelves } from '@/components/asgard/domains/mnemosyne/grammar/SchemeShelves';
import { SearchForm, SearchNote } from '@/components/asgard/domains/mnemosyne/grammar/SearchForm';
import { TierGroup } from '@/components/asgard/domains/mnemosyne/grammar/TierGroup';
import { readCategories, readSchemes, searchGrammar } from '@/lib/grammar/grammar-read';
import {
  CATEGORY_PARAM,
  EXPLORE_PILL,
  EXPLORE_SENTENCE,
  GRAMMAR_HOUSE_WORDS,
  GRAMMAR_TITLE,
  SEARCH_PARAM,
  boundQuery,
  categoryRoomAddress,
  categoryRoomLine,
} from '@/lib/grammar/grammar-contract';

export const metadata: Metadata = {
  title: 'Explore | The Grammar | Sovereign Sanctuary',
  description: 'Search every atom, molecule and organism the Sanctuary speaks',
};

export const revalidate = 3600;

const ROUTE = '/grammar/explore';

type SearchParams = Record<string, string | string[] | undefined>;

/** The one value a query parameter carries, or null. */
function one(value: string | string[] | undefined): string | null {
  if (Array.isArray(value)) return value[0] ?? null;
  return value ?? null;
}

export default async function ExplorePage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const params = await searchParams;
  const q = boundQuery(one(params[SEARCH_PARAM]));
  const category = boundQuery(one(params[CATEGORY_PARAM]));

  const [categories, schemes] = await Promise.all([readCategories(), readSchemes()]);
  const results = q ? await searchGrammar(q, category) : null;
  const chosen = categories.ok
    ? (categories.value.find((row) => row.name === category) ?? null)
    : null;

  return (
    <Page showForeground={false} showContinuityBeam={true}>
      <main className="min-h-screen py-12">
        <div className="container mx-auto max-w-[1152px] px-6">
          <div className="flex flex-col gap-10">
            <div className="flex flex-col items-center gap-3 text-center">
              <div className="inline-flex items-center gap-2 rounded-full bg-neurospark/10 px-4 py-2">
                <BookOpen size={14} className="text-neurospark" />
                <span className="text-sm text-neurospark">{EXPLORE_PILL}</span>
              </div>
              <h1 className="text-3xl font-bold text-star-dust">{GRAMMAR_TITLE}</h1>
              <p className="max-w-2xl leading-relaxed text-star-dust/60">{EXPLORE_SENTENCE}</p>
            </div>

            <div className="flex flex-col gap-3">
              <SearchForm q={q} category={category} action={ROUTE} />
              {results ? <SearchNote results={results} /> : null}
            </div>

            {chosen ? (
              <Link
                href={categoryRoomAddress(chosen.name)}
                className="text-[13px] text-neurospark hover:text-star-dust"
              >
                {categoryRoomLine(chosen)}
              </Link>
            ) : null}

            {results?.tiers.map((tier) => <TierGroup key={tier.tier} result={tier} />)}

            <CategoryFaces
              categories={categories.ok ? categories.value : []}
              chosen={category}
              fault={categories.ok ? null : categories.fault}
            />

            <SchemeShelves
              schemes={schemes.ok ? schemes.value : []}
              fault={schemes.ok ? null : schemes.fault}
            />

            <GrammarFootnote words={GRAMMAR_HOUSE_WORDS} />
          </div>
        </div>
      </main>
    </Page>
  );
}
