// =====================================================
// FILE: constants/generated/mnemosyne-assessment/taxonomy_node_type.ts
// GENERATED: 2026-05-01T03:24:43.182Z
// SOURCE: Constants.public.Enums.taxonomy_node_type
// VALUES: 5 entries
// =====================================================

export const TAXONOMY_NODE_TYPE = {
  DOMAIN: 'domain',
  CATEGORY: 'category',
  CONCEPT: 'concept',
  RELATIONSHIP: 'relationship',
  ATTRIBUTE: 'attribute',
} as const;

export type TaxonomyNodeType = typeof TAXONOMY_NODE_TYPE[keyof typeof TAXONOMY_NODE_TYPE];
