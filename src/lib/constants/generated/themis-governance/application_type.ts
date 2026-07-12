// =====================================================
// FILE: constants/generated/themis-governance/application_type.ts
// GENERATED: 2026-07-10T18:15:00.026Z
// SOURCE: Constants.public.Enums.application_type
// VALUES: 4 entries
// =====================================================

export const APPLICATION_TYPE = {
  CREATOR: 'creator',
  VENDOR: 'vendor',
  CURATOR: 'curator',
  COUNCIL: 'council',
} as const;

export type ApplicationType = typeof APPLICATION_TYPE[keyof typeof APPLICATION_TYPE];
