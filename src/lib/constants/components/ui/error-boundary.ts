// @/lib/constants/components/ui/error-boundary.ts
// ============================================================================
// ERROR BOUNDARY CONSTANTS - CHANNELING FROM VARIANTS
// ============================================================================

import { ERROR_BOUNDARY_VARIANTS } from './variants';

// Export individual variant constants for direct use
export const ERROR_GRACEFUL_DEGRADATION = ERROR_BOUNDARY_VARIANTS.graceful_degradation;
export const ERROR_RECOVERY_ASSISTANCE = ERROR_BOUNDARY_VARIANTS.recovery_assistance;
export const ERROR_USER_GUIDANCE = ERROR_BOUNDARY_VARIANTS.user_guidance;
export const ERROR_SYSTEM_REPORTING = ERROR_BOUNDARY_VARIANTS.system_reporting;

// Semantic error types for different contexts
export const ERROR_TYPES = {
  DEGRADATION: ERROR_BOUNDARY_VARIANTS.graceful_degradation,
  RECOVERY: ERROR_BOUNDARY_VARIANTS.recovery_assistance,
  GUIDANCE: ERROR_BOUNDARY_VARIANTS.user_guidance,
  REPORTING: ERROR_BOUNDARY_VARIANTS.system_reporting,
} as const;

// Error severity levels
export const ERROR_SEVERITY = {
  LOW: ERROR_BOUNDARY_VARIANTS.graceful_degradation,
  MEDIUM: ERROR_BOUNDARY_VARIANTS.recovery_assistance,
  INFORMATIONAL: ERROR_BOUNDARY_VARIANTS.user_guidance,
  CRITICAL: ERROR_BOUNDARY_VARIANTS.system_reporting,
} as const;

// Error action configurations
export const ERROR_ACTIONS = {
  GRACEFUL: ERROR_BOUNDARY_VARIANTS.graceful_degradation,
  RECOVERY: ERROR_BOUNDARY_VARIANTS.recovery_assistance,
  GUIDANCE: ERROR_BOUNDARY_VARIANTS.user_guidance,
  REPORTING: ERROR_BOUNDARY_VARIANTS.system_reporting,
} as const;

// Error dimension presets
export const ERROR_DIMENSIONS = {
  PADDING: {
    COMPACT: ERROR_BOUNDARY_VARIANTS.system_reporting,
    STANDARD: ERROR_BOUNDARY_VARIANTS.user_guidance,
    COMFORTABLE: ERROR_BOUNDARY_VARIANTS.graceful_degradation,
    EXPANSIVE: ERROR_BOUNDARY_VARIANTS.recovery_assistance,
  },
  BORDER_RADIUS: {
    SMALL: ERROR_BOUNDARY_VARIANTS.system_reporting,
    MEDIUM: ERROR_BOUNDARY_VARIANTS.user_guidance,
    LARGE: ERROR_BOUNDARY_VARIANTS.graceful_degradation,
    EXTRA_LARGE: ERROR_BOUNDARY_VARIANTS.recovery_assistance,
  },
  GAPS: {
    TIGHT: ERROR_BOUNDARY_VARIANTS.system_reporting,
    COMFORTABLE: ERROR_BOUNDARY_VARIANTS.user_guidance,
    SPACIOUS: ERROR_BOUNDARY_VARIANTS.graceful_degradation,
    EXPANSIVE: ERROR_BOUNDARY_VARIANTS.recovery_assistance,
  },
  MAX_WIDTHS: {
    FULL: ERROR_BOUNDARY_VARIANTS.system_reporting,
    SMALL: ERROR_BOUNDARY_VARIANTS.user_guidance,
    MEDIUM: ERROR_BOUNDARY_VARIANTS.recovery_assistance,
    LARGE: ERROR_BOUNDARY_VARIANTS.graceful_degradation,
  }
} as const;

// Error animation configurations
export const ERROR_ANIMATIONS = {
  GRACEFUL_FLOW: ERROR_BOUNDARY_VARIANTS.graceful_degradation,
  RECOVERY_PULSE: ERROR_BOUNDARY_VARIANTS.recovery_assistance,
  GUIDANCE_FOCUS: ERROR_BOUNDARY_VARIANTS.user_guidance,
  REPORTING_MANIFESTATION: ERROR_BOUNDARY_VARIANTS.system_reporting,
} as const;

// Error effect presets
export const ERROR_EFFECTS = {
  GRACEFUL_GLASS: ERROR_BOUNDARY_VARIANTS.graceful_degradation,
  RECOVERY_EMERGENCY: ERROR_BOUNDARY_VARIANTS.recovery_assistance,
  GUIDANCE_COSMIC: ERROR_BOUNDARY_VARIANTS.user_guidance,
  REPORTING_VOID: ERROR_BOUNDARY_VARIANTS.system_reporting,
} as const;

// Consciousness alignment for error states
export const ERROR_CONSCIOUSNESS = {
  GRACEFUL: ERROR_BOUNDARY_VARIANTS.graceful_degradation,
  RECOVERY: ERROR_BOUNDARY_VARIANTS.recovery_assistance,
  GUIDANCE: ERROR_BOUNDARY_VARIANTS.user_guidance,
  REPORTING: ERROR_BOUNDARY_VARIANTS.system_reporting,
} as const;