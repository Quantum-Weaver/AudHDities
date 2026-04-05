// =====================================================
// FILE: types/themis_governance/applications.ts
// HANDLING: full_crud
// DEITY: themis_governance
// GENERATED: 2026-04-05T19:46:32.918Z
// SOURCE: database.types.ts lines 464-526
// =====================================================

import type { Database } from '@/types/supabase/database.types';
import type { Json } from '@/types/supabase/database.types';

// =====================================================
// CORE TYPES
// =====================================================

// =====================================================
// ENUM EXPORTS (from database enums)
// =====================================================

export type ApplicationType = Database['public']['Enums']['application_type'];
export type ApplicationStatus = Database['public']['Enums']['application_status'];

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
  admin_notes: string | null
  application_type: ApplicationType
  created_at: string | null
  form_data: Json
  id: string
  onboarding_doc_path: string | null
  onboarding_version: string | null
  review_notes: string | null
  reviewed_at: string | null
  reviewed_by: string | null
  status: ApplicationStatus | null
  updated_at: string | null
  user_id: string
}

/**
 * Form data for applications
 * All fields are optional for partial updates
 */
export interface ApplicationsFormData {
  admin_notes?: string | null;
  application_type?: ApplicationType;
  created_at?: string | null;
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

