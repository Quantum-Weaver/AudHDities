// =====================================================
// FILE: types/generated/mnemosyne-assessment/order.ts
// HANDLING: full_crud
// DEITY: mnemosyne-assessment
// GENERATED: 2026-07-18T23:17:10.970Z
// SOURCE: database.types.ts lines 0-0
// =====================================================

import type { Tables, TablesInsert, TablesUpdate, Enums } from '@/types/supabase/database.helpers.js';

// =====================================================
// CORE TYPES
// =====================================================

export type OrderRow = Tables<'order'>;
export type OrderInsert = TablesInsert<'order'>;
export type OrderUpdate = TablesUpdate<'order'>;

// =====================================================
// DERIVED TYPES
// =====================================================

/**
 * Public view of order
 */
export interface PublicOrder {
  class_id: string | null;
  created_at: string;
  created_by: string | null;
  description: string | null;
  id: string;
  keyword_id: string | null;
  name: string;
  updated_at: string;
  updated_by: string | null;
}

/**
 * Form data for order
 * All fields are optional for partial updates
 */
export interface OrderFormData {
  class_id?: string | null;
  created_at?: string;
  created_by?: string | null;
  description?: string | null;
  id?: string;
  keyword_id?: string | null;
  name?: string;
  updated_at?: string;
  updated_by?: string | null;
}

/**
 * Validation result for order
 */
export interface OrderValidationResult {
  valid: boolean;
  errors: {
    class_id?: string;
    created_at?: string;
    created_by?: string;
    description?: string;
    id?: string;
    keyword_id?: string;
    name?: string;
    updated_at?: string;
    updated_by?: string;
  };
}

