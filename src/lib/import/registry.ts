// src/lib/import/registry.ts
import { ENVELOPE } from '@/lib/envelope';
import { reader as bubbles } from './bubbles';
import { reader as echoes } from './echoes';
import { reader as lantern } from './lantern';
import { bind, type BoundReader } from './types';

/** What the envelope says it is, read before anything lands. */
export interface EnvelopeFace {
  app: string;
  appVersion: string;
  exportedAt: string;
  counts: Record<string, number>;
}

const READERS: Record<string, (data: unknown, exportedAt: string) => BoundReader> = {
  [bubbles.app]: (data, exportedAt) => bind(bubbles, data, exportedAt),
  [echoes.app]: (data, exportedAt) => bind(echoes, data, exportedAt),
  [lantern.app]: (data, exportedAt) => bind(lantern, data, exportedAt),
};

/** The apps the Sanctuary reads, and the tables each one lands on. */
export const READS: Record<string, readonly string[]> = {
  [bubbles.app]: bubbles.tables,
  [echoes.app]: echoes.tables,
  [lantern.app]: lantern.tables,
};

/** The apps whose envelope the Sanctuary knows and has no landing table for. */
export const NO_TABLE_YET: Record<string, string> = {
  'resonance-compass': 'Compass carries a music library and mood events tied to tracks. Neither has a landing table on the Sanctuary yet.',
  'resonance-sirens': 'Sirens carries moments and words. Neither has a landing table on the Sanctuary yet.',
  'resonance-sistrum': 'Sistrum carries feelings tied to a work and a take. They have no landing table on the Sanctuary yet.',
  'resonance-hearth': 'Hearth carries members, signals, spoon logs and protocols. They have no landing table on the Sanctuary yet.',
};

/** The envelope's own face, or null when the file is not the family envelope. */
export function face(parsed: unknown): EnvelopeFace | null {
  if (!parsed || typeof parsed !== 'object' || Array.isArray(parsed)) return null;
  const record = parsed as Record<string, unknown>;
  if (record.envelope !== ENVELOPE) return null;
  const app = typeof record.app === 'string' ? record.app.trim() : '';
  if (!app) return null;

  const counts: Record<string, number> = {};
  const carried = record.counts;
  if (carried && typeof carried === 'object' && !Array.isArray(carried)) {
    for (const [key, value] of Object.entries(carried as Record<string, unknown>)) {
      if (typeof value === 'number' && Number.isFinite(value)) counts[key] = value;
    }
  }

  return {
    app,
    appVersion: typeof record.appVersion === 'string' ? record.appVersion : 'unknown',
    exportedAt: typeof record.exportedAt === 'string' ? record.exportedAt : '',
    counts,
  };
}

/** Whether a reader stands for this app. */
export function reads(app: string): boolean {
  return app in READERS;
}

/** The reader for this app with its plan made, or null when none stands. */
export function bindFor(app: string, data: unknown, exportedAt: string): BoundReader | null {
  const make = READERS[app];
  return make ? make(data, exportedAt) : null;
}

/** The plain sentence for an app no reader lands. */
export function whyNoReader(app: string): string {
  return NO_TABLE_YET[app] ?? `The Sanctuary has no reader for ${app} yet.`;
}
