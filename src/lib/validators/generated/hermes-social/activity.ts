// =====================================================
// FILE: validators/generated/hermes-social/activity.ts
// GENERATED: 2026-04-14T19:39:30.064Z
// SOURCE: database.types.ts
// =====================================================

// =====================================================
// Activity SCHEMAS
// =====================================================

export const ActivityRowSchema = z.object({
  action_type: z.enum(Object.values(ActionType));
  actor_id: z.string().nullable();
  "created_at": "z.string().nullable()";
  created_by: z.string().nullable();
  id: z.string();
  metadata: z.any().nullable();
  target_id: z.string().nullable();
  target_type: z.enum(Object.values(TargetType)).nullable();
  user_id: z.string();
  visibility: z.enum(Object.values(ActivityVisibility)).nullable();
});

export const ActivityInsertSchema = z.object({
  action_type: z.enum(Object.values(ActionType)).optional();
  actor_id: z.string().nullable().optional();
  "created_at": "z.string().nullable().optional()";
  created_by: z.string().nullable().optional();
  id: z.string().optional();
  metadata: z.any().nullable().optional();
  target_id: z.string().nullable().optional();
  target_type: z.enum(Object.values(TargetType)).nullable().optional();
  user_id: z.string().optional();
  visibility: z.enum(Object.values(ActivityVisibility)).nullable().optional();
});

export const ActivityUpdateSchema = z.object({
  action_type: z.enum(Object.values(ActionType)).optional();
  actor_id: z.string().nullable().optional();
  "created_at": "z.string().nullable().optional()";
  created_by: z.string().nullable().optional();
  id: z.string().optional();
  metadata: z.any().nullable().optional();
  target_id: z.string().nullable().optional();
  target_type: z.enum(Object.values(TargetType)).nullable().optional();
  user_id: z.string().optional();
  visibility: z.enum(Object.values(ActivityVisibility)).nullable().optional();
});

// =====================================================
// TYPE INFERENCE
// =====================================================

export type ActivityRowInput = z.infer<typeof ActivityRowSchema>;
export type ActivityInsertInput = z.infer<typeof ActivityInsertSchema>;
export type ActivityUpdateInput = z.infer<typeof ActivityUpdateSchema>;
