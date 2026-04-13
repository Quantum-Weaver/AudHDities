// =====================================================
// FILE: constants/generated/aethelred-connections/deployment_status.ts
// GENERATED: 2026-04-13T21:47:20.892Z
// SOURCE: Constants.public.Enums.deployment_status
// =====================================================

export const DEPLOYMENT_STATUS = {
  SUCCESS: 'success',
  BUILDING: 'building',
  FAILED: 'failed',
} as const;

export type DeploymentStatus = typeof DEPLOYMENT_STATUS[keyof typeof DEPLOYMENT_STATUS];