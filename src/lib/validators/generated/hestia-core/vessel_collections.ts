// =====================================================
// FILE: validators/vessel_collections.ts
// GENERATED FROM: database.types.ts
// =====================================================

import z from 'zod';

// =====================================================
// VesselCollections SCHEMAS
// =====================================================

export const VesselCollectionsRowSchema = z.object({
  collection_id: z.string(),
  created_at: z.string(),
  display_order: z.number(),
  id: z.string(),
  is_displayed: z.boolean(),
  updated_at: z.string(),
  user_id: z.string(),
});

export const VesselCollectionsInsertSchema = z.object({
  collection_id: z.string(),
  created_at: z.string().optional(),
  display_order: z.number().optional(),
  id: z.string().optional(),
  is_displayed: z.boolean().optional(),
  updated_at: z.string().optional(),
  user_id: z.string(),
});

export const VesselCollectionsUpdateSchema = z.object({
  collection_id: z.string().optional(),
  created_at: z.string().optional(),
  display_order: z.number().optional(),
  id: z.string().optional(),
  is_displayed: z.boolean().optional(),
  updated_at: z.string().optional(),
  user_id: z.string().optional(),
});

// =====================================================
// TYPE INFERENCE
// =====================================================

export type VesselCollectionsRowInput = z.infer<typeof VesselCollectionsRowSchema>;
export type VesselCollectionsInsertInput = z.infer<typeof VesselCollectionsInsertSchema>;
export type VesselCollectionsUpdateInput = z.infer<typeof VesselCollectionsUpdateSchema>;
