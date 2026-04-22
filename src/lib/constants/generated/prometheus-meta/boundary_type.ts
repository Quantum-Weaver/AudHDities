// =====================================================
// FILE: constants/generated/prometheus-meta/boundary_type.ts
// GENERATED: 2026-04-22T18:24:20.342Z
// SOURCE: Constants.public.Enums.boundary_type
// VALUES: 3 entries
// =====================================================

export const BOUNDARY_TYPE = {
  ALLOW: 'allow',
  FORBID: 'forbid',
  RESTRICT: 'restrict',
} as const;

export type BoundaryType = typeof BOUNDARY_TYPE[keyof typeof BOUNDARY_TYPE];
