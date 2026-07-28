// =====================================================
// FILE: types/generated/themis-governance/processes.ts
// HANDLING: full_crud
// DEITY: themis-governance
// GENERATED: 2026-07-28T15:33:49.890Z
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
  created_at: string;
  created_by: string | null;
  description: string | null;
  id: string;
  name: string;
  priority: string;
  process_type: string | null;
  related_protocol_id: string | null;
  slug: string;
  status: ContentStatus;
  steps: Json | null;
  updated_at: string;
  updated_by: string | null;
}

/**
 * Form data for processes
 * All fields are optional for partial updates
 */
export interface ProcessesFormData {
  created_at?: string;
  created_by?: string | null;
  description?: string | null;
  id?: string;
  name?: string;
  priority?: string;
  process_type?: string | null;
  related_protocol_id?: string | null;
  slug?: string;
  status?: ContentStatus;
  steps?: Json | null;
  updated_at?: string;
  updated_by?: string | null;
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
    name?: string;
    priority?: string;
    process_type?: string;
    related_protocol_id?: string;
    slug?: string;
    status?: string;
    steps?: string;
    updated_at?: string;
    updated_by?: string;
  };
}

