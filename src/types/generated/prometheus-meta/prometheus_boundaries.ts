// =====================================================
// FILE: types/generated/prometheus-meta/prometheus_boundaries.ts
// HANDLING: full_crud
// DEITY: prometheus-meta
// GENERATED: 2026-04-30T16:12:38.172Z
// SOURCE: database.types.ts lines 0-0
// =====================================================

import type { Tables, TablesInsert, TablesUpdate, Enums } from '@/types/supabase/database.helpers.js';

// =====================================================
// CORE TYPES
// =====================================================

// =====================================================
// ENUM EXPORTS (from database enums)
// =====================================================

export type EncryptionLevel = Enums<'encryption_level'>;
export type BoundaryType = Enums<'boundary_type'>;

export type PrometheusBoundariesRow = Tables<'prometheus_boundaries'>;
export type PrometheusBoundariesInsert = TablesInsert<'prometheus_boundaries'>;
export type PrometheusBoundariesUpdate = TablesUpdate<'prometheus_boundaries'>;

// =====================================================
// DERIVED TYPES
// =====================================================

/**
 * Public view of prometheus_boundaries
 */
export interface PublicPrometheusBoundaries {
  created_at: string;
  created_by: string | null;
  encryption_level: EncryptionLevel;
  is_active: boolean;
  path_pattern: string | null;
  pattern: string | null;
  prometheus_boundaries_id: string;
  reason: string;
  requires_approval: boolean;
  rule_type: BoundaryType;
  updated_at: string;
  updated_by: string | null;
}

/**
 * Form data for prometheus_boundaries
 * All fields are optional for partial updates
 */
export interface PrometheusBoundariesFormData {
  created_at?: string;
  created_by?: string | null;
  encryption_level?: EncryptionLevel;
  is_active?: boolean;
  path_pattern?: string | null;
  pattern?: string | null;
  prometheus_boundaries_id?: string;
  reason?: string;
  requires_approval?: boolean;
  rule_type?: BoundaryType;
  updated_at?: string;
  updated_by?: string | null;
}

/**
 * Validation result for prometheus_boundaries
 */
export interface PrometheusBoundariesValidationResult {
  valid: boolean;
  errors: {
    created_at?: string;
    created_by?: string;
    encryption_level?: string;
    is_active?: string;
    path_pattern?: string;
    pattern?: string;
    prometheus_boundaries_id?: string;
    reason?: string;
    requires_approval?: string;
    rule_type?: string;
    updated_at?: string;
    updated_by?: string;
  };
}

