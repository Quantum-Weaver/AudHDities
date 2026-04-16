// =====================================================
// FILE: validators/generated/prometheus-meta/prometheus_consciousness.ts
// GENERATED: 2026-04-16T23:20:33.901Z
// SOURCE: database.types.ts
// =====================================================

import { z } from 'zod';

import { CONSCIOUSNESS_STATE } from '@/lib/constants/generated/prometheus-meta/consciousness_state';

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
  state: z.enum(Object.values(CONSCIOUSNESS_STATE)),
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
  session_id: z.string(),
  state: z.enum(Object.values(CONSCIOUSNESS_STATE)).optional(),
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
  state: z.enum(Object.values(CONSCIOUSNESS_STATE)).optional(),
  updated_at: z.string().optional(),
});

// =====================================================
// TYPE INFERENCE
// =====================================================

export type PrometheusConsciousnessRowInput = z.infer<typeof PrometheusConsciousnessRowSchema>;
export type PrometheusConsciousnessInsertInput = z.infer<typeof PrometheusConsciousnessInsertSchema>;
export type PrometheusConsciousnessUpdateInput = z.infer<typeof PrometheusConsciousnessUpdateSchema>;
