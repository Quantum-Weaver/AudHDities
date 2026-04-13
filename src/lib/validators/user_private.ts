// =====================================================
// FILE: validators/generated/user_private.ts
// GENERATED: 2026-04-13T06:13:41.998Z
// SOURCE: database.types.ts
// =====================================================

import { z } from 'zod';

// =====================================================
// UserPrivate SCHEMAS
// =====================================================

export const UserPrivateRowSchema = z.object({
  address: z.any().nullable(),
  created_at: z.string().nullable(),
  created_by: z.string().nullable(),
  crisis_plan: z.string().nullable(),
  date_of_birth: z.string().nullable(),
  emergency_contact: z.any().nullable(),
  government_id: z.string().nullable(),
  id: z.string(),
  legal_name: z.string().nullable(),
  notes: z.string().nullable(),
  phone_number: z.string().nullable(),
  updated_at: z.string().nullable(),
});

export const UserPrivateInsertSchema = z.object({
  address: z.any().nullable().optional(),
  created_at: z.string().nullable().optional(),
  created_by: z.string().nullable().optional(),
  crisis_plan: z.string().nullable().optional(),
  date_of_birth: z.string().nullable().optional(),
  emergency_contact: z.any().nullable().optional(),
  government_id: z.string().nullable().optional(),
  id: z.string().optional(),
  legal_name: z.string().nullable().optional(),
  notes: z.string().nullable().optional(),
  phone_number: z.string().nullable().optional(),
  updated_at: z.string().nullable().optional(),
});

export const UserPrivateUpdateSchema = z.object({
  address: z.any().nullable().optional(),
  created_at: z.string().nullable().optional(),
  created_by: z.string().nullable().optional(),
  crisis_plan: z.string().nullable().optional(),
  date_of_birth: z.string().nullable().optional(),
  emergency_contact: z.any().nullable().optional(),
  government_id: z.string().nullable().optional(),
  id: z.string().optional(),
  legal_name: z.string().nullable().optional(),
  notes: z.string().nullable().optional(),
  phone_number: z.string().nullable().optional(),
  updated_at: z.string().nullable().optional(),
});

// =====================================================
// TYPE INFERENCE
// =====================================================

export type UserPrivateRowInput = z.infer<typeof UserPrivateRowSchema>;
export type UserPrivateInsertInput = z.infer<typeof UserPrivateInsertSchema>;
export type UserPrivateUpdateInput = z.infer<typeof UserPrivateUpdateSchema>;
