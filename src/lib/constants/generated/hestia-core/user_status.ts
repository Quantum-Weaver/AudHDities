// =====================================================
// FILE: constants/generated/hestia-core/user_status.ts
// GENERATED: 2026-04-20T23:04:55.092Z
// SOURCE: Constants.public.Enums.user_status
// =====================================================

export const USER_STATUS = {
  ACTIVE: 'active',
  SUSPENDED: 'suspended',
  DELETED: 'deleted',
} as const;

export type UserStatus = typeof USER_STATUS[keyof typeof USER_STATUS];