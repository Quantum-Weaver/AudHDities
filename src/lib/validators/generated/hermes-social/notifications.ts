// =====================================================
// FILE: lib/validators/generated/hermes-social/notifications.ts
// HANDLING: full_crud
// GENERATED: 2026-04-22T04:38:05.709Z
// SOURCE: database.types.ts (via Tables helper)
// =====================================================

import { z } from 'zod';
import type { NotificationsRow, NotificationsInsert, NotificationsUpdate } from '@/types/generated/hermes-social/notifications';

// =====================================================
// SCHEMAS (inferred from types)
// =====================================================
// These schemas use type assertion to ensure type safety.

export const NotificationsRowSchema: z.ZodType<NotificationsRow> = z.any();
export const NotificationsInsertSchema: z.ZodType<NotificationsInsert> = z.any();
export const NotificationsUpdateSchema: z.ZodType<NotificationsUpdate> = z.any();

// =====================================================
// RUNTIME SCHEMAS (for actual validation)
// =====================================================
// Customize these schemas based on your table's fields.

export const NotificationsRuntimeSchema = z.object({
  id: z.string().uuid(),
  created_at: z.string().datetime(),
  updated_at: z.string().datetime().nullable(),
  // TODO: Add your table-specific fields here
});

export type NotificationsRuntimeInput = z.infer<typeof NotificationsRuntimeSchema>;

// =====================================================
// VALIDATION UTILITIES
// =====================================================

/**
 * Validate a full notifications row
 */
export function validateNotificationsRow(data: unknown): data is NotificationsRow {
  try {
    NotificationsRowSchema.parse(data);
    return true;
  } catch {
    return false;
  }
}

/**
 * Validate a notifications insert
 */
export function validateNotificationsInsert(data: unknown): data is NotificationsInsert {
  try {
    NotificationsInsertSchema.parse(data);
    return true;
  } catch {
    return false;
  }
}

/**
 * Validate a notifications update
 */
export function validateNotificationsUpdate(data: unknown): data is NotificationsUpdate {
  try {
    NotificationsUpdateSchema.parse(data);
    return true;
  } catch {
    return false;
  }
}
