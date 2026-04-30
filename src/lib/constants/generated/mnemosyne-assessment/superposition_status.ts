// =====================================================
// FILE: constants/generated/mnemosyne-assessment/superposition_status.ts
// GENERATED: 2026-04-30T15:32:14.047Z
// SOURCE: Constants.public.Enums.superposition_status
// VALUES: 3 entries
// =====================================================

export const SUPERPOSITION_STATUS = {
  ACTIVE: 'active',
  COLLAPSED: 'collapsed',
  ARCHIVED: 'archived',
} as const;

export type SuperpositionStatus = typeof SUPERPOSITION_STATUS[keyof typeof SUPERPOSITION_STATUS];
