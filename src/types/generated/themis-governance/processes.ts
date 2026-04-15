// =====================================================
// FILE: types/generated/themis-governance/processes.ts
// HANDLING: full_crud
// GENERATED: 2026-04-15T18:11:44.215Z
// SOURCE: database.types.ts lines 3735-3793
// =====================================================

import type { Database, Json } from '@/types/supabase/database.types';

// =====================================================
// ENUM EXPORTS (from database enums)
// =====================================================

export type EscalationTarget = Database['public']['Enums']['escalation_target'];
export type ProcessType = Database['public']['Enums']['process_type'];

// =====================================================
// CORE TYPES
// =====================================================

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
  "created_at": "string | null";
  created_by: string;
  description: string | null;
  id: string;
  is_active: boolean | null;
  name: string;
  process_type: ProcessType;
  slug: string;
  steps: Json;
  timeout_days: number | null;
  "updated_at": "string | null";
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

