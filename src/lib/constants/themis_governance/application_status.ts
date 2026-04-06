// =====================================================
// FILE: constants/application_status.ts
// GENERATED: 2026-04-05T21:55:13.155Z
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
