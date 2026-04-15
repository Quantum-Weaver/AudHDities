// =====================================================
// FILE: constants/generated/hestia-core/folksonomy_target_type.ts
// GENERATED: 2026-04-15T05:16:17.355Z
// SOURCE: Constants.public.Enums.folksonomy_target_type
// VALUES: 8 entries
// =====================================================

export const FOLKSONOMY_TARGET_TYPE = {
  POST: 'post',
  PRODUCT: 'product',
  COMMENT: 'comment',
  PROFILE: 'profile',
  QUEST: 'quest',
  MYTH: 'myth',
  LESSON: 'lesson',
  SCENE: 'scene',
} as const;

export type FolksonomyTargetType = typeof FOLKSONOMY_TARGET_TYPE[keyof typeof FOLKSONOMY_TARGET_TYPE];
