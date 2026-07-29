// =====================================================
// FILE: types/generated/themis-governance/responses.ts
// HANDLING: full_crud
// DEITY: themis-governance
// GENERATED: 2026-07-29T16:16:53.981Z
// SOURCE: database.types.ts lines 0-0
// =====================================================

import type { Tables, TablesInsert, TablesUpdate, Enums } from '@/types/supabase/database.helpers.js';

// =====================================================
// CORE TYPES
// =====================================================

// =====================================================
// ENUM EXPORTS (from database enums)
// =====================================================

export type ContentStatus = Enums<'content_status'>;

export type ResponsesRow = Tables<'responses'>;
export type ResponsesInsert = TablesInsert<'responses'>;
export type ResponsesUpdate = TablesUpdate<'responses'>;

// =====================================================
// DERIVED TYPES
// =====================================================

/**
 * Public view of responses
 */
export interface PublicResponses {
  created_at: string;
  created_by: string;
  description: string | null;
  id: string;
  parent_response_id: string | null;
  signal_id: string;
  status: ContentStatus;
  updated_at: string;
  updated_by: string | null;
}

/**
 * Form data for responses
 * All fields are optional for partial updates
 */
export interface ResponsesFormData {
  created_at?: string;
  created_by?: string;
  description?: string | null;
  id?: string;
  parent_response_id?: string | null;
  signal_id?: string;
  status?: ContentStatus;
  updated_at?: string;
  updated_by?: string | null;
}

/**
 * Validation result for responses
 */
export interface ResponsesValidationResult {
  valid: boolean;
  errors: {
    created_at?: string;
    created_by?: string;
    description?: string;
    id?: string;
    parent_response_id?: string;
    signal_id?: string;
    status?: string;
    updated_at?: string;
    updated_by?: string;
  };
}

