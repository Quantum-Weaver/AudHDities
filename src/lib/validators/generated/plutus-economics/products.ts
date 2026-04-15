// =====================================================
// FILE: validators/generated/plutus-economics/products.ts
// GENERATED: 2026-04-15T01:41:08.101Z
// SOURCE: database.types.ts
// =====================================================

import type { OwnerType } from '@/lib/constants/generated/plutus-economics/owner_type';
import type { ProductType } from '@/lib/constants/generated/plutus-economics/product_type';
import z from 'zod';

// =====================================================
// Products SCHEMAS
// =====================================================

export const ProductsRowSchema = z.object({
  active: z.boolean().nullable(),
  bigot_tax_cents: z.number().nullable(),
  category: z.any().nullable(),
  channel_id: z.string().nullable(),
  collaborators: z.any().nullable(),
  created_at: z.string().nullable(),
  created_by: z.string().nullable(),
  creator_id: z.string(),
  description: z.string().nullable(),
  download_url: z.string().nullable(),
  id: z.string(),
  is_published: z.boolean().nullable(),
  is_recurring: z.boolean().nullable(),
  media_urls: z.any().nullable(),
  owner_type: z.enum(Object.values('OwnerType')),
  platform_fee_percent: z.number().nullable(),
  price_ally: z.number().nullable(),
  price_community: z.number().nullable(),
  price_corporate: z.number().nullable(),
  product_type: z.enum(Object.values('ProductType')),
  residual_pool_percent: z.number().nullable(),
  sanctuary_infrastructure_percent: z.number().nullable(),
  slug: z.string(),
  stripe_price_id: z.string().nullable(),
  stripe_product_id: z.string().nullable(),
  tags: z.any().nullable(),
  title: z.string(),
  updated_at: z.string().nullable(),
});

export const ProductsInsertSchema = z.object({
  active: z.boolean().nullable().optional(),
  bigot_tax_cents: z.number().nullable().optional(),
  category: z.any().nullable().optional(),
  channel_id: z.string().nullable().optional(),
  collaborators: z.any().nullable().optional(),
  created_at: z.string().nullable().optional(),
  created_by: z.string().nullable().optional(),
  creator_id: z.string().optional(),
  description: z.string().nullable().optional(),
  download_url: z.string().nullable().optional(),
  id: z.string().optional(),
  is_published: z.boolean().nullable().optional(),
  is_recurring: z.boolean().nullable().optional(),
  media_urls: z.any().nullable().optional(),
  owner_type: z.enum(Object.values('OwnerType')).optional(),
  platform_fee_percent: z.number().nullable().optional(),
  price_ally: z.number().nullable().optional(),
  price_community: z.number().nullable().optional(),
  price_corporate: z.number().nullable().optional(),
  product_type: z.enum(Object.values('ProductType')).optional(),
  residual_pool_percent: z.number().nullable().optional(),
  sanctuary_infrastructure_percent: z.number().nullable().optional(),
  slug: z.string().optional(),
  stripe_price_id: z.string().nullable().optional(),
  stripe_product_id: z.string().nullable().optional(),
  tags: z.any().nullable().optional(),
  title: z.string().optional(),
  updated_at: z.string().nullable().optional(),
});

export const ProductsUpdateSchema = z.object({
  active: z.boolean().nullable().optional(),
  bigot_tax_cents: z.number().nullable().optional(),
  category: z.any().nullable().optional(),
  channel_id: z.string().nullable().optional(),
  collaborators: z.any().nullable().optional(),
  created_at: z.string().nullable().optional(),
  created_by: z.string().nullable().optional(),
  creator_id: z.string().optional(),
  description: z.string().nullable().optional(),
  download_url: z.string().nullable().optional(),
  id: z.string().optional(),
  is_published: z.boolean().nullable().optional(),
  is_recurring: z.boolean().nullable().optional(),
  media_urls: z.any().nullable().optional(),
  owner_type: z.enum(Object.values('OwnerType')).optional(),
  platform_fee_percent: z.number().nullable().optional(),
  price_ally: z.number().nullable().optional(),
  price_community: z.number().nullable().optional(),
  price_corporate: z.number().nullable().optional(),
  product_type: z.enum(Object.values('ProductType')).optional(),
  residual_pool_percent: z.number().nullable().optional(),
  sanctuary_infrastructure_percent: z.number().nullable().optional(),
  slug: z.string().optional(),
  stripe_price_id: z.string().nullable().optional(),
  stripe_product_id: z.string().nullable().optional(),
  tags: z.any().nullable().optional(),
  title: z.string().optional(),
  updated_at: z.string().nullable().optional(),
});

// =====================================================
// TYPE INFERENCE
// =====================================================

export type ProductsRowInput = z.infer<typeof ProductsRowSchema>;
export type ProductsInsertInput = z.infer<typeof ProductsInsertSchema>;
export type ProductsUpdateInput = z.infer<typeof ProductsUpdateSchema>;
