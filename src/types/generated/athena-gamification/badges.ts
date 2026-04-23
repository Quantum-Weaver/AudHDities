// =====================================================
// FILE: types/generated/athena-gamification/badges.ts
// HANDLING: full_crud
// DEITY: athena-gamification
// GENERATED: 2026-04-23T02:14:52.618Z
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
  color: string | null;
  created_at: string | null;
  created_by: string | null;
  description: string;
  earn_condition: Json | null;
  house: CouncilHouse | null;
  icon: string | null;
  id: string;
  is_active: boolean | null;
  name: string;
  rarity: BadgeRarity;
  slug: string;
  tier: BadgeTier | null;
}

/**
 * Form data for badges
 * All fields are optional for partial updates
 */
export interface BadgesFormData {
  badge_type?: BadgeType;
  color?: string | null;
  created_at?: string | null;
  created_by?: string | null;
  description?: string;
  earn_condition?: Json | null;
  house?: CouncilHouse | null;
  icon?: string | null;
  id?: string;
  is_active?: boolean | null;
  name?: string;
  rarity?: BadgeRarity;
  slug?: string;
  tier?: BadgeTier | null;
}

/**
 * Validation result for badges
 */
export interface BadgesValidationResult {
  valid: boolean;
  errors: {
    badge_type?: string;
    color?: string;
    created_at?: string;
    created_by?: string;
    description?: string;
    earn_condition?: string;
    house?: string;
    icon?: string;
    id?: string;
    is_active?: string;
    name?: string;
    rarity?: string;
    slug?: string;
    tier?: string;
  };
}

