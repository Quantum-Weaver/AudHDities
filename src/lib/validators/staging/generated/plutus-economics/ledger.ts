// =====================================================
// FILE: validators/ledger.ts
// GENERATED FROM: database.types.ts
// =====================================================

import { ENUM_VALUES } from '@/types/supabase/enums';
import z from 'zod';

// =====================================================
// Ledger SCHEMAS
// =====================================================

export const LedgerRowSchema = z.object({
  amount_cents: z.number(),
  created_at: z.string().nullable(),
  created_by: z.string().nullable(),
  description: z.string(),
  entry_type: z.enum(ENUM_VALUES.ledgerEntryType),
  from_entity: z.enum(ENUM_VALUES.ledgerEntity),
  from_profile_id: z.string().nullable(),
  id: z.string(),
  public_note: z.string().nullable(),
  reference_id: z.string(),
  to_entity: z.enum(ENUM_VALUES.ledgerEntity),
  to_profile_id: z.string().nullable(),
});

export const LedgerInsertSchema = z.object({
  amount_cents: z.number(),
  created_at: z.string().nullable().optional(),
  created_by: z.string().nullable().optional(),
  description: z.string(),
  entry_type: z.enum(ENUM_VALUES.ledgerEntryType),
  from_entity: z.enum(ENUM_VALUES.ledgerEntity),
  from_profile_id: z.string().nullable().optional(),
  id: z.string().optional(),
  public_note: z.string().nullable().optional(),
  reference_id: z.string(),
  to_entity: z.enum(ENUM_VALUES.ledgerEntity),
  to_profile_id: z.string().nullable().optional(),
});

export const LedgerUpdateSchema = z.object({
  amount_cents: z.number().optional(),
  created_at: z.string().nullable().optional(),
  created_by: z.string().nullable().optional(),
  description: z.string().optional(),
  entry_type: z.enum(ENUM_VALUES.ledgerEntryType).optional(),
  from_entity: z.enum(ENUM_VALUES.ledgerEntity).optional(),
  from_profile_id: z.string().nullable().optional(),
  id: z.string().optional(),
  public_note: z.string().nullable().optional(),
  reference_id: z.string().optional(),
  to_entity: z.enum(ENUM_VALUES.ledgerEntity).optional(),
  to_profile_id: z.string().nullable().optional(),
});

// =====================================================
// TYPE INFERENCE
// =====================================================

export type LedgerRowInput = z.infer<typeof LedgerRowSchema>;
export type LedgerInsertInput = z.infer<typeof LedgerInsertSchema>;
export type LedgerUpdateInput = z.infer<typeof LedgerUpdateSchema>;
