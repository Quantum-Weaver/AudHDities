// lib/constants/domain/sanctuary/sanctuary.ts - NEEDS CREATION
import { QUANTUM_COLORS } from '@/lib/constants/cosmic/colors';
import { DURATIONS } from '@/lib/constants/cosmic/motion';

export const SANCTUARY_SPACES = {
  // Physical/energetic sanctuary spaces
  QUANTUM_ENVIRONMENT: 'quantum-environment',
  EMERGENCY_SANCTUARY: 'emergency-sanctuary', 
  COMMUNITY_HEARTH: 'community-hearth',
  DIGITAL_RETREAT: 'digital-retreat',
  CREATIVE_GROVE: 'creative-grove'
} as const;

export const SANCTUARY_ENERGY_LEVELS = {
  CRITICAL: 'critical',      // Emergency/overwhelm
  RECOVERY: 'recovery',      // Healing/restoration  
  FLOW: 'flow',              // Optimal functioning
  CREATIVE: 'creative',      // Inspired creation
  COMMUNITY: 'community'     // Social connection
} as const;

export const SUPPORT_PATHWAYS = {
  IMMEDIATE_CRISIS: {
    name: 'Immediate Crisis Support',
    description: 'Emergency access to stabilization resources',
    energyLevel: SANCTUARY_ENERGY_LEVELS.CRITICAL,
    color: QUANTUM_COLORS.error,
    priority: 1
  },
  CAPACITY_BOUNDARIES: {
    name: 'Capacity Boundaries',
    description: 'Tools for managing energy and setting limits',
    energyLevel: SANCTUARY_ENERGY_LEVELS.RECOVERY, 
    color: QUANTUM_COLORS.warning,
    priority: 2
  },
  COMMUNITY_CONNECTION: {
    name: 'Community Connection',
    description: 'Access to witness economy and mutual support',
    energyLevel: SANCTUARY_ENERGY_LEVELS.COMMUNITY,
    color: QUANTUM_COLORS.success,
    priority: 3
  },
  CREATIVE_EXPRESSION: {
    name: 'Creative Expression',
    description: 'Safe spaces for artistic and technical creation',
    energyLevel: SANCTUARY_ENERGY_LEVELS.CREATIVE,
    color: QUANTUM_COLORS.info,
    priority: 4
  }
} as const;

export const EMERGENCY_CONTACTS = {
  CRISIS_HOTLINE: {
    name: 'Crisis Text Line',
    number: '741741',
    description: 'Free 24/7 crisis support via text',
    type: 'immediate-crisis' as const
  },
  DISABILITY_SUPPORT: {
    name: 'Disability Community Network',
    contact: 'community@audhdities.com',
    description: 'Neurodivergent peer support network',
    type: 'community-support' as const
  },
  MUTUAL_AID: {
    name: 'Mutual Aid Coordination',
    contact: 'mutualaid@audhdities.com', 
    description: 'Resource sharing and practical support',
    type: 'practical-support' as const
  }
} as const;

export const SANCTUARY_ANIMATIONS = {
  spaceTransition: {
    duration: DURATIONS.normal,
    easing: 'ease-in-out' as const
  },
  emergencyBeacon: {
    duration: DURATIONS.quantumPulse,
    easing: 'ease-in-out' as const,
    repeat: Infinity
  },
  communityPulse: {
    duration: DURATIONS.slow,
    easing: 'ease-out' as const
  }
} as const;

// Type exports
export type SanctuarySpace = typeof SANCTUARY_SPACES[keyof typeof SANCTUARY_SPACES];
export type EnergyLevel = typeof SANCTUARY_ENERGY_LEVELS[keyof typeof SANCTUARY_ENERGY_LEVELS];
export type SupportPathway = typeof SUPPORT_PATHWAYS[keyof typeof SUPPORT_PATHWAYS];
export type EmergencyContactType = 'immediate-crisis' | 'community-support' | 'practical-support';