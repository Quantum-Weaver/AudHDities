// =====================================================
// FILE: constants/generated/hestia-core/user_status.ts
// GENERATED: 2026-05-01T15:32:00.128Z
// SOURCE: Constants.public.Enums.user_status
// VALUES: 3 entries
// =====================================================

export const USER_STATUS = {
  ACTIVE: 'active',
  SUSPENDED: 'suspended',
  DELETED: 'deleted',
} as const;

export type UserStatus = typeof USER_STATUS[keyof typeof USER_STATUS];
