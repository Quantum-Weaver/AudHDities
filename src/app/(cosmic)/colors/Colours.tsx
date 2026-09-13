// src/app/(cosmic)/colors/Colours.tsx
'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Palette, Copy, Check } from 'lucide-react';
import {
  QUANTUM_COLORS,
  COUNCIL_COLORS,
  STATUS_COLORS,
  MOOD_COLORS,
  ENERGY_COLORS,
  PRIDE_COLORS,
  DOMAIN_COLORS,
} from '@/lib/constants/cosmic/colors';
import { GRADIENTS } from '@/lib/constants/cosmic/effects';

const REGISTERS: readonly { name: string; entries: Record<string, string> }[] = [
  { name: 'The palette', entries: QUANTUM_COLORS },
  { name: 'The Council', entries: COUNCIL_COLORS },
  { name: 'Status', entries: STATUS_COLORS },
  { name: 'Mood', entries: MOOD_COLORS },
  { name: 'Energy', entries: ENERGY_COLORS },
  { name: 'Pride', entries: PRIDE_COLORS },
];

const REGISTER_COUNT = REGISTERS.length;

const REGISTER_ENTRIES = REGISTERS.reduce(
  (n, r) => n + Object.keys(r.entries).length,
  0
);

const DOMAIN_COUNT = Object.keys(DOMAIN_COLORS).length;

const DOMAIN_SHADES = Object.values(DOMAIN_COLORS).reduce(
  (n, shades) => n + Object.keys(shades).length,
  0
);

const GRADIENT_COUNT = Object.keys(GRADIENTS).length;

export function Colours() {
  const [copied, setCopied] = useState<string | null>(null);

  const copy = (key: string, value: string) => {
    navigator.clipboard.writeText(value);
    setCopied(key);
    setTimeout(() => setCopied(null), 2000);
  };

  const swatch = (key: string, value: string, scope: string) => {
    const id = `${scope}:${key}`;
    return (
      <button
        key={id}
        type="button"
        onClick={() => copy(id, value)}
        title={value}
        className="group flex items-center gap-3 rounded-lg border border-white/10 bg-white/5 p-2.5 text-left transition-colors motion-reduce:transition-none hover:border-white/25"
      >
        <span
          aria-hidden="true"
          className="h-9 w-9 shrink-0 rounded-md border border-white/10"
          style={{ background: value }}
        />
        <span className="min-w-0">
          <span className="block truncate text-xs text-star-dust">{key}</span>
          <span className="block truncate font-mono text-[10px] text-star-dust/40">
            {copied === id ? 'copied' : value}
          </span>
        </span>
        <span className="ml-auto shrink-0 text-star-dust/30 group-hover:text-star-dust/60">
          {copied === id ? <Check size={12} /> : <Copy size={12} />}
        </span>
      </button>
    );
  };

  return (
    <main className="min-h-screen py-12">
      <div className="container max-w-6xl mx-auto px-6">

        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 bg-neurospark/10 px-4 py-2 rounded-full mb-4">
            <Palette size={14} className="text-neurospark" />
            <span className="text-neurospark text-sm">The Colours</span>
          </div>
          <h1 className="text-3xl font-bold text-star-dust mb-4">
            The still material
          </h1>
          <p className="text-lg text-star-dust/60 max-w-2xl mx-auto">
            {REGISTER_ENTRIES} named colours across {REGISTER_COUNT} registers,
            {' '}{DOMAIN_SHADES} shades across {DOMAIN_COUNT} domains, and{' '}
            {GRADIENT_COUNT} gradients, read straight from the cosmic tokens.
            Click a swatch to copy its value.
          </p>
          <p className="mt-3 text-xs text-star-dust/40">
            The spells that move are at{' '}
            <Link href="/effects" className="text-neurospark hover:underline">
              the Grimoire
            </Link>{' '}
            and{' '}
            <Link href="/theater" className="text-neurospark hover:underline">
              the Theater
            </Link>
            .
          </p>
        </div>

        {REGISTERS.map((register) => (
          <section key={register.name} className="mb-10">
            <h2 className="mb-3 text-sm font-medium text-star-dust/60">
              {register.name}{' '}
              <span className="text-star-dust/30">
                {Object.keys(register.entries).length}
              </span>
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2">
              {Object.entries(register.entries).map(([key, value]) =>
                swatch(key, value, register.name)
              )}
            </div>
          </section>
        ))}

        <section className="mb-10">
          <h2 className="mb-3 text-sm font-medium text-star-dust/60">
            Domains{' '}
            <span className="text-star-dust/30">
              {Object.keys(DOMAIN_COLORS).length}
            </span>
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {Object.entries(DOMAIN_COLORS).map(([domain, shades]) => (
              <div
                key={domain}
                className="rounded-lg border border-white/10 bg-white/5 p-3"
              >
                <p className="mb-2 text-xs text-star-dust">{domain}</p>
                <div className="grid grid-cols-1 gap-2">
                  {Object.entries(shades).map(([shade, value]) =>
                    swatch(`${domain}.${shade}`, value, 'Domains')
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="mb-10">
          <h2 className="mb-3 text-sm font-medium text-star-dust/60">
            Gradients <span className="text-star-dust/30">{GRADIENT_COUNT}</span>
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {Object.entries(GRADIENTS).map(([key, value]) => (
              <button
                key={key}
                type="button"
                onClick={() => copy(`gradient:${key}`, value)}
                className="group overflow-hidden rounded-lg border border-white/10 bg-white/5 text-left transition-colors motion-reduce:transition-none hover:border-white/25"
              >
                <span
                  aria-hidden="true"
                  className="block h-16 w-full"
                  style={{ backgroundImage: value }}
                />
                <span className="flex items-center gap-2 p-3">
                  <span className="min-w-0">
                    <span className="block truncate text-xs text-star-dust">
                      {key}
                    </span>
                    <span className="block truncate font-mono text-[10px] text-star-dust/40">
                      {copied === `gradient:${key}` ? 'copied' : value}
                    </span>
                  </span>
                  <span className="ml-auto shrink-0 text-star-dust/30 group-hover:text-star-dust/60">
                    {copied === `gradient:${key}` ? (
                      <Check size={12} />
                    ) : (
                      <Copy size={12} />
                    )}
                  </span>
                </span>
              </button>
            ))}
          </div>
        </section>

        <p className="text-center text-xs text-star-dust/40">
          One definition, in the cosmic module. Run{' '}
          <code className="text-neurospark">npm run generate</code> there to re-emit
          the mirrors this page reads.
        </p>
      </div>
    </main>
  );
}
