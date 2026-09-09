// src/components/asgard/domains/aethelred/nexus/Register.tsx
'use client';

import Link from 'next/link';
import { cn } from '@/lib/utils';
import { Card } from '@/components/runes/Card';
import { Badge } from '@/components/runes/Badge';
import { Stamp, formatStamp } from './Stamp';
import { withHouseWords } from './HouseWords';
import type { CardData } from '@/types/components/runes/card.types';

/** The long format every poured page and every board speaks. */
export interface RegisterRow {
  section: string;
  ord: number;
  key: string;
  value?: string | null;
  note?: string | null;
  ref?: string | null;
  mark?: string | null;
  seat?: string | null;
  at?: string | null;
  closed?: string | null;
}

export interface RegisterSection {
  section: string;
  /** The source line under the heading, such as "live · council_houses". */
  source: string;
  /** What this section prints when it holds no row. */
  empty: string;
  /** The base's own message when the read was refused. */
  fault?: string | null;
  /** The table the refusal names. */
  faultTable?: string | null;
  /** A counted line under the rows. */
  tally?: string | null;
}

export interface RegisterProps {
  sections: readonly RegisterSection[];
  rows: readonly RegisterRow[];
  className?: string;
}

function sectionCardData(section: string): CardData {
  return { id: `register-${section}`, type: 'council', title: section };
}

/** An address renders as a link when it is one. */
function Ref({ value }: { value: string }) {
  const internal = value.startsWith('/');
  const external = value.startsWith('http://') || value.startsWith('https://');
  const className = 'text-[11px] text-neurospark hover:text-star-dust break-all';
  if (internal) {
    return (
      <Link href={value} className={className}>
        {value}
      </Link>
    );
  }
  if (external) {
    return (
      <a href={value} className={className} rel="noreferrer">
        {value}
      </a>
    );
  }
  return <span className="text-[11px] text-star-dust/35 break-all">{value}</span>;
}

function SourceLine({ source }: { source: string }) {
  return (
    <span className="inline-flex items-center gap-1.5 text-[11px] text-neurospark">
      <span className="w-1.5 h-1.5 rounded-full bg-neurospark" />
      <span>{source}</span>
    </span>
  );
}

/** What happened, why, the next step. */
function Fault({ table, message }: { table: string; message: string }) {
  return (
    <div className="flex flex-col gap-1 pt-3 pb-1 text-[13px]">
      <span className="text-star-dust/80">the base refused this read</span>
      <span className="text-star-dust/50">
        {table} · {message}
      </span>
      <span className="text-star-dust/40">next · a read policy on {table} for this visitor</span>
    </div>
  );
}

function Row({ row }: { row: RegisterRow }) {
  const stamp = row.at ? formatStamp(row.at) : null;
  return (
    <div className="grid grid-cols-1 sm:grid-cols-[160px_minmax(0,1fr)_160px] gap-2 sm:gap-4 py-2.5 border-t border-white/[0.06] text-[13px]">
      <span className="text-star-dust/50">
        {row.seat ? (
          <span className="text-star-dust/35">{withHouseWords(row.seat)} · </span>
        ) : null}
        {withHouseWords(row.key)}
      </span>
      <span className="text-star-dust min-w-0">
        <span>{withHouseWords(row.value ?? '')}</span>
        {row.mark ? (
          <Badge variant="outline" size="sm" className="ml-2 align-middle rounded-full">
            {withHouseWords(row.mark)}
          </Badge>
        ) : null}
        {row.note ? (
          <span className="text-xs text-star-dust/40"> · {withHouseWords(row.note)}</span>
        ) : null}
        {row.closed ? (
          <span className="text-xs text-star-dust/40"> · {withHouseWords(row.closed)}</span>
        ) : null}
        {row.ref ? (
          <span className="block mt-1">
            <Ref value={row.ref} />
          </span>
        ) : null}
      </span>
      <span className="text-xs text-star-dust/40 sm:text-right">
        {row.at ? stamp ? <Stamp value={row.at} /> : row.at : null}
      </span>
    </div>
  );
}

/** Renders the long format: a heading per section, a count tile counted from the rows. */
export function Register({ sections, rows, className }: RegisterProps) {
  return (
    <div className={cn('flex flex-col gap-6', className)}>
      {sections.map((section) => {
        const own = rows
          .filter((row) => row.section === section.section)
          .slice()
          .sort((a, b) => a.ord - b.ord);
        return (
          <Card
            key={section.section}
            data={sectionCardData(section.section)}
            variant="glass"
            size="full"
            radius="lg"
            shadow="sm"
            className="p-5 sm:p-6 motion-reduce:transition-none"
          >
            <div className="flex flex-wrap items-baseline justify-between gap-2 pb-2">
              <span className="flex items-baseline gap-3">
                <span className="text-[11px] tracking-[0.12em] uppercase text-star-dust/55">
                  {withHouseWords(section.section)}
                </span>
                <Badge variant="outline" size="sm" className="rounded-full">
                  {own.length}
                </Badge>
              </span>
              <SourceLine source={section.source} />
            </div>

            {section.fault ? (
              <Fault table={section.faultTable ?? section.source} message={section.fault} />
            ) : null}

            {own.length === 0 ? (
              section.fault ? null : (
                <div className="pt-3 pb-1 text-[13px] text-star-dust/50">{section.empty}</div>
              )
            ) : (
              <>
                {own.map((row) => (
                  <Row key={`${row.section}-${row.ord}-${row.key}`} row={row} />
                ))}
                {section.tally ? (
                  <div className="pt-2.5 text-xs text-star-dust/40">
                    {own.length} rows · {section.tally}
                  </div>
                ) : null}
              </>
            )}
          </Card>
        );
      })}
    </div>
  );
}
