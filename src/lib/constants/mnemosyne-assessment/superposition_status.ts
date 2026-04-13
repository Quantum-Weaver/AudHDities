// =====================================================
// FILE: constants/mnemosyne-assessment/superposition_status.ts
// GENERATED: 2026-04-13T01:15:57.368Z
// SOURCE: Constants.public.Enums.superposition_status
// VALUES: 3 entries
// =====================================================

export const SUPERPOSITION_STATUS = {
  ACTIVE: 'active',
  COLLAPSED: 'collapsed',
  ARCHIVED: 'archived',
} as const;

export type SuperpositionStatus = typeof SUPERPOSITION_STATUS[keyof typeof SUPERPOSITION_STATUS];
