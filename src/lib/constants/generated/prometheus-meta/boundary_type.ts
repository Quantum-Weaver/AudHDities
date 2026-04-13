// =====================================================
// FILE: constants/generated/prometheus-meta/boundary_type.ts
// GENERATED: 2026-04-13T21:55:48.467Z
// SOURCE: Constants.public.Enums.boundary_type
// =====================================================

export const BOUNDARY_TYPE = {
  ALLOW: 'allow',
  FORBID: 'forbid',
  RESTRICT: 'restrict',
} as const;

export type BoundaryType = typeof BOUNDARY_TYPE[keyof typeof BOUNDARY_TYPE];