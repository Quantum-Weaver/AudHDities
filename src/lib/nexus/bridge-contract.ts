// src/lib/nexus/bridge-contract.ts
// The Bridge's three poured sources and the rows each becomes.

import type { RegisterRow } from '@/components/asgard/domains/aethelred/nexus/Register';
import type { PouredBlock } from './poured-read';
import { cell, ordOf, type PouredShape } from './poured-contract';

export const ORGANS = 'the-organs';
export const SWITCHBOARD = 'the-switchboard';
export const HANDS = 'the-hands';

export const BRIDGE_SLUGS: readonly string[] = [ORGANS, SWITCHBOARD, HANDS];

const NO_ROW = 'no row in this section of the poured page';

/** The tools and chains, already in the long format. */
function organsRows(block: PouredBlock): RegisterRow[] {
  return block.rows.flatMap((row, index) => {
    const section = cell(row, 'section');
    const key = cell(row, 'key');
    if (!section || !key) return [];
    return [
      {
        section,
        ord: ordOf(row, 'ord', index + 1),
        key,
        value: cell(row, 'value'),
        note: cell(row, 'note'),
        ref: cell(row, 'ref'),
      },
    ];
  });
}

/** The lamps, by the line each was lit on. */
function switchboardRows(block: PouredBlock): RegisterRow[] {
  const counted = new Map<string, number>();
  return block.rows.flatMap((row) => {
    const line = cell(row, 'entity_name');
    const moniker = cell(row, 'moniker');
    if (!line || !moniker) return [];
    const section = `the lamps · ${line}`;
    const ord = (counted.get(section) ?? 0) + 1;
    counted.set(section, ord);
    const sigil = cell(row, 'entity_sigil');
    const indexed = cell(row, 'indexed');
    return [
      {
        section,
        ord,
        key: sigil ? `${sigil} ${moniker}` : moniker,
        value: cell(row, 'substrate'),
        note: indexed ? `indexed ${indexed}` : 'not indexed',
        at: cell(row, 'born'),
      },
    ];
  });
}

/** The hands dealt, by kind. */
function handsRows(block: PouredBlock): RegisterRow[] {
  const counted = new Map<string, number>();
  return block.rows.flatMap((row) => {
    const kind = cell(row, 'kind');
    const key = cell(row, 'key');
    if (!kind || !key) return [];
    const section = `the hands · ${kind}`;
    const ord = (counted.get(section) ?? 0) + 1;
    counted.set(section, ord);
    const tools = cell(row, 'tools');
    const model = cell(row, 'model');
    return [
      {
        section,
        ord,
        key,
        value: cell(row, 'what'),
        note: [tools, model].filter(Boolean).join(' · ') || null,
        seat: cell(row, 'realm'),
        mark: cell(row, 'retired') ? 'retired' : null,
        at: cell(row, 'born'),
      },
    ];
  });
}

export const BRIDGE_SHAPES: readonly PouredShape[] = [
  { slug: ORGANS, title: 'The bridge sees', empty: NO_ROW, map: organsRows },
  { slug: SWITCHBOARD, title: 'The lamps lit', empty: NO_ROW, map: switchboardRows },
  { slug: HANDS, title: 'The hands dealt', empty: NO_ROW, map: handsRows },
];
