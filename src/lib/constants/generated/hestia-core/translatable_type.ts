// =====================================================
// FILE: constants/generated/hestia-core/translatable_type.ts
// GENERATED: 2026-04-14T20:18:57.677Z
// SOURCE: Constants.public.Enums.translatable_type
// VALUES: 6 entries
// =====================================================

export const TRANSLATABLE_TYPE = {
  POST: 'post',
  PRODUCT: 'product',
  QUEST: 'quest',
  MYTH: 'myth',
  LESSON: 'lesson',
  PAGE: 'page',
} as const;

export type TranslatableType = typeof TRANSLATABLE_TYPE[keyof typeof TRANSLATABLE_TYPE];
