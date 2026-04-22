// =====================================================
// FILE: types/generated/prometheus-meta/prometheus_templates.ts
// TYPE: table
// HANDLING: full_crud
// GENERATED: 2026-04-22T18:15:10.431Z
// SOURCE: database.types.ts (via Tables helper)
// =====================================================

import type { Tables, TablesInsert, TablesUpdate } from '@/types/supabase/database.helpers';
import type { Database } from '@/types/supabase/database.types';

// =====================================================
// CORE TYPES
// =====================================================

// =====================================================
// ENUM EXPORTS (from database enums)
// =====================================================

export type PatternContext = Database['public']['Enums']['pattern_context'];
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

