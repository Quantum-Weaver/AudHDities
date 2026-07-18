// =====================================================
// FILE: types/generated/plutus-economics/grant_opportunities.ts
// HANDLING: full_crud
// DEITY: plutus-economics
// GENERATED: 2026-07-18T23:17:10.872Z
// SOURCE: database.types.ts lines 0-0
// =====================================================

import type { Tables, TablesInsert, TablesUpdate, Enums } from '@/types/supabase/database.helpers.js';
import type { Json } from '@/types/supabase/database.types.js';

// =====================================================
// CORE TYPES
// =====================================================

// =====================================================
// ENUM EXPORTS (from database enums)
// =====================================================

export type ContentStatus = Enums<'content_status'>;

export type GrantOpportunitiesRow = Tables<'grant_opportunities'>;
export type GrantOpportunitiesInsert = TablesInsert<'grant_opportunities'>;
export type GrantOpportunitiesUpdate = TablesUpdate<'grant_opportunities'>;

// =====================================================
// DERIVED TYPES
// =====================================================

/**
 * Public view of grant_opportunities
 */
export interface PublicGrantOpportunities {
  application_url: string | null;
  category: string | null;
  created_at: string;
  created_by: string | null;
  currency: string;
  deadline: string | null;
  description: string | null;
  eligibility: string | null;
  funding_amount: string | null;
  funding_organization: string | null;
  id: string;
  is_verified: boolean;
  name: string;
  opportunity_type: string | null;
  requirements: Json | null;
  slug: string;
  status: ContentStatus;
  submitted_by: string | null;
  updated_at: string;
  updated_by: string | null;
}

/**
 * Form data for grant_opportunities
 * All fields are optional for partial updates
 */
export interface GrantOpportunitiesFormData {
  application_url?: string | null;
  category?: string | null;
  created_at?: string;
  created_by?: string | null;
  currency?: string;
  deadline?: string | null;
  description?: string | null;
  eligibility?: string | null;
  funding_amount?: string | null;
  funding_organization?: string | null;
  id?: string;
  is_verified?: boolean;
  name?: string;
  opportunity_type?: string | null;
  requirements?: Json | null;
  slug?: string;
  status?: ContentStatus;
  submitted_by?: string | null;
  updated_at?: string;
  updated_by?: string | null;
}

/**
 * Validation result for grant_opportunities
 */
export interface GrantOpportunitiesValidationResult {
  valid: boolean;
  errors: {
    application_url?: string;
    category?: string;
    created_at?: string;
    created_by?: string;
    currency?: string;
    deadline?: string;
    description?: string;
    eligibility?: string;
    funding_amount?: string;
    funding_organization?: string;
    id?: string;
    is_verified?: string;
    name?: string;
    opportunity_type?: string;
    requirements?: string;
    slug?: string;
    status?: string;
    submitted_by?: string;
    updated_at?: string;
    updated_by?: string;
  };
}

