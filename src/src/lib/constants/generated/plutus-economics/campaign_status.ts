// =====================================================
// FILE: constants/generated/plutus-economics/campaign_status.ts
// GENERATED: 2026-04-13T21:47:20.886Z
// SOURCE: Constants.public.Enums.campaign_status
// =====================================================

export const CAMPAIGN_STATUS = {
  DRAFT: 'draft',
  ACTIVE: 'active',
  PAUSED: 'paused',
  COMPLETED: 'completed',
} as const;

export type CampaignStatus = typeof CAMPAIGN_STATUS[keyof typeof CAMPAIGN_STATUS];