// src/utils/components/seidr/alert.utils.ts
// ╔═══════════════════════════════════════════════════════════════════════════╗
// ║                    ALERT UTILITIES                                        ║
// ║                    Class composers, icon resolution                       ║
// ╚═══════════════════════════════════════════════════════════════════════════╝

import { cn } from '@/lib/utils';
import type { AlertVariant } from '@/lib/constants/components/seidr/alert.variants';
import {
  alertContainerVariants,
  alertIconColorVariants,
} from '@/lib/constants/components/seidr/alert.variants';
import {
  ALERT_PADDING,
  ALERT_GAP,
  ALERT_BORDER_RADIUS,
  ALERT_CONTENT_GAP,
  ALERT_TYPOGRAPHY,
} from '@/lib/constants/components/seidr/alert.constants';

// ═══════════════════════════════════════════════════════════════════════════
// CLASS COMPOSERS
// ═══════════════════════════════════════════════════════════════════════════

/**
 * Composes the full container class string for an alert.
 */
export function composeAlertContainerClasses(params: {
  variant: AlertVariant;
  compact?: boolean;
  className?: string;
}): string {
  return cn(
    alertContainerVariants({ variant: params.variant }),
    ALERT_BORDER_RADIUS,
    params.compact ? ALERT_PADDING.COMPACT : ALERT_PADDING.DEFAULT,
    params.className
  );
}

/**
 * Returns the icon color class for a given variant.
 */
export function getAlertIconColorClass(variant: AlertVariant): string {
  return alertIconColorVariants({ variant });
}

/**
 * Composes title typography classes.
 */
export function composeAlertTitleClasses(params: {
  compact?: boolean;
}): string {
  return cn(
    ALERT_TYPOGRAPHY.WEIGHT,
    'text-white',
    params.compact
      ? ALERT_TYPOGRAPHY.TITLE.COMPACT
      : ALERT_TYPOGRAPHY.TITLE.DEFAULT
  );
}

/**
 * Composes body typography classes.
 */
export function composeAlertBodyClasses(params: {
  hasTitle: boolean;
  compact?: boolean;
}): string {
  return cn(
    'text-white/70',
    params.hasTitle && ALERT_CONTENT_GAP,
    params.compact
      ? ALERT_TYPOGRAPHY.BODY.COMPACT
      : ALERT_TYPOGRAPHY.BODY.DEFAULT
  );
}

/**
 * Returns the flex gap class for the alert layout.
 */
export function getAlertFlexGap(): string {
  return ALERT_GAP;
}