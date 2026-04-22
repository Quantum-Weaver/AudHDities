// =====================================================
// FILE: types/generated/hephaestus-infrastructure/file_registry.ts
// TYPE: table
// GENERATED: 2026-04-22T04:38:05.383Z
// SOURCE: database.types.ts (via Tables helper)
// =====================================================

import type { Tables, TablesInsert, TablesUpdate } from '@/types/supabase/database.helpers';

// =====================================================
// CORE TYPES
// =====================================================

export type FileRegistryRow = Tables<'file_registry'>;
export type FileRegistryInsert = TablesInsert<'file_registry'>;
export type FileRegistryUpdate = TablesUpdate<'file_registry'>;

// =====================================================
// DERIVED TYPES
// =====================================================

// Public interface (sensitive fields excluded)
// export type PublicFileRegistry = Omit<FileRegistryRow, 'email' | 'password' | '...'>;
// TODO: Generate based on sensitive_fields config

// Form data interface (all fields optional)
// export type FileRegistryFormData = Partial<FileRegistryInsert>;

