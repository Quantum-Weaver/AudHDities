// src/app/(cosmic)/theater/MovingStage.tsx
'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Clapperboard, Play, Square } from 'lucide-react';
import { cn } from '@/lib/utils';

type Wear =
  | 'box'
  | 'text'
  | 'density'
  | 'grid'
  | 'move'
  | 'attr'
  | 'active'
  | 'replay'
  | 'beats'
  | 'stagger'
  | 'element'
  | 'page';

interface Turn {
  /** The emitted class. */
  name: string;
  wear: Wear;
  /** What the class does, in one line. */
  does: string;
  /** Beat or child classes the class orchestrates. */
  parts?: readonly string[];
  /** The data attribute a toggle turns, and the value it turns to. */
  attr?: readonly [string, string];
  /** The element base a trio dresses. */
  element?: string;
}

interface Sheet {
  file: string;
  does: string;
  turns: readonly Turn[];
}

const STAGE: readonly Sheet[] = [
  {
    file: 'attention-modes.css',
    does: 'Five paces of attention; every descendant inherits the pace and the gap.',
    turns: [
      { name: 'attention-eagle', wear: 'density', does: 'Sharp, singular focus: 500ms pace, 2rem gap.' },
      { name: 'attention-dove', wear: 'density', does: 'Gentle and calm: 700ms pace, 2rem gap.' },
      { name: 'attention-owl', wear: 'density', does: 'Deep and patient: 500ms pace, 1.25rem gap.' },
      { name: 'attention-hummingbird', wear: 'density', does: 'Fast and darting: 150ms pace, 0.75rem gap.' },
      { name: 'attention-peacock', wear: 'density', does: 'Expressive and rich: 300ms pace, 0.75rem gap.' },
    ],
  },
  {
    file: 'attention-selector.css',
    does: 'The control that switches the five paces.',
    turns: [
      { name: 'attention-selector', wear: 'page', does: 'A fixed pill at the bottom right of the document.' },
      { name: 'attention-selector-mode-eagle', wear: 'attr', attr: ['data-selected', 'true'], does: 'Chosen at full opacity, scaled 1.1 over 500ms.' },
      { name: 'attention-selector-mode-dove', wear: 'attr', attr: ['data-selected', 'true'], does: 'Chosen at full opacity, scaled 1.1 over 700ms.' },
      { name: 'attention-selector-mode-owl', wear: 'attr', attr: ['data-selected', 'true'], does: 'Chosen at full opacity, scaled 1.1 over 500ms.' },
      { name: 'attention-selector-mode-hummingbird', wear: 'attr', attr: ['data-selected', 'true'], does: 'Chosen at full opacity, scaled 1.1 over 150ms.' },
      { name: 'attention-selector-mode-peacock', wear: 'attr', attr: ['data-selected', 'true'], does: 'Chosen at full opacity, scaled 1.1 over 300ms.' },
    ],
  },
  {
    file: 'ceremonies.css',
    does: 'Six ceremonies; each parent times the beats its children carry.',
    turns: [
      { name: 'ceremony-recognition', wear: 'beats', parts: ['beat-gather', 'beat-hold', 'beat-affirm'], does: 'Three beats over 2300ms.' },
      { name: 'ceremony-naming', wear: 'beats', parts: ['beat-gather', 'beat-name', 'beat-settle'], does: 'Three beats over 2500ms.' },
      { name: 'ceremony-welcome', wear: 'beats', parts: ['beat-approach', 'beat-weave', 'beat-seat', 'beat-bless'], does: 'Four beats over 6500ms.' },
      { name: 'ceremony-farewell', wear: 'beats', parts: ['beat-gather', 'beat-escort', 'beat-release'], does: 'Three beats over 3700ms.' },
      { name: 'ceremony-recentering', wear: 'beats', parts: ['beat-withdraw', 'beat-hold', 'beat-return'], does: 'Three beats over 3300ms.' },
      { name: 'ceremony-awakening', wear: 'beats', parts: ['beat-stir', 'beat-emerge', 'beat-arrive'], does: 'Three beats over 3000ms.' },
    ],
  },
  {
    file: 'ceremonies-refuge.css',
    does: 'Thresholds, bookends and the refuge sequence.',
    turns: [
      { name: 'bookend-entrance', wear: 'move', does: 'Carries the entrance duration and easing on every property.' },
      { name: 'bookend-exit', wear: 'move', does: 'Carries the exit duration and easing on every property.' },
      { name: 'bookend-pause', wear: 'move', does: 'Carries the 300ms pause duration on every property.' },
      { name: 'ceremony-threshold-arrival', wear: 'active', does: 'Rises from 10px and fades in when .active joins it.' },
      { name: 'ceremony-threshold-departure', wear: 'active', does: 'Lifts 10px and fades out when .active joins it.' },
      { name: 'ceremony-threshold-hold', wear: 'replay', does: 'One breath of the pause keyframe.' },
      { name: 'refuge-sequence-container', wear: 'box', does: 'Holds the whole 5700ms choreography.' },
      { name: 'refuge-entry', wear: 'replay', does: 'The welcome into refuge, 1200ms, forwards.' },
      { name: 'refuge-hold', wear: 'replay', does: 'The held breath, 2000ms, repeating.' },
      { name: 'refuge-return', wear: 'replay', does: 'The guided return, 2500ms, forwards.' },
    ],
  },
  {
    file: 'consciousness-depth.css',
    does: 'Six floors of density and five elemental palettes.',
    turns: [
      { name: 'frequency-physical', wear: 'density', does: 'Density 0.7.' },
      { name: 'frequency-crisis', wear: 'density', does: 'Density 0.8.' },
      { name: 'frequency-synthesis', wear: 'density', does: 'Density 1.' },
      { name: 'frequency-wisdom', wear: 'density', does: 'Density 1.1.' },
      { name: 'frequency-akashic', wear: 'density', does: 'Density 1.3.' },
      { name: 'frequency-divine', wear: 'density', does: 'Density 1.5.' },
      { name: 'element-earth', wear: 'element', element: 'earth', does: 'Grounded action; text, background and border.' },
      { name: 'element-air', wear: 'element', element: 'air', does: 'Mental choice; text, background and border.' },
      { name: 'element-fire', wear: 'element', element: 'fire', does: 'Will and transformation; text, background and border.' },
      { name: 'element-water', wear: 'element', element: 'water', does: 'Flow and dissolution; text, background and border.' },
      { name: 'element-spirit', wear: 'element', element: 'spirit', does: 'Unity and witnessing; text, background and border.' },
      { name: 'consciousness-grid', wear: 'grid', does: 'A grid whose gap is scaled by the floor density.' },
      { name: 'consciousness-depth-indicator', wear: 'attr', attr: ['data-floor', 'divine'], does: 'Opacity follows the floor it names.' },
    ],
  },
  {
    file: 'deity-voices.css',
    does: 'Nine seats, each with its own colour, font and easing.',
    turns: [
      { name: 'deity-quantum-weaver', wear: 'text', does: 'The Weaver: medieval, #6C5CE7.' },
      { name: 'deity-aethelred', wear: 'text', does: 'Aethelred: medieval, #2E0B1C.' },
      { name: 'deity-chancellor', wear: 'text', does: 'Chancellor: medieval, #00CEC9.' },
      { name: 'deity-seer', wear: 'text', does: 'Seer: arcane, #6C5CE7.' },
      { name: 'deity-hearth-keeper', wear: 'text', does: 'Hearth-Keeper: medieval, #C44B2D.' },
      { name: 'deity-archivist', wear: 'text', does: 'Archivist: medieval, #636E72.' },
      { name: 'deity-codex', wear: 'text', does: 'Codex: geometric, #00B894.' },
      { name: 'deity-gatekeeper', wear: 'text', does: 'Gatekeeper: runic, #636E72.' },
      { name: 'deity-alchemist', wear: 'text', does: 'Alchemist: arcane, #22D3EE.' },
    ],
  },
  {
    file: 'ensemble.css',
    does: 'Companions drifting in, holding, and rising together.',
    turns: [
      { name: 'convergence-driftin', wear: 'stagger', parts: ['companion'], does: 'Companions to 0.5 over 1200ms, 120ms apart.' },
      { name: 'convergence-hold', wear: 'stagger', parts: ['companion'], does: 'Companions to 0.3 over 2000ms, together.' },
      { name: 'convergence-reascent', wear: 'stagger', parts: ['companion'], does: 'Companions back to full over 2500ms, 80ms apart.' },
      { name: 'ensemble-roundabout', wear: 'stagger', does: 'Children over 2000ms, 90ms apart.' },
      { name: 'ensemble-blessing-circle', wear: 'stagger', does: 'Children over 2500ms, 500ms apart.' },
    ],
  },
  {
    file: 'eternal-witness.css',
    does: 'Three ways of being witnessed, as a backdrop or inside a container.',
    turns: [
      { name: 'witness-witnessing', wear: 'page', does: 'A fixed backdrop behind the page; .witness-witnessing-active raises it.' },
      { name: 'witness-holding', wear: 'page', does: 'A fixed backdrop behind the page; .witness-holding-active raises it.' },
      { name: 'witness-blessing', wear: 'page', does: 'A fixed backdrop behind the page; .witness-blessing-active raises it.' },
      { name: 'witness-presence-container mode-witnessing', wear: 'box', does: 'The witnessing wash inside a container.' },
      { name: 'witness-presence-container mode-holding', wear: 'box', does: 'The holding wash inside a container.' },
      { name: 'witness-presence-container mode-blessing', wear: 'box', does: 'The blessing wash inside a container.' },
    ],
  },
  {
    file: 'gates.css',
    does: 'The self-pause trigger and the three gates that ask before they open.',
    turns: [
      { name: 'self-pause-trigger', wear: 'page', does: 'A fixed 56px button at the bottom right of the document.' },
      { name: 'invitation-gate-wisdom', wear: 'attr', attr: ['data-gate-state', 'open'], does: 'Opens to full over 500ms.' },
      { name: 'invitation-gate-akashic', wear: 'attr', attr: ['data-gate-state', 'open'], does: 'Opens to full over 2000ms.' },
      { name: 'invitation-gate-divine', wear: 'attr', attr: ['data-gate-state', 'open'], does: 'Opens to full over 2500ms.' },
    ],
  },
  {
    file: 'glow-field.css',
    does: 'Ambient presence and the glow each domain modulates.',
    turns: [
      { name: 'presence-mnemosyne', wear: 'box', does: 'Memory holding the room, at 0.6.' },
      { name: 'presence-calm', wear: 'box', does: 'A calm wash, at 0.5.' },
      { name: 'presence-inspiration', wear: 'box', does: 'An inspiring wash, at 0.55.' },
      { name: 'glow-modulated-quantum', wear: 'box', does: 'Quantum glow, coefficient 1.15, widening on hover.' },
      { name: 'glow-modulated-cosmic', wear: 'box', does: 'Cosmic glow, widening on hover.' },
      { name: 'glow-modulated-pantheon', wear: 'box', does: 'Pantheon glow, widening on hover.' },
      { name: 'glow-modulated-bifrost', wear: 'box', does: 'Bifrost glow, widening on hover.' },
      { name: 'glow-modulated-library', wear: 'box', does: 'Library glow, widening on hover.' },
      { name: 'glow-modulated-void', wear: 'box', does: 'Void glow, widening on hover.' },
      { name: 'glow-modulated-council', wear: 'box', does: 'Council glow, widening on hover.' },
      { name: 'glow-modulated-sandbox', wear: 'box', does: 'Sandbox glow, widening on hover.' },
      { name: 'glow-modulated-music', wear: 'box', does: 'Music glow, widening on hover.' },
      { name: 'glow-modulated-community', wear: 'box', does: 'Community glow, widening on hover.' },
      { name: 'glow-modulated-support', wear: 'box', does: 'Support glow, widening on hover.' },
      { name: 'glow-modulated-architecture', wear: 'box', does: 'Architecture glow, widening on hover.' },
    ],
  },
  {
    file: 'pause-state.css',
    does: 'The world-pause, worn by the document root, not by a sample.',
    turns: [
      { name: 'pause-overlay', wear: 'page', does: 'A fixed vignette that rises when the root carries data-cosmic-pause.' },
      { name: 'pause-exempt', wear: 'page', does: 'Keeps an element running while the world is held.' },
    ],
  },
  {
    file: 'scene.css',
    does: 'Six camera moves and two scene timelines.',
    turns: [
      { name: 'camera-move-push', wear: 'move', does: 'Draws the eye inward, 1200ms.' },
      { name: 'camera-move-pull', wear: 'move', does: 'Releases focus back to the whole, 1200ms.' },
      { name: 'camera-move-establish', wear: 'move', does: 'Sets the stage, then settles, 1600ms.' },
      { name: 'camera-move-reveal', wear: 'move', does: 'A rise into presence, 2000ms.' },
      { name: 'camera-move-orbit', wear: 'move', does: 'A slow rotation, 2000ms, linear.' },
      { name: 'camera-move-descend', wear: 'move', does: 'Comes down into the scene, 1600ms.' },
      { name: 'scene-arrival', wear: 'box', does: 'A 4800ms timeline: establish, then push.' },
      { name: 'scene-gathering', wear: 'box', does: 'A 7600ms timeline: reveal, orbit, pull.' },
    ],
  },
  {
    file: 'supportive-affordances.css',
    does: 'The shape each seat gives its help during a recovery.',
    turns: [
      { name: 'supportive-warmth', wear: 'attr', attr: ['data-supportive-state', 'active'], does: 'A warmth message rises over 1200ms.' },
      { name: 'supportive-diagnostic', wear: 'attr', attr: ['data-supportive-state', 'active'], does: 'A structured summary rises over 1200ms.' },
      { name: 'supportive-reframe', wear: 'attr', attr: ['data-supportive-state', 'active'], does: 'A gentle reframe rises over 1200ms.' },
    ],
  },
  {
    file: 'transcendence.css',
    does: 'Four shifts between the floors of consciousness.',
    turns: [
      { name: 'transcend-physical-crisis', wear: 'replay', does: 'Physical to crisis, 600ms, forwards.' },
      { name: 'transcend-crisis-wisdom', wear: 'replay', does: 'Crisis to wisdom, 800ms, forwards.' },
      { name: 'transcend-wisdom-akashic', wear: 'replay', does: 'Wisdom to akashic, 900ms, forwards.' },
      { name: 'transcend-akashic-divine', wear: 'replay', does: 'Akashic to divine, 1000ms, forwards.' },
    ],
  },
];

const TURN_COUNT = STAGE.reduce((n, sheet) => n + sheet.turns.length, 0);

const BOX = 'flex h-14 w-full items-center justify-center rounded-lg text-[10px] text-star-dust/60';

function Sample({ turn, playing, take }: { turn: Turn; playing: boolean; take: number }) {
  const dots = [0, 1, 2, 3, 4, 5];

  switch (turn.wear) {
    case 'page':
      return (
        <div className={cn(BOX, 'border border-dashed border-white/15 px-3 text-center')}>
          Worn by the document, not by a sample
        </div>
      );

    case 'box':
      return <div className={cn(BOX, 'border border-white/10 bg-white/5', turn.name)}>sample</div>;

    case 'text':
      return (
        <div className={cn(BOX, 'bg-white/[0.03]', turn.name)}>
          <span className="text-base font-semibold" style={{ color: 'var(--text-primary)' }}>
            The Sanctuary
          </span>
        </div>
      );

    case 'density':
      return (
        <div className={cn(BOX, 'bg-white/[0.03]', turn.name)}>
          <span
            className="flex items-center"
            style={{ gap: 'calc(0.5rem * var(--ui-density, 1) + var(--attention-density-gap, 0rem))' }}
          >
            {dots.slice(0, 4).map((d) => (
              <span key={d} className="block h-2 w-2 rounded-full bg-neurospark/60" />
            ))}
          </span>
        </div>
      );

    case 'grid':
      return (
        <div className={cn(BOX, 'bg-white/[0.03] frequency-divine')}>
          <span className={turn.name} style={{ gridTemplateColumns: 'repeat(4, 1fr)' }}>
            {dots.slice(0, 4).map((d) => (
              <span key={d} className="block h-2 w-2 rounded-full bg-neurospark/60" />
            ))}
          </span>
        </div>
      );

    case 'move':
      return (
        <div className={cn(BOX, 'bg-white/[0.03] overflow-hidden')}>
          <span
            className={cn('block h-8 w-16 rounded-md bg-neurospark/30', turn.name)}
            style={{
              opacity: playing ? 1 : 0.3,
              transform: playing ? 'translateX(28px) scale(1.15)' : 'translateX(-28px) scale(0.9)',
            }}
          />
        </div>
      );

    case 'attr': {
      const [attribute, on] = turn.attr ?? ['data-state', 'on'];
      const props = { [attribute]: playing ? on : 'closed' } as Record<string, string>;
      return (
        <div className={cn(BOX, 'bg-white/[0.03]')}>
          <span
            {...props}
            className={cn('block rounded-md bg-neurospark/25 px-4 py-2 text-star-dust/70', turn.name)}
          >
            sample
          </span>
        </div>
      );
    }

    case 'active':
      return (
        <div className={cn(BOX, 'bg-white/[0.03]')}>
          <span
            className={cn(
              'block rounded-md bg-neurospark/25 px-4 py-2 text-star-dust/70 transition-all duration-700 motion-reduce:transition-none',
              turn.name,
              playing && 'active'
            )}
          >
            sample
          </span>
        </div>
      );

    case 'replay':
      return (
        <div className={cn(BOX, 'bg-white/[0.03]')}>
          <span
            key={take}
            className={cn('block h-8 w-16 rounded-md bg-neurospark/30', playing && turn.name)}
          />
        </div>
      );

    case 'beats':
      return (
        <div className={cn('rounded-lg bg-white/[0.03] p-3', turn.name)} key={take}>
          {(turn.parts ?? []).map((beat) => (
            <span
              key={beat}
              className={cn('block text-[11px] text-star-dust/60', beat)}
              style={playing ? { animationName: 'fadeInUp' } : undefined}
            >
              {beat}
            </span>
          ))}
        </div>
      );

    case 'stagger': {
      const child = turn.parts?.[0];
      return (
        <div className={cn(BOX, 'bg-white/[0.03]', turn.name)} key={take}>
          <span className="flex items-center gap-2">
            {dots.map((d) => (
              <span
                key={d}
                className={cn('block h-3 w-3 rounded-full bg-neurospark/50', child)}
                style={playing ? { animationName: 'fadeInUp' } : { opacity: 0.2 }}
              />
            ))}
          </span>
        </div>
      );
    }

    case 'element':
      return (
        <div className={cn('flex items-center gap-2 rounded-lg bg-white/[0.03] p-3', turn.name)}>
          <span className="text-xs font-semibold">{turn.element}</span>
          <span className={cn('block h-8 w-10 rounded-md', `element-${turn.element}-bg`)} />
          <span
            className={cn('block h-8 w-10 rounded-md border-2', `element-${turn.element}-border`)}
          />
        </div>
      );
  }
}

export function MovingStage() {
  const [playing, setPlaying] = useState(false);
  const [take, setTake] = useState(0);

  const toggle = () => {
    setPlaying((was) => !was);
    setTake((n) => n + 1);
  };

  return (
    <main className="min-h-screen py-12">
      <div className="container max-w-6xl mx-auto px-6">

        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 bg-neurospark/10 px-4 py-2 rounded-full mb-4">
            <Clapperboard size={14} className="text-neurospark" />
            <span className="text-neurospark text-sm">The Theater</span>
          </div>
          <h1 className="text-3xl font-bold text-star-dust mb-4">The moving stage</h1>
          <p className="text-lg text-star-dust/60 max-w-2xl mx-auto">
            {STAGE.length} generated stylesheets and {TURN_COUNT} effects, every one
            emitted by the cosmic generator and loaded here. Press play and the stage
            performs; reduced motion is honoured by the sheets themselves.
          </p>
          <p className="mt-3 text-xs text-star-dust/40">
            The Nine and what the record holds of them live at{' '}
            <Link href="/nexus/council" className="text-neurospark hover:underline">
              the Council
            </Link>
            .
          </p>
        </div>

        <div className="sticky top-2 z-20 mb-8 flex justify-center">
          <button
            type="button"
            onClick={toggle}
            className={cn(
              'inline-flex items-center gap-2 rounded-full border px-5 py-2 text-sm font-medium transition-colors motion-reduce:transition-none',
              playing
                ? 'border-neurospark/40 bg-neurospark/20 text-neurospark'
                : 'border-white/15 bg-deep-space/80 text-star-dust/70 hover:text-star-dust'
            )}
          >
            {playing ? <Square size={14} /> : <Play size={14} />}
            {playing ? 'Still' : 'Play'}
          </button>
        </div>

        {STAGE.map((sheet) => (
          <section key={sheet.file} className="mb-12">
            <h2 className="text-sm font-semibold text-star-dust">
              {sheet.file}{' '}
              <span className="font-normal text-star-dust/30">{sheet.turns.length}</span>
            </h2>
            <p className="mb-4 text-xs text-star-dust/50">{sheet.does}</p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {sheet.turns.map((turn) => (
                <div
                  key={turn.name}
                  className="rounded-xl border border-white/10 bg-white/5 p-4"
                >
                  <p className="mb-1 break-all font-mono text-[11px] text-star-dust">
                    .{turn.name.split(' ').join(' .')}
                  </p>
                  <p className="mb-3 text-[11px] text-star-dust/50">{turn.does}</p>
                  <Sample turn={turn} playing={playing} take={take} />
                  {turn.parts && turn.wear !== 'stagger' && (
                    <p className="mt-2 font-mono text-[10px] text-star-dust/35">
                      {turn.parts.map((p) => `.${p}`).join(' ')}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </section>
        ))}

        <p className="text-center text-xs text-star-dust/40">
          Every class above is emitted by the cosmic generator. Run{' '}
          <code className="text-neurospark">npm run generate</code> in the cosmic
          module to re-emit the sheets this stage loads.
        </p>
      </div>
    </main>
  );
}
