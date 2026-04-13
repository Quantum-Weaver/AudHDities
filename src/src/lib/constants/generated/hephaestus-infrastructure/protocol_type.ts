// =====================================================
// FILE: constants/generated/hephaestus-infrastructure/protocol_type.ts
// GENERATED: 2026-04-13T21:47:20.909Z
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