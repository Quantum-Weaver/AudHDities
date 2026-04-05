// =====================================================
// FILE: constants/scene_type.ts
// GENERATED: 2026-04-05T18:10:53.238Z
// SOURCE: Constants.public.Enums.scene_type
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
