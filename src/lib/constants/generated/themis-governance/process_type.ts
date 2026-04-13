// =====================================================
// FILE: constants/themis-governance/process_type.ts
// GENERATED: 2026-04-13T16:36:33.089Z
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
