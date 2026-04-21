// =====================================================
// FILE: constants/generated/hestia-core/user_status.ts
// GENERATED: 2026-04-21T00:23:20.056Z
// SOURCE: Constants.public.Enums.user_status
// =====================================================

export const USER_STATUS = {
  ACTIVE: 'active',
  SUSPENDED: 'suspended',
  DELETED: 'deleted',
} as const;

export type UserStatus = typeof USER_STATUS[keyof typeof USER_STATUS];