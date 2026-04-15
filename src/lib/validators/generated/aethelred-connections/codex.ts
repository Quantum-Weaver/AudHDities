// =====================================================
// FILE: validators/generated/aethelred-connections/codex.ts
// GENERATED: 2026-04-15T05:16:17.676Z
// SOURCE: database.types.ts
// =====================================================

import { z } from 'zod';

// =====================================================
// Codex SCHEMAS
// =====================================================

export const CodexRowSchema = z.object({
  created_at: z.string().nullable(),
  created_by: z.string().nullable(),
  glossary: z.any().nullable(),
  id: z.string(),
  knowledge_base: z.any().nullable(),
  learning_paths: z.any().nullable(),
  ontology_graph: z.any().nullable(),
  taxonomy_tree: z.any().nullable(),
  updated_at: z.string().nullable(),
  wisdom_queue: z.any().nullable(),
});

export const CodexInsertSchema = z.object({
  created_at: z.string().nullable().optional(),
  created_by: z.string().nullable().optional(),
  glossary: z.any().nullable().optional(),
  id: z.string().optional(),
  knowledge_base: z.any().nullable().optional(),
  learning_paths: z.any().nullable().optional(),
  ontology_graph: z.any().nullable().optional(),
  taxonomy_tree: z.any().nullable().optional(),
  updated_at: z.string().nullable().optional(),
  wisdom_queue: z.any().nullable().optional(),
});

export const CodexUpdateSchema = z.object({
  created_at: z.string().nullable().optional(),
  created_by: z.string().nullable().optional(),
  glossary: z.any().nullable().optional(),
  id: z.string().optional(),
  knowledge_base: z.any().nullable().optional(),
  learning_paths: z.any().nullable().optional(),
  ontology_graph: z.any().nullable().optional(),
  taxonomy_tree: z.any().nullable().optional(),
  updated_at: z.string().nullable().optional(),
  wisdom_queue: z.any().nullable().optional(),
});

// =====================================================
// TYPE INFERENCE
// =====================================================

export type CodexRowInput = z.infer<typeof CodexRowSchema>;
export type CodexInsertInput = z.infer<typeof CodexInsertSchema>;
export type CodexUpdateInput = z.infer<typeof CodexUpdateSchema>;
