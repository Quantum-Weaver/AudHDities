// =====================================================
// FILE: validators/generated/ledger.ts
// GENERATED: 2026-04-13T06:13:41.975Z
// SOURCE: database.types.ts
// =====================================================

import { z } from 'zod';

// =====================================================
// Ledger SCHEMAS
// =====================================================

export const LedgerRowSchema = z.object({
  amount_cents: z.number(),
  created_at: z.string().nullable(),
  created_by: z.string().nullable(),
  description: z.string(),
  entry_type: z.enum(Object.values(LedgerEntryType)),
  from_entity: z.enum(Object.values(LedgerEntity)),
  from_profile_id: z.string().nullable(),
  id: z.string(),
  public_note: z.string().nullable(),
  reference_id: z.string(),
  to_entity: z.enum(Object.values(LedgerEntity)),
  to_profile_id: z.string().nullable(),
});

export const LedgerInsertSchema = z.object({
  amount_cents: z.number().optional(),
  created_at: z.string().nullable().optional(),
  created_by: z.string().nullable().optional(),
  description: z.string().optional(),
  entry_type: z.enum(Object.values(LedgerEntryType)).optional(),
  from_entity: z.enum(Object.values(LedgerEntity)).optional(),
  from_profile_id: z.string().nullable().optional(),
  id: z.string().optional(),
  public_note: z.string().nullable().optional(),
  reference_id: z.string().optional(),
  to_entity: z.enum(Object.values(LedgerEntity)).optional(),
  to_profile_id: z.string().nullable().optional(),
});

export const LedgerUpdateSchema = z.object({
  amount_cents: z.number().optional(),
  created_at: z.string().nullable().optional(),
  created_by: z.string().nullable().optional(),
  description: z.string().optional(),
  entry_type: z.enum(Object.values(LedgerEntryType)).optional(),
  from_entity: z.enum(Object.values(LedgerEntity)).optional(),
  from_profile_id: z.string().nullable().optional(),
  id: z.string().optional(),
  public_note: z.string().nullable().optional(),
  reference_id: z.string().optional(),
  to_entity: z.enum(Object.values(LedgerEntity)).optional(),
  to_profile_id: z.string().nullable().optional(),
});

// =====================================================
// TYPE INFERENCE
// =====================================================

export type LedgerRowInput = z.infer<typeof LedgerRowSchema>;
export type LedgerInsertInput = z.infer<typeof LedgerInsertSchema>;
export type LedgerUpdateInput = z.infer<typeof LedgerUpdateSchema>;
