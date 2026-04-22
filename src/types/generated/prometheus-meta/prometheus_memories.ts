// =====================================================
// FILE: types/generated/prometheus-meta/prometheus_memories.ts
// TYPE: table
// HANDLING: full_crud
// GENERATED: 2026-04-22T18:24:19.559Z
// SOURCE: database.types.ts (via Tables helper)
// =====================================================

import type { Tables, TablesInsert, TablesUpdate } from '@/types/supabase/database.helpers';
import type { Database } from '@/types/supabase/database.types';

// =====================================================
// CORE TYPES
// =====================================================

export type PrometheusMemoriesRow = Tables<'prometheus_memories'>;
export type PrometheusMemoriesInsert = TablesInsert<'prometheus_memories'>;
export type PrometheusMemoriesUpdate = TablesUpdate<'prometheus_memories'>;

// =====================================================
// DERIVED TYPES
// =====================================================

/**
 * Public view of prometheus_memories
 */
export interface PublicPrometheusMemories {
  average_duration_ms: number;
  confidence_score: number;
  created_at: string;
  dependencies: string[] | null;
  failure_count: number;
  id: string;
  last_used: string | null;
  pattern_hash: string;
  pattern_type: string;
  success_count: number;
  template_recommendation: string | null;
  updated_at: string;
}

/**
 * Form data for prometheus_memories
 * All fields are optional for partial updates
 */
export interface PrometheusMemoriesFormData {
  average_duration_ms?: number;
  confidence_score?: number;
  created_at?: string;
  dependencies?: string[] | null;
  failure_count?: number;
  id?: string;
  last_used?: string | null;
  pattern_hash?: string;
  pattern_type?: string;
  success_count?: number;
  template_recommendation?: string | null;
  updated_at?: string;
}

