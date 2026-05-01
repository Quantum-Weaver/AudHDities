// lib/validators/profile.ts
import { z } from 'zod';
import { 
  idSchema, 
  emailSchema, 
  urlSchema,
  passwordSchema,
  percentageSchema, 
  anyStringRecordSchema
} from './base';
import type { UserTier, CommunicationStyle } from '@/types/supabase/enums';

// User tier validation (using enum values)
export const userTierSchema = z.enum(['community', 'ally', 'corporate', 'council']);

// Communication style validation
export const communicationStyleSchema = z.enum(['direct', 'gentle', 'detailed', 'concise']);

// ND Preferences validation - ALL fields REQUIRED when object exists
export const ndPreferencesSchema = z.object({
  reduced_motion: z.boolean(),
  high_contrast: z.boolean(),
  focus_mode: z.boolean(),
  sound_notifications: z.boolean(),
  visual_timers: z.boolean(),
  tl_dr_enabled: z.boolean(),
  dyslexia_friendly: z.boolean(),
  adhd_friendly: z.boolean(),
  autism_friendly: z.boolean(),
});

// Sensory Preferences validation - ALL fields REQUIRED when object exists
export const sensoryPreferencesSchema = z.object({
  light_sensitivity: z.enum(['low', 'medium', 'high', 'avoidant']),
  sound_sensitivity: z.enum(['low', 'medium', 'high', 'avoidant']),
  crowd_sensitivity: z.enum(['low', 'medium', 'high', 'avoidant']),
  touch_sensitivity: z.enum(['low', 'medium', 'high', 'avoidant']),
  vestibular_sensitivity: z.enum(['low', 'medium', 'high', 'avoidant']),
  olfactory_sensitivity: z.enum(['low', 'medium', 'high', 'avoidant']),
});

// Profile update validation - nested objects optional but complete when provided
export const profileUpdateSchema = z.object({
  display_name: z.string().min(1, 'Display name is required').max(100).optional(),
  username: z.string().min(3, 'Username must be at least 3 characters').max(50).optional(),
  bio: z.string().max(500, 'Bio cannot exceed 500 characters').optional(),
  avatar_url: urlSchema.optional().nullable(),
  banner_url: urlSchema.optional().nullable(),
  communication_style: communicationStyleSchema.optional(),
  nd_preferences: ndPreferencesSchema.optional(),
  sensory_preferences: sensoryPreferencesSchema.optional(),
  residual_pledge_percent: percentageSchema.optional(),
  algorithm_preferences: anyStringRecordSchema.optional(),
});

// Profile creation validation (for signup)
export const profileCreateSchema = profileUpdateSchema.extend({
  email: emailSchema,
  password: passwordSchema,
  username: z.string().min(3).max(50),
  display_name: z.string().min(1).max(100),
  user_tier: userTierSchema.default('community'),
});

// Profile settings update (user-facing) - WITH DEFAULTS for complete objects
export const profileSettingsSchema = z.object({
  display_name: z.string().min(1).max(100).optional(),
  bio: z.string().max(500).optional(),
  email_notifications: z.boolean().optional(),
  push_notifications: z.boolean().optional(),
  notification_frequency: z.enum(['instant', 'daily', 'weekly', 'never']).optional(),
  communication_style: communicationStyleSchema.optional(),
  // These objects must be COMPLETE when provided
  nd_preferences: ndPreferencesSchema.optional(),
  sensory_preferences: sensoryPreferencesSchema.optional(),
});

// Complete profile schema with defaults for form initialization
export const profileSettingsWithDefaultsSchema = z.object({
  display_name: z.string().min(1).max(100).optional(),
  bio: z.string().max(500).optional(),
  email_notifications: z.boolean().default(true),
  push_notifications: z.boolean().default(true),
  notification_frequency: z.enum(['instant', 'daily', 'weekly', 'never']).default('instant'),
  communication_style: communicationStyleSchema.default('direct'),
  nd_preferences: ndPreferencesSchema.default({
    reduced_motion: false,
    high_contrast: false,
    focus_mode: false,
    sound_notifications: true,
    visual_timers: true,
    tl_dr_enabled: true,
    dyslexia_friendly: false,
    adhd_friendly: false,
    autism_friendly: false,
  }),
  sensory_preferences: sensoryPreferencesSchema.default({
    light_sensitivity: 'medium',
    sound_sensitivity: 'medium',
    crowd_sensitivity: 'medium',
    touch_sensitivity: 'low',
    vestibular_sensitivity: 'low',
    olfactory_sensitivity: 'low',
  }),
});

// Infer types
export type ProfileSettingsFormData = z.infer<typeof profileSettingsWithDefaultsSchema>;