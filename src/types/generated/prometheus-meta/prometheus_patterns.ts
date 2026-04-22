// =====================================================
// FILE: types/generated/prometheus-meta/prometheus_patterns.ts
// TYPE: table
// HANDLING: full_crud
// GENERATED: 2026-04-22T18:15:10.416Z
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

