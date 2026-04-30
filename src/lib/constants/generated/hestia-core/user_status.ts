// =====================================================
// FILE: constants/generated/hestia-core/user_status.ts
// GENERATED: 2026-04-30T04:17:49.076Z
// SOURCE: Constants.public.Enums.user_status
// VALUES: 3 entries
// =====================================================

export const USER_STATUS = {
  ACTIVE: 'active',
  SUSPENDED: 'suspended',
  DELETED: 'deleted',
} as const;

export type UserStatus = typeof USER_STATUS[keyof typeof USER_STATUS];
