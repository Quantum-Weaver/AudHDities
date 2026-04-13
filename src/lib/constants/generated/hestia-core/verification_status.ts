// =====================================================
// FILE: constants/hestia-core/verification_status.ts
// GENERATED: 2026-04-13T16:36:33.095Z
// SOURCE: Constants.public.Enums.verification_status
// VALUES: 4 entries
// =====================================================

export const VERIFICATION_STATUS = {
  PENDING: 'pending',
  VERIFIED: 'verified',
  REJECTED: 'rejected',
  SUSPENDED: 'suspended',
} as const;

export type VerificationStatus = typeof VERIFICATION_STATUS[keyof typeof VERIFICATION_STATUS];
