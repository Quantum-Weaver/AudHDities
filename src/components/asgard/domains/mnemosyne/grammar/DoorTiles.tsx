// src/components/asgard/domains/mnemosyne/grammar/DoorTiles.tsx

import { Card } from '@/components/runes/Card';
import {
  COUNTED_FROM_ROWS,
  LINE_TABLES,
  TILE_TABLES,
  type DoorCounts,
} from '@/lib/grammar/grammar-contract';
import { GrammarFaultBlock } from './GrammarFault';

/** One count per table: six tiles, then the two remaining tables as one line. */
export function DoorTiles({ counts }: { counts: DoorCounts }) {
  const line = LINE_TABLES.map((table) => counts[table]);
  const counted = line.filter((one) => one.count !== null);
  const lineFault = line.find((one) => one.fault)?.fault ?? null;

  return (
    <section className="flex flex-col gap-3">
      <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-6">
        {TILE_TABLES.map((table) => {
          const tile = counts[table];
          return (
            <Card
              key={tile.table}
              data={{ id: tile.table, type: 'value', title: tile.label, value: tile.count ?? '' }}
              variant="glass"
              size="full"
              radius="lg"
              shadow="sm"
              className="flex h-full flex-col gap-1 p-5"
            >
              <span className="text-2xl font-bold text-star-dust">
                {tile.count === null ? '—' : tile.count.toLocaleString('en')}
              </span>
              <span className="text-xs uppercase tracking-wide text-star-dust/40">{tile.label}</span>
              {tile.fault ? <GrammarFaultBlock fault={tile.fault} className="text-[11px]" /> : null}
            </Card>
          );
        })}
      </div>

      {counted.length > 0 ? (
        <span className="text-xs text-star-dust/40">
          {counted.map((one) => `${one.count} ${one.label}`).join(' · ')} · {COUNTED_FROM_ROWS}
        </span>
      ) : null}
      {lineFault ? <GrammarFaultBlock fault={lineFault} /> : null}
    </section>
  );
}
