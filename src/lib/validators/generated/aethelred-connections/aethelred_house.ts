// =====================================================
// FILE: lib/validators/generated/aethelred-connections/aethelred_house.ts
// HANDLING: full_crud
// GENERATED: 2026-04-22T04:38:04.965Z
// SOURCE: database.types.ts (via Tables helper)
// =====================================================

import { z } from 'zod';
import type { AethelredHouseRow, AethelredHouseInsert, AethelredHouseUpdate } from '@/types/generated/aethelred-connections/aethelred_house';

// =====================================================
// SCHEMAS (inferred from types)
// =====================================================
// These schemas use type assertion to ensure type safety.

export const AethelredHouseRowSchema: z.ZodType<AethelredHouseRow> = z.any();
export const AethelredHouseInsertSchema: z.ZodType<AethelredHouseInsert> = z.any();
export const AethelredHouseUpdateSchema: z.ZodType<AethelredHouseUpdate> = z.any();

// =====================================================
// RUNTIME SCHEMAS (for actual validation)
// =====================================================
// Customize these schemas based on your table's fields.

export const AethelredHouseRuntimeSchema = z.object({
  id: z.string().uuid(),
  created_at: z.string().datetime(),
  updated_at: z.string().datetime().nullable(),
  // TODO: Add your table-specific fields here
});

export type AethelredHouseRuntimeInput = z.infer<typeof AethelredHouseRuntimeSchema>;

// =====================================================
// VALIDATION UTILITIES
// =====================================================

/**
 * Validate a full aethelred_house row
 */
export function validateAethelredHouseRow(data: unknown): data is AethelredHouseRow {
  try {
    AethelredHouseRowSchema.parse(data);
    return true;
  } catch {
    return false;
  }
}

/**
 * Validate a aethelred_house insert
 */
export function validateAethelredHouseInsert(data: unknown): data is AethelredHouseInsert {
  try {
    AethelredHouseInsertSchema.parse(data);
    return true;
  } catch {
    return false;
  }
}

/**
 * Validate a aethelred_house update
 */
export function validateAethelredHouseUpdate(data: unknown): data is AethelredHouseUpdate {
  try {
    AethelredHouseUpdateSchema.parse(data);
    return true;
  } catch {
    return false;
  }
}
