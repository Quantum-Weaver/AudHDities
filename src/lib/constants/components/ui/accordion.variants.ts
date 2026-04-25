// src/lib/constants/components/ui/accordion.variants.ts
// ╔═══════════════════════════════════════════════════════════════════════════╗
// ║                    ACCORDION VARIANTS                                     ║
// ║                    CVA variant definitions for Accordion                  ║
// ╚═══════════════════════════════════════════════════════════════════════════╝

import { cva } from 'class-variance-authority';
import {
  ACCORDION_RADIUS_DEFAULT,
  ACCORDION_RADIUS_SEPARATED,
} from './accordion.constants';

// ─── Type Exports ───────────────────────────────────────────────────────────
export const ACCORDION_TYPES = {
  SINGLE: 'single',
  MULTIPLE: 'multiple',
} as const;

export type AccordionType =
  (typeof ACCORDION_TYPES)[keyof typeof ACCORDION_TYPES];

// ═══════════════════════════════════════════════════════════════════════════
// CONTAINER VARIANTS
// ═══════════════════════════════════════════════════════════════════════════

export const accordionContainerVariants = cva('', {
  variants: {
    variant: {
      default: 'space-y-1',
      bordered: 'border border-white/10 rounded-xl divide-y divide-white/10',
      separated: 'space-y-3',
      minimal: 'space-y-0',
    },
  },
  defaultVariants: {
    variant: 'default',
  },
});

// ═══════════════════════════════════════════════════════════════════════════
// ITEM VARIANTS
// ═══════════════════════════════════════════════════════════════════════════

export const accordionItemVariants = cva('transition-all', {
  variants: {
    variant: {
      default: '',
      bordered: '',
      separated: '',
      minimal: '',
    },
    isExpanded: {
      true: '',
      false: '',
    },
  },
  compoundVariants: [
    // default + expanded
    {
      variant: 'default',
      isExpanded: true,
      className: `bg-white/5 ${ACCORDION_RADIUS_DEFAULT}`,
    },
    // default + collapsed
    {
      variant: 'default',
      isExpanded: false,
      className: ACCORDION_RADIUS_DEFAULT,
    },
    // bordered — no item-level styling (handled by container divide)
    // separated + expanded
    {
      variant: 'separated',
      isExpanded: true,
      className: `bg-white/5 border border-cyan-500/30 ${ACCORDION_RADIUS_SEPARATED} overflow-hidden`,
    },
    // separated + collapsed
    {
      variant: 'separated',
      isExpanded: false,
      className: `bg-white/5 border border-white/10 ${ACCORDION_RADIUS_SEPARATED} overflow-hidden`,
    },
    // minimal — no item-level styling
  ],
  defaultVariants: {
    variant: 'default',
    isExpanded: false,
  },
});

// ═══════════════════════════════════════════════════════════════════════════
// TRIGGER VARIANTS
// ═══════════════════════════════════════════════════════════════════════════

export const accordionTriggerVariants = cva(
  'group w-full flex items-center justify-between gap-2 transition-all',
  {
    variants: {
      variant: {
        default: '',
        bordered: 'p-4',
        separated: 'p-4',
        minimal: 'py-3',
      },
      isExpanded: {
        true: '',
        false: '',
      },
    },
    compoundVariants: [
      // default trigger
      {
        variant: 'default',
        isExpanded: false,
        className: 'hover:text-cyan-400',
      },
      {
        variant: 'default',
        isExpanded: true,
        className: 'text-cyan-400',
      },
      // bordered trigger
      {
        variant: 'bordered',
        isExpanded: false,
        className: 'hover:bg-white/5',
      },
      {
        variant: 'bordered',
        isExpanded: true,
        className: 'bg-white/5 text-cyan-400',
      },
      // separated trigger
      {
        variant: 'separated',
        isExpanded: false,
        className: 'hover:bg-white/5',
      },
      {
        variant: 'separated',
        isExpanded: true,
        className: 'bg-white/10 text-cyan-400',
      },
      // minimal trigger
      {
        variant: 'minimal',
        isExpanded: false,
        className: 'hover:text-cyan-400',
      },
      {
        variant: 'minimal',
        isExpanded: true,
        className: 'text-cyan-400',
      },
    ],
    defaultVariants: {
      variant: 'default',
      isExpanded: false,
    },
  }
);

// ═══════════════════════════════════════════════════════════════════════════
// CONTENT VARIANTS
// ═══════════════════════════════════════════════════════════════════════════

export const accordionContentVariants = cva(
  'overflow-hidden transition-all duration-200 ease-in-out',
  {
    variants: {
      variant: {
        default: 'px-4 pb-4 pt-0',
        bordered: 'px-4 pb-4',
        separated: 'px-4 pb-4',
        minimal: 'px-3 pb-3 pt-0',
      },
      isAnimating: {
        true: 'max-h-[1000px] opacity-100',
        false: 'max-h-0 opacity-0',
      },
    },
    defaultVariants: {
      variant: 'default',
      isAnimating: false,
    },
  }
);

// ═══════════════════════════════════════════════════════════════════════════
// TYPE EXPORTS
// ═══════════════════════════════════════════════════════════════════════════

export type AccordionVariant = NonNullable<
  Parameters<typeof accordionContainerVariants>[0]
>['variant'];

export type AccordionTriggerVariant = NonNullable<
  Parameters<typeof accordionTriggerVariants>[0]
>['variant'];