// =====================================================
// FILE: types/generated/themis-governance/applications.ts
// HANDLING: full_crud
// DEITY: themis-governance
// GENERATED: 2026-07-10T18:14:59.222Z
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
  created_at: string;
  created_by: string | null;
  form_data: Json;
  icon_emoji: string | null;
  id: string;
  onboarding_doc_path: string | null;
  onboarding_version: string | null;
  review_notes: string | null;
  reviewed_at: string | null;
  reviewed_by: string | null;
  status: ApplicationStatus;
  updated_at: string;
  updated_by: string | null;
  user_id: string;
  verification_notes: string | null;
  verified_by: string | null;
}

/**
 * Form data for applications
 * All fields are optional for partial updates
 */
export interface ApplicationsFormData {
  admin_notes?: string | null;
  application_type?: ApplicationType;
  created_at?: string;
  created_by?: string | null;
  form_data?: Json;
  icon_emoji?: string | null;
  id?: string;
  onboarding_doc_path?: string | null;
  onboarding_version?: string | null;
  review_notes?: string | null;
  reviewed_at?: string | null;
  reviewed_by?: string | null;
  status?: ApplicationStatus;
  updated_at?: string;
  updated_by?: string | null;
  user_id?: string;
  verification_notes?: string | null;
  verified_by?: string | null;
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
    icon_emoji?: string;
    id?: string;
    onboarding_doc_path?: string;
    onboarding_version?: string;
    review_notes?: string;
    reviewed_at?: string;
    reviewed_by?: string;
    status?: string;
    updated_at?: string;
    updated_by?: string;
    user_id?: string;
    verification_notes?: string;
    verified_by?: string;
  };
}

