// src/lib/constants/components/shared/error_boundary.variants.ts
// ╔═══════════════════════════════════════════════════════════════════════════╗
// ║                    ERROR BOUNDARY VARIANTS                                ║
// ║                    CVA variant definitions for ErrorBoundary              ║
// ╚═══════════════════════════════════════════════════════════════════════════╝

import { cva } from 'class-variance-authority';
import {
  QUANTUM_COLORS,
} from '@/lib/constants/cosmic';
import type { ErrorBoundaryVariant } from './error_boundary.constants';
import {
  BUTTON_VARIANTS_KEYS,
  type ButtonVariantKey,
} from '@/lib/constants/components/ui/button.constants';

// ═══════════════════════════════════════════════════════════════════════════
// DERIVED STYLE MAPS (from COSMIC source — edit there, flows here)
// ═══════════════════════════════════════════════════════════════════════════

// ─── Container ─────────────────────────────────────────────────────────────
const CONTAINER_BG: Record<ErrorBoundaryVariant, string> = {
  graceful_degradation: `bg-[${QUANTUM_COLORS.surface}]`,
  recovery_assistance: `bg-[${QUANTUM_COLORS.deepSpace}]`,
  user_guidance: `bg-[${QUANTUM_COLORS.surface}]`,
  system_reporting: `bg-gradient-to-br from-[${QUANTUM_COLORS['void.base']}] to-[${QUANTUM_COLORS['void.dark']}]`,
};

const CONTAINER_BORDER: Record<ErrorBoundaryVariant, string> = {
  graceful_degradation: `border-2 border-[${QUANTUM_COLORS['hearth.gold']}]`,
  recovery_assistance: `border-[3px] border-[${QUANTUM_COLORS['fire.base']}]`,
  user_guidance: `border-2 border-[${QUANTUM_COLORS.info}]`,
  system_reporting: `border border-[${QUANTUM_COLORS['void.base']}]`,
};

const CONTAINER_SHADOW: Record<ErrorBoundaryVariant, string> = {
  graceful_degradation: 'shadow-lg',
  recovery_assistance: 'shadow-xl',
  user_guidance: 'shadow-md',
  system_reporting: 'shadow-sm',
};

const CONTAINER_RADIUS: Record<ErrorBoundaryVariant, string> = {
  graceful_degradation: 'rounded-lg',
  recovery_assistance: 'rounded-xl',
  user_guidance: 'rounded-md',
  system_reporting: 'rounded-sm',
};

const CONTAINER_PADDING: Record<ErrorBoundaryVariant, string> = {
  graceful_degradation: 'p-8',
  recovery_assistance: 'p-10',
  user_guidance: 'p-6',
  system_reporting: 'p-4',
};

const CONTAINER_MAX_WIDTH: Record<ErrorBoundaryVariant, string> = {
  graceful_degradation: 'max-w-lg',
  recovery_assistance: 'max-w-md',
  user_guidance: 'max-w-sm',
  system_reporting: 'max-w-full',
};

const CONTAINER_GAP: Record<ErrorBoundaryVariant, string> = {
  graceful_degradation: 'gap-6',
  recovery_assistance: 'gap-8',
  user_guidance: 'gap-4',
  system_reporting: 'gap-3',
};

// ─── Icon ──────────────────────────────────────────────────────────────────
const ICON_SIZE: Record<ErrorBoundaryVariant, string> = {
  graceful_degradation: 'text-6xl',
  recovery_assistance: 'text-7xl',
  user_guidance: 'text-5xl',
  system_reporting: 'text-4xl',
};

const ICON_GAP: Record<ErrorBoundaryVariant, string> = {
  graceful_degradation: 'mb-4',
  recovery_assistance: 'mb-6',
  user_guidance: 'mb-3',
  system_reporting: 'mb-2',
};

// ─── Title ─────────────────────────────────────────────────────────────────
const TITLE_COLOR: Record<ErrorBoundaryVariant, string> = {
  graceful_degradation: `text-[${QUANTUM_COLORS['hearth.gold']}]`,
  recovery_assistance: `text-[${QUANTUM_COLORS['fire.base']}]`,
  user_guidance: `text-[${QUANTUM_COLORS.info}]`,
  system_reporting: `text-[${QUANTUM_COLORS.starDust}]`,
};

const TITLE_SIZE: Record<ErrorBoundaryVariant, string> = {
  graceful_degradation: 'text-lg',
  recovery_assistance: 'text-xl',
  user_guidance: 'text-base',
  system_reporting: 'text-sm',
};

const TITLE_WEIGHT: Record<ErrorBoundaryVariant, string> = {
  graceful_degradation: 'font-medium',
  recovery_assistance: 'font-bold',
  user_guidance: 'font-normal',
  system_reporting: 'font-medium',
};

const TITLE_GAP: Record<ErrorBoundaryVariant, string> = {
  graceful_degradation: 'mb-2',
  recovery_assistance: 'mb-3',
  user_guidance: 'mb-2',
  system_reporting: 'mb-1',
};

// ─── Message ───────────────────────────────────────────────────────────────
const MESSAGE_COLOR: Record<ErrorBoundaryVariant, string> = {
  graceful_degradation: 'text-white/60',
  recovery_assistance: 'text-white/70',
  user_guidance: 'text-white/50',
  system_reporting: `text-[${QUANTUM_COLORS['void.light']}]`,
};

const MESSAGE_SIZE: Record<ErrorBoundaryVariant, string> = {
  graceful_degradation: 'text-base',
  recovery_assistance: 'text-base',
  user_guidance: 'text-sm',
  system_reporting: 'text-xs',
};

const MESSAGE_FONT: Record<ErrorBoundaryVariant, string> = {
  graceful_degradation: 'font-sans',
  recovery_assistance: 'font-sans',
  user_guidance: 'font-sans',
  system_reporting: 'font-mono',
};

const MESSAGE_GAP: Record<ErrorBoundaryVariant, string> = {
  graceful_degradation: 'mb-4',
  recovery_assistance: 'mb-6',
  user_guidance: 'mb-3',
  system_reporting: 'mb-2',
};

// ─── Action Button Variant Map ─────────────────────────────────────────────
/**
 * Maps each ErrorBoundary variant to a Button variant.
 * Uses ButtonVariantKey (the literal string union from button.constants)
 * so the Button component accepts it without type casting.
 */
export const ERROR_BOUNDARY_ACTION_VARIANT_MAP: Record<ErrorBoundaryVariant, ButtonVariantKey> = {
  graceful_degradation: BUTTON_VARIANTS_KEYS.PRIMARY,
  recovery_assistance: BUTTON_VARIANTS_KEYS.DESTRUCTIVE,
  user_guidance: BUTTON_VARIANTS_KEYS.OUTLINE,
  system_reporting: BUTTON_VARIANTS_KEYS.GHOST,
};

// ═══════════════════════════════════════════════════════════════════════════
// CVA VARIANTS
// ═══════════════════════════════════════════════════════════════════════════

export const errorBoundaryContainerVariants = cva('text-center', {
  variants: {
    variant: {
      graceful_degradation: [
        CONTAINER_BG.graceful_degradation,
        CONTAINER_BORDER.graceful_degradation,
        CONTAINER_SHADOW.graceful_degradation,
        CONTAINER_RADIUS.graceful_degradation,
        CONTAINER_PADDING.graceful_degradation,
        CONTAINER_MAX_WIDTH.graceful_degradation,
        CONTAINER_GAP.graceful_degradation,
      ].join(' '),
      recovery_assistance: [
        CONTAINER_BG.recovery_assistance,
        CONTAINER_BORDER.recovery_assistance,
        CONTAINER_SHADOW.recovery_assistance,
        CONTAINER_RADIUS.recovery_assistance,
        CONTAINER_PADDING.recovery_assistance,
        CONTAINER_MAX_WIDTH.recovery_assistance,
        CONTAINER_GAP.recovery_assistance,
      ].join(' '),
      user_guidance: [
        CONTAINER_BG.user_guidance,
        CONTAINER_BORDER.user_guidance,
        CONTAINER_SHADOW.user_guidance,
        CONTAINER_RADIUS.user_guidance,
        CONTAINER_PADDING.user_guidance,
        CONTAINER_MAX_WIDTH.user_guidance,
        CONTAINER_GAP.user_guidance,
      ].join(' '),
      system_reporting: [
        CONTAINER_BG.system_reporting,
        CONTAINER_BORDER.system_reporting,
        CONTAINER_SHADOW.system_reporting,
        CONTAINER_RADIUS.system_reporting,
        CONTAINER_PADDING.system_reporting,
        CONTAINER_MAX_WIDTH.system_reporting,
        CONTAINER_GAP.system_reporting,
      ].join(' '),
    },
  },
  defaultVariants: {
    variant: 'graceful_degradation',
  },
});

export const errorBoundaryIconVariants = cva('mx-auto', {
  variants: {
    variant: {
      graceful_degradation: [
        ICON_SIZE.graceful_degradation,
        ICON_GAP.graceful_degradation,
      ].join(' '),
      recovery_assistance: [
        ICON_SIZE.recovery_assistance,
        ICON_GAP.recovery_assistance,
      ].join(' '),
      user_guidance: [
        ICON_SIZE.user_guidance,
        ICON_GAP.user_guidance,
      ].join(' '),
      system_reporting: [
        ICON_SIZE.system_reporting,
        ICON_GAP.system_reporting,
      ].join(' '),
    },
  },
  defaultVariants: {
    variant: 'graceful_degradation',
  },
});

export const errorBoundaryTitleVariants = cva('font-bold', {
  variants: {
    variant: {
      graceful_degradation: [
        TITLE_COLOR.graceful_degradation,
        TITLE_SIZE.graceful_degradation,
        TITLE_WEIGHT.graceful_degradation,
        TITLE_GAP.graceful_degradation,
      ].join(' '),
      recovery_assistance: [
        TITLE_COLOR.recovery_assistance,
        TITLE_SIZE.recovery_assistance,
        TITLE_WEIGHT.recovery_assistance,
        TITLE_GAP.recovery_assistance,
      ].join(' '),
      user_guidance: [
        TITLE_COLOR.user_guidance,
        TITLE_SIZE.user_guidance,
        TITLE_WEIGHT.user_guidance,
        TITLE_GAP.user_guidance,
      ].join(' '),
      system_reporting: [
        TITLE_COLOR.system_reporting,
        TITLE_SIZE.system_reporting,
        TITLE_WEIGHT.system_reporting,
        TITLE_GAP.system_reporting,
      ].join(' '),
    },
  },
  defaultVariants: {
    variant: 'graceful_degradation',
  },
});

export const errorBoundaryMessageVariants = cva('mx-auto', {
  variants: {
    variant: {
      graceful_degradation: [
        MESSAGE_COLOR.graceful_degradation,
        MESSAGE_SIZE.graceful_degradation,
        MESSAGE_FONT.graceful_degradation,
        MESSAGE_GAP.graceful_degradation,
      ].join(' '),
      recovery_assistance: [
        MESSAGE_COLOR.recovery_assistance,
        MESSAGE_SIZE.recovery_assistance,
        MESSAGE_FONT.recovery_assistance,
        MESSAGE_GAP.recovery_assistance,
      ].join(' '),
      user_guidance: [
        MESSAGE_COLOR.user_guidance,
        MESSAGE_SIZE.user_guidance,
        MESSAGE_FONT.user_guidance,
        MESSAGE_GAP.user_guidance,
      ].join(' '),
      system_reporting: [
        MESSAGE_COLOR.system_reporting,
        MESSAGE_SIZE.system_reporting,
        MESSAGE_FONT.system_reporting,
        MESSAGE_GAP.system_reporting,
      ].join(' '),
    },
  },
  defaultVariants: {
    variant: 'graceful_degradation',
  },
});

/** Severity level per variant — available for consumers that need severity context */
export const ERROR_BOUNDARY_SEVERITY_MAP: Record<ErrorBoundaryVariant, string> = {
  graceful_degradation: 'low',
  recovery_assistance: 'medium',
  user_guidance: 'informational',
  system_reporting: 'critical',
};