// =====================================================
// FILE: constants/generated/prometheus-meta/blueprint_status.ts
// GENERATED: 2026-05-01T15:32:00.042Z
// SOURCE: Constants.public.Enums.blueprint_status
// VALUES: 4 entries
// =====================================================

export const BLUEPRINT_STATUS = {
  DRAFT: 'draft',
  ACTIVE: 'active',
  ARCHIVED: 'archived',
  DEPRECATED: 'deprecated',
} as const;

export type BlueprintStatus = typeof BLUEPRINT_STATUS[keyof typeof BLUEPRINT_STATUS];
