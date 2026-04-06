// =====================================================
// FILE: types/hephaestus_infrastructure/systems.ts
// HANDLING: full_crud
// DEITY: hephaestus_infrastructure
// GENERATED: 2026-04-05T21:55:13.103Z
// SOURCE: database.types.ts lines 5000-5050
// =====================================================

import type { Database } from '@/types/supabase/database.types';

// =====================================================
// CORE TYPES
// =====================================================

// =====================================================
// ENUM EXPORTS (from database enums)
// =====================================================

type SystemStatus = Database['public']['Enums']['system_status'];
export type SystemType = Database['public']['Enums']['system_type'];

export type SystemsRow = Database['public']['Tables']['systems']['Row'];
export type SystemsInsert = Database['public']['Tables']['systems']['Insert'];
export type SystemsUpdate = Database['public']['Tables']['systems']['Update'];

// =====================================================
// DERIVED TYPES
// =====================================================

/**
 * Public view of systems
 */
export interface PublicSystems {
  created_at: string | null;
  dependencies: string[] | null;
  description: string | null;
  health_check_url: string | null;
  id: string;
  last_health_check: string | null;
  last_incident: string | null;
  name: string;
  slug: string;
  status: SystemStatus | null;
  type: SystemType;
  updated_at: string | null;
  uptime_percent: number | null;
  version: string | null;
}

/**
 * Form data for systems
 * All fields are optional for partial updates
 */
export interface SystemsFormData {
  created_at?: string | null;
  dependencies?: string[] | null;
  description?: string | null;
  health_check_url?: string | null;
  id?: string;
  last_health_check?: string | null;
  last_incident?: string | null;
  name?: string;
  slug?: string;
  status?: SystemStatus | null;
  type?: SystemType;
  updated_at?: string | null;
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
    dependencies?: string;
    description?: string;
    health_check_url?: string;
    id?: string;
    last_health_check?: string;
    last_incident?: string;
    name?: string;
    slug?: string;
    status?: string;
    type?: string;
    updated_at?: string;
    uptime_percent?: string;
    version?: string;
  };
}

