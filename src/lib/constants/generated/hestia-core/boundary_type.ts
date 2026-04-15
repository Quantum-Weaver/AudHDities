// =====================================================
// FILE: constants/generated/hestia-core/boundary_type.ts
// GENERATED: 2026-04-15T05:16:17.313Z
// SOURCE: Constants.public.Enums.boundary_type
// VALUES: 3 entries
// =====================================================

export const BOUNDARY_TYPE = {
  ALLOW: 'allow',
  FORBID: 'forbid',
  RESTRICT: 'restrict',
} as const;

export type BoundaryType = typeof BOUNDARY_TYPE[keyof typeof BOUNDARY_TYPE];
