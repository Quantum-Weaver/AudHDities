// =====================================================
// FILE: types/generated/themis-governance/applications.ts
// HANDLING: full_crud
// GENERATED: 2026-04-15T19:30:35.414Z
// SOURCE: database.types.ts lines 534-606
// =====================================================

import type { Database, Json } from '@/types/supabase/database.types';

// =====================================================
// ENUM EXPORTS (from database enums)
// =====================================================

export type ApplicationType = Database['public']['Enums']['application_type'];
export type ApplicationStatus = Database['public']['Enums']['application_status'];

// =====================================================
// CORE TYPES
// =====================================================

export type ApplicationsRow = Database['public']['Tables']['applications']['Row'];
export type ApplicationsInsert = Database['public']['Tables']['applications']['Insert'];
export type ApplicationsUpdate = Database['public']['Tables']['applications']['Update'];

// =====================================================
// DERIVED TYPES
// =====================================================

/**
 * Public view of applications
 */
export interface PublicApplications {
  admin_notes: string | null;
  application_type: ApplicationType;
  created_at: string | null;
  created_by: string | null;
  form_data: Json;
  id: string;
  onboarding_doc_path: string | null;
  onboarding_version: string | null;
  review_notes: string | null;
  reviewed_at: string | null;
  reviewed_by: string | null;
  status: ApplicationStatus | null;
  updated_at: string | null;
  user_id: string;
}

/**
 * Form data for applications
 * All fields are optional for partial updates
 */
export interface ApplicationsFormData {
  admin_notes?: string | null;
  application_type?: ApplicationType;
  created_at?: string | null;
  created_by?: string | null;
  form_data?: Json;
  id?: string;
  onboarding_doc_path?: string | null;
  onboarding_version?: string | null;
  review_notes?: string | null;
  reviewed_at?: string | null;
  reviewed_by?: string | null;
  status?: ApplicationStatus | null;
  updated_at?: string | null;
  user_id?: string;
}

/**
 * Validation result for applications
 */
export interface ApplicationsValidationResult {
  valid: boolean;
  errors: {
    admin_notes?: string;
    application_type?: string;
    created_at?: string;
    created_by?: string;
    form_data?: string;
    id?: string;
    onboarding_doc_path?: string;
    onboarding_version?: string;
    review_notes?: string;
    reviewed_at?: string;
    reviewed_by?: string;
    status?: string;
    updated_at?: string;
    user_id?: string;
  };
}

