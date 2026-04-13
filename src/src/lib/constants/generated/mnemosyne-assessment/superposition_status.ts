// =====================================================
// FILE: constants/generated/mnemosyne-assessment/superposition_status.ts
// GENERATED: 2026-04-13T21:47:20.916Z
// SOURCE: Constants.public.Enums.superposition_status
// =====================================================

export const SUPERPOSITION_STATUS = {
  ACTIVE: 'active',
  COLLAPSED: 'collapsed',
  ARCHIVED: 'archived',
} as const;

export type SuperpositionStatus = typeof SUPERPOSITION_STATUS[keyof typeof SUPERPOSITION_STATUS];