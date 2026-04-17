// =====================================================
// FILE: constants/generated/aethelred-connections/workflow_status.ts
// GENERATED: 2026-04-17T17:34:19.640Z
// SOURCE: Constants.public.Enums.workflow_status
// VALUES: 3 entries
// =====================================================

export const WORKFLOW_STATUS = {
  PASSING: 'passing',
  FAILING: 'failing',
  PENDING: 'pending',
} as const;

export type WorkflowStatus = typeof WORKFLOW_STATUS[keyof typeof WORKFLOW_STATUS];
