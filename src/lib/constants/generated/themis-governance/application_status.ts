// =====================================================
// FILE: constants/generated/themis-governance/application_status.ts
// GENERATED: 2026-08-01T16:03:07.221Z
// SOURCE: Constants.public.Enums.application_status
// VALUES: 7 entries
// =====================================================

export const APPLICATION_STATUS = {
  DRAFT: 'draft',
  SUBMITTED: 'submitted',
  UNDER_REVIEW: 'under_review',
  APPROVED: 'approved',
  REJECTED: 'rejected',
  SUSPENDED: 'suspended',
  WITHDRAWN: 'withdrawn',
} as const;

export type ApplicationStatus = typeof APPLICATION_STATUS[keyof typeof APPLICATION_STATUS];
