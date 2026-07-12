// =====================================================
// FILE: validators/garden_visits.ts
// GENERATED FROM: database.types.ts
// =====================================================

import z from 'zod';

// =====================================================
// GardenVisits SCHEMAS
// =====================================================

export const GardenVisitsRowSchema = z.object({
  action: z.string().nullable(),
  created_at: z.string(),
  id: z.string(),
  notes: z.string().nullable(),
  plot_id: z.string(),
  updated_at: z.string(),
  visited_at: z.string(),
  visitor_id: z.string(),
});

export const GardenVisitsInsertSchema = z.object({
  action: z.string().nullable().optional(),
  created_at: z.string().optional(),
  id: z.string().optional(),
  notes: z.string().nullable().optional(),
  plot_id: z.string(),
  updated_at: z.string().optional(),
  visited_at: z.string().optional(),
  visitor_id: z.string(),
});

export const GardenVisitsUpdateSchema = z.object({
  action: z.string().nullable().optional(),
  created_at: z.string().optional(),
  id: z.string().optional(),
  notes: z.string().nullable().optional(),
  plot_id: z.string().optional(),
  updated_at: z.string().optional(),
  visited_at: z.string().optional(),
  visitor_id: z.string().optional(),
});

// =====================================================
// TYPE INFERENCE
// =====================================================

export type GardenVisitsRowInput = z.infer<typeof GardenVisitsRowSchema>;
export type GardenVisitsInsertInput = z.infer<typeof GardenVisitsInsertSchema>;
export type GardenVisitsUpdateInput = z.infer<typeof GardenVisitsUpdateSchema>;
