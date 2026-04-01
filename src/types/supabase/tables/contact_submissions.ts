// src/types/supabase/tables/contact_submissions.ts
import type { Database } from '../database.types';

export type ContactSubmission = Database['public']['Tables']['contact_submissions']['Row'];
export type ContactSubmissionInsert = Database['public']['Tables']['contact_submissions']['Insert'];
export type ContactSubmissionUpdate = Database['public']['Tables']['contact_submissions']['Update'];

export interface ContactSubmissionWithRelations extends ContactSubmission {
  parent?: Database['public']['Tables']['contact_submissions']['Row'];
  replies?: Database['public']['Tables']['contact_submissions']['Row'][];
}

export interface ContactWithThread extends ContactSubmission {
  replies?: ContactSubmission[];
  parent?: ContactSubmission;
}

export const contactSubmissionDefaults = {
  status: 'new',
  direction: 'incoming',
} as const;
