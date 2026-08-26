// src/components/asgard/domains/athena/bubbles/starPaint.ts
// ╔═══════════════════════════════════════════════════════════════════════════╗
// ║   HOW A STAR IS PAINTED — the orb, its stripes, and its ring             ║
// ╚═══════════════════════════════════════════════════════════════════════════╝

import { QUANTUM_COLORS } from '@/lib/constants/cosmic/colors';

const TOKENS = QUANTUM_COLORS as Record<string, string>;

/** One palette entry → a real colour, or the fallback if it names nothing. */
export function resolveColour(entry: string, fallback: string): string {
  const key = (entry || '').trim();
  if (!key) return fallback;
  if (key.startsWith('#')) return key;
  return TOKENS[key] ?? fallback;
}

/**
 * The colour columns as they arrive off the wire.
 *
 * They are read defensively and treated as NULLABLE ON PURPOSE: the
 * generated row types are GAIA's output and do not know these columns until
 * 025 has run and `gaia_sync` has been called, so nothing here may assume
 * they exist. The cast is the honest shape, not a shortcut.
 */
export interface StarColours {
  palette?: string[] | null;
  ring?: string | null;
}

export function readStarColours(row: unknown): StarColours {
  const r = (row ?? {}) as Record<string, unknown>;
  const palette = Array.isArray(r.palette)
    ? r.palette.filter((e): e is string => typeof e === 'string')
    : null;
  const ring = typeof r.ring === 'string' && r.ring ? r.ring : null;
  return { palette: palette && palette.length ? palette : null, ring };
}

export interface Painted {
  background: string;
  boxShadow: string;
}

/**
 * The orb. With no palette it is the room's own radial gradient, unchanged.
 * With one it is that flag's stripes, held inside the circle, under the same
 * highlight so it still reads as an orb rather than a badge.
 */
export function paintStar(
  fill: { color: string; glow: string },
  colours: StarColours,
  size = 64,
): Painted {
  const glowRing = `0 0 ${Math.round(size / 4)}px ${fill.glow}`;
  const inner = colours.ring
    ? `, inset 0 0 0 ${Math.max(3, Math.round(size / 12))}px ${resolveColour(colours.ring, fill.color)}`
    : '';

  if (!colours.palette || colours.palette.length === 0) {
    return {
      background: `radial-gradient(circle at 30% 30%, ${fill.glow}, ${fill.color})`,
      boxShadow: `${glowRing}${inner}`,
    };
  }

  const stops: string[] = [];
  const n = colours.palette.length;
  colours.palette.forEach((entry, i) => {
    const c = resolveColour(entry, fill.color);
    const from = ((i / n) * 100).toFixed(3);
    const to = (((i + 1) / n) * 100).toFixed(3);
    stops.push(`${c} ${from}%`, `${c} ${to}%`);
  });

  return {
    background:
      `radial-gradient(circle at 30% 30%, rgba(255,255,255,0.35), rgba(255,255,255,0) 58%), ` +
      `linear-gradient(to bottom, ${stops.join(', ')})`,
    boxShadow: `${glowRing}${inner}`,
  };
}

/** A collection's accent, resolved the same way — null when the row is silent. */
export function readAccent(row: unknown): string | null {
  const r = (row ?? {}) as Record<string, unknown>;
  if (typeof r.accent === 'string' && r.accent) {
    return resolveColour(r.accent, '#E0E0E0');
  }
  const palette = Array.isArray(r.palette)
    ? r.palette.filter((e): e is string => typeof e === 'string')
    : [];
  if (palette.length) return resolveColour(palette[0], '#E0E0E0');
  return null;
}

/** A collection's own palette, for the rule under its banner. */
export function readCollectionPalette(row: unknown): string[] | null {
  const r = (row ?? {}) as Record<string, unknown>;
  const palette = Array.isArray(r.palette)
    ? r.palette.filter((e): e is string => typeof e === 'string')
    : [];
  if (!palette.length) return null;
  return palette.map((e) => resolveColour(e, '#E0E0E0'));
}
