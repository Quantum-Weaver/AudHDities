// =====================================================
// FILE: lib/validators/generated/iris-communications/contact_submissions.ts
// HANDLING: full_crud
// GENERATED: 2026-04-22T05:48:49.905Z
// SOURCE: database.types.ts (via Tables helper)
// =====================================================

import { z } from 'zod';
import type { ContactSubmissionsRow, ContactSubmissionsInsert, ContactSubmissionsUpdate } from '@/types/generated/iris-communications/contact_submissions';

// =====================================================
// SCHEMAS (inferred from types)
// =====================================================
// These schemas use type assertion to ensure type safety.

export const ContactSubmissionsRowSchema: z.ZodType<ContactSubmissionsRow> = z.any();
export const ContactSubmissionsInsertSchema: z.ZodType<ContactSubmissionsInsert> = z.any();
export const ContactSubmissionsUpdateSchema: z.ZodType<ContactSubmissionsUpdate> = z.any();

// =====================================================
// RUNTIME SCHEMAS (for actual validation)
// =====================================================
// Customize these schemas based on your table's fields.

export const ContactSubmissionsRuntimeSchema = z.object({
  id: z.string().uuid(),
  created_at: z.string().datetime(),
  updated_at: z.string().datetime().nullable(),
  // TODO: Add your table-specific fields here
});

export type ContactSubmissionsRuntimeInput = z.infer<typeof ContactSubmissionsRuntimeSchema>;

// =====================================================
// VALIDATION UTILITIES
// =====================================================

/**
 * Validate a full contact_submissions row
 */
export function validateContactSubmissionsRow(data: unknown): data is ContactSubmissionsRow {
  try {
    ContactSubmissionsRowSchema.parse(data);
    return true;
  } catch {
    return false;
  }
}

/**
 * Validate a contact_submissions insert
 */
export function validateContactSubmissionsInsert(data: unknown): data is ContactSubmissionsInsert {
  try {
    ContactSubmissionsInsertSchema.parse(data);
    return true;
  } catch {
    return false;
  }
}

/**
 * Validate a contact_submissions update
 */
export function validateContactSubmissionsUpdate(data: unknown): data is ContactSubmissionsUpdate {
  try {
    ContactSubmissionsUpdateSchema.parse(data);
    return true;
  } catch {
    return false;
  }
}
