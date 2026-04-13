// =====================================================
// FILE: constants/hestia-core/boundary_type.ts
// GENERATED: 2026-04-13T16:36:33.079Z
// SOURCE: Constants.public.Enums.boundary_type
// VALUES: 3 entries
// =====================================================

export const BOUNDARY_TYPE = {
  ALLOW: 'allow',
  FORBID: 'forbid',
  RESTRICT: 'restrict',
} as const;

export type BoundaryType = typeof BOUNDARY_TYPE[keyof typeof BOUNDARY_TYPE];
