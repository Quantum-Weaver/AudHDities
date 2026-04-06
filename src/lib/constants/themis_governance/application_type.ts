// =====================================================
// FILE: constants/application_type.ts
// GENERATED: 2026-04-05T21:55:13.154Z
// SOURCE: Constants.public.Enums.application_type
// =====================================================

export const APPLICATION_TYPE = {
  CREATOR: 'creator',
  VENDOR: 'vendor',
  MENTOR: 'mentor',
  MODERATOR: 'moderator',
} as const;

export type ApplicationType = typeof APPLICATION_TYPE[keyof typeof APPLICATION_TYPE];
