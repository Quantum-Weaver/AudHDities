// src/lib/constants/components/forging/select.variants.ts
// ╔═══════════════════════════════════════════════════════════════════════════╗
// ║                    SELECT VARIANTS                                        ║
// ║                    CVA variant definitions                                ║
// ╚═══════════════════════════════════════════════════════════════════════════╝

import { cva } from 'class-variance-authority';
import {
  SELECT_BORDER_DEFAULT,
  SELECT_BORDER_FOCUS,
  SELECT_RING_FOCUS,
  SELECT_BORDER_ERROR,
  SELECT_BORDER_SUCCESS,
  SELECT_BG_DEFAULT,
  SELECT_BG_FILLED,
  SELECT_TEXT_COLOR,
  SELECT_BORDER_RADIUS,
  SELECT_TRANSITION,
  SELECT_DISABLED,
  SELECT_CHEVRON_DATA_URI,
  SELECT_CHEVRON_POSITION,
  SELECT_SIZE,
} from './select.constants';

// ─── Select Trigger Variants ───────────────────────────────────────────────
export const selectVariants = cva(
  [
    'w-full',
    SELECT_BORDER_RADIUS,
    'border',
    SELECT_BG_DEFAULT,
    'py-2',
    SELECT_TEXT_COLOR,
    SELECT_TRANSITION,
    'outline-none',
    'cursor-pointer',
    SELECT_DISABLED,
  ].join(' '),
  {
    variants: {
      variant: {
        default: [
          SELECT_BORDER_DEFAULT,
          SELECT_BORDER_FOCUS,
          SELECT_RING_FOCUS,
        ].join(' '),
        error: SELECT_BORDER_ERROR,
        success: SELECT_BORDER_SUCCESS,
        filled: [
          SELECT_BG_FILLED,
          SELECT_BORDER_DEFAULT,
          SELECT_BORDER_FOCUS,
          SELECT_RING_FOCUS,
        ].join(' '),
      },
      size: {
        sm: [
          SELECT_SIZE.sm.height,
          SELECT_SIZE.sm.paddingX,
          SELECT_SIZE.sm.fontSize,
        ].join(' '),
        md: [
          SELECT_SIZE.md.height,
          SELECT_SIZE.md.paddingX,
          SELECT_SIZE.md.fontSize,
        ].join(' '),
        lg: [
          SELECT_SIZE.lg.height,
          SELECT_SIZE.lg.paddingX,
          SELECT_SIZE.lg.fontSize,
        ].join(' '),
      },
      native: {
        true: 'appearance-auto',
        false: [
          'appearance-none',
          SELECT_CHEVRON_DATA_URI,
          SELECT_CHEVRON_POSITION,
        ].join(' '),
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'md',
      native: false,
    },
  }
);

export type SelectVariant = NonNullable<
  Parameters<typeof selectVariants>[0]
>['variant'];

export type SelectSizeVariant = NonNullable<
  Parameters<typeof selectVariants>[0]
>['size'];