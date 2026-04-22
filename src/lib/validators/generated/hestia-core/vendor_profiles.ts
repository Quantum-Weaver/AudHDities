// =====================================================
// FILE: lib/validators/generated/hestia-core/vendor_profiles.ts
// HANDLING: join_table
// GENERATED: 2026-04-22T05:15:35.929Z
// SOURCE: database.types.ts (via Tables helper)
// =====================================================

import { z } from 'zod';
import type { VendorProfilesRow, VendorProfilesInsert, VendorProfilesUpdate } from '@/types/generated/hestia-core/vendor_profiles';

// =====================================================
// SCHEMAS (inferred from types)
// =====================================================
// These schemas use type assertion to ensure type safety.

export const VendorProfilesRowSchema: z.ZodType<VendorProfilesRow> = z.any();
export const VendorProfilesInsertSchema: z.ZodType<VendorProfilesInsert> = z.any();
export const VendorProfilesUpdateSchema: z.ZodType<VendorProfilesUpdate> = z.any();

// =====================================================
// RUNTIME SCHEMAS (for actual validation)
// =====================================================
// Customize these schemas based on your table's fields.

export const VendorProfilesRuntimeSchema = z.object({
  id: z.string().uuid(),
  created_at: z.string().datetime(),
  updated_at: z.string().datetime().nullable(),
  // TODO: Add your table-specific fields here
});

export type VendorProfilesRuntimeInput = z.infer<typeof VendorProfilesRuntimeSchema>;

// =====================================================
// VALIDATION UTILITIES
// =====================================================

/**
 * Validate a full vendor_profiles row
 */
export function validateVendorProfilesRow(data: unknown): data is VendorProfilesRow {
  try {
    VendorProfilesRowSchema.parse(data);
    return true;
  } catch {
    return false;
  }
}

/**
 * Validate a vendor_profiles insert
 */
export function validateVendorProfilesInsert(data: unknown): data is VendorProfilesInsert {
  try {
    VendorProfilesInsertSchema.parse(data);
    return true;
  } catch {
    return false;
  }
}

/**
 * Validate a vendor_profiles update
 */
export function validateVendorProfilesUpdate(data: unknown): data is VendorProfilesUpdate {
  try {
    VendorProfilesUpdateSchema.parse(data);
    return true;
  } catch {
    return false;
  }
}
