// =====================================================
// FILE: constants/generated/aethelred-connections/workflow_status.ts
// GENERATED: 2026-04-30T04:17:49.090Z
// SOURCE: Constants.public.Enums.workflow_status
// VALUES: 3 entries
// =====================================================

export const WORKFLOW_STATUS = {
  PASSING: 'passing',
  FAILING: 'failing',
  PENDING: 'pending',
} as const;

export type WorkflowStatus = typeof WORKFLOW_STATUS[keyof typeof WORKFLOW_STATUS];
