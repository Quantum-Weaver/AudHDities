// =====================================================
// FILE: constants/generated/athena-gamification/scene_type.ts
// GENERATED: 2026-04-22T18:24:20.532Z
// SOURCE: Constants.public.Enums.scene_type
// VALUES: 6 entries
// =====================================================

export const SCENE_TYPE = {
  RITUAL: 'ritual',
  CEREMONY: 'ceremony',
  CELEBRATION: 'celebration',
  INITIATION: 'initiation',
  COUNCIL: 'council',
  VISION_QUEST: 'vision_quest',
} as const;

export type SceneType = typeof SCENE_TYPE[keyof typeof SCENE_TYPE];
