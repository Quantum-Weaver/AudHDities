// =====================================================
// FILE: constants/generated/themis-governance/application_status.ts
// GENERATED: 2026-07-28T15:33:50.153Z
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
