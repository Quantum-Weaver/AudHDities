// =====================================================
// FILE: types/aethelred_connections/archivist.ts
// HANDLING: full_crud
// DEITY: aethelred_connections
// GENERATED: 2026-04-05T19:46:32.922Z
// SOURCE: database.types.ts lines 527-570
// =====================================================

import type { Database } from '@/types/supabase/database.types';
import type { Json } from '@/types/supabase/database.types';

// =====================================================
// CORE TYPES
// =====================================================

export type ArchivistRow = Database['public']['Tables']['archivist']['Row'];
export type ArchivistInsert = Database['public']['Tables']['archivist']['Insert'];
export type ArchivistUpdate = Database['public']['Tables']['archivist']['Update'];

// =====================================================
// DERIVED TYPES
// =====================================================

/**
 * Public view of archivist
 */
export interface PublicArchivist {
  backup_status: Json | null
  created_at: string | null
  documentation_standards: Json | null
  historical_records: Json | null
  id: string
  last_archive_at: string | null
  milestones: Json | null
  updated_at: string | null
  version_history: Json | null
}

/**
 * Form data for archivist
 * All fields are optional for partial updates
 */
export interface ArchivistFormData {
  backup_status?: Json | null;
  created_at?: string | null;
  documentation_standards?: Json | null;
  historical_records?: Json | null;
  id?: string;
  last_archive_at?: string | null;
  milestones?: Json | null;
  updated_at?: string | null;
  version_history?: Json | null;
}

/**
 * Validation result for archivist
 */
export interface ArchivistValidationResult {
  valid: boolean;
  errors: {
    backup_status?: string;
    created_at?: string;
    documentation_standards?: string;
    historical_records?: string;
    id?: string;
    last_archive_at?: string;
    milestones?: string;
    updated_at?: string;
    version_history?: string;
  };
}

