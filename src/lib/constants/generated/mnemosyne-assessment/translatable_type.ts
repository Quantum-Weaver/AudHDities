// =====================================================
// FILE: constants/mnemosyne-assessment/translatable_type.ts
// GENERATED: 2026-04-13T16:36:33.094Z
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
