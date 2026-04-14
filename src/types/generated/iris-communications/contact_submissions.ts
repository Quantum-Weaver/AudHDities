// =====================================================
// FILE: types/generated/iris-communications/contact_submissions.ts
// HANDLING: full_crud
// GENERATED: 2026-04-14T21:18:08.815Z
// SOURCE: database.types.ts lines 1280-1368
// =====================================================

import type { Database } from '@/types/supabase/database.types';

// =====================================================
// ENUM EXPORTS (from database enums)
// =====================================================

export type ContactDirection = Database['public']['Enums']['contact_direction'];
export type ContactStatus = Database['public']['Enums']['contact_status'];

// =====================================================
// CORE TYPES
// =====================================================

export type ContactSubmissionsRow = Database['public']['Tables']['contact_submissions']['Row'];
export type ContactSubmissionsInsert = Database['public']['Tables']['contact_submissions']['Insert'];
export type ContactSubmissionsUpdate = Database['public']['Tables']['contact_submissions']['Update'];

// =====================================================
// DERIVED TYPES
// =====================================================

/**
 * Public view of contact_submissions
 * Excludes sensitive fields: email
 */
export interface PublicContactSubmissions {
  assigned_to: string | null;
  "created_at": "string | null";
  created_by: string | null;
  direction: ContactDirection | null;
  id: string;
  message: string;
  message_id: string | null;
  name: string;
  notes: string | null;
  parent_id: string | null;
  "resolved_at": "string | null";
  status: ContactStatus | null;
  subject: string;
  thread_id: string | null;
  "updated_at": "string | null";
  user_id: string | null;
}

/**
 * Form data for contact_submissions
 * All fields are optional for partial updates
 */
export interface ContactSubmissionsFormData {
  assigned_to?: string | null;
  created_at?: string | null;
  created_by?: string | null;
  direction?: ContactDirection | null;
  email?: string;
  id?: string;
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
    created_at?: string;
    created_by?: string;
    direction?: string;
    email?: string;
    id?: string;
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

