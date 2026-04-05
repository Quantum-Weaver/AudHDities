// =====================================================
// FILE: constants/process_type.ts
// GENERATED: 2026-04-05T18:10:53.219Z
// SOURCE: Constants.public.Enums.process_type
// =====================================================

export const PROCESS_TYPE = {
  APPEAL: 'appeal',
  VERIFICATION: 'verification',
  PAYOUT_DISPUTE: 'payout_dispute',
  CONTENT_REVIEW: 'content_review',
  ROLE_APPLICATION: 'role_application',
} as const;

export type ProcessType = typeof PROCESS_TYPE[keyof typeof PROCESS_TYPE];
