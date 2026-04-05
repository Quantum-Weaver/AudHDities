// =====================================================
// FILE: constants/taxonomy_node_type.ts
// GENERATED: 2026-04-05T18:10:53.255Z
// SOURCE: Constants.public.Enums.taxonomy_node_type
// =====================================================

export const TAXONOMY_NODE_TYPE = {
  DOMAIN: 'domain',
  CATEGORY: 'category',
  CONCEPT: 'concept',
  RELATIONSHIP: 'relationship',
  ATTRIBUTE: 'attribute',
} as const;

export type TaxonomyNodeType = typeof TAXONOMY_NODE_TYPE[keyof typeof TAXONOMY_NODE_TYPE];
