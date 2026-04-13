// =====================================================
// FILE: constants/hestia-core/council_house.ts
// GENERATED: 2026-04-13T01:15:57.350Z
// SOURCE: Constants.public.Enums.council_house
// VALUES: 9 entries
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
