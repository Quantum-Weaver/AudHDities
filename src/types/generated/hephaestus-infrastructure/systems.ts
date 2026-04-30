// =====================================================
// FILE: types/generated/hephaestus-infrastructure/systems.ts
// HANDLING: full_crud
// DEITY: hephaestus-infrastructure
// GENERATED: 2026-04-30T15:32:13.782Z
// SOURCE: database.types.ts lines 0-0
// =====================================================

import type { Tables, TablesInsert, TablesUpdate, Enums } from '@/types/supabase/database.helpers.js';

// =====================================================
// CORE TYPES
// =====================================================

// =====================================================
// ENUM EXPORTS (from database enums)
// =====================================================

export type SystemStatus = Enums<'system_status'>;
export type SystemType = Enums<'system_type'>;

export type SystemsRow = Tables<'systems'>;
export type SystemsInsert = TablesInsert<'systems'>;
export type SystemsUpdate = TablesUpdate<'systems'>;

// =====================================================
// DERIVED TYPES
// =====================================================

/**
 * Public view of systems
 */
export interface PublicSystems {
  created_at: string | null;
  created_by: string | null;
  dependencies: string[] | null;
  description: string | null;
  health_check_url: string | null;
  last_health_check: string | null;
  last_incident: string | null;
  name: string;
  slug: string;
  status: SystemStatus | null;
  systems_id: string;
  type: SystemType;
  updated_at: string | null;
  updated_by: string | null;
  uptime_percent: number | null;
  version: string | null;
}

/**
 * Form data for systems
 * All fields are optional for partial updates
 */
export interface SystemsFormData {
  created_at?: string | null;
  created_by?: string | null;
  dependencies?: string[] | null;
  description?: string | null;
  health_check_url?: string | null;
  last_health_check?: string | null;
  last_incident?: string | null;
  name?: string;
  slug?: string;
  status?: SystemStatus | null;
  systems_id?: string;
  type?: SystemType;
  updated_at?: string | null;
  updated_by?: string | null;
  uptime_percent?: number | null;
  version?: string | null;
}

/**
 * Validation result for systems
 */
export interface SystemsValidationResult {
  valid: boolean;
  errors: {
    created_at?: string;
    created_by?: string;
    dependencies?: string;
    description?: string;
    health_check_url?: string;
    last_health_check?: string;
    last_incident?: string;
    name?: string;
    slug?: string;
    status?: string;
    systems_id?: string;
    type?: string;
    updated_at?: string;
    updated_by?: string;
    uptime_percent?: string;
    version?: string;
  };
}

