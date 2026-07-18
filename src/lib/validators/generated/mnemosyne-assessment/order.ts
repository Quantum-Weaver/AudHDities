// =====================================================
// FILE: validators/order.ts
// GENERATED FROM: database.types.ts
// =====================================================

import z from 'zod';

// =====================================================
// Order SCHEMAS
// =====================================================

export const OrderRowSchema = z.object({
  class_id: z.string().nullable(),
  created_at: z.string(),
  created_by: z.string().nullable(),
  description: z.string().nullable(),
  id: z.string(),
  keyword_id: z.string().nullable(),
  name: z.string(),
  updated_at: z.string(),
  updated_by: z.string().nullable(),
});

export const OrderInsertSchema = z.object({
  class_id: z.string().nullable().optional(),
  created_at: z.string().optional(),
  created_by: z.string().nullable().optional(),
  description: z.string().nullable().optional(),
  id: z.string().optional(),
  keyword_id: z.string().nullable().optional(),
  name: z.string(),
  updated_at: z.string().optional(),
  updated_by: z.string().nullable().optional(),
});

export const OrderUpdateSchema = z.object({
  class_id: z.string().nullable().optional(),
  created_at: z.string().optional(),
  created_by: z.string().nullable().optional(),
  description: z.string().nullable().optional(),
  id: z.string().optional(),
  keyword_id: z.string().nullable().optional(),
  name: z.string().optional(),
  updated_at: z.string().optional(),
  updated_by: z.string().nullable().optional(),
});

// =====================================================
// TYPE INFERENCE
// =====================================================

export type OrderRowInput = z.infer<typeof OrderRowSchema>;
export type OrderInsertInput = z.infer<typeof OrderInsertSchema>;
export type OrderUpdateInput = z.infer<typeof OrderUpdateSchema>;
