// =====================================================
// FILE: validators/generated/hestia-core/profiles.ts
// GENERATED: 2026-04-17
// SOURCE: database.types.ts - profiles table
// =====================================================

import { z } from 'zod';
import { COUNCIL_HOUSE } from '@/lib/constants/generated/hestia-core/council_house';
import { SENSORY_MODE } from '@/lib/constants/generated/hestia-core/sensory_mode';
import { USER_STATUS } from '@/lib/constants/generated/hestia-core/user_status';
import { USER_TIER } from '@/lib/constants/generated/hestia-core/user_tier';

// =====================================================
// JSON PIPE HELPER
// =====================================================

/**
 * Creates a schema that validates JSON strings and parses them
 * Use this for fields that come as JSON strings from API/database
 * 
 * @param schema - The schema to validate the parsed JSON against
 * @returns A schema that handles stringified JSON
 * 
 * @example
 * const ndPreferences = jsonPipe(NDPreferencesObjectSchema);
 * // Accepts: '{"reduced_motion": true}' OR { reduced_motion: true }
 */
function jsonPipe<T extends z.ZodTypeAny>(schema: T) {
  return z.union([
    schema, // Already parsed object
    z.string().transform((str, ctx) => {
      try {
        return JSON.parse(str);
      } catch (e) {
        ctx.addIssue({ 
          code: 'custom', 
          message: 'Invalid JSON string' 
        });
        return z.NEVER;
      }
    }).pipe(schema), // Parse string then validate
    z.null().transform(() => null), // Allow null
  ]).nullable();
}

/**
 * Optional JSON pipe - for fields that may be omitted
 */
function jsonPipeOptional<T extends z.ZodTypeAny>(schema: T) {
  return z.union([
    schema.optional(),
    z.string().transform((str, ctx) => {
      try {
        return JSON.parse(str);
      } catch (e) {
        ctx.addIssue({ 
          code: 'custom', 
          message: 'Invalid JSON string' 
        });
        return z.NEVER;
      }
    }).pipe(schema).optional(),
    z.null().transform(() => null).optional(),
  ]).optional();
}

// =====================================================
// JSON OBJECT SCHEMAS (for validation of parsed JSON)
// =====================================================

/**
 * ND Preferences Object Schema - Validates the parsed object
 */
export const NDPreferencesObjectSchema = z.object({
  reduced_motion: z.boolean().default(false),
  high_contrast: z.boolean().default(false),
  focus_mode: z.boolean().default(false),
  sound_notifications: z.boolean().default(true),
  visual_timers: z.boolean().default(true),
  tl_dr_enabled: z.boolean().default(true),
  dyslexia_friendly: z.boolean().default(false),
  adhd_friendly: z.boolean().default(false),
  autism_friendly: z.boolean().default(false),
});

/**
 * Sensory Preferences Object Schema
 */
export const SensoryPreferencesObjectSchema = z.object({
  light_sensitivity: z.enum(['low', 'medium', 'high', 'avoidant']).default('medium'),
  sound_sensitivity: z.enum(['low', 'medium', 'high', 'avoidant']).default('medium'),
  crowd_sensitivity: z.enum(['low', 'medium', 'high', 'avoidant']).default('medium'),
  touch_sensitivity: z.enum(['low', 'medium', 'high', 'avoidant']).default('low'),
  vestibular_sensitivity: z.enum(['low', 'medium', 'high', 'avoidant']).default('low'),
  olfactory_sensitivity: z.enum(['low', 'medium', 'high', 'avoidant']).default('low'),
});

/**
 * Algorithm Preferences Object Schema
 */
export const AlgorithmPreferencesObjectSchema = z.object({
  chronological_preferred: z.boolean().default(false),
  show_boosted_content: z.boolean().default(true),
  show_subscribed_only: z.boolean().default(false),
  recommend_related: z.boolean().default(true),
  recommend_trending: z.boolean().default(true),
  recommend_new: z.boolean().default(true),
  hide_trauma_content: z.boolean().default(true),
  hide_politics: z.boolean().default(false),
  hide_marketing: z.boolean().default(false),
});

// =====================================================
// JSON FIELD SCHEMAS (with string-to-object transformation)
// =====================================================

/**
 * ND Preferences - Accepts JSON string OR object OR null
 */
export const NDPreferencesSchema = jsonPipe(NDPreferencesObjectSchema);

/**
 * Sensory Preferences - Accepts JSON string OR object OR null
 */
export const SensoryPreferencesSchema = jsonPipe(SensoryPreferencesObjectSchema);

/**
 * Algorithm Preferences - Accepts JSON string OR object OR null
 */
export const AlgorithmPreferencesSchema = jsonPipe(AlgorithmPreferencesObjectSchema);

/**
 * Optional versions for updates
 */
export const NDPreferencesOptionalSchema = jsonPipeOptional(NDPreferencesObjectSchema);
export const SensoryPreferencesOptionalSchema = jsonPipeOptional(SensoryPreferencesObjectSchema);
export const AlgorithmPreferencesOptionalSchema = jsonPipeOptional(AlgorithmPreferencesObjectSchema);

// =====================================================
// MAIN PROFILES SCHEMAS
// =====================================================

/**
 * Row Schema - Full database row (all fields required as in DB)
 */
export const ProfilesRowSchema = z.object({
  algorithm_preferences: AlgorithmPreferencesSchema,
  avatar_url: z.string().nullable(),
  banner_url: z.string().nullable(),
  bio: z.string().nullable(),
  created_at: z.string().nullable(),
  created_by: z.string().nullable(),
  display_name: z.string().nullable(),
  dyslexia_mode: z.boolean().nullable(),
  email: z.string().email(),
  full_name: z.string().nullable(),
  id: z.string().uuid(),
  is_admin: z.boolean().nullable(),
  is_creator: z.boolean().nullable(),
  is_quantum_weaver: z.boolean().nullable(),
  is_vendor: z.boolean().nullable(),
  last_active: z.string().nullable(),
  nd_preferences: NDPreferencesSchema,
  preferred_environment: z.string().nullable(),
  primary_house: z.enum(Object.values(COUNCIL_HOUSE)).nullable(),
  sensory_mode: z.enum(Object.values(SENSORY_MODE)).nullable(),
  sensory_preferences: SensoryPreferencesSchema,
  sovereignty_score: z.number().int().min(0).max(10000).nullable(),
  status: z.enum(Object.values(USER_STATUS)).nullable(),
  updated_at: z.string().nullable(),
  user_tier: z.enum(Object.values(USER_TIER)).nullable(),
  username: z.string().min(3).max(50).regex(/^[a-zA-Z0-9_]+$/).nullable(),
});

/**
 * Insert Schema - For creating new profiles
 * Required fields: id, email
 */
export const ProfilesInsertSchema = z.object({
  algorithm_preferences: AlgorithmPreferencesSchema.optional(),
  avatar_url: z.string().nullable().optional(),
  banner_url: z.string().nullable().optional(),
  bio: z.string().nullable().optional(),
  created_at: z.string().nullable().optional(),
  created_by: z.string().nullable().optional(),
  display_name: z.string().nullable().optional(),
  dyslexia_mode: z.boolean().nullable().optional(),
  email: z.string().email(),
  full_name: z.string().nullable().optional(),
  id: z.string().uuid(),
  is_admin: z.boolean().nullable().optional(),
  is_creator: z.boolean().nullable().optional(),
  is_quantum_weaver: z.boolean().nullable().optional(),
  is_vendor: z.boolean().nullable().optional(),
  last_active: z.string().nullable().optional(),
  nd_preferences: NDPreferencesSchema.optional(),
  preferred_environment: z.string().nullable().optional(),
  primary_house: z.enum(Object.values(COUNCIL_HOUSE)).nullable().optional(),
  sensory_mode: z.enum(Object.values(SENSORY_MODE)).nullable().optional(),
  sensory_preferences: SensoryPreferencesSchema.optional(),
  sovereignty_score: z.number().int().min(0).max(10000).nullable().optional(),
  status: z.enum(Object.values(USER_STATUS)).nullable().optional(),
  updated_at: z.string().nullable().optional(),
  user_tier: z.enum(Object.values(USER_TIER)).nullable().optional(),
  username: z.string().min(3).max(50).regex(/^[a-zA-Z0-9_]+$/).nullable().optional(),
});

/**
 * Update Schema - For updating existing profiles
 * All fields optional
 */
export const ProfilesUpdateSchema = z.object({
  algorithm_preferences: AlgorithmPreferencesOptionalSchema,
  avatar_url: z.string().nullable().optional(),
  banner_url: z.string().nullable().optional(),
  bio: z.string().nullable().optional(),
  created_at: z.string().nullable().optional(),
  created_by: z.string().nullable().optional(),
  display_name: z.string().nullable().optional(),
  dyslexia_mode: z.boolean().nullable().optional(),
  email: z.string().email().optional(),
  full_name: z.string().nullable().optional(),
  id: z.string().uuid().optional(),
  is_admin: z.boolean().nullable().optional(),
  is_creator: z.boolean().nullable().optional(),
  is_quantum_weaver: z.boolean().nullable().optional(),
  is_vendor: z.boolean().nullable().optional(),
  last_active: z.string().nullable().optional(),
  nd_preferences: NDPreferencesOptionalSchema,
  preferred_environment: z.string().nullable().optional(),
  primary_house: z.enum(Object.values(COUNCIL_HOUSE)).nullable().optional(),
  sensory_mode: z.enum(Object.values(SENSORY_MODE)).nullable().optional(),
  sensory_preferences: SensoryPreferencesOptionalSchema,
  sovereignty_score: z.number().int().min(0).max(10000).nullable().optional(),
  status: z.enum(Object.values(USER_STATUS)).nullable().optional(),
  updated_at: z.string().nullable().optional(),
  user_tier: z.enum(Object.values(USER_TIER)).nullable().optional(),
  username: z.string().min(3).max(50).regex(/^[a-zA-Z0-9_]+$/).nullable().optional(),
});

// =====================================================
// TYPE INFERENCE
// =====================================================

export type ProfilesRowInput = z.infer<typeof ProfilesRowSchema>;
export type ProfilesInsertInput = z.infer<typeof ProfilesInsertSchema>;
export type ProfilesUpdateInput = z.infer<typeof ProfilesUpdateSchema>;

export type NDPreferencesInput = z.infer<typeof NDPreferencesSchema>;
export type SensoryPreferencesInput = z.infer<typeof SensoryPreferencesSchema>;
export type AlgorithmPreferencesInput = z.infer<typeof AlgorithmPreferencesSchema>;

export type NDPreferencesObject = z.infer<typeof NDPreferencesObjectSchema>;
export type SensoryPreferencesObject = z.infer<typeof SensoryPreferencesObjectSchema>;
export type AlgorithmPreferencesObject = z.infer<typeof AlgorithmPreferencesObjectSchema>;

// =====================================================
// HELPER VALIDATION FUNCTIONS
// =====================================================

/**
 * Validate a complete profile row
 */
export function validateProfileRow(data: unknown): ProfilesRowInput {
  return ProfilesRowSchema.parse(data);
}

/**
 * Validate profile insert data (for creation)
 */
export function validateProfileInsert(data: unknown): ProfilesInsertInput {
  return ProfilesInsertSchema.parse(data);
}

/**
 * Validate profile update data (for updates)
 */
export function validateProfileUpdate(data: unknown): ProfilesUpdateInput {
  return ProfilesUpdateSchema.parse(data);
}

/**
 * Safe validate - returns result object instead of throwing
 */
export function safeValidateProfileInsert(data: unknown): {
  success: boolean;
  data?: ProfilesInsertInput;
  error?: z.ZodError;
} {
  const result = ProfilesInsertSchema.safeParse(data);
  if (result.success) {
    return { success: true, data: result.data };
  }
  return { success: false, error: result.error };
}

/**
 * Safe validate for update - returns result object instead of throwing
 */
export function safeValidateProfileUpdate(data: unknown): {
  success: boolean;
  data?: ProfilesUpdateInput;
  error?: z.ZodError;
} {
  const result = ProfilesUpdateSchema.safeParse(data);
  if (result.success) {
    return { success: true, data: result.data };
  }
  return { success: false, error: result.error };
}

/**
 * Safe validate for row - returns result object instead of throwing
 */
export function safeValidateProfileRow(data: unknown): {
  success: boolean;
  data?: ProfilesRowInput;
  error?: z.ZodError;
} {
  const result = ProfilesRowSchema.safeParse(data);
  if (result.success) {
    return { success: true, data: result.data };
  }
  return { success: false, error: result.error };
}

// =====================================================
// FIXED ORIGINAL FUNCTIONS
// =====================================================

/**
 * Validate ND preferences specifically (accepts string or object)
 * Returns the parsed object or default object if null
 */
export function validateNDPreferences(data: unknown): NDPreferencesObject {
  const result = NDPreferencesSchema.parse(data);
  if (result === null) {
    // Return default object instead of null
    return NDPreferencesObjectSchema.parse({});
  }
  return result;
}

/**
 * Validate sensory preferences specifically (accepts string or object)
 * Returns the parsed object or default object if null
 */
export function validateSensoryPreferences(data: unknown): SensoryPreferencesObject {
  const result = SensoryPreferencesSchema.parse(data);
  if (result === null) {
    return SensoryPreferencesObjectSchema.parse({});
  }
  return result;
}

/**
 * Validate algorithm preferences specifically (accepts string or object)
 * Returns the parsed object or default object if null
 */
export function validateAlgorithmPreferences(data: unknown): AlgorithmPreferencesObject {
  const result = AlgorithmPreferencesSchema.parse(data);
  if (result === null) {
    return AlgorithmPreferencesObjectSchema.parse({});
  }
  return result;
}

// =====================================================
// SIMPLER VERSION WITH HELPER
// =====================================================

/**
 * Helper to safely parse any preferences JSON
 */
function safeParsePreferences<T>(
  jsonString: string | null | undefined,
  schema: z.ZodType<T | null>,
  defaultObject: T
): T {
  if (jsonString === null || jsonString === undefined) {
    return defaultObject;
  }
  
  try {
    const result = schema.parse(jsonString);
    return result === null ? defaultObject : result;
  } catch {
    return defaultObject;
  }
}

/**
 * Parse a JSON string to ND preferences object
 */
export function parseNDPreferencesString(jsonString: string | null | undefined): NDPreferencesObject {
  return safeParsePreferences(
    jsonString,
    NDPreferencesSchema,
    NDPreferencesObjectSchema.parse({})
  );
}

/**
 * Parse a JSON string to sensory preferences object
 */
export function parseSensoryPreferencesString(jsonString: string | null | undefined): SensoryPreferencesObject {
  return safeParsePreferences(
    jsonString,
    SensoryPreferencesSchema,
    SensoryPreferencesObjectSchema.parse({})
  );
}

/**
 * Parse a JSON string to algorithm preferences object
 */
export function parseAlgorithmPreferencesString(jsonString: string | null | undefined): AlgorithmPreferencesObject {
  return safeParsePreferences(
    jsonString,
    AlgorithmPreferencesSchema,
    AlgorithmPreferencesObjectSchema.parse({})
  );
}
// =====================================================
// USAGE EXAMPLES
// =====================================================

/**
 * Example usage:
 * 
 * // Accepts object directly:
 * const prefs1 = validateNDPreferences({ reduced_motion: true });
 * 
 * // Accepts JSON string:
 * const prefs2 = validateNDPreferences('{"reduced_motion": true}');
 * 
 * // Accepts null:
 * const prefs3 = validateNDPreferences(null);
 * 
 * // In API route:
 * const result = safeValidateProfileInsert(req.body);
 * // req.body.nd_preferences can be object, string, or null
 */