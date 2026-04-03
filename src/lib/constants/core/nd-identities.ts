// =====================================================
/* @/lib/constants/core/nd-identities.ts */
// NEURODIVERGENT IDENTITY OPTIONS
// =====================================================

export const ND_IDENTITY_OPTIONS = {
  AUTISTIC: 'autistic',
  ADHD: 'adhd',
  AUDHD: 'audhd',
  DYSLEXIC: 'dyslexic',
  DYSCALCULIC: 'dyscalculic',
  DYSGRAPHIC: 'dysgraphic',
  TOURETTES: 'tourettes',
  OCD: 'ocd',
  BIPOLAR: 'bipolar',
  C_PTSD: 'c_ptsd',
  OTHER: 'other',
  QUESTIONING: 'questioning',
} as const;

export const ND_IDENTITY_LABELS: Record<string, string> = {
  [ND_IDENTITY_OPTIONS.AUTISTIC]: 'Autistic',
  [ND_IDENTITY_OPTIONS.ADHD]: 'ADHD',
  [ND_IDENTITY_OPTIONS.AUDHD]: 'AuDHD (Autistic + ADHD)',
  [ND_IDENTITY_OPTIONS.DYSLEXIC]: 'Dyslexic',
  [ND_IDENTITY_OPTIONS.DYSCALCULIC]: 'Dyscalculic',
  [ND_IDENTITY_OPTIONS.DYSGRAPHIC]: 'Dysgraphic',
  [ND_IDENTITY_OPTIONS.TOURETTES]: 'Tourette Syndrome',
  [ND_IDENTITY_OPTIONS.OCD]: 'OCD',
  [ND_IDENTITY_OPTIONS.BIPOLAR]: 'Bipolar',
  [ND_IDENTITY_OPTIONS.C_PTSD]: 'C-PTSD',
  [ND_IDENTITY_OPTIONS.OTHER]: 'Other',
  [ND_IDENTITY_OPTIONS.QUESTIONING]: 'Questioning / Exploring',
};

export type NDIdentity = typeof ND_IDENTITY_OPTIONS[keyof typeof ND_IDENTITY_OPTIONS];