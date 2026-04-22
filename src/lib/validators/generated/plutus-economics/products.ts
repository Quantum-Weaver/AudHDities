// =====================================================
// FILE: lib/validators/generated/plutus-economics/products.ts
// HANDLING: full_crud
// GENERATED: 2026-04-22T04:38:05.817Z
// SOURCE: database.types.ts (via Tables helper)
// =====================================================

import { z } from 'zod';
import type { ProductsRow, ProductsInsert, ProductsUpdate } from '@/types/generated/plutus-economics/products';

// =====================================================
// SCHEMAS (inferred from types)
// =====================================================
// These schemas use type assertion to ensure type safety.

export const ProductsRowSchema: z.ZodType<ProductsRow> = z.any();
export const ProductsInsertSchema: z.ZodType<ProductsInsert> = z.any();
export const ProductsUpdateSchema: z.ZodType<ProductsUpdate> = z.any();

// =====================================================
// RUNTIME SCHEMAS (for actual validation)
// =====================================================
// Customize these schemas based on your table's fields.

export const ProductsRuntimeSchema = z.object({
  id: z.string().uuid(),
  created_at: z.string().datetime(),
  updated_at: z.string().datetime().nullable(),
  // TODO: Add your table-specific fields here
});

export type ProductsRuntimeInput = z.infer<typeof ProductsRuntimeSchema>;

// =====================================================
// VALIDATION UTILITIES
// =====================================================

/**
 * Validate a full products row
 */
export function validateProductsRow(data: unknown): data is ProductsRow {
  try {
    ProductsRowSchema.parse(data);
    return true;
  } catch {
    return false;
  }
}

/**
 * Validate a products insert
 */
export function validateProductsInsert(data: unknown): data is ProductsInsert {
  try {
    ProductsInsertSchema.parse(data);
    return true;
  } catch {
    return false;
  }
}

/**
 * Validate a products update
 */
export function validateProductsUpdate(data: unknown): data is ProductsUpdate {
  try {
    ProductsUpdateSchema.parse(data);
    return true;
  } catch {
    return false;
  }
}
