// =====================================================
// FILE: types/generated/aethelred-connections/archivist.ts
// TYPE: table
// HANDLING: full_crud
// GENERATED: 2026-04-22T18:15:09.599Z
// SOURCE: database.types.ts (via Tables helper)
// =====================================================

import type { Tables, TablesInsert, TablesUpdate } from '@/types/supabase/database.helpers';
import type { Database } from '@/types/supabase/database.types';
import type { Json } from '@/types/supabase/database.types';

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
  backup_status: Json | null;
  created_at: string | null;
  created_by: string | null;
  documentation_standards: Json | null;
  historical_records: Json | null;
  id: string;
  last_archive_at: string | null;
  milestones: Json | null;
  updated_at: string | null;
  version_history: Json | null;
}

/**
 * Form data for archivist
 * All fields are optional for partial updates
 */
export interface ArchivistFormData {
  backup_status?: Json | null;
  created_at?: string | null;
  created_by?: string | null;
  documentation_standards?: Json | null;
  historical_records?: Json | null;
  id?: string;
  last_archive_at?: string | null;
  milestones?: Json | null;
  updated_at?: string | null;
  version_history?: Json | null;
}

