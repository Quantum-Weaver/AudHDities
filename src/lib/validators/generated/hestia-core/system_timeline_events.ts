// =====================================================
// FILE: lib/validators/generated/hestia-core/system_timeline_events.ts
// HANDLING: full_crud
// GENERATED: 2026-04-22T05:15:35.783Z
// SOURCE: database.types.ts (via Tables helper)
// =====================================================

import { z } from 'zod';
import type { SystemTimelineEventsRow, SystemTimelineEventsInsert, SystemTimelineEventsUpdate } from '@/types/generated/hestia-core/system_timeline_events';

// =====================================================
// SCHEMAS (inferred from types)
// =====================================================
// These schemas use type assertion to ensure type safety.

export const SystemTimelineEventsRowSchema: z.ZodType<SystemTimelineEventsRow> = z.any();
export const SystemTimelineEventsInsertSchema: z.ZodType<SystemTimelineEventsInsert> = z.any();
export const SystemTimelineEventsUpdateSchema: z.ZodType<SystemTimelineEventsUpdate> = z.any();

// =====================================================
// RUNTIME SCHEMAS (for actual validation)
// =====================================================
// Customize these schemas based on your table's fields.

export const SystemTimelineEventsRuntimeSchema = z.object({
  id: z.string().uuid(),
  created_at: z.string().datetime(),
  updated_at: z.string().datetime().nullable(),
  // TODO: Add your table-specific fields here
});

export type SystemTimelineEventsRuntimeInput = z.infer<typeof SystemTimelineEventsRuntimeSchema>;

// =====================================================
// VALIDATION UTILITIES
// =====================================================

/**
 * Validate a full system_timeline_events row
 */
export function validateSystemTimelineEventsRow(data: unknown): data is SystemTimelineEventsRow {
  try {
    SystemTimelineEventsRowSchema.parse(data);
    return true;
  } catch {
    return false;
  }
}

/**
 * Validate a system_timeline_events insert
 */
export function validateSystemTimelineEventsInsert(data: unknown): data is SystemTimelineEventsInsert {
  try {
    SystemTimelineEventsInsertSchema.parse(data);
    return true;
  } catch {
    return false;
  }
}

/**
 * Validate a system_timeline_events update
 */
export function validateSystemTimelineEventsUpdate(data: unknown): data is SystemTimelineEventsUpdate {
  try {
    SystemTimelineEventsUpdateSchema.parse(data);
    return true;
  } catch {
    return false;
  }
}
