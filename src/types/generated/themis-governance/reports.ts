// =====================================================
// FILE: types/generated/themis-governance/reports.ts
// HANDLING: full_crud
// DEITY: themis-governance
// GENERATED: 2026-05-01T15:31:59.800Z
// SOURCE: database.types.ts lines 0-0
// =====================================================

import type { Tables, TablesInsert, TablesUpdate, Enums } from '@/types/supabase/database.helpers.js';

// =====================================================
// CORE TYPES
// =====================================================

// =====================================================
// ENUM EXPORTS (from database enums)
// =====================================================

export type ReportType = Enums<'report_type'>;
export type ReportStatus = Enums<'report_status'>;
export type ReportTargetType = Enums<'report_target_type'>;

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
  created_at: string | null;
  created_by: string | null;
  moderation_notes: string | null;
  moderator_id: string | null;
  reason: string;
  report_type: ReportType;
  reported_content: string | null;
  reported_url: string | null;
  reported_user_id: string | null;
  reporter_id: string;
  reports_id: string;
  resolution: string | null;
  resolved_at: string | null;
  status: ReportStatus | null;
  target_id: string;
  target_type: ReportTargetType;
  updated_at: string | null;
  updated_by: string | null;
}

/**
 * Form data for reports
 * All fields are optional for partial updates
 */
export interface ReportsFormData {
  created_at?: string | null;
  created_by?: string | null;
  moderation_notes?: string | null;
  moderator_id?: string | null;
  reason?: string;
  report_type?: ReportType;
  reported_content?: string | null;
  reported_url?: string | null;
  reported_user_id?: string | null;
  reporter_id?: string;
  reports_id?: string;
  resolution?: string | null;
  resolved_at?: string | null;
  status?: ReportStatus | null;
  target_id?: string;
  target_type?: ReportTargetType;
  updated_at?: string | null;
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
    moderation_notes?: string;
    moderator_id?: string;
    reason?: string;
    report_type?: string;
    reported_content?: string;
    reported_url?: string;
    reported_user_id?: string;
    reporter_id?: string;
    reports_id?: string;
    resolution?: string;
    resolved_at?: string;
    status?: string;
    target_id?: string;
    target_type?: string;
    updated_at?: string;
    updated_by?: string;
  };
}

