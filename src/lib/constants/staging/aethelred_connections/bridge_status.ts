// =====================================================
// FILE: constants/bridge_status.ts
// GENERATED: 2026-04-05T18:12:44.940Z
// SOURCE: Constants.public.Enums.bridge_status
// =====================================================

export const BRIDGE_STATUS = {
  ACTIVE: 'active',
  DORMANT: 'dormant',
  TRANSFORMING: 'transforming',
} as const;

export type BridgeStatus = typeof BRIDGE_STATUS[keyof typeof BRIDGE_STATUS];
