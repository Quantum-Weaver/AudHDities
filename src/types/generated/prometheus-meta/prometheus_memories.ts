// =====================================================
// FILE: types/generated/prometheus-meta/prometheus_memories.ts
// HANDLING: full_crud
// DEITY: prometheus-meta
// GENERATED: 2026-04-30T16:12:38.158Z
// SOURCE: database.types.ts lines 0-0
// =====================================================

import type { Tables, TablesInsert, TablesUpdate, Enums } from '@/types/supabase/database.helpers.js';

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
  created_by: string | null;
  dependencies: string[] | null;
  failure_count: number;
  last_used: string | null;
  pattern_hash: string;
  pattern_type: string;
  prometheus_memories_id: string;
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
  created_by?: string | null;
  dependencies?: string[] | null;
  failure_count?: number;
  last_used?: string | null;
  pattern_hash?: string;
  pattern_type?: string;
  prometheus_memories_id?: string;
  success_count?: number;
  template_recommendation?: string | null;
  updated_at?: string;
}

/**
 * Validation result for prometheus_memories
 */
export interface PrometheusMemoriesValidationResult {
  valid: boolean;
  errors: {
    average_duration_ms?: string;
    confidence_score?: string;
    created_at?: string;
    created_by?: string;
    dependencies?: string;
    failure_count?: string;
    last_used?: string;
    pattern_hash?: string;
    pattern_type?: string;
    prometheus_memories_id?: string;
    success_count?: string;
    template_recommendation?: string;
    updated_at?: string;
  };
}

