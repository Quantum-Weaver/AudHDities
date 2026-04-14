// =====================================================
// FILE: constants/generated/hestia-core/taxonomy_node_type.ts
// GENERATED: 2026-04-14T20:18:57.674Z
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
