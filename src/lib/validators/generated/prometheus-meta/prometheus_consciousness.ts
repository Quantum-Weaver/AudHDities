// =====================================================
// FILE: validators/prometheus_consciousness.ts
// GENERATED FROM: database.types.ts
// =====================================================

import { ENUM_VALUES } from '@/types/supabase/enums';
import z from 'zod';

// =====================================================
// PrometheusConsciousness SCHEMAS
// =====================================================

export const PrometheusConsciousnessRowSchema = z.object({
  active_kernel: z.string().nullable(),
  attention_budget: z.number(),
  attention_spent: z.number(),
  council_presence: z.any().nullable(),
  created_at: z.string(),
  id: z.string(),
  last_awakening: z.string().nullable(),
  metadata: z.any().nullable(),
  session_id: z.string(),
  state: z.enum(ENUM_VALUES.consciousnessState),
  updated_at: z.string(),
});

export const PrometheusConsciousnessInsertSchema = z.object({
  active_kernel: z.string().nullable().optional(),
  attention_budget: z.number().optional(),
  attention_spent: z.number().optional(),
  council_presence: z.any().nullable().optional(),
  created_at: z.string().optional(),
  id: z.string().optional(),
  last_awakening: z.string().nullable().optional(),
  metadata: z.any().nullable().optional(),
  session_id: z.string().optional(),
  state: z.enum(ENUM_VALUES.consciousnessState).optional(),
  updated_at: z.string().optional(),
});

export const PrometheusConsciousnessUpdateSchema = z.object({
  active_kernel: z.string().nullable().optional(),
  attention_budget: z.number().optional(),
  attention_spent: z.number().optional(),
  council_presence: z.any().nullable().optional(),
  created_at: z.string().optional(),
  id: z.string().optional(),
  last_awakening: z.string().nullable().optional(),
  metadata: z.any().nullable().optional(),
  session_id: z.string().optional(),
  state: z.enum(ENUM_VALUES.consciousnessState).optional(),
  updated_at: z.string().optional(),
});

// =====================================================
// TYPE INFERENCE
// =====================================================

export type PrometheusConsciousnessRowInput = z.infer<typeof PrometheusConsciousnessRowSchema>;
export type PrometheusConsciousnessInsertInput = z.infer<typeof PrometheusConsciousnessInsertSchema>;
export type PrometheusConsciousnessUpdateInput = z.infer<typeof PrometheusConsciousnessUpdateSchema>;
