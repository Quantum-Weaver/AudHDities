// =====================================================
// FILE: types/aethelred_connections/codex.ts
// HANDLING: full_crud
// DEITY: aethelred_connections
// GENERATED: 2026-04-05T19:46:32.941Z
// SOURCE: database.types.ts lines 858-901
// =====================================================

import type { Database } from '@/types/supabase/database.types';
import type { Json } from '@/types/supabase/database.types';

// =====================================================
// CORE TYPES
// =====================================================

export type CodexRow = Database['public']['Tables']['codex']['Row'];
export type CodexInsert = Database['public']['Tables']['codex']['Insert'];
export type CodexUpdate = Database['public']['Tables']['codex']['Update'];

// =====================================================
// DERIVED TYPES
// =====================================================

/**
 * Public view of codex
 */
export interface PublicCodex {
  created_at: string | null
  glossary: Json | null
  id: string
  knowledge_base: Json | null
  learning_paths: Json | null
  ontology_graph: Json | null
  taxonomy_tree: Json | null
  updated_at: string | null
  wisdom_queue: Json | null
}

/**
 * Form data for codex
 * All fields are optional for partial updates
 */
export interface CodexFormData {
  created_at?: string | null;
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

