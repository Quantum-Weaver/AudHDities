// =====================================================
// FILE: lib/validators/generated/hestia-core/profiles.ts
// HANDLING: full_crud
// GENERATED: 2026-04-22T21:41:50.813Z
// BUILT FROM: types/generated/hestia-core/profiles.ts
// =====================================================

import { z } from 'zod';

// =====================================================
// ZOD SCHEMAS (Built from type definitions)
// =====================================================

export const ProfilesRowSchema = z.object({
  username: z.string().nullable(),
});

export const ProfilesInsertSchema = z.object({
  username: z.string().nullable(),
});

export const ProfilesUpdateSchema = z.object({
  username: z.string().nullable().optional(),
});

// =====================================================
// TYPE INFERENCE
// =====================================================

export type ProfilesRowInput = z.infer<typeof ProfilesRowSchema>;
export type ProfilesInsertInput = z.infer<typeof ProfilesInsertSchema>;
export type ProfilesUpdateInput = z.infer<typeof ProfilesUpdateSchema>;

// =====================================================
// VALIDATION UTILITIES
// =====================================================

export function validateProfilesRow(data: unknown): data is ProfilesRowInput {
  try { ProfilesRowSchema.parse(data); return true; } catch { return false; }
}

export function validateProfilesInsert(data: unknown): data is ProfilesInsertInput {
  try { ProfilesInsertSchema.parse(data); return true; } catch { return false; }
}

export function validateProfilesUpdate(data: unknown): data is ProfilesUpdateInput {
  try { ProfilesUpdateSchema.parse(data); return true; } catch { return false; }
}

export function safeValidateProfilesInsert(data: unknown): { success: boolean; data?: ProfilesInsertInput; error?: z.ZodError } {
  const result = ProfilesInsertSchema.safeParse(data);
  if (result.success) return { success: true, data: result.data };
  return { success: false, error: result.error };
}
