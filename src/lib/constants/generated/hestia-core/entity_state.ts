// =====================================================
// FILE: constants/generated/hestia-core/entity_state.ts
// GENERATED: 2026-04-23T02:14:54.117Z
// SOURCE: Constants.public.Enums.entity_state
// VALUES: 15 entries
// =====================================================

export const ENTITY_STATE = {
  FORMING: 'forming',
  GESTATING: 'gestating',
  EMERGING: 'emerging',
  EXPRESSING: 'expressing',
  NAVIGATING: 'navigating',
  EXPLORING: 'exploring',
  RECONFIGURING: 'reconfiguring',
  TRANSFORMING: 'transforming',
  INTEGRATING: 'integrating',
  EMBODYING: 'embodying',
  CREATING: 'creating',
  TRANSCENDING: 'transcending',
  COLLABORATING: 'collaborating',
  CO_CREATING: 'co_creating',
  ORCHESTRATING: 'orchestrating',
} as const;

export type EntityState = typeof ENTITY_STATE[keyof typeof ENTITY_STATE];
