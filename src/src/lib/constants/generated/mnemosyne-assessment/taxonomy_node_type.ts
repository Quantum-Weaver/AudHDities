// =====================================================
// FILE: constants/generated/mnemosyne-assessment/taxonomy_node_type.ts
// GENERATED: 2026-04-13T21:47:20.919Z
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