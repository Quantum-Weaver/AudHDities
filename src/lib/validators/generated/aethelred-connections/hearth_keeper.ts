// =====================================================
// FILE: validators/generated/aethelred-connections/hearth_keeper.ts
// GENERATED: 2026-04-17T01:35:45.254Z
// SOURCE: database.types.ts
// =====================================================

import { z } from 'zod';

// =====================================================
// HearthKeeper SCHEMAS
// =====================================================

export const HearthKeeperRowSchema = z.object({
  accessibility_standards: z.any().nullable(),
  created_at: z.string().nullable(),
  created_by: z.string().nullable(),
  crisis_resources: z.any().nullable(),
  id: z.string(),
  moderators: z.any().nullable(),
  reported_content_queue: z.any().nullable(),
  safety_protocols: z.any().nullable(),
  safety_score: z.number().nullable(),
  updated_at: z.string().nullable(),
  welcome_messages: z.any().nullable(),
});

export const HearthKeeperInsertSchema = z.object({
  accessibility_standards: z.any().nullable().optional(),
  created_at: z.string().nullable().optional(),
  created_by: z.string().nullable().optional(),
  crisis_resources: z.any().nullable().optional(),
  id: z.string(),
  moderators: z.any().nullable().optional(),
  reported_content_queue: z.any().nullable().optional(),
  safety_protocols: z.any().nullable().optional(),
  safety_score: z.number().nullable().optional(),
  updated_at: z.string().nullable().optional(),
  welcome_messages: z.any().nullable().optional(),
});

export const HearthKeeperUpdateSchema = z.object({
  accessibility_standards: z.any().nullable().optional(),
  created_at: z.string().nullable().optional(),
  created_by: z.string().nullable().optional(),
  crisis_resources: z.any().nullable().optional(),
  id: z.string().optional(),
  moderators: z.any().nullable().optional(),
  reported_content_queue: z.any().nullable().optional(),
  safety_protocols: z.any().nullable().optional(),
  safety_score: z.number().nullable().optional(),
  updated_at: z.string().nullable().optional(),
  welcome_messages: z.any().nullable().optional(),
});

// =====================================================
// TYPE INFERENCE
// =====================================================

export type HearthKeeperRowInput = z.infer<typeof HearthKeeperRowSchema>;
export type HearthKeeperInsertInput = z.infer<typeof HearthKeeperInsertSchema>;
export type HearthKeeperUpdateInput = z.infer<typeof HearthKeeperUpdateSchema>;
