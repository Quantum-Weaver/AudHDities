// =====================================================
// FILE: constants/generated/themis-governance/application_type.ts
// GENERATED: 2026-07-31T00:35:01.951Z
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
