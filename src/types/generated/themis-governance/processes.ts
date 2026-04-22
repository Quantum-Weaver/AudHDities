// =====================================================
// FILE: types/generated/themis-governance/processes.ts
// TYPE: table
// HANDLING: full_crud
// GENERATED: 2026-04-22T18:15:10.289Z
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

export type EscalationTarget = Database['public']['Enums']['escalation_target'];
export type ProcessType = Database['public']['Enums']['process_type'];
export type ProcessesRow = Tables<'processes'>;
export type ProcessesInsert = TablesInsert<'processes'>;
export type ProcessesUpdate = TablesUpdate<'processes'>;

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
  escalation_target:;
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

