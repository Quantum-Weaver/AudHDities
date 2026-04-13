// =====================================================
// FILE: constants/plutus-economics/contribution_type.ts
// GENERATED: 2026-04-13T16:36:33.081Z
// SOURCE: Constants.public.Enums.contribution_type
// VALUES: 7 entries
// =====================================================

export const CONTRIBUTION_TYPE = {
  CONCEPT: 'concept',
  CODE: 'code',
  DESIGN: 'design',
  CONTENT: 'content',
  TESTING: 'testing',
  PROMOTION: 'promotion',
  INFRASTRUCTURE: 'infrastructure',
} as const;

export type ContributionType = typeof CONTRIBUTION_TYPE[keyof typeof CONTRIBUTION_TYPE];
