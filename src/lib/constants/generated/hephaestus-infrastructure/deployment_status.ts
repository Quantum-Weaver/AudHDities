// =====================================================
// FILE: constants/hephaestus-infrastructure/deployment_status.ts
// GENERATED: 2026-04-13T16:36:33.082Z
// SOURCE: Constants.public.Enums.deployment_status
// VALUES: 3 entries
// =====================================================

export const DEPLOYMENT_STATUS = {
  SUCCESS: 'success',
  BUILDING: 'building',
  FAILED: 'failed',
} as const;

export type DeploymentStatus = typeof DEPLOYMENT_STATUS[keyof typeof DEPLOYMENT_STATUS];
