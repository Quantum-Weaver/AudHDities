// =====================================================
// FILE: constants/generated/aethelred-connections/workflow_status.ts
// GENERATED: 2026-04-13T21:47:20.924Z
// SOURCE: Constants.public.Enums.workflow_status
// =====================================================

export const WORKFLOW_STATUS = {
  PASSING: 'passing',
  FAILING: 'failing',
  PENDING: 'pending',
} as const;

export type WorkflowStatus = typeof WORKFLOW_STATUS[keyof typeof WORKFLOW_STATUS];