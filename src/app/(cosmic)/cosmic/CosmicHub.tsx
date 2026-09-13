// src/app/(cosmic)/cosmic/CosmicHub.tsx
'use client';

import Link from 'next/link';
import { Sparkles, Map as MapIcon, FileCode2 } from 'lucide-react';
import { useContinuityBeam } from '@/contexts/ContinuityBeamContext';
import { HALL_ORDER, PLACE_DISPLAY } from '@/lib/constants/systems/environments/places';

const ROOMS: readonly { href: string; name: string; does: string }[] = [
  {
    href: '/environments',
    name: 'The Crossing Hall',
    does: 'Eleven doorways in a fixed geometry. Step through and the sky changes.',
  },
  {
    href: '/colors',
    name: 'The Colours',
    does: 'Every named colour and gradient the cosmic tokens hold, ready to copy.',
  },
  {
    href: '/effects',
    name: 'The Grimoire',
    does: 'The glows, shadows, backdrops and classes the tokens emit.',
  },
  {
    href: '/theater',
    name: 'The Theater',
    does: 'The moving stylesheets, each effect performed on a sample.',
  },
  {
    href: '/playground',
    name: 'The Sandbox',
    does: 'Components with live controls: buttons, cards, badges, inputs, states.',
  },
];

export function CosmicHub() {
  const { setMapOpen } = useContinuityBeam();

  return (
    <main className="min-h-screen py-12">
      <div className="container max-w-5xl mx-auto px-6">

        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-neurospark/10 px-4 py-2 rounded-full mb-4">
            <Sparkles size={14} className="text-neurospark" />
            <span className="text-neurospark text-sm">Cosmic</span>
          </div>
          <h1 className="text-3xl font-bold text-star-dust mb-4">
            The Design Playground
          </h1>
          <p className="text-lg text-star-dust/60 max-w-xl mx-auto">
            Five rooms where the Sanctuary shows its own dress: the places you can
            stand in, the colours, the spells, the stage, and the components.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {ROOMS.map((room) => (
            <Link
              key={room.href}
              href={room.href}
              className="group rounded-lg border border-star-dust/10 bg-white/5 p-5 transition-colors motion-reduce:transition-none hover:border-star-dust/25"
            >
              <span className="block text-sm font-medium text-star-dust group-hover:text-neurospark transition-colors motion-reduce:transition-none">
                {room.name}
              </span>
              <span className="mt-1 block text-xs text-star-dust/50">{room.does}</span>
              <span className="mt-3 block font-mono text-[10px] text-star-dust/30">
                {room.href}
              </span>
            </Link>
          ))}
        </div>

        <h2 className="mt-12 mb-3 text-sm font-medium text-star-dust/60">
          The whole street
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <button
            type="button"
            onClick={() => setMapOpen(true)}
            className="group rounded-lg border border-star-dust/10 bg-white/5 p-5 text-left transition-colors motion-reduce:transition-none hover:border-star-dust/25"
          >
            <span className="flex items-center gap-2 text-sm font-medium text-star-dust group-hover:text-neurospark transition-colors motion-reduce:transition-none">
              <MapIcon size={14} />
              The map
            </span>
            <span className="mt-1 block text-xs text-star-dust/50">
              Every realm and room of the Sanctuary, opened here as a dialog.
            </span>
          </button>

          <a
            href="/sitemap.xml"
            className="group rounded-lg border border-star-dust/10 bg-white/5 p-5 transition-colors motion-reduce:transition-none hover:border-star-dust/25"
          >
            <span className="flex items-center gap-2 text-sm font-medium text-star-dust group-hover:text-neurospark transition-colors motion-reduce:transition-none">
              <FileCode2 size={14} />
              The sitemap
            </span>
            <span className="mt-1 block text-xs text-star-dust/50">
              The machine-readable index the crawlers read.
            </span>
            <span className="mt-3 block font-mono text-[10px] text-star-dust/30">
              /sitemap.xml
            </span>
          </a>
        </div>

        <p className="mt-10 text-center text-xs text-star-dust/40">
          The eleven places: {HALL_ORDER.map((id) => PLACE_DISPLAY[id].name).join(' · ')}
        </p>
      </div>
    </main>
  );
}
