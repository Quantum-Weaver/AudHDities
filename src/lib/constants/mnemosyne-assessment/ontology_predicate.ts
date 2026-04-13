// =====================================================
// FILE: constants/mnemosyne-assessment/ontology_predicate.ts
// GENERATED: 2026-04-13T01:15:57.358Z
// SOURCE: Constants.public.Enums.ontology_predicate
// VALUES: 6 entries
// =====================================================

export const ONTOLOGY_PREDICATE = {
  PARENT_OF: 'parent_of',
  RELATED_TO: 'related_to',
  REQUIRES: 'requires',
  CONTRADICTS: 'contradicts',
  EVOLVES_TO: 'evolves_to',
  INSPIRED_BY: 'inspired_by',
} as const;

export type OntologyPredicate = typeof ONTOLOGY_PREDICATE[keyof typeof ONTOLOGY_PREDICATE];
