// =====================================================
// FILE: lib/validators/generated/hephaestus-infrastructure/protocols.ts
// HANDLING: full_crud
// GENERATED: 2026-04-22T04:38:05.963Z
// SOURCE: database.types.ts (via Tables helper)
// =====================================================

import { z } from 'zod';
import type { ProtocolsRow, ProtocolsInsert, ProtocolsUpdate } from '@/types/generated/hephaestus-infrastructure/protocols';

// =====================================================
// SCHEMAS (inferred from types)
// =====================================================
// These schemas use type assertion to ensure type safety.

export const ProtocolsRowSchema: z.ZodType<ProtocolsRow> = z.any();
export const ProtocolsInsertSchema: z.ZodType<ProtocolsInsert> = z.any();
export const ProtocolsUpdateSchema: z.ZodType<ProtocolsUpdate> = z.any();

// =====================================================
// RUNTIME SCHEMAS (for actual validation)
// =====================================================
// Customize these schemas based on your table's fields.

export const ProtocolsRuntimeSchema = z.object({
  id: z.string().uuid(),
  created_at: z.string().datetime(),
  updated_at: z.string().datetime().nullable(),
  // TODO: Add your table-specific fields here
});

export type ProtocolsRuntimeInput = z.infer<typeof ProtocolsRuntimeSchema>;

// =====================================================
// VALIDATION UTILITIES
// =====================================================

/**
 * Validate a full protocols row
 */
export function validateProtocolsRow(data: unknown): data is ProtocolsRow {
  try {
    ProtocolsRowSchema.parse(data);
    return true;
  } catch {
    return false;
  }
}

/**
 * Validate a protocols insert
 */
export function validateProtocolsInsert(data: unknown): data is ProtocolsInsert {
  try {
    ProtocolsInsertSchema.parse(data);
    return true;
  } catch {
    return false;
  }
}

/**
 * Validate a protocols update
 */
export function validateProtocolsUpdate(data: unknown): data is ProtocolsUpdate {
  try {
    ProtocolsUpdateSchema.parse(data);
    return true;
  } catch {
    return false;
  }
}
