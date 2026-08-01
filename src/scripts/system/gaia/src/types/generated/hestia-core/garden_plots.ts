// =====================================================
// FILE: types/generated/hestia-core/garden_plots.ts
// HANDLING: full_crud
// DEITY: hestia-core
// GENERATED: 2026-08-01T17:46:58.417Z
// SOURCE: database.types.ts lines 0-0
// =====================================================

import type { Tables, TablesInsert, TablesUpdate, Enums } from '@/types/supabase/database.helpers.js';

// =====================================================
// CORE TYPES
// =====================================================

// =====================================================
// ENUM EXPORTS (from database enums)
// =====================================================

export type ContentStatus = Enums<'content_status'>;

export type GardenPlotsRow = Tables<'garden_plots'>;
export type GardenPlotsInsert = TablesInsert<'garden_plots'>;
export type GardenPlotsUpdate = TablesUpdate<'garden_plots'>;

// =====================================================
// DERIVED TYPES
// =====================================================

/**
 * Public view of garden_plots
 */
export interface PublicGardenPlots {
  created_at: string;
  created_by: string;
  decoration_position: string | null;
  description: string | null;
  growth_progress: number;
  id: string;
  is_active: boolean;
  is_lattice: boolean;
  last_watered_at: string | null;
  lattice_style: string | null;
  name: string;
  plant_stage_id: string | null;
  planted_at: string | null;
  plot_type: string | null;
  seed_id: string | null;
  status: ContentStatus;
  updated_at: string;
  updated_by: string | null;
}

/**
 * Form data for garden_plots
 * All fields are optional for partial updates
 */
export interface GardenPlotsFormData {
  created_at?: string;
  created_by?: string;
  decoration_position?: string | null;
  description?: string | null;
  growth_progress?: number;
  id?: string;
  is_active?: boolean;
  is_lattice?: boolean;
  last_watered_at?: string | null;
  lattice_style?: string | null;
  name?: string;
  plant_stage_id?: string | null;
  planted_at?: string | null;
  plot_type?: string | null;
  seed_id?: string | null;
  status?: ContentStatus;
  updated_at?: string;
  updated_by?: string | null;
}

/**
 * Validation result for garden_plots
 */
export interface GardenPlotsValidationResult {
  valid: boolean;
  errors: {
    created_at?: string;
    created_by?: string;
    decoration_position?: string;
    description?: string;
    growth_progress?: string;
    id?: string;
    is_active?: string;
    is_lattice?: string;
    last_watered_at?: string;
    lattice_style?: string;
    name?: string;
    plant_stage_id?: string;
    planted_at?: string;
    plot_type?: string;
    seed_id?: string;
    status?: string;
    updated_at?: string;
    updated_by?: string;
  };
}

