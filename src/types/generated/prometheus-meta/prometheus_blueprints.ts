// =====================================================
// FILE: types/generated/prometheus-meta/prometheus_blueprints.ts
// TYPE: table
// HANDLING: full_crud
// GENERATED: 2026-04-22T18:15:10.347Z
// SOURCE: database.types.ts (via Tables helper)
// =====================================================

import type { Tables, TablesInsert, TablesUpdate } from '@/types/supabase/database.helpers';
import type { Database } from '@/types/supabase/database.types';
import type { Json } from '@/types/supabase/database.types';

// =====================================================
// CORE TYPES
// =====================================================

// =====================================================
// ENUM EXPORTS (from database enums)
// =====================================================

export type BlueprintStatus = Database['public']['Enums']['blueprint_status'];
export type BlueprintSystem = Database['public']['Enums']['blueprint_system'];
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
  blueprint_id: string;
  content: Json;
  created_at: string;
  generation_count: number;
  id: string;
  purpose: string;
  status: BlueprintStatus;
  success_rate: number | null;
  system: BlueprintSystem;
  updated_at: string;
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

