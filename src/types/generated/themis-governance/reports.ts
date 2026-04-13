// =====================================================
// FILE: types/generated/themis-governance/reports.ts
// HANDLING: full_crud
// GENERATED: 2026-04-13T15:29:50.901Z
// SOURCE: database.types.ts lines 4828-4916
// =====================================================

import type { Database } from 'src/types/supabase/database.types';

// =====================================================
// ENUM EXPORTS (from database enums)
// =====================================================

export type ReportType = Database['public']['Enums']['report_type'];
export type ReportStatus = Database['public']['Enums']['report_status'];
export type ReportTargetType = Database['public']['Enums']['report_target_type'];

// =====================================================
// CORE TYPES
// =====================================================

export type ReportsRow = Database['public']['Tables']['reports']['Row'];
export type ReportsInsert = Database['public']['Tables']['reports']['Insert'];
export type ReportsUpdate = Database['public']['Tables']['reports']['Update'];

// =====================================================
// DERIVED TYPES
// =====================================================

/**
 * Public view of reports
 */
export interface PublicReports {
  created_at: string | null;
  created_by: string | null;
  id: string;
  moderation_notes: string | null;
  moderator_id: string | null;
  reason: string;
  report_type: ReportType;
  reported_content: string | null;
  reported_url: string | null;
  reported_user_id: string | null;
  reporter_id: string;
  resolution: string | null;
  resolved_at: string | null;
  status: ReportStatus | null;
  target_id: string;
  target_type: ReportTargetType;
  updated_at: string | null;
}

/**
 * Form data for reports
 * All fields are optional for partial updates
 */
export interface ReportsFormData {
  created_at?: string | null;
  created_by?: string | null;
  id?: string;
  moderation_notes?: string | null;
  moderator_id?: string | null;
  reason?: string;
  report_type?: ReportType;
  reported_content?: string | null;
  reported_url?: string | null;
  reported_user_id?: string | null;
  reporter_id?: string;
  resolution?: string | null;
  resolved_at?: string | null;
  status?: ReportStatus | null;
  target_id?: string;
  target_type?: ReportTargetType;
  updated_at?: string | null;
}

/**
 * Validation result for reports
 */
export interface ReportsValidationResult {
  valid: boolean;
  errors: {
    created_at?: string;
    created_by?: string;
    id?: string;
    moderation_notes?: string;
    moderator_id?: string;
    reason?: string;
    report_type?: string;
    reported_content?: string;
    reported_url?: string;
    reported_user_id?: string;
    reporter_id?: string;
    resolution?: string;
    resolved_at?: string;
    status?: string;
    target_id?: string;
    target_type?: string;
    updated_at?: string;
  };
}

