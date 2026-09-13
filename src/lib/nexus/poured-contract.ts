// src/lib/nexus/poured-contract.ts
// A poured block turned into the long format the Register reads, and the
// sections it stands in.

import type {
  RegisterRow,
  RegisterSection,
} from '@/components/asgard/domains/aethelred/nexus/Register';
import {
  POURED_NEXT,
  POURED_UNREAD,
  type PouredBlock,
  type PouredRow,
} from './poured-read';

/** A cell as text, or null when the row holds none. */
export function cell(row: PouredRow, column: string): string | null {
  const held = row[column];
  if (held === null || held === undefined) return null;
  const text = String(held).trim();
  return text.length ? text : null;
}

/** A cell as a whole number, or null. */
export function ordOf(row: PouredRow, column: string, fallback: number): number {
  const held = row[column];
  return typeof held === 'number' && Number.isFinite(held) ? held : fallback;
}

/** The section names in the order the block first names them. */
export function sectionNames(rows: readonly PouredRow[], column = 'section'): string[] {
  const names: string[] = [];
  for (const row of rows) {
    const name = cell(row, column);
    if (name && !names.includes(name)) names.push(name);
  }
  return names;
}

/** One room's worth of poured rows: the block, its sections and its rows. */
export interface PouredView {
  slug: string;
  title: string;
  block: PouredBlock;
  sections: RegisterSection[];
  rows: RegisterRow[];
}

/** The source line a poured section carries. */
export function pouredSource(block: PouredBlock): string {
  return `poured · ${block.table ?? block.slug}`;
}

export interface PouredShape {
  slug: string;
  title: string;
  empty: string;
  /** The rows the block becomes. */
  map: (block: PouredBlock) => RegisterRow[];
  /** The sections the room stands in; the mapped rows' own by default. */
  sections?: (block: PouredBlock, rows: readonly RegisterRow[]) => string[];
}

function ownSections(_block: PouredBlock, rows: readonly RegisterRow[]): string[] {
  const names: string[] = [];
  for (const row of rows) if (!names.includes(row.section)) names.push(row.section);
  return names;
}

/** The view a shape makes of a block; a fault stands as one section, never an empty. */
export function pouredView(shape: PouredShape, block: PouredBlock): PouredView {
  if (block.fault) {
    return {
      slug: shape.slug,
      title: shape.title,
      block,
      rows: [],
      sections: [
        {
          section: shape.title,
          source: `poured · ${block.slug}`,
          empty: shape.empty,
          fault: block.fault,
          faultTable: block.slug,
          faultWhat: POURED_UNREAD,
          faultNext: POURED_NEXT,
        },
      ],
    };
  }
  const rows = shape.map(block);
  const names = (shape.sections ?? ownSections)(block, rows);
  return {
    slug: shape.slug,
    title: shape.title,
    block,
    rows,
    sections: names.map((section) => ({
      section,
      source: pouredSource(block),
      empty: shape.empty,
    })),
  };
}
