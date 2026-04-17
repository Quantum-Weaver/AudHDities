// =====================================================
// FILE: types/generated/prometheus-meta/prometheus_memories.ts
// HANDLING: full_crud
// GENERATED: 2026-04-17T17:34:19.702Z
// SOURCE: database.types.ts lines 4471-4515
// =====================================================

import type { Database } from '@/types/supabase/database.types';

// =====================================================
// CORE TYPES
// =====================================================

export type PrometheusMemoriesRow = Database['public']['Tables']['prometheus_memories']['Row'];
export type PrometheusMemoriesInsert = Database['public']['Tables']['prometheus_memories']['Insert'];
export type PrometheusMemoriesUpdate = Database['public']['Tables']['prometheus_memories']['Update'];

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

/**
 * Validation result for prometheus_memories
 */
export interface PrometheusMemoriesValidationResult {
  valid: boolean;
  errors: {
    average_duration_ms?: string;
    confidence_score?: string;
    created_at?: string;
    dependencies?: string;
    failure_count?: string;
    id?: string;
    last_used?: string;
    pattern_hash?: string;
    pattern_type?: string;
    success_count?: string;
    template_recommendation?: string;
    updated_at?: string;
  };
}

