// =====================================================
// FILE: constants/generated/themis-governance/application_status.ts
// GENERATED: 2026-04-22T05:48:51.177Z
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
