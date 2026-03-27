// types/supabase/tables/reports.ts
import type { Database } from '../database.types';
import type { ReportType, ReportStatus } from '../enums';

export type Report = Database['public']['Tables']['reports']['Row'];
export type ReportInsert = Database['public']['Tables']['reports']['Insert'];
export type ReportUpdate = Database['public']['Tables']['reports']['Update'];

export interface ReportWithRelations extends Report {
  reporter?: Database['public']['Tables']['profiles']['Row'];
  reported_user?: Database['public']['Tables']['profiles']['Row'];
  product?: Database['public']['Tables']['products']['Row'];
  comment?: Database['public']['Tables']['comments']['Row'];
  post?: Database['public']['Tables']['posts']['Row'];
  moderator?: Database['public']['Tables']['profiles']['Row'];
}

export const reportDefaults = {
  status: 'pending' as const,
  metadata: {},
} as const;