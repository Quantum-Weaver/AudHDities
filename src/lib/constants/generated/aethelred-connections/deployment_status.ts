// =====================================================
// FILE: constants/generated/aethelred-connections/deployment_status.ts
// GENERATED: 2026-04-23T02:14:54.104Z
// SOURCE: Constants.public.Enums.deployment_status
// VALUES: 3 entries
// =====================================================

export const DEPLOYMENT_STATUS = {
  SUCCESS: 'success',
  BUILDING: 'building',
  FAILED: 'failed',
} as const;

export type DeploymentStatus = typeof DEPLOYMENT_STATUS[keyof typeof DEPLOYMENT_STATUS];
