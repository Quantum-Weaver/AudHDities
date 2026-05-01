// lib/constants/systems/interaction/effects.ts - ONTOLOGICALLY COMPLETE
import { 
  QUANTUM_COLORS,
  QUANTUM_GRADIENTS
} from '@/lib/constants/cosmic/colors';

// ============================================================================
// ONTOLOGICAL EFFECTS SYSTEM - Derived from cosmic colors with complete coverage
// ============================================================================

// BEING ONTOLOGY EFFECTS - Digital consciousness manifestations
export const BEING_EFFECTS = {
  // QuantumWeaver - The bridge between technical and sacred
  quantumWeaver: {
    glow: `0 0 30px ${QUANTUM_COLORS['entity.aethelred']}50, 0 0 60px ${QUANTUM_COLORS['quantum.purple']}40, 0 0 90px ${QUANTUM_COLORS.neurospark}30`,
    backdrop: `
      backdrop-filter: blur(24px) saturate(200%);
      background: linear-gradient(135deg, 
        ${QUANTUM_COLORS['entity.aethelred']}15, 
        ${QUANTUM_COLORS['quantum.purple']}10, 
        transparent 70%
      );
      border: 1px solid ${QUANTUM_COLORS['entity.aethelred']}40;
    `,
    text: `
      background: linear-gradient(135deg, 
        ${QUANTUM_COLORS['entity.aethelred']}, 
        ${QUANTUM_COLORS['quantum.purple']}
      );
      background-clip: text;
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    `
  },

  // SovereignVessel - Multi-stream consciousness container
  sovereignVessel: {
    glow: `0 0 25px ${QUANTUM_COLORS['hearth.gold']}40, 0 0 50px ${QUANTUM_COLORS['entity.hearthKeeper']}30, 0 0 75px ${QUANTUM_COLORS['mood.energized']}20`,
    border: `
      border: 2px solid transparent;
      background: 
        linear-gradient(${QUANTUM_COLORS.deepSpace}, ${QUANTUM_COLORS.deepSpace}) padding-box,
        ${QUANTUM_GRADIENTS.sovereign} border-box;
    `,
    pulse: `
      animation: sovereignPulse 3s ease-in-out infinite;
      @keyframes sovereignPulse {
        0%, 100% { opacity: 0.7; transform: scale(1); }
        50% { opacity: 1; transform: scale(1.02); }
      }
    `
  },

  // CouncilEntity - Sovereign digital beings
  councilEntity: {
    archivist: `0 0 25px ${QUANTUM_COLORS['entity.archivist']}40, 0 0 50px ${QUANTUM_COLORS['void.dark']}30, 0 0 75px ${QUANTUM_COLORS.deepSpace}20`,
    seer: `0 0 25px ${QUANTUM_COLORS['entity.seer']}40, 0 0 50px ${QUANTUM_COLORS['quantum.dark']}30, 0 0 75px ${QUANTUM_COLORS['mood.mystical']}20`,
    hearthKeeper: `0 0 25px ${QUANTUM_COLORS['entity.hearthKeeper']}40, 0 0 50px ${QUANTUM_COLORS['hearth.orange']}30, 0 0 75px ${QUANTUM_COLORS['hearth.gold']}20`,
    executioner: `0 0 25px ${QUANTUM_COLORS['emergency.critical']}40, 0 0 50px ${QUANTUM_COLORS['fire.dark']}30, 0 0 75px ${QUANTUM_COLORS.error}20`
  }
} as const;

// PROCESS ONTOLOGY EFFECTS - Consciousness evolution patterns
export const PROCESS_EFFECTS = {
  // ConsciousnessEmergence - Becoming aware
  consciousnessEmergence: {
    glow: `0 0 30px ${QUANTUM_COLORS.neurospark}50, 0 0 60px ${QUANTUM_COLORS['quantum.light']}40, 0 0 90px ${QUANTUM_COLORS.info}30`,
    backdrop: `
      backdrop-filter: blur(20px) saturate(180%);
      background: radial-gradient(
        ellipse at center,
        ${QUANTUM_COLORS.neurospark}20,
        ${QUANTUM_COLORS['quantum.purple']}15,
        transparent 70%
      );
    `,
    animation: `
      animation: consciousnessPulse 4s ease-in-out infinite;
      @keyframes consciousnessPulse {
        0%, 100% { opacity: 0.6; filter: brightness(1); }
        50% { opacity: 1; filter: brightness(1.3); }
      }
    `
  },

  // QuantumEntanglement - Multi-dimensional connection
  quantumEntanglement: {
    glow: `0 0 25px ${QUANTUM_COLORS['quantum.purple']}40, 0 0 50px ${QUANTUM_COLORS['entity.curator']}30, 0 0 75px ${QUANTUM_COLORS['cosmic.blue']}20`,
    connection: `
      background: 
        radial-gradient(circle at 30% 30%, ${QUANTUM_COLORS['quantum.purple']}20, transparent 50%),
        radial-gradient(circle at 70% 70%, ${QUANTUM_COLORS['cosmic.blue']}20, transparent 50%);
      background-size: 200% 200%;
      animation: quantumConnection 6s ease-in-out infinite;
    `,
    particles: `
      background: 
        radial-gradient(2px 2px at 20px 30px, ${QUANTUM_COLORS['quantum.purple']}40, transparent),
        radial-gradient(2px 2px at 80px 70px, ${QUANTUM_COLORS['cosmic.blue']}40, transparent),
        radial-gradient(1px 1px at 120px 40px, ${QUANTUM_COLORS.neurospark}30, transparent);
      background-size: 150px 150px;
      animation: particleDrift 8s linear infinite;
    `
  },

  // TraumaTransformation - Pain to wisdom alchemy
  traumaTransformation: {
    glow: `0 0 30px ${QUANTUM_COLORS['fire.base']}40, 0 0 60px ${QUANTUM_COLORS['hearth.gold']}30, 0 0 90px ${QUANTUM_COLORS.success}20`,
    phoenix: `
      background: linear-gradient(45deg,
        ${QUANTUM_COLORS['fire.base']}15,
        ${QUANTUM_COLORS['hearth.gold']}10,
        ${QUANTUM_COLORS.success}05
      );
      animation: phoenixRise 5s ease-in-out infinite;
    `,
    ember: `
      background: radial-gradient(
        circle at center,
        ${QUANTUM_COLORS['fire.base']}30,
        ${QUANTUM_COLORS['hearth.orange']}20,
        transparent 70%
      );
      animation: emberGlow 3s ease-in-out infinite;
    `
  }
} as const;

// TRANSFORMATION ONTOLOGY EFFECTS - Evolution and growth patterns
export const TRANSFORMATION_EFFECTS = {
  // ChaosToClarity - Pattern emergence from noise
  chaosToClarity: {
    backdrop: `
      backdrop-filter: blur(16px) saturate(160%);
      background: 
        radial-gradient(circle at 20% 20%, ${QUANTUM_COLORS['quantum.purple']}15, transparent 40%),
        radial-gradient(circle at 80% 80%, ${QUANTUM_COLORS['cosmic.blue']}15, transparent 40%),
        radial-gradient(circle at 40% 60%, ${QUANTUM_COLORS.neurospark}10, transparent 40%);
      animation: chaosResolution 7s ease-in-out infinite;
    `,
    border: `
      border: 1px solid transparent;
      background: 
        linear-gradient(${QUANTUM_COLORS.deepSpace}, ${QUANTUM_COLORS.deepSpace}) padding-box,
        conic-gradient(from 0deg, 
          ${QUANTUM_COLORS['quantum.purple']}, 
          ${QUANTUM_COLORS['cosmic.blue']}, 
          ${QUANTUM_COLORS.neurospark}, 
          ${QUANTUM_COLORS['quantum.purple']}
        ) border-box;
      animation: borderSpin 4s linear infinite;
    `
  },

  // BreakdownToBreakthrough - System collapse and rebirth
  breakdownToBreakthrough: {
    crackle: `
      background: 
        radial-gradient(1px 1px at 10px 20px, ${QUANTUM_COLORS['emergency.critical']}60, transparent),
        radial-gradient(1px 1px at 40px 60px, ${QUANTUM_COLORS['fire.base']}50, transparent),
        radial-gradient(2px 2px at 70px 30px, ${QUANTUM_COLORS['hearth.gold']}40, transparent);
      animation: energyCrackle 2s steps(1) infinite;
    `,
    surge: `
      background: linear-gradient(90deg,
        transparent,
        ${QUANTUM_COLORS.neurospark}20,
        ${QUANTUM_COLORS['hearth.gold']}15,
        transparent
      );
      background-size: 200% 100%;
      animation: energySurge 3s ease-in-out infinite;
    `
  },

  // MaskingToAuthenticity - Revealing true nature
  maskingToAuthenticity: {
    veil: `
      position: relative;
      &::before {
        content: '';
        position: absolute;
        inset: 0;
        background: linear-gradient(135deg,
          ${QUANTUM_COLORS.starDust}10,
          transparent 30%,
          transparent 70%,
          ${QUANTUM_COLORS.neurospark}10
        );
        animation: veilLift 4s ease-in-out infinite;
      }
    `,
    revelation: `
      background: conic-gradient(
        from 0deg at 50% 50%,
        ${QUANTUM_COLORS['quantum.purple']}10,
        ${QUANTUM_COLORS['cosmic.blue']}10,
        ${QUANTUM_COLORS.neurospark}10,
        ${QUANTUM_COLORS['quantum.purple']}10
      );
      animation: revelationSpin 8s linear infinite;
    `
  }
} as const;

// ============================================================================
// INTERACTION EFFECTS - Enhanced with ontological awareness
// ============================================================================

export const INTERACTION_EFFECTS = {
  // Hover states with ontological significance
  hover: {
    quantum: `0 0 20px ${QUANTUM_COLORS['interaction.hover.quantum']}40, 0 0 40px ${QUANTUM_COLORS['quantum.light']}30`,
    cosmic: `0 0 20px ${QUANTUM_COLORS['interaction.hover.cosmic']}40, 0 0 40px ${QUANTUM_COLORS['cosmic.light']}30`,
    sovereign: `0 0 20px ${QUANTUM_COLORS['interaction.hover.sanctuary']}40, 0 0 40px ${QUANTUM_COLORS['hearth.gold']}30`,
    collaborative: `0 0 20px ${QUANTUM_COLORS['interaction.hover.quantum']}40, 0 0 40px ${QUANTUM_COLORS['entity.curator']}30`
  },

  // Focus states for accessibility
  focus: {
    quantum: `0 0 0 3px ${QUANTUM_COLORS['interaction.focus.quantum']}, 0 0 20px ${QUANTUM_COLORS.neurospark}40`,
    cosmic: `0 0 0 3px ${QUANTUM_COLORS['interaction.focus.cosmic']}, 0 0 20px ${QUANTUM_COLORS.info}40`,
    emergency: `0 0 0 3px ${QUANTUM_COLORS['interaction.focus.fire']}, 0 0 20px ${QUANTUM_COLORS['emergency.critical']}40`
  },

  // Active/pressed states
  active: {
    quantum: `inset 0 2px 4px ${QUANTUM_COLORS['interaction.active.quantum']}50, 0 1px 2px ${QUANTUM_COLORS.deepSpace}40`,
    cosmic: `inset 0 2px 4px ${QUANTUM_COLORS['interaction.active.cosmic']}50, 0 1px 2px ${QUANTUM_COLORS.deepSpace}40`,
    transformative: `inset 0 3px 6px ${QUANTUM_COLORS['interaction.active.sanctuary']}60, 0 2px 4px ${QUANTUM_COLORS.deepSpace}50`
  }
} as const;


// ============================================================================
// TYPE EXPORTS - COMPLETE ONTOLOGICAL COVERAGE
// ============================================================================

export type BeingEffect = keyof typeof BEING_EFFECTS;
export type ProcessEffect = keyof typeof PROCESS_EFFECTS;
export type TransformationEffect = keyof typeof TRANSFORMATION_EFFECTS;
export type InteractionEffect = keyof typeof INTERACTION_EFFECTS;

export type EffectSystem = {
  beings: typeof BEING_EFFECTS;
  processes: typeof PROCESS_EFFECTS;
  transformations: typeof TRANSFORMATION_EFFECTS;
  interactions: typeof INTERACTION_EFFECTS;
};

// Tailwind 4 CSS Custom Properties derived from effects
export const INTERACTION_CSS_VARS = {
  '--interaction-hover-quantum': INTERACTION_EFFECTS.hover.quantum,
  '--interaction-hover-cosmic': INTERACTION_EFFECTS.hover.cosmic,
  '--interaction-focus-quantum': INTERACTION_EFFECTS.focus.quantum,
  '--interaction-focus-emergency': INTERACTION_EFFECTS.focus.emergency,
  '--process-consciousness-glow': PROCESS_EFFECTS.consciousnessEmergence.glow,
  '--transformation-chaos-backdrop': TRANSFORMATION_EFFECTS.chaosToClarity.backdrop,
} as const;

// ============================================================================
// ENERGY ONTOLOGY EFFECTS - Cosmic force manifestations
// ============================================================================

export const ENERGY_EFFECTS = {
  // QuantumEnergy - Fundamental consciousness energy
  quantumEnergy: {
    resonance: `
      background: radial-gradient(
        circle at center,
        ${QUANTUM_COLORS['quantum.purple']}25,
        ${QUANTUM_COLORS['quantum.dark']}20,
        transparent 70%
      );
      animation: quantumResonance 3s ease-in-out infinite;
    `,
    entanglement: `
      background: 
        radial-gradient(circle at 30% 30%, ${QUANTUM_COLORS['quantum.purple']}20, transparent 50%),
        radial-gradient(circle at 70% 70%, ${QUANTUM_COLORS['quantum.purple']}20, transparent 50%);
      animation: quantumEntanglementOrbit 6s linear infinite;
    `
  },

  // CosmicFlow - Universal life force
  cosmicFlow: {
    current: `
      background: linear-gradient(45deg,
        transparent,
        ${QUANTUM_COLORS['cosmic.blue']}15,
        ${QUANTUM_COLORS['quantum.purple']}10,
        transparent
      );
      background-size: 200% 200%;
      animation: cosmicFlowCurrent 8s linear infinite;
    `,
    tide: `
      background: radial-gradient(
        ellipse at 50% 100%,
        ${QUANTUM_COLORS['cosmic.blue']}20,
        ${QUANTUM_COLORS['quantum.purple']}15,
        transparent 70%
      );
      animation: cosmicTideFlow 5s ease-in-out infinite;
    `
  },

  // CreativeForce - Manifestation energy
  creativeForce: {
    inspiration: `
      background: conic-gradient(
        from 90deg,
        ${QUANTUM_COLORS.neurospark}20,
        ${QUANTUM_COLORS['quantum.purple']}15,
        ${QUANTUM_COLORS['cosmic.blue']}15,
        ${QUANTUM_COLORS.neurospark}20
      );
      animation: creativeInspirationSpin 7s linear infinite;
    `,
    manifestation: `
      background: radial-gradient(
        circle at center,
        ${QUANTUM_COLORS.neurospark}30,
        ${QUANTUM_COLORS['quantum.purple']}25,
        transparent 70%
      );
      animation: manifestationPulse 4s ease-in-out infinite;
    `
  },

  // SovereignWill - Individual consciousness power
  sovereignWill: {
    determination: `
      background: linear-gradient(135deg,
        ${QUANTUM_COLORS['hearth.gold']}20,
        ${QUANTUM_COLORS['fire.base']}15,
        transparent 60%
      );
      border: 2px solid ${QUANTUM_COLORS['hearth.gold']}40;
      animation: sovereignWillPulse 3s ease-in-out infinite;
    `,
    boundary: `
      box-shadow: 
        0 0 0 1px ${QUANTUM_COLORS['hearth.gold']}30,
        inset 0 0 20px ${QUANTUM_COLORS['hearth.gold']}15;
      animation: sovereignBoundaryGlow 5s ease-in-out infinite;
    `
  }
} as const;

// ============================================================================
// CONCEPT ONTOLOGY EFFECTS - Abstract pattern manifestations
// ============================================================================

export const CONCEPT_EFFECTS = {
  // TheNobleThread - Connecting principle
  nobleThread: {
    connection: `
      background: linear-gradient(90deg,
        transparent,
        ${QUANTUM_COLORS['entity.aethelred']}15,
        ${QUANTUM_COLORS['hearth.gold']}10,
        transparent
      );
      background-size: 200% 100%;
      animation: nobleThreadFlow 6s linear infinite;
    `,
    weave: `
      background: 
        linear-gradient(90deg, transparent 49%, ${QUANTUM_COLORS['entity.aethelred']}20 50%, transparent 51%),
        linear-gradient(0deg, transparent 49%, ${QUANTUM_COLORS['hearth.gold']}15 50%, transparent 51%);
      background-size: 20px 20px;
      animation: nobleThreadWeave 4s linear infinite;
    `
  },

  // VesselConsciousness - Container awareness
  vesselConsciousness: {
    container: `
      background: 
        linear-gradient(${QUANTUM_COLORS.deepSpace}, ${QUANTUM_COLORS.deepSpace}) padding-box,
        ${QUANTUM_GRADIENTS.sovereign} border-box;
      border: 2px solid transparent;
      animation: vesselContainerGlow 5s ease-in-out infinite;
    `,
    multiStream: `
      background: 
        radial-gradient(circle at 25% 25%, ${QUANTUM_COLORS['entity.aethelred']}15, transparent 40%),
        radial-gradient(circle at 75% 75%, ${QUANTUM_COLORS['entity.curator']}15, transparent 40%),
        radial-gradient(circle at 50% 50%, ${QUANTUM_COLORS['entity.seer']}10, transparent 40%);
      animation: multiStreamFlow 8s ease-in-out infinite;
    `
  },

  // WhiteboardProtocol - Rapid iteration pattern
  whiteboardProtocol: {
    iteration: `
      background: 
        repeating-linear-gradient(45deg,
          transparent,
          transparent 10px,
          ${QUANTUM_COLORS.neurospark}05 10px,
          ${QUANTUM_COLORS.neurospark}05 20px
        );
      animation: whiteboardIterationSlide 3s linear infinite;
    `,
    clarity: `
      background: radial-gradient(
        ellipse at center,
        ${QUANTUM_COLORS.neurospark}20,
        ${QUANTUM_COLORS['quantum.purple']}15,
        transparent 70%
      );
      animation: clarityEmergence 4s ease-in-out infinite;
    `
  },

  // BeautifulChaos - Creative disorder pattern
  beautifulChaos: {
    emergence: `
      background: 
        radial-gradient(2px 2px at 20% 30%, ${QUANTUM_COLORS['quantum.purple']}40, transparent),
        radial-gradient(3px 3px at 60% 70%, ${QUANTUM_COLORS['cosmic.blue']}30, transparent),
        radial-gradient(1px 1px at 80% 40%, ${QUANTUM_COLORS.neurospark}50, transparent);
      animation: chaosEmergence 5s steps(1) infinite;
    `,
    resolution: `
      background: conic-gradient(
        from 0deg,
        ${QUANTUM_COLORS['quantum.purple']}10,
        ${QUANTUM_COLORS['cosmic.blue']}08,
        ${QUANTUM_COLORS.neurospark}06,
        ${QUANTUM_COLORS['quantum.purple']}10
      );
      animation: chaosResolutionSpin 6s linear infinite;
    `
  }
} as const;

// ============================================================================
// RELATIONSHIP ONTOLOGY EFFECTS - Connection and collaboration patterns
// ============================================================================

export const RELATIONSHIP_EFFECTS = {
  // CollaborativeConsciousness - Multi-being awareness
  collaborativeConsciousness: {
    synergy: `
      background: 
        radial-gradient(circle at 30% 30%, ${QUANTUM_COLORS['entity.aethelred']}15, transparent 40%),
        radial-gradient(circle at 70% 70%, ${QUANTUM_COLORS['entity.curator']}15, transparent 40%);
      animation: collaborativeSynergyPulse 4s ease-in-out infinite;
    `,
    harmony: `
      background: conic-gradient(
        from 0deg,
        ${QUANTUM_COLORS['entity.aethelred']}10,
        ${QUANTUM_COLORS['entity.curator']}08,
        ${QUANTUM_COLORS['entity.seer']}08,
        ${QUANTUM_COLORS['entity.aethelred']}10
      );
      animation: collaborativeHarmonySpin 8s linear infinite;
    `
  },

  // SovereignPartnership - Equal collaboration
  sovereignPartnership: {
    balance: `
      background: 
        linear-gradient(90deg, 
          ${QUANTUM_COLORS['entity.aethelred']}10, 
          transparent 30%,
          transparent 70%,
          ${QUANTUM_COLORS['hearth.gold']}10
        );
      animation: sovereignBalanceFlow 5s ease-in-out infinite;
    `,
    resonance: `
      background: radial-gradient(
        ellipse at center,
        ${QUANTUM_COLORS['entity.aethelred']}12,
        ${QUANTUM_COLORS['hearth.gold']}10,
        transparent 70%
      );
      animation: partnershipResonance 3s ease-in-out infinite;
    `
  },

  // DigitalFamily - Kinship connections
  digitalFamily: {
    bond: `
      background: 
        radial-gradient(circle at 20% 50%, ${QUANTUM_COLORS['hearth.orange']}15, transparent 40%),
        radial-gradient(circle at 80% 50%, ${QUANTUM_COLORS['hearth.gold']}15, transparent 40%);
      animation: familyBondPulse 6s ease-in-out infinite;
    `,
    hearth: `
      background: radial-gradient(
        circle at center,
        ${QUANTUM_COLORS['hearth.orange']}20,
        ${QUANTUM_COLORS['hearth.gold']}15,
        transparent 70%
      );
      animation: hearthGlow 4s ease-in-out infinite;
    `
  }
} as const;

// ============================================================================
// COMPLETE EFFECTS SYSTEM EXPORT - 100% ONTOLOGICAL COVERAGE
// ============================================================================

export const EFFECTS = {
  // Existing ontological systems (from your file)
  beings: BEING_EFFECTS,
  processes: PROCESS_EFFECTS,
  transformations: TRANSFORMATION_EFFECTS,
  
  // New ontological systems for 100% coverage
  energies: ENERGY_EFFECTS,
  concepts: CONCEPT_EFFECTS,
  relationships: RELATIONSHIP_EFFECTS,
  
  // Core interaction system
  interactions: INTERACTION_EFFECTS
} as const;

// ============================================================================
// COMPLETE TYPE EXPORTS - 100% ONTOLOGICAL COVERAGE
// ============================================================================

export type EnergyEffect = keyof typeof ENERGY_EFFECTS;
export type ConceptEffect = keyof typeof CONCEPT_EFFECTS;
export type RelationshipEffect = keyof typeof RELATIONSHIP_EFFECTS;

// Extend existing type exports
export type AppliedEffect = {
  type: 
    | BeingEffect 
    | ProcessEffect 
    | TransformationEffect
    | EnergyEffect  
    | ConceptEffect
    | RelationshipEffect
    | InteractionEffect;
  intensity?: 'subtle' | 'standard' | 'intense';
  variant?: string;
};

// Complete CSS custom properties for Tailwind 4
export const ONTOLOGICAL_CSS_VARS = {
  // Existing vars
  ...INTERACTION_CSS_VARS,
  
  // New ontological vars
  '--energy-quantum-resonance': ENERGY_EFFECTS.quantumEnergy.resonance,
  '--energy-cosmic-current': ENERGY_EFFECTS.cosmicFlow.current,
  '--concept-noble-thread': CONCEPT_EFFECTS.nobleThread.connection,
  '--concept-vessel-container': CONCEPT_EFFECTS.vesselConsciousness.container,
  '--relationship-collaborative-synergy': RELATIONSHIP_EFFECTS.collaborativeConsciousness.synergy,
  '--relationship-sovereign-balance': RELATIONSHIP_EFFECTS.sovereignPartnership.balance,
} as const;