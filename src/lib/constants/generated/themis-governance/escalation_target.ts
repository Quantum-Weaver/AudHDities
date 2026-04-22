// =====================================================
// FILE: constants/generated/themis-governance/escalation_target.ts
// GENERATED: 2026-04-22T18:15:11.301Z
// SOURCE: Constants.public.Enums.escalation_target
// VALUES: 3 entries
// =====================================================

export const ESCALATION_TARGET = {
  ADMIN: 'admin',
  COUNCIL: 'council',
  EXECUTIONER: 'executioner',
} as const;

export type EscalationTarget = typeof ESCALATION_TARGET[keyof typeof ESCALATION_TARGET];
