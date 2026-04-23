// =====================================================
// FILE: constants/generated/hestia-core/fulfillment_method.ts
// GENERATED: 2026-04-23T02:40:26.736Z
// SOURCE: Constants.public.Enums.fulfillment_method
// VALUES: 12 entries
// =====================================================

export const FULFILLMENT_METHOD = {
  INSTANT_DOWNLOAD: 'instant_download',
  EMAIL_DELIVERY: 'email_delivery',
  STREAMING_ACCESS: 'streaming_access',
  MEMBERSHIP_ACCESS: 'membership_access',
  SHIPPED: 'shipped',
  LOCAL_PICKUP: 'local_pickup',
  IN_PERSON: 'in_person',
  DIGITAL_DELIVERY: 'digital_delivery',
  TICKET: 'ticket',
  REGISTRATION: 'registration',
  SCHEDULED: 'scheduled',
  AS_COMPLETED: 'as_completed',
} as const;

export type FulfillmentMethod = typeof FULFILLMENT_METHOD[keyof typeof FULFILLMENT_METHOD];
