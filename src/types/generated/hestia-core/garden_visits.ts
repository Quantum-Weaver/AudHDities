// =====================================================
// FILE: types/generated/hestia-core/garden_visits.ts
// HANDLING: full_crud
// DEITY: hestia-core
// GENERATED: 2026-07-10T18:14:59.447Z
// SOURCE: database.types.ts lines 0-0
// =====================================================

import type { Tables, TablesInsert, TablesUpdate, Enums } from '@/types/supabase/database.helpers.js';

// =====================================================
// CORE TYPES
// =====================================================

export type GardenVisitsRow = Tables<'garden_visits'>;
export type GardenVisitsInsert = TablesInsert<'garden_visits'>;
export type GardenVisitsUpdate = TablesUpdate<'garden_visits'>;

// =====================================================
// DERIVED TYPES
// =====================================================

/**
 * Public view of garden_visits
 */
export interface PublicGardenVisits {
  action: string | null;
  created_at: string;
  id: string;
  notes: string | null;
  plot_id: string;
  updated_at: string;
  visited_at: string;
  visitor_id: string;
}

/**
 * Form data for garden_visits
 * All fields are optional for partial updates
 */
export interface GardenVisitsFormData {
  action?: string | null;
  created_at?: string;
  id?: string;
  notes?: string | null;
  plot_id?: string;
  updated_at?: string;
  visited_at?: string;
  visitor_id?: string;
}

/**
 * Validation result for garden_visits
 */
export interface GardenVisitsValidationResult {
  valid: boolean;
  errors: {
    action?: string;
    created_at?: string;
    id?: string;
    notes?: string;
    plot_id?: string;
    updated_at?: string;
    visited_at?: string;
    visitor_id?: string;
  };
}

