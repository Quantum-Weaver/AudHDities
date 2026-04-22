// =====================================================
// FILE: types/generated/athena-gamification/badges.ts
// TYPE: table
// HANDLING: full_crud
// GENERATED: 2026-04-22T18:15:09.622Z
// SOURCE: database.types.ts (via Tables helper)
// =====================================================

import type { Tables, TablesInsert, TablesUpdate } from '@/types/supabase/database.helpers';
import type { Database } from '@/types/supabase/database.types';
import type { Json } from '@/types/supabase/database.types';

// =====================================================
// CORE TYPES
// =====================================================

// =====================================================
// ENUM EXPORTS (from database enums)
// =====================================================

export type BadgeType = Database['public']['Enums']['badge_type'];
export type CouncilHouse = Database['public']['Enums']['council_house'];
export type BadgeRarity = Database['public']['Enums']['badge_rarity'];
export type BadgeTier = Database['public']['Enums']['badge_tier'];
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

