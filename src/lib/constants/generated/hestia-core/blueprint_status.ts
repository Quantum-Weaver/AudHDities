// =====================================================
// FILE: constants/generated/hestia-core/blueprint_status.ts
// GENERATED: 2026-04-14T20:18:57.632Z
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
