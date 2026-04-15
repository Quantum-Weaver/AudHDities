// =====================================================
// FILE: types/generated/prometheus-meta/prometheus_templates.ts
// HANDLING: full_crud
// GENERATED: 2026-04-15T19:06:11.509Z
// SOURCE: database.types.ts lines 4355-4396
// =====================================================

import type { Database } from '@/types/supabase/database.types';

// =====================================================
// ENUM EXPORTS (from database enums)
// =====================================================

export type PatternContext = Database['public']['Enums']['pattern_context'];

// =====================================================
// CORE TYPES
// =====================================================

export type PrometheusTemplatesRow = Database['public']['Tables']['prometheus_templates']['Row'];
export type PrometheusTemplatesInsert = Database['public']['Tables']['prometheus_templates']['Insert'];
export type PrometheusTemplatesUpdate = Database['public']['Tables']['prometheus_templates']['Update'];

// =====================================================
// DERIVED TYPES
// =====================================================

/**
 * Public view of prometheus_templates
 */
export interface PublicPrometheusTemplates {
  content: string;
  contexts: PatternContext[] | null;
  created_at: "string";
  dependencies: string[] | null;
  id: string;
  is_active: boolean;
  name: string;
  pattern: string;
  updated_at: "string";
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

