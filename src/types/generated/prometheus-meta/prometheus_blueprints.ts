// =====================================================
// FILE: types/generated/prometheus-meta/prometheus_blueprints.ts
// HANDLING: full_crud
// GENERATED: 2026-04-15T19:06:11.505Z
// SOURCE: database.types.ts lines 4072-4116
// =====================================================

import type { Database, Json } from '@/types/supabase/database.types';

// =====================================================
// ENUM EXPORTS (from database enums)
// =====================================================

export type BlueprintStatus = Database['public']['Enums']['blueprint_status'];
export type BlueprintSystem = Database['public']['Enums']['blueprint_system'];

// =====================================================
// CORE TYPES
// =====================================================

export type PrometheusBlueprintsRow = Database['public']['Tables']['prometheus_blueprints']['Row'];
export type PrometheusBlueprintsInsert = Database['public']['Tables']['prometheus_blueprints']['Insert'];
export type PrometheusBlueprintsUpdate = Database['public']['Tables']['prometheus_blueprints']['Update'];

// =====================================================
// DERIVED TYPES
// =====================================================

/**
 * Public view of prometheus_blueprints
 */
export interface PublicPrometheusBlueprints {
  author: string;
  blueprint_id: string;
  content: Json;
  "created_at": "string";
  generation_count: number;
  id: string;
  purpose: string;
  status: BlueprintStatus;
  success_rate: number | null;
  system: BlueprintSystem;
  "updated_at": "string";
  version: string;
}

/**
 * Form data for prometheus_blueprints
 * All fields are optional for partial updates
 */
export interface PrometheusBlueprintsFormData {
  author?: string;
  blueprint_id?: string;
  content?: Json;
  created_at?: string;
  generation_count?: number;
  id?: string;
  purpose?: string;
  status?: BlueprintStatus;
  success_rate?: number | null;
  system?: BlueprintSystem;
  updated_at?: string;
  version?: string;
}

/**
 * Validation result for prometheus_blueprints
 */
export interface PrometheusBlueprintsValidationResult {
  valid: boolean;
  errors: {
    author?: string;
    blueprint_id?: string;
    content?: string;
    created_at?: string;
    generation_count?: string;
    id?: string;
    purpose?: string;
    status?: string;
    success_rate?: string;
    system?: string;
    updated_at?: string;
    version?: string;
  };
}

