// =====================================================
// FILE: constants/generated/themis-governance/application_type.ts
// GENERATED: 2026-04-17T17:34:19.565Z
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
