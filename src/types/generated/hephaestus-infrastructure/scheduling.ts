// =====================================================
// FILE: types/generated/hephaestus-infrastructure/scheduling.ts
// TYPE: table
// HANDLING: full_crud
// GENERATED: 2026-04-22T18:24:19.821Z
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

export type JobType = Database['public']['Enums']['job_type'];
export type JobStatus = Database['public']['Enums']['job_status'];
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
  id: string;
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
  status: JobStatus | null;
  updated_at: string | null;
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

