// =====================================================
// FILE: constants/protocol_type.ts
// GENERATED: 2026-04-05T18:12:45.090Z
// SOURCE: Constants.public.Enums.protocol_type
// =====================================================

export const PROTOCOL_TYPE = {
  SECURITY: 'security',
  INCIDENT: 'incident',
  ESCALATION: 'escalation',
  ONBOARDING: 'onboarding',
  OFFBOARDING: 'offboarding',
  EMERGENCY: 'emergency',
} as const;

export type ProtocolType = typeof PROTOCOL_TYPE[keyof typeof PROTOCOL_TYPE];
