// src/components/asgard/domains/mnemosyne/grammar/ColourShelf.tsx

import {
  COLOUR_SHELF_HEADING,
  COLOUR_SHELF_SOURCE,
  NO_COLOUR_CHOSEN,
  colourLine,
  colourShelfLine,
  type SensesWall,
} from '@/lib/grammar/grammar-contract';

/** Every colour the lexicon holds as a swatch, with its hex and its count. */
export function ColourShelf({ wall }: { wall: SensesWall }) {
  return (
    <section className="flex flex-col gap-3">
      <div className="flex flex-wrap items-center gap-3">
        <h2 className="text-sm font-medium uppercase tracking-wide text-star-dust/50">
          {COLOUR_SHELF_HEADING}
        </h2>
        <span className="text-xs text-star-dust/40">{colourShelfLine(wall)}</span>
        <span className="text-[11px] text-star-dust/35">{COLOUR_SHELF_SOURCE}</span>
      </div>

      {wall.colours.length === 0 ? (
        <p className="text-xs text-star-dust/35">{NO_COLOUR_CHOSEN}</p>
      ) : (
        <div className="grid grid-cols-2 gap-3 md:grid-cols-4 lg:grid-cols-6">
          {wall.colours.map((colour) => (
            <div
              key={colour.hex}
              className="flex items-center gap-2 rounded-lg border border-white/[0.08] bg-white/[0.02] p-2"
            >
              <span
                className="inline-block h-6 w-6 shrink-0 rounded"
                style={{ backgroundColor: colour.hex }}
              />
              <span className="flex min-w-0 flex-col">
                <span className="truncate text-[13px] text-star-dust">{colour.hex}</span>
                <span className="text-[11px] text-star-dust/40">{colourLine(colour)}</span>
              </span>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
