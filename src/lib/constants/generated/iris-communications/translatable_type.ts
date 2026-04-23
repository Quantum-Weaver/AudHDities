// =====================================================
// FILE: constants/generated/iris-communications/translatable_type.ts
// GENERATED: 2026-04-23T02:14:54.274Z
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
