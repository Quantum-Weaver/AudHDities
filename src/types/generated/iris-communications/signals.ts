// =====================================================
// FILE: types/generated/iris-communications/signals.ts
// HANDLING: full_crud
// DEITY: iris-communications
// GENERATED: 2026-07-28T05:07:04.531Z
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

export type SignalsRow = Tables<'signals'>;
export type SignalsInsert = TablesInsert<'signals'>;
export type SignalsUpdate = TablesUpdate<'signals'>;

// =====================================================
// DERIVED TYPES
// =====================================================

/**
 * Public view of signals
 */
export interface PublicSignals {
  cover_url: string | null;
  created_at: string;
  created_by: string;
  description: string | null;
  id: string;
  name: string;
  response_count: number;
  signal_type: string | null;
  slug: string;
  status: ContentStatus;
  tags: string[] | null;
  updated_at: string;
  updated_by: string | null;
}

/**
 * Form data for signals
 * All fields are optional for partial updates
 */
export interface SignalsFormData {
  cover_url?: string | null;
  created_at?: string;
  created_by?: string;
  description?: string | null;
  id?: string;
  name?: string;
  response_count?: number;
  signal_type?: string | null;
  slug?: string;
  status?: ContentStatus;
  tags?: string[] | null;
  updated_at?: string;
  updated_by?: string | null;
}

/**
 * Validation result for signals
 */
export interface SignalsValidationResult {
  valid: boolean;
  errors: {
    cover_url?: string;
    created_at?: string;
    created_by?: string;
    description?: string;
    id?: string;
    name?: string;
    response_count?: string;
    signal_type?: string;
    slug?: string;
    status?: string;
    tags?: string;
    updated_at?: string;
    updated_by?: string;
  };
}

