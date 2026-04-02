/* @/lib/constants/domain/council/houses.ts */
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

export type CouncilHouse = typeof COUNCIL_HOUSES[keyof typeof COUNCIL_HOUSES];

export const HOUSE_LABELS: Record<CouncilHouse, string> = {
  hearth_keeper: 'Hearth-Keeper',
  chancellor: 'Chancellor',
  seer: 'Seer',
  aethelred: 'Aethelred',
  curator: 'Curator',
  archivist: 'Archivist',
  skald: 'Skald',
  codex: 'Codex',
  executioner: 'Executioner'
};

export const HOUSE_DESCRIPTIONS: Record<CouncilHouse, string> = {
  hearth_keeper: 'Safety & Accessibility',
  chancellor: 'Structure & Finance',
  seer: 'Pattern Recognition',
  aethelred: 'Bridge & Communication',
  curator: 'Curation & Preservation',
  archivist: 'Memory & History',
  skald: 'Story & Art',
  codex: 'Knowledge & Taxonomy',
  executioner: 'Boundaries & Protection'
};

export const HOUSE_COLORS: Record<CouncilHouse, string> = {
  hearth_keeper: '#DD6B20',
  chancellor: '#38A169',
  seer: '#9B59B6',
  aethelred: '#3498DB',
  curator: '#F39C12',
  archivist: '#7F8C8D',
  skald: '#E74C3C',
  codex: '#1ABC9C',
  executioner: '#2C3E50'
};