// =====================================================
// FILE: types/generated/prometheus-meta/prometheus_templates.ts
// HANDLING: full_crud
// DEITY: prometheus-meta
// GENERATED: 2026-04-23T02:14:53.289Z
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

export type PrometheusTemplatesRow = Tables<'prometheus_templates'>;
export type PrometheusTemplatesInsert = TablesInsert<'prometheus_templates'>;
export type PrometheusTemplatesUpdate = TablesUpdate<'prometheus_templates'>;

// =====================================================
// DERIVED TYPES
// =====================================================

/**
 * Public view of prometheus_templates
 */
export interface PublicPrometheusTemplates {
  content: string;
  contexts: PatternContext[] | null;
  created_at: string;
  dependencies: string[] | null;
  id: string;
  is_active: boolean;
  name: string;
  pattern: string;
  updated_at: string;
  variables: string[] | null;
  version: string;
}

/**
 * Form data for prometheus_templates
 * All fields are optional for partial updates
 */
export interface PrometheusTemplatesFormData {
  content?: string;
  contexts?: PatternContext[] | null;
  created_at?: string;
  dependencies?: string[] | null;
  id?: string;
  is_active?: boolean;
  name?: string;
  pattern?: string;
  updated_at?: string;
  variables?: string[] | null;
  version?: string;
}

/**
 * Validation result for prometheus_templates
 */
export interface PrometheusTemplatesValidationResult {
  valid: boolean;
  errors: {
    content?: string;
    contexts?: string;
    created_at?: string;
    dependencies?: string;
    id?: string;
    is_active?: string;
    name?: string;
    pattern?: string;
    updated_at?: string;
    variables?: string;
    version?: string;
  };
}

