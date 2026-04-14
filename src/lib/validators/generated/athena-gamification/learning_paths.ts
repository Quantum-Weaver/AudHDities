// =====================================================
// FILE: validators/generated/athena-gamification/learning_paths.ts
// GENERATED: 2026-04-14T19:39:30.088Z
// SOURCE: database.types.ts
// =====================================================

// =====================================================
// LearningPaths SCHEMAS
// =====================================================

export const LearningPathsRowSchema = z.object({
  cover_image: z.string().nullable();
  "created_at": "z.string().nullable()";
  created_by: z.string().nullable();
  creator_id: z.string();
  description: z.string();
  difficulty: z.enum(Object.values(DifficultyLevel));
  "estimated_duration_hours": "z.number().nullable()";
  house: z.enum(Object.values(CouncilHouse)).nullable();
  id: z.string();
  "is_published": "z.boolean().nullable()";
  prerequisite_path_id: z.string().nullable();
  slug: z.string();
  title: z.string();
  "updated_at": "z.string().nullable()";
});

export const LearningPathsInsertSchema = z.object({
  cover_image: z.string().nullable().optional();
  "created_at": "z.string().nullable().optional()";
  created_by: z.string().nullable().optional();
  creator_id: z.string().optional();
  description: z.string().optional();
  difficulty: z.enum(Object.values(DifficultyLevel)).optional();
  "estimated_duration_hours": "z.number().nullable().optional()";
  house: z.enum(Object.values(CouncilHouse)).nullable().optional();
  id: z.string().optional();
  "is_published": "z.boolean().nullable().optional()";
  prerequisite_path_id: z.string().nullable().optional();
  slug: z.string().optional();
  title: z.string().optional();
  "updated_at": "z.string().nullable().optional()";
});

export const LearningPathsUpdateSchema = z.object({
  cover_image: z.string().nullable().optional();
  "created_at": "z.string().nullable().optional()";
  created_by: z.string().nullable().optional();
  creator_id: z.string().optional();
  description: z.string().optional();
  difficulty: z.enum(Object.values(DifficultyLevel)).optional();
  "estimated_duration_hours": "z.number().nullable().optional()";
  house: z.enum(Object.values(CouncilHouse)).nullable().optional();
  id: z.string().optional();
  "is_published": "z.boolean().nullable().optional()";
  prerequisite_path_id: z.string().nullable().optional();
  slug: z.string().optional();
  title: z.string().optional();
  "updated_at": "z.string().nullable().optional()";
});

// =====================================================
// TYPE INFERENCE
// =====================================================

export type LearningPathsRowInput = z.infer<typeof LearningPathsRowSchema>;
export type LearningPathsInsertInput = z.infer<typeof LearningPathsInsertSchema>;
export type LearningPathsUpdateInput = z.infer<typeof LearningPathsUpdateSchema>;
