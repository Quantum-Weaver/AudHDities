// =====================================================
// FILE: constants/hestia-core/boundary_type.ts
// GENERATED: 2026-04-13T05:55:12.842Z
// SOURCE: Constants.public.Enums.boundary_type
// VALUES: 3 entries
// =====================================================

export const BOUNDARY_TYPE = {
  ALLOW: 'allow',
  FORBID: 'forbid',
  RESTRICT: 'restrict',
} as const;

export type BoundaryType = typeof BOUNDARY_TYPE[keyof typeof BOUNDARY_TYPE];
