// =====================================================
// FILE: validators/archivist.ts
// GENERATED FROM: database.types.ts
// =====================================================

import z from 'zod';

// =====================================================
// Archivist SCHEMAS
// =====================================================

export const ArchivistRowSchema = z.object({
  backup_status: z.any().nullable(),
  created_at: z.string().nullable(),
  created_by: z.string().nullable(),
  documentation_standards: z.any().nullable(),
  historical_records: z.any().nullable(),
  id: z.string(),
  last_archive_at: z.string().nullable(),
  milestones: z.any().nullable(),
  updated_at: z.string().nullable(),
  version_history: z.any().nullable(),
});

export const ArchivistInsertSchema = z.object({
  backup_status: z.any().nullable().optional(),
  created_at: z.string().nullable().optional(),
  created_by: z.string().nullable().optional(),
  documentation_standards: z.any().nullable().optional(),
  historical_records: z.any().nullable().optional(),
  id: z.string(),
  last_archive_at: z.string().nullable().optional(),
  milestones: z.any().nullable().optional(),
  updated_at: z.string().nullable().optional(),
  version_history: z.any().nullable().optional(),
});

export const ArchivistUpdateSchema = z.object({
  backup_status: z.any().nullable().optional(),
  created_at: z.string().nullable().optional(),
  created_by: z.string().nullable().optional(),
  documentation_standards: z.any().nullable().optional(),
  historical_records: z.any().nullable().optional(),
  id: z.string().optional(),
  last_archive_at: z.string().nullable().optional(),
  milestones: z.any().nullable().optional(),
  updated_at: z.string().nullable().optional(),
  version_history: z.any().nullable().optional(),
});

// =====================================================
// TYPE INFERENCE
// =====================================================

export type ArchivistRowInput = z.infer<typeof ArchivistRowSchema>;
export type ArchivistInsertInput = z.infer<typeof ArchivistInsertSchema>;
export type ArchivistUpdateInput = z.infer<typeof ArchivistUpdateSchema>;
