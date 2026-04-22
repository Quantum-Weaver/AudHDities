// =====================================================
// FILE: types/generated/prometheus-meta/prometheus_generations.ts
// TYPE: table
// HANDLING: full_crud
// GENERATED: 2026-04-22T18:24:19.546Z
// SOURCE: database.types.ts (via Tables helper)
// =====================================================

import type { Tables, TablesInsert, TablesUpdate } from '@/types/supabase/database.helpers';
import type { Database } from '@/types/supabase/database.types';
import type { Json } from '@/types/supabase/database.types';

// =====================================================
// CORE TYPES
// =====================================================

// =====================================================
// ENUM EXPORTS (from database enums)
// =====================================================

export type GenerationStatus = Database['public']['Enums']['generation_status'];
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

