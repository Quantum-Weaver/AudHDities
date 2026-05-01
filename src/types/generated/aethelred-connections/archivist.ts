// =====================================================
// FILE: types/generated/aethelred-connections/archivist.ts
// HANDLING: full_crud
// DEITY: aethelred-connections
// GENERATED: 2026-05-01T15:31:59.449Z
// SOURCE: database.types.ts lines 0-0
// =====================================================

import type { Tables, TablesInsert, TablesUpdate, Enums } from '@/types/supabase/database.helpers.js';
import type { Json } from '@/types/supabase/database.types.js';

// =====================================================
// CORE TYPES
// =====================================================

export type ArchivistRow = Tables<'archivist'>;
export type ArchivistInsert = TablesInsert<'archivist'>;
export type ArchivistUpdate = TablesUpdate<'archivist'>;

// =====================================================
// DERIVED TYPES
// =====================================================

/**
 * Public view of archivist
 */
export interface PublicArchivist {
  archivist_id: string;
  backup_status: Json | null;
  created_at: string | null;
  created_by: string | null;
  documentation_standards: Json | null;
  historical_records: Json | null;
  last_archive_at: string | null;
  milestones: Json | null;
  updated_at: string | null;
  updated_by: string | null;
  version_history: Json | null;
}

/**
 * Form data for archivist
 * All fields are optional for partial updates
 */
export interface ArchivistFormData {
  archivist_id?: string;
  backup_status?: Json | null;
  created_at?: string | null;
  created_by?: string | null;
  documentation_standards?: Json | null;
  historical_records?: Json | null;
  last_archive_at?: string | null;
  milestones?: Json | null;
  updated_at?: string | null;
  updated_by?: string | null;
  version_history?: Json | null;
}

/**
 * Validation result for archivist
 */
export interface ArchivistValidationResult {
  valid: boolean;
  errors: {
    archivist_id?: string;
    backup_status?: string;
    created_at?: string;
    created_by?: string;
    documentation_standards?: string;
    historical_records?: string;
    last_archive_at?: string;
    milestones?: string;
    updated_at?: string;
    updated_by?: string;
    version_history?: string;
  };
}

