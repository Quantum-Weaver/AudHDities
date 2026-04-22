// =====================================================
// FILE: types/generated/hephaestus-infrastructure/file_type_standards.ts
// TYPE: table
// GENERATED: 2026-04-22T04:38:05.397Z
// SOURCE: database.types.ts (via Tables helper)
// =====================================================

import type { Tables, TablesInsert, TablesUpdate } from '@/types/supabase/database.helpers';

// =====================================================
// CORE TYPES
// =====================================================

export type FileTypeStandardsRow = Tables<'file_type_standards'>;
export type FileTypeStandardsInsert = TablesInsert<'file_type_standards'>;
export type FileTypeStandardsUpdate = TablesUpdate<'file_type_standards'>;

// =====================================================
// DERIVED TYPES
// =====================================================

// Public interface (sensitive fields excluded)
// export type PublicFileTypeStandards = Omit<FileTypeStandardsRow, 'email' | 'password' | '...'>;
// TODO: Generate based on sensitive_fields config

// Form data interface (all fields optional)
// export type FileTypeStandardsFormData = Partial<FileTypeStandardsInsert>;

