// =====================================================
// FILE: constants/generated/aethelred-connections/webhook_status.ts
// GENERATED: 2026-04-23T02:40:26.899Z
// SOURCE: Constants.public.Enums.webhook_status
// VALUES: 3 entries
// =====================================================

export const WEBHOOK_STATUS = {
  ACTIVE: 'active',
  FAILED: 'failed',
  DISABLED: 'disabled',
} as const;

export type WebhookStatus = typeof WEBHOOK_STATUS[keyof typeof WEBHOOK_STATUS];
