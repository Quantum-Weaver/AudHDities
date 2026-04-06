// =====================================================
// FILE: validators/vendor_profiles.ts
// GENERATED FROM: database.types.ts
// =====================================================

import { z } from 'zod';

// =====================================================
// VendorProfiles SCHEMAS
// =====================================================

export const VendorProfilesRowSchema = z.object({
  business_description: z.string().nullable(),
  business_logo_url: z.string().nullable(),
  business_name: z.string(),
  business_type: z.any().nullable(),
  created_at: z.string().nullable(),
  id: z.string(),
  product_categories: z.any().nullable(),
  stripe_account_id: z.string().nullable(),
  total_earnings: z.number().nullable(),
  total_products: z.number().nullable(),
  total_sales: z.number().nullable(),
  updated_at: z.string().nullable(),
  username: z.string().nullable(),
  verified_at: z.string().nullable(),
  verified_badge: z.boolean().nullable(),
  verified_by: z.string().nullable(),
  website_url: z.string().nullable(),
});

export const VendorProfilesInsertSchema = z.object({
  business_description: z.string().nullable().optional(),
  business_logo_url: z.string().nullable().optional(),
  business_name: z.string().optional(),
  business_type: z.any().nullable().optional(),
  created_at: z.string().nullable().optional(),
  id: z.string().optional(),
  product_categories: z.any().nullable().optional(),
  stripe_account_id: z.string().nullable().optional(),
  total_earnings: z.number().nullable().optional(),
  total_products: z.number().nullable().optional(),
  total_sales: z.number().nullable().optional(),
  updated_at: z.string().nullable().optional(),
  username: z.string().nullable().optional(),
  verified_at: z.string().nullable().optional(),
  verified_badge: z.boolean().nullable().optional(),
  verified_by: z.string().nullable().optional(),
  website_url: z.string().nullable().optional(),
});

// =====================================================
// TYPE INFERENCE
// =====================================================

export type VendorProfilesRowInput = z.infer<typeof VendorProfilesRowSchema>;
export type VendorProfilesInsertInput = z.infer<typeof VendorProfilesInsertSchema>;
