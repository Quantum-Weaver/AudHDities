// =====================================================
// FILE: validators/generated/plutus-economics/residual_pool.ts
// GENERATED: 2026-04-14T19:39:30.111Z
// SOURCE: database.types.ts
// =====================================================

// =====================================================
// ResidualPool SCHEMAS
// =====================================================

export const ResidualPoolRowSchema = z.object({
  "created_at": "z.string().nullable()";
  created_by: z.string().nullable();
  distributed_amount_cents: z.number().nullable();
  "distributed_at": "z.string().nullable()";
  id: z.string();
  product_id: z.string();
  remaining_amount_cents: z.number().nullable();
  sale_id: z.string();
  total_amount_cents: z.number();
  "updated_at": "z.string().nullable()";
});

export const ResidualPoolInsertSchema = z.object({
  "created_at": "z.string().nullable().optional()";
  created_by: z.string().nullable().optional();
  distributed_amount_cents: z.number().nullable().optional();
  "distributed_at": "z.string().nullable().optional()";
  id: z.string().optional();
  product_id: z.string().optional();
  remaining_amount_cents: z.number().nullable().optional();
  sale_id: z.string().optional();
  total_amount_cents: z.number().optional();
  "updated_at": "z.string().nullable().optional()";
});

export const ResidualPoolUpdateSchema = z.object({
  "created_at": "z.string().nullable().optional()";
  created_by: z.string().nullable().optional();
  distributed_amount_cents: z.number().nullable().optional();
  "distributed_at": "z.string().nullable().optional()";
  id: z.string().optional();
  product_id: z.string().optional();
  remaining_amount_cents: z.number().nullable().optional();
  sale_id: z.string().optional();
  total_amount_cents: z.number().optional();
  "updated_at": "z.string().nullable().optional()";
});

// =====================================================
// TYPE INFERENCE
// =====================================================

export type ResidualPoolRowInput = z.infer<typeof ResidualPoolRowSchema>;
export type ResidualPoolInsertInput = z.infer<typeof ResidualPoolInsertSchema>;
export type ResidualPoolUpdateInput = z.infer<typeof ResidualPoolUpdateSchema>;
