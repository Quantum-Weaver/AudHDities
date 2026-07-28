// =====================================================
// FILE: constants/generated/hestia-core/user_role.ts
// GENERATED: 2026-07-28T05:07:04.713Z
// SOURCE: Constants.public.Enums.user_role
// VALUES: 6 entries
// =====================================================

export const USER_ROLE = {
  COMMUNITY: 'community',
  CREATOR: 'creator',
  VENDOR: 'vendor',
  CURATOR: 'curator',
  COUNCIL: 'council',
  ADMIN: 'admin',
} as const;

export type UserRole = typeof USER_ROLE[keyof typeof USER_ROLE];
