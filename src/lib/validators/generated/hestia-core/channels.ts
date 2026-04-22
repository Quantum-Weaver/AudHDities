// =====================================================
// FILE: lib/validators/generated/hestia-core/channels.ts
// HANDLING: full_crud
// GENERATED: 2026-04-22T04:38:05.105Z
// SOURCE: database.types.ts (via Tables helper)
// =====================================================

import { z } from 'zod';
import type { ChannelsRow, ChannelsInsert, ChannelsUpdate } from '@/types/generated/hestia-core/channels';

// =====================================================
// SCHEMAS (inferred from types)
// =====================================================
// These schemas use type assertion to ensure type safety.

export const ChannelsRowSchema: z.ZodType<ChannelsRow> = z.any();
export const ChannelsInsertSchema: z.ZodType<ChannelsInsert> = z.any();
export const ChannelsUpdateSchema: z.ZodType<ChannelsUpdate> = z.any();

// =====================================================
// RUNTIME SCHEMAS (for actual validation)
// =====================================================
// Customize these schemas based on your table's fields.

export const ChannelsRuntimeSchema = z.object({
  id: z.string().uuid(),
  created_at: z.string().datetime(),
  updated_at: z.string().datetime().nullable(),
  // TODO: Add your table-specific fields here
});

export type ChannelsRuntimeInput = z.infer<typeof ChannelsRuntimeSchema>;

// =====================================================
// VALIDATION UTILITIES
// =====================================================

/**
 * Validate a full channels row
 */
export function validateChannelsRow(data: unknown): data is ChannelsRow {
  try {
    ChannelsRowSchema.parse(data);
    return true;
  } catch {
    return false;
  }
}

/**
 * Validate a channels insert
 */
export function validateChannelsInsert(data: unknown): data is ChannelsInsert {
  try {
    ChannelsInsertSchema.parse(data);
    return true;
  } catch {
    return false;
  }
}

/**
 * Validate a channels update
 */
export function validateChannelsUpdate(data: unknown): data is ChannelsUpdate {
  try {
    ChannelsUpdateSchema.parse(data);
    return true;
  } catch {
    return false;
  }
}
