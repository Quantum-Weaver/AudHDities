// =====================================================
// FILE: types/generated/hephaestus-infrastructure/scheduling.ts
// HANDLING: full_crud
// GENERATED: 2026-04-15T18:11:44.232Z
// SOURCE: database.types.ts lines 5329-5396
// =====================================================

import type { Database, Json } from '@/types/supabase/database.types';

// =====================================================
// ENUM EXPORTS (from database enums)
// =====================================================

export type JobType = Database['public']['Enums']['job_type'];
export type JobStatus = Database['public']['Enums']['job_status'];

// =====================================================
// CORE TYPES
// =====================================================

export type SchedulingRow = Database['public']['Tables']['scheduling']['Row'];
export type SchedulingInsert = Database['public']['Tables']['scheduling']['Insert'];
export type SchedulingUpdate = Database['public']['Tables']['scheduling']['Update'];

// =====================================================
// DERIVED TYPES
// =====================================================

/**
 * Public view of scheduling
 */
export interface PublicScheduling {
  "created_at": "string | null";
  created_by: string | null;
  error_message: string | null;
  function_name: string;
  id: string;
  job_type: JobType;
  "last_result": "string | null";
  "last_run": "string | null";
  max_retries: number | null;
  name: string;
  next_run: string | null;
  parameters: Json | null;
  retry_count: number | null;
  "run_at": "string | null";
  schedule: string | null;
  status: JobStatus | null;
  "updated_at": "string | null";
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
  id?: string;
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
  status?: JobStatus | null;
  updated_at?: string | null;
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
    id?: string;
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
    status?: string;
    updated_at?: string;
  };
}

