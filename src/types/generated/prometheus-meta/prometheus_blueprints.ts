// =====================================================
// FILE: types/generated/prometheus-meta/prometheus_blueprints.ts
// HANDLING: full_crud
// DEITY: prometheus-meta
// GENERATED: 2026-05-01T15:31:59.722Z
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

export type BlueprintStatus = Enums<'blueprint_status'>;
export type BlueprintSystem = Enums<'blueprint_system'>;

export type PrometheusBlueprintsRow = Tables<'prometheus_blueprints'>;
export type PrometheusBlueprintsInsert = TablesInsert<'prometheus_blueprints'>;
export type PrometheusBlueprintsUpdate = TablesUpdate<'prometheus_blueprints'>;

// =====================================================
// DERIVED TYPES
// =====================================================

/**
 * Public view of prometheus_blueprints
 */
export interface PublicPrometheusBlueprints {
  author: string;
  content: Json;
  created_at: string;
  created_by: string | null;
  generation_count: number;
  prometheus_blueprints_id: string;
  purpose: string;
  status: BlueprintStatus;
  success_rate: number | null;
  system: BlueprintSystem;
  updated_at: string;
  updated_by: string | null;
  version: string;
}

/**
 * Form data for prometheus_blueprints
 * All fields are optional for partial updates
 */
export interface PrometheusBlueprintsFormData {
  author?: string;
  content?: Json;
  created_at?: string;
  created_by?: string | null;
  generation_count?: number;
  prometheus_blueprints_id?: string;
  purpose?: string;
  status?: BlueprintStatus;
  success_rate?: number | null;
  system?: BlueprintSystem;
  updated_at?: string;
  updated_by?: string | null;
  version?: string;
}

/**
 * Validation result for prometheus_blueprints
 */
export interface PrometheusBlueprintsValidationResult {
  valid: boolean;
  errors: {
    author?: string;
    content?: string;
    created_at?: string;
    created_by?: string;
    generation_count?: string;
    prometheus_blueprints_id?: string;
    purpose?: string;
    status?: string;
    success_rate?: string;
    system?: string;
    updated_at?: string;
    updated_by?: string;
    version?: string;
  };
}

