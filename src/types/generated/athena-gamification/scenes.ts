// =====================================================
// FILE: types/generated/athena-gamification/scenes.ts
// HANDLING: full_crud
// DEITY: athena-gamification
// GENERATED: 2026-08-01T16:03:06.938Z
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

export type ScenesRow = Tables<'scenes'>;
export type ScenesInsert = TablesInsert<'scenes'>;
export type ScenesUpdate = TablesUpdate<'scenes'>;

// =====================================================
// DERIVED TYPES
// =====================================================

/**
 * Public view of scenes
 */
export interface PublicScenes {
  background_url: string | null;
  created_at: string;
  created_by: string | null;
  description: string | null;
  difficulty: string | null;
  display_order: number;
  icon_url: string | null;
  id: string;
  name: string;
  participant_limit: number | null;
  scene_type: string | null;
  slug: string;
  spawn_rules: Json | null;
  status: ContentStatus;
  updated_at: string;
  updated_by: string | null;
}

/**
 * Form data for scenes
 * All fields are optional for partial updates
 */
export interface ScenesFormData {
  background_url?: string | null;
  created_at?: string;
  created_by?: string | null;
  description?: string | null;
  difficulty?: string | null;
  display_order?: number;
  icon_url?: string | null;
  id?: string;
  name?: string;
  participant_limit?: number | null;
  scene_type?: string | null;
  slug?: string;
  spawn_rules?: Json | null;
  status?: ContentStatus;
  updated_at?: string;
  updated_by?: string | null;
}

/**
 * Validation result for scenes
 */
export interface ScenesValidationResult {
  valid: boolean;
  errors: {
    background_url?: string;
    created_at?: string;
    created_by?: string;
    description?: string;
    difficulty?: string;
    display_order?: string;
    icon_url?: string;
    id?: string;
    name?: string;
    participant_limit?: string;
    scene_type?: string;
    slug?: string;
    spawn_rules?: string;
    status?: string;
    updated_at?: string;
    updated_by?: string;
  };
}

