// src/lib/validators/channel.ts
import { z } from 'zod';
import { idSchema, slugSchema, urlSchema, nonEmptyArray } from './base';

// Channel handle validation
export const channelHandleSchema = z.string()
  .min(3, 'Handle must be at least 3 characters')
  .max(50, 'Handle cannot exceed 50 characters')
  .regex(/^[a-z0-9_]+$/, 'Handle can only contain lowercase letters, numbers, and underscores');

// Channel creation validation
export const channelCreateSchema = z.object({
  handle: channelHandleSchema,
  display_name: z.string().min(1).max(100).optional(),
  description: z.string().max(500).optional(),
  avatar_url: urlSchema.optional().nullable(),
  banner_url: urlSchema.optional().nullable(),
  allow_subscriptions: z.boolean().default(true),
  content_rating: z.enum(['general', 'mature', 'triggering', 'explicit']).default('general'),
  subscription_price_community: z.number().min(0).default(0),
  subscription_price_ally: z.number().min(0).default(5),
});

// Post visibility validation
export const postVisibilitySchema = z.enum(['public', 'subscribers', 'tier_community', 'tier_ally', 'tier_corporate', 'private']);

// Post creation validation
export const postCreateSchema = z.object({
  channel_id: idSchema,
  title: z.string().min(1, 'Title is required').max(200),
  body: z.string().max(10000, 'Body cannot exceed 10,000 characters').optional(),
  content_type: z.enum(['text', 'image', 'audio', 'video', 'mixed']).default('text'),
  media_urls: z.array(urlSchema).max(10).default([]),
  visibility: postVisibilitySchema.default('public'),
  sovereignty_tags: z.array(z.string()).max(10).default([]),
  allow_tipping: z.boolean().default(true),
});

// Post update validation
export const postUpdateSchema = postCreateSchema.partial();

// Comment validation
export const commentSchema = z.object({
  post_id: idSchema,
  parent_id: idSchema.optional().nullable(),
  content: z.string().min(1, 'Comment cannot be empty').max(2000, 'Comment cannot exceed 2000 characters'),
});