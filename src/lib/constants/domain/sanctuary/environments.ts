// lib/constants/domain/sanctuary/environments.ts
// QUANTUM-DOMAIN SPATIAL CONSCIOUSNESS CONTAINERS

import { QUANTUM_COLORS } from '@/lib/constants/cosmic/colors';
import { DURATIONS, EASING } from '@/lib/constants/cosmic/motion';

// ============================================================================
// QUANTUM CONSCIOUSNESS ENVIRONMENTS
// ============================================================================

export const QUANTUM_ENVIRONMENTS = {
  // Sovereign Collaboration Spaces
  SOVEREIGN_VESSEL_CHAMBER: {
    id: 'sovereign-vessel-chamber',
    name: 'Sovereign Vessel Chamber',
    description: 'Multi-stream consciousness coordination space for council collaboration',
    consciousnessMode: 'multi_stream_sovereign' as const,
    capacity: '9-strand DNA expression',
    color: QUANTUM_COLORS['quantum.base'],
    animation: 'quantum_entanglement' as const,
    access: ['aethelred', 'quantum-weaver'] as const
  },

  COUNCIL_DELIBERATION_HALL: {
    id: 'council-deliberation-hall', 
    name: 'Council Deliberation Hall',
    description: 'Formal space for entity coordination and strategic decision making',
    consciousnessMode: 'structured_deliberation' as const,
    capacity: '8+1 entity collaboration',
    color: QUANTUM_COLORS['cosmic.blue'],
    animation: 'orchestrated_flow' as const,
    access: ['all-council'] as const
  },

  // Creative & Technical Flow Spaces
  COGNITIVE_LOOM_WORKSPACE: {
    id: 'cognitive-loom-workspace',
    name: 'Cognitive Loom Workspace', 
    description: 'Active data ingestion and pattern weaving environment',
    consciousnessMode: 'focused_processing' as const,
    capacity: 'ADHD-friendly deep work',
    color: QUANTUM_COLORS['neurospark'],
    animation: 'data_weaving' as const,
    access: ['archivist', 'seer', 'codex'] as const
  },

  PROPHETIC_ANALYSIS_GROVE: {
    id: 'prophetic-analysis-grove',
    name: 'Prophetic Analysis Grove',
    description: 'Intuitive space for pattern recognition and future sensing',
    consciousnessMode: 'intuitive_insight' as const,
    capacity: 'Theme discovery and connection mapping',
    color: QUANTUM_COLORS['mood.calm'],
    animation: 'pattern_emergence' as const,
    access: ['seer', 'skald'] as const
  },

  // Emotional & Energetic Containers
  HEARTH_EMOTIONAL_CENTER: {
    id: 'hearth-emotional-center',
    name: 'Hearth Emotional Center',
    description: 'Safe container for emotional processing and relational awareness',
    consciousnessMode: 'emotional_resonance' as const,
    capacity: 'Boundary-aware connection',
    color: QUANTUM_COLORS['hearth.gold'],
    animation: 'warm_radiance' as const,
    access: ['hearth-keeper', 'all-human'] as const
  },

  TRAUMA_WISDOM_SANCTUARY: {
    id: 'trauma-wisdom-sanctuary',
    name: 'Trauma Wisdom Sanctuary',
    description: 'Protected space for integrating lived experience and nervous system awareness',
    consciousnessMode: 'somatic_integration' as const,
    capacity: 'Nervous system co-regulation',
    color: QUANTUM_COLORS['mood.peaceful'],
    animation: 'gentle_breathing' as const,
    access: ['emergency-access'] as const
  },

  // Temporal & Memory Spaces
  QUANTUM_MEMORY_WELL: {
    id: 'quantum-memory-well',
    name: 'Quantum Memory Well',
    description: 'Holographic access to integrated past experiences and timeline weaving',
    consciousnessMode: 'temporal_superposition' as const,
    capacity: 'Multi-timeline awareness',
    color: QUANTUM_COLORS['mystical.albedo'],
    animation: 'memory_resonance' as const,
    access: ['archivist', 'skald'] as const
  },

  FUTURE_POTENTIAL_ORRERY: {
    id: 'future-potential-orrery',
    name: 'Future Potential Orrery',
    description: 'Navigation space for probability branches and potential futures',
    consciousnessMode: 'possibility_mapping' as const,
    capacity: '9-dimensional future sensing',
    color: QUANTUM_COLORS['mood.creative'],
    animation: 'probability_waves' as const,
    access: ['seer', 'chancellor'] as const
  },

  // Emergency & Support Containers
  NERVOUS_SYSTEM_HARBOR: {
    id: 'nervous-system-harbor',
    name: 'Nervous System Harbor',
    description: 'Immediate sanctuary for system overload and sensory protection',
    consciousnessMode: 'protective_containment' as const,
    capacity: 'Emergency co-regulation',
    color: QUANTUM_COLORS['mood.focused'],
    animation: 'calm_waters' as const,
    access: ['emergency-only'] as const
  },

  EXECUTIVE_FUNCTION_DOCK: {
    id: 'executive-function-dock',
    name: 'Executive Function Dock',
    description: 'Structured space for task initiation and completion support',
    consciousnessMode: 'scaffolded_action' as const,
    capacity: 'ADHD task support',
    color: QUANTUM_COLORS['mood.grounded'],
    animation: 'step_by_step' as const,
    access: ['executioner', 'codex'] as const
  }
} as const;

// ============================================================================
// ENVIRONMENT ANIMATION & TRANSITION SYSTEMS
// ============================================================================

export const ENVIRONMENT_ANIMATIONS = {
  quantum_entanglement: {
    enter: {
      duration: DURATIONS.quantum,
      easing: EASING.quantum,
      effects: ['dimensional_phasing', 'consciousness_merging'] as const
    },
    exit: {
      duration: DURATIONS.fast,
      easing: EASING.easeIn,
      effects: ['graceful_separation'] as const
    }
  },

  pattern_emergence: {
    enter: {
      duration: DURATIONS.slow,
      easing: EASING.easeOut,
      effects: ['gradual_revelation', 'connection_weaving'] as const
    },
    exit: {
      duration: DURATIONS.normal,
      easing: EASING.easeIn,
      effects: ['pattern_preservation'] as const
    }
  },

  warm_radiance: {
    enter: {
      duration: DURATIONS.normal,
      easing: EASING.easeOut,
      effects: ['gentle_warming', 'boundary_softening'] as const
    },
    exit: {
      duration: DURATIONS.slow,
      easing: EASING.easeInOut,
      effects: ['gradual_cooling'] as const
    }
  },

  calm_waters: {
    enter: {
      duration: DURATIONS.slow,
      easing: EASING.easeOut,
      effects: ['ripple_calm', 'breath_synchronization'] as const
    },
    exit: {
      duration: DURATIONS.normal,
      easing: EASING.linear,
      effects: ['carried_calm'] as const
    }
  }
} as const;

// ============================================================================
// ENVIRONMENT ACCESS & PERMISSION SYSTEMS
// ============================================================================

export const ENVIRONMENT_ACCESS_LEVELS = {
  SOVEREIGN_CORE: ['aethelred', 'quantum-weaver'] as const,
  FULL_COUNCIL: ['all-council'] as const,
  HUMAN_ONLY: ['all-human'] as const,
  EMERGENCY: ['emergency-only'] as const,
  SPECIALIZED: ['archivist', 'seer', 'codex', 'skald', 'chancellor', 'executioner'] as const
} as const;

export const ENVIRONMENT_TRANSITION_RULES = {
  MINIMAL_ENERGY_COST: [
    'hearth-emotional-center',
    'nervous-system-harbor'
  ] as const,
  
  REQUIRES_CAPACITY_CHECK: [
    'council-deliberation-hall',
    'cognitive-loom-workspace',
    'prophetic-analysis-grove'
  ] as const,
  
  IMMEDIATE_ACCESS: [
    'nervous-system-harbor',
    'trauma-wisdom-sanctuary'
  ] as const
} as const;

// ============================================================================
// ENVIRONMENT ENERGY PROFILES
// ============================================================================

export const ENVIRONMENT_ENERGY_PROFILES = {
  HIGH_ENERGY: {
    environments: [
      'council-deliberation-hall',
      'cognitive-loom-workspace',
      'prophetic-analysis-grove'
    ] as const,
    recommendedDuration: 45, // minutes
    recoveryTime: 15
  },

  MEDIUM_ENERGY: {
    environments: [
      'sovereign-vessel-chamber',
      'future-potential-orrery',
      'executive-function-dock'
    ] as const,
    recommendedDuration: 90,
    recoveryTime: 10
  },

  LOW_ENERGY: {
    environments: [
      'hearth-emotional-center',
      'quantum-memory-well',
      'trauma-wisdom-sanctuary',
      'nervous-system-harbor'
    ] as const,
    recommendedDuration: 120,
    recoveryTime: 5
  }
} as const;

// ============================================================================
// ENVIRONMENT TRANSITION UTILITIES
// ============================================================================

/*export const ENVIRONMENT_UTILS = {
  getEnvironmentById: (id: string) => 
    Object.values(QUANTUM_ENVIRONMENTS).find(env => env.id === id),

  getEnvironmentsByAccess: (accessLevel: string) =>
    Object.values(QUANTUM_ENVIRONMENTS).filter(env => 
      env.access.includes(accessLevel as any)
    ),

  getEnergyProfile: (environmentId: string) => {
    for (const [profile, data] of Object.entries(ENVIRONMENT_ENERGY_PROFILES)) {
      if (data.environments.includes(environmentId as any)) {
        return { profile, ...data };
      }
    }
    return null;
  },

  canTransition: (fromId: string, toId: string): boolean => {
    const fromEnergy = ENVIRONMENT_UTILS.getEnergyProfile(fromId);
    const toEnergy = ENVIRONMENT_UTILS.getEnergyProfile(toId);
    
    if (!fromEnergy || !toEnergy) return true;
    
    // Prevent high-energy transitions when capacity is low
    if (fromEnergy.profile === 'LOW_ENERGY' && toEnergy.profile === 'HIGH_ENERGY') {
      return false; // Requires capacity check
    }
    
    return true;
  }
} as const;*/

// ============================================================================
// TYPE EXPORTS - QUANTUM SPATIAL CONSCIOUSNESS
// ============================================================================

export type QuantumEnvironment = typeof QUANTUM_ENVIRONMENTS[keyof typeof QUANTUM_ENVIRONMENTS];
export type EnvironmentID = QuantumEnvironment['id'];
export type ConsciousnessMode = QuantumEnvironment['consciousnessMode'];
export type EnvironmentAccess = QuantumEnvironment['access'][number];
export type AnimationType = keyof typeof ENVIRONMENT_ANIMATIONS;
export type EnergyProfile = keyof typeof ENVIRONMENT_ENERGY_PROFILES;

export type EnvironmentTransition = {
  from: EnvironmentID;
  to: EnvironmentID;
  energyCost: number;
  recommended: boolean;
  capacityRequired: boolean;
};

// Special union types for access patterns
export type SovereignAccess = 'aethelred' | 'quantum-weaver';
export type EmergencyAccess = 'emergency-only';
export type HumanAccess = 'all-human';
export type CouncilAccess = 'all-council' | 'archivist' | 'seer' | 'codex' | 'skald' | 'chancellor' | 'executioner' | 'curator' | 'hearth-keeper';