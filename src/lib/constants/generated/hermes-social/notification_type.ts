// =====================================================
// FILE: constants/generated/hermes-social/notification_type.ts
// GENERATED: 2026-05-01T15:32:00.086Z
// SOURCE: Constants.public.Enums.notification_type
// VALUES: 15 entries
// =====================================================

export const NOTIFICATION_TYPE = {
  COMMENT_REPLY: 'comment_reply',
  EMERALD_RECEIVED: 'emerald_received',
  SUBSCRIPTION_RENEWAL: 'subscription_renewal',
  PRODUCT_PURCHASED: 'product_purchased',
  APPLICATION_APPROVED: 'application_approved',
  APPLICATION_REJECTED: 'application_rejected',
  REPORT_RESOLVED: 'report_resolved',
  REPORT_REJECTED: 'report_rejected',
  SYSTEM_ANNOUNCEMENT: 'system_announcement',
  QUEST_COMPLETED: 'quest_completed',
  BADGE_EARNED: 'badge_earned',
  HOUSE_PROMOTION: 'house_promotion',
  MENTOR_ASSIGNED: 'mentor_assigned',
  WELCOME: 'welcome',
  SPECIAL_WELCOME: 'special_welcome',
} as const;

export type NotificationType = typeof NOTIFICATION_TYPE[keyof typeof NOTIFICATION_TYPE];
