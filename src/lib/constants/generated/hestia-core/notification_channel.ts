// =====================================================
// FILE: constants/generated/hestia-core/notification_channel.ts
// GENERATED: 2026-08-01T18:15:38.556Z
// SOURCE: Constants.public.Enums.notification_channel
// VALUES: 4 entries
// =====================================================

export const NOTIFICATION_CHANNEL = {
  IN_APP: 'in_app',
  EMAIL: 'email',
  PUSH: 'push',
  NONE: 'none',
} as const;

export type NotificationChannel = typeof NOTIFICATION_CHANNEL[keyof typeof NOTIFICATION_CHANNEL];
