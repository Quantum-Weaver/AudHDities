// =====================================================
// FILE: constants/generated/hestia-core/agent_activity_status.ts
// GENERATED: 2026-04-22T05:15:36.162Z
// SOURCE: Constants.public.Enums.agent_activity_status
// VALUES: 6 entries
// =====================================================

export const AGENT_ACTIVITY_STATUS = {
  ACTIVE: 'active',
  IDLE: 'idle',
  PROCESSING: 'processing',
  COMPLETED: 'completed',
  FAILED: 'failed',
  QUEUED: 'queued',
} as const;

export type AgentActivityStatus = typeof AGENT_ACTIVITY_STATUS[keyof typeof AGENT_ACTIVITY_STATUS];
