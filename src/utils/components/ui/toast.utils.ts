// src/utils/components/ui/toast.utils.ts
// ╔═══════════════════════════════════════════════════════════════════════════╗
// ║                    TOAST UTILITIES                                        ║
// ║                    Animation composers, icon mapping, position helpers    ║
// ╚═══════════════════════════════════════════════════════════════════════════╝

import type { ReactNode } from 'react';
import {
  AlertCircle,
  CheckCircle,
  Info,
  XCircle,
  Sparkles,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import type {
  ToastVariant,
  ToastPosition,
  ToastIconMap,
} from '@/types/components/ui/toast.types';
import {
  TOAST_VARIANTS,
  toastContentVariants,
  toastIconColorVariants,
  toastPositionVariants,
  getToastContainerDirection,
} from '@/lib/constants/components/seidr/toast.variants';
import {
  TOAST_BASE_CLASSES,
  TOAST_CONTAINER_BASE_CLASSES,
  TOAST_ICON_SIZE,
  TOAST_DURATION_BY_VARIANT,
  TOAST_CLOSE_ANIMATION_DURATION,
} from '@/lib/constants/components/seidr/toast.constants';

// ─── Icon Mapping ──────────────────────────────────────────────────────────
/** Maps each toast variant to its default Lucide icon component */
export const TOAST_ICONS: ToastIconMap = {
  [TOAST_VARIANTS.INFO]: Info,
  [TOAST_VARIANTS.SUCCESS]: CheckCircle,
  [TOAST_VARIANTS.WARNING]: AlertCircle,
  [TOAST_VARIANTS.ERROR]: XCircle,
  [TOAST_VARIANTS.QUANTUM]: Sparkles,
};


// ─── Class Composition ─────────────────────────────────────────────────────

export function composeToastItemClasses(params: {
  variant: ToastVariant;
  isLeaving: boolean;
  className?: string;
}): string {
  return cn(
    ...TOAST_BASE_CLASSES,
    toastContentVariants({ variant: params.variant }),
    params.isLeaving
      ? 'opacity-0 translate-x-2'
      : 'opacity-100 translate-x-0',
    'animate-in slide-in-from-right-5 fade-in',
    `duration-${TOAST_CLOSE_ANIMATION_DURATION}`,
    params.className
  );
}

export function composeToastIconClasses(variant: ToastVariant): string {
  return cn('flex-shrink-0', toastIconColorVariants({ variant }));
}

export function composeToasterContainerClasses(
  position: ToastPosition
): string {
  return cn(
    ...TOAST_CONTAINER_BASE_CLASSES,
    toastPositionVariants({ position }),
    getToastContainerDirection(position)
  );
}

// ─── Duration Resolution ───────────────────────────────────────────────────

export function resolveToastDuration(
  variant: ToastVariant,
  explicitDuration?: number
): number {
  if (explicitDuration !== undefined) return explicitDuration;
  return TOAST_DURATION_BY_VARIANT[variant] ?? TOAST_DURATION_BY_VARIANT.info;
}

// ─── ID Generation ─────────────────────────────────────────────────────────

export function generateToastId(): string {
  return Math.random().toString(36).slice(2, 11);
}