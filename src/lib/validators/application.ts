// src/lib/validators/application.ts
import { z } from 'zod';
import { idSchema, urlSchema } from './base';

// Creator application validation
export const creatorApplicationSchema = z.object({
  application_type: z.literal('creator'),
  creative_categories: z.array(z.string()).min(1, 'Select at least one category'),
  portfolio_url: urlSchema.optional(),
  creative_description: z.string().min(100, 'Please provide a detailed description (minimum 100 characters)').max(5000),
  experience: z.string().min(50, 'Please describe your experience').max(2000),
  goals: z.string().min(50, 'Please describe your goals').max(2000),
  motivation: z.string().min(50, 'Please share your motivation').max(2000),
  nd_identity: z.array(z.string()).optional(),
});

// Vendor application validation
export const vendorApplicationSchema = z.object({
  application_type: z.literal('vendor'),
  business_name: z.string().min(2, 'Business name is required').max(100),
  business_type: z.enum(['sole_proprietor', 'llc', 'nonprofit', 'cooperative', 'partnership', 'other']),
  business_description: z.string().min(100, 'Please provide a detailed description').max(5000),
  product_categories: z.array(z.string()).min(1, 'Select at least one product category'),
  service_regions: z.array(z.string()).min(1, 'Select at least one service region'),
  website_url: urlSchema.optional(),
  experience: z.string().min(50, 'Please describe your experience').max(2000),
  motivation: z.string().min(50, 'Please share your motivation').max(2000),
  additional_info: z.string().max(1000).optional(),
});

// Union type for application validation
export const applicationSchema = z.discriminatedUnion('application_type', [
  creatorApplicationSchema,
  vendorApplicationSchema,
]);

// Application review validation (admin only)
export const applicationReviewSchema = z.object({
  application_id: idSchema,
  status: z.enum(['approved', 'rejected']),
  review_notes: z.string().min(1, 'Review notes are required').max(1000),
  onboarding_version: z.string().optional(),
});