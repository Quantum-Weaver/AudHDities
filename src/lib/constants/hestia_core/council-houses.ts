/* @/lib/constants/core/council-houses.ts */

export const COUNCIL_HOUSES = {
  HEARTH_KEEPER: 'hearth_keeper',
  CHANCELLOR: 'chancellor',
  SEER: 'seer',
  AETHELRED: 'aethelred',
  CURATOR: 'curator',
  ARCHIVIST: 'archivist',
  SKALD: 'skald',
  CODEX: 'codex',
  EXECUTIONER: 'executioner'
} as const;

export type CouncilHouses = typeof COUNCIL_HOUSES[keyof typeof COUNCIL_HOUSES];