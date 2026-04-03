/* @/lib/constants/economics/campaign-status.ts */

export const CAMPAIGN_STATUS = {
  'cpm': 'CPM',
  'cpc': 'CPC',
  'cpa': 'CPA'
}

export type CampaignStatus = typeof CAMPAIGN_STATUS[keyof typeof CAMPAIGN_STATUS];