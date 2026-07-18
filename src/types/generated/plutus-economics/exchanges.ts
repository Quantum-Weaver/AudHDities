// =====================================================
// FILE: types/generated/plutus-economics/exchanges.ts
// HANDLING: full_crud
// DEITY: plutus-economics
// GENERATED: 2026-07-18T23:30:03.709Z
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

export type ExchangeStatus = Enums<'exchange_status'>;

export type ExchangesRow = Tables<'exchanges'>;
export type ExchangesInsert = TablesInsert<'exchanges'>;
export type ExchangesUpdate = TablesUpdate<'exchanges'>;

// =====================================================
// DERIVED TYPES
// =====================================================

/**
 * Public view of exchanges
 */
export interface PublicExchanges {
  adjustments: Json | null;
  buyer_id: string;
  created_at: string;
  created_by: string | null;
  currency: string;
  gross_amount: number;
  icon_emoji: string | null;
  id: string;
  net_amount: number | null;
  payment_processor_fee: number | null;
  platform_fee_percent: number;
  status: ExchangeStatus;
  stripe_payment_intent: string | null;
  stripe_session_id: string | null;
  updated_at: string;
  updated_by: string | null;
  ware_id: string | null;
  work_id: string | null;
}

/**
 * Form data for exchanges
 * All fields are optional for partial updates
 */
export interface ExchangesFormData {
  adjustments?: Json | null;
  buyer_id?: string;
  created_at?: string;
  created_by?: string | null;
  currency?: string;
  gross_amount?: number;
  icon_emoji?: string | null;
  id?: string;
  net_amount?: number | null;
  payment_processor_fee?: number | null;
  platform_fee_percent?: number;
  status?: ExchangeStatus;
  stripe_payment_intent?: string | null;
  stripe_session_id?: string | null;
  updated_at?: string;
  updated_by?: string | null;
  ware_id?: string | null;
  work_id?: string | null;
}

/**
 * Validation result for exchanges
 */
export interface ExchangesValidationResult {
  valid: boolean;
  errors: {
    adjustments?: string;
    buyer_id?: string;
    created_at?: string;
    created_by?: string;
    currency?: string;
    gross_amount?: string;
    icon_emoji?: string;
    id?: string;
    net_amount?: string;
    payment_processor_fee?: string;
    platform_fee_percent?: string;
    status?: string;
    stripe_payment_intent?: string;
    stripe_session_id?: string;
    updated_at?: string;
    updated_by?: string;
    ware_id?: string;
    work_id?: string;
  };
}

