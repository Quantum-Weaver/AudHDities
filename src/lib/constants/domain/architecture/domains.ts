// lib/constants/domains/architrcture/domains.ts
export const DOMAIN_IDS = {
  QUANTUM: 'quantum',
  COSMIC: 'cosmic', 
  PANTHEON: 'pantheon',
  BIFROST: 'bifrost',
  LIBRARY: 'library',
  VOID: 'void'
} as const;

export const DOMAIN_STATUS = {
  COMPLETE_ACTIVE: 'complete-active',
  IN_DEVELOPMENT: 'in-development', 
  PLANNED: 'planned',
  QUANTUM_ACTIVE: 'quantum-active',
  FOUNDATION_LAID: 'foundation-laid',
  THEORETICAL: 'theoretical'
} as const;

export type DomainID = typeof DOMAIN_IDS[keyof typeof DOMAIN_IDS];
export type DomainStatus = typeof DOMAIN_STATUS[keyof typeof DOMAIN_STATUS];