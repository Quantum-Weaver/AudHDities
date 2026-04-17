// =====================================================
// FILE: constants/generated/hestia-core/verification_status.ts
// GENERATED: 2026-04-17T17:34:19.638Z
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
