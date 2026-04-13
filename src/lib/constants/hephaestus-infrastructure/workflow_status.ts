// =====================================================
// FILE: constants/hephaestus-infrastructure/workflow_status.ts
// GENERATED: 2026-04-13T01:15:57.373Z
// SOURCE: Constants.public.Enums.workflow_status
// VALUES: 3 entries
// =====================================================

export const WORKFLOW_STATUS = {
  PASSING: 'passing',
  FAILING: 'failing',
  PENDING: 'pending',
} as const;

export type WorkflowStatus = typeof WORKFLOW_STATUS[keyof typeof WORKFLOW_STATUS];
