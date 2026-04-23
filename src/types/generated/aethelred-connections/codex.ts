// =====================================================
// FILE: types/generated/aethelred-connections/codex.ts
// HANDLING: full_crud
// DEITY: aethelred-connections
// GENERATED: 2026-04-23T02:14:52.666Z
// SOURCE: database.types.ts lines 0-0
// =====================================================

import type { Tables, TablesInsert, TablesUpdate, Enums } from '@/types/supabase/database.helpers.js';
import type { Json } from '@/types/supabase/database.types.js';

// =====================================================
// CORE TYPES
// =====================================================

export type CodexRow = Tables<'codex'>;
export type CodexInsert = TablesInsert<'codex'>;
export type CodexUpdate = TablesUpdate<'codex'>;

// =====================================================
// DERIVED TYPES
// =====================================================

/**
 * Public view of codex
 */
export interface PublicCodex {
  created_at: string | null;
  created_by: string | null;
  glossary: Json | null;
  id: string;
  knowledge_base: Json | null;
  learning_paths: Json | null;
  ontology_graph: Json | null;
  taxonomy_tree: Json | null;
  updated_at: string | null;
  wisdom_queue: Json | null;
}

/**
 * Form data for codex
 * All fields are optional for partial updates
 */
export interface CodexFormData {
  created_at?: string | null;
  created_by?: string | null;
  glossary?: Json | null;
  id?: string;
  knowledge_base?: Json | null;
  learning_paths?: Json | null;
  ontology_graph?: Json | null;
  taxonomy_tree?: Json | null;
  updated_at?: string | null;
  wisdom_queue?: Json | null;
}

/**
 * Validation result for codex
 */
export interface CodexValidationResult {
  valid: boolean;
  errors: {
    created_at?: string;
    created_by?: string;
    glossary?: string;
    id?: string;
    knowledge_base?: string;
    learning_paths?: string;
    ontology_graph?: string;
    taxonomy_tree?: string;
    updated_at?: string;
    wisdom_queue?: string;
  };
}

