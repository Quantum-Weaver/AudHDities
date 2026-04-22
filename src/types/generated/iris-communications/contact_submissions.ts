// =====================================================
// FILE: types/generated/iris-communications/contact_submissions.ts
// TYPE: table
// HANDLING: full_crud
// GENERATED: 2026-04-22T18:15:09.711Z
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

export type ContactDirection = Database['public']['Enums']['contact_direction'];
export type ContactStatus = Database['public']['Enums']['contact_status'];
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
  created_at: string | null;
  created_by: string | null;
  direction: ContactDirection | null;
  id: string;
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

