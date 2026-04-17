// =====================================================
// FILE: validators/generated/themis-governance/applications.ts
// GENERATED: 2026-04-17T17:34:19.747Z
// SOURCE: database.types.ts
// =====================================================

import { z } from 'zod';

import { APPLICATION_STATUS } from '@/lib/constants/generated/themis-governance/application_status';
import { APPLICATION_TYPE } from '@/lib/constants/generated/themis-governance/application_type';

// =====================================================
// Applications SCHEMAS
// =====================================================

export const ApplicationsRowSchema = z.object({
  admin_notes: z.string().nullable(),
  application_type: z.enum(Object.values(APPLICATION_TYPE)),
  created_at: z.string().nullable(),
  created_by: z.string().nullable(),
  form_data: z.any(),
  id: z.string(),
  onboarding_doc_path: z.string().nullable(),
  onboarding_version: z.string().nullable(),
  review_notes: z.string().nullable(),
  reviewed_at: z.string().nullable(),
  reviewed_by: z.string().nullable(),
  status: z.enum(Object.values(APPLICATION_STATUS)).nullable(),
  updated_at: z.string().nullable(),
  user_id: z.string(),
});

export const ApplicationsInsertSchema = z.object({
  admin_notes: z.string().nullable().optional(),
  application_type: z.enum(Object.values(APPLICATION_TYPE)),
  created_at: z.string().nullable().optional(),
  created_by: z.string().nullable().optional(),
  form_data: z.any(),
  id: z.string().optional(),
  onboarding_doc_path: z.string().nullable().optional(),
  onboarding_version: z.string().nullable().optional(),
  review_notes: z.string().nullable().optional(),
  reviewed_at: z.string().nullable().optional(),
  reviewed_by: z.string().nullable().optional(),
  status: z.enum(Object.values(APPLICATION_STATUS)).nullable().optional(),
  updated_at: z.string().nullable().optional(),
  user_id: z.string(),
});

export const ApplicationsUpdateSchema = z.object({
  admin_notes: z.string().nullable().optional(),
  application_type: z.enum(Object.values(APPLICATION_TYPE)).optional(),
  created_at: z.string().nullable().optional(),
  created_by: z.string().nullable().optional(),
  form_data: z.any().optional(),
  id: z.string().optional(),
  onboarding_doc_path: z.string().nullable().optional(),
  onboarding_version: z.string().nullable().optional(),
  review_notes: z.string().nullable().optional(),
  reviewed_at: z.string().nullable().optional(),
  reviewed_by: z.string().nullable().optional(),
  status: z.enum(Object.values(APPLICATION_STATUS)).nullable().optional(),
  updated_at: z.string().nullable().optional(),
  user_id: z.string().optional(),
});

// =====================================================
// TYPE INFERENCE
// =====================================================

export type ApplicationsRowInput = z.infer<typeof ApplicationsRowSchema>;
export type ApplicationsInsertInput = z.infer<typeof ApplicationsInsertSchema>;
export type ApplicationsUpdateInput = z.infer<typeof ApplicationsUpdateSchema>;
