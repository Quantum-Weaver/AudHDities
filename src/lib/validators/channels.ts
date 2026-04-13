// =====================================================
// FILE: validators/generated/channels.ts
// GENERATED: 2026-04-13T06:13:41.963Z
// SOURCE: database.types.ts
// =====================================================

import { z } from 'zod';

// =====================================================
// Channels SCHEMAS
// =====================================================

export const ChannelsRowSchema = z.object({
  allow_subscriptions: z.boolean().nullable(),
  avatar_url: z.string().nullable(),
  banner_url: z.string().nullable(),
  content_rating: z.enum(Object.values(ContentRating)).nullable(),
  created_at: z.string().nullable(),
  created_by: z.string().nullable(),
  description: z.string().nullable(),
  display_name: z.string(),
  handle: z.string(),
  id: z.string(),
  owner_id: z.string().nullable(),
  subscriber_count: z.number().nullable(),
  subscription_price_ally: z.number().nullable(),
  subscription_price_community: z.number().nullable(),
  total_emeralds: z.number().nullable(),
  updated_at: z.string().nullable(),
});

export const ChannelsInsertSchema = z.object({
  allow_subscriptions: z.boolean().nullable().optional(),
  avatar_url: z.string().nullable().optional(),
  banner_url: z.string().nullable().optional(),
  content_rating: z.enum(Object.values(ContentRating)).nullable().optional(),
  created_at: z.string().nullable().optional(),
  created_by: z.string().nullable().optional(),
  description: z.string().nullable().optional(),
  display_name: z.string().optional(),
  handle: z.string().optional(),
  id: z.string().optional(),
  owner_id: z.string().nullable().optional(),
  subscriber_count: z.number().nullable().optional(),
  subscription_price_ally: z.number().nullable().optional(),
  subscription_price_community: z.number().nullable().optional(),
  total_emeralds: z.number().nullable().optional(),
  updated_at: z.string().nullable().optional(),
});

export const ChannelsUpdateSchema = z.object({
  allow_subscriptions: z.boolean().nullable().optional(),
  avatar_url: z.string().nullable().optional(),
  banner_url: z.string().nullable().optional(),
  content_rating: z.enum(Object.values(ContentRating)).nullable().optional(),
  created_at: z.string().nullable().optional(),
  created_by: z.string().nullable().optional(),
  description: z.string().nullable().optional(),
  display_name: z.string().optional(),
  handle: z.string().optional(),
  id: z.string().optional(),
  owner_id: z.string().nullable().optional(),
  subscriber_count: z.number().nullable().optional(),
  subscription_price_ally: z.number().nullable().optional(),
  subscription_price_community: z.number().nullable().optional(),
  total_emeralds: z.number().nullable().optional(),
  updated_at: z.string().nullable().optional(),
});

// =====================================================
// TYPE INFERENCE
// =====================================================

export type ChannelsRowInput = z.infer<typeof ChannelsRowSchema>;
export type ChannelsInsertInput = z.infer<typeof ChannelsInsertSchema>;
export type ChannelsUpdateInput = z.infer<typeof ChannelsUpdateSchema>;
