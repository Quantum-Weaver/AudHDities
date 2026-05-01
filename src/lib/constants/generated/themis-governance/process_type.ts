// =====================================================
// FILE: constants/generated/themis-governance/process_type.ts
// GENERATED: 2026-05-01T03:24:43.071Z
// SOURCE: Constants.public.Enums.process_type
// VALUES: 5 entries
// =====================================================

export const PROCESS_TYPE = {
  APPEAL: 'appeal',
  VERIFICATION: 'verification',
  PAYOUT_DISPUTE: 'payout_dispute',
  CONTENT_REVIEW: 'content_review',
  ROLE_APPLICATION: 'role_application',
} as const;

export type ProcessType = typeof PROCESS_TYPE[keyof typeof PROCESS_TYPE];
