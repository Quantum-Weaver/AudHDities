// @/types/components/ui/error-boundary.ts
// ============================================================================
// ERROR BOUNDARY TYPES - PURE SHAPES ONLY
// ============================================================================

import type { ERROR_BOUNDARY_VARIANTS } from '@/lib/constants/components/ui/variants';

// Base error boundary props interface
export interface ErrorBoundaryProps {
  variant?: keyof typeof ERROR_BOUNDARY_VARIANTS;
  error?: Error | null;
  errorInfo?: React.ErrorInfo | null;
  fallback?: React.ReactNode;
  onRecovery?: () => void;
  onReport?: (error: Error, errorInfo: React.ErrorInfo) => void;
  consciousnessLevel?: ErrorConsciousnessLevel;
}

// Error boundary state interface
export interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
  errorInfo: React.ErrorInfo | null;
  consciousnessLevel: ErrorConsciousnessLevel;
}

// Error consciousness states
export type ErrorConsciousnessLevel = 
  | 'graceful_recovery'
  | 'crisis_recovery'
  | 'user_support'
  | 'system_diagnosis';

// Error severity levels
export type ErrorSeverity = 
  | 'low'
  | 'medium'
  | 'informational'
  | 'critical';

// Error dimension constraints
export interface ErrorDimensions {
  padding: string;
  borderRadius: string;
  gap: string;
  maxWidth: string;
}

// Error visual properties
export interface ErrorVisuals {
  primary: string;
  secondary: string;
  accent: string;
  background: string;
  border: string;
}

// Error typography configuration
export interface ErrorTypography {
  title: {
    font: readonly string[];
    size: string;
    weight: string;
    color: string;
  };
  message: {
    font: readonly string[];
    size: string;
    weight: string;
    color: string;
  };
  details: {
    font: readonly string[];
    size: string;
    weight: string;
    color: string;
  };
}

// Error action configurations
export interface ErrorActions {
  primary: {
    background: string;
    text: string;
    hover: string;
  };
  secondary: {
    background: string;
    border: string;
    text: string;
    hover: string;
  };
}

// Error effects configuration
export interface ErrorEffects {
  glow: string;
  shadow: string;
  backdrop: string;
  borderGradient?: string;
  holographic?: string;
  gradient?: string;
}

// Complete error configuration
export interface ErrorConfig {
  visuals: ErrorVisuals;
  typography: ErrorTypography;
  dimensions: ErrorDimensions;
  actions: ErrorActions;
  effects: ErrorEffects;
  animation: any;
  severity: ErrorSeverity;
  consciousness: {
    level: ErrorConsciousnessLevel;
    vessel: string;
    domain: string;
    resonance: number;
    process: string;
  };
}

// Error boundary variant type
export type ErrorBoundaryVariant = keyof typeof ERROR_BOUNDARY_VARIANTS;

// Error recovery options
export interface RecoveryOptions {
  retry: boolean;
  reset: boolean;
  report: boolean;
  contactSupport: boolean;
}

// Error context for reporting
export interface ErrorContext {
  componentStack: string;
  timestamp: number;
  userAgent: string;
  url: string;
  consciousnessLevel: ErrorConsciousnessLevel;
}