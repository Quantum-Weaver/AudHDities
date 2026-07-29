// =====================================================
// FILE: types/generated/iris-communications/contact_submissions.ts
// HANDLING: full_crud
// DEITY: iris-communications
// GENERATED: 2026-07-29T16:16:53.668Z
// SOURCE: database.types.ts lines 0-0
// =====================================================

import type { Tables, TablesInsert, TablesUpdate, Enums } from '@/types/supabase/database.helpers.js';

// =====================================================
// CORE TYPES
// =====================================================

// =====================================================
// ENUM EXPORTS (from database enums)
// =====================================================

export type ContentStatus = Enums<'content_status'>;

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
  category: string | null;
  created_at: string;
  created_by: string | null;
  id: string;
  is_resolved: boolean;
  message: string | null;
  name: string;
  priority: string;
  responded_at: string | null;
  response: string | null;
  status: ContentStatus;
  subject: string | null;
  updated_at: string;
  updated_by: string | null;
}

/**
 * Form data for contact_submissions
 * All fields are optional for partial updates
 */
export interface ContactSubmissionsFormData {
  assigned_to?: string | null;
  category?: string | null;
  created_at?: string;
  created_by?: string | null;
  email?: string | null;
  id?: string;
  is_resolved?: boolean;
  message?: string | null;
  name?: string;
  priority?: string;
  responded_at?: string | null;
  response?: string | null;
  status?: ContentStatus;
  subject?: string | null;
  updated_at?: string;
  updated_by?: string | null;
}

/**
 * Validation result for contact_submissions
 */
export interface ContactSubmissionsValidationResult {
  valid: boolean;
  errors: {
    assigned_to?: string;
    category?: string;
    created_at?: string;
    created_by?: string;
    email?: string;
    id?: string;
    is_resolved?: string;
    message?: string;
    name?: string;
    priority?: string;
    responded_at?: string;
    response?: string;
    status?: string;
    subject?: string;
    updated_at?: string;
    updated_by?: string;
  };
}

