// =====================================================
// FILE: validators/test_patterns.ts
// GENERATED FROM: database.types.ts
// =====================================================

import z from 'zod';

// =====================================================
// TestPatterns SCHEMAS
// =====================================================

export const TestPatternsRowSchema = z.object({
  created_at: z.string(),
  created_by: z.string().nullable(),
  description: z.string().nullable(),
  expected_result: z.string(),
  icon_emoji: z.string().nullable(),
  id: z.string(),
  name: z.string(),
  priority: z.string(),
  template_category: z.string(),
  test_query_template: z.string(),
  test_type: z.string(),
  updated_at: z.string(),
  updated_by: z.string().nullable(),
});

export const TestPatternsInsertSchema = z.object({
  created_at: z.string().optional(),
  created_by: z.string().nullable().optional(),
  description: z.string().nullable().optional(),
  expected_result: z.string(),
  icon_emoji: z.string().nullable().optional(),
  id: z.string().optional(),
  name: z.string(),
  priority: z.string().optional(),
  template_category: z.string(),
  test_query_template: z.string(),
  test_type: z.string(),
  updated_at: z.string().optional(),
  updated_by: z.string().nullable().optional(),
});

export const TestPatternsUpdateSchema = z.object({
  created_at: z.string().optional(),
  created_by: z.string().nullable().optional(),
  description: z.string().nullable().optional(),
  expected_result: z.string().optional(),
  icon_emoji: z.string().nullable().optional(),
  id: z.string().optional(),
  name: z.string().optional(),
  priority: z.string().optional(),
  template_category: z.string().optional(),
  test_query_template: z.string().optional(),
  test_type: z.string().optional(),
  updated_at: z.string().optional(),
  updated_by: z.string().nullable().optional(),
});

// =====================================================
// TYPE INFERENCE
// =====================================================

export type TestPatternsRowInput = z.infer<typeof TestPatternsRowSchema>;
export type TestPatternsInsertInput = z.infer<typeof TestPatternsInsertSchema>;
export type TestPatternsUpdateInput = z.infer<typeof TestPatternsUpdateSchema>;
