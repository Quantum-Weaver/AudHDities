// types/supabase/tables/vendor_profiles.ts
import type { Database } from '../database.types';

export type VendorProfile = Database['public']['Tables']['vendor_profiles']['Row'];
export type VendorProfileInsert = Database['public']['Tables']['vendor_profiles']['Insert'];
export type VendorProfileUpdate = Database['public']['Tables']['vendor_profiles']['Update'];

export type BusinessType = 'sole_proprietor' | 'llc' | 'nonprofit' | 'cooperative' | 'partnership' | 'other';

export interface VendorProfileWithRelations extends VendorProfile {
  user?: Database['public']['Tables']['profiles']['Row'];
  verified_by_user?: Database['public']['Tables']['profiles']['Row'];
  products?: Database['public']['Tables']['products']['Row'][];
}

export const vendorProfileDefaults = {
  total_products: 0,
  total_sales: 0,
  total_earnings: 0,
  verified_badge: false,
  verification_status: 'pending' as const,
  product_categories: [],
} as const;