// =====================================================
// FILE: validators/generated/plutus-economics/ledger.ts
// GENERATED: 2026-04-17T22:45:09.688Z
// SOURCE: database.types.ts
// =====================================================

import { z } from 'zod';

import { LEDGER_ENTITY } from '@/lib/constants/generated/plutus-economics/ledger_entity';
import { LEDGER_ENTRY_TYPE } from '@/lib/constants/generated/plutus-economics/ledger_entry_type';

// =====================================================
// Ledger SCHEMAS
// =====================================================

export const LedgerRowSchema = z.object({
  amount_cents: z.number(),
  created_at: z.string().nullable(),
  created_by: z.string().nullable(),
  description: z.string(),
  entry_type: z.enum(Object.values(LEDGER_ENTRY_TYPE)),
  from_entity: z.enum(Object.values(LEDGER_ENTITY)),
  from_profile_id: z.string().nullable(),
  id: z.string(),
  public_note: z.string().nullable(),
  reference_id: z.string(),
  to_entity: z.enum(Object.values(LEDGER_ENTITY)),
  to_profile_id: z.string().nullable(),
});

export const LedgerInsertSchema = z.object({
  amount_cents: z.number(),
  created_at: z.string().nullable().optional(),
  created_by: z.string().nullable().optional(),
  description: z.string(),
  entry_type: z.enum(Object.values(LEDGER_ENTRY_TYPE)),
  from_entity: z.enum(Object.values(LEDGER_ENTITY)),
  from_profile_id: z.string().nullable().optional(),
  id: z.string().optional(),
  public_note: z.string().nullable().optional(),
  reference_id: z.string(),
  to_entity: z.enum(Object.values(LEDGER_ENTITY)),
  to_profile_id: z.string().nullable().optional(),
});

export const LedgerUpdateSchema = z.object({
  amount_cents: z.number().optional(),
  created_at: z.string().nullable().optional(),
  created_by: z.string().nullable().optional(),
  description: z.string().optional(),
  entry_type: z.enum(Object.values(LEDGER_ENTRY_TYPE)).optional(),
  from_entity: z.enum(Object.values(LEDGER_ENTITY)).optional(),
  from_profile_id: z.string().nullable().optional(),
  id: z.string().optional(),
  public_note: z.string().nullable().optional(),
  reference_id: z.string().optional(),
  to_entity: z.enum(Object.values(LEDGER_ENTITY)).optional(),
  to_profile_id: z.string().nullable().optional(),
});

// =====================================================
// TYPE INFERENCE
// =====================================================

export type LedgerRowInput = z.infer<typeof LedgerRowSchema>;
export type LedgerInsertInput = z.infer<typeof LedgerInsertSchema>;
export type LedgerUpdateInput = z.infer<typeof LedgerUpdateSchema>;
