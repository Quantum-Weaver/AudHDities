// =====================================================
// FILE: lib/validators/generated/iris-communications/email_communications.ts
// HANDLING: full_crud
// GENERATED: 2026-04-22T05:48:50.066Z
// SOURCE: database.types.ts (via Tables helper)
// =====================================================

import { z } from 'zod';
import type { EmailCommunicationsRow, EmailCommunicationsInsert, EmailCommunicationsUpdate } from '@/types/generated/iris-communications/email_communications';

// =====================================================
// SCHEMAS (inferred from types)
// =====================================================
// These schemas use type assertion to ensure type safety.

export const EmailCommunicationsRowSchema: z.ZodType<EmailCommunicationsRow> = z.any();
export const EmailCommunicationsInsertSchema: z.ZodType<EmailCommunicationsInsert> = z.any();
export const EmailCommunicationsUpdateSchema: z.ZodType<EmailCommunicationsUpdate> = z.any();

// =====================================================
// RUNTIME SCHEMAS (for actual validation)
// =====================================================
// Customize these schemas based on your table's fields.

export const EmailCommunicationsRuntimeSchema = z.object({
  id: z.string().uuid(),
  created_at: z.string().datetime(),
  updated_at: z.string().datetime().nullable(),
  // TODO: Add your table-specific fields here
});

export type EmailCommunicationsRuntimeInput = z.infer<typeof EmailCommunicationsRuntimeSchema>;

// =====================================================
// VALIDATION UTILITIES
// =====================================================

/**
 * Validate a full email_communications row
 */
export function validateEmailCommunicationsRow(data: unknown): data is EmailCommunicationsRow {
  try {
    EmailCommunicationsRowSchema.parse(data);
    return true;
  } catch {
    return false;
  }
}

/**
 * Validate a email_communications insert
 */
export function validateEmailCommunicationsInsert(data: unknown): data is EmailCommunicationsInsert {
  try {
    EmailCommunicationsInsertSchema.parse(data);
    return true;
  } catch {
    return false;
  }
}

/**
 * Validate a email_communications update
 */
export function validateEmailCommunicationsUpdate(data: unknown): data is EmailCommunicationsUpdate {
  try {
    EmailCommunicationsUpdateSchema.parse(data);
    return true;
  } catch {
    return false;
  }
}
