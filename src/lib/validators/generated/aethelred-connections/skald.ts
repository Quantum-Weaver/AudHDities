// =====================================================
// FILE: validators/generated/aethelred-connections/skald.ts
// GENERATED: 2026-04-15T01:41:08.158Z
// SOURCE: database.types.ts
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
  id: z.string(),
  inspiring_content: z.any().nullable(),
  music_library: z.any().nullable(),
  mythology: z.any().nullable(),
  story_archive: z.any().nullable(),
  updated_at: z.string().nullable(),
});

export const SkaldInsertSchema = z.object({
  art_gallery: z.any().nullable().optional(),
  bard_roster: z.any().nullable().optional(),
  created_at: z.string().nullable().optional(),
  created_by: z.string().nullable().optional(),
  id: z.string().optional(),
  inspiring_content: z.any().nullable().optional(),
  music_library: z.any().nullable().optional(),
  mythology: z.any().nullable().optional(),
  story_archive: z.any().nullable().optional(),
  updated_at: z.string().nullable().optional(),
});

export const SkaldUpdateSchema = z.object({
  art_gallery: z.any().nullable().optional(),
  bard_roster: z.any().nullable().optional(),
  created_at: z.string().nullable().optional(),
  created_by: z.string().nullable().optional(),
  id: z.string().optional(),
  inspiring_content: z.any().nullable().optional(),
  music_library: z.any().nullable().optional(),
  mythology: z.any().nullable().optional(),
  story_archive: z.any().nullable().optional(),
  updated_at: z.string().nullable().optional(),
});

// =====================================================
// TYPE INFERENCE
// =====================================================

export type SkaldRowInput = z.infer<typeof SkaldRowSchema>;
export type SkaldInsertInput = z.infer<typeof SkaldInsertSchema>;
export type SkaldUpdateInput = z.infer<typeof SkaldUpdateSchema>;
