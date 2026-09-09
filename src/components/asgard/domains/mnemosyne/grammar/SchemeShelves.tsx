// src/components/asgard/domains/mnemosyne/grammar/SchemeShelves.tsx

import { Card } from '@/components/runes/Card';
import { Badge } from '@/components/runes/Badge';
import {
  LATTICE_HEADING,
  LATTICE_META,
  NO_SCHEME,
  shelveSchemes,
  type GrammarFault,
  type SchemeChip,
} from '@/lib/grammar/grammar-contract';
import { GrammarFaultBlock } from './GrammarFault';

/** The schemes shelved by kind, each shelf counting its own chips. */
export function SchemeShelves({
  schemes,
  fault,
}: {
  schemes: readonly SchemeChip[];
  fault: GrammarFault | null;
}) {
  const shelves = shelveSchemes(schemes);

  return (
    <section className="flex flex-col gap-3">
      <div className="flex flex-wrap items-center gap-3">
        <h2 className="text-sm font-medium uppercase tracking-wide text-star-dust/50">
          {LATTICE_HEADING}
        </h2>
        <span className="text-xs text-star-dust/40">
          {fault
            ? LATTICE_META
            : `${schemes.length} schemes in ${shelves.length} kinds · ${LATTICE_META}`}
        </span>
      </div>
      {fault ? <GrammarFaultBlock fault={fault} /> : null}
      {!fault && shelves.length === 0 ? (
        <p className="text-xs text-star-dust/35">{NO_SCHEME}</p>
      ) : null}
      {shelves.length > 0 ? (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {shelves.map((shelf) => (
            <Card
              key={shelf.kind}
              data={{ id: shelf.kind, type: 'value', title: shelf.kind, value: shelf.chips.length }}
              variant="glass"
              size="full"
              radius="lg"
              shadow="sm"
              className="flex h-full flex-col gap-2.5 p-5"
            >
              <span className="text-[11px] uppercase tracking-wider text-star-dust/35">
                {shelf.kind} · {shelf.chips.length}
              </span>
              <div className="flex flex-wrap gap-1.5">
                {shelf.chips.map((chip) => (
                  <Badge key={chip.name} variant="outline" size="sm" pill>
                    {chip.name}
                  </Badge>
                ))}
              </div>
            </Card>
          ))}
        </div>
      ) : null}
    </section>
  );
}
