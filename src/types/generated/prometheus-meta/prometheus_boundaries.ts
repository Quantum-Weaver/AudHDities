// =====================================================
// FILE: types/generated/prometheus-meta/prometheus_boundaries.ts
// HANDLING: full_crud
// GENERATED: 2026-04-15T19:30:35.448Z
// SOURCE: database.types.ts lines 4117-4158
// =====================================================

import type { Database } from '@/types/supabase/database.types';

// =====================================================
// ENUM EXPORTS (from database enums)
// =====================================================

export type EncryptionLevel = Database['public']['Enums']['encryption_level'];
export type BoundaryType = Database['public']['Enums']['boundary_type'];

// =====================================================
// CORE TYPES
// =====================================================

export type PrometheusBoundariesRow = Database['public']['Tables']['prometheus_boundaries']['Row'];
export type PrometheusBoundariesInsert = Database['public']['Tables']['prometheus_boundaries']['Insert'];
export type PrometheusBoundariesUpdate = Database['public']['Tables']['prometheus_boundaries']['Update'];

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
  id: string;
  is_active: boolean;
  path_pattern: string | null;
  pattern: string | null;
  reason: string;
  requires_approval: boolean;
  rule_type: BoundaryType;
  updated_at: string;
}

/**
 * Form data for prometheus_boundaries
 * All fields are optional for partial updates
 */
export interface PrometheusBoundariesFormData {
  created_at?: string;
  created_by?: string | null;
  encryption_level?: EncryptionLevel;
  id?: string;
  is_active?: boolean;
  path_pattern?: string | null;
  pattern?: string | null;
  reason?: string;
  requires_approval?: boolean;
  rule_type?: BoundaryType;
  updated_at?: string;
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
    id?: string;
    is_active?: string;
    path_pattern?: string;
    pattern?: string;
    reason?: string;
    requires_approval?: string;
    rule_type?: string;
    updated_at?: string;
  };
}

