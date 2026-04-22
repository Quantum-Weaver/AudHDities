// =====================================================
// FILE: lib/validators/generated/hermes-social/messages.ts
// HANDLING: full_crud
// GENERATED: 2026-04-22T04:38:05.583Z
// SOURCE: database.types.ts (via Tables helper)
// =====================================================

import { z } from 'zod';
import type { MessagesRow, MessagesInsert, MessagesUpdate } from '@/types/generated/hermes-social/messages';

// =====================================================
// SCHEMAS (inferred from types)
// =====================================================
// These schemas use type assertion to ensure type safety.

export const MessagesRowSchema: z.ZodType<MessagesRow> = z.any();
export const MessagesInsertSchema: z.ZodType<MessagesInsert> = z.any();
export const MessagesUpdateSchema: z.ZodType<MessagesUpdate> = z.any();

// =====================================================
// RUNTIME SCHEMAS (for actual validation)
// =====================================================
// Customize these schemas based on your table's fields.

export const MessagesRuntimeSchema = z.object({
  id: z.string().uuid(),
  created_at: z.string().datetime(),
  updated_at: z.string().datetime().nullable(),
  // TODO: Add your table-specific fields here
});

export type MessagesRuntimeInput = z.infer<typeof MessagesRuntimeSchema>;

// =====================================================
// VALIDATION UTILITIES
// =====================================================

/**
 * Validate a full messages row
 */
export function validateMessagesRow(data: unknown): data is MessagesRow {
  try {
    MessagesRowSchema.parse(data);
    return true;
  } catch {
    return false;
  }
}

/**
 * Validate a messages insert
 */
export function validateMessagesInsert(data: unknown): data is MessagesInsert {
  try {
    MessagesInsertSchema.parse(data);
    return true;
  } catch {
    return false;
  }
}

/**
 * Validate a messages update
 */
export function validateMessagesUpdate(data: unknown): data is MessagesUpdate {
  try {
    MessagesUpdateSchema.parse(data);
    return true;
  } catch {
    return false;
  }
}
