// =====================================================
// FILE: constants/council_house.ts
// GENERATED: 2026-04-05T18:10:53.163Z
// SOURCE: Constants.public.Enums.council_house
// =====================================================

export const COUNCIL_HOUSE = {
  HEARTH_KEEPER: 'hearth_keeper',
  CHANCELLOR: 'chancellor',
  SEER: 'seer',
  AETHELRED: 'aethelred',
  CURATOR: 'curator',
  ARCHIVIST: 'archivist',
  SKALD: 'skald',
  CODEX: 'codex',
  EXECUTIONER: 'executioner',
} as const;

export type CouncilHouse = typeof COUNCIL_HOUSE[keyof typeof COUNCIL_HOUSE];
