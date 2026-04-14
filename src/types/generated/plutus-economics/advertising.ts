// =====================================================
// FILE: types/generated/plutus-economics/advertising.ts
// HANDLING: full_crud
// GENERATED: 2026-04-14T19:39:29.992Z
// SOURCE: database.types.ts lines 354-422
// =====================================================

import type { Database, Json } from '@/types/supabase/database.types';

// =====================================================
// ENUM EXPORTS (from database enums)
// =====================================================

export type BidType = Database['public']['Enums']['bid_type'];
export type CampaignStatus = Database['public']['Enums']['campaign_status'];

// =====================================================
// CORE TYPES
// =====================================================

export type AdvertisingRow = Database['public']['Tables']['advertising']['Row'];
export type AdvertisingInsert = Database['public']['Tables']['advertising']['Insert'];
export type AdvertisingUpdate = Database['public']['Tables']['advertising']['Update'];

// =====================================================
// DERIVED TYPES
// =====================================================

/**
 * Public view of advertising
 */
export interface PublicAdvertising {
  advertiser_id: string;
  bid_amount_cents: number;
  bid_type: BidType;
  budget_cents: number;
  campaign_name: string;
  "created_at": "string | null";
  created_by: string | null;
  end_date: string | null;
  id: string;
  spent_cents: number | null;
  start_date: string | null;
  status: CampaignStatus | null;
  targeting_criteria: Json | null;
  "updated_at": "string | null";
  user_share_percent: number | null;
}

/**
 * Form data for advertising
 * All fields are optional for partial updates
 */
export interface AdvertisingFormData {
  advertiser_id?: string;
  bid_amount_cents?: number;
  bid_type?: BidType;
  budget_cents?: number;
  campaign_name?: string;
  created_at?: string | null;
  created_by?: string | null;
  end_date?: string | null;
  id?: string;
  spent_cents?: number | null;
  start_date?: string | null;
  status?: CampaignStatus | null;
  targeting_criteria?: Json | null;
  updated_at?: string | null;
  user_share_percent?: number | null;
}

/**
 * Validation result for advertising
 */
export interface AdvertisingValidationResult {
  valid: boolean;
  errors: {
    advertiser_id?: string;
    bid_amount_cents?: string;
    bid_type?: string;
    budget_cents?: string;
    campaign_name?: string;
    created_at?: string;
    created_by?: string;
    end_date?: string;
    id?: string;
    spent_cents?: string;
    start_date?: string;
    status?: string;
    targeting_criteria?: string;
    updated_at?: string;
    user_share_percent?: string;
  };
}

