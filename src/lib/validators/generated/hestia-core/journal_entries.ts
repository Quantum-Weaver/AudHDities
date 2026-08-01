// =====================================================
// FILE: validators/journal_entries.ts
// GENERATED FROM: database.types.ts
// =====================================================

import { ENUM_VALUES } from '@/types/supabase/enums';
import z from 'zod';

// =====================================================
// JournalEntries SCHEMAS
// =====================================================

export const JournalEntriesRowSchema = z.object({
  body: z.string().nullable(),
  created_at: z.string(),
  created_by: z.string(),
  entry_date: z.string(),
  id: z.string(),
  mood: z.string().nullable(),
  status: z.enum(ENUM_VALUES.contentStatus),
  tags: z.any().nullable(),
  title: z.string().nullable(),
  updated_at: z.string(),
  updated_by: z.string().nullable(),
  visibility: z.string(),
});

export const JournalEntriesInsertSchema = z.object({
  body: z.string().nullable().optional(),
  created_at: z.string().optional(),
  created_by: z.string(),
  entry_date: z.string().optional(),
  id: z.string().optional(),
  mood: z.string().nullable().optional(),
  status: z.enum(ENUM_VALUES.contentStatus).optional(),
  tags: z.any().nullable().optional(),
  title: z.string().nullable().optional(),
  updated_at: z.string().optional(),
  updated_by: z.string().nullable().optional(),
  visibility: z.string().optional(),
});

export const JournalEntriesUpdateSchema = z.object({
  body: z.string().nullable().optional(),
  created_at: z.string().optional(),
  created_by: z.string().optional(),
  entry_date: z.string().optional(),
  id: z.string().optional(),
  mood: z.string().nullable().optional(),
  status: z.enum(ENUM_VALUES.contentStatus).optional(),
  tags: z.any().nullable().optional(),
  title: z.string().nullable().optional(),
  updated_at: z.string().optional(),
  updated_by: z.string().nullable().optional(),
  visibility: z.string().optional(),
});

// =====================================================
// TYPE INFERENCE
// =====================================================

export type JournalEntriesRowInput = z.infer<typeof JournalEntriesRowSchema>;
export type JournalEntriesInsertInput = z.infer<typeof JournalEntriesInsertSchema>;
export type JournalEntriesUpdateInput = z.infer<typeof JournalEntriesUpdateSchema>;
