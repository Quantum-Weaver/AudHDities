// src/types/components/runes/error_boundary.types.ts
// ╔═══════════════════════════════════════════════════════════════════════════╗
// ║                    ERROR BOUNDARY TYPES                                   ║
// ║                    All type definitions for the ErrorBoundary component   ║
// ╚═══════════════════════════════════════════════════════════════════════════╝

import type { ReactNode, ErrorInfo } from 'react';
import type {
  ErrorBoundaryVariant,
  ErrorBoundarySeverity,
} from '@/lib/constants/components/runes/error_boundary.constants';

import { SerializedError } from '@/lib/utils/components/runes/error_boundary.utils';

// ─── Re-exports ────────────────────────────────────────────────────────────
export type { ErrorBoundaryVariant, ErrorBoundarySeverity, SerializedError };

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
  /** Custom logger — receives a SerializedError */
  onLogError?: (serialized: SerializedError) => void;
  /** Safe route for navigate recovery action */
  safeRoute?: string;  
}

// ─── State ─────────────────────────────────────────────────────────────────
export interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}