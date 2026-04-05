/* @/lib/constants/core/verification-status.ts */

export const VERIFICATION_STATUS = {
  "pending": "Pending", 
  "verified": "Verified", 
  "rejected": "Rejected", 
  "suspended": "Suspended"
} as const;

export type VerificationStatus = typeof VERIFICATION_STATUS[keyof typeof VERIFICATION_STATUS];
export type CreatorVerificationStatus = typeof VERIFICATION_STATUS[keyof typeof VERIFICATION_STATUS];
export type VendorVerificationStatus = typeof VERIFICATION_STATUS[keyof typeof VERIFICATION_STATUS];