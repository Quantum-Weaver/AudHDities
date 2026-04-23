// =====================================================
// FILE: types/generated/themis-governance/applications.ts
// HANDLING: full_crud
// DEITY: themis-governance
// GENERATED: 2026-04-23T02:14:52.581Z
// SOURCE: database.types.ts lines 0-0
// =====================================================

import type { Tables, TablesInsert, TablesUpdate, Enums } from '@/types/supabase/database.helpers.js';
import type { Json } from '@/types/supabase/database.types.js';

// =====================================================
// CORE TYPES
// =====================================================

// =====================================================
// ENUM EXPORTS (from database enums)
// =====================================================

export type ApplicationType = Enums<'application_type'>;
export type ApplicationStatus = Enums<'application_status'>;

export type ApplicationsRow = Tables<'applications'>;
export type ApplicationsInsert = TablesInsert<'applications'>;
export type ApplicationsUpdate = TablesUpdate<'applications'>;

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
  verification_notes: string | null;
  verified_by_profile_id: string | null;
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
  verification_notes?: string | null;
  verified_by_profile_id?: string | null;
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
    verification_notes?: string;
    verified_by_profile_id?: string;
  };
}

