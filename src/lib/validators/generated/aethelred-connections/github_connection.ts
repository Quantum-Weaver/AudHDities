// =====================================================
// FILE: validators/generated/aethelred-connections/github_connection.ts
// GENERATED: 2026-04-17T17:34:19.771Z
// SOURCE: database.types.ts
// =====================================================

import { z } from 'zod';

import { WORKFLOW_STATUS } from '@/lib/constants/generated/aethelred-connections/workflow_status';

// =====================================================
// GithubConnection SCHEMAS
// =====================================================

export const GithubConnectionRowSchema = z.object({
  branch: z.string().nullable(),
  created_at: z.string().nullable(),
  created_by: z.string().nullable(),
  id: z.string(),
  issues_open: z.number().nullable(),
  last_commit_at: z.string().nullable(),
  last_commit_message: z.string().nullable(),
  last_commit_sha: z.string().nullable(),
  operated_by: z.string().nullable(),
  pull_requests_open: z.number().nullable(),
  repository_name: z.string(),
  repository_url: z.string(),
  stars: z.number().nullable(),
  updated_at: z.string().nullable(),
  workflow_status: z.enum(Object.values(WORKFLOW_STATUS)).nullable(),
});

export const GithubConnectionInsertSchema = z.object({
  branch: z.string().nullable().optional(),
  created_at: z.string().nullable().optional(),
  created_by: z.string().nullable().optional(),
  id: z.string().optional(),
  issues_open: z.number().nullable().optional(),
  last_commit_at: z.string().nullable().optional(),
  last_commit_message: z.string().nullable().optional(),
  last_commit_sha: z.string().nullable().optional(),
  operated_by: z.string().nullable().optional(),
  pull_requests_open: z.number().nullable().optional(),
  repository_name: z.string(),
  repository_url: z.string(),
  stars: z.number().nullable().optional(),
  updated_at: z.string().nullable().optional(),
});

export const GithubConnectionUpdateSchema = z.object({
  branch: z.string().nullable().optional(),
  created_at: z.string().nullable().optional(),
  created_by: z.string().nullable().optional(),
  id: z.string().optional(),
  issues_open: z.number().nullable().optional(),
  last_commit_at: z.string().nullable().optional(),
  last_commit_message: z.string().nullable().optional(),
  last_commit_sha: z.string().nullable().optional(),
  operated_by: z.string().nullable().optional(),
  pull_requests_open: z.number().nullable().optional(),
  repository_name: z.string().optional(),
  repository_url: z.string().optional(),
  stars: z.number().nullable().optional(),
  updated_at: z.string().nullable().optional(),
});

// =====================================================
// TYPE INFERENCE
// =====================================================

export type GithubConnectionRowInput = z.infer<typeof GithubConnectionRowSchema>;
export type GithubConnectionInsertInput = z.infer<typeof GithubConnectionInsertSchema>;
export type GithubConnectionUpdateInput = z.infer<typeof GithubConnectionUpdateSchema>;
