// =====================================================
// FILE: types/generated/hephaestus-infrastructure/systems.ts
// TYPE: table
// HANDLING: full_crud
// GENERATED: 2026-04-22T18:24:20.009Z
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

export type SystemStatus = Database['public']['Enums']['system_status'];
export type SystemType = Database['public']['Enums']['system_type'];
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
  created_by?: string | null;
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

