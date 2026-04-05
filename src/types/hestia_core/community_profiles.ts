// =====================================================
// FILE: types/hestia_core/community_profiles.ts
// HANDLING: join_table
// DEITY: hestia_core
// GENERATED: 2026-04-05T18:12:44.657Z
// SOURCE: database.types.ts lines 960-1045
// =====================================================

import type { Database } from '@/types/supabase/database.types';

// =====================================================
// CORE TYPES
// =====================================================

export type CommunityProfilesRow = Database['public']['Tables']['community_profiles']['Row'];
export type CommunityProfilesInsert = Database['public']['Tables']['community_profiles']['Insert'];
export type CommunityProfilesUpdate = Database['public']['Tables']['community_profiles']['Update'];

// =====================================================
// DERIVED TYPES
// =====================================================

/**
 * Form data for community_profiles
 * All fields are optional for partial updates
 */
export interface CommunityProfilesFormData {

}

