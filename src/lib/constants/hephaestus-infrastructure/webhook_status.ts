// =====================================================
// FILE: constants/hephaestus-infrastructure/webhook_status.ts
// GENERATED: 2026-04-13T01:15:57.372Z
// SOURCE: Constants.public.Enums.webhook_status
// VALUES: 3 entries
// =====================================================

export const WEBHOOK_STATUS = {
  ACTIVE: 'active',
  FAILED: 'failed',
  DISABLED: 'disabled',
} as const;

export type WebhookStatus = typeof WEBHOOK_STATUS[keyof typeof WEBHOOK_STATUS];
