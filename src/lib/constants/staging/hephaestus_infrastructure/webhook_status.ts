// =====================================================
// FILE: constants/webhook_status.ts
// GENERATED: 2026-04-05T19:46:33.382Z
// SOURCE: Constants.public.Enums.webhook_status
// =====================================================

export const WEBHOOK_STATUS = {
  ACTIVE: 'active',
  FAILED: 'failed',
  DISABLED: 'disabled',
} as const;

export type WebhookStatus = typeof WEBHOOK_STATUS[keyof typeof WEBHOOK_STATUS];
