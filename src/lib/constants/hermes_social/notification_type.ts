// =====================================================
// FILE: constants/notification_type.ts
// GENERATED: 2026-04-05T18:10:53.211Z
// SOURCE: Constants.public.Enums.notification_type
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
} as const;

export type NotificationType = typeof NOTIFICATION_TYPE[keyof typeof NOTIFICATION_TYPE];
