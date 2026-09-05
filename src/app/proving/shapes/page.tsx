'use client';

import { useState } from 'react';
import { Carousel, Gallery, Procession, type CarouselStop } from '@/components/shapes';
import type { GalleryConfig } from '@/lib/gallery';
import type { Section } from '@/lib/procession';

interface ProvingStop extends CarouselStop {
  says: string;
}

const STOPS: readonly ProvingStop[] = [
  { id: 'hearth', title: 'The Hearth', form: 'room', says: 'where the fire is kept' },
  { id: 'loom', title: 'The Loom', form: 'room', says: 'where the thread is drawn' },
  { id: 'well', title: 'The Well', form: 'room', says: 'where the water is read' },
  { id: 'forge', title: 'The Forge', form: 'room', says: 'where the tools are made' },
  { id: 'gate', title: 'The Gate', form: 'room', says: 'where the road begins' },
];

const SECTIONS: readonly Section[] = [
  {
    id: 'ground',
    title: 'the ground',
    pause: 'stand a moment',
    rooms: [
      {
        id: 'floor',
        name: 'The Floor',
        line: 'ground',
        story: 'The first thing under a walker. It carries every other deck.',
        sigil: '·',
      },
    ],
  },
  {
    id: 'middle',
    title: 'the middle',
    pause: 'and again',
    rooms: [
      {
        id: 'landing',
        name: 'The Landing',
        line: 'middle',
        story: 'A turn in the stair, wide enough to rest on.',
        sigil: '·',
      },
      {
        id: 'window',
        name: 'The Window',
        line: 'middle',
        story: 'A view held open, so the walk is not only inward.',
        sigil: '·',
      },
    ],
  },
  {
    id: 'upper',
    title: 'the upper',
    rooms: [
      {
        id: 'roof',
        name: 'The Roof',
        line: 'upper',
        story: 'The last deck, and the sky above it.',
        sigil: '·',
      },
    ],
  },
];

interface Ware {
  id: string;
  name: string;
  kind: string;
  lede: string;
  count: number;
  slug: string;
}

const WARES: readonly Ware[] = [
  { id: 'w1', name: 'Copper Bell', kind: 'sound', lede: 'A hand bell cast in copper, tuned low.', count: 3, slug: 'copper-bell' },
  { id: 'w2', name: 'Cedar Box', kind: 'wood', lede: 'A lidded box in cedar, joined without glue.', count: 1, slug: 'cedar-box' },
  { id: 'w3', name: 'Linen Cloth', kind: 'cloth', lede: 'Woven flax, washed twice, left undyed.', count: 12, slug: 'linen-cloth' },
  { id: 'w4', name: 'Slate Tile', kind: 'stone', lede: 'Split slate, one face rough and one smooth.', count: 40, slug: 'slate-tile' },
  { id: 'w5', name: 'Beeswax Candle', kind: 'light', lede: 'Rolled beeswax with a cotton wick.', count: 24, slug: 'beeswax-candle' },
  { id: 'w6', name: 'Copper Wire', kind: 'metal', lede: 'Drawn copper, annealed soft, on a wooden spool.', count: 6, slug: 'copper-wire' },
  { id: 'w7', name: 'Oak Stool', kind: 'wood', lede: 'Three legs in green oak, wedged through the seat.', count: 2, slug: 'oak-stool' },
  { id: 'w8', name: 'Glass Phial', kind: 'glass', lede: 'Blown glass with a ground stopper.', count: 9, slug: 'glass-phial' },
];

const WARE_GALLERY: GalleryConfig<Ware> = {
  searchIn: [(w) => w.name, (w) => w.kind, (w) => w.lede],
  card: {
    id: (w) => w.id,
    title: (w) => w.name,
    badges: (w) => [w.kind],
    preview: (w) => w.lede,
    meta: (w) => `${w.count} on the shelf`,
    address: (w) => `#${w.slug}`,
  },
  empty: {
    silent: 'the shelf is still filling',
    unmatched: 'nothing on the shelf answers to that',
  },
  previewLength: 90,
};

export default function ProvingShapesPage() {
  const [chosen, setChosen] = useState<string | null>(null);

  return (
    <main className="min-h-screen py-12!">
      <div className="container mx-auto! max-w-5xl px-6!">
        <h1 className="mb-10! text-2xl font-bold text-star-dust">Shapes</h1>

        <section className="mb-16!" aria-labelledby="proving-carousel">
          <h2 id="proving-carousel" className="mb-1! text-lg font-semibold text-star-dust">
            Carousel
          </h2>
          <p className="mb-4! text-sm text-star-dust/70">
            One stop at a time, left to right, and it never wraps.
          </p>
          <p className="mb-4! min-h-[1.5rem] text-sm text-star-dust" data-testid="carousel-chosen">
            {chosen ? `chosen: ${chosen}` : ''}
          </p>
          <Carousel
            stops={STOPS}
            label="the rooms, one at a time"
            onSelect={(stop) => setChosen(stop.title)}
          >
            {(stop, face) => (
              <>
                <span className="block text-base font-semibold">{stop.title}</span>
                <span className="mt-1! block text-xs text-star-dust/70">{stop.says}</span>
                {face.focused && (
                  <span className="mt-3! block text-[10px] uppercase tracking-wide text-hearth-gold">
                    press to choose
                  </span>
                )}
              </>
            )}
          </Carousel>
        </section>

        <section className="mb-16!" aria-labelledby="proving-procession">
          <h2 id="proving-procession" className="mb-1! text-lg font-semibold text-star-dust">
            Procession
          </h2>
          <p className="mb-4! text-sm text-star-dust/70">
            The deck in view sits at the anchor; the decks already walked lift above it.
          </p>
          <Procession sections={SECTIONS} label="the corridor of decks">
            {(room) => (
              <>
                <h3 className="text-xl font-semibold">{room.name}</h3>
                {room.line && <p className="mt-1! text-xs uppercase tracking-wide text-star-dust/70">{room.line}</p>}
                {room.story && <p className="mt-4! text-sm text-star-dust/70">{room.story}</p>}
              </>
            )}
          </Procession>
        </section>

        <section aria-labelledby="proving-gallery">
          <h2 id="proving-gallery" className="mb-1! text-lg font-semibold text-star-dust">
            Gallery
          </h2>
          <p className="mb-4! text-sm text-star-dust/70">
            Many at once, narrowed by what you type.
          </p>
          <Gallery
            items={WARES}
            config={WARE_GALLERY}
            label="filter the shelf"
            placeholder="filter the shelf"
          />
        </section>
      </div>
    </main>
  );
}
