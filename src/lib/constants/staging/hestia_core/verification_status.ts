// =====================================================
// FILE: constants/verification_status.ts
// GENERATED: 2026-04-05T21:55:13.181Z
// SOURCE: Constants.public.Enums.verification_status
// =====================================================

export const VERIFICATION_STATUS = {
  PENDING: 'pending',
  VERIFIED: 'verified',
  REJECTED: 'rejected',
  SUSPENDED: 'suspended',
} as const;

export type VerificationStatus = typeof VERIFICATION_STATUS[keyof typeof VERIFICATION_STATUS];
