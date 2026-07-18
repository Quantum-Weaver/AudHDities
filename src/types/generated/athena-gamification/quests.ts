// =====================================================
// FILE: types/generated/athena-gamification/quests.ts
// HANDLING: full_crud
// DEITY: athena-gamification
// GENERATED: 2026-07-18T23:17:11.038Z
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

export type QuestsRow = Tables<'quests'>;
export type QuestsInsert = TablesInsert<'quests'>;
export type QuestsUpdate = TablesUpdate<'quests'>;

// =====================================================
// DERIVED TYPES
// =====================================================

/**
 * Public view of quests
 */
export interface PublicQuests {
  created_at: string;
  created_by: string | null;
  description: string | null;
  difficulty: string | null;
  display_order: number;
  icon_url: string | null;
  id: string;
  name: string;
  objectives: Json | null;
  prerequisites: Json | null;
  quest_type: string | null;
  rewards: Json | null;
  slug: string;
  status: ContentStatus;
  updated_at: string;
  updated_by: string | null;
}

/**
 * Form data for quests
 * All fields are optional for partial updates
 */
export interface QuestsFormData {
  created_at?: string;
  created_by?: string | null;
  description?: string | null;
  difficulty?: string | null;
  display_order?: number;
  icon_url?: string | null;
  id?: string;
  name?: string;
  objectives?: Json | null;
  prerequisites?: Json | null;
  quest_type?: string | null;
  rewards?: Json | null;
  slug?: string;
  status?: ContentStatus;
  updated_at?: string;
  updated_by?: string | null;
}

/**
 * Validation result for quests
 */
export interface QuestsValidationResult {
  valid: boolean;
  errors: {
    created_at?: string;
    created_by?: string;
    description?: string;
    difficulty?: string;
    display_order?: string;
    icon_url?: string;
    id?: string;
    name?: string;
    objectives?: string;
    prerequisites?: string;
    quest_type?: string;
    rewards?: string;
    slug?: string;
    status?: string;
    updated_at?: string;
    updated_by?: string;
  };
}

