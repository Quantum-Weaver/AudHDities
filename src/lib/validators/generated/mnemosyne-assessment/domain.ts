// =====================================================
// FILE: validators/domain.ts
// GENERATED FROM: database.types.ts
// =====================================================

import z from 'zod';

// =====================================================
// Domain SCHEMAS
// =====================================================

export const DomainRowSchema = z.object({
  created_at: z.string(),
  created_by: z.string().nullable(),
  deity_name: z.string().nullable(),
  description: z.string().nullable(),
  id: z.string(),
  keyword_id: z.string().nullable(),
  name: z.string(),
  temperature: z.number().nullable(),
  updated_at: z.string(),
  updated_by: z.string().nullable(),
});

export const DomainInsertSchema = z.object({
  created_at: z.string().optional(),
  created_by: z.string().nullable().optional(),
  deity_name: z.string().nullable().optional(),
  description: z.string().nullable().optional(),
  id: z.string().optional(),
  keyword_id: z.string().nullable().optional(),
  name: z.string(),
  temperature: z.number().nullable().optional(),
  updated_at: z.string().optional(),
  updated_by: z.string().nullable().optional(),
});

export const DomainUpdateSchema = z.object({
  created_at: z.string().optional(),
  created_by: z.string().nullable().optional(),
  deity_name: z.string().nullable().optional(),
  description: z.string().nullable().optional(),
  id: z.string().optional(),
  keyword_id: z.string().nullable().optional(),
  name: z.string().optional(),
  temperature: z.number().nullable().optional(),
  updated_at: z.string().optional(),
  updated_by: z.string().nullable().optional(),
});

// =====================================================
// TYPE INFERENCE
// =====================================================

export type DomainRowInput = z.infer<typeof DomainRowSchema>;
export type DomainInsertInput = z.infer<typeof DomainInsertSchema>;
export type DomainUpdateInput = z.infer<typeof DomainUpdateSchema>;
