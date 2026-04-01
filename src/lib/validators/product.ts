// lib/validators/product.ts
import { z } from 'zod';
import { 
  idSchema, 
  slugSchema, 
  urlSchema, 
  percentageSchema, 
  dollarsSchema,
  centsSchema,
} from './base';

// Import enums from your existing validators/enums.ts
import { 
  productTypeSchema, 
  ownerTypeSchema, 
  recurringIntervalSchema 
} from './enums';

// =====================================================
// CORE PRODUCT VALIDATION
// =====================================================

// Pricing validation
export const productPricingSchema = z.object({
  price_community: dollarsSchema.min(0),
  price_ally: dollarsSchema.min(0),
  price_corporate: dollarsSchema.min(0),
  bigot_tax_cents: centsSchema.min(0).optional().nullable(),
  residual_pool_percent: percentageSchema.optional().nullable(),
  sanctuary_infrastructure_percent: percentageSchema.optional().nullable(),
});

// Media validation
export const productMediaSchema = z.object({
  media_urls: z.array(urlSchema).max(10).optional().nullable(),
  download_url: urlSchema.optional().nullable(),
  preview_image: urlSchema.optional().nullable(),
});

// Taxonomy validation
export const productTaxonomySchema = z.object({
  category: z.array(z.string()).optional().nullable(),
  tags: z.array(z.string()).max(20).optional().nullable(),
  collaborators: z.array(idSchema).optional().nullable(),
});

// Product creation validation (matches ProductInsert)
export const productCreateSchema = z.object({
  title: z.string().min(3, 'Title must be at least 3 characters').max(200),
  slug: slugSchema,
  description: z.string().max(5000, 'Description cannot exceed 5000 characters').optional().nullable(),
  product_type: productTypeSchema ?? null,
  owner_type: ownerTypeSchema,
  is_published: z.boolean().default(false),
  is_recurring: z.boolean().default(false),
  recurring_interval: recurringIntervalSchema,
  active: z.boolean().default(true),
  ...productPricingSchema.shape,
  ...productMediaSchema.shape,
  ...productTaxonomySchema.shape,
});

// Product update validation (all fields optional)
export const productUpdateSchema = productCreateSchema.partial();

// =====================================================
// CONTRIBUTION VALIDATION
// =====================================================

import { contributionTypeSchema } from './enums';

export const contributionSchema = z.object({
  product_id: idSchema,
  contributor_id: idSchema,
  contribution_type: contributionTypeSchema,
  percent_share: percentageSchema,
  description: z.string().max(500).optional().nullable(),
  is_residual_eligible: z.boolean().default(true),
  is_one_time: z.boolean().default(false),
});

// =====================================================
// TYPE EXPORTS
// =====================================================

export type ProductCreateInput = z.infer<typeof productCreateSchema>;
export type ProductUpdateInput = z.infer<typeof productUpdateSchema>;
export type ContributionInput = z.infer<typeof contributionSchema>;