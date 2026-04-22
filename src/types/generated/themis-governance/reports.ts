// =====================================================
// FILE: types/generated/themis-governance/reports.ts
// TYPE: table
// HANDLING: full_crud
// GENERATED: 2026-04-22T18:15:10.556Z
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

export type ReportType = Database['public']['Enums']['report_type'];
export type ReportStatus = Database['public']['Enums']['report_status'];
export type ReportTargetType = Database['public']['Enums']['report_target_type'];
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

