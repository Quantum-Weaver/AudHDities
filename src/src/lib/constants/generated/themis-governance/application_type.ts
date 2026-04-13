// =====================================================
// FILE: constants/generated/themis-governance/application_type.ts
// GENERATED: 2026-04-13T21:47:20.879Z
// SOURCE: Constants.public.Enums.application_type
// =====================================================

export const APPLICATION_TYPE = {
  CREATOR: 'creator',
  VENDOR: 'vendor',
  MENTOR: 'mentor',
  MODERATOR: 'moderator',
} as const;

export type ApplicationType = typeof APPLICATION_TYPE[keyof typeof APPLICATION_TYPE];