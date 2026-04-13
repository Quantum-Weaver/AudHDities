// =====================================================
// FILE: constants/generated/themis-governance/escalation_target.ts
// GENERATED: 2026-04-13T21:47:20.895Z
// SOURCE: Constants.public.Enums.escalation_target
// =====================================================

export const ESCALATION_TARGET = {
  ADMIN: 'admin',
  COUNCIL: 'council',
  EXECUTIONER: 'executioner',
} as const;

export type EscalationTarget = typeof ESCALATION_TARGET[keyof typeof ESCALATION_TARGET];