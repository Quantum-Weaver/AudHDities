// =====================================================
// FILE: types/generated/plutus-economics/advertising.ts
// HANDLING: full_crud
// DEITY: plutus-economics
// GENERATED: 2026-05-01T15:31:59.412Z
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

export type BidType = Enums<'bid_type'>;
export type CampaignStatus = Enums<'campaign_status'>;

export type AdvertisingRow = Tables<'advertising'>;
export type AdvertisingInsert = TablesInsert<'advertising'>;
export type AdvertisingUpdate = TablesUpdate<'advertising'>;

// =====================================================
// DERIVED TYPES
// =====================================================

/**
 * Public view of advertising
 */
export interface PublicAdvertising {
  advertiser_id: string;
  advertising_id: string;
  bid_amount_cents: number;
  bid_type: BidType;
  budget_cents: number;
  campaign_name: string;
  created_at: string | null;
  created_by: string | null;
  end_date: string | null;
  spent_cents: number | null;
  start_date: string | null;
  status: CampaignStatus | null;
  targeting_criteria: Json | null;
  updated_at: string | null;
  updated_by: string | null;
  user_share_percent: number | null;
}

/**
 * Form data for advertising
 * All fields are optional for partial updates
 */
export interface AdvertisingFormData {
  advertiser_id?: string;
  advertising_id?: string;
  bid_amount_cents?: number;
  bid_type?: BidType;
  budget_cents?: number;
  campaign_name?: string;
  created_at?: string | null;
  created_by?: string | null;
  end_date?: string | null;
  spent_cents?: number | null;
  start_date?: string | null;
  status?: CampaignStatus | null;
  targeting_criteria?: Json | null;
  updated_at?: string | null;
  updated_by?: string | null;
  user_share_percent?: number | null;
}

/**
 * Validation result for advertising
 */
export interface AdvertisingValidationResult {
  valid: boolean;
  errors: {
    advertiser_id?: string;
    advertising_id?: string;
    bid_amount_cents?: string;
    bid_type?: string;
    budget_cents?: string;
    campaign_name?: string;
    created_at?: string;
    created_by?: string;
    end_date?: string;
    spent_cents?: string;
    start_date?: string;
    status?: string;
    targeting_criteria?: string;
    updated_at?: string;
    updated_by?: string;
    user_share_percent?: string;
  };
}

