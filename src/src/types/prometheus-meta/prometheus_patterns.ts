// =====================================================
// FILE: types/generated/prometheus-meta/prometheus_patterns.ts
// HANDLING: full_crud
// GENERATED: 2026-04-13T21:47:21.047Z
// SOURCE: database.types.ts lines 4302-4354
// =====================================================

import type { Database } from 'src/types/supabase/database.types';

// =====================================================
// ENUM EXPORTS (from database enums)
// =====================================================

export type PatternContext = Database['public']['Enums']['pattern_context'];

// =====================================================
// CORE TYPES
// =====================================================

export type PrometheusPatternsRow = Database['public']['Tables']['prometheus_patterns']['Row'];
export type PrometheusPatternsInsert = Database['public']['Tables']['prometheus_patterns']['Insert'];
export type PrometheusPatternsUpdate = Database['public']['Tables']['prometheus_patterns']['Update'];

// =====================================================
// DERIVED TYPES
// =====================================================

/**
 * Public view of prometheus_patterns
 */
export interface PublicPrometheusPatterns {
  contexts: PatternContext[];
  created_at: string;
  default_template_id: string | null;
  dependencies: string[] | null;
  description: string;
  examples: string[] | null;
  generation_order: number;
  id: string;
  is_active: boolean;
  name: string;
  naming_rule: string;
  updated_at: string;
}

/**
 * Form data for prometheus_patterns
 * All fields are optional for partial updates
 */
export interface PrometheusPatternsFormData {
  contexts?: PatternContext[];
  created_at?: string;
  default_template_id?: string | null;
  dependencies?: string[] | null;
  description?: string;
  examples?: string[] | null;
  generation_order?: number;
  id?: string;
  is_active?: boolean;
  name?: string;
  naming_rule?: string;
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
    default_template_id?: string;
    dependencies?: string;
    description?: string;
    examples?: string;
    generation_order?: string;
    id?: string;
    is_active?: string;
    name?: string;
    naming_rule?: string;
    updated_at?: string;
  };
}

