// =====================================================
// FILE: types/generated/themis-governance/reports.ts
// HANDLING: full_crud
// DEITY: themis-governance
// GENERATED: 2026-07-31T00:35:01.689Z
// SOURCE: database.types.ts lines 0-0
// =====================================================

import type { Tables, TablesInsert, TablesUpdate, Enums } from '@/types/supabase/database.helpers.js';

// =====================================================
// CORE TYPES
// =====================================================

// =====================================================
// ENUM EXPORTS (from database enums)
// =====================================================

export type ApplicationStatus = Enums<'application_status'>;

export type ReportsRow = Tables<'reports'>;
export type ReportsInsert = TablesInsert<'reports'>;
export type ReportsUpdate = TablesUpdate<'reports'>;

// =====================================================
// DERIVED TYPES
// =====================================================

/**
 * Public view of reports
 */
export interface PublicReports {
  created_at: string;
  created_by: string;
  description: string | null;
  id: string;
  name: string;
  priority: string;
  report_type: string | null;
  reported_entity_id: string | null;
  reported_entity_type: string | null;
  resolution: string | null;
  review_notes: string | null;
  reviewed_at: string | null;
  reviewed_by: string | null;
  slug: string;
  status: ApplicationStatus;
  updated_at: string;
  updated_by: string | null;
}

/**
 * Form data for reports
 * All fields are optional for partial updates
 */
export interface ReportsFormData {
  created_at?: string;
  created_by?: string;
  description?: string | null;
  id?: string;
  name?: string;
  priority?: string;
  report_type?: string | null;
  reported_entity_id?: string | null;
  reported_entity_type?: string | null;
  resolution?: string | null;
  review_notes?: string | null;
  reviewed_at?: string | null;
  reviewed_by?: string | null;
  slug?: string;
  status?: ApplicationStatus;
  updated_at?: string;
  updated_by?: string | null;
}

/**
 * Validation result for reports
 */
export interface ReportsValidationResult {
  valid: boolean;
  errors: {
    created_at?: string;
    created_by?: string;
    description?: string;
    id?: string;
    name?: string;
    priority?: string;
    report_type?: string;
    reported_entity_id?: string;
    reported_entity_type?: string;
    resolution?: string;
    review_notes?: string;
    reviewed_at?: string;
    reviewed_by?: string;
    slug?: string;
    status?: string;
    updated_at?: string;
    updated_by?: string;
  };
}

