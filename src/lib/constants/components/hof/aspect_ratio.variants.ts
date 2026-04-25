// src/lib/constants/components/hof/aspect_ratio.variants.ts
// ╔═══════════════════════════════════════════════════════════════════════════╗
// ║                    ASPECT RATIO VARIANTS                                  ║
// ║                    CVA variant definitions for AspectRatio                ║
// ╚═══════════════════════════════════════════════════════════════════════════╝

import { cva } from 'class-variance-authority';
import {
  ASPECT_RATIO_CONTAINER_BASE,
  ASPECT_RATIO_INNER_BASE,
  ASPECT_RATIO_BORDER_CLASS,
  ASPECT_RATIO_TRANSITION,
} from './aspect_ratio.constants';

// ─── Container Variants ─────────────────────────────────────────────────────
export const aspectRatioContainerVariants = cva(
  [...ASPECT_RATIO_CONTAINER_BASE].join(' '),
  {
    variants: {
      rounded: {
        none: '',
        sm: 'rounded-md',
        md: 'rounded-lg',
        lg: 'rounded-xl',
        xl: 'rounded-2xl',
        full: 'rounded-full',
      },
      bordered: {
        true: ASPECT_RATIO_BORDER_CLASS,
        false: '',
      },
      glow: {
        true: [
          ASPECT_RATIO_TRANSITION,
          'hover:shadow-lg',
          'hover:shadow-cyan-500/20',
          'hover:scale-[1.02]',
        ].join(' '),
        false: '',
      },
    },
    defaultVariants: {
      rounded: 'none',
      bordered: false,
      glow: false,
    },
  }
);

// ─── Inner Content Variants ─────────────────────────────────────────────────
export const aspectRatioInnerVariants = cva(
  [...ASPECT_RATIO_INNER_BASE].join(' '),
  {
    variants: {
      centered: {
        true: 'flex items-center justify-center',
        false: '',
      },
    },
    defaultVariants: {
      centered: true,
    },
  }
);

export type AspectRatioContainerVariant = NonNullable<
  Parameters<typeof aspectRatioContainerVariants>[0]
>;