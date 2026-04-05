// =====================================================
// FILE: constants/deployment_status.ts
// GENERATED: 2026-04-05T19:46:33.419Z
// SOURCE: Constants.public.Enums.deployment_status
// =====================================================

export const DEPLOYMENT_STATUS = {
  SUCCESS: 'success',
  BUILDING: 'building',
  FAILED: 'failed',
} as const;

export type DeploymentStatus = typeof DEPLOYMENT_STATUS[keyof typeof DEPLOYMENT_STATUS];
