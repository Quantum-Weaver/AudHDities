// =====================================================
// FILE: constants/generated/plutus-economics/campaign_status.ts
// GENERATED: 2026-05-01T03:24:42.845Z
// SOURCE: Constants.public.Enums.campaign_status
// VALUES: 4 entries
// =====================================================

export const CAMPAIGN_STATUS = {
  DRAFT: 'draft',
  ACTIVE: 'active',
  PAUSED: 'paused',
  COMPLETED: 'completed',
} as const;

export type CampaignStatus = typeof CAMPAIGN_STATUS[keyof typeof CAMPAIGN_STATUS];
