// =====================================================
// FILE: constants/generated/themis-governance/application_status.ts
// GENERATED: 2026-04-13T21:55:48.463Z
// SOURCE: Constants.public.Enums.application_status
// =====================================================

export const APPLICATION_STATUS = {
  PENDING: 'pending',
  REVIEWING: 'reviewing',
  APPROVED: 'approved',
  REJECTED: 'rejected',
  NEEDS_INFO: 'needs_info',
} as const;

export type ApplicationStatus = typeof APPLICATION_STATUS[keyof typeof APPLICATION_STATUS];