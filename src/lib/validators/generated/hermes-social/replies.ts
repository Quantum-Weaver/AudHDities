// =====================================================
// FILE: validators/generated/hermes-social/replies.ts
// GENERATED: 2026-04-14T19:39:30.109Z
// SOURCE: database.types.ts
// =====================================================

// =====================================================
// Replies SCHEMAS
// =====================================================

export const RepliesRowSchema = z.object({
  author_id: z.string();
  comment_id: z.string();
  content: z.string();
  "created_at": "z.string().nullable()";
  created_by: z.string().nullable();
  id: z.string();
  is_edited: z.boolean().nullable();
  is_hidden: z.boolean().nullable();
  "updated_at": "z.string().nullable()";
});

export const RepliesInsertSchema = z.object({
  author_id: z.string().optional();
  comment_id: z.string().optional();
  content: z.string().optional();
  "created_at": "z.string().nullable().optional()";
  created_by: z.string().nullable().optional();
  id: z.string().optional();
  is_edited: z.boolean().nullable().optional();
  is_hidden: z.boolean().nullable().optional();
  "updated_at": "z.string().nullable().optional()";
});

export const RepliesUpdateSchema = z.object({
  author_id: z.string().optional();
  comment_id: z.string().optional();
  content: z.string().optional();
  "created_at": "z.string().nullable().optional()";
  created_by: z.string().nullable().optional();
  id: z.string().optional();
  is_edited: z.boolean().nullable().optional();
  is_hidden: z.boolean().nullable().optional();
  "updated_at": "z.string().nullable().optional()";
});

// =====================================================
// TYPE INFERENCE
// =====================================================

export type RepliesRowInput = z.infer<typeof RepliesRowSchema>;
export type RepliesInsertInput = z.infer<typeof RepliesInsertSchema>;
export type RepliesUpdateInput = z.infer<typeof RepliesUpdateSchema>;
