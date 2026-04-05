// =====================================================
// FILE: constants/custom_category_type.ts
// GENERATED: 2026-04-05T18:12:45.000Z
// SOURCE: Constants.public.Enums.custom_category_type
// =====================================================

export const CUSTOM_CATEGORY_TYPE = {
  GREETING: 'greeting',
  COMMUNICATION: 'communication',
  GIFT: 'gift',
  TABOO: 'taboo',
  CELEBRATION: 'celebration',
  BUSINESS: 'business',
  FAMILY: 'family',
} as const;

export type CustomCategoryType = typeof CUSTOM_CATEGORY_TYPE[keyof typeof CUSTOM_CATEGORY_TYPE];
