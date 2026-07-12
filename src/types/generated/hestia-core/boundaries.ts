// =====================================================
// FILE: types/generated/hestia-core/boundaries.ts
// HANDLING: full_crud
// DEITY: hestia-core
// GENERATED: 2026-07-10T18:14:59.259Z
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

export type BoundariesRow = Tables<'boundaries'>;
export type BoundariesInsert = TablesInsert<'boundaries'>;
export type BoundariesUpdate = TablesUpdate<'boundaries'>;

// =====================================================
// DERIVED TYPES
// =====================================================

/**
 * Public view of boundaries
 */
export interface PublicBoundaries {
  applies_to: string | null;
  boundary_type: string | null;
  created_at: string;
  created_by: string | null;
  description: string | null;
  id: string;
  is_blocking: boolean;
  name: string;
  rule_config: Json | null;
  severity: string;
  slug: string;
  status: ContentStatus;
  updated_at: string;
  updated_by: string | null;
}

/**
 * Form data for boundaries
 * All fields are optional for partial updates
 */
export interface BoundariesFormData {
  applies_to?: string | null;
  boundary_type?: string | null;
  created_at?: string;
  created_by?: string | null;
  description?: string | null;
  id?: string;
  is_blocking?: boolean;
  name?: string;
  rule_config?: Json | null;
  severity?: string;
  slug?: string;
  status?: ContentStatus;
  updated_at?: string;
  updated_by?: string | null;
}

/**
 * Validation result for boundaries
 */
export interface BoundariesValidationResult {
  valid: boolean;
  errors: {
    applies_to?: string;
    boundary_type?: string;
    created_at?: string;
    created_by?: string;
    description?: string;
    id?: string;
    is_blocking?: string;
    name?: string;
    rule_config?: string;
    severity?: string;
    slug?: string;
    status?: string;
    updated_at?: string;
    updated_by?: string;
  };
}

