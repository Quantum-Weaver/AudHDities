// =====================================================
// FILE: lib/validators/generated/plutus-economics/subscriptions.ts
// HANDLING: join_table
// GENERATED: 2026-04-22T04:38:06.329Z
// SOURCE: database.types.ts (via Tables helper)
// =====================================================

import { z } from 'zod';
import type { SubscriptionsRow, SubscriptionsInsert, SubscriptionsUpdate } from '@/types/generated/plutus-economics/subscriptions';

// =====================================================
// SCHEMAS (inferred from types)
// =====================================================
// These schemas use type assertion to ensure type safety.

export const SubscriptionsRowSchema: z.ZodType<SubscriptionsRow> = z.any();
export const SubscriptionsInsertSchema: z.ZodType<SubscriptionsInsert> = z.any();
export const SubscriptionsUpdateSchema: z.ZodType<SubscriptionsUpdate> = z.any();

// =====================================================
// RUNTIME SCHEMAS (for actual validation)
// =====================================================
// Customize these schemas based on your table's fields.

export const SubscriptionsRuntimeSchema = z.object({
  id: z.string().uuid(),
  created_at: z.string().datetime(),
  updated_at: z.string().datetime().nullable(),
  // TODO: Add your table-specific fields here
});

export type SubscriptionsRuntimeInput = z.infer<typeof SubscriptionsRuntimeSchema>;

// =====================================================
// VALIDATION UTILITIES
// =====================================================

/**
 * Validate a full subscriptions row
 */
export function validateSubscriptionsRow(data: unknown): data is SubscriptionsRow {
  try {
    SubscriptionsRowSchema.parse(data);
    return true;
  } catch {
    return false;
  }
}

/**
 * Validate a subscriptions insert
 */
export function validateSubscriptionsInsert(data: unknown): data is SubscriptionsInsert {
  try {
    SubscriptionsInsertSchema.parse(data);
    return true;
  } catch {
    return false;
  }
}

/**
 * Validate a subscriptions update
 */
export function validateSubscriptionsUpdate(data: unknown): data is SubscriptionsUpdate {
  try {
    SubscriptionsUpdateSchema.parse(data);
    return true;
  } catch {
    return false;
  }
}
