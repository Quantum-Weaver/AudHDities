// =====================================================
// FILE: validators/generated/iris-communications/surveys.ts
// GENERATED: 2026-04-14T19:39:30.120Z
// SOURCE: database.types.ts
// =====================================================

// =====================================================
// Surveys SCHEMAS
// =====================================================

export const SurveysRowSchema = z.object({
  "created_at": "z.string().nullable()";
  created_by: z.string();
  description: z.string().nullable();
  "expires_at": "z.string().nullable()";
  id: z.string();
  is_active: z.boolean().nullable();
  questions: z.any();
  response_count: z.number().nullable();
  "starts_at": "z.string().nullable()";
  target_house: z.enum(Object.values(CouncilHouse)).nullable();
  title: z.string();
  "updated_at": "z.string().nullable()";
});

export const SurveysInsertSchema = z.object({
  "created_at": "z.string().nullable().optional()";
  created_by: z.string().optional();
  description: z.string().nullable().optional();
  "expires_at": "z.string().nullable().optional()";
  id: z.string().optional();
  is_active: z.boolean().nullable().optional();
  questions: z.any().optional();
  response_count: z.number().nullable().optional();
  "starts_at": "z.string().nullable().optional()";
  target_house: z.enum(Object.values(CouncilHouse)).nullable().optional();
  title: z.string().optional();
  "updated_at": "z.string().nullable().optional()";
});

export const SurveysUpdateSchema = z.object({
  "created_at": "z.string().nullable().optional()";
  created_by: z.string().optional();
  description: z.string().nullable().optional();
  "expires_at": "z.string().nullable().optional()";
  id: z.string().optional();
  is_active: z.boolean().nullable().optional();
  questions: z.any().optional();
  response_count: z.number().nullable().optional();
  "starts_at": "z.string().nullable().optional()";
  target_house: z.enum(Object.values(CouncilHouse)).nullable().optional();
  title: z.string().optional();
  "updated_at": "z.string().nullable().optional()";
});

// =====================================================
// TYPE INFERENCE
// =====================================================

export type SurveysRowInput = z.infer<typeof SurveysRowSchema>;
export type SurveysInsertInput = z.infer<typeof SurveysInsertSchema>;
export type SurveysUpdateInput = z.infer<typeof SurveysUpdateSchema>;
