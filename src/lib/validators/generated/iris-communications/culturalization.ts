// =====================================================
// FILE: validators/generated/iris-communications/culturalization.ts
// GENERATED: 2026-04-17T22:45:09.659Z
// SOURCE: database.types.ts
// =====================================================

import { z } from 'zod';

import { DATE_FORMAT_TYPE } from '@/lib/constants/generated/iris-communications/date_format_type';
import { TIME_FORMAT_TYPE } from '@/lib/constants/generated/iris-communications/time_format_type';

// =====================================================
// Culturalization SCHEMAS
// =====================================================

export const CulturalizationRowSchema = z.object({
  created_at: z.string().nullable(),
  created_by: z.string().nullable(),
  currency_code: z.string().nullable(),
  currency_symbol: z.string().nullable(),
  date_format: z.enum(Object.values(DATE_FORMAT_TYPE)).nullable(),
  decimal_separator: z.string().nullable(),
  first_day_of_week: z.number().nullable(),
  id: z.string(),
  region_id: z.string(),
  thousands_separator: z.string().nullable(),
  time_format: z.enum(Object.values(TIME_FORMAT_TYPE)).nullable(),
  timezone: z.string().nullable(),
  updated_at: z.string().nullable(),
});

export const CulturalizationInsertSchema = z.object({
  created_at: z.string().nullable().optional(),
  created_by: z.string().nullable().optional(),
  currency_code: z.string().nullable().optional(),
  currency_symbol: z.string().nullable().optional(),
  date_format: z.enum(Object.values(DATE_FORMAT_TYPE)).nullable().optional(),
  decimal_separator: z.string().nullable().optional(),
  first_day_of_week: z.number().nullable().optional(),
  id: z.string().optional(),
  region_id: z.string(),
  thousands_separator: z.string().nullable().optional(),
  time_format: z.enum(Object.values(TIME_FORMAT_TYPE)).nullable().optional(),
  timezone: z.string().nullable().optional(),
  updated_at: z.string().nullable().optional(),
});

export const CulturalizationUpdateSchema = z.object({
  created_at: z.string().nullable().optional(),
  created_by: z.string().nullable().optional(),
  currency_code: z.string().nullable().optional(),
  currency_symbol: z.string().nullable().optional(),
  date_format: z.enum(Object.values(DATE_FORMAT_TYPE)).nullable().optional(),
  decimal_separator: z.string().nullable().optional(),
  first_day_of_week: z.number().nullable().optional(),
  id: z.string().optional(),
  region_id: z.string().optional(),
  thousands_separator: z.string().nullable().optional(),
  time_format: z.enum(Object.values(TIME_FORMAT_TYPE)).nullable().optional(),
  timezone: z.string().nullable().optional(),
  updated_at: z.string().nullable().optional(),
});

// =====================================================
// TYPE INFERENCE
// =====================================================

export type CulturalizationRowInput = z.infer<typeof CulturalizationRowSchema>;
export type CulturalizationInsertInput = z.infer<typeof CulturalizationInsertSchema>;
export type CulturalizationUpdateInput = z.infer<typeof CulturalizationUpdateSchema>;
