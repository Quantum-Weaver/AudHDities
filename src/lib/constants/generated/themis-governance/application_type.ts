// =====================================================
// FILE: constants/generated/themis-governance/application_type.ts
// GENERATED: 2026-04-30T04:17:48.793Z
// SOURCE: Constants.public.Enums.application_type
// VALUES: 4 entries
// =====================================================

export const APPLICATION_TYPE = {
  CREATOR: 'creator',
  VENDOR: 'vendor',
  MENTOR: 'mentor',
  MODERATOR: 'moderator',
} as const;

export type ApplicationType = typeof APPLICATION_TYPE[keyof typeof APPLICATION_TYPE];
