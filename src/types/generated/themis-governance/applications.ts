// =====================================================
// FILE: types/generated/themis-governance/applications.ts
// TYPE: table
// HANDLING: full_crud
// GENERATED: 2026-04-22T18:24:18.704Z
// SOURCE: database.types.ts (via Tables helper)
// =====================================================

import type { Tables, TablesInsert, TablesUpdate } from '@/types/supabase/database.helpers';
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

