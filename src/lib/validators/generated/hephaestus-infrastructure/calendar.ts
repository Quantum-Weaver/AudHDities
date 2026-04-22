// =====================================================
// FILE: lib/validators/generated/hephaestus-infrastructure/calendar.ts
// HANDLING: full_crud
// GENERATED: 2026-04-22T05:15:34.338Z
// SOURCE: database.types.ts (via Tables helper)
// =====================================================

import { z } from 'zod';
import type { CalendarRow, CalendarInsert, CalendarUpdate } from '@/types/generated/hephaestus-infrastructure/calendar';

// =====================================================
// SCHEMAS (inferred from types)
// =====================================================
// These schemas use type assertion to ensure type safety.

export const CalendarRowSchema: z.ZodType<CalendarRow> = z.any();
export const CalendarInsertSchema: z.ZodType<CalendarInsert> = z.any();
export const CalendarUpdateSchema: z.ZodType<CalendarUpdate> = z.any();

// =====================================================
// RUNTIME SCHEMAS (for actual validation)
// =====================================================
// Customize these schemas based on your table's fields.

export const CalendarRuntimeSchema = z.object({
  id: z.string().uuid(),
  created_at: z.string().datetime(),
  updated_at: z.string().datetime().nullable(),
  // TODO: Add your table-specific fields here
});

export type CalendarRuntimeInput = z.infer<typeof CalendarRuntimeSchema>;

// =====================================================
// VALIDATION UTILITIES
// =====================================================

/**
 * Validate a full calendar row
 */
export function validateCalendarRow(data: unknown): data is CalendarRow {
  try {
    CalendarRowSchema.parse(data);
    return true;
  } catch {
    return false;
  }
}

/**
 * Validate a calendar insert
 */
export function validateCalendarInsert(data: unknown): data is CalendarInsert {
  try {
    CalendarInsertSchema.parse(data);
    return true;
  } catch {
    return false;
  }
}

/**
 * Validate a calendar update
 */
export function validateCalendarUpdate(data: unknown): data is CalendarUpdate {
  try {
    CalendarUpdateSchema.parse(data);
    return true;
  } catch {
    return false;
  }
}
