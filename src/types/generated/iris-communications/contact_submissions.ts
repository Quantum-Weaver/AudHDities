// =====================================================
// FILE: types/generated/iris-communications/contact_submissions.ts
// HANDLING: full_crud
// DEITY: iris-communications
// GENERATED: 2026-04-30T15:32:13.369Z
// SOURCE: database.types.ts lines 0-0
// =====================================================

import type { Tables, TablesInsert, TablesUpdate, Enums } from '@/types/supabase/database.helpers.js';

// =====================================================
// CORE TYPES
// =====================================================

// =====================================================
// ENUM EXPORTS (from database enums)
// =====================================================

export type ContactDirection = Enums<'contact_direction'>;
export type ContactStatus = Enums<'contact_status'>;

export type ContactSubmissionsRow = Tables<'contact_submissions'>;
export type ContactSubmissionsInsert = TablesInsert<'contact_submissions'>;
export type ContactSubmissionsUpdate = TablesUpdate<'contact_submissions'>;

// =====================================================
// DERIVED TYPES
// =====================================================

/**
 * Public view of contact_submissions
 * Excludes sensitive fields: email
 */
export interface PublicContactSubmissions {
  assigned_to: string | null;
  contact_submissions_id: string;
  created_at: string | null;
  created_by: string | null;
  direction: ContactDirection | null;
  message: string;
  message_id: string | null;
  name: string;
  notes: string | null;
  parent_id: string | null;
  resolved_at: string | null;
  status: ContactStatus | null;
  subject: string;
  thread_id: string | null;
  updated_at: string | null;
  user_id: string | null;
}

/**
 * Form data for contact_submissions
 * All fields are optional for partial updates
 */
export interface ContactSubmissionsFormData {
  assigned_to?: string | null;
  contact_submissions_id?: string;
  created_at?: string | null;
  created_by?: string | null;
  direction?: ContactDirection | null;
  email?: string;
  message?: string;
  message_id?: string | null;
  name?: string;
  notes?: string | null;
  parent_id?: string | null;
  resolved_at?: string | null;
  status?: ContactStatus | null;
  subject?: string;
  thread_id?: string | null;
  updated_at?: string | null;
  user_id?: string | null;
}

/**
 * Validation result for contact_submissions
 */
export interface ContactSubmissionsValidationResult {
  valid: boolean;
  errors: {
    assigned_to?: string;
    contact_submissions_id?: string;
    created_at?: string;
    created_by?: string;
    direction?: string;
    email?: string;
    message?: string;
    message_id?: string;
    name?: string;
    notes?: string;
    parent_id?: string;
    resolved_at?: string;
    status?: string;
    subject?: string;
    thread_id?: string;
    updated_at?: string;
    user_id?: string;
  };
}

