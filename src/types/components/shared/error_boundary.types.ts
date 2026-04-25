// src/types/components/shared/error_boundary.types.ts
// ╔═══════════════════════════════════════════════════════════════════════════╗
// ║                    ERROR BOUNDARY TYPES                                   ║
// ║                    All type definitions for the ErrorBoundary component   ║
// ╚═══════════════════════════════════════════════════════════════════════════╝

import type { ReactNode, ErrorInfo } from 'react';
import type {
  ErrorBoundaryVariant,
  ErrorBoundarySeverity,
} from '@/lib/constants/components/shared/error_boundary.constants';

// ─── Re-exports ────────────────────────────────────────────────────────────
export type { ErrorBoundaryVariant, ErrorBoundarySeverity };

// ─── Props ─────────────────────────────────────────────────────────────────
export interface ErrorBoundaryProps {
  /** Content rendered when no error is present */
  children: ReactNode;
  /** Custom fallback UI to replace the default error display */
  fallback?: ReactNode;
  /** Visual variant determining colors, sizing, and severity */
  variant?: ErrorBoundaryVariant;
  /** Called when an error is caught */
  onError?: (error: Error, errorInfo: ErrorInfo) => void;
}

// ─── State ─────────────────────────────────────────────────────────────────
export interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}