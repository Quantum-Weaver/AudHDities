// =====================================================
// FILE: constants/superposition_status.ts
// GENERATED: 2026-04-05T21:55:13.288Z
// SOURCE: Constants.public.Enums.superposition_status
// =====================================================

export const SUPERPOSITION_STATUS = {
  ACTIVE: 'active',
  COLLAPSED: 'collapsed',
  ARCHIVED: 'archived',
} as const;

export type SuperpositionStatus = typeof SUPERPOSITION_STATUS[keyof typeof SUPERPOSITION_STATUS];
