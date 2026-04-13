// =====================================================
// FILE: constants/generated/prometheus-meta/blueprint_status.ts
// GENERATED: 2026-04-13T21:55:48.466Z
// SOURCE: Constants.public.Enums.blueprint_status
// =====================================================

export const BLUEPRINT_STATUS = {
  DRAFT: 'draft',
  ACTIVE: 'active',
  ARCHIVED: 'archived',
  DEPRECATED: 'deprecated',
} as const;

export type BlueprintStatus = typeof BLUEPRINT_STATUS[keyof typeof BLUEPRINT_STATUS];