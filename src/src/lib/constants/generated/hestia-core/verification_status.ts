// =====================================================
// FILE: constants/generated/hestia-core/verification_status.ts
// GENERATED: 2026-04-13T21:47:20.923Z
// SOURCE: Constants.public.Enums.verification_status
// =====================================================

export const VERIFICATION_STATUS = {
  PENDING: 'pending',
  VERIFIED: 'verified',
  REJECTED: 'rejected',
  SUSPENDED: 'suspended',
} as const;

export type VerificationStatus = typeof VERIFICATION_STATUS[keyof typeof VERIFICATION_STATUS];