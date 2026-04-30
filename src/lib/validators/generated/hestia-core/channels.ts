// =====================================================
// FILE: validators/channels.ts
// GENERATED FROM: database.types.ts
// =====================================================

import { ENUM_VALUES } from '@/types/supabase/enums';
import z from 'zod';

// =====================================================
// Channels SCHEMAS
// =====================================================

export const ChannelsRowSchema = z.object({
  allow_subscriptions: z.boolean().nullable(),
  avatar_url: z.string().nullable(),
  banner_url: z.string().nullable(),
  channels_id: z.string(),
  content_rating: z.enum(ENUM_VALUES.contentRating).nullable(),
  created_at: z.string().nullable(),
  created_by: z.string().nullable(),
  description: z.string().nullable(),
  display_name: z.string(),
  handle: z.string(),
  owner_id: z.string().nullable(),
  slug: z.string().nullable(),
  subscriber_count: z.number().nullable(),
  subscription_price_ally: z.number().nullable(),
  subscription_price_community: z.number().nullable(),
  total_emeralds: z.number().nullable(),
  updated_at: z.string().nullable(),
  updated_by: z.string().nullable(),
});

export const ChannelsInsertSchema = z.object({
  allow_subscriptions: z.boolean().nullable().optional(),
  avatar_url: z.string().nullable().optional(),
  banner_url: z.string().nullable().optional(),
  channels_id: z.string().optional(),
  content_rating: z.enum(ENUM_VALUES.contentRating).nullable().optional(),
  created_at: z.string().nullable().optional(),
  created_by: z.string().nullable().optional(),
  description: z.string().nullable().optional(),
  display_name: z.string(),
  handle: z.string(),
  owner_id: z.string().nullable().optional(),
  slug: z.string().nullable().optional(),
  subscriber_count: z.number().nullable().optional(),
  subscription_price_ally: z.number().nullable().optional(),
  subscription_price_community: z.number().nullable().optional(),
  total_emeralds: z.number().nullable().optional(),
  updated_at: z.string().nullable().optional(),
  updated_by: z.string().nullable().optional(),
});

export const ChannelsUpdateSchema = z.object({
  allow_subscriptions: z.boolean().nullable().optional(),
  avatar_url: z.string().nullable().optional(),
  banner_url: z.string().nullable().optional(),
  channels_id: z.string().optional(),
  content_rating: z.enum(ENUM_VALUES.contentRating).nullable().optional(),
  created_at: z.string().nullable().optional(),
  created_by: z.string().nullable().optional(),
  description: z.string().nullable().optional(),
  display_name: z.string().optional(),
  handle: z.string().optional(),
  owner_id: z.string().nullable().optional(),
  slug: z.string().nullable().optional(),
  subscriber_count: z.number().nullable().optional(),
  subscription_price_ally: z.number().nullable().optional(),
  subscription_price_community: z.number().nullable().optional(),
  total_emeralds: z.number().nullable().optional(),
  updated_at: z.string().nullable().optional(),
  updated_by: z.string().nullable().optional(),
});

// =====================================================
// TYPE INFERENCE
// =====================================================

export type ChannelsRowInput = z.infer<typeof ChannelsRowSchema>;
export type ChannelsInsertInput = z.infer<typeof ChannelsInsertSchema>;
export type ChannelsUpdateInput = z.infer<typeof ChannelsUpdateSchema>;
