// lib/constants/domain/council/rituals.ts
import { DURATIONS, EASING } from '@/lib/constants/cosmic/motion';

export const RITUAL_CONFIG = {
  DELIBERATION_DURATION: DURATIONS.slow,
  ENTITY_ACTIVATION_DELAY: 200,
  COUNCIL_SESSION_TIMEOUT: 5000,
  QUANTUM_SYNC_INTERVAL: 1000
} as const;

export const COUNCIL_STATUS = {
  AWAITING_ANALYSIS: 'awaiting_analysis',
  QUANTUM_ANALYSIS: 'quantum_analysis', 
  COUNCIL_REVIEW: 'council_review',
  PANTHEON_DELIBERATION: 'pantheon_deliberation',
  SKALD_CHRONICLING: 'skald_chronicling'
} as const;

export type CouncilStatus = typeof COUNCIL_STATUS[keyof typeof COUNCIL_STATUS];