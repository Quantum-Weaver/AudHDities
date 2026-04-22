// =====================================================
// FILE: types/generated/plutus-economics/advertising.ts
// TYPE: table
// HANDLING: full_crud
// GENERATED: 2026-04-22T18:15:09.514Z
// SOURCE: database.types.ts (via Tables helper)
// =====================================================

import type { Tables, TablesInsert, TablesUpdate } from '@/types/supabase/database.helpers';
import type { Database } from '@/types/supabase/database.types';
import type { Json } from '@/types/supabase/database.types';

// =====================================================
// CORE TYPES
// =====================================================

// =====================================================
// ENUM EXPORTS (from database enums)
// =====================================================

export type BidType = Database['public']['Enums']['bid_type'];
export type CampaignStatus = Database['public']['Enums']['campaign_status'];
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
  bid_amount_cents: number;
  bid_type: BidType;
  budget_cents: number;
  campaign_name: string;
  created_at: string | null;
  created_by: string | null;
  end_date: string | null;
  id: string;
  spent_cents: number | null;
  start_date: string | null;
  status: CampaignStatus | null;
  targeting_criteria: Json | null;
  updated_at: string | null;
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

