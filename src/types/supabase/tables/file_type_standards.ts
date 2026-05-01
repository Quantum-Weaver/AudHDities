// src/types/supabase/tables/file_type_standards.ts
import type { Database } from '../database.types';

export type FileTypeStandard = Database['public']['Tables']['file_type_standards']['Row'];
export type FileTypeStandardInsert = Database['public']['Tables']['file_type_standards']['Insert'];
export type FileTypeStandardUpdate = Database['public']['Tables']['file_type_standards']['Update'];

export interface FileTypeStandardWithRelations extends FileTypeStandard {
  // No foreign keys - standalone table
}

export const fileTypeStandardDefaults = {
  must_handle_errors: true,
  must_have_interfaces: true,
  must_have_loading_state: false,
  must_have_props: false,
  required_imports: [],
  required_patterns: [],
  prohibited_patterns: [],
} as const;