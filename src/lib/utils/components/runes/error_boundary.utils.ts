// src/lib/utils/components/runes/error_boundary.utils.ts
// ╔═══════════════════════════════════════════════════════════════════════════╗
// ║                    ERROR BOUNDARY UTILITIES                               ║
// ║                    Error serialization, logging, recovery strategies      ║
// ╚═══════════════════════════════════════════════════════════════════════════╝

import type { ErrorInfo } from 'react';
import type {
  ErrorBoundaryVariant,
  ErrorBoundarySeverity,
} from '@/lib/constants/components/runes/error_boundary.constants';
import {
  ERROR_BOUNDARY_VARIANTS,
  ERROR_BOUNDARY_SEVERITY,
  ERROR_BOUNDARY_DEFAULTS,
} from '@/lib/constants/components/runes/error_boundary.constants';
import { ERROR_BOUNDARY_SEVERITY_MAP } from '@/lib/constants/components/runes/error_boundary.variants';

// ─── Serialized Error ──────────────────────────────────────────────────────
/** A safe, serializable snapshot of an error for logging or display. */
export interface SerializedError {
  name: string;
  message: string;
  stack?: string;
  componentStack?: string;
  timestamp: string;
  severity: ErrorBoundarySeverity;
}

// ═══════════════════════════════════════════════════════════════════════════
// ERROR SERIALIZATION
// ═══════════════════════════════════════════════════════════════════════════

/**
 * Convert an Error + React ErrorInfo into a safe, serializable object.
 * Strips circular references and non-serializable properties.
 */
export function serializeError(
  error: Error,
  errorInfo?: ErrorInfo,
  severity: ErrorBoundarySeverity = ERROR_BOUNDARY_SEVERITY.MEDIUM
): SerializedError {
  return {
    name: error.name || 'Error',
    message: error.message || ERROR_BOUNDARY_DEFAULTS.MESSAGE,
    stack: error.stack?.substring(0, 2000), // Truncate for log safety
    componentStack: errorInfo?.componentStack?.substring(0, 2000),
    timestamp: new Date().toISOString(),
    severity,
  };
}

// ═══════════════════════════════════════════════════════════════════════════
// SEVERITY
// ═══════════════════════════════════════════════════════════════════════════

/**
 * Get the severity level for a given error boundary variant.
 */
export function getSeverity(
  variant: ErrorBoundaryVariant
): ErrorBoundarySeverity {
  return (
    (ERROR_BOUNDARY_SEVERITY_MAP[variant] as ErrorBoundarySeverity) ??
    ERROR_BOUNDARY_SEVERITY.MEDIUM
  );
}

/**
 * Determine if a severity level is considered critical (warrants reload).
 */
export function isSeverityCritical(severity: ErrorBoundarySeverity): boolean {
  return severity === ERROR_BOUNDARY_SEVERITY.CRITICAL;
}

// ═══════════════════════════════════════════════════════════════════════════
// LOGGING STRATEGY
// ═══════════════════════════════════════════════════════════════════════════

/** Callback signature for custom error loggers. */
export type ErrorLogFn = (serialized: SerializedError) => void;

const defaultLogger: ErrorLogFn = (serialized) => {
  console.error(
    `[ErrorBoundary] ${serialized.severity.toUpperCase()}: ${serialized.name} — ${serialized.message}`,
    {
      stack: serialized.stack,
      componentStack: serialized.componentStack,
      timestamp: serialized.timestamp,
    }
  );
};

/**
 * Log a serialized error through the provided logger or the default console.
 */
export function logError(
  serialized: SerializedError,
  customLogger?: ErrorLogFn
): void {
  const logger = customLogger ?? defaultLogger;
  logger(serialized);
}

// ═══════════════════════════════════════════════════════════════════════════
// RECOVERY STRATEGY
// ═══════════════════════════════════════════════════════════════════════════

/** Possible recovery actions after an error is caught. */
export type RecoveryAction =
  | 'retry'      // Re-render children (reset state)
  | 'reload'     // Hard page reload
  | 'navigate'   // Navigate to a safe route
  | 'none';      // No recovery possible

/**
 * Determine the recommended recovery action based on severity.
 */
export function getRecoveryAction(
  severity: ErrorBoundarySeverity
): RecoveryAction {
  switch (severity) {
    case ERROR_BOUNDARY_SEVERITY.INFORMATIONAL:
      return 'retry';
    case ERROR_BOUNDARY_SEVERITY.LOW:
      return 'retry';
    case ERROR_BOUNDARY_SEVERITY.MEDIUM:
      return 'retry';
    case ERROR_BOUNDARY_SEVERITY.CRITICAL:
      return 'reload';
    default:
      return 'retry';
  }
}

/**
 * Execute a recovery action.
 */
export function executeRecovery(
  action: RecoveryAction,
  safeRoute?: string
): void {
  switch (action) {
    case 'reload':
      if (typeof window !== 'undefined') {
        window.location.reload();
      }
      break;
    case 'navigate':
      if (typeof window !== 'undefined' && safeRoute) {
        window.location.href = safeRoute;
      }
      break;
    case 'retry':
    case 'none':
    default:
      // Handled by component state reset
      break;
  }
}

// ═══════════════════════════════════════════════════════════════════════════
// NESTING DETECTION
// ═══════════════════════════════════════════════════════════════════════════

/**
 * Check if the current component is already inside an ErrorBoundary.
 * Useful to prevent double-wrapping or infinite error loops.
 *
 * Walks the DOM upward looking for a data attribute set by ErrorBoundary.
 */
export function isInsideErrorBoundary(element: HTMLElement | null): boolean {
  if (!element || typeof document === 'undefined') return false;

  let current: HTMLElement | null = element;
  while (current) {
    if (current.dataset?.errorBoundary === 'true') return true;
    current = current.parentElement;
  }
  return false;
}

// ═══════════════════════════════════════════════════════════════════════════
// RESET STATE FACTORY
// ═══════════════════════════════════════════════════════════════════════════

/** The reset state to apply after an error is handled. */
export const ERROR_BOUNDARY_RESET_STATE = {
  hasError: false,
  error: null,
} as const;

/**
 * Create a reset state object for the ErrorBoundary.
 * Always returns the same shape to ensure consistency.
 */
export function createResetState(): { hasError: false; error: null } {
  return { hasError: false, error: null };
}