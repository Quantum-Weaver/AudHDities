// =====================================================
// FILE: types/generated/hephaestus-infrastructure/scheduling.ts
// HANDLING: full_crud
// DEITY: hephaestus-infrastructure
// GENERATED: 2026-08-01T18:15:38.631Z
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

export type ContentStatus = Enums<'content_status'>;

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
  created_at: string;
  created_by: string | null;
  cron_expression: string | null;
  description: string | null;
  id: string;
  interval_minutes: number | null;
  is_active: boolean;
  last_run_at: string | null;
  max_retries: number;
  name: string;
  next_run_at: string | null;
  retry_delay_minutes: number;
  schedule_type: string;
  slug: string;
  status: ContentStatus;
  task_handler: string | null;
  task_payload: Json | null;
  timezone: string;
  updated_at: string;
  updated_by: string | null;
}

/**
 * Form data for scheduling
 * All fields are optional for partial updates
 */
export interface SchedulingFormData {
  created_at?: string;
  created_by?: string | null;
  cron_expression?: string | null;
  description?: string | null;
  id?: string;
  interval_minutes?: number | null;
  is_active?: boolean;
  last_run_at?: string | null;
  max_retries?: number;
  name?: string;
  next_run_at?: string | null;
  retry_delay_minutes?: number;
  schedule_type?: string;
  slug?: string;
  status?: ContentStatus;
  task_handler?: string | null;
  task_payload?: Json | null;
  timezone?: string;
  updated_at?: string;
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
    cron_expression?: string;
    description?: string;
    id?: string;
    interval_minutes?: string;
    is_active?: string;
    last_run_at?: string;
    max_retries?: string;
    name?: string;
    next_run_at?: string;
    retry_delay_minutes?: string;
    schedule_type?: string;
    slug?: string;
    status?: string;
    task_handler?: string;
    task_payload?: string;
    timezone?: string;
    updated_at?: string;
    updated_by?: string;
  };
}

