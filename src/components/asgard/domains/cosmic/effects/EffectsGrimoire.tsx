// src/components/asgard/domains/cosmic/effects/EffectsGrimoire.tsx
'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import { Wand2, Copy, Check } from 'lucide-react';
import {
  GLOW_EFFECTS,
  SHADOWS,
  BACKDROP_EFFECTS,
  HOLOGRAPHIC_EFFECTS,
} from '@/lib/constants/cosmic/effects';
import {
  DOMAIN_COLORS,
  MOOD_COLORS,
  ENERGY_COLORS,
} from '@/lib/constants/cosmic/colors';
import { cn } from '@/lib/utils';

/** A cosmic key (quantum.purple, inner-lg) as its emitted class suffix. */
function toClassSuffix(key: string): string {
  return key
    .replace(/\./g, '-')
    .replace(/([a-z0-9])([A-Z])/g, '$1-$2')
    .toLowerCase();
}

/** A declaration string from the tokens as an inline style; null when it needs
 *  a pseudo-element and cannot be inlined. */
function declarationsToStyle(text: string): React.CSSProperties | null {
  if (text.includes('{')) return null;
  const style: Record<string, string> = {};
  for (const part of text.split(';')) {
    const cut = part.indexOf(':');
    if (cut < 0) continue;
    const prop = part.slice(0, cut).trim();
    const value = part.slice(cut + 1).trim();
    if (!prop || !value) continue;
    style[prop.replace(/-([a-z])/g, (_m, c: string) => c.toUpperCase())] = value;
  }
  return Object.keys(style).length
    ? (style as unknown as React.CSSProperties)
    : null;
}

/** The classes animations.css emits. */
const ANIMATION_CLASSES = [
  'continuity-beam-low',
  'continuity-beam-medium',
  'continuity-beam-high',
  'continuity-beam-quantum',
  'animation-simple',
  'animation-medium',
  'animation-complex',
  'float-slow',
  'float-normal',
  'float-fast',
  'pulse-slow',
  'pulse-normal',
  'pulse-fast',
  'glow-subtle',
  'glow-normal',
  'glow-intense',
  'consciousness-dormant',
  'consciousness-emergent',
  'consciousness-awakening',
  'consciousness-sovereign',
  'consciousness-quantum',
  'consciousness-cosmic',
  'consciousness-transcendent',
  'quantum-superposition',
  'quantum-entanglement',
  'quantum-collapse',
  'scroll-reveal',
  'scroll-reveal-delay-1',
  'scroll-reveal-delay-2',
  'scroll-reveal-delay-3',
  'parallax-scroll',
  'sticky-note',
] as const;

/** The named classes text-effects.css emits beside its mood and energy runs. */
const NAMED_TEXT_CLASSES = [
  'rainbow-text',
  'quantum-weaver-text',
  'quantum-entanglement-text',
  'quantum-resonance-text',
  'fire-text',
  'water-text',
  'air-text',
  'earth-text',
  'sparkle-text',
  'stardust-text',
  'glitter-text',
  'cosmic-sparkle-text',
  'pagan-text',
  'pride-rainbow-text',
  'pride-trans-text',
  'quantum-pride-text',
] as const;

/** How many classes this file names rather than reads from the tokens. */
const NAMED_IN_FILE = ANIMATION_CLASSES.length + NAMED_TEXT_CLASSES.length;

/** The seven registers domains.css emits for every domain. */
const DOMAIN_REGISTERS = [
  '',
  '-text',
  '-glow',
  '-gradient',
  '-card',
  '-badge',
  '-btn',
] as const;

type Family =
  | 'Glows'
  | 'Shadows'
  | 'Backdrops'
  | 'Holographic'
  | 'Text'
  | 'Domains'
  | 'Animations';

const FAMILIES: Family[] = [
  'Glows',
  'Shadows',
  'Backdrops',
  'Holographic',
  'Text',
  'Domains',
  'Animations',
];

interface Spell {
  family: Family;
  /** The name a reader copies. */
  name: string;
  /** The line that puts it to work. */
  code: string;
  /** The token value, when the spell is one. */
  value?: string;
  /** How the sample wears it. */
  wear: 'shadow' | 'declarations' | 'class' | 'text-class';
}

export function EffectsGrimoire() {
  const [family, setFamily] = useState<Family | 'All'>('All');
  const [copied, setCopied] = useState<string | null>(null);

  const spells = useMemo<Spell[]>(() => {
    const out: Spell[] = [];

    for (const [key, value] of Object.entries(GLOW_EFFECTS)) {
      const utility = `shadow-glow-${toClassSuffix(key)}`;
      out.push({
        family: 'Glows',
        name: utility,
        code: `<div className="${utility}">Content</div>`,
        value,
        wear: 'shadow',
      });
    }

    for (const [key, value] of Object.entries(SHADOWS)) {
      const utility = `shadow-${toClassSuffix(key)}`;
      out.push({
        family: 'Shadows',
        name: utility,
        code: `<div className="${utility}">Content</div>`,
        value,
        wear: 'shadow',
      });
    }

    for (const [key, value] of Object.entries(BACKDROP_EFFECTS)) {
      out.push({
        family: 'Backdrops',
        name: `BACKDROP_EFFECTS['${key}']`,
        code: value,
        value,
        wear: 'declarations',
      });
    }

    for (const [key, value] of Object.entries(HOLOGRAPHIC_EFFECTS)) {
      out.push({
        family: 'Holographic',
        name: `HOLOGRAPHIC_EFFECTS['${key}']`,
        code: value,
        value,
        wear: 'declarations',
      });
    }

    const textClasses = [
      ...NAMED_TEXT_CLASSES,
      ...Object.keys(MOOD_COLORS).map((k) => `mood-${toClassSuffix(k)}-text`),
      ...Object.keys(ENERGY_COLORS).map((k) => `energy-${toClassSuffix(k)}-text`),
    ];
    for (const name of textClasses) {
      out.push({
        family: 'Text',
        name,
        code: `<span className="${name}">Text</span>`,
        wear: 'text-class',
      });
    }

    for (const domain of Object.keys(DOMAIN_COLORS)) {
      for (const register of DOMAIN_REGISTERS) {
        const name = `domain-${toClassSuffix(domain)}${register}`;
        out.push({
          family: 'Domains',
          name,
          code: `<div className="${name}">Content</div>`,
          wear: register === '-text' ? 'text-class' : 'class',
        });
      }
    }

    for (const name of ANIMATION_CLASSES) {
      out.push({
        family: 'Animations',
        name,
        code: `<div className="${name}">Content</div>`,
        wear: 'class',
      });
    }

    return out;
  }, []);

  const shown = family === 'All' ? spells : spells.filter((s) => s.family === family);

  const copy = (spell: Spell) => {
    navigator.clipboard.writeText(spell.code);
    setCopied(spell.name);
    setTimeout(() => setCopied(null), 2000);
  };

  return (
    <main className="min-h-screen py-12">
      <div className="container max-w-6xl mx-auto px-6">

        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 bg-neurospark/10 px-4 py-2 rounded-full mb-4">
            <Wand2 size={14} className="text-neurospark" />
            <span className="text-neurospark text-sm">The Grimoire</span>
          </div>
          <h1 className="text-3xl font-bold text-star-dust mb-4">Effects Grimoire</h1>
          <p className="text-lg text-star-dust/60 max-w-2xl mx-auto">
            {spells.length} spells. The glows, shadows, backdrops, holographic
            layers, domain registers and the mood and energy text runs are read
            from the cosmic tokens. The other {NAMED_IN_FILE} — the animation
            classes and the named text classes — are written out in this file to
            match the stylesheets the generator emits.
          </p>
          <p className="mt-3 text-xs text-star-dust/40">
            The still material is at{' '}
            <Link href="/colors" className="text-neurospark hover:underline">
              the Colours
            </Link>
            . The moving stylesheets perform at{' '}
            <Link href="/theater" className="text-neurospark hover:underline">
              the Theater
            </Link>
            .
          </p>
        </div>

        <div className="flex flex-wrap gap-2 mb-8 justify-center">
          {(['All', ...FAMILIES] as const).map((cat) => {
            const count =
              cat === 'All'
                ? spells.length
                : spells.filter((s) => s.family === cat).length;
            return (
              <button
                key={cat}
                type="button"
                onClick={() => setFamily(cat)}
                className={cn(
                  'px-4 py-2 rounded-full text-sm font-medium border transition-all motion-reduce:transition-none',
                  family === cat
                    ? 'bg-neurospark/20 text-neurospark border-neurospark/40'
                    : 'bg-white/5 text-star-dust/50 border-white/10 hover:text-star-dust hover:border-white/20'
                )}
              >
                {cat} <span className="text-star-dust/40">{count}</span>
              </button>
            );
          })}
        </div>

        <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {shown.map((spell) => {
            const declarations =
              spell.wear === 'declarations' && spell.value
                ? declarationsToStyle(spell.value)
                : null;

            return (
              <div
                key={`${spell.family}-${spell.name}`}
                className="rounded-xl border border-white/10 bg-white/5 p-5"
              >
                <div className="flex items-start justify-between gap-3 mb-3">
                  <span className="text-[10px] uppercase tracking-wide text-star-dust/40">
                    {spell.family}
                  </span>
                  <button
                    type="button"
                    onClick={() => copy(spell)}
                    aria-label={`Copy ${spell.name}`}
                    className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-star-dust/60 hover:text-star-dust transition-all motion-reduce:transition-none"
                  >
                    {copied === spell.name ? (
                      <Check size={14} className="text-emerald-400" />
                    ) : (
                      <Copy size={14} />
                    )}
                  </button>
                </div>

                <h2 className="text-sm font-semibold text-star-dust mb-3 break-all">
                  {spell.name}
                </h2>

                <div className="rounded-lg bg-white/[0.03] p-4 mb-3 flex items-center justify-center min-h-[64px] overflow-hidden">
                  {spell.wear === 'shadow' && (
                    <span
                      className="block h-10 w-24 rounded-lg bg-deep-space/60"
                      style={{ boxShadow: spell.value }}
                    />
                  )}
                  {spell.wear === 'declarations' &&
                    (declarations ? (
                      <span
                        className="block h-10 w-24 rounded-lg border border-white/10"
                        style={declarations}
                      />
                    ) : (
                      <span className="text-xs text-star-dust/40">
                        Wears a pseudo-element; copy the declarations
                      </span>
                    ))}
                  {spell.wear === 'text-class' && (
                    <span className={cn('text-lg font-bold', spell.name)}>
                      The Sanctuary
                    </span>
                  )}
                  {spell.wear === 'class' && (
                    <span
                      className={cn(
                        'flex h-10 w-24 items-center justify-center rounded-lg text-[10px] text-star-dust/70',
                        spell.name
                      )}
                    >
                      sample
                    </span>
                  )}
                </div>

                <pre className="bg-black/50 rounded-lg p-3 text-[11px] text-star-dust/50 font-mono overflow-x-auto whitespace-pre-wrap break-all">
                  {spell.code}
                </pre>
              </div>
            );
          })}
        </div>

        <p className="mt-10 text-center text-xs text-star-dust/40">
          Every spell above is generated from the COSMIC tokens. Run{' '}
          <code className="text-neurospark">npm run generate</code> in the cosmic
          module to re-emit them.
        </p>
      </div>
    </main>
  );
}
