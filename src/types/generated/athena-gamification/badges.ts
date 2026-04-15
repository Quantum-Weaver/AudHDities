// =====================================================
// FILE: types/generated/athena-gamification/badges.ts
// HANDLING: full_crud
// GENERATED: 2026-04-15T19:30:35.416Z
// SOURCE: database.types.ts lines 739-797
// =====================================================

import type { Database, Json } from '@/types/supabase/database.types';

// =====================================================
// ENUM EXPORTS (from database enums)
// =====================================================

export type BadgeType = Database['public']['Enums']['badge_type'];
export type CouncilHouse = Database['public']['Enums']['council_house'];
export type BadgeRarity = Database['public']['Enums']['badge_rarity'];
export type BadgeTier = Database['public']['Enums']['badge_tier'];

// =====================================================
// CORE TYPES
// =====================================================

export type BadgesRow = Database['public']['Tables']['badges']['Row'];
export type BadgesInsert = Database['public']['Tables']['badges']['Insert'];
export type BadgesUpdate = Database['public']['Tables']['badges']['Update'];

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

