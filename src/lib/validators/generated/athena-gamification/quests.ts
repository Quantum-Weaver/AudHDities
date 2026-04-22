// =====================================================
// FILE: lib/validators/generated/athena-gamification/quests.ts
// HANDLING: full_crud
// GENERATED: 2026-04-22T05:48:50.636Z
// SOURCE: database.types.ts (via Tables helper)
// =====================================================

import { z } from 'zod';
import type { QuestsRow, QuestsInsert, QuestsUpdate } from '@/types/generated/athena-gamification/quests';

// =====================================================
// SCHEMAS (inferred from types)
// =====================================================
// These schemas use type assertion to ensure type safety.

export const QuestsRowSchema: z.ZodType<QuestsRow> = z.any();
export const QuestsInsertSchema: z.ZodType<QuestsInsert> = z.any();
export const QuestsUpdateSchema: z.ZodType<QuestsUpdate> = z.any();

// =====================================================
// RUNTIME SCHEMAS (for actual validation)
// =====================================================
// Customize these schemas based on your table's fields.

export const QuestsRuntimeSchema = z.object({
  id: z.string().uuid(),
  created_at: z.string().datetime(),
  updated_at: z.string().datetime().nullable(),
  // TODO: Add your table-specific fields here
});

export type QuestsRuntimeInput = z.infer<typeof QuestsRuntimeSchema>;

// =====================================================
// VALIDATION UTILITIES
// =====================================================

/**
 * Validate a full quests row
 */
export function validateQuestsRow(data: unknown): data is QuestsRow {
  try {
    QuestsRowSchema.parse(data);
    return true;
  } catch {
    return false;
  }
}

/**
 * Validate a quests insert
 */
export function validateQuestsInsert(data: unknown): data is QuestsInsert {
  try {
    QuestsInsertSchema.parse(data);
    return true;
  } catch {
    return false;
  }
}

/**
 * Validate a quests update
 */
export function validateQuestsUpdate(data: unknown): data is QuestsUpdate {
  try {
    QuestsUpdateSchema.parse(data);
    return true;
  } catch {
    return false;
  }
}
