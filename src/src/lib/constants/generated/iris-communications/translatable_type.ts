// =====================================================
// FILE: constants/generated/iris-communications/translatable_type.ts
// GENERATED: 2026-04-13T21:47:20.921Z
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