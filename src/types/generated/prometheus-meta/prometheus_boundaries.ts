// =====================================================
// FILE: types/generated/prometheus-meta/prometheus_boundaries.ts
// TYPE: table
// HANDLING: full_crud
// GENERATED: 2026-04-22T18:15:10.358Z
// SOURCE: database.types.ts (via Tables helper)
// =====================================================

import type { Tables, TablesInsert, TablesUpdate } from '@/types/supabase/database.helpers';
import type { Database } from '@/types/supabase/database.types';

// =====================================================
// CORE TYPES
// =====================================================

// =====================================================
// ENUM EXPORTS (from database enums)
// =====================================================

export type EncryptionLevel = Database['public']['Enums']['encryption_level'];
export type BoundaryType = Database['public']['Enums']['boundary_type'];
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

