// src/lib/constants/components/ui/spinner.constants.ts
// ╔═══════════════════════════════════════════════════════════════════════════╗
// ║                  SPINNER CONSTANTS                                        ║
// ║                  Single source of truth — sizing, delays, class fragments ║
// ╚═══════════════════════════════════════════════════════════════════════════╝

import { SPACING_SCALE } from '@/lib/constants/cosmic/dimensions';
import { durations } from '@/lib/constants/cosmic/motion';

// ─── Size tokens (maps component size → Tailwind dimension classes) ────────
export const SPINNER_SIZES = {
  XS: 'xs',
  SM: 'sm',
  MD: 'md',
  LG: 'lg',
  XL: 'xl',
} as const;

export type SpinnerSize = (typeof SPINNER_SIZES)[keyof typeof SPINNER_SIZES];

// ─── Type tokens ───────────────────────────────────────────────────────────
export const SPINNER_TYPES = {
  CIRCLE: 'circle',
  DOTS: 'dots',
  PULSE: 'pulse',
  WAVE: 'wave',
} as const;

export type SpinnerType = (typeof SPINNER_TYPES)[keyof typeof SPINNER_TYPES];

// ─── Speed tokens ──────────────────────────────────────────────────────────
export const SPINNER_SPEEDS = {
  SLOW: 'slow',
  NORMAL: 'normal',
  FAST: 'fast',
} as const;

export type SpinnerSpeed = (typeof SPINNER_SPEEDS)[keyof typeof SPINNER_SPEEDS];

// ─── Dot/bar counts per type ───────────────────────────────────────────────
export const SPINNER_ELEMENT_COUNT: Record<SpinnerType, number> = {
  circle: 1,
  dots: 3,
  pulse: 1,
  wave: 4,
} as const;

// ─── Stagger delays (seconds) per type ─────────────────────────────────────
export const SPINNER_STAGGER_DELAYS: Record<SpinnerType, number> = {
  circle: 0,
  dots: 0.15,
  pulse: 0,
  wave: 0.1,
} as const;

// ─── Overlay classes (referencing COSMIC colors) ───────────────────────────
// Using deep-space for overlay background with opacity
export const SPINNER_OVERLAY_CLASSES = {
  OVERLAY: 'absolute inset-0 flex items-center justify-center bg-deep-space/20 backdrop-blur-[1px] z-10',
  FULL_PAGE: 'fixed inset-0 bg-deep-space/50 backdrop-blur-sm z-50 flex items-center justify-center',
} as const;

// ─── Container base classes ────────────────────────────────────────────────
export const SPINNER_CONTAINER_BASE = 'inline-flex items-center justify-center' as const;

// ─── Screen reader class ───────────────────────────────────────────────────
export const SPINNER_SR_ONLY = 'sr-only' as const;

// ─── Role attribute ────────────────────────────────────────────────────────
export const SPINNER_ROLE = 'status' as const;

// ─── Default label ─────────────────────────────────────────────────────────
export const SPINNER_DEFAULT_LABEL = 'Loading...' as const;

// ─── Animation speed → Tailwind animation class mapping ────────────────────
// These reference the TAILWIND_ANIMATIONS from motion.ts via generated config
export const SPINNER_ANIMATION_CLASSES: Record<
  SpinnerSpeed,
  Record<SpinnerType, string>
> = {
  slow: {
    circle: 'animate-spin-slow',
    dots: 'animate-bounce-slow',
    pulse: 'animate-pulse-slow',
    wave: 'animate-wave-slow',
  },
  normal: {
    circle: 'animate-spin',
    dots: 'animate-bounce',
    pulse: 'animate-pulse',
    wave: 'animate-wave',
  },
  fast: {
    circle: 'animate-spin-fast',
    dots: 'animate-bounce-fast',
    pulse: 'animate-pulse-fast',
    wave: 'animate-wave-fast',
  },
} as const;