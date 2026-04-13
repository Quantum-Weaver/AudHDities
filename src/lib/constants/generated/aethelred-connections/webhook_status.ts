// =====================================================
// FILE: constants/generated/aethelred-connections/webhook_status.ts
// GENERATED: 2026-04-13T21:55:48.507Z
// SOURCE: Constants.public.Enums.webhook_status
// =====================================================

export const WEBHOOK_STATUS = {
  ACTIVE: 'active',
  FAILED: 'failed',
  DISABLED: 'disabled',
} as const;

export type WebhookStatus = typeof WEBHOOK_STATUS[keyof typeof WEBHOOK_STATUS];