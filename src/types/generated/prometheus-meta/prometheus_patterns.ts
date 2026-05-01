// =====================================================
// FILE: types/generated/prometheus-meta/prometheus_patterns.ts
// HANDLING: full_crud
// DEITY: prometheus-meta
// GENERATED: 2026-05-01T03:24:41.840Z
// SOURCE: database.types.ts lines 0-0
// =====================================================

import type { Tables, TablesInsert, TablesUpdate, Enums } from '@/types/supabase/database.helpers.js';

// =====================================================
// CORE TYPES
// =====================================================

// =====================================================
// ENUM EXPORTS (from database enums)
// =====================================================

export type PatternContext = Enums<'pattern_context'>;

export type PrometheusPatternsRow = Tables<'prometheus_patterns'>;
export type PrometheusPatternsInsert = TablesInsert<'prometheus_patterns'>;
export type PrometheusPatternsUpdate = TablesUpdate<'prometheus_patterns'>;

// =====================================================
// DERIVED TYPES
// =====================================================

/**
 * Public view of prometheus_patterns
 */
export interface PublicPrometheusPatterns {
  contexts: PatternContext[];
  created_at: string;
  created_by: string | null;
  default_template_id: string | null;
  dependencies: string[] | null;
  description: string;
  examples: string[] | null;
  generation_order: number;
  is_active: boolean;
  name: string;
  naming_rule: string;
  prometheus_patterns_id: string;
  updated_at: string;
}

/**
 * Form data for prometheus_patterns
 * All fields are optional for partial updates
 */
export interface PrometheusPatternsFormData {
  contexts?: PatternContext[];
  created_at?: string;
  created_by?: string | null;
  default_template_id?: string | null;
  dependencies?: string[] | null;
  description?: string;
  examples?: string[] | null;
  generation_order?: number;
  is_active?: boolean;
  name?: string;
  naming_rule?: string;
  prometheus_patterns_id?: string;
  updated_at?: string;
}

/**
 * Validation result for prometheus_patterns
 */
export interface PrometheusPatternsValidationResult {
  valid: boolean;
  errors: {
    contexts?: string;
    created_at?: string;
    created_by?: string;
    default_template_id?: string;
    dependencies?: string;
    description?: string;
    examples?: string;
    generation_order?: string;
    is_active?: string;
    name?: string;
    naming_rule?: string;
    prometheus_patterns_id?: string;
    updated_at?: string;
  };
}

