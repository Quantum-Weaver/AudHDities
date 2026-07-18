// =====================================================
// FILE: types/generated/daedalus-meta/generation_templates.ts
// HANDLING: full_crud
// DEITY: daedalus-meta
// GENERATED: 2026-07-18T23:09:31.220Z
// SOURCE: database.types.ts lines 0-0
// =====================================================

import type { Tables, TablesInsert, TablesUpdate, Enums } from '@/types/supabase/database.helpers.js';
import type { Json } from '@/types/supabase/database.types.js';

// =====================================================
// CORE TYPES
// =====================================================

// =====================================================
// ENUM EXPORTS (from database enums)
// =====================================================

export type ContentStatus = Enums<'content_status'>;

export type GenerationTemplatesRow = Tables<'generation_templates'>;
export type GenerationTemplatesInsert = TablesInsert<'generation_templates'>;
export type GenerationTemplatesUpdate = TablesUpdate<'generation_templates'>;

// =====================================================
// DERIVED TYPES
// =====================================================

/**
 * Public view of generation_templates
 */
export interface PublicGenerationTemplates {
  created_at: string;
  created_by: string | null;
  description: string | null;
  id: string;
  name: string;
  output_pattern: string | null;
  slug: string;
  status: ContentStatus;
  template_content: string | null;
  template_type: string | null;
  updated_at: string;
  updated_by: string | null;
  variables: Json | null;
}

/**
 * Form data for generation_templates
 * All fields are optional for partial updates
 */
export interface GenerationTemplatesFormData {
  created_at?: string;
  created_by?: string | null;
  description?: string | null;
  id?: string;
  name?: string;
  output_pattern?: string | null;
  slug?: string;
  status?: ContentStatus;
  template_content?: string | null;
  template_type?: string | null;
  updated_at?: string;
  updated_by?: string | null;
  variables?: Json | null;
}

/**
 * Validation result for generation_templates
 */
export interface GenerationTemplatesValidationResult {
  valid: boolean;
  errors: {
    created_at?: string;
    created_by?: string;
    description?: string;
    id?: string;
    name?: string;
    output_pattern?: string;
    slug?: string;
    status?: string;
    template_content?: string;
    template_type?: string;
    updated_at?: string;
    updated_by?: string;
    variables?: string;
  };
}

