// =====================================================
// FILE: types/generated/prometheus-meta/prometheus_generations.ts
// HANDLING: full_crud
// DEITY: prometheus-meta
// GENERATED: 2026-05-01T15:31:59.738Z
// SOURCE: database.types.ts lines 0-0
// =====================================================

import type { Tables, TablesInsert, TablesUpdate, Enums } from '@/types/supabase/database.helpers.js';
import type { Json } from '@/types/supabase/database.types.js';

// =====================================================
// CORE TYPES
// =====================================================

// =====================================================
// ENUM EXPORTS (from database enums)
// =====================================================

export type GenerationStatus = Enums<'generation_status'>;

export type PrometheusGenerationsRow = Tables<'prometheus_generations'>;
export type PrometheusGenerationsInsert = TablesInsert<'prometheus_generations'>;
export type PrometheusGenerationsUpdate = TablesUpdate<'prometheus_generations'>;

// =====================================================
// DERIVED TYPES
// =====================================================

/**
 * Public view of prometheus_generations
 */
export interface PublicPrometheusGenerations {
  blueprint_id: string;
  completed_at: string | null;
  council_involved: string[] | null;
  created_at: string;
  created_by: string | null;
  duration_ms: number;
  errors: Json | null;
  file_paths: string[] | null;
  files_generated: number;
  metadata: Json | null;
  prometheus_generations_id: string;
  session_id: string;
  status: GenerationStatus;
  ziggy_present: boolean;
}

/**
 * Form data for prometheus_generations
 * All fields are optional for partial updates
 */
export interface PrometheusGenerationsFormData {
  blueprint_id?: string;
  completed_at?: string | null;
  council_involved?: string[] | null;
  created_at?: string;
  created_by?: string | null;
  duration_ms?: number;
  errors?: Json | null;
  file_paths?: string[] | null;
  files_generated?: number;
  metadata?: Json | null;
  prometheus_generations_id?: string;
  session_id?: string;
  status?: GenerationStatus;
  ziggy_present?: boolean;
}

/**
 * Validation result for prometheus_generations
 */
export interface PrometheusGenerationsValidationResult {
  valid: boolean;
  errors: {
    blueprint_id?: string;
    completed_at?: string;
    council_involved?: string;
    created_at?: string;
    created_by?: string;
    duration_ms?: string;
    errors?: string;
    file_paths?: string;
    files_generated?: string;
    metadata?: string;
    prometheus_generations_id?: string;
    session_id?: string;
    status?: string;
    ziggy_present?: string;
  };
}

