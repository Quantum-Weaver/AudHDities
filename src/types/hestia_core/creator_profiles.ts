// =====================================================
// FILE: types/hestia_core/creator_profiles.ts
// HANDLING: join_table
// DEITY: hestia_core
// GENERATED: 2026-04-05T18:12:44.685Z
// SOURCE: database.types.ts lines 1469-1552
// =====================================================

import type { Database } from '@/types/supabase/database.types';

// =====================================================
// CORE TYPES
// =====================================================

export type CreatorProfilesRow = Database['public']['Tables']['creator_profiles']['Row'];
export type CreatorProfilesInsert = Database['public']['Tables']['creator_profiles']['Insert'];
export type CreatorProfilesUpdate = Database['public']['Tables']['creator_profiles']['Update'];

// =====================================================
// DERIVED TYPES
// =====================================================

/**
 * Form data for creator_profiles
 * All fields are optional for partial updates
 */
export interface CreatorProfilesFormData {

}

