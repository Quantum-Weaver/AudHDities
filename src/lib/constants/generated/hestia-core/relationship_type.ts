// =====================================================
// FILE: constants/generated/hestia-core/relationship_type.ts
// GENERATED: 2026-07-31T00:35:01.963Z
// SOURCE: Constants.public.Enums.relationship_type
// VALUES: 17 entries
// =====================================================

export const RELATIONSHIP_TYPE = {
  SPOUSE: 'spouse',
  PARTNER: 'partner',
  PARENT: 'parent',
  CHILD: 'child',
  SIBLING: 'sibling',
  GRANDPARENT: 'grandparent',
  GRANDCHILD: 'grandchild',
  AUNT: 'aunt',
  UNCLE: 'uncle',
  COUSIN: 'cousin',
  FRIEND: 'friend',
  ROOMMATE: 'roommate',
  CAREGIVER: 'caregiver',
  DOCTOR: 'doctor',
  THERAPIST: 'therapist',
  SOCIAL_WORKER: 'social_worker',
  OTHER: 'other',
} as const;

export type RelationshipType = typeof RELATIONSHIP_TYPE[keyof typeof RELATIONSHIP_TYPE];
