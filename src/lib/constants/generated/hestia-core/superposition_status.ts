// =====================================================
// FILE: constants/generated/hestia-core/superposition_status.ts
// GENERATED: 2026-04-14T20:18:57.672Z
// SOURCE: Constants.public.Enums.superposition_status
// VALUES: 3 entries
// =====================================================

export const SUPERPOSITION_STATUS = {
  ACTIVE: 'active',
  COLLAPSED: 'collapsed',
  ARCHIVED: 'archived',
} as const;

export type SuperpositionStatus = typeof SUPERPOSITION_STATUS[keyof typeof SUPERPOSITION_STATUS];
