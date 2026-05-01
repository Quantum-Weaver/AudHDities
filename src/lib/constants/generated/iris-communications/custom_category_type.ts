// =====================================================
// FILE: constants/generated/iris-communications/custom_category_type.ts
// GENERATED: 2026-05-01T15:32:00.060Z
// SOURCE: Constants.public.Enums.custom_category_type
// VALUES: 7 entries
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
