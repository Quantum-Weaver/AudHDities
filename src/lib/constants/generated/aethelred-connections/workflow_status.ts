// =====================================================
// FILE: constants/generated/aethelred-connections/workflow_status.ts
// GENERATED: 2026-05-01T15:32:00.133Z
// SOURCE: Constants.public.Enums.workflow_status
// VALUES: 3 entries
// =====================================================

export const WORKFLOW_STATUS = {
  PASSING: 'passing',
  FAILING: 'failing',
  PENDING: 'pending',
} as const;

export type WorkflowStatus = typeof WORKFLOW_STATUS[keyof typeof WORKFLOW_STATUS];
