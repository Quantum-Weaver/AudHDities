// src/lib/nexus/integrations-contract.ts
// The key names the Organs register records per line and chain. Names only —
// the register holds no value and none reaches this page.

import type { RegisterRow } from '@/components/asgard/domains/aethelred/nexus/Register';
import { ORGANS } from './bridge-contract';
import type { PouredBlock } from './poured-read';
import { cell, ordOf, sectionNames, type PouredShape } from './poured-contract';

export const INTEGRATIONS_SLUG = ORGANS;

/** The mark a poured note carries its key names behind. */
export const KEYS_MARK = 'keys:';

export const NAMES_NO_KEY = 'this line names no key in the register';
export const NO_KEY = 'none';

/** The key names a note records, or null when it records none. */
export function keyNames(note: string | null): string | null {
  if (!note) return null;
  const at = note.indexOf(KEYS_MARK);
  if (at === -1) return null;
  const names = note.slice(at + KEYS_MARK.length).trim();
  return names.length ? names : null;
}

/** The standing a note records before its key names. */
export function standing(note: string | null): string | null {
  if (!note) return null;
  const at = note.indexOf(KEYS_MARK);
  const head = (at === -1 ? note : note.slice(0, at)).replace(/[·\s]+$/, '').trim();
  return head.length ? head : null;
}

/** One row per entry that names a key, under the line that names it. */
function integrationsRows(block: PouredBlock): RegisterRow[] {
  return block.rows.flatMap((row, index) => {
    const section = cell(row, 'section');
    const key = cell(row, 'key');
    const names = keyNames(cell(row, 'note'));
    if (!section || !key || !names) return [];
    return [
      {
        section,
        ord: ordOf(row, 'ord', index + 1),
        key,
        value: names,
        note: standing(cell(row, 'note')),
        ref: cell(row, 'ref'),
        mark: names === NO_KEY ? NO_KEY : null,
      },
    ];
  });
}

export const INTEGRATIONS_SHAPE: PouredShape = {
  slug: INTEGRATIONS_SLUG,
  title: 'The keys each line names',
  empty: NAMES_NO_KEY,
  map: integrationsRows,
  sections: (block) => sectionNames(block.rows),
};
