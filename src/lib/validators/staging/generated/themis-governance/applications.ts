// =====================================================
// FILE: validators/applications.ts
// GENERATED FROM: database.types.ts
// =====================================================

import { ENUM_VALUES } from '@/types/supabase/enums';
import z from 'zod';

// =====================================================
// Applications SCHEMAS
// =====================================================

export const ApplicationsRowSchema = z.object({
  admin_notes: z.string().nullable(),
  application_type: z.enum(ENUM_VALUES.applicationType),
  created_at: z.string().nullable(),
  created_by: z.string().nullable(),
  form_data: z.any(),
  id: z.string(),
  onboarding_doc_path: z.string().nullable(),
  onboarding_version: z.string().nullable(),
  review_notes: z.string().nullable(),
  reviewed_at: z.string().nullable(),
  reviewed_by: z.string().nullable(),
  status: z.enum(ENUM_VALUES.applicationStatus).nullable(),
  updated_at: z.string().nullable(),
  user_id: z.string(),
  verification_notes: z.string().nullable(),
  verified_by_profile_id: z.string().nullable(),
});

export const ApplicationsInsertSchema = z.object({
  admin_notes: z.string().nullable().optional(),
  application_type: z.enum(ENUM_VALUES.applicationType),
  created_at: z.string().nullable().optional(),
  created_by: z.string().nullable().optional(),
  form_data: z.any(),
  id: z.string().optional(),
  onboarding_doc_path: z.string().nullable().optional(),
  onboarding_version: z.string().nullable().optional(),
  review_notes: z.string().nullable().optional(),
  reviewed_at: z.string().nullable().optional(),
  reviewed_by: z.string().nullable().optional(),
  status: z.enum(ENUM_VALUES.applicationStatus).nullable().optional(),
  updated_at: z.string().nullable().optional(),
  user_id: z.string(),
  verification_notes: z.string().nullable().optional(),
  verified_by_profile_id: z.string().nullable().optional(),
});

export const ApplicationsUpdateSchema = z.object({
  admin_notes: z.string().nullable().optional(),
  application_type: z.enum(ENUM_VALUES.applicationType).optional(),
  created_at: z.string().nullable().optional(),
  created_by: z.string().nullable().optional(),
  form_data: z.any().optional(),
  id: z.string().optional(),
  onboarding_doc_path: z.string().nullable().optional(),
  onboarding_version: z.string().nullable().optional(),
  review_notes: z.string().nullable().optional(),
  reviewed_at: z.string().nullable().optional(),
  reviewed_by: z.string().nullable().optional(),
  status: z.enum(ENUM_VALUES.applicationStatus).nullable().optional(),
  updated_at: z.string().nullable().optional(),
  user_id: z.string().optional(),
  verification_notes: z.string().nullable().optional(),
  verified_by_profile_id: z.string().nullable().optional(),
});

// =====================================================
// TYPE INFERENCE
// =====================================================

export type ApplicationsRowInput = z.infer<typeof ApplicationsRowSchema>;
export type ApplicationsInsertInput = z.infer<typeof ApplicationsInsertSchema>;
export type ApplicationsUpdateInput = z.infer<typeof ApplicationsUpdateSchema>;
