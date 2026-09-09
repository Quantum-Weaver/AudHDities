// src/components/asgard/domains/mnemosyne/grammar/SchemeHead.tsx

import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { Badge } from '@/components/runes/Badge';
import { withHouseWords } from '@/components/asgard/domains/aethelred/nexus/HouseWords';
import {
  BACK_TO_LATTICE,
  CHILDREN_LABEL,
  NO_SCHEME_DESCRIPTION,
  PARENT_LABEL,
  SCHEME_CRUMB,
  schemeAddress,
  type SchemeWhole,
} from '@/lib/grammar/grammar-contract';

/** The scheme's name, its kind, its deity, the scheme above it and the ones under it. */
export function SchemeHead({ whole }: { whole: SchemeWhole }) {
  return (
    <div className="flex flex-col gap-8">
      <div className="flex items-center justify-between gap-4">
        <Link
          href="/grammar/schemes"
          className="inline-flex items-center gap-1.5 text-xs text-neurospark hover:text-star-dust"
        >
          <ArrowLeft size={14} aria-hidden="true" />
          {BACK_TO_LATTICE}
        </Link>
        <span className="text-[11px] text-star-dust/35">{SCHEME_CRUMB}</span>
      </div>

      <div className="flex flex-wrap items-start justify-between gap-6">
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-bold text-star-dust">{whole.row.name}</h1>
          {whole.parentName ? (
            <span className="text-[13px] text-star-dust/50">
              {PARENT_LABEL}{' '}
              <Link
                href={schemeAddress(whole.parentName)}
                className="text-neurospark hover:text-star-dust"
              >
                {whole.parentName}
              </Link>
            </span>
          ) : null}
        </div>

        <div className="flex flex-wrap gap-1.5 pt-1.5">
          <Badge variant="outline" size="sm" pill>
            {whole.row.scheme_type}
          </Badge>
          {whole.row.deity_name ? (
            <Badge variant="outline" size="sm" pill>
              {whole.row.deity_name}
            </Badge>
          ) : null}
        </div>
      </div>

      <p
        className={
          whole.row.description
            ? 'max-w-[880px] text-base leading-relaxed text-star-dust/70'
            : 'max-w-[880px] text-base text-star-dust/35'
        }
      >
        {whole.row.description ? withHouseWords(whole.row.description) : NO_SCHEME_DESCRIPTION}
      </p>

      {whole.children.length > 0 ? (
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-[11px] uppercase tracking-wider text-star-dust/35">
            {CHILDREN_LABEL}
          </span>
          {whole.children.map((child) => (
            <Link
              key={child.name}
              href={schemeAddress(child.name)}
              className="rounded-full border border-neurospark/30 px-2 py-0.5 text-xs text-neurospark hover:text-star-dust"
            >
              {child.name}
            </Link>
          ))}
        </div>
      ) : null}
    </div>
  );
}
