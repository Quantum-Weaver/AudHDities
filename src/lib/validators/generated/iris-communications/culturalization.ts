// =====================================================
// FILE: validators/culturalization.ts
// GENERATED FROM: database.types.ts
// =====================================================

import { ENUM_VALUES } from '@/types/supabase/enums';
import z from 'zod';

// =====================================================
// Culturalization SCHEMAS
// =====================================================

export const CulturalizationRowSchema = z.object({
  created_at: z.string().nullable(),
  created_by: z.string().nullable(),
  culturalization_id: z.string(),
  currency_code: z.string().nullable(),
  currency_symbol: z.string().nullable(),
  date_format: z.enum(ENUM_VALUES.dateFormatType).nullable(),
  decimal_separator: z.string().nullable(),
  first_day_of_week: z.number().nullable(),
  region_id: z.string(),
  thousands_separator: z.string().nullable(),
  time_format: z.enum(ENUM_VALUES.timeFormatType).nullable(),
  timezone: z.string().nullable(),
  updated_at: z.string().nullable(),
  updated_by: z.string().nullable(),
});

export const CulturalizationInsertSchema = z.object({
  created_at: z.string().nullable().optional(),
  created_by: z.string().nullable().optional(),
  culturalization_id: z.string().optional(),
  currency_code: z.string().nullable().optional(),
  currency_symbol: z.string().nullable().optional(),
  date_format: z.enum(ENUM_VALUES.dateFormatType).nullable().optional(),
  decimal_separator: z.string().nullable().optional(),
  first_day_of_week: z.number().nullable().optional(),
  region_id: z.string(),
  thousands_separator: z.string().nullable().optional(),
  time_format: z.enum(ENUM_VALUES.timeFormatType).nullable().optional(),
  timezone: z.string().nullable().optional(),
  updated_at: z.string().nullable().optional(),
  updated_by: z.string().nullable().optional(),
});

export const CulturalizationUpdateSchema = z.object({
  created_at: z.string().nullable().optional(),
  created_by: z.string().nullable().optional(),
  culturalization_id: z.string().optional(),
  currency_code: z.string().nullable().optional(),
  currency_symbol: z.string().nullable().optional(),
  date_format: z.enum(ENUM_VALUES.dateFormatType).nullable().optional(),
  decimal_separator: z.string().nullable().optional(),
  first_day_of_week: z.number().nullable().optional(),
  region_id: z.string().optional(),
  thousands_separator: z.string().nullable().optional(),
  time_format: z.enum(ENUM_VALUES.timeFormatType).nullable().optional(),
  timezone: z.string().nullable().optional(),
  updated_at: z.string().nullable().optional(),
  updated_by: z.string().nullable().optional(),
});

// =====================================================
// TYPE INFERENCE
// =====================================================

export type CulturalizationRowInput = z.infer<typeof CulturalizationRowSchema>;
export type CulturalizationInsertInput = z.infer<typeof CulturalizationInsertSchema>;
export type CulturalizationUpdateInput = z.infer<typeof CulturalizationUpdateSchema>;
