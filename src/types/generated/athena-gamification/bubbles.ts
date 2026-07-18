// =====================================================
// FILE: types/generated/athena-gamification/bubbles.ts
// HANDLING: full_crud
// DEITY: athena-gamification
// GENERATED: 2026-07-18T23:17:10.649Z
// SOURCE: database.types.ts lines 0-0
// =====================================================

import type { Tables, TablesInsert, TablesUpdate, Enums } from '@/types/supabase/database.helpers.js';

// =====================================================
// CORE TYPES
// =====================================================

// =====================================================
// ENUM EXPORTS (from database enums)
// =====================================================

export type ContentStatus = Enums<'content_status'>;

export type BubblesRow = Tables<'bubbles'>;
export type BubblesInsert = TablesInsert<'bubbles'>;
export type BubblesUpdate = TablesUpdate<'bubbles'>;

// =====================================================
// DERIVED TYPES
// =====================================================

/**
 * Public view of bubbles
 */
export interface PublicBubbles {
  animation_url: string | null;
  bubble_type: string | null;
  collection_id: string | null;
  created_at: string;
  created_by: string | null;
  description: string | null;
  discovery_method: string | null;
  display_order: number;
  icon_url: string | null;
  id: string;
  is_limited: boolean;
  is_sanctuary_product: boolean;
  name: string;
  rarity: string | null;
  slug: string;
  spawn_locations: string[] | null;
  status: ContentStatus;
  updated_at: string;
  updated_by: string | null;
}

/**
 * Form data for bubbles
 * All fields are optional for partial updates
 */
export interface BubblesFormData {
  animation_url?: string | null;
  bubble_type?: string | null;
  collection_id?: string | null;
  created_at?: string;
  created_by?: string | null;
  description?: string | null;
  discovery_method?: string | null;
  display_order?: number;
  icon_url?: string | null;
  id?: string;
  is_limited?: boolean;
  is_sanctuary_product?: boolean;
  name?: string;
  rarity?: string | null;
  slug?: string;
  spawn_locations?: string[] | null;
  status?: ContentStatus;
  updated_at?: string;
  updated_by?: string | null;
}

/**
 * Validation result for bubbles
 */
export interface BubblesValidationResult {
  valid: boolean;
  errors: {
    animation_url?: string;
    bubble_type?: string;
    collection_id?: string;
    created_at?: string;
    created_by?: string;
    description?: string;
    discovery_method?: string;
    display_order?: string;
    icon_url?: string;
    id?: string;
    is_limited?: string;
    is_sanctuary_product?: string;
    name?: string;
    rarity?: string;
    slug?: string;
    spawn_locations?: string;
    status?: string;
    updated_at?: string;
    updated_by?: string;
  };
}

