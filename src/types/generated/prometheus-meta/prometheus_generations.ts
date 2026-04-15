// =====================================================
// FILE: types/generated/prometheus-meta/prometheus_generations.ts
// HANDLING: full_crud
// GENERATED: 2026-04-15T19:30:35.449Z
// SOURCE: database.types.ts lines 4201-4256
// =====================================================

import type { Database, Json } from '@/types/supabase/database.types';

// =====================================================
// ENUM EXPORTS (from database enums)
// =====================================================

export type GenerationStatus = Database['public']['Enums']['generation_status'];

// =====================================================
// CORE TYPES
// =====================================================

export type PrometheusGenerationsRow = Database['public']['Tables']['prometheus_generations']['Row'];
export type PrometheusGenerationsInsert = Database['public']['Tables']['prometheus_generations']['Insert'];
export type PrometheusGenerationsUpdate = Database['public']['Tables']['prometheus_generations']['Update'];

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
  duration_ms: number;
  errors: Json | null;
  file_paths: string[] | null;
  files_generated: number;
  id: string;
  metadata: Json | null;
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
  duration_ms?: number;
  errors?: Json | null;
  file_paths?: string[] | null;
  files_generated?: number;
  id?: string;
  metadata?: Json | null;
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
    duration_ms?: string;
    errors?: string;
    file_paths?: string;
    files_generated?: string;
    id?: string;
    metadata?: string;
    session_id?: string;
    status?: string;
    ziggy_present?: string;
  };
}

