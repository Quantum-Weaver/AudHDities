// src/components/asgard/domains/mnemosyne/grammar/CategoryFaces.tsx

import Link from 'next/link';
import { cn } from '@/lib/utils';
import {
  FACES_HEADING,
  FACES_META,
  NO_CATEGORY,
  categoryAddress,
  type CategoryFace,
  type GrammarFault,
} from '@/lib/grammar/grammar-contract';
import { GrammarFaultBlock } from './GrammarFault';

/** Every category as a chip, each one a filter on the atoms. */
export function CategoryFaces({
  categories,
  chosen,
  fault,
}: {
  categories: readonly CategoryFace[];
  chosen: string | null;
  fault: GrammarFault | null;
}) {
  return (
    <section className="flex flex-col gap-3">
      <div className="flex flex-wrap items-center gap-3">
        <h2 className="text-sm font-medium uppercase tracking-wide text-star-dust/50">
          {FACES_HEADING}
        </h2>
        <span className="text-xs text-star-dust/40">
          {fault ? FACES_META : `${categories.length} categories · ${FACES_META}`}
        </span>
      </div>
      {fault ? <GrammarFaultBlock fault={fault} /> : null}
      {!fault && categories.length === 0 ? (
        <p className="text-xs text-star-dust/35">{NO_CATEGORY}</p>
      ) : null}
      {categories.length > 0 ? (
        <div className="flex flex-wrap gap-2">
          {categories.map((category) => (
            <Link
              key={category.name}
              href={categoryAddress(category.name)}
              className={cn(
                'inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-[13px]',
                category.name === chosen
                  ? 'border-neurospark/40 bg-neurospark/10 text-neurospark'
                  : 'border-white/[0.08] bg-white/[0.04] text-star-dust hover:border-neurospark/30'
              )}
            >
              {category.icon_emoji ? <span>{category.icon_emoji}</span> : null}
              {category.name}
            </Link>
          ))}
        </div>
      ) : null}
    </section>
  );
}
