// =====================================================
// FILE: validators/curator.ts
// GENERATED FROM: database.types.ts
// =====================================================

import { z } from 'zod';

// =====================================================
// Curator SCHEMAS
// =====================================================

export const CuratorRowSchema = z.object({
  archived_content: z.any().nullable(),
  collection_themes: z.any().nullable(),
  created_at: z.string().nullable(),
  created_by: z.string().nullable(),
  curation_queue: z.any().nullable(),
  featured_content: z.any().nullable(),
  id: z.string(),
  preservation_policy: z.any().nullable(),
  quality_standards: z.any().nullable(),
  updated_at: z.string().nullable(),
});

export const CuratorInsertSchema = z.object({
  archived_content: z.any().nullable().optional(),
  collection_themes: z.any().nullable().optional(),
  created_at: z.string().nullable().optional(),
  created_by: z.string().nullable().optional(),
  curation_queue: z.any().nullable().optional(),
  featured_content: z.any().nullable().optional(),
  id: z.string().optional(),
  preservation_policy: z.any().nullable().optional(),
  quality_standards: z.any().nullable().optional(),
  updated_at: z.string().nullable().optional(),
});

// =====================================================
// TYPE INFERENCE
// =====================================================

export type CuratorRowInput = z.infer<typeof CuratorRowSchema>;
export type CuratorInsertInput = z.infer<typeof CuratorInsertSchema>;
