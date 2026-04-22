// =====================================================
// FILE: constants/generated/aethelred-connections/bridge_status.ts
// GENERATED: 2026-04-22T18:24:20.347Z
// SOURCE: Constants.public.Enums.bridge_status
// VALUES: 3 entries
// =====================================================

export const BRIDGE_STATUS = {
  ACTIVE: 'active',
  DORMANT: 'dormant',
  TRANSFORMING: 'transforming',
} as const;

export type BridgeStatus = typeof BRIDGE_STATUS[keyof typeof BRIDGE_STATUS];
