// =====================================================
// FILE: constants/generated/hestia-core/protocol_type.ts
// GENERATED: 2026-04-14T20:18:57.663Z
// SOURCE: Constants.public.Enums.protocol_type
// VALUES: 6 entries
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
