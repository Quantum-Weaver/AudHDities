// src/lib/constants/components/asgard/relief.variants.ts
// A panel in relief: rounded, rimmed, and floating on a cast shadow, with a
// gloss layer that carries the bevel. Light up-left, shadow down-right, the
// house's one light (cosmic positioning LIGHT_VECTOR).
import { cva } from 'class-variance-authority';

// The panel itself: place it on a `relative overflow-hidden` container.
export const reliefPanelVariants = cva(
  [
    'relative overflow-hidden',
    'rounded-2xl ring-1 ring-white/10',
    'shadow-[0_24px_48px_-12px_rgba(0,0,0,0.75),0_48px_96px_-24px_rgba(12,15,29,0.9)]',
  ].join(' ')
);

// The gloss and cut edge: an absolute layer above any background and orbs,
// below the content (which stands at z-10).
export const reliefGlossVariants = cva(
  [
    'absolute inset-0 pointer-events-none rounded-2xl',
    'bg-[radial-gradient(ellipse_at_top_left,rgba(255,255,255,0.16),transparent_55%),linear-gradient(to_bottom,rgba(255,255,255,0.06),transparent_35%)]',
    'shadow-[inset_1px_1px_0_rgba(255,255,255,0.14),inset_3px_3px_8px_rgba(255,255,255,0.05),inset_-1px_-1px_0_rgba(0,0,0,0.65),inset_-4px_-4px_10px_rgba(0,0,0,0.35)]',
  ].join(' ')
);
