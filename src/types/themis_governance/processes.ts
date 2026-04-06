// =====================================================
// FILE: types/themis_governance/processes.ts
// HANDLING: full_crud
// DEITY: themis_governance
// GENERATED: 2026-04-05T21:55:13.030Z
// SOURCE: database.types.ts lines 3220-3278
// =====================================================

import type { Database } from '@/types/supabase/database.types';
import type { Json } from '@/types/supabase/database.types';

// =====================================================
// CORE TYPES
// =====================================================

// =====================================================
// ENUM EXPORTS (from database enums)
// =====================================================

export type EscalationTarget = Database['public']['Enums']['escalation_target'];
export type ProcessType = Database['public']['Enums']['process_type'];

export type ProcessesRow = Database['public']['Tables']['processes']['Row'];
export type ProcessesInsert = Database['public']['Tables']['processes']['Insert'];
export type ProcessesUpdate = Database['public']['Tables']['processes']['Update'];

// =====================================================
// DERIVED TYPES
// =====================================================

/**
 * Public view of processes
 */
export interface PublicProcesses {
  created_at: string | null;
  created_by: string;
  description: string | null;
  escalation_target: string | null;
  id: string;
  is_active: boolean | null;
  name: string;
  process_type: ProcessType;
  slug: string;
  steps: Json;
  timeout_days: number | null;
  updated_at: string | null;
}

/**
 * Form data for processes
 * All fields are optional for partial updates
 */
export interface ProcessesFormData {
  created_at?: string | null;
  created_by?: string;
  description?: string | null;
  id?: string;
  is_active?: boolean | null;
  name?: string;
  process_type?: ProcessType;
  slug?: string;
  steps?: Json;
  timeout_days?: number | null;
  updated_at?: string | null;
}

/**
 * Validation result for processes
 */
export interface ProcessesValidationResult {
  valid: boolean;
  errors: {
    created_at?: string;
    created_by?: string;
    description?: string;
    escalation_target?: string;
    id?: string;
    is_active?: string;
    name?: string;
    process_type?: string;
    slug?: string;
    steps?: string;
    timeout_days?: string;
    updated_at?: string;
  };
}

