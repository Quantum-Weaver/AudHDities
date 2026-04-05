// =====================================================
// FILE: constants/translatable_type.ts
// GENERATED: 2026-04-05T18:10:53.260Z
// SOURCE: Constants.public.Enums.translatable_type
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
