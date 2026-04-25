// src/types/components/ui/alert.types.ts
// ╔═══════════════════════════════════════════════════════════════════════════╗
// ║                    ALERT TYPES                                            ║
// ║                    All type definitions for the Alert component           ║
// ╚═══════════════════════════════════════════════════════════════════════════╝

import type { AlertVariant } from '@/lib/constants/components/ui/alert.variants';
import type { AlertGroupSpacing } from '@/lib/constants/components/ui/alert.constants';

// ─── Re-exports ────────────────────────────────────────────────────────────
export type { AlertVariant, AlertGroupSpacing };

// ─── Alert Props ───────────────────────────────────────────────────────────
export interface AlertProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Visual variant of the alert */
  variant?: AlertVariant;
  /** Alert title */
  title?: string;
  /** Alert description/message */
  description?: string;
  /** Show dismiss button */
  dismissible?: boolean;
  /** Callback when dismissed */
  onDismiss?: () => void;
  /** Custom icon (overrides default) */
  icon?: React.ReactNode;
  /** Action button */
  action?: React.ReactNode;
  /** Make alert compact (smaller padding) */
  compact?: boolean;
}

// ─── Alert Group Props ─────────────────────────────────────────────────────
export interface AlertGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Spacing between alerts */
  spacing?: AlertGroupSpacing;
}

// ─── Variant Shortcut Props ────────────────────────────────────────────────
export type InfoAlertProps = Omit<AlertProps, 'variant'>;
export type SuccessAlertProps = Omit<AlertProps, 'variant'>;
export type WarningAlertProps = Omit<AlertProps, 'variant'>;
export type ErrorAlertProps = Omit<AlertProps, 'variant'>;
export type QuantumAlertProps = Omit<AlertProps, 'variant'>;