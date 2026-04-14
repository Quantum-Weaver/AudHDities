// =====================================================
// FILE: constants/generated/hestia-core/webhook_status.ts
// GENERATED: 2026-04-14T20:18:57.679Z
// SOURCE: Constants.public.Enums.webhook_status
// VALUES: 3 entries
// =====================================================

export const WEBHOOK_STATUS = {
  ACTIVE: 'active',
  FAILED: 'failed',
  DISABLED: 'disabled',
} as const;

export type WebhookStatus = typeof WEBHOOK_STATUS[keyof typeof WEBHOOK_STATUS];
