// src/components/asgard/domains/aethelred/nexus/PouredMark.tsx
'use client';

import Link from 'next/link';
import { Stamp } from './Stamp';

export interface PouredMarkProps {
  slug: string;
  /** The artifact's own published stamp, or null when the page carries none. */
  published: string | null;
  /** The view the block names itself by. */
  view?: string | null;
  href: string;
}

/** A poured section's own heading: what it is, when it was poured, where it lives. */
export function PouredMark({ slug, published, view, href }: PouredMarkProps) {
  return (
    <div className="flex flex-wrap items-baseline justify-between gap-2 pt-2">
      <span className="text-[11px] tracking-[0.12em] uppercase text-star-dust/55">
        {view ?? slug}
      </span>
      <span className="inline-flex items-center gap-2 text-[11px] text-star-dust/40">
        <span>
          poured{' '}
          {published ? <Stamp value={published} /> : <span>at no recorded time</span>}
        </span>
        <Link href={href} className="text-neurospark hover:text-star-dust">
          {slug}
        </Link>
      </span>
    </div>
  );
}
