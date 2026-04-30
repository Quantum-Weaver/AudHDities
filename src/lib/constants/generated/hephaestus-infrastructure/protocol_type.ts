// =====================================================
// FILE: constants/generated/hephaestus-infrastructure/protocol_type.ts
// GENERATED: 2026-04-30T04:17:48.991Z
// SOURCE: Constants.public.Enums.protocol_type
// VALUES: 7 entries
// =====================================================

export const PROTOCOL_TYPE = {
  SECURITY: 'security',
  INCIDENT: 'incident',
  ESCALATION: 'escalation',
  ONBOARDING: 'onboarding',
  OFFBOARDING: 'offboarding',
  EMERGENCY: 'emergency',
  STANDARD: 'standard',
} as const;

export type ProtocolType = typeof PROTOCOL_TYPE[keyof typeof PROTOCOL_TYPE];
