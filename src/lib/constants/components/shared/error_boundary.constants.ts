// src/lib/constants/components/shared/error_boundary.constants.ts
// ╔═══════════════════════════════════════════════════════════════════════════╗
// ║                    ERROR BOUNDARY CONSTANTS                               ║
// ║                    Single source of truth — sizing, icons, defaults       ║
// ╚═══════════════════════════════════════════════════════════════════════════╝

// ─── Variant Keys ──────────────────────────────────────────────────────────
export const ERROR_BOUNDARY_VARIANTS = {
  GRACEFUL_DEGRADATION: 'graceful_degradation',
  RECOVERY_ASSISTANCE: 'recovery_assistance',
  USER_GUIDANCE: 'user_guidance',
  SYSTEM_REPORTING: 'system_reporting',
} as const;

export type ErrorBoundaryVariant =
  (typeof ERROR_BOUNDARY_VARIANTS)[keyof typeof ERROR_BOUNDARY_VARIANTS];

// ─── Default Content ───────────────────────────────────────────────────────
export const ERROR_BOUNDARY_DEFAULTS = {
  TITLE: 'Something went wrong',
  MESSAGE: 'An unexpected error occurred',
  ACTION_LABEL: 'Try Again',
  ICON: '⚠️',
} as const;

// ─── Severity Levels ───────────────────────────────────────────────────────
export const ERROR_BOUNDARY_SEVERITY = {
  INFORMATIONAL: 'informational',
  LOW: 'low',
  MEDIUM: 'medium',
  CRITICAL: 'critical',
} as const;

export type ErrorBoundarySeverity =
  (typeof ERROR_BOUNDARY_SEVERITY)[keyof typeof ERROR_BOUNDARY_SEVERITY];