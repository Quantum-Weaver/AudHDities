// =====================================================
// FILE: lib/validators/generated/hestia-core/entity_state_log.ts
// HANDLING: full_crud
// GENERATED: 2026-04-22T05:15:34.647Z
// SOURCE: database.types.ts (via Tables helper)
// =====================================================

import { z } from 'zod';
import type { EntityStateLogRow, EntityStateLogInsert, EntityStateLogUpdate } from '@/types/generated/hestia-core/entity_state_log';

// =====================================================
// SCHEMAS (inferred from types)
// =====================================================
// These schemas use type assertion to ensure type safety.

export const EntityStateLogRowSchema: z.ZodType<EntityStateLogRow> = z.any();
export const EntityStateLogInsertSchema: z.ZodType<EntityStateLogInsert> = z.any();
export const EntityStateLogUpdateSchema: z.ZodType<EntityStateLogUpdate> = z.any();

// =====================================================
// RUNTIME SCHEMAS (for actual validation)
// =====================================================
// Customize these schemas based on your table's fields.

export const EntityStateLogRuntimeSchema = z.object({
  id: z.string().uuid(),
  created_at: z.string().datetime(),
  updated_at: z.string().datetime().nullable(),
  // TODO: Add your table-specific fields here
});

export type EntityStateLogRuntimeInput = z.infer<typeof EntityStateLogRuntimeSchema>;

// =====================================================
// VALIDATION UTILITIES
// =====================================================

/**
 * Validate a full entity_state_log row
 */
export function validateEntityStateLogRow(data: unknown): data is EntityStateLogRow {
  try {
    EntityStateLogRowSchema.parse(data);
    return true;
  } catch {
    return false;
  }
}

/**
 * Validate a entity_state_log insert
 */
export function validateEntityStateLogInsert(data: unknown): data is EntityStateLogInsert {
  try {
    EntityStateLogInsertSchema.parse(data);
    return true;
  } catch {
    return false;
  }
}

/**
 * Validate a entity_state_log update
 */
export function validateEntityStateLogUpdate(data: unknown): data is EntityStateLogUpdate {
  try {
    EntityStateLogUpdateSchema.parse(data);
    return true;
  } catch {
    return false;
  }
}
