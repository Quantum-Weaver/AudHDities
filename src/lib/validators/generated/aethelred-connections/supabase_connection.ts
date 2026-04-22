// =====================================================
// FILE: lib/validators/generated/aethelred-connections/supabase_connection.ts
// HANDLING: full_crud
// GENERATED: 2026-04-22T04:38:06.343Z
// SOURCE: database.types.ts (via Tables helper)
// =====================================================

import { z } from 'zod';
import type { SupabaseConnectionRow, SupabaseConnectionInsert, SupabaseConnectionUpdate } from '@/types/generated/aethelred-connections/supabase_connection';

// =====================================================
// SCHEMAS (inferred from types)
// =====================================================
// These schemas use type assertion to ensure type safety.

export const SupabaseConnectionRowSchema: z.ZodType<SupabaseConnectionRow> = z.any();
export const SupabaseConnectionInsertSchema: z.ZodType<SupabaseConnectionInsert> = z.any();
export const SupabaseConnectionUpdateSchema: z.ZodType<SupabaseConnectionUpdate> = z.any();

// =====================================================
// RUNTIME SCHEMAS (for actual validation)
// =====================================================
// Customize these schemas based on your table's fields.

export const SupabaseConnectionRuntimeSchema = z.object({
  id: z.string().uuid(),
  created_at: z.string().datetime(),
  updated_at: z.string().datetime().nullable(),
  // TODO: Add your table-specific fields here
});

export type SupabaseConnectionRuntimeInput = z.infer<typeof SupabaseConnectionRuntimeSchema>;

// =====================================================
// VALIDATION UTILITIES
// =====================================================

/**
 * Validate a full supabase_connection row
 */
export function validateSupabaseConnectionRow(data: unknown): data is SupabaseConnectionRow {
  try {
    SupabaseConnectionRowSchema.parse(data);
    return true;
  } catch {
    return false;
  }
}

/**
 * Validate a supabase_connection insert
 */
export function validateSupabaseConnectionInsert(data: unknown): data is SupabaseConnectionInsert {
  try {
    SupabaseConnectionInsertSchema.parse(data);
    return true;
  } catch {
    return false;
  }
}

/**
 * Validate a supabase_connection update
 */
export function validateSupabaseConnectionUpdate(data: unknown): data is SupabaseConnectionUpdate {
  try {
    SupabaseConnectionUpdateSchema.parse(data);
    return true;
  } catch {
    return false;
  }
}
