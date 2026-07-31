// =====================================================
// FILE: types/generated/plutus-economics/grant_attachments.ts
// HANDLING: full_crud
// DEITY: plutus-economics
// GENERATED: 2026-07-31T00:35:01.466Z
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

export type GrantAttachmentsRow = Tables<'grant_attachments'>;
export type GrantAttachmentsInsert = TablesInsert<'grant_attachments'>;
export type GrantAttachmentsUpdate = TablesUpdate<'grant_attachments'>;

// =====================================================
// DERIVED TYPES
// =====================================================

/**
 * Public view of grant_attachments
 */
export interface PublicGrantAttachments {
  attachment_type: string | null;
  created_at: string;
  created_by: string;
  description: string | null;
  file_size: number | null;
  file_url: string | null;
  id: string;
  mime_type: string | null;
  name: string;
  status: ContentStatus;
  tags: string[] | null;
  updated_at: string;
  updated_by: string | null;
}

/**
 * Form data for grant_attachments
 * All fields are optional for partial updates
 */
export interface GrantAttachmentsFormData {
  attachment_type?: string | null;
  created_at?: string;
  created_by?: string;
  description?: string | null;
  file_size?: number | null;
  file_url?: string | null;
  id?: string;
  mime_type?: string | null;
  name?: string;
  status?: ContentStatus;
  tags?: string[] | null;
  updated_at?: string;
  updated_by?: string | null;
}

/**
 * Validation result for grant_attachments
 */
export interface GrantAttachmentsValidationResult {
  valid: boolean;
  errors: {
    attachment_type?: string;
    created_at?: string;
    created_by?: string;
    description?: string;
    file_size?: string;
    file_url?: string;
    id?: string;
    mime_type?: string;
    name?: string;
    status?: string;
    tags?: string;
    updated_at?: string;
    updated_by?: string;
  };
}

