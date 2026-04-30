// =====================================================
// FILE: validators/journal_entries.ts
// GENERATED FROM: database.types.ts
// =====================================================

import z from 'zod';

// =====================================================
// JournalEntries SCHEMAS
// =====================================================

export const JournalEntriesRowSchema = z.object({
  content: z.string(),
  created_at: z.string().nullable(),
  created_by: z.string().nullable(),
  journal_entries_id: z.string(),
  mood: z.string().nullable(),
  slug: z.string(),
  tags: z.any().nullable(),
  title: z.string(),
  updated_at: z.string().nullable(),
  updated_by: z.string().nullable(),
  user_id: z.string(),
});

export const JournalEntriesInsertSchema = z.object({
  content: z.string(),
  created_at: z.string().nullable().optional(),
  created_by: z.string().nullable().optional(),
  journal_entries_id: z.string().optional(),
  mood: z.string().nullable().optional(),
  slug: z.string(),
  tags: z.any().nullable().optional(),
  title: z.string(),
  updated_at: z.string().nullable().optional(),
  updated_by: z.string().nullable().optional(),
  user_id: z.string(),
});

export const JournalEntriesUpdateSchema = z.object({
  content: z.string().optional(),
  created_at: z.string().nullable().optional(),
  created_by: z.string().nullable().optional(),
  journal_entries_id: z.string().optional(),
  mood: z.string().nullable().optional(),
  slug: z.string().optional(),
  tags: z.any().nullable().optional(),
  title: z.string().optional(),
  updated_at: z.string().nullable().optional(),
  updated_by: z.string().nullable().optional(),
  user_id: z.string().optional(),
});

// =====================================================
// TYPE INFERENCE
// =====================================================

export type JournalEntriesRowInput = z.infer<typeof JournalEntriesRowSchema>;
export type JournalEntriesInsertInput = z.infer<typeof JournalEntriesInsertSchema>;
export type JournalEntriesUpdateInput = z.infer<typeof JournalEntriesUpdateSchema>;
