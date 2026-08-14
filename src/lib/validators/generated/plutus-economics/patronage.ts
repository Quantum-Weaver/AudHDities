// =====================================================
// FILE: validators/patronage.ts
// GENERATED FROM: database.types.ts
// =====================================================

import z from 'zod';

// =====================================================
// Patronage SCHEMAS
// =====================================================

export const PatronageRowSchema = z.object({
  artisan_id: z.string(),
  created_at: z.string(),
  id: z.string(),
  notes: z.string().nullable(),
  patron_id: z.string(),
  started_at: z.string(),
  tier: z.string().nullable(),
  updated_at: z.string(),
});

export const PatronageInsertSchema = z.object({
  artisan_id: z.string(),
  created_at: z.string().optional(),
  id: z.string().optional(),
  notes: z.string().nullable().optional(),
  patron_id: z.string(),
  started_at: z.string().optional(),
  tier: z.string().nullable().optional(),
  updated_at: z.string().optional(),
});

export const PatronageUpdateSchema = z.object({
  artisan_id: z.string().optional(),
  created_at: z.string().optional(),
  id: z.string().optional(),
  notes: z.string().nullable().optional(),
  patron_id: z.string().optional(),
  started_at: z.string().optional(),
  tier: z.string().nullable().optional(),
  updated_at: z.string().optional(),
});

// =====================================================
// TYPE INFERENCE
// =====================================================

export type PatronageRowInput = z.infer<typeof PatronageRowSchema>;
export type PatronageInsertInput = z.infer<typeof PatronageInsertSchema>;
export type PatronageUpdateInput = z.infer<typeof PatronageUpdateSchema>;
