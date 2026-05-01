// =====================================================
// FILE: constants/generated/themis-governance/application_status.ts
// GENERATED: 2026-05-01T03:24:42.800Z
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
