// =====================================================
// FILE: constants/generated/themis-governance/application_status.ts
// GENERATED: 2026-04-23T02:14:53.953Z
// SOURCE: Constants.public.Enums.application_status
// VALUES: 5 entries
// =====================================================

export const APPLICATION_STATUS = {
  PENDING: 'pending',
  REVIEWING: 'reviewing',
  APPROVED: 'approved',
  REJECTED: 'rejected',
  NEEDS_INFO: 'needs_info',
} as const;

export type ApplicationStatus = typeof APPLICATION_STATUS[keyof typeof APPLICATION_STATUS];
