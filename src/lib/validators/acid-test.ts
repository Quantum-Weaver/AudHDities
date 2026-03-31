// src/lib/validators/acid-test.ts
import { z } from 'zod';

// Acid Test question types
export const acidQuestionTypeSchema = z.enum(['multiple_choice', 'slider', 'checkbox', 'scale', 'text']);

// Single answer schema
export const acidAnswerSchema = z.object({
  question_id: z.string().uuid(),
  answer_value: z.union([z.string(), z.number(), z.array(z.string())]),
});

// Acid Test submission schema
export const acidTestSubmissionSchema = z.object({
  answers: z.array(acidAnswerSchema).min(5, 'Please answer all questions'),
});

// Acid Test result calculation (server-side only)
export const acidTestResultSchema = z.object({
  total_score: z.number().min(0).max(100),
  suggested_tier: z.enum(['community', 'ally', 'corporate']),
  persona_label: z.enum([
    'masked_traveler', 
    'tab_hoarder', 
    'seam_warrior', 
    'void_dweller', 
    'pattern_seeker', 
    'quantum_witness'
  ]),
  answers: z.record(z.string(), z.union([z.string(), z.number(), z.array(z.string())])),
});

// Individual question response schema (for form use)
export const acidTestResponseSchema = z.object({
  questionId: z.string().uuid(),
  answer: z.union([z.string(), z.number(), z.array(z.string())]),
  score: z.number().min(0).max(100).optional(),
});

// Complete acid test form schema (for client-side form)
export const acidTestFormSchema = z.object({
  responses: z.array(acidTestResponseSchema).min(5),
});

// Question configuration schema (for admin/seed data)
export const acidTestQuestionSchema = z.object({
  id: z.string().uuid().optional(),
  question_text: z.string().min(5, 'Question text is required').max(500),
  question_type: acidQuestionTypeSchema.default('multiple_choice'),
  order_index: z.number().int().min(0).default(0),
  is_active: z.boolean().default(true),
  options: z.array(
    z.object({
      id: z.string().optional(),
      answer_text: z.string().min(1),
      score_value: z.number().min(0).max(100).default(0),
      indicates_nd: z.boolean().default(false),
      ally_tier_price: z.number().min(0).optional().nullable(),
    })
  ).optional(),
});

// Batch question import schema
export const acidTestBatchSchema = z.object({
  questions: z.array(acidTestQuestionSchema).min(1),
});

// Score calculation result schema
export const acidTestScoreSchema = z.object({
  total: z.number().min(0).max(100),
  tier: z.enum(['community', 'ally', 'corporate']),
  persona: z.enum([
    'masked_traveler', 
    'tab_hoarder', 
    'seam_warrior', 
    'void_dweller', 
    'pattern_seeker', 
    'quantum_witness'
  ]),
  breakdown: z.record(z.string(), z.number()).optional(),
});