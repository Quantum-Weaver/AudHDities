// src/lib/validators/report.ts
import { z } from 'zod';
import { idSchema, anyStringRecordSchema } from './base';

// Report type validation
export const reportTypeSchema = z.enum([
  'inappropriate_content', 'harassment', 'spam', 'hate_speech',
  'impersonation', 'copyright', 'other'
]);

// Report creation validation
export const reportCreateSchema = z.object({
  report_type: reportTypeSchema,
  target_type: z.enum(['user', 'post', 'comment', 'product']),
  target_id: idSchema,
  reason: z.string().min(10, 'Please provide a detailed reason').max(1000),
  description: z.string().max(2000).optional(),
  reported_content: z.string().optional(),
  reported_url: z.string().url().optional(),
});

// Report resolution validation (admin only)
export const reportResolutionSchema = z.object({
  report_id: idSchema,
  status: z.enum(['resolved', 'dismissed']),
  moderation_notes: z.string().min(1, 'Moderation notes are required').max(1000),
  action_taken: z.enum(['none', 'warning', 'timeout', 'suspension', 'ban', 'content_removed']),
  action_duration: z.string().optional(),
});

// Moderation action validation
export const moderationActionSchema = z.object({
  target_id: idSchema,
  target_type: z.enum(['user', 'post', 'comment', 'product']),
  action_type: z.enum(['warning', 'timeout', 'suspension', 'ban', 'content_removal']),
  duration: z.string().optional(),
  reason: z.string().min(1).max(1000),
  // FIXED: Use anyStringRecordSchema
  metadata: anyStringRecordSchema.optional(),
});