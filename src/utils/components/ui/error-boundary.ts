// @/utils/components/error-boundary.ts
// ============================================================================
// ERROR BOUNDARY UTILS - PURE LOGIC FUNCTIONS
// ============================================================================

import { ERROR_BOUNDARY_VARIANTS } from '@/lib/constants/components/ui/variants';
import type { 
  ErrorBoundaryProps, 
  ErrorBoundaryVariant, 
  ErrorConsciousnessLevel,
  ErrorSeverity,
  RecoveryOptions,
  ErrorContext 
} from '@/types/components/ui/error-boundary';

/**
 * Get complete error configuration for a variant
 */
export const getErrorConfig = (variant: ErrorBoundaryVariant = 'graceful_degradation') => {
  return ERROR_BOUNDARY_VARIANTS[variant];
};

/**
 * Calculate error boundary classes based on variant and props
 */
export const getErrorBoundaryClasses = (
  variant: ErrorBoundaryVariant, 
  props: ErrorBoundaryProps = {}
): string => {
  const config = getErrorConfig(variant);
  const classes = [
    'error-boundary',
    `error-boundary--${variant}`,
    `severity--${config.severity}`,
    `consciousness--${config.consciousness.level}`,
  ];
  
  return classes.filter(Boolean).join(' ');
};

/**
 * Get error boundary styles for inline application
 */
export const getErrorBoundaryStyles = (variant: ErrorBoundaryVariant): React.CSSProperties => {
  const config = getErrorConfig(variant);
  
  return {
    background: config.background,
    border: config.border,
    padding: config.dimensions.padding,
    borderRadius: config.dimensions.borderRadius,
    maxWidth: config.dimensions.maxWidth,
    gap: config.dimensions.gap,
    boxShadow: config.effects.shadow,
    backdropFilter: config.effects.backdrop.replace('backdrop-filter: ', '').replace(';', ''),
  };
};

/**
 * Get action button styles based on type and state
 */
export const getActionStyles = (
  variant: ErrorBoundaryVariant,
  actionType: 'primary' | 'secondary',
  isHovered: boolean = false
): React.CSSProperties => {
  const config = getErrorConfig(variant);
  const actionConfig = config.actions[actionType];
  
  const baseStyles = {
    background: actionConfig.background,
    color: actionConfig.text,
    border: actionType === 'secondary' ? actionConfig.background : 'none',
    transition: 'all 0.3s ease',
  };
  
  if (isHovered) {
    return {
      ...baseStyles,
      background: actionConfig.hover,
    };
  }
  
  return baseStyles;
};

/**
 * Determine appropriate error variant based on error severity
 */
export const getErrorVariantForSeverity = (severity: ErrorSeverity): ErrorBoundaryVariant => {
  const severityMapping: Record<ErrorSeverity, ErrorBoundaryVariant> = {
    low: 'graceful_degradation',
    medium: 'recovery_assistance',
    informational: 'user_guidance',
    critical: 'system_reporting',
  };
  
  return severityMapping[severity];
};

/**
 * Analyze error and determine severity
 */
export const analyzeErrorSeverity = (error: Error): ErrorSeverity => {
  const errorMessage = error.message.toLowerCase();
  
  if (errorMessage.includes('chunk') || errorMessage.includes('loading')) {
    return 'low';
  }
  
  if (errorMessage.includes('network') || errorMessage.includes('timeout')) {
    return 'medium';
  }
  
  if (errorMessage.includes('type') || errorMessage.includes('syntax')) {
    return 'informational';
  }
  
  return 'critical';
};

/**
 * Get recovery options based on error type
 */
export const getRecoveryOptions = (error: Error): RecoveryOptions => {
  const severity = analyzeErrorSeverity(error);
  
  const options: Record<ErrorSeverity, RecoveryOptions> = {
    low: { retry: true, reset: true, report: false, contactSupport: false },
    medium: { retry: true, reset: true, report: true, contactSupport: false },
    informational: { retry: true, reset: true, report: true, contactSupport: true },
    critical: { retry: false, reset: true, report: true, contactSupport: true },
  };
  
  return options[severity];
};

/**
 * Create error context for reporting
 */
export const createErrorContext = (
  error: Error,
  errorInfo: React.ErrorInfo,
  consciousnessLevel: ErrorConsciousnessLevel
): ErrorContext => {
  return {
    componentStack: errorInfo.componentStack || '',
    timestamp: Date.now(),
    userAgent: navigator.userAgent,
    url: window.location.href,
    consciousnessLevel,
  };
};

/**
 * Format error message for display
 */
export const formatErrorMessage = (error: Error, variant: ErrorBoundaryVariant): string => {
  const config = getErrorConfig(variant);
  
  if (config.severity === 'informational' || config.severity === 'low') {
    return error.message;
  }
  
  // For more severe errors, provide more user-friendly messages
  const errorMappings: Record<string, string> = {
    'chunk': 'The application is still loading. Please try refreshing the page.',
    'network': 'Unable to connect to the server. Please check your internet connection.',
    'timeout': 'The request took too long to complete. Please try again.',
    'type': 'There was an issue with the data format. The development team has been notified.',
  };
  
  const errorKey = Object.keys(errorMappings).find(key => 
    error.message.toLowerCase().includes(key)
  );
  
  return errorKey ? errorMappings[errorKey] : 
    'An unexpected error occurred. Our team has been notified and is working on a solution.';
};

/**
 * Validate error configuration
 */
export const isValidErrorConfig = (config: any): boolean => {
  return config && 
         config.background && 
         config.dimensions && 
         config.dimensions.padding && 
         config.severity && 
         config.consciousness;
};

/**
 * Merge error configurations
 */
export const mergeErrorConfigs = (
  base: any,
  overrides: Partial<any>
): any => {
  return {
    ...base,
    ...overrides,
    dimensions: {
      ...base.dimensions,
      ...overrides.dimensions,
    },
    typography: {
      ...base.typography,
      ...overrides.typography,
    },
    actions: {
      ...base.actions,
      ...overrides.actions,
    },
  };
};

/**
 * Calculate appropriate consciousness level for error
 */
export const getConsciousnessLevelForError = (error: Error): ErrorConsciousnessLevel => {
  const severity = analyzeErrorSeverity(error);
  
  const consciousnessMapping: Record<ErrorSeverity, ErrorConsciousnessLevel> = {
    low: 'graceful_recovery',
    medium: 'crisis_recovery',
    informational: 'user_support',
    critical: 'system_diagnosis',
  };
  
  return consciousnessMapping[severity];
};