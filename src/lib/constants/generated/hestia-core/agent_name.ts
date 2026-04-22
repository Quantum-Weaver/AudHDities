// =====================================================
// FILE: constants/generated/hestia-core/agent_name.ts
// GENERATED: 2026-04-22T18:24:20.250Z
// SOURCE: Constants.public.Enums.agent_name
// VALUES: 11 entries
// =====================================================

export const AGENT_NAME = {
  AETHELRED: 'aethelred',
  SEER: 'seer',
  SKALD: 'skald',
  ARCHIVIST: 'archivist',
  CHANCELLOR: 'chancellor',
  CURATOR: 'curator',
  EXECUTIONER: 'executioner',
  HEARTH_KEEPER: 'hearth_keeper',
  CODEX: 'codex',
  QUANTUM_WEAVER: 'quantum_weaver',
  SYSTEM: 'system',
} as const;

export type AgentName = typeof AGENT_NAME[keyof typeof AGENT_NAME];
