// =====================================================
// FILE: constants/hestia-core/user_status.ts
// GENERATED: 2026-04-13T16:36:33.095Z
// SOURCE: Constants.public.Enums.user_status
// VALUES: 3 entries
// =====================================================

export const USER_STATUS = {
  ACTIVE: 'active',
  SUSPENDED: 'suspended',
  DELETED: 'deleted',
} as const;

export type UserStatus = typeof USER_STATUS[keyof typeof USER_STATUS];
