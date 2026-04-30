// =====================================================
// FILE: constants/generated/hestia-core/agent_action_type.ts
// GENERATED: 2026-04-30T04:17:48.781Z
// SOURCE: Constants.public.Enums.agent_action_type
// VALUES: 10 entries
// =====================================================

export const AGENT_ACTION_TYPE = {
  ANALYZE: 'analyze',
  CREATE: 'create',
  UPDATE: 'update',
  DELETE: 'delete',
  COMMUNICATE: 'communicate',
  TRANSFORM: 'transform',
  INTEGRATE: 'integrate',
  ORCHESTRATE: 'orchestrate',
  OBSERVE: 'observe',
  RESPOND: 'respond',
} as const;

export type AgentActionType = typeof AGENT_ACTION_TYPE[keyof typeof AGENT_ACTION_TYPE];
