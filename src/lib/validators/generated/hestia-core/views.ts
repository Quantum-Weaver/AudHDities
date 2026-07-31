// =====================================================
// FILE: validators/views.ts
// GENERATED FROM: database.types.ts
// =====================================================

import z from 'zod';

// =====================================================
// Views SCHEMAS
// =====================================================

export const ViewsRowSchema = z.object({
  archived_at: z.string().nullable(),
  created_at: z.string(),
  created_by: z.string().nullable(),
  definition: z.string().nullable(),
  description: z.string().nullable(),
  id: z.string(),
  is_active: z.boolean(),
  last_seen_at: z.string().nullable(),
  log: z.any(),
  name: z.string(),
  updated_at: z.string(),
});

export const ViewsInsertSchema = z.object({
  archived_at: z.string().nullable().optional(),
  created_at: z.string().optional(),
  created_by: z.string().nullable().optional(),
  definition: z.string().nullable().optional(),
  description: z.string().nullable().optional(),
  id: z.string().optional(),
  is_active: z.boolean().optional(),
  last_seen_at: z.string().nullable().optional(),
  log: z.any().optional(),
  name: z.string(),
  updated_at: z.string().optional(),
});

export const ViewsUpdateSchema = z.object({
  archived_at: z.string().nullable().optional(),
  created_at: z.string().optional(),
  created_by: z.string().nullable().optional(),
  definition: z.string().nullable().optional(),
  description: z.string().nullable().optional(),
  id: z.string().optional(),
  is_active: z.boolean().optional(),
  last_seen_at: z.string().nullable().optional(),
  log: z.any().optional(),
  name: z.string().optional(),
  updated_at: z.string().optional(),
});

// =====================================================
// TYPE INFERENCE
// =====================================================

export type ViewsRowInput = z.infer<typeof ViewsRowSchema>;
export type ViewsInsertInput = z.infer<typeof ViewsInsertSchema>;
export type ViewsUpdateInput = z.infer<typeof ViewsUpdateSchema>;
