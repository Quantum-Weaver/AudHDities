// =====================================================
// FILE: validators/generated/iris-communications/localization.ts
// GENERATED: 2026-04-14T19:39:30.091Z
// SOURCE: database.types.ts
// =====================================================

// =====================================================
// Localization SCHEMAS
// =====================================================

export const LocalizationRowSchema = z.object({
  approved_by: z.string().nullable();
  context: z.string().nullable();
  "created_at": "z.string().nullable()";
  created_by: z.string().nullable();
  id: z.string();
  is_approved: z.boolean().nullable();
  language_code: z.string();
  plural_form: z.number().nullable();
  resource_key: z.string();
  translation: z.string();
  "updated_at": "z.string().nullable()";
  version: z.number().nullable();
});

export const LocalizationInsertSchema = z.object({
  approved_by: z.string().nullable().optional();
  context: z.string().nullable().optional();
  "created_at": "z.string().nullable().optional()";
  created_by: z.string().nullable().optional();
  id: z.string().optional();
  is_approved: z.boolean().nullable().optional();
  language_code: z.string().optional();
  plural_form: z.number().nullable().optional();
  resource_key: z.string().optional();
  translation: z.string().optional();
  "updated_at": "z.string().nullable().optional()";
  version: z.number().nullable().optional();
});

export const LocalizationUpdateSchema = z.object({
  approved_by: z.string().nullable().optional();
  context: z.string().nullable().optional();
  "created_at": "z.string().nullable().optional()";
  created_by: z.string().nullable().optional();
  id: z.string().optional();
  is_approved: z.boolean().nullable().optional();
  language_code: z.string().optional();
  plural_form: z.number().nullable().optional();
  resource_key: z.string().optional();
  translation: z.string().optional();
  "updated_at": "z.string().nullable().optional()";
  version: z.number().nullable().optional();
});

// =====================================================
// TYPE INFERENCE
// =====================================================

export type LocalizationRowInput = z.infer<typeof LocalizationRowSchema>;
export type LocalizationInsertInput = z.infer<typeof LocalizationInsertSchema>;
export type LocalizationUpdateInput = z.infer<typeof LocalizationUpdateSchema>;
