// =====================================================
// FILE: constants/generated/hestia-core/content_status.ts
// GENERATED: 2026-08-01T17:46:58.349Z
// SOURCE: Constants.public.Enums.content_status
// VALUES: 3 entries
// =====================================================

export const CONTENT_STATUS = {
  DRAFT: 'draft',
  PUBLISHED: 'published',
  ARCHIVED: 'archived',
} as const;

export type ContentStatus = typeof CONTENT_STATUS[keyof typeof CONTENT_STATUS];
