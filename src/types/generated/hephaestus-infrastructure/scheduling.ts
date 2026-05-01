// =====================================================
// FILE: types/generated/hephaestus-infrastructure/scheduling.ts
// HANDLING: full_crud
// DEITY: hephaestus-infrastructure
// GENERATED: 2026-05-01T03:24:42.051Z
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

export type JobType = Enums<'job_type'>;
export type JobStatus = Enums<'job_status'>;

export type SchedulingRow = Tables<'scheduling'>;
export type SchedulingInsert = TablesInsert<'scheduling'>;
export type SchedulingUpdate = TablesUpdate<'scheduling'>;

// =====================================================
// DERIVED TYPES
// =====================================================

/**
 * Public view of scheduling
 */
export interface PublicScheduling {
  created_at: string | null;
  created_by: string | null;
  error_message: string | null;
  function_name: string;
  job_type: JobType;
  last_result: string | null;
  last_run: string | null;
  max_retries: number | null;
  name: string;
  next_run: string | null;
  parameters: Json | null;
  retry_count: number | null;
  run_at: string | null;
  schedule: string | null;
  scheduling_id: string;
  slug: string | null;
  status: JobStatus | null;
  updated_at: string | null;
  updated_by: string | null;
}

/**
 * Form data for scheduling
 * All fields are optional for partial updates
 */
export interface SchedulingFormData {
  created_at?: string | null;
  created_by?: string | null;
  error_message?: string | null;
  function_name?: string;
  job_type?: JobType;
  last_result?: string | null;
  last_run?: string | null;
  max_retries?: number | null;
  name?: string;
  next_run?: string | null;
  parameters?: Json | null;
  retry_count?: number | null;
  run_at?: string | null;
  schedule?: string | null;
  scheduling_id?: string;
  slug?: string | null;
  status?: JobStatus | null;
  updated_at?: string | null;
  updated_by?: string | null;
}

/**
 * Validation result for scheduling
 */
export interface SchedulingValidationResult {
  valid: boolean;
  errors: {
    created_at?: string;
    created_by?: string;
    error_message?: string;
    function_name?: string;
    job_type?: string;
    last_result?: string;
    last_run?: string;
    max_retries?: string;
    name?: string;
    next_run?: string;
    parameters?: string;
    retry_count?: string;
    run_at?: string;
    schedule?: string;
    scheduling_id?: string;
    slug?: string;
    status?: string;
    updated_at?: string;
    updated_by?: string;
  };
}

