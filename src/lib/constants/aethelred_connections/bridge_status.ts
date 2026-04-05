// =====================================================
// FILE: constants/bridge_status.ts
// GENERATED: 2026-04-05T18:10:53.153Z
// SOURCE: Constants.public.Enums.bridge_status
// =====================================================

export const BRIDGE_STATUS = {
  ACTIVE: 'active',
  DORMANT: 'dormant',
  TRANSFORMING: 'transforming',
} as const;

export type BridgeStatus = typeof BRIDGE_STATUS[keyof typeof BRIDGE_STATUS];
