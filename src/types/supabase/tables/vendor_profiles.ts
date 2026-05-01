// src/types/supabase/tables/vendor_profiles.ts
import type { Database } from '../database.types';
import type { BusinessType } from '../enums';  // ← Add this import

export type VendorProfile = Database['public']['Tables']['vendor_profiles']['Row'];
export type VendorProfileInsert = Database['public']['Tables']['vendor_profiles']['Insert'];
export type VendorProfileUpdate = Database['public']['Tables']['vendor_profiles']['Update'];

// Remove local BusinessType definition
// export type BusinessType = ...

export interface VendorProfileWithRelations extends VendorProfile {
  user?: Database['public']['Tables']['profiles']['Row'];
  verified_by_user?: Database['public']['Tables']['profiles']['Row'];
  products?: Database['public']['Tables']['products']['Row'][];
}

// Re-export for convenience
export type { BusinessType };

export const vendorProfileDefaults = {
  total_products: 0,
  total_sales: 0,
  total_earnings: 0,
  verified_badge: false,
  verification_status: 'pending' as const,
  product_categories: [],
} as const;