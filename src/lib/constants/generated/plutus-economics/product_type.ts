// =====================================================
// FILE: constants/generated/plutus-economics/product_type.ts
// GENERATED: 2026-04-15T18:28:45.919Z
// SOURCE: Constants.public.Enums.product_type
// VALUES: 34 entries
// =====================================================

export const PRODUCT_TYPE = {
  DIGITAL_COURSE: 'digital_course',
  DIGITAL_DOWNLOAD: 'digital_download',
  DIGITAL_MEMBERSHIP: 'digital_membership',
  DIGITAL_SUBSCRIPTION: 'digital_subscription',
  DIGITAL_BUNDLE: 'digital_bundle',
  PHYSICAL_PRODUCT: 'physical_product',
  PHYSICAL_HANDMADE: 'physical_handmade',
  PHYSICAL_MANUFACTURED: 'physical_manufactured',
  PHYSICAL_CUSTOM: 'physical_custom',
  AUDIO: 'audio',
  VIDEO: 'video',
  PODCAST: 'podcast',
  MUSIC: 'music',
  LIVESTREAM: 'livestream',
  EVENT_LIVE: 'event_live',
  EVENT_VIRTUAL: 'event_virtual',
  WORKSHOP: 'workshop',
  CLASS: 'class',
  CONSULTATION: 'consultation',
  SERVICE: 'service',
  COMMISSION: 'commission',
  CONTRACT: 'contract',
  SPONSORSHIP: 'sponsorship',
  MUTUAL_AID: 'mutual_aid',
  CROWDFUNDING: 'crowdfunding',
  TIP: 'tip',
  DONATION: 'donation',
  CLOTHING: 'clothing',
  ACCESSORY: 'accessory',
  FABRIC: 'fabric',
  PATTERN: 'pattern',
  BUNDLE: 'bundle',
  KIT: 'kit',
  SUBSCRIPTION_BOX: 'subscription_box',
} as const;

export type ProductType = typeof PRODUCT_TYPE[keyof typeof PRODUCT_TYPE];
