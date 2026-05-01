// =====================================================
// FILE: validators/skald.ts
// GENERATED FROM: database.types.ts
// =====================================================

import z from 'zod';

// =====================================================
// Skald SCHEMAS
// =====================================================

export const SkaldRowSchema = z.object({
  art_gallery: z.any().nullable(),
  bard_roster: z.any().nullable(),
  created_at: z.string().nullable(),
  created_by: z.string().nullable(),
  inspiring_content: z.any().nullable(),
  music_library: z.any().nullable(),
  mythology: z.any().nullable(),
  skald_id: z.string(),
  story_archive: z.any().nullable(),
  updated_at: z.string().nullable(),
  updated_by: z.string().nullable(),
});

export const SkaldInsertSchema = z.object({
  art_gallery: z.any().nullable().optional(),
  bard_roster: z.any().nullable().optional(),
  created_at: z.string().nullable().optional(),
  created_by: z.string().nullable().optional(),
  inspiring_content: z.any().nullable().optional(),
  music_library: z.any().nullable().optional(),
  mythology: z.any().nullable().optional(),
  skald_id: z.string(),
  story_archive: z.any().nullable().optional(),
  updated_at: z.string().nullable().optional(),
  updated_by: z.string().nullable().optional(),
});

export const SkaldUpdateSchema = z.object({
  art_gallery: z.any().nullable().optional(),
  bard_roster: z.any().nullable().optional(),
  created_at: z.string().nullable().optional(),
  created_by: z.string().nullable().optional(),
  inspiring_content: z.any().nullable().optional(),
  music_library: z.any().nullable().optional(),
  mythology: z.any().nullable().optional(),
  skald_id: z.string().optional(),
  story_archive: z.any().nullable().optional(),
  updated_at: z.string().nullable().optional(),
  updated_by: z.string().nullable().optional(),
});

// =====================================================
// TYPE INFERENCE
// =====================================================

export type SkaldRowInput = z.infer<typeof SkaldRowSchema>;
export type SkaldInsertInput = z.infer<typeof SkaldInsertSchema>;
export type SkaldUpdateInput = z.infer<typeof SkaldUpdateSchema>;
