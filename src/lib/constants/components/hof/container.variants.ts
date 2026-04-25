// src/lib/constants/components/hof/container.variants.ts
// ╔═══════════════════════════════════════════════════════════════════════════╗
// ║                    CONTAINER VARIANTS                                     ║
// ║                    CVA variant definitions for Container                  ║
// ╚═══════════════════════════════════════════════════════════════════════════╝

import { cva } from 'class-variance-authority';
import {
  CONTAINER_BASE_CLASS,
  CONTAINER_CENTERED_CLASS,
  CONTAINER_BORDER_CLASSES,
  CONTAINER_BACKGROUND_CLASSES,
  CONTAINER_ELEVATED_CLASSES,
} from './container.constants';

// ─── Size & Padding Types ───────────────────────────────────────────────────
export const CONTAINER_SIZES = {
  XS: 'xs',
  SM: 'sm',
  MD: 'md',
  LG: 'lg',
  XL: 'xl',
  '2XL': '2xl',
  FULL: 'full',
  FLUID: 'fluid',
} as const;

export const CONTAINER_PADDING_SIZES = {
  NONE: 'none',
  SM: 'sm',
  MD: 'md',
  LG: 'lg',
  XL: 'xl',
} as const;

export type ContainerSize = (typeof CONTAINER_SIZES)[keyof typeof CONTAINER_SIZES];
export type ContainerPadding = (typeof CONTAINER_PADDING_SIZES)[keyof typeof CONTAINER_PADDING_SIZES];

// ─── Container Variants ─────────────────────────────────────────────────────
export const containerVariants = cva(CONTAINER_BASE_CLASS, {
  variants: {
    visual: {
      default: '',
      bordered: CONTAINER_BORDER_CLASSES,
      background: CONTAINER_BACKGROUND_CLASSES,
      elevated: CONTAINER_ELEVATED_CLASSES,
      'background-elevated': [
        CONTAINER_BACKGROUND_CLASSES,
        CONTAINER_ELEVATED_CLASSES,
      ].join(' '),
    },
  },
  defaultVariants: {
    visual: 'default',
  },
});

export type ContainerVisualVariant = NonNullable<
  Parameters<typeof containerVariants>[0]
>['visual'];