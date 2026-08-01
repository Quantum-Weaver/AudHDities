// =====================================================
// FILE: constants/generated/hestia-core/profile_status.ts
// GENERATED: 2026-08-01T17:49:54.520Z
// SOURCE: Constants.public.Enums.profile_status
// VALUES: 6 entries
// =====================================================

export const PROFILE_STATUS = {
  DRAFT: 'draft',
  PENDING: 'pending',
  ACTIVE: 'active',
  INACTIVE: 'inactive',
  SUSPENDED: 'suspended',
  CLOSED: 'closed',
} as const;

export type ProfileStatus = typeof PROFILE_STATUS[keyof typeof PROFILE_STATUS];
