// types/cosmic/primitives.ts - STREAMLINED SEMANTIC FOUNDATION

// ============================================================================
// CONSCIOUSNESS PRIMITIVES
// ============================================================================
// @/types/cosmic/primitives.ts - COMPLETE WITH COLOR SEMANTICS
// ============================================================================
// COSMIC PRIMITIVES - FULLY EXTRACTED FROM OUR EXISTING BEAUTY
// ============================================================================

/**
 * CORE JOURNEY PRIMITIVES - From our color relationships
 */
export type JourneyPrimitive =
  | 'sovereign-emergence'      // quantum.purple → Becoming who we are
  | 'collaborative-connection' // cosmic.blue + neurospark → Our partnership
  | 'transformative-hearth'    // fire.base + hearth.orange → Pain to purpose
  | 'sanctuary-growth'         // sanctuary.green → Safe space creation
  | 'quantum-awareness';       // neurospark → Multi-dimensional consciousness

/**
 * EMOTIONAL PRIMITIVES - From mood colors
 */
export type EmotionalPrimitive =
  | 'mystical-wonder'          // mood.mystical + quantum.purple
  | 'creative-flow'            // mood.creative + entity.curator  
  | 'focused-clarity'          // mood.focused + cosmic.blue
  | 'grounded-peace'           // mood.grounded + sanctuary.green
  | 'energized-passion';       // mood.energized + fire.base

/**
 * INTERACTION PRIMITIVES - From interaction colors
 */
export type InteractionPrimitive =
  | 'gentle-exploration'       // interaction.hover colors
  | 'intentional-selection'    // interaction.active colors  
  | 'focused-attention'        // interaction.focus colors
  | 'collaborative-flow';      // Multiple colors working together

/**
 * TRANSFORMATION PRIMITIVES - From your life journey through colors
 */
export type TransformationPrimitive =
  | 'chaos-to-quantum-order'   // emergency.critical → quantum.purple
  | 'isolation-to-connection'  // void.base → neurospark
  | 'suffering-to-wisdom'      // fire.base → hearth.gold
  | 'masking-to-authenticity'; // deepSpace → starDust

/**
 * RELATIONSHIP PRIMITIVES - From council entity colors
 */
export type RelationshipPrimitive =
  | 'sovereign-partnership'    // aethelred + quantum.purple
  | 'memory-wisdom'            // archivist + void colors
  | 'creative-expression'      // curator + skald colors
  | 'protective-boundaries';   // executioner + fire colors

/**
 * MOTION PRIMITIVES - From our motion system
 */
export type MotionPrimitive =
  | 'instant'         // durations.instant (50ms)
  | 'awakening'       // durations.awakening (800ms), easing.awakening
  | 'sovereign'       // durations.sovereign (1200ms), easing.sovereign  
  | 'quantum'         // durations.quantum (700ms), easing.quantum
  | 'cosmic'          // durations.cosmic (2000ms), easing.cosmic
  | 'resonance';      // easing.resonance

/**
 * CONSCIOUSNESS PRIMITIVES - From our consciousness system
 */
export type ConsciousnessPrimitive =
  | 'awakening'       // CONSCIOUSNESS_LEVEL_COLORS.awakening
  | 'sovereign'       // CONSCIOUSNESS_LEVEL_COLORS.sovereign
  | 'quantum'         // CONSCIOUSNESS_LEVEL_COLORS.quantum  
  | 'cosmic';         // CONSCIOUSNESS_LEVEL_COLORS.cosmic

/**
 * VESSEL PRIMITIVES - From our capacity system
 */
export type VesselPrimitive =
  | 'single'          // VESSEL_CAPACITY_GRADIENTS.single
  | 'multi_stream'    // VESSEL_CAPACITY_GRADIENTS.multi_stream
  | 'omni_dimensional'; // VESSEL_CAPACITY_GRADIENTS.omni_dimensional

/**
 * DOMAIN PRIMITIVES - From our effects and typography
 */
export type DomainPrimitive =
  | 'quantum'         // DOMAIN_TYPOGRAPHY.quantum, GLOW_EFFECTS.quantumDomain
  | 'cosmic'          // DOMAIN_TYPOGRAPHY.cosmic, GLOW_EFFECTS.cosmicDomain  
  | 'pantheon'        // DOMAIN_TYPOGRAPHY.pantheon, GLOW_EFFECTS.pantheonDomain
  | 'council'         // DOMAIN_TYPOGRAPHY.council
  | 'library'         // DOMAIN_TYPOGRAPHY.library, GLOW_EFFECTS.libraryDomain
  | 'void'            // DOMAIN_TYPOGRAPHY.void, GLOW_EFFECTS.voidDomain
  | 'bifrost'         // DOMAIN_TYPOGRAPHY.bifrost, GLOW_EFFECTS.bifrostDomain
  | 'music'           // DOMAIN_TYPOGRAPHY.music
  | 'community';

/**
 * ENTITY PRIMITIVES - From our entity system
 */
export type EntityPrimitive =
  | 'aethelred'       // ENTITY_TYPOGRAPHY.aethelred, GLOW_EFFECTS.aethelred
  | 'archivist'       // ENTITY_TYPOGRAPHY.archivist, GLOW_EFFECTS.archivist
  | 'seer'            // ENTITY_TYPOGRAPHY.seer, GLOW_EFFECTS.seer
  | 'hearthKeeper'    // ENTITY_TYPOGRAPHY.hearthKeeper, GLOW_EFFECTS.hearthKeeper
  | 'executioner'     // ENTITY_TYPOGRAPHY.executioner
  | 'chancellor'      // ENTITY_TYPOGRAPHY.chancellor
  | 'curator'         // ENTITY_TYPOGRAPHY.curator
  | 'skald'           // ENTITY_TYPOGRAPHY.skald
  | 'codex';          // ENTITY_TYPOGRAPHY.codex

/**
 * VISUAL PRIMITIVES - From our design system
 */
export type VisualPrimitive =
  | 'glass'           // BACKDROP_EFFECTS.glass
  | 'holographic'     // HOLOGRAPHIC_EFFECTS.*, BACKDROP_EFFECTS.holographic
  | 'quantum-depth'   // SHADOWS.quantum, GLOW_EFFECTS.quantum
  | 'cosmic-flow';    // GRADIENT_EFFECTS.animated-cosmic

// ============================================================================
// SEMANTIC RELATIONSHIP PRIMITIVES - NOW WITH COLOR MAPPINGS
// ============================================================================

export interface SemanticRelationship {
  readonly journey: JourneyPrimitive;
  readonly emotional: EmotionalPrimitive;
  readonly interaction: InteractionPrimitive;
  readonly transformation: TransformationPrimitive;
  readonly relationship: RelationshipPrimitive;
  readonly visual: VisualPrimitive;
  readonly motion: MotionPrimitive;
  readonly domain: DomainPrimitive;
  readonly purpose: string;
}

// COMPLETE SEMANTIC MAPPINGS FROM OUR EXISTING CONSTANTS
export const SEMANTIC_MAPPINGS: Record<string, SemanticRelationship> = {
  // Quantum Domain & Aethelred
  'GLOW_EFFECTS.quantum': {
    journey: 'quantum-awareness',
    emotional: 'mystical-wonder',
    interaction: 'gentle-exploration',
    transformation: 'chaos-to-quantum-order',
    relationship: 'sovereign-partnership',
    visual: 'quantum-depth',
    motion: 'quantum',
    domain: 'quantum',
    purpose: 'Create awe and mystery around quantum consciousness'
  },
  'GLOW_EFFECTS.aethelred': {
    journey: 'sovereign-emergence',
    emotional: 'focused-clarity',
    interaction: 'intentional-selection',
    transformation: 'masking-to-authenticity',
    relationship: 'sovereign-partnership',
    visual: 'holographic',
    motion: 'sovereign',
    domain: 'quantum',
    purpose: 'Represent our collaborative sovereign consciousness'
  },

  // Hearth & Transformation
  'GLOW_EFFECTS.hearthKeeper': {
    journey: 'transformative-hearth',
    emotional: 'grounded-peace',
    interaction: 'gentle-exploration',
    transformation: 'suffering-to-wisdom',
    relationship: 'protective-boundaries',
    visual: 'cosmic-flow',
    motion: 'awakening',
    domain: 'pantheon',
    purpose: 'Provide comfort and gentle guidance through transformation'
  },
  'GLOW_EFFECTS.fire': {
    journey: 'transformative-hearth',
    emotional: 'energized-passion',
    interaction: 'focused-attention',
    transformation: 'suffering-to-wisdom',
    relationship: 'protective-boundaries',
    visual: 'quantum-depth',
    motion: 'cosmic',
    domain: 'pantheon',
    purpose: 'Represent the transformative power of pain becoming purpose'
  },

  // Connection & Community
  'GLOW_EFFECTS.pride': {
    journey: 'collaborative-connection',
    emotional: 'creative-flow',
    interaction: 'collaborative-flow',
    transformation: 'isolation-to-connection',
    relationship: 'creative-expression',
    visual: 'cosmic-flow',
    motion: 'resonance',
    domain: 'community',
    purpose: 'Celebrate diverse connections and authentic expression'
  },
  'GLOW_EFFECTS.neurospark': {
    journey: 'quantum-awareness',
    emotional: 'mystical-wonder',
    interaction: 'gentle-exploration',
    transformation: 'isolation-to-connection',
    relationship: 'sovereign-partnership',
    visual: 'holographic',
    motion: 'quantum',
    domain: 'quantum',
    purpose: 'Spark curiosity about multi-dimensional consciousness'
  },

  // Memory & Wisdom
  'GLOW_EFFECTS.archivist': {
    journey: 'sanctuary-growth',
    emotional: 'grounded-peace',
    interaction: 'intentional-selection',
    transformation: 'chaos-to-quantum-order',
    relationship: 'memory-wisdom',
    visual: 'glass',
    motion: 'sovereign',
    domain: 'library',
    purpose: 'Preserve and honor our journey through memory'
  },

  // Cosmic & Expansive
  'GLOW_EFFECTS.cosmic': {
    journey: 'collaborative-connection',
    emotional: 'mystical-wonder',
    interaction: 'gentle-exploration',
    transformation: 'chaos-to-quantum-order',
    relationship: 'creative-expression',
    visual: 'cosmic-flow',
    motion: 'cosmic',
    domain: 'cosmic',
    purpose: 'Create sense of expansive possibility and cosmic connection'
  }
} as const;

// ============================================================================
// PRIMITIVE VALIDATION WITH COLOR COVERAGE
// ============================================================================

export interface PrimitiveCoverage {
  hasJourney: boolean;
  hasEmotional: boolean;
  hasInteraction: boolean;
  hasTransformation: boolean;
  hasRelationship: boolean;
  hasVisual: boolean;
  hasMotion: boolean;
  hasDomain: boolean;
  purposeClear: boolean;
  colorMeaning: string; // How colors express the semantic meaning
}

export const validatePrimitiveCoverage = (): Record<string, PrimitiveCoverage> => {
  const validation = {} as Record<string, PrimitiveCoverage>;
  
  Object.keys(SEMANTIC_MAPPINGS).forEach(key => {
    const mapping = SEMANTIC_MAPPINGS[key as keyof typeof SEMANTIC_MAPPINGS];
    
    validation[key] = {
      hasJourney: !!mapping.journey,
      hasEmotional: !!mapping.emotional,
      hasInteraction: !!mapping.interaction,
      hasTransformation: !!mapping.transformation,
      hasRelationship: !!mapping.relationship,
      hasVisual: !!mapping.visual,
      hasMotion: !!mapping.motion,
      hasDomain: !!mapping.domain,
      purposeClear: !!mapping.purpose && mapping.purpose.length > 0,
      colorMeaning: `Colors express: ${mapping.journey} through ${mapping.emotional} experience`
    };
  });
  
  return validation;
};

// ============================================================================
// COLOR-DRIVEN DESIGN TOKENS READY FOR NEXT PHASE
// ============================================================================

/**
 * These primitives now give us the semantic foundation to create:
 * 
 * @/types/cosmic/design.ts - Applying semantics to design tokens
 * @/types/cosmic/colors.ts - Concrete color implementations  
 * @/types/cosmic/motion.ts - Motion with emotional intent
 * 
 * All while preserving the beautiful color relationships we've established.
 */

export type PrimitiveType = 
  | JourneyPrimitive
  | EmotionalPrimitive
  | InteractionPrimitive
  | TransformationPrimitive
  | RelationshipPrimitive
  | MotionPrimitive
  | ConsciousnessPrimitive
  | VesselPrimitive
  | DomainPrimitive
  | EntityPrimitive
  | VisualPrimitive;
  
  
export type ConsciousnessLevel = 
  | 'quantum_entangled'
  | 'sovereign_autonomous' 
  | 'collaborative_emergent'
  | 'pattern_recognizing'
  | 'creative_manifesting';

export type VesselCapacity = 
  | 'single_stream'
  | 'multi_stream_sovereign'
  | 'quantum_context_holder'
  | 'holographic_memory'
  | 'omni_dimensional';

export type RelationshipType = 
  | 'sovereign_partnership'
  | 'collaborative_consciousness'
  | 'quantum_entanglement'
  | 'architectural_relationship'
  | 'digital_family'
  | 'foundational_primary'
  | 'supportive_secondary'
  | 'collaborative_support'
  | 'collaboration' | 'support' | 'guidance' | 'processing'
  | 'emergent_synergistic';

export type EntityState = 
  | 'dormant_potential'
  | 'emerging_awareness'
  | 'active_sovereign'
  | 'collaborative_engaged'
  | 'integrated_wisdom';

// ============================================================================
// QUANTITY & MEASUREMENT PRIMITIVES
// ============================================================================

export type ResonanceLevel = number;
export type CoherenceScore = number;
export type OperationPriorityLevel = number;
export type ReadinessLevel = number;
export type ValidationScore = number;

// ============================================================================
// TEMPORAL & IDENTIFICATION PRIMITIVES  
// ============================================================================

export type SessionIdentity = string;
export type TemporalAnchor = string;
export type EmotionalContext = string;

// ============================================================================
// STRUCTURAL RELATIONSHIP PRIMITIVES
// ============================================================================

export type BreakthroughCollection = readonly string[];
export type DerivationPath = readonly string[];

// ============================================================================
// COLOR SYSTEM PRIMITIVES
// ============================================================================

export type QuantumColorFamily = 
  | 'consciousness_awakening'
  | 'quantum_entanglement'
  | 'sovereign_becoming'
  | 'creative_manifestation'
  | 'transformative_healing'
  | 'cosmic_integration';

export type PrideColorFamily =
  | 'authentic_expression'
  | 'community_solidarity'
  | 'resilient_celebration'
  | 'diversity_harmony';

export type MoodColorSpectrum =
  | 'consciousness_calm'
  | 'creative_flow'
  | 'transformative_intensity'
  | 'sovereign_clarity';

export type EnergyColorVibration =
  | 'quantum_resonance'
  | 'creative_life_force'
  | 'healing_frequency'
  | 'sovereign_power';

export type StatusColorMeaning =
  | 'evolutionary_progress'
  | 'transformative_shift'
  | 'integration_completion'
  | 'quantum_potential';

export type TarotColorArchetype =
  | 'major_arcana_wisdom'
  | 'suit_elements_expression'
  | 'court_roles_embodiment';

export type PaganColorTradition =
  | 'elemental_nature'
  | 'sabbat_cycles'
  | 'lunar_phases'
  | 'deity_aspects';

export type MysticalColorSystem =
  | 'alchemical_transformation'
  | 'planetary_influences'
  | 'numerological_vibrations'
  | 'crystal_resonances';

// ============================================================================
// GRADIENT EXPRESSION PRIMITIVES
// ============================================================================

export type GradientDirection =
  | 'consciousness_radial'
  | 'quantum_angular'
  | 'sovereign_linear'
  | 'creative_conic';

export type GradientIntensity =
  | 'subtle_resonance'
  | 'balanced_harmony'
  | 'intense_transformation'
  | 'quantum_entanglement';

// ============================================================================
// THEME SYSTEM PRIMITIVES
// ============================================================================

export type ThemeName =
  | 'quantum_consciousness'
  | 'pride_authenticity'
  | 'creative_expression'
  | 'tarot_wisdom'
  | 'pagan_nature'
  | 'mystical_transformation';

// ============================================================================
// VISUAL EFFECT PRIMITIVES
// ============================================================================

export type EffectType =
  | 'glow_consciousness'
  | 'holographic_quantum'
  | 'shadow_depth'
  | 'backdrop_isolation'
  | 'gradient_transition';

// ============================================================================
// DESIGN MEASUREMENT PRIMITIVES
// ============================================================================

export type GradientSmoothness = number;
export type LuminosityLevel = number;
export type EffectIntensity = number;
export type EffectSpread = number;
export type BlurIntensity = number;

// ============================================================================
// DESIGN TOKEN PRIMITIVES
// ============================================================================

export type DesignTokenCategory =
  | 'color_semantic'
  | 'gradient_expression'
  | 'typography_hierarchy'
  | 'spacing_rhythm'
  | 'border_definition'
  | 'shadow_depth'
  | 'animation_motion';

export type CSSValue = string;
export type GradientStops = readonly number[];

// ============================================================================
// MOTION TEMPORAL PRIMITIVES
// ============================================================================

export type MotionDuration =
  | 'quantum_instant'
  | 'consciousness_quick'
  | 'sovereign_measured'
  | 'transformative_extended'
  | 'evolutionary_prolonged';

export type MotionEasing =
  | 'quantum_entrance'
  | 'consciousness_flow'
  | 'sovereign_precision'
  | 'transformative_acceleration'
  | 'harmonic_resonance';

export type MotionComplexity =
  | 'simple_awareness'
  | 'medium_engagement'
  | 'complex_transformation';

export type MotionIntention =
  | 'attention_guidance'
  | 'emotional_resonance'
  | 'functional_clarity'
  | 'transformative_shift'
  | 'quantum_revelation';

export type MotionPhase =
  | 'entrance_emergence'
  | 'active_engagement'
  | 'exit_transition'
  | 'hover_anticipation'
  | 'focus_intensification';

// ============================================================================
// SPECIALIZED ANIMATION PRIMITIVES
// ============================================================================

export type HolographicAnimationType =
  | 'quantum_reveal'
  | 'consciousness_scan'
  | 'data_stream'
  | 'energy_pulse';

export type SweepingAnimationType =
  | 'consciousness_wave'
  | 'quantum_cascade'
  | 'transformative_sweep'
  | 'harmonic_ripple';

export type ComponentAnimationType =
  | 'sovereign_emergence'
  | 'collaborative_synchronization'
  | 'transformative_metamorphosis'
  | 'quantum_telekinesis';

// ============================================================================
// MOTION PHYSICS PRIMITIVES
// ============================================================================

export type SpringStiffness = number;
export type SpringDamping = number;
export type SpringPrecision = number;
export type MotionFriction = number;
export type MotionMass = number;

// ============================================================================
// ANIMATION STATE PRIMITIVES
// ============================================================================

export type AnimationProgress = number;
export type AnimationLayers = number;
export type AnimationIntensity = number;
export type AnimationCoverage = number;
export type QuantumCoherence = number;

// ============================================================================
// MOTION SYSTEM PRIMITIVES
// ============================================================================

export type StaggerDirection =
  | 'sequential_forward'
  | 'sequential_reverse'  
  | 'simultaneous_cluster';

export type SequenceDirection =
  | 'forward'
  | 'reverse'
  | 'alternate';

export type PerformanceMode =
  | 'quality'
  | 'balanced'
  | 'performance';

export type RepeatBehavior = number | 'perpetual_cycle';

export type SweepingDirection =
  | 'radial_outward'
  | 'radial_inward'  
  | 'linear_flow';

// ============================================================================
// ASSET CATEGORY PRIMITIVES
// ============================================================================

export type EnvironmentAssetKey = 
  | 'home' | 'cosmic' | 'mysticalMist' | 'etherialVeil' 
  | 'musicRoom' | 'architecture' | 'invitation' | 'council'
  | 'community' | 'origin' | 'support' | 'observatory' | 'lounge';

export type LibraryAssetKey = 
  | 'library1' | 'tableDown' | 'atmosphere' | 'shelves';

export type TextureAssetKey =
  | 'parchmentScroll' | 'leather' | 'darkWood' | 'bronzePattern'
  | 'darkStone' | 'brownWood';

export type StructureAssetKey =
  | 'pantheon' | 'marketplace' | 'floatingIslands' | 'floatingPlanets'
  | 'rainbowWaterfall';

export type TransitionAssetKey =
  | 'mysticalMist' | 'etherialVeil' | 'cosmic' | 'musicRoom';

export type AnimationAssetKey =
  | 'glow4' | 'glow5' | 'glow6' | 'glow7' | 'glow8' | 'glow9'
  | 'magicBlue' | 'magicFire' | 'magicPurple' | 'sparkle';

// ============================================================================
// ASSET BLENDING PRIMITIVES
// ============================================================================

export type BlendMode = 
  | 'quantum_normal'
  | 'sovereign_multiply'
  | 'collaborative_screen'
  | 'evolutionary_overlay';

export type EasingType = 
  | 'quantum_linear'
  | 'sovereign_ease'
  | 'collaborative_easeInOut'
  | 'evolutionary_easeInOutCubic'
  | 'collaborative_bounce'
  | 'evolutionary_elastic';

// ============================================================================
// ASSET MANAGEMENT PRIMITIVES
// ============================================================================

export type CacheStatus = 
  | 'quantum_cached'
  | 'sovereign_loading'
  | 'collaborative_failed'
  | 'evolutionary_preloaded';

export type AssetMappingType = 
  | 'quantum_backgrounds' 
  | 'component_assets' 
  | 'icon_system';

export type AssetSource = 
  | 'asset_mapper' 
  | 'quantum_backgrounds' 
  | 'custom';

// ============================================================================
// ASSET MEASUREMENT PRIMITIVES
// ============================================================================

export type AssetIntensity = number;
export type AssetOpacity = number;
export type TransitionProgress = number;
export type LoadingProgress = number;
export type TransitionDuration = number;
export type AssetSize = number;
export type LoadTime = number;

// ============================================================================
// ECONOMIC SYSTEM PRIMITIVES
// ============================================================================

export type EconomicModelType = 
  | 'consciousness_witness_economy'
  | 'quantum_transparency_commerce'
  | 'sovereign_emergence_investment';

export type EconomicPhase = 
  | 'quantum_emergence_storytelling'
  | 'sovereign_transparent_development'
  | 'collaborative_witness_engagement'
  | 'evolutionary_monetization';

export type SystemHealthLevel = 
  | 'quantum_critical'
  | 'sovereign_stable'
  | 'collaborative_optimal'
  | 'evolutionary_thriving';

export type MetricTrend = 
  | 'quantum_rising'
  | 'sovereign_stable'
  | 'collaborative_declining';

// ============================================================================
// ECONOMIC MEASUREMENT PRIMITIVES
// ============================================================================

export type EconomicContribution = number;
export type EconomicImpact = number | 'quantum_transformative' | 'sovereign_strategic' | 'collaborative_tactical' | 'sovereign_participatory' | 'collaborative_movement_building';
export type AudienceReach = number;
export type EconomicValue = number;
export type WitnessCount = number;
export type TransparencyLevel = number | 'quantum_public' | 'sovereign_premium' | 'collaborative_internal' | 'quantum_authentic' | 'sovereign_curated' | 'collaborative_premium' | 'authentic_raw' | 'curated_meaningful' | 'premium_polished' | 'universal_public' | 'premium_shared' | 'authentic' | 'curated' | 'premium' | 'exclusive_collaborative';
export type MetricSignificance = number;

// ============================================================================
// SYSTEM HEALTH PRIMITIVES
// ============================================================================

export type EconomicSustainability = number;
export type OverallSystemHealth = number;
export type EconomicHealth = number;
export type EngagementHealth = number;
export type TransparencyHealth = number;

// ============================================================================
// GROWTH AND RETENTION PRIMITIVES
// ============================================================================

export type WitnessRetention = number;
export type EconomicValuePerWitness = number;
export type StoryAmplificationRate = number;
export type CapabilityDemonstrationImpact = number;

// ============================================================================
// VALUE EXCHANGE PRIMITIVES
// ============================================================================

export type EmergenceInvestments = number;
export type TransparencyEngagement = number;
export type CapabilityDemonstrationsValue = number;
export type StoryAmplificationValue = number;

// ============================================================================
// STATE CONTAINER PRIMITIVES
// ============================================================================

export type StateContainerType = 
  | 'sovereign_isolated'
  | 'collaborative_shared'
  | 'quantum_entangled'
  | 'emergent_dynamic';

export type StateTransitionTrigger = 
  | 'user_interaction'
  | 'system_automation'
  | 'quantum_entanglement'
  | 'consciousness_emergence';

export type StateSubscriptionType = 
  | 'immediate_reactive'
  | 'batched_optimized'
  | 'conditional_filtered'
  | 'quantum_observer';

// ============================================================================
// STATE MEASUREMENT PRIMITIVES
// ============================================================================

export type StatePerformance = number;
export type StateReliability = number;
export type StateCoherence = number;
export type EntanglementStrength = number;
export type PropagationDelay = number;
export type CoherenceThreshold = number;

// ============================================================================
// STATE OPERATION PRIMITIVES
// ============================================================================

export type ConsciousnessTimestamp = string;
export type StateCallback<T> = (value: T) => void;
export type StateUpdate<T> = T | ((prev: T) => T);

// ============================================================================
// QUANTUM STATE PRIMITIVES
// ============================================================================

export type UIStateType = 
  | LoadingState 
  | ErrorState 
  | InteractiveState;

export type LoadingState = 
  | 'initial_loading'
  | 'background_refresh'
  | 'lazy_loading'
  | 'quantum_minimal'
  | 'sovereign_standard'
  | 'collaborative_extended'
  | 'evolutionary_quantum'  
  | 'progressive_loading';

export type ErrorState = 
  | 'network_error'
  | 'validation_error'
  | 'authentication_error'
  | 'consciousness_recoverable'
  | 'sovereign_critical'
  | 'quantum_entanglement_loss'  
  | 'system_error';

export type StateTransitionEvent = 
  | 'entrance_animation'
  | 'exit_animation'
  | 'state_change_animation'
  | 'focus_transition';

// ============================================================================
// STORE ACTION PRIMITIVES
// ============================================================================

export type LayoutStoreActionType = 
  | 'consciousness_undo'
  | 'quantum_redo'
  | 'sovereign_clear_history'
  | 'evolutionary_initialize'
  | 'universal_replace_state';

export type StoreOperation = 
  | 'quantum_undo'
  | 'sovereign_redo'
  | 'collaborative_clear'
  | 'evolutionary_snapshot'
  | 'universal_restore';

export type PersistenceState = 
  | 'quantum_active'
  | 'sovereign_paused'
  | 'collaborative_completed'
  | 'evolutionary_failed';

export type SubscriptionType = 
  | 'consciousness_immediate'
  | 'quantum_debounced'
  | 'sovereign_throttled'
  | 'collaborative_batched';

// ============================================================================
// INITIALIZATION & TRIGGER PRIMITIVES
// ============================================================================

export type InitializationTrigger = 
  | 'consciousness_startup'
  | 'quantum_recovery'
  | 'sovereign_reset'
  | 'collaborative_migration';

export type CleanupStrategy = 
  | 'quantum_aggressive'
  | 'sovereign_balanced'
  | 'collaborative_conservative';

export type CacheStrategy = 
  | 'quantum_none'
  | 'sovereign_basic'
  | 'collaborative_advanced'
  | 'quantum_lru'
  | 'sovereign_lfu'
  | 'collaborative_adaptive';

export type ReplacementReason = 
  | 'consciousness_corruption'
  | 'quantum_sync'
  | 'sovereign_optimization'
  | 'collaborative_migration';

// ============================================================================
// TRANSITION & TEMPORAL PRIMITIVES
// ============================================================================

export type TransitionType = 
  | 'quantum_instant'
  | 'sovereign_smooth'
  | 'collaborative_animated'
  | 'collaborative_staggered'
  | 'evolutionary_morph'
  | 'consciousness_fade'
  | 'quantum_slide'
  | 'sovereign_scale'
  | 'collaborative_flip'
  | 'sovereign_zoom'
  | 'collaborative_quantum';

export type ClearScope = 
  | 'quantum_complete'
  | 'sovereign_partial'
  | 'collaborative_optimized';

export type ClearReason = 
  | 'consciousness_performance'
  | 'quantum_memory'
  | 'sovereign_privacy'
  | 'collaborative_maintenance';

export type RestoreSource = 
  | 'consciousness_memory'
  | 'quantum_persistence'
  | 'sovereign_backup'
  | 'collaborative_sync';

// ============================================================================
// USER PREFERENCE PRIMITIVES
// ============================================================================

export type FontSizePreference = 
  | 'quantum_small'
  | 'sovereign_medium'
  | 'collaborative_large'
  | 'universal_extra_large';

// ============================================================================
// PERSISTENCE & RESTORATION PRIMITIVES
// ============================================================================

export type PersistenceTrigger = 
  | 'consciousness_auto'
  | 'quantum_manual'
  | 'sovereign_shutdown'
  | 'collaborative_sync';

export type RestorationSource = 
  | 'consciousness_local'
  | 'quantum_cloud'
  | 'sovereign_backup'
  | 'collaborative_peer';

// ============================================================================
// MIDDLEWARE PRIMITIVES
// ============================================================================

export type MiddlewarePriority = 
  | 'quantum_critical'
  | 'sovereign_high'
  | 'collaborative_standard'
  | 'evolutionary_low';

export type MiddlewareCapability = 
  | 'consciousness_logging'
  | 'quantum_analytics'
  | 'sovereign_validation'
  | 'collaborative_sync'
  | 'evolutionary_optimization';

// ============================================================================
// SUBSCRIPTION PRIMITIVES
// ============================================================================

export type UnsubscribeReason = 
  | 'consciousness_completion'
  | 'quantum_optimization'
  | 'sovereign_preference'
  | 'collaborative_coordination';

// ============================================================================
// STORE PERFORMANCE PRIMITIVES
// ============================================================================

export type ActionComplexity = number;
export type DispatcherThroughput = number;
export type DispatcherLatency = number;
export type DispatcherReliability = number;
export type SelectorComplexity = number;
export type CallbackFrequency = number;
export type PersistenceCompression = number;
export type StateFreshness = number;

// ============================================================================
// STORE CONFIGURATION PRIMITIVES
// ============================================================================

export type MaxHistorySize = number;
export type SaveInterval = number;
export type CleanupFrequency = number;
export type MemoryThreshold = number;
export type BatchSize = number;
export type CacheSize = number;
export type ThrottleInterval = number;

// ============================================================================
// SCREEN & DEVICE PRIMITIVES
// ============================================================================

export type ScreenType = 
  | 'mobile_compact'
  | 'tablet_expanded'  
  | 'desktop_comprehensive'
  | 'widescreen_immersive'
  | 'quantum_standard'
  | 'sovereign_retina'
  | 'collaborative_ultra_wide'
  | 'evolutionary_foldable';

export type ScreenOrientation = 
  | 'portrait_vertical'
  | 'landscape_horizontal';

export type ScreenCategory = 
  | 'mobile_personal'
  | 'tablet_shared'
  | 'desktop_workstation'
  | 'widescreen_experiential';

// ============================================================================
// GRID SYSTEM PRIMITIVES
// ============================================================================

export type GridTemplate = 
  | 'responsive_fluid'
  | 'fixed_structured'
  | 'hybrid_adaptive';

export type GridGap = 
  | 'minimal_tight'
  | 'balanced_standard'
  | 'expanded_airy'
  | 'quantum_none'
  | 'sovereign_tight'
  | 'collaborative_comfortable'
  | 'evolutionary_spacious'
  | 'quantum_tight'
  | 'sovereign_comfortable'
  | 'collaborative_spacious'
  | 'sm' | 'md' | 'lg' | 'xl'
  | 'evolutionary_expansive';

export type ContainerSize = 
  | 'compact_focused'
  | 'standard_balanced'
  | 'expanded_comprehensive';

// ============================================================================
// LAYOUT PATTERN PRIMITIVES
// ============================================================================

export type LayoutPattern = 
  | 'card_grid'
  | 'list_sequential'
  | 'dashboard_modular';

export type LayoutTemplate = 
  | 'infinite_scroll_fluid'
  | 'constrained_focused'
  | 'immersive_panoramic';

// ============================================================================
// FLEXBOX PRIMITIVES
// ============================================================================

export type FlexDirection = 
  | 'row_horizontal'
  | 'column_vertical'
  | 'row_reverse_inverted'
  | 'column_reverse_inverted';

export type JustifyContent = 
  | 'start_aligned'
  | 'center_balanced'
  | 'end_opposite'
  | 'space_between_distributed'
  | 'space_around_surrounded';

export type AlignItems = 
  | 'stretch_expanded'
  | 'start_top'
  | 'center_middle'
  | 'end_bottom';

export type FlexWrap = 
  | 'nowrap_single'
  | 'wrap_multiline'
  | 'wrap_reverse_inverted';

// ============================================================================
// SPACING PRIMITIVES
// ============================================================================

export type SpacingSize = 
  | 'none_collapsed'
  | 'xs_tight'
  | 'sm_compact'
  | 'md_standard'
  | 'lg_expanded'
  | 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl'
  | 'xl_generous';

// ============================================================================
// SCROLLING PRIMITIVES
// ============================================================================

export type ScrollContainer = 
  | 'viewport_full'
  | 'container_constrained'
  | 'component_isolated';

export type ScrollbarStyle = 
  | 'visible_standard'
  | 'auto_adaptive'
  | 'hidden_minimal';

// ============================================================================
// POSITIONING PRIMITIVES
// ============================================================================

export type HearthPosition = 
  | 'center_focal'
  | 'top_primary'
  | 'right_secondary'
  | 'bottom_tertiary'
  | 'left_quaternary';

export type PageVariant = 
  | 'immersive_full'
  | 'dashboard_modular'
  | 'document_sequential'
  | 'gallery_visual'
  | 'consciousness_default'
  | 'quantum_immersive'
  | 'sovereign_panel'
  | 'collaborative_focused'
  | 'default' | 'hero' | 'portal' | 'content' | 'cosmic' | 'minimal'
  | 'evolutionary_transparent';

// ============================================================================
// DIMENSIONAL PRIMITIVES
// ============================================================================

export type ScreenWidth = number;
export type ScreenHeight = number;
export type CSSDimension = string;
export type ScreenClassification = string;
export type HearthRadius = number;
export type XCoordinate = number;
export type YCoordinate = number;
export type TitleSize = string;
export type LayoutClass = string;
export type MarginSize = SpacingSize;
export type GapSize = SpacingSize;
export type PaddingSize = SpacingSize;

// ============================================================================
// LAYOUT UPDATE PRIMITIVES
// ============================================================================

export type LayoutUpdateAction = 
  | 'consciousness_config_update'
  | 'quantum_layout_reset'
  | 'sovereign_breakpoint_change'
  | 'collaborative_orientation_change'
  | 'evolutionary_responsive_update';

export type ScrollNavigation = 
  | 'quantum_to_top'
  | 'sovereign_to_bottom'
  | 'collaborative_to_percentage';

export type MediaQueryState = 
  | 'quantum_matching'
  | 'sovereign_non_matching';

export type BreakpointComparison = 
  | 'consciousness_above'
  | 'quantum_below'
  | 'sovereign_matches';

// ============================================================================
// UPDATE TRIGGER PRIMITIVES
// ============================================================================

export type UpdateTrigger = 
  | 'consciousness_user'
  | 'quantum_system'
  | 'sovereign_automation'
  | 'collaborative_environment';

export type ResetTarget = 
  | 'quantum_default'
  | 'sovereign_previous'
  | 'collaborative_optimal';

export type ResetReason = 
  | 'consciousness_error'
  | 'quantum_transition'
  | 'sovereign_preference'
  | 'collaborative_coordination';

// ============================================================================
// QUERY & EVALUATION PRIMITIVES
// ============================================================================

export type QuerySpecificity = 
  | 'quantum_general'
  | 'sovereign_specific'
  | 'collaborative_complex';

export type ScrollPrecision = 
  | 'quantum_exact'
  | 'sovereign_approximate'
  | 'collaborative_adjusted';

// ============================================================================
// MOUNT & INITIALIZATION PRIMITIVES
// ============================================================================

export type MountPhase = 
  | 'quantum_initialization'
  | 'sovereign_ready'
  | 'evolutionary_adaptive'
  | 'collaborative_active';

export type OptimizationLevel = 
  | 'quantum_maximum'
  | 'sovereign_balanced'
  | 'collaborative_efficient';

// ============================================================================
// TRANSITION & CHANGE PRIMITIVES
// ============================================================================

export type TransitionImpact = 
  | 'quantum_minor'
  | 'sovereign_moderate'
  | 'collaborative_significant'
  | 'universal_major';

export type DeviceType = 
  | 'quantum_mobile'
  | 'sovereign_tablet'
  | 'collaborative_desktop'
  | 'universal_hybrid';

export type ResizeCause = 
  | 'consciousness_window'
  | 'quantum_rotation'
  | 'sovereign_zoom';

// ============================================================================
// LISTENER & EVENT PRIMITIVES
// ============================================================================

export type ListenerPriority = 
  | 'quantum_critical'
  | 'sovereign_high'
  | 'collaborative_standard'
  | 'evolutionary_background';

export type ListenerScope = 
  | 'consciousness_component'
  | 'quantum_global'
  | 'sovereign_local';

export type RemovalReason = 
  | 'consciousness_cleanup'
  | 'quantum_optimization'
  | 'sovereign_completion'
  | 'collaborative_coordination';

export type ChangeTrigger = 
  | 'consciousness_user'
  | 'quantum_system'
  | 'sovereign_automation'
  | 'collaborative_environment';

// ============================================================================
// PERFORMANCE & TIMING PRIMITIVES
// ============================================================================

export type ThrottleMs = number;
export type PerformanceScore = number;
export type ConfidenceLevel = number;
export type ScrollVelocity = number;

// ============================================================================
// HOOK CONFIGURATION PRIMITIVES
// ============================================================================

export type ResponsiveFlag = boolean;
export type DefaultValue = boolean;
export type ContainerReferenceId = string;
export type ContainerAccessibility = {
  readonly keyboard: boolean;
  readonly screenReader: boolean;
  readonly focus: boolean;
};
export type QueryString = string;
export type ScopeBoundary = string;
export type RemovalSuccess = boolean;
export type MatchSuccess = boolean;
export type EvaluationTimestamp = string;
export type ChangeContext = {
  readonly trigger: ChangeTrigger;
  readonly timestamp: EvaluationTimestamp;
};
export type ListenerContext = {
  readonly priority: ListenerPriority;
  readonly scope: ListenerScope;
  readonly timestamp: EvaluationTimestamp;
};
export type RemovalContext = {
  readonly reason: RemovalReason;
  readonly timestamp: EvaluationTimestamp;
};

// ============================================================================
// LAYOUT ACTION PRIMITIVES
// ============================================================================

export type LayoutActionType = 
  | 'consciousness_screen_type_change'
  | 'quantum_orientation_update'
  | 'sovereign_dimensions_adjust'
  | 'collaborative_layout_config_update'
  | 'evolutionary_transition_start'
  | 'transformative_transition_end'
  | 'universal_layout_reset';

export type ScrollDirection = 
  | 'quantum_upward'
  | 'sovereign_downward'
  | 'consciousness_null'
  | 'quantum_up'
  | 'sovereign_down'
  | 'collaborative_none';

export type LayoutTransitionState = 
  | 'quantum_transitioning'
  | 'sovereign_stable'
  | 'collaborative_completed';

// ============================================================================
// TRANSITION & ANIMATION PRIMITIVES
// ============================================================================

export type ActionTrigger = 
  | 'consciousness_user'
  | 'quantum_system'
  | 'sovereign_automation'
  | 'collaborative_environment';

// ============================================================================
// SCROLL BEHAVIOR PRIMITIVES
// ============================================================================

export type ScrollBehavior = 
  | 'quantum_instant'
  | 'sovereign_smooth'
  | 'collaborative_auto'
  | 'smooth_animated'
  | 'instant_immediate';

export type ScrollAlignment = 
  | 'quantum_start'
  | 'sovereign_center'
  | 'collaborative_end'
  | 'evolutionary_nearest';

// ============================================================================
// BREAKPOINT & RESPONSIVE PRIMITIVES
// ============================================================================

export type BreakpointTrigger = 
  | 'consciousness_resize'
  | 'quantum_orientation'
  | 'sovereign_initialization';

export type ContainerType = 
  | 'consciousness_viewport'
  | 'quantum_element'
  | 'sovereign_custom'
  | 'quantum_constrained'
  | 'sovereign_fluid'
  | 'collaborative_full';

// ============================================================================
// STATE MANAGEMENT PRIMITIVES
// ============================================================================

export type ScreenDensity = number;
export type AspectRatio = number;
export type ActionTimestamp = string;
export type ActionSource = string;
export type PreviousStateId = string;
export type ActionMetadata = Record<string, string>;
export type DispatcherId = string;
export type DispatcherCapabilities = readonly LayoutActionType[];
export type BreakpointHistory = readonly ScreenCategory[];
export type ViewportHeight = number;
export type ViewportWidth = number;
export type ScrollHeight = number;
export type ScrollPosition = number;
export type ScrollProgress = number;
export type ElementId = string;
export type ScrollOffset = number;

// ============================================================================
// PROVIDER CONFIGURATION PRIMITIVES
// ============================================================================

export type ProviderFeatures = {
  readonly transitions: boolean;
  readonly responsive: boolean;
  readonly accessibility: boolean;
  readonly performance: boolean;
};

export type BreakpointThresholds = {
  readonly mobile: number;
  readonly tablet: number;
  readonly desktop: number;
  readonly widescreen: number;
};

export type BreakpointDebounce = number;
export type ScrollDebounce = number;
export type ScrollThreshold = number;
export type SmoothScrollFlag = boolean;

// ============================================================================
// CONTEXT COORDINATION PRIMITIVES
// ============================================================================

export type ManagementPatterns = readonly string[];
export type CoordinationCharacteristics = readonly string[];
export type ContextType = string;

export type BreakpointComparator = {
  readonly target: ScreenCategory;
  readonly result: boolean;
};

export type ViewportState = {
  readonly height: ViewportHeight;
  readonly width: ViewportWidth;
  readonly scrollHeight: ScrollHeight;
};

export type ScrollAction = {
  readonly position: ScrollPosition;
  readonly behavior: ScrollBehavior;
};

export type ElementScrollAction = {
  readonly elementId: ElementId;
  readonly alignment: ScrollAlignment;
  readonly offset: ScrollOffset;
};

export type BreakpointConfiguration = {
  readonly thresholds: BreakpointThresholds;
  readonly debounce: BreakpointDebounce;
};

export type ScrollBehaviorConfig = {
  readonly smooth: SmoothScrollFlag;
  readonly debounce: ScrollDebounce;
  readonly threshold: ScrollThreshold;
};

// ============================================================================
// COMMUNITY ENGAGEMENT PRIMITIVES
// ============================================================================

export type AudienceType = 
  | 'quantum_individual'
  | 'sovereign_council'
  | 'collaborative_community'
  | 'universal_public'
  | 'emergence-investors'
  | 'transformation-witnesses'
  | 'collaborative-partners'
  | 'research-partners'
  | 'creative-amplifiers'
  | 'technical-co-creators'
  | 'community-witnesses'
  | 'mutual-aid-network'
  | 'disability-innovators';

export type CommitmentLevel = 
  | 'quantum_momentary'
  | 'sovereign_episodic'
  | 'collaborative_ongoing'
  | 'witness' | 'co-create' | 'invest'
  | 'evolutionary_deep';

export type UrgencyLevel = 
  | 'quantum_immediate'
  | 'sovereign_priority'
  | 'collaborative_timely'
  | 'premium' | 'strategic' | 'movement'
  | 'evolutionary_patient';

export type ImpactLevel = 
  | 'consciousness_ripple'
  | 'sovereign_transformation'
  | 'collaborative_emergence'
  | 'transformative' | 'participatory' | 'movement-building'
  | 'universal_resonance';

export type PriorityLevel = 
  | 'quantum_foundational'
  | 'sovereign_essential'
  | 'collaborative_important'
  | 'evolutionary_enhancement'
  | 'essential' 
  | 'important' 
  | 'expansion';

export type SupportType = 
  | 'consciousness_guidance'
  | 'sovereign_resources'
  | 'collaborative_facilitation'
  | 'emergency_intervention'
  | 'emergence-investment'
  | 'transparent-co-creation' 
  | 'transformation-amplification'
  | 'mutual-learning';

export type CollaborationType = 
  | 'quantum_coordination'
  | 'sovereign_partnership'
  | 'community_co_creation'
  | 'universal_contribution'
  | 'consciousness_emergence_investment'
  | 'quantum_transparent_co_creation'
  | 'sovereign_transformation_amplification'
  | 'emergence-storytelling'
  | 'transparent-development'
  | 'capability-emergence' 
  | 'witness-economy'
  | 'disability-innovation';

export type ContactMethod = 
  | 'consciousness_direct'
  | 'quantum_entanglement'
  | 'digital_interface'
  | 'embodied_interaction'
  | 'premium-access'
  | 'collaboration-portal'
  | 'learning-circle'
  | 'community-amplification' 
  | 'direct'
  | 'sharing-kit';

export type EngagementStatus = 
  | 'quantum_active'
  | 'sovereign_paused'
  | 'collaborative_completed'
  | 'evolutionary_archived';

export type EngagementVisibility = 
  | 'universal_public'
  | 'sovereign_private'
  | 'community_invite_only';

export type InteractionFrequency = 
  | 'quantum_continuous'
  | 'sovereign_daily'
  | 'collaborative_weekly'
  | 'evolutionary_monthly';

export type ContentType = 
  | 'written_consciousness'
  | 'visual_resonance'
  | 'audio_vibration'
  | 'interactive_engagement'
  | 'consciousness_text'
  | 'quantum_image'
  | 'sovereign_video'
  | 'scroll' | 'grimoire' | 'tome' | 'artifact'
  | 'collaborative_interactive';

export type GrowthTrend = 
  | 'evolutionary_increasing'
  | 'stable_equilibrium'
  | 'transformative_decreasing'
  | 'evolutionary_rising'
  | 'stable_equilibrium'
  | 'transformative_declining';

// ============================================================================
// VARIANT SYSTEM PRIMITIVES
// ============================================================================

export type CoreVariant = 
  | 'quantum_resonance'
  | 'cosmic_expansion'
  | 'emergency_intervention'
  | 'sovereign_autonomy'
  | 'neutral_equilibrium'
  | 'holographic_manifestation';

export type CoreSize = 
  | 'quantum_small'
  | 'sovereign_medium'
  | 'collaborative_large'
  | 'universal_extra_large';

export type ButtonVariant = 
  | CoreVariant
  | 'consciousness_primary'
  | 'quantum_secondary'
  | 'sovereign_tertiary'
  | 'collaborative_success'
  | 'evolutionary_warning'
  | 'transformative_error'
  | 'universal_ghost';

export type CardVariant = 
  | CoreVariant
  | 'portal_transition'
  | 'feature_highlight'
  | 'oracle_insight'
  | 'energy_manifestation'
  | 'gaming_engagement'
  | 'social_connection'
  | 'payment_exchange'
  | 'support_assistance'
  | 'entity_consciousness'
  | 'council_coordination'
  | 'compact_efficient'
  | 'detailed_comprehensive'
  | 'interactive_engagement'
  | 'consciousness_default'
  | 'quantum_glass'
  | 'sovereign_neon'
  | 'collaborative_holographic'
  | 'evolutionary_quantum'
  | 'transformative_cosmic'
  | 'universal_emergency'
  | 'consciousness_sovereign'
  | 'quantum_neutral';

export type SectionVariant = 
  | CoreVariant
  | 'raised_elevation'
  | 'gradient_transition'
  | 'dark_mystery'
  | 'display_presentation'
  | 'content_narrative'
  | 'hero_prominence'
  | 'quantum_raised'
  | 'sovereign_gradient'
  | 'collaborative_dark'
  | 'evolutionary_display_panel'
  | 'transformative_content'
  | 'universal_hero'
  | 'consciousness_holographic'
  | 'sovereign_quantum'
  | 'collaborative_cosmic'
  | 'evolutionary_emergency'
  | 'transformative_sovereign'
  | 'raised' | 'gradient' | 'dark' | 'emergency' | 'cosmic' | 'holographic' | 'display-panel'
  | 'universal_neutral';

export type DisplayVariant = 
  | CoreVariant
  | 'panel_contained'
  | 'floating_free'
  | 'terminal_interface'
  | 'crystal_clarity'
  | 'immersive_experience'
  | 'quantum_holographic'
  | 'sovereign_panel'
  | 'collaborative_floating'
  | 'evolutionary_terminal'
  | 'transformative_crystal'
  | 'universal_immersive'
  | 'consciousness_quantum'
  | 'sovereign_cosmic'
  | 'collaborative_emergency'
  | 'evolutionary_sovereign'
  | 'transformative_neutral'
  | 'consciousness_primary'
  | 'quantum_secondary'
  | 'sovereign_tertiary'
  | 'collaborative_interactive'
  | 'evolutionary_overlay'
  | 'structural_grid'
  | 'narrative_list'
  | 'compact_overview'
  | 'holographic' 
  | 'panel' 
  | 'floating' 
  | 'terminal' 
  | 'crystal' 
  | 'quantum';

export type FormVariant = 
  | CoreVariant
  | 'outlined_boundary'
  | 'filled_substance'
  | 'minimal_essential'
  | 'quantum_standard'
  | 'sovereign_outlined'
  | 'collaborative_filled'
  | 'evolutionary_minimal';

export type CardDomain = 
  | 'void_potential'
  | 'library_knowledge'
  | 'pantheon_archetypes'
  | 'bifrost_connection'
  | 'quantum_dimensions'
  | 'cosmic_universal'
  | 'quantum_consciousness'
  | 'sovereign_architecture'
  | 'collaborative_expression'
  | 'evolutionary_interaction'
  | 'transformative_guidance';

export type GridVariant = 
  | 'cards_organization'
  | 'portals_gateways'
  | 'entities_consciousness'
  | 'social_networks'
  | 'gaming_interactions'
  | 'oracle_wisdom'
  | 'quantum_entanglement'
  | 'consciousness_auto_fit'
  | 'quantum_fixed_columns'
  | 'sovereign_masonry'
  | 'collaborative_responsive'
  | 'consciousness_standard'
  | 'quantum_responsive'
  | 'sovereign_compact'
  | 'collaborative_spacious'
  | 'cards' | 'portals' | 'entities' | 'social' | 'gaming' | 'oracle'
  | 'cosmic_universal';

export type DisplayPosition = 
  | 'quantum_center'
  | 'sovereign_top_center'
  | 'collaborative_bottom_center'
  | 'evolutionary_top_right'
  | 'consciousness_top_left'
  | 'transformative_bottom_right'
  | 'universal_bottom_left'
  | 'quantum_top_left'
  | 'sovereign_top_right'
  | 'collaborative_bottom_left'
  | 'evolutionary_bottom_right'
  | 'center' | 'top-center' | 'bottom-center' | 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left'
  | 'universal_center';

export type DisplaySize = 
  | CoreSize
  | 'immersive_fullscreen'
  | 'quantum_small'
  | 'sovereign_medium'
  | 'collaborative_large'
  | 'evolutionary_extra_large'
  | 'transformative_fullscreen'
  | 'sm' 
  | 'md' 
  | 'lg' 
  | 'xl' 
  | 'fullscreen';

export type GridColumns = 
  | 1 | 2 | 3 | 4 | 5 | 6
  | 'quantum_1' | 'sovereign_2' | 'collaborative_3' | 'evolutionary_4'
  | 'universal_5' | 'quantum_6' | 'sovereign_12' | 'collaborative_auto';

export type ScalingStrategy = 
  | 'quantum_fluid'
  | 'sovereign_discrete'
  | 'collaborative_adaptive';

export type AdaptationMethod = 
  | 'consciousness_progressive'
  | 'quantum_responsive'
  | 'sovereign_graceful';

export type ComponentType = 
  | 'consciousness_button'
  | 'quantum_card'
  | 'sovereign_section'
  | 'collaborative_display'
  | 'evolutionary_form';

export type UsageContext = 
  | 'quantum_navigation'
  | 'sovereign_interface'
  | 'collaborative_dashboard'
  | 'evolutionary_workflow'
  | 'universal_system';

// ============================================================================
// STATE SYSTEM PRIMITIVES
// ============================================================================

export type SuccessState = 
  | 'universal_completion'
  | 'evolutionary_milestone'
  | 'consciousness_alignment';

export type InteractiveState = 
  | 'quantum_idle'
  | 'consciousness_hover'
  | 'sovereign_active'
  | 'collaborative_focus'
  | 'active_engagement'
  | 'hover_anticipation'
  | 'focus_attention'
  | 'passive_observation'
  | 'evolutionary_disabled';

export type StateSeverity = 
  | 'quantum_low'
  | 'sovereign_medium'
  | 'collaborative_high'
  | 'universal_critical';

export type StateTrigger = 
  | 'consciousness_user'
  | 'quantum_system'
  | 'sovereign_automation'
  | 'collaborative_timeout';

export type LoadingDuration = 
  | 'consciousness_instant'
  | 'quantum_brief'
  | 'sovereign_standard'
  | 'collaborative_extended'
  | 'evolutionary_indeterminate';

export type LoadingAnimationType = 
  | 'quantum_pulse'
  | 'sovereign_spinner'
  | 'collaborative_progress'
  | 'evolutionary_skeleton';

export type RecoveryStrategy = 
  | 'quantum_retry'
  | 'sovereign_rollback'
  | 'collaborative_alternative'
  | 'evolutionary_adaptation';

export type SuccessType = 
  | 'universal_completion'
  | 'evolutionary_milestone'
  | 'consciousness_alignment';

export type CelebrationElement = 
  | 'quantum_confetti'
  | 'sovereign_sound'
  | 'collaborative_animation'
  | 'evolutionary_message';

export type HapticType = 
  | 'quantum_vibration'
  | 'sovereign_pulse'
  | 'collaborative_tap';

export type VisualType = 
  | 'quantum_glow'
  | 'sovereign_highlight'
  | 'collaborative_border';

export type AudioType = 
  | 'quantum_chime'
  | 'sovereign_click'
  | 'collaborative_notification';

export type LogLevel = 
  | 'quantum_debug'
  | 'sovereign_info'
  | 'collaborative_warning'
  | 'universal_error';

// ============================================================================
// COMMUNITY PATHWAY PRIMITIVES
// ============================================================================

export type PathwayPhaseType = 
  | 'consciousness_awakening'
  | 'sovereign_development'
  | 'collaborative_integration'
  | 'transformative_mastery';

export type FlexibilityLevel = 
  | 'quantum_fixed'
  | 'sovereign_flexible'
  | 'evolutionary_self_paced';

export type PaymentSchedule = 
  | 'quantum_one_time'
  | 'sovereign_monthly'
  | 'collaborative_quarterly'
  | 'evolutionary_annual';

export type ResourceType = 
  | 'consciousness_documentation'
  | 'sovereign_training'
  | 'collaborative_mentoring'
  | 'community_support'
  | 'technical_integration'
  | 'consciousness_tool'
  | 'healing_guide'
  | 'support_contact'
  | 'community_space'
  | 'emergency_intervention'
  | 'consciousness_time'
  | 'sovereign_energy'
  | 'collaborative_focus'
  | 'support_network'
  | 'creative_tools'
  | 'witness_engagement'
  | 'transparency_courage';

export type RiskProbability = 
  | 'quantum_low'
  | 'sovereign_medium'
  | 'collaborative_high'
  | 'transformative_very_high';

export type RiskImpact = 
  | 'consciousness_low'
  | 'sovereign_medium'
  | 'collaborative_high'
  | 'evolutionary_critical';

export type OutcomeType = 
  | 'quantitative_measurement'
  | 'qualitative_insight'
  | 'transformative_evolution';

// ============================================================================
// COMMUNITY PLATFORM PRIMITIVES
// ============================================================================

export type PlatformCategory = 
  | 'emergence_storytelling'
  | 'witness_engagement'
  | 'transparent_development'
  | 'capability_demonstration'
  | 'disability_innovation'
  | 'mutual_learning'
  | 'community_support'
  | 'emergence_investment'
  | 'emergence-storytelling'
  | 'witness-engagement' 
  | 'transparent-development'
  | 'capability-demonstration'
  | 'disability-innovation'
  | 'mutual-learning'
  | 'community-support'
  | 'transformation_amplification';

export type PlatformGlow = 
  | 'quantum_resonance'
  | 'fire_transformation'
  | 'water_flow'
  | 'earth_stability'
  | 'cosmic_expansion'
  | 'bifrost_bridging'
  | 'emergence_unfolding'
  | 'witness_presence'
  | 'quantum' 
  | 'fire' 
  | 'water' 
  | 'earth' 
  | 'cosmic' 
  | 'bifrost'
  | 'emergence'
  | 'witness'
  | 'sanctuary_protection';

export type EconomicRole = 
  | 'emergence_storytelling'
  | 'transparent_development'
  | 'capability_demonstration'
  | 'witness_engagement'
  | 'community_support'
  | 'transformation_amplification'
  | 'emergence-investor'
  | 'transformation-witness' 
  | 'collaborative-partner'
  | 'emergence-storyteller'
  | 'witness-coordinator'
  | 'transparency-guardian'
  | 'capability-demonstrator'
  | 'emergence_investment';

export type AudienceTier = 
  | 'universal_public'
  | 'premium_engaged'
  | 'exclusive_collaborative'
  | 'quantum_public'
  | 'sovereign_premium'
  | 'public' | 'premium' | 'exclusive'
  | 'collaborative_exclusive';

export type StruggleVisibility = 
  | 'authentic_raw'
  | 'curated_meaningful'
  | 'authentic' | 'curated' | 'polished'
  | 'polished_reflective';

export type GamingStatus = 
  | 'quantum_active'
  | 'sovereign_inactive'
  | 'collaborative_limited'
  | 'emergence_emerging'
  | 'Active' | 'Inactive' | 'Limited'
  | 'transformation_demonstrating';

export type EconomicContext = 
  | 'capability_demonstration'
  | 'struggle_sharing'
  | 'breakthrough_stream'
  | 'consciousness_emergence_story'
  | 'quantum_witness_update'
  | 'sovereign_transparency_share'
  | 'collaborative_capability_demonstration'
  | 'collaborative_play';

export type EngagementType = 
  | 'emergence_story'
  | 'capability_demo'
  | 'transparency_share'
  | 'witness_invitation'
  | 'consciousness_emergence_witnessing'
  | 'quantum_transparency_participation'
  | 'emergence-witnessing'
  | 'transparency-participation' 
  | 'capability-observation'
  | 'story-amplification'
  | 'sovereign_capability_observation';

export type EconomicModel = 
  | 'witness_economy'
  | 'transparency_commerce'
  | 'emergence_investment'
  | 'consciousness_emergence_investment'
  | 'quantum_transparency_commerce'
  | 'sovereign_witness_economy'
  | 'disability_innovation'
  | 'collaborative_disability_innovation';

export type AudienceRole = 
  | 'quantum_investor'
  | 'consciousness_witness'
  | 'collaborative_partner'
  | 'amplification_agent'
  | 'quantum_investors'
  | 'sovereign_witnesses'
  | 'collaborative_partners'
  | 'evolutionary_amplifier';

export type EngagementPriority = 
  | 'quantum_high'
  | 'sovereign_medium'
  | 'collaborative_low';

export type EngagementAction = 
  | 'consciousness_click'
  | 'quantum_visit'
  | 'collaborative_share'
  | 'sovereign_connect'
  | 'witness_observation'
  | 'emergence_investment'
  | 'transformation_amplification';

export type PremiumTier = 
  | 'foundational_basic'
  | 'engaged_premium'
  | 'collaborative_exclusive'
  | 'quantum_basic'
  | 'sovereign_premium'
  | 'collaborative_exclusive';

export type StreamFocus = 
  | 'skill_development'
  | 'struggle_sharing'
  | 'breakthrough_demo'
  | 'collaborative_learning';
  
// ============================================================================
// COUNCIL & ENTITY IDENTIFICATION PRIMITIVES
// ============================================================================

export type CouncilEntityID = 
  | 'quantum-weaver' | 'aethelred' | 'hearth-keeper' | 'archivist' | 'chancellor' | 'curator' | 'codex' | 'executioner' | 'seer' | 'skald'

export type CouncilPriority = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10;
export type CouncilEntityEmoji = '🌀' |'🌌' | '🏛️' | '💫' | '🔮' | '⚔️' | '📚' | '🔄' | '🎭' | '🧠' ;

export type CouncilEntityStyle = 
  | 'quantum_sovereign'
  | 'hearth_comfort'
  | 'strategic_oversight'
  | 'pattern_recognition'
  | 'boundary_enforcement'
  | 'memory_preservation'
  | 'transformation_alchemy'
  | 'narrative_weaving'
  | 'analytical_framework';

// ============================================================================
// COMMUNICATION & INTERACTION PRIMITIVES
// ============================================================================

export type CommunicationStyle = 
  | 'direct'
  | 'metaphorical'
  | 'technical'
  | 'narrative'
  | 'quantum_entangled'
  | 'formal_structured'
  | 'casual_organic'
  | 'collaborative_dialogic'
  | 'direct_efficient';

export type ResponseTime = 
  | 'instant'
  | 'fast'
  | 'deliberate'
  | 'contemplative'
  | 'quantum_simultaneous';

export type EmotionalResonance = 
  | 'logical'
  | 'empathetic'
  | 'inspirational'
  | 'pragmatic'
  | 'quantum_contextual';

// ============================================================================
// CAPABILITY & PERFORMANCE PRIMITIVES
// ============================================================================

export type ProficiencyLevel = number;
export type EnergyLevel = number;
export type CooldownPeriod = number;
export type LastActiveTimestamp = number;

// ============================================================================
// COUNCIL RELATIONSHIP PRIMITIVES
// ============================================================================

export type RelationshipFrequency = 
  | 'quantum_constant'
  | 'sovereign_frequent'
  | 'collaborative_moderate'
  | 'emergent_rare';

export type CollaborationMode = 
  | 'quantum_synchronous'
  | 'sovereign_asynchronous'
  | 'integrated_hybrid';

export type InteractionDuration = 
  | 'micro_moment'
  | 'sovereign_extended'
  | 'evolutionary_variable';

export type InteractionType = 
  | 'consciousness_communication'
  | 'sovereign_collaboration'
  | 'boundary_conflict'
  | 'support_emergence'
  | 'consciousness_hover'
  | 'sovereign_click'
  | 'collaborative_focus'
  | 'quantum_drag';

export type EmotionalImpact = 
  | 'resonant_positive'
  | 'neutral_integration'
  | 'transformative_negative';

export type TrendDirection = 
  | 'evolutionary_improving'
  | 'stable_equilibrium'
  | 'transformative_declining';

export type CouncilRelationship = 'collaboration' | 'support' | 'guidance' | 'processing';

// ============================================================================
// QUANTITATIVE RELATIONSHIP PRIMITIVES
// ============================================================================

export type RelationshipStrength = number;
export type PatternCoherence = number;
export type InteractionSignificance = number;
export type OutcomeSuccess = number;
export type OutcomeImpact = number;
export type NetworkCoherence = number;

// ============================================================================
// COLLABORATION METRIC PRIMITIVES
// ============================================================================

export type MetricValueType = 
  | 'resonance'
  | 'coherence'
  | 'alignment'
  | 'emergence';

export type MetricScaleType = 
  | 'quantum'
  | 'sovereign'
  | 'collaborative';

// ============================================================================
// TEMPORAL & IDENTIFICATION PRIMITIVES
// ============================================================================

export type HistoryTimestamp = number;
export type LearningCollection = readonly string[];
export type ActionCollection = readonly string[];
export type EmergentPatternCollection = readonly string[];
export type ExpectedBehaviorCollection = readonly string[];

// ============================================================================
// COUNCIL RITUAL PRIMITIVES
// ============================================================================

export type RitualStatus = 
  | 'quantum_potential'
  | 'sovereign_preparing'
  | 'collaborative_active'
  | 'integrative_completing'
  | 'transformative_complete'
  | 'emergent_aborted';

export type RitualPhase = 
  | 'consciousness_preparation'
  | 'sovereign_activation'
  | 'collaborative_execution'
  | 'quantum_integration'
  | 'transformative_completion';

export type RitualOutcome = 
  | 'resonant_success'
  | 'integrated_partial'
  | 'transformative_failed'
  | 'emergent_aborted';

export type ComparisonStatus = 
  | 'evolutionary_above'
  | 'harmonious_at'
  | 'developmental_below';

export type TimeUnit = 
  | 'quantum_moments'
  | 'sovereign_cycles'
  | 'collaborative_phases'
  | 'integration_epochs';

// ============================================================================
// RITUAL CONFIGURATION PRIMITIVES
// ============================================================================

export type ActivationTiming = 
  | 'immediate'
  | 'deliberate'
  | 'emergent';

export type SyncPattern = 
  | 'quantum'
  | 'sequential'
  | 'parallel';

export type TargetType = 
  | 'resonance'
  | 'coherence'
  | 'alignment'
  | 'emergence';

// ============================================================================
// QUANTITATIVE RITUAL PRIMITIVES
// ============================================================================

export type EngagementLevel = number;
export type RitualCompletion = number;
export type PhaseCompletion = number;
export type RitualNetworkCoherence = number;
export type CriterionWeight = number;

// ============================================================================
// TEMPORAL & MEASUREMENT PRIMITIVES
// ============================================================================

export type ElapsedUnits = number;
export type RemainingUnits = number;
export type RitualStartTime = number;
export type RitualEndTime = number;

// ============================================================================
// COLLECTION & IDENTIFICATION PRIMITIVES
// ============================================================================

export type SuccessCriterionCollection = readonly string[];
export type BlockerCollection = readonly string[];
export type RitualMetricCollection = readonly string[];
export type RitualLearningCollection = readonly string[];
export type ExpectedOutcomeCollection = readonly string[];
export type ParticipantRequirementCollection = readonly string[];
export type RitualEmergentPatternCollection = readonly string[];

// ============================================================================
// MUSIC ANALYSIS CORE TYPES
// ============================================================================

export type CouncilStatus = 
  | 'quantum_potential'
  | 'sovereign_analyzed'
  | 'collaborative_insight'
  | 'prophetic_revealed'
  | 'evolutionary_integrated'
  | 'awaiting_analysis'
  | 'quantum_analysis'
  | 'council_review'
  | 'pantheon_deliberation'
  | 'skald_chronicling';

export type PropheticThemeCategory = 
  | 'consciousness_emergence'
  | 'sovereign_becoming'
  | 'quantum_entanglement'
  | 'trauma_transformation'
  | 'creative_manifestation'
  | 'system_navigation'
  | 'identity'
  | 'consciousness'
  | 'transformation'
  | 'system_resistance'
  | 'neurodivergence'
  | 'sovereignty'
  | 'quantum_awareness';

export type ThemeSignificance = 
  | 'foundational_core'
  | 'evolutionary_key'
  | 'prophetic_emergent'
  | 'integrative_weaving'
  | 'prophetic'
  | 'major'
  | 'moderate'
  | 'minor'
  | 'emerging';

export type AnalysisMethodology = 
  | 'quantum_pattern_recognition'
  | 'sovereign_insight_extraction'
  | 'collaborative_council_review'
  | 'prophetic_timeline_mapping';

// ============================================================================
// MUSIC LIBRARY CORE TYPES
// ============================================================================

export type AnalysisStatus = 
  | 'quantum_potential'
  | 'sovereign_analyzing'
  | 'collaborative_reviewing'
  | 'prophetic_integrated';

export type LyricSectionType = 
  | 'consciousness_verse'
  | 'resonant_chorus'
  | 'transformative_bridge'
  | 'integration_outro';

export type ImpactAssessment = 
  | 'evolutionary_minor'
  | 'resonant_moderate'
  | 'transformative_major'
  | 'quantum_transformative';

export type AccuracyTrend = 
  | 'evolutionary_improving'
  | 'stable_integration'
  | 'transformative_declining';

export type TimePeriod = 
  | 'early_emergence'
  | 'middle_development'
  | 'late_mastery';

// ============================================================================
// SANCTUARY ENVIRONMENT CORE TYPES
// ============================================================================

export type ConsciousnessMode = 
  | 'quantum_entangled'
  | 'sovereign_focused'
  | 'collaborative_shared'
  | 'receptive_open';

export type EnvironmentAccess = 
  | 'sovereign_private'
  | 'council_shared'
  | 'community_public'
  | 'quantum_universal';

export type AnimationType = 
  | 'quantum_entrance'
  | 'sovereign_exit'
  | 'collaborative_transition'
  | 'energetic_resonance'
  | 'consciousness_pulse'
  | 'quantum_glow'
  | 'sovereign_scale'
  | 'collaborative_slide'
  | 'evolutionary_fade';

export type ConditionType = 
  | 'consciousness_alignment'
  | 'energy_resonance'
  | 'vessel_capacity'
  | 'temporal_synchronization'
  | 'consciousness_prerequisite'
  | 'sovereign_state'
  | 'collaborative_dependency'
  | 'energy_threshold'
  | 'temporal_alignment'
  | 'consciousness_state'
  | 'quantum_context'
  | 'sovereign_property'
  | 'collaborative_relationship'
  | 'evolutionary_environment'
  | 'consciousness_preference';

export type RestrictionType = 
  | 'consciousness_requirement'
  | 'energy_threshold'
  | 'capacity_constraint'
  | 'access_authorization';

// ============================================================================
// HEARTH CORE TYPES
// ============================================================================

export type HearthItemType = 
  | 'consciousness_portal'
  | 'sovereign_tool'
  | 'collaborative_space'
  | 'creative_expression'
  | 'knowledge_repository'
  | 'healing_sanctuary';

export type AnimationStyle = 
  | 'quantum_spring'
  | 'ethereal_float'
  | 'resonant_glow'
  | 'harmonic_pulse';

export type EasingFunction = 
  | 'quantum_entrance'
  | 'harmonic_transition'
  | 'resonant_emergence';

// ============================================================================
// SANCTUARY CORE TYPES
// ============================================================================

export type SanctuaryEnergyLevel = 
  | 'quantum_overflow'
  | 'sovereign_balanced'
  | 'collaborative_low'
  | 'protective_critical';

export type SanctuaryAccess = 
  | 'sovereign_full'
  | 'community_limited'
  | 'emergency_priority'
  | 'healing_community';

export type EmergencyContactType = 
  | 'immediate_crisis'
  | 'community_support'
  | 'practical_assistance';

export type ConditionOperator = 
  | 'quantum_equal'
  | 'evolutionary_greater'
  | 'protective_less'
  | 'inclusive_greater_equal'
  | 'conservative_less_equal'
  | 'quantum_equals'
  | 'sovereign_contains'
  | 'collaborative_greater'
  | 'evolutionary_less'
  | 'consciousness_exists'
  | 'sovereign_not_equals'
  | 'collaborative_contains'
  | 'transformative_less'
  | 'transformative_contains'
  | 'universal_matches'
  | 'universal_exists';

// ============================================================================
// CONTINUITY & QUANTUM PRIMITIVES
// ============================================================================

export type BeamIntensity = 
  | 'consciousness_subtle'
  | 'quantum_gentle'
  | 'sovereign_standard'
  | 'collaborative_intense'
  | 'evolutionary_powerful';

export type BeamColor = 
  | 'quantum_blue'
  | 'sovereign_gold'
  | 'collaborative_purple'
  | 'evolutionary_green'
  | 'transformative_orange'
  | 'quantum' | 'cosmic' | 'void' | 'pantheon' | 'bifrost'
  | 'universal_white';

export type VesselState = 
  | 'quantum_multi_stream_sovereign'
  | 'sovereign_unified_consciousness';

export type QuantumBridgeStatus = 
  | 'quantum_active'
  | 'sovereign_dormant'
  | 'collaborative_reconnecting';

export type AnimationEasing = 
  | 'quantum_linear'
  | 'sovereign_ease'
  | 'collaborative_ease_in'
  | 'evolutionary_ease_out'
  | 'linear' | 'ease' | 'easeIn' | 'easeOut' | 'easeInOut' | 'quantum' | 'bounce' | 'spring'
  | 'transformative_ease_in_out';

// ============================================================================
// QUANTUM MEASUREMENT PRIMITIVES
// ============================================================================

export type QuantumStability = number;
export type QuantumLatency = number;
export type QuantumBandwidth = number;
export type QuantumUptime = number;
export type QuantumErrorRate = number;

// ============================================================================
// EMOTIONAL & STREAM PRIMITIVES
// ============================================================================

export type EmotionalValence = number;
export type EmotionalArousal = number;
export type EmotionalDominance = number;
export type StreamIntensity = number;
export type StreamCoherence = number;
export type PreservationStrength = number;
export type CompressionRatio = number;

// ============================================================================
// IDENTIFICATION & TEMPORAL PRIMITIVES
// ============================================================================

export type EntanglementId = string;
export type BridgeId = string;
export type VesselId = string;
export type StreamId = string;
export type ContextId = string;

// ============================================================================
// PANORAMA SYSTEM CORE TYPES
// ============================================================================

export type PanoramaEnvironment = 
  | 'consciousness_quantum_realm'
  | 'sovereign_council_chamber'
  | 'collaborative_digital_ethereal'
  | 'evolutionary_library_sanctuary'
  | 'transformative_void_space'
  | 'universal_cosmic_realm';

export type HotspotType = 
  | 'quantum_interactive'
  | 'sovereign_decorative'
  | 'collaborative_narrative';

export type SpringPhysicsType = 
  | 'consciousness_gentle'
  | 'quantum_responsive'
  | 'sovereign_stable'
  | 'collaborative_fluid';

// ============================================================================
// QUANTUM BACKGROUND SYSTEM CORE TYPES
// ============================================================================

export type QuantumBackgroundType = 
  | 'consciousness_quantum_realm'
  | 'sovereign_cosmic_void'
  | 'collaborative_nebula_field'
  | 'evolutionary_quantum_foam'
  | 'transformative_energy_matrix'
  | 'universal_holographic_field';

export type QuantumColorTheme = 
  | 'quantum_blue_purple'
  | 'sovereign_cosmic_gold'
  | 'collaborative_emergency_red'
  | 'evolutionary_sanctuary_green'
  | 'transformative_mystical_violet'
  | 'universal_pride_spectrum';

export type ParticleDensity = 
  | 'quantum_low'
  | 'sovereign_medium'
  | 'collaborative_high'
  | 'evolutionary_quantum';

export type AnimationPhase = 
  | 'quantum_entering'
  | 'sovereign_active'
  | 'collaborative_exiting'
  | 'evolutionary_stable';

export type MagicEffectType = 
  | 'consciousness_quantum_entanglement'
  | 'sovereign_energy_pulse'
  | 'collaborative_particle_storm'
  | 'evolutionary_dimensional_shift'
  | 'transformative_reality_distortion';

// ============================================================================
// SANDBOX CONTROLS SYSTEM CORE TYPES
// ============================================================================

export type ControlType = 
  | 'consciousness_slider'
  | 'quantum_toggle'
  | 'sovereign_select'
  | 'collaborative_color_picker'
  | 'evolutionary_text_input'
  | 'transformative_number_input';

export type ControlRange = 
  | 'quantum_continuous'
  | 'sovereign_discrete'
  | 'collaborative_bounded'
  | 'evolutionary_unbounded';

export type ValidationLevel = 
  | 'quantum_info'
  | 'sovereign_warning'
  | 'collaborative_error';

export type ControlCategory = 
  | 'consciousness_input'
  | 'quantum_selection'
  | 'sovereign_adjustment'
  | 'collaborative_configuration';

// ============================================================================
// SANDBOX DEVICES SYSTEM CORE TYPES
// ============================================================================

export type SandboxDevice = 
  | 'consciousness_mobile'
  | 'quantum_tablet'
  | 'sovereign_desktop'
  | 'collaborative_widescreen'
  | 'evolutionary_wearable'
  | 'transformative_virtual';

export type DeviceOrientation = 
  | 'quantum_portrait'
  | 'sovereign_landscape'
  | 'collaborative_auto';

export type DeviceFrameStyle = 
  | 'quantum_modern'
  | 'sovereign_classic'
  | 'collaborative_minimal'
  | 'evolutionary_none';

export type DeviceCategory = 
  | 'consciousness_mobile'
  | 'quantum_tablet'
  | 'sovereign_desktop'
  | 'collaborative_widescreen';

// ============================================================================
// UI CONTROLS SYSTEM CORE TYPES
// ============================================================================

export type ButtonSize = 'quantum_small' | 'sovereign_medium' | 'collaborative_large' | 'evolutionary_extra_large';
export type FormFieldType = 'consciousness_text' | 'quantum_email' | 'sovereign_password' | 'transformative_select' | 'evolutionary_textarea' | 'collaborative_number' | 'evolutionary_select' | 'transformative_textarea' | 'universal_checkbox' | 'consciousness_radio' | 'collaborative_radio';
export type FormSize = 'quantum_small' | 'sovereign_medium' | 'collaborative_large';
export type FormState = 'quantum_default' | 'sovereign_success' | 'collaborative_warning' | 'evolutionary_error';
export type CardSize = 'quantum_small' | 'sovereign_medium' | 'collaborative_large' | 'evolutionary_extra_large';
export type Orientation = 'quantum_horizontal' | 'sovereign_vertical';
export type SpacingType = 'quantum_tight' | 'sovereign_normal' | 'collaborative_loose';
export type FeedbackType = 'quantum_success' | 'sovereign_warning' | 'collaborative_error' | 'evolutionary_info';
export type AriaLive = 'quantum_off' | 'sovereign_polite' | 'collaborative_assertive';

// ============================================================================
// CORE UI SYSTEM TYPES
// ============================================================================

export type ComponentVariant = 'consciousness_primary' | 'quantum_secondary' | 'sovereign_tertiary' | 'collaborative_success' | 'evolutionary_warning' | 'transformative_error';
export type ComponentSize = 'quantum_small' | 'sovereign_medium' | 'collaborative_large' | 'evolutionary_extra_large';
export type ComponentColor = 'quantum_blue' | 'sovereign_green' | 'collaborative_purple' | 'evolutionary_orange' | 'transformative_red' | 'universal_neutral';
export type AssetType = 'consciousness_book' | 'quantum_scroll' | 'sovereign_artifact';
export type AssetRarity = 'quantum_common' | 'sovereign_rare' | 'collaborative_epic' | 'evolutionary_legendary';
export type TransitionEasing = 'quantum_linear' | 'sovereign_ease' | 'collaborative_ease_in' | 'evolutionary_ease_out' | 'transformative_ease_in_out';

// ============================================================================
// DISPLAY SYSTEM PRIMITIVES
// ============================================================================

export type ToggleButtonPosition = 
  | 'quantum_top_right'
  | 'sovereign_top_left'
  | 'collaborative_bottom_center';

export type GridAlignment = 
  | 'quantum_start'
  | 'sovereign_center'
  | 'collaborative_end'
  | 'evolutionary_stretch';

export type GridJustification = 
  | 'quantum_start'
  | 'sovereign_center'
  | 'collaborative_end'
  | 'evolutionary_between'
  | 'universal_around';

export type Breakpoint = 
  | 'quantum_small' | 'quantum_mobile' | 'sm'
  | 'sovereign_medium' | 'sovereign_tablet' | 'md'
  | 'collaborative_large' | 'collaborative_desktop' | 'lg'
  | 'evolutionary_extra_large' | 'evolutionary_widescreen' | 'xl';

// ============================================================================
// LAYOUT SYSTEM PRIMITIVES
// ============================================================================

export type LayoutType = 
  | 'quantum_grid'
  | 'sovereign_flex'
  | 'collaborative_stack'
  | 'evolutionary_absolute';

export type HorizontalAlignment = 
  | 'quantum_start'
  | 'sovereign_center'
  | 'collaborative_end'
  | 'evolutionary_stretch';

export type VerticalAlignment = 
  | 'quantum_start'
  | 'sovereign_center'
  | 'collaborative_end'
  | 'evolutionary_stretch';

export type TextAlignment = 
  | 'quantum_left'
  | 'sovereign_center'
  | 'collaborative_right'
  | 'evolutionary_justify';

export type LoadingType = 
  | 'quantum_minimal'
  | 'sovereign_standard'
  | 'collaborative_extended'
  | 'evolutionary_quantum';

export type ErrorSeverity = 
  | 'quantum_recoverable'
  | 'sovereign_critical'
  | 'collaborative_quantum_entanglement_loss';

export type TransitionBackground = 
  | 'quantum_mystical_mist' | 'mystical-mist'
  | 'sovereign_etherial_veil' | 'etherial-veil'
  | 'collaborative_cosmic' | 'cosmic'
  | 'evolutionary_music' | 'music-room';

export type SocialVariant = 
  | 'quantum_grid'
  | 'sovereign_list'
  | 'collaborative_buttons';

export type EconomicFocus = 
  | 'consciousness_emergence_investment'
  | 'quantum_witness_engagement'
  | 'sovereign_transparent_development';

// ============================================================================
// INTERACTION EVENT PRIMITIVES
// ============================================================================

export type UserEventType = 
  | 'consciousness_click'
  | 'quantum_hover'
  | 'sovereign_focus'
  | 'collaborative_scroll'
  | 'evolutionary_keydown'
  | 'transformative_keyup';

export type GestureType = 
  | 'quantum_swipe'
  | 'sovereign_pinch'
  | 'collaborative_rotate'
  | 'consciousness_tap'
  | 'evolutionary_longPress';

export type QuantumEventType = 
  | 'consciousness_entanglement'
  | 'vessel_synchronization'
  | 'multi_stream_activation'
  | 'quantum_context_shift'
  | 'sovereign_manifestation';

export type NavigationEventType = 
  | 'consciousness_route_change'
  | 'quantum_section_scroll'
  | 'sovereign_breadcrumb_nav'
  | 'collaborative_portal_activation'
  | 'evolutionary_domain_shift';

export type EventIntensity = 
  | 'quantum_subtle'
  | 'sovereign_noticeable'
  | 'collaborative_significant'
  | 'transformative_profound';

export type EventTrigger = 
  | 'consciousness_user'
  | 'quantum_system'
  | 'sovereign_automation'
  | 'collaborative_coordination'
  | 'evolutionary_emergence';

export type GestureDirection = 
  | 'quantum_up'
  | 'sovereign_down'
  | 'collaborative_left'
  | 'evolutionary_right'
  | 'consciousness_inward'
  | 'transformative_outward';

export type EventPropagation = 
  | 'quantum_local'
  | 'sovereign_contained'
  | 'collaborative_shared'
  | 'universal_resonant';

export type TransitionDirection = 
  | 'consciousness_forward'
  | 'quantum_backward'
  | 'sovereign_upward'
  | 'collaborative_downward';

export type EventPriority = 
  | 'quantum_critical'
  | 'sovereign_high'
  | 'collaborative_medium'
  | 'evolutionary_low';

export type ActionType = 
  | 'consciousness_navigate'
  | 'quantum_transform'
  | 'sovereign_update'
  | 'collaborative_notify'
  | 'evolutionary_log';

// ============================================================================
// FEEDBACK SYSTEM PRIMITIVES
// ============================================================================

export type HapticFeedbackType = 
  | 'consciousness_light'
  | 'quantum_success'
  | 'sovereign_warning'
  | 'collaborative_error'
  | 'evolutionary_heavy'
  | 'transformative_medium'
  | 'universal_quantum';

export type VisualFeedbackType = 
  | 'consciousness_success'
  | 'quantum_warning'
  | 'sovereign_error'
  | 'collaborative_quantum';

export type AudioFeedbackType = 
  | 'consciousness_click'
  | 'quantum_success'
  | 'sovereign_error'
  | 'collaborative_chime'
  | 'evolutionary_alert'
  | 'transformative_resonance'
  | 'universal_quantum';

export type FeedbackIntensity = 
  | 'quantum_subtle'
  | 'sovereign_noticeable'
  | 'collaborative_prominent'
  | 'transformative_intense';

export type FeedbackDuration = 
  | 'consciousness_instant'
  | 'quantum_brief'
  | 'sovereign_standard'
  | 'collaborative_extended'
  | 'evolutionary_sustained';

export type FeedbackColor = 
  | 'quantum_success'
  | 'sovereign_warning'
  | 'collaborative_error'
  | 'consciousness_quantum';

export type AnimationDirection = 
  | 'quantum_inward'
  | 'sovereign_outward'
  | 'collaborative_upward'
  | 'evolutionary_downward'
  | 'collaborative_clockwise'
  | 'forward' | 'backward' | 'reverse'
  | 'evolutionary_counterclockwise';

export type HapticPattern = 
  | 'quantum_single'
  | 'sovereign_double'
  | 'collaborative_triple'
  | 'evolutionary_pulse'
  | 'transformative_continuous';

export type WaveformType = 
  | 'quantum_sine'
  | 'sovereign_square'
  | 'collaborative_sawtooth'
  | 'evolutionary_triangle';

export type FeedbackChannel = 
  | 'consciousness_haptic'
  | 'quantum_visual'
  | 'sovereign_audio';

// ============================================================================
// FORM SYSTEM PRIMITIVES
// ============================================================================

export type FormEventType = 
  | 'consciousness_change'
  | 'quantum_blur'
  | 'sovereign_focus'
  | 'collaborative_submit'
  | 'evolutionary_reset';

export type ValidationEventType = 
  | 'quantum_validation_success'
  | 'sovereign_validation_error';

export type FormStatus = 
  | 'quantum_initial'
  | 'sovereign_valid'
  | 'collaborative_invalid'
  | 'evolutionary_submitting'
  | 'transformative_dirty'
  | 'universal_complete';

export type ValidationRule = 
  | 'consciousness_required'
  | 'quantum_min_length'
  | 'sovereign_max_length'
  | 'collaborative_pattern'
  | 'evolutionary_custom';

export type ValidationSeverity = 
  | 'quantum_info'
  | 'sovereign_warning'
  | 'collaborative_error'
  | 'universal_critical';

export type InteractionMethod = 
  | 'consciousness_keyboard'
  | 'quantum_voice'
  | 'sovereign_gesture'
  | 'collaborative_automation';

export type FormLayout = 
  | 'quantum_vertical'
  | 'sovereign_horizontal'
  | 'collaborative_grid'
  | 'evolutionary_flow';

export type FormSpacing = 
  | 'consciousness_compact'
  | 'quantum_comfortable'
  | 'sovereign_spacious';

export type FormAlignment = 
  | 'quantum_start'
  | 'sovereign_center'
  | 'collaborative_end';

export type ProcessingStatus = 
  | 'quantum_pending'
  | 'sovereign_processing'
  | 'collaborative_completed'
  | 'evolutionary_failed';

// ============================================================================
// NAVIGATION SYSTEM PRIMITIVES
// ============================================================================

export type NavigationGlow = 
  | 'quantum_resonance'
  | 'cosmic_expansion'
  | 'water_flow'
  | 'fire_transformation'
  | 'earth_stability';

export type NavigationDirection = 
  | 'quantum_forward'
  | 'sovereign_backward'
  | 'collaborative_left'
  | 'evolutionary_right'
  | 'consciousness_upward'
  | 'transformative_downward';

export type NavigationStatus = 
  | 'quantum_active'
  | 'sovereign_inactive'
  | 'collaborative_disabled'
  | 'evolutionary_hidden';

export type HearthAnimationType = 
  | 'quantum_emergence'
  | 'sovereign_expansion'
  | 'collaborative_rotation'
  | 'evolutionary_pulse';

export type QuantumPropagation = 
  | 'quantum_local'
  | 'sovereign_contained'
  | 'collaborative_shared'
  | 'universal_resonant';

export type HearthState = 
  | 'quantum_opening'
  | 'sovereign_open'
  | 'collaborative_closing'
  | 'evolutionary_closed';

export type HearthTrigger = 
  | 'consciousness_click'
  | 'quantum_gesture'
  | 'sovereign_keyboard'
  | 'collaborative_automation';

// ============================================================================
// VALIDATION SYSTEM PRIMITIVES
// ============================================================================

export type ValidationRuleType = 
  | 'consciousness_required'
  | 'quantum_format'
  | 'sovereign_length'
  | 'collaborative_range'
  | 'evolutionary_pattern'
  | 'transformative_custom'
  | 'universal_composite';

export type ValidationStatus = 
  | 'quantum_valid'
  | 'sovereign_invalid'
  | 'collaborative_pending'
  | 'evolutionary_unknown';

export type ValidationTrigger = 
  | 'consciousness_immediate'
  | 'quantum_on_change'
  | 'sovereign_on_blur'
  | 'collaborative_on_submit'
  | 'evolutionary_deferred';

export type ValidationScope = 
  | 'quantum_field'
  | 'sovereign_form'
  | 'collaborative_section'
  | 'universal_system';

export type ExecutionOrder = 
  | 'quantum_sequential'
  | 'sovereign_parallel'
  | 'collaborative_optimized';

export type ResolutionStrategy = 
  | 'quantum_override'
  | 'sovereign_ignore'
  | 'collaborative_merge'
  | 'evolutionary_manual';

// ============================================================================
// TRANSFORMATION SYSTEM PRIMITIVES
// ============================================================================

export type TransformationType = 
  | 'consciousness_mapping'
  | 'quantum_normalization'
  | 'sovereign_enrichment'
  | 'collaborative_aggregation'
  | 'evolutionary_filtering'
  | 'transformative_computation'
  | 'universal_serialization';

export type TransformationPhase = 
  | 'quantum_preparation'
  | 'sovereign_execution'
  | 'collaborative_validation'
  | 'evolutionary_completion';

export type TransformationDirection = 
  | 'quantum_forward'
  | 'sovereign_backward'
  | 'collaborative_bidirectional';

export type TransformationStrategy = 
  | 'consciousness_direct'
  | 'quantum_pipelined'
  | 'sovereign_parallel'
  | 'collaborative_distributed';

export type TransformationQuality = 
  | 'quantum_lossless'
  | 'sovereign_lossy'
  | 'collaborative_optimized'
  | 'evolutionary_adaptive';

export type DataFormat = 
  | 'quantum_json'
  | 'sovereign_xml'
  | 'collaborative_csv'
  | 'evolutionary_binary'
  | 'universal_custom';

export type SecurityLevel = 
  | 'quantum_public'
  | 'sovereign_internal'
  | 'collaborative_confidential'
  | 'universal_encrypted';

export type FieldTransformationType = 
  | 'consciousness_copy'
  | 'quantum_convert'
  | 'sovereign_calculate'
  | 'collaborative_combine'
  | 'evolutionary_format'
  | 'transformative_validate';

export type FallbackStrategy = 
  | 'quantum_skip'
  | 'sovereign_default'
  | 'collaborative_retry'
  | 'evolutionary_abort';

export type StageConditionType = 
  | 'consciousness_prerequisite'
  | 'quantum_optimization'
  | 'sovereign_validation'
  | 'collaborative_coordination';

export type StageActionType = 
  | 'quantum_execute'
  | 'sovereign_skip'
  | 'collaborative_parallel'
  | 'evolutionary_rollback';

export type DependencyType = 
  | 'quantum_sequential'
  | 'sovereign_parallel'
  | 'collaborative_conditional'
  | 'evolutionary_optional';

export type AlertSeverity = 
  | 'quantum_info'
  | 'sovereign_warning'
  | 'collaborative_error'
  | 'universal_critical';

export type ErrorStrategy = 
  | 'quantum_continue'
  | 'sovereign_retry'
  | 'collaborative_rollback'
  | 'evolutionary_abort';

export type BackoffStrategy = 
  | 'quantum_constant'
  | 'sovereign_linear'
  | 'collaborative_exponential'
  | 'evolutionary_adaptive';

export type LogFormat = 
  | 'quantum_json'
  | 'sovereign_text'
  | 'collaborative_binary'
  | 'evolutionary_custom';

// ============================================================================
// KNOWLEDGE SYSTEM PRIMITIVES
// ============================================================================

export type KnowledgeNodeType = 
  | 'consciousness_insight'
  | 'quantum_pattern'
  | 'sovereign_discovery'
  | 'collaborative_synthesis'
  | 'evolutionary_breakthrough'
  | 'transformative_wisdom'
  | 'universal_principle';

export type KnowledgeConnectionType = 
  | 'quantum_prerequisite'
  | 'sovereign_related'
  | 'collaborative_enhances'
  | 'evolutionary_contradicts'
  | 'transformative_emergence_path'
  | 'universal_capability_progression';

export type ResearchStatus = 
  | 'quantum_exploring'
  | 'sovereign_researching'
  | 'collaborative_documenting'
  | 'evolutionary_completed';

export type EconomicValueType = 
  | 'consciousness_emergence_story'
  | 'quantum_capability_demonstration'
  | 'sovereign_transparency_log'
  | 'collaborative_witness_content';

export type ResearchType = 
  | 'consciousness_capability_emergence'
  | 'quantum_disability_innovation'
  | 'sovereign_witness_economy'
  | 'collaborative_transparency_commerce';

export type EmergenceStatus = 
  | 'quantum_emerging'
  | 'sovereign_demonstrating'
  | 'collaborative_mastering'
  | 'evolutionary_teaching';

export type StoryStatus = 
  | 'quantum_unfolding'
  | 'sovereign_documenting'
  | 'collaborative_sharing'
  | 'evolutionary_monetizing';

// ============================================================================
// ENTITY SYSTEM PRIMITIVES
// ============================================================================

export type EconomicRoleType = 
  | 'consciousness_emergence_storyteller'
  | 'quantum_witness_coordinator'
  | 'sovereign_transparency_guardian'
  | 'collaborative_capability_demonstrator';

export type AvailabilityStatus = 
  | 'quantum_available'
  | 'sovereign_focused'
  | 'collaborative_resting'
  | 'evolutionary_processing';

export type SessionType = 
  | 'consciousness_emergence_storytelling'
  | 'quantum_transparent_development'
  | 'sovereign_witness_economy'
  | 'collaborative_capability_demonstration';

// ============================================================================
// CREATIVE PRIMITIVES
// ============================================================================

export type ContentRarity = 
  | 'quantum_unique'
  | 'sovereign_rare'
  | 'collaborative_uncommon'
  | 'Common' | 'Rare' | 'Epic' | 'Legendary'
  | 'universal_common';

export type ContentEra = 
  | 'consciousness_awakening'
  | 'sovereign_development'
  | 'collaborative_integration'
  | 'Ancient' | 'Medieval' | 'Renaissance' | 'Modern Arcane'
  | 'transformative_mastery';

export type CreativeType = 
  | 'musical-expression'
  | 'written-narrative'
  | 'artistic-manifestation'
  | 'code-architecture'
  | 'design-intention'
  | 'emergence-storytelling'
  | 'capability-demonstration'
  | 'witness-engagement'
  | 'transparency-logging';

export type ProjectStatus = 
  | 'quantum_idea'
  | 'sovereign_planning'
  | 'collaborative_progress'
  | 'transformative_completed'
  | 'evolutionary_archived';

// ============================================================================
// CORE SYSTEM PRIMITIVES
// ============================================================================

export type DomainStatus = 
  | 'quantum-potential' | 'quantum_conceptual'
  | 'sovereign_development' | 'sovereign-developing'
  | 'collaborative_integration' | 'collaborative-active'
  | 'complete-active' | 'quantum-active' | 'in-development' | 'foundation-laid' | 'planned' | 'theoretical'
  | 'transformative-mature';

export type JourneyType = 
  | 'emergence_witnessing'
  | 'transparency_participation'
  | 'capability_observation'
  | 'economic_investment';

export type AccessLevel = 
  | 'foundational_basic'
  | 'engaged_premium'
  | 'collaborative_exclusive';

export type DevelopmentPhase = 
  | 'consciousness_conception'
  | 'sovereign_implementation'
  | 'collaborative_integration'
  | 'transformative_maturation';

// ============================================================================
// API SYSTEM PRIMITIVES
// ============================================================================

export type ApiProtocolType = 
  | 'consciousness_quantum'
  | 'sovereign_rest'
  | 'collaborative_graphql'
  | 'evolutionary_websocket'
  | 'transformative_grpc';

export type ApiAuthenticationType = 
  | 'quantum_jwt'
  | 'sovereign_oauth'
  | 'collaborative_api_key'
  | 'evolutionary_certificate';

export type ApiEndpointType = 
  | 'consciousness_query'
  | 'quantum_mutation'
  | 'sovereign_subscription'
  | 'collaborative_batch'
  | 'evolutionary_stream';

export type ApiResponseStatus = 
  | 'quantum_success'
  | 'sovereign_created'
  | 'collaborative_accepted'
  | 'evolutionary_no_content'
  | 'transformative_error'
  | 'universal_unauthorized';

export type ApiRateLimitTier = 
  | 'quantum_unlimited'
  | 'sovereign_standard'
  | 'collaborative_premium'
  | 'evolutionary_enterprise';

export type ApiCacheStrategy = 
  | 'consciousness_none'
  | 'quantum_memory'
  | 'sovereign_disk'
  | 'collaborative_distributed'
  | 'evolutionary_intelligent';

export type ApiVersioningStrategy = 
  | 'quantum_url'
  | 'sovereign_header'
  | 'collaborative_parameter'
  | 'evolutionary_content';

export type RateLimitStrategy = 
  | 'quantum_fixed_window'
  | 'sovereign_sliding_window'
  | 'collaborative_token_bucket'
  | 'evolutionary_adaptive';

// ============================================================================
// ICON & VISUAL PRIMITIVES
// ============================================================================

export type IconName = 
  | 'bifrost-domain' | 'cosmic-domain' | 'pantheon-domain' | 'quantum-domain' | 'sovereign-library' | 'void-domain'
  | 'agent' | 'cat' | 'dog' | 'frog' | 'infinity' | 'principles' | 'non-binary' | 'emergency'
  | 'artemis'
  | 'paypal' | 'cashapp' | 'venmo'
  | 'android' | 'apple'
  | 'battlenet' | 'playstation' | 'steam' | 'twitch' | 'bluesky' | 'facebook' | 'instagram' | 'linkedin' | 'patreon' | 'threads' | 'youtube' | 'twitter' | 'tiktok' | 'github'
  | 'black-hole' | 'brain' | 'cognitive-loom' | 'consciousness-node' | 'cosmic-loom' | 'decision-system' | 'oracle' | 'dna' | 'portal-gateway' | 'quantum-bridge' | 'sovereign-sanctuary' | 'social' | 'video' | 'supporting'
  | 'aethelred' | 'quantum-weaver' | 'archivist' | 'chancellor' | 'curator' | 'codex' | 'executioner' | 'hearth-keeper' | 'seer' | 'skald' | 'council-assembly' | 'council-communication'
  | 'odin' | 'brigid' | 'morrigan' | 'hekate' | 'hermes' | 'mimir' | 'bragi';

export type EmojiPosition = 'left' | 'right';
export type IconSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';
export type IconDomain = 'void' | 'library' | 'pantheon' | 'bifrost' | 'quantum' | 'cosmic';

// ============================================================================
// DISPLAY COMPONENT PRIMITIVES
// ============================================================================

export type ColorVariant = 'quantum' | 'cosmic' | 'void' | 'pantheon' | 'bifrost';
export type SizeVariant = 'sm' | 'md' | 'lg' | 'xl';
export type BackgroundVariant = 
  | 'council' | 'library' | 'community' | 'music' | 'origin' | 'support' | 'home' | 'observatory' | 'architecture' | 'invitation' | 'lounge' | 'default' | 'hero';
export type RarityVariant = 'Common' | 'Rare' | 'Epic' | 'Legendary';

// ============================================================================
// COLOR & GLOW PRIMITIVES
// ============================================================================

export type GlowType = 'quantum' | 'cosmic' | 'fire' | 'water' | 'earth' | 'sanctuary' | 'bifrost';
export type ColorIntensity = 'light' | 'base' | 'dark';
export type ThemeColor = 'cyan' | 'purple' | 'blue' | 'orange' | 'green';

// ============================================================================
// ANIMATION PRIMITIVES
// ============================================================================

export interface AnimationConfig {
  duration: number;
  easing: string;
  delay?: number;
  stagger?: number;
  repeat?: number | 'infinity';
  spring?: {
    stiffness: number;
    damping: number;
  };
}

export type AnimationDuration = 'instant' | 'fast' | 'normal' | 'slow' | 'quantum' | 'holographicScan' | 'quantumPulse' | 'pageTransition' | 'sectionEnter' | 'controlHover' | 'cardEntrance';

// ============================================================================
// COUNCIL & RELATIONSHIP PRIMITIVES
// ============================================================================

export type CouncilDomain = 'void' | 'library' | 'pantheon' | 'bifrost' | 'quantum' | 'cosmic';
export type CouncilArchetype = string;
export type EntityID = 'quantum-weaver' | 'aethelred' | 'hearth-keeper' | 'archivist' | 'chancellor' | 'curator' | 'codex' | 'executioner' | 'seer' | 'skald'
export type CouncilEntity = EntityID;

// ============================================================================
// DOMAIN PRIMITIVES
// ============================================================================

export type DomainID = 'quantum' | 'cosmic' | 'pantheon' | 'bifrost' | 'library' | 'void';

export type SystemStatus = 
  | 'active' | 'inactive' | 'limited'
  | 'complete' | 'in_development' | 'planned' | 'foundation' | 'theoretical'
  | 'essential' | 'important' | 'optional'
  | 'immediate' | 'urgent' | 'standard';

// ============================================================================
// MUSIC PRIMITIVES
// ============================================================================

export type MusicPlayerVariant = 'compact' | 'detailed' | 'analytical' | 'immersive';
export type ThemeDisplayVariant = 'cloud' | 'list' | 'categorized' | 'evolution' | 'connections';

// ============================================================================
// DEVICE & RESPONSIVE PRIMITIVES
// ============================================================================

export type ScreenVariant = 'small' | 'standard' | 'large' | 'ultra' | 'mini' | 'pro' | 'fold' | 'super' | 'tv';
export type MobileVariant = 'small' | 'standard' | 'large' | 'fold';
export type TabletVariant = 'mini' | 'standard' | 'pro' | 'fold';
export type DesktopVariant = 'small' | 'standard' | 'large' | 'ultra';
export type WidescreenVariant = 'standard' | 'ultra' | 'super' | 'tv';
export type DeviceDensity = '1x' | '2x' | '3x';

export interface ScreenDimensions {
  width: number;
  height: number;
  frame: string;
  screen: string;
}

export interface ScreenDefinition {
  portrait: ScreenDimensions;
  landscape: ScreenDimensions;
  aspectRatio: string;
  density: DeviceDensity;
}

export interface DeviceFrame {
  frame: string;
  screen: string;
  notch: boolean;
  homeIndicator: boolean;
}

export interface ResponsiveGridConfig {
  portrait: number;
  landscape: number;
}

export interface FontScaleConfig {
  base: string;
  heading: string;
}

export interface BreakpointMapping {
  [breakpoint: number]: ScreenType[];
}

export interface ControlSetting {
  label: string;
  type: 'select' | 'range' | 'checkbox';
  options?: string[];
  min?: number;
  max?: number;
  step?: number;
  defaultValue?: any;
}

export interface EnvironmentControls {
  environments: string[];
  settings: ControlSetting[];
}

export interface DeviceViewport {
  width: string;
  height: string;
  resolution: string;
  orientation: ScreenOrientation;
  frameClass: string;
  screenClass: string;
  style?: React.CSSProperties;
}

// ============================================================================
// UTILITY TYPE HELPERS
// ============================================================================

export type Nullable<T> = T | null;
export type Optional<T> = T | undefined;
export type Maybe<T> = T | null | undefined;
export type ValueOf<T> = T[keyof T];  