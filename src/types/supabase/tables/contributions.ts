// src/types/supabase/tables/contributions.ts
import type { Database } from '../database.types';
import type { ContributionType } from '../enums';

export type Contribution = Database['public']['Tables']['contributions']['Row'];
export type ContributionInsert = Database['public']['Tables']['contributions']['Insert'];
export type ContributionUpdate = Database['public']['Tables']['contributions']['Update'];

export interface ContributionWithDetails extends Contribution {
  contributor?: {
    id: string;
    username: string | null;
    display_name: string | null;
    avatar_url: string | null;
  };
  product?: {
    id: string;
    title: string;
    slug: string;
  };
}

export const contributionTypeLabels: Record<ContributionType, string> = {
  concept: 'Concept / Idea',
  code: 'Code / Development',
  design: 'Design / UX',
  content: 'Content / Writing',
  testing: 'Testing / QA',
  promotion: 'Promotion / Marketing',
  infrastructure: 'Infrastructure / Hosting',
};

export interface ContributionWithRelations extends Contribution {
  contributor?: Database['public']['Tables']['profiles']['Row'];
  product?: Database['public']['Tables']['products']['Row'];
}

export const contributionDefaults = {
  is_residual_eligible: true,
  is_one_time: false,
} as const;