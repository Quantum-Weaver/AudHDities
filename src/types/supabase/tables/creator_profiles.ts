// src/types/supabase/tables/creator_profiles.ts
import type { Database } from '../database.types';

export type CreatorProfile = Database['public']['Tables']['creator_profiles']['Row'];
export type CreatorProfileInsert = Database['public']['Tables']['creator_profiles']['Insert'];
export type CreatorProfileUpdate = Database['public']['Tables']['creator_profiles']['Update'];

export interface CreatorProfileWithRelations extends CreatorProfile {
  user?: Database['public']['Tables']['profiles']['Row'];
  verified_by_user?: Database['public']['Tables']['profiles']['Row'];
}

export const creatorProfileDefaults = {
  default_residual_pool: 30,
  creator_moniker: '',
  creator_logo_url: '',
  total_products: 0,
  total_sales: 0,
  total_earnings: 0,
  verified_badge: false,
  verification_status: 'pending' as const,
  creative_categories: [],
} as const;