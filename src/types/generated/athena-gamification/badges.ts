// =====================================================
// FILE: types/generated/athena-gamification/badges.ts
// HANDLING: full_crud
// DEITY: athena-gamification
// GENERATED: 2026-05-01T03:24:41.146Z
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

export type BadgeType = Enums<'badge_type'>;
export type CouncilHouse = Enums<'council_house'>;
export type BadgeRarity = Enums<'badge_rarity'>;
export type BadgeTier = Enums<'badge_tier'>;

export type BadgesRow = Tables<'badges'>;
export type BadgesInsert = TablesInsert<'badges'>;
export type BadgesUpdate = TablesUpdate<'badges'>;

// =====================================================
// DERIVED TYPES
// =====================================================

/**
 * Public view of badges
 */
export interface PublicBadges {
  badge_type: BadgeType;
  badges_id: string;
  color: string | null;
  created_at: string | null;
  created_by: string | null;
  description: string;
  earn_condition: Json | null;
  house: CouncilHouse | null;
  icon: string | null;
  is_active: boolean | null;
  name: string;
  rarity: BadgeRarity;
  slug: string;
  tier: BadgeTier | null;
  updated_by: string | null;
}

/**
 * Form data for badges
 * All fields are optional for partial updates
 */
export interface BadgesFormData {
  badge_type?: BadgeType;
  badges_id?: string;
  color?: string | null;
  created_at?: string | null;
  created_by?: string | null;
  description?: string;
  earn_condition?: Json | null;
  house?: CouncilHouse | null;
  icon?: string | null;
  is_active?: boolean | null;
  name?: string;
  rarity?: BadgeRarity;
  slug?: string;
  tier?: BadgeTier | null;
  updated_by?: string | null;
}

/**
 * Validation result for badges
 */
export interface BadgesValidationResult {
  valid: boolean;
  errors: {
    badge_type?: string;
    badges_id?: string;
    color?: string;
    created_at?: string;
    created_by?: string;
    description?: string;
    earn_condition?: string;
    house?: string;
    icon?: string;
    is_active?: string;
    name?: string;
    rarity?: string;
    slug?: string;
    tier?: string;
    updated_by?: string;
  };
}

