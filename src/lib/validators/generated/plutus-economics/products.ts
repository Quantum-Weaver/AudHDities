// =====================================================
// FILE: validators/generated/plutus-economics/products.ts
// GENERATED: 2026-04-17
// SOURCE: database.types.ts - products table
// =====================================================

import { z } from 'zod';

import { OWNER_TYPE } from '@/lib/constants/generated/plutus-economics/owner_type';
import { PRODUCT_TYPE } from '@/lib/constants/generated/plutus-economics/product_type';
import { RECURRING_INTERVAL } from '@/lib/constants/generated/plutus-economics/recurring_interval';

// =====================================================
// PRODUCTS SCHEMAS
// =====================================================

// =====================================================
// ROW SCHEMA (Full database row - all fields required as they appear)
// =====================================================

export const ProductsRowSchema = z.object({
  active: z.boolean().nullable(),
  bigot_tax_cents: z.number().nullable(),
  category: z.array(z.string()).nullable(),
  channel_id: z.string().nullable(),
  collaborators: z.array(z.string()).nullable(),
  created_at: z.string().nullable(),
  created_by: z.string().nullable(),
  creator_id: z.string(),
  description: z.string().nullable(),
  download_url: z.string().nullable(),
  id: z.string(),
  is_published: z.boolean().nullable(),
  is_recurring: z.boolean().nullable(),
  media_urls: z.array(z.string()).nullable(),
  owner_type: z.enum(Object.values(OWNER_TYPE)),
  platform_fee_percent: z.number().nullable(),
  price_ally: z.number().nullable(),
  price_community: z.number().nullable(),
  price_corporate: z.number().nullable(),
  product_type: z.enum(Object.values(PRODUCT_TYPE)),
  recurring_interval: z.enum(Object.values(RECURRING_INTERVAL)).nullable(),
  residual_pool_percent: z.number().nullable(),
  sanctuary_infrastructure_percent: z.number().nullable(),
  slug: z.string(),
  stripe_price_id: z.string().nullable(),
  stripe_product_id: z.string().nullable(),
  tags: z.array(z.string()).nullable(),
  title: z.string(),
  updated_at: z.string().nullable(),
});

// =====================================================
// INSERT SCHEMA (For creating new products)
// =====================================================

export const ProductsInsertSchema = z.object({
  // Optional fields (have defaults in DB or are nullable)
  active: z.boolean().nullable().optional(),
  bigot_tax_cents: z.number().nullable().optional(),
  category: z.array(z.string()).nullable().optional(),
  channel_id: z.string().nullable().optional(),
  collaborators: z.array(z.string()).nullable().optional(),
  created_at: z.string().nullable().optional(),
  created_by: z.string().nullable().optional(),
  description: z.string().nullable().optional(),
  download_url: z.string().nullable().optional(),
  id: z.string().optional(),
  is_published: z.boolean().nullable().optional(),
  is_recurring: z.boolean().nullable().optional(),
  media_urls: z.array(z.string()).nullable().optional(),
  owner_type: z.enum(Object.values(OWNER_TYPE)).optional(),
  platform_fee_percent: z.number().nullable().optional(),
  price_ally: z.number().nullable().optional(),
  price_community: z.number().nullable().optional(),
  price_corporate: z.number().nullable().optional(),
  recurring_interval: z.enum(Object.values(RECURRING_INTERVAL)).nullable().optional(),
  residual_pool_percent: z.number().nullable().optional(),
  sanctuary_infrastructure_percent: z.number().nullable().optional(),
  stripe_price_id: z.string().nullable().optional(),
  stripe_product_id: z.string().nullable().optional(),
  tags: z.array(z.string()).nullable().optional(),
  updated_at: z.string().nullable().optional(),

  // REQUIRED fields (no ? in database Insert type)
  creator_id: z.string(),
  product_type: z.enum(Object.values(PRODUCT_TYPE)),
  slug: z.string(),
  title: z.string(),
});

// =====================================================
// UPDATE SCHEMA (For updating existing products)
// =====================================================

export const ProductsUpdateSchema = z.object({
  active: z.boolean().nullable().optional(),
  bigot_tax_cents: z.number().nullable().optional(),
  category: z.array(z.string()).nullable().optional(),
  channel_id: z.string().nullable().optional(),
  collaborators: z.array(z.string()).nullable().optional(),
  created_at: z.string().nullable().optional(),
  created_by: z.string().nullable().optional(),
  creator_id: z.string().optional(),
  description: z.string().nullable().optional(),
  download_url: z.string().nullable().optional(),
  id: z.string().optional(),
  is_published: z.boolean().nullable().optional(),
  is_recurring: z.boolean().nullable().optional(),
  media_urls: z.array(z.string()).nullable().optional(),
  owner_type: z.enum(Object.values(OWNER_TYPE)).optional(),
  platform_fee_percent: z.number().nullable().optional(),
  price_ally: z.number().nullable().optional(),
  price_community: z.number().nullable().optional(),
  price_corporate: z.number().nullable().optional(),
  product_type: z.enum(Object.values(PRODUCT_TYPE)).optional(),
  recurring_interval: z.enum(Object.values(RECURRING_INTERVAL)).nullable().optional(),
  residual_pool_percent: z.number().nullable().optional(),
  sanctuary_infrastructure_percent: z.number().nullable().optional(),
  slug: z.string().optional(),
  stripe_price_id: z.string().nullable().optional(),
  stripe_product_id: z.string().nullable().optional(),
  tags: z.array(z.string()).nullable().optional(),
  title: z.string().optional(),
  updated_at: z.string().nullable().optional(),
});

// =====================================================
// TYPE INFERENCE
// =====================================================

export type ProductsRowInput = z.infer<typeof ProductsRowSchema>;
export type ProductsInsertInput = z.infer<typeof ProductsInsertSchema>;
export type ProductsUpdateInput = z.infer<typeof ProductsUpdateSchema>;

// =====================================================
// CUSTOM VALIDATION HELPERS
// =====================================================

/**
 * Validate that at least one price is set
 */
export function hasAtLeastOnePrice(data: ProductsInsertInput): boolean {
  return (
    (data.price_community ?? 0) > 0 ||
    (data.price_ally ?? 0) > 0 ||
    (data.price_corporate ?? 0) > 0
  );
}

/**
 * Validate that residual percentages sum to 100% when combined with other splits
 */
export function isValidResidualSplit(
  residualPoolPercent: number | null | undefined,
  sanctuaryInfrastructurePercent: number | null | undefined,
  platformFeePercent: number | null | undefined
): boolean {
  const residual = residualPoolPercent ?? 0;
  const sanctuary = sanctuaryInfrastructurePercent ?? 0;
  const platform = platformFeePercent ?? 0;
  
  // Total should not exceed 100%
  return (residual + sanctuary + platform) <= 100;
}

/**
 * Validate slug format (lowercase, alphanumeric, hyphens only)
 */
export function isValidSlug(slug: string): boolean {
  return /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug);
}

/**
 * Full validation for product creation
 */
export function validateProductForCreate(data: unknown): {
  success: boolean;
  data?: ProductsInsertInput;
  errors?: z.ZodError;
  customErrors?: string[];
} {
  // Zod validation
  const result = ProductsInsertSchema.safeParse(data);
  
  if (!result.success) {
    return { success: false, errors: result.error };
  }
  
  const customErrors: string[] = [];
  
  // Custom validations
  if (!hasAtLeastOnePrice(result.data)) {
    customErrors.push('At least one price tier must be set');
  }
  
  if (!isValidSlug(result.data.slug)) {
    customErrors.push('Slug must be lowercase, alphanumeric, and use hyphens only');
  }
  
  if (!isValidResidualSplit(
    result.data.residual_pool_percent,
    result.data.sanctuary_infrastructure_percent,
    result.data.platform_fee_percent
  )) {
    customErrors.push('Residual, sanctuary, and platform fee percentages cannot exceed 100% total');
  }
  
  if (customErrors.length > 0) {
    return { success: false, customErrors };
  }
  
  return { success: true, data: result.data };
}