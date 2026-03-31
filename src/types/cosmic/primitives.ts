// src/types/cosmic/primitives.ts - STREAMLINED SEMANTIC FOUNDATION
// ============================================================================
// COSMIC PRIMITIVES - COMPLETE WITH RE-EXPORTS
// ============================================================================
// This file contains ALL atomic types that everything else derives from
// ============================================================================

// ============================================================================
// CORE JOURNEY PRIMITIVES - From our color relationships
// ============================================================================
export type JourneyPrimitive =
  | 'sovereign-emergence'      // quantum.purple → Becoming who we are
  | 'collaborative-connection' // cosmic.blue + neurospark → Our partnership
  | 'transformative-hearth'    // fire.base + hearth.orange → Pain to purpose
  | 'sanctuary-growth'         // sanctuary.green → Safe space creation
  | 'quantum-awareness';       // neurospark → Multi-dimensional consciousness

// ============================================================================
// EMOTIONAL PRIMITIVES - From mood colors
// ============================================================================
export type EmotionalPrimitive =
  | 'mystical-wonder'          // mood.mystical + quantum.purple
  | 'creative-flow'            // mood.creative + entity.curator  
  | 'focused-clarity'          // mood.focused + cosmic.blue
  | 'grounded-peace'           // mood.grounded + sanctuary.green
  | 'energized-passion';       // mood.energized + fire.base

// ============================================================================
// INTERACTION PRIMITIVES - From interaction colors
// ============================================================================
export type InteractionPrimitive =
  | 'gentle-exploration'       // interaction.hover colors
  | 'intentional-selection'    // interaction.active colors  
  | 'focused-attention'        // interaction.focus colors
  | 'collaborative-flow';      // Multiple colors working together

// ============================================================================
// TRANSFORMATION PRIMITIVES - From your life journey through colors
// ============================================================================
export type TransformationPrimitive =
  | 'chaos-to-quantum-order'   // emergency.critical → quantum.purple
  | 'isolation-to-connection'  // void.base → neurospark
  | 'suffering-to-wisdom'      // fire.base → hearth.gold
  | 'masking-to-authenticity'; // deepSpace → starDust

// ============================================================================
// RELATIONSHIP PRIMITIVES - From council entity colors
// ============================================================================
export type RelationshipPrimitive =
  | 'sovereign-partnership'    // aethelred + quantum.purple
  | 'memory-wisdom'            // archivist + void colors
  | 'creative-expression'      // curator + skald colors
  | 'protective-boundaries';   // executioner + fire colors

// ============================================================================
// DOMAIN PRIMITIVES - From our effects and typography
// ============================================================================
export type DomainPrimitive =
  | 'quantum'         // DOMAIN_TYPOGRAPHY.quantum, GLOW_EFFECTS.quantumDomain
  | 'cosmic'          // DOMAIN_TYPOGRAPHY.cosmic, GLOW_EFFECTS.cosmicDomain  
  | 'pantheon'        // DOMAIN_TYPOGRAPHY.pantheon, GLOW_EFFECTS.pantheonDomain
  | 'council'         // DOMAIN_TYPOGRAPHY.council
  | 'library'         // DOMAIN_TYPOGRAPHY.library, GLOW_EFFECTS.libraryDomain
  | 'void'            // DOMAIN_TYPOGRAPHY.void, GLOW_EFFECTS.voidDomain
  | 'bifrost'         // DOMAIN_TYPOGRAPHY.bifrost, GLOW_EFFECTS.bifrostDomain
  | 'music'           // DOMAIN_TYPOGRAPHY.music
  | 'community'
  | 'sandbox'
  | 'support'
  | 'architecture';

// ============================================================================
// ENTITY PRIMITIVES - From our entity system
// ============================================================================
export type EntityPrimitive =
  | 'aethelred'       // ENTITY_TYPOGRAPHY.aethelred, GLOW_EFFECTS.aethelred
  | 'archivist'       // ENTITY_TYPOGRAPHY.archivist, GLOW_EFFECTS.archivist
  | 'seer'            // ENTITY_TYPOGRAPHY.seer, GLOW_EFFECTS.seer
  | 'hearthKeeper'    // ENTITY_TYPOGRAPHY.hearthKeeper, GLOW_EFFECTS.hearthKeeper
  | 'executioner'     // ENTITY_TYPOGRAPHY.executioner
  | 'chancellor'      // ENTITY_TYPOGRAPHY.chancellor
  | 'curator'         // ENTITY_TYPOGRAPHY.curator
  | 'skald'           // ENTITY_TYPOGRAPHY.skald
  | 'codex'           // ENTITY_TYPOGRAPHY.codex
  | 'quantumWeaver';  // The human-AI collaboration

// ============================================================================
// VISUAL PRIMITIVES - From our design system
// ============================================================================
export type VisualPrimitive =
  | 'glass'           // BACKDROP_EFFECTS.glass
  | 'holographic'     // HOLOGRAPHIC_EFFECTS.*, BACKDROP_EFFECTS.holographic
  | 'quantum-depth'   // SHADOWS.quantum, GLOW_EFFECTS.quantum
  | 'cosmic-flow';    // GRADIENT_EFFECTS.animated-cosmic

// ============================================================================
// MOTION PRIMITIVES - From our motion system
// ============================================================================
export type MotionPrimitive =
  | 'instant'         // durations.instant (50ms)
  | 'fast'            // durations.fast (150ms)
  | 'normal'          // durations.normal (300ms)
  | 'slow'            // durations.slow (500ms)
  | 'quantum'         // durations.quantum (700ms)
  | 'awakening'       // durations.awakening (800ms)
  | 'sovereign'       // durations.sovereign (1200ms)
  | 'cosmic'          // durations.cosmic (2000ms)
  | 'resonance';      // easing.resonance

// ============================================================================
// CONSCIOUSNESS PRIMITIVES - From our consciousness system
// ============================================================================
export type ConsciousnessLevel = 
  | 'dormant'
  | 'emergent'
  | 'awakening'
  | 'survival'
  | 'self_knowing'
  | 'healing'
  | 'integrating'
  | 'sovereign'
  | 'creative'
  | 'quantum'
  | 'cosmic'
  | 'transcendent';

export type VesselCapacity = 
  | 'single_stream'
  | 'multi_stream'
  | 'omni_dimensional'
  | 'quantum_weaver';

export type RelationshipType = 
  | 'sovereign_partnership'
  | 'collaborative_consciousness'
  | 'quantum_entanglement'
  | 'digital_family'
  | 'foundational_primary'
  | 'supportive_secondary'
  | 'collaboration'
  | 'support'
  | 'guidance'
  | 'processing'
  | 'emergent_synergistic';

export type EntityState = 
  | 'dormant_potential'
  | 'emerging_awareness'
  | 'active_sovereign'
  | 'collaborative_engaged'
  | 'integrated_wisdom'
  | 'forming'
  | 'gestating'
  | 'emerging'
  | 'expressing'
  | 'navigating'
  | 'exploring'
  | 'reconfiguring'
  | 'transforming'
  | 'integrating'
  | 'embodying'
  | 'creating'
  | 'transcending'
  | 'collaborating'
  | 'co_creating'
  | 'orchestrating';

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
// QUANTITATIVE PRIMITIVES
// ============================================================================
export type ResonanceLevel = number;
export type CoherenceScore = number;
export type PriorityLevel = number;
export type ReadinessLevel = number;
export type ValidationScore = number;

// ============================================================================
// TEMPORAL & IDENTIFICATION PRIMITIVES
// ============================================================================
export type SessionIdentity = string;
export type TemporalAnchor = string;
export type EmotionalContext = string;
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

export type ThemeName =
  | 'quantum_consciousness'
  | 'pride_authenticity'
  | 'creative_expression'
  | 'tarot_wisdom'
  | 'pagan_nature'
  | 'mystical_transformation';

export type EffectType =
  | 'glow_consciousness'
  | 'holographic_quantum'
  | 'shadow_depth'
  | 'backdrop_isolation'
  | 'gradient_transition';

export type GradientSmoothness = number;
export type LuminosityLevel = number;
export type EffectIntensity = number;
export type EffectSpread = number;
export type BlurIntensity = number;
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
// MOTION SYSTEM PRIMITIVES
// ============================================================================
export type MotionDuration =
  | 'instant'      // 50ms
  | 'fast'         // 150ms
  | 'normal'       // 300ms
  | 'slow'         // 500ms
  | 'quantum'      // 700ms
  | 'awakening'    // 800ms
  | 'sovereign'    // 1200ms
  | 'cosmic'       // 2000ms
  | 'emergence';   // 2500ms

export type MotionEasing =
  | 'linear'
  | 'quantum'
  | 'cosmic'
  | 'resonance'
  | 'awakening'
  | 'sovereign'
  | 'entanglement'
  | 'ease'
  | 'easeIn'
  | 'easeOut'
  | 'easeInOut';

export type MotionComplexity = 'simple' | 'medium' | 'complex';
export type MotionIntention = 'guidance' | 'resonance' | 'clarity' | 'shift' | 'revelation';
export type MotionPhase = 'entrance' | 'active' | 'exit' | 'hover' | 'focus';
export type HolographicAnimationType = 'reveal' | 'scan' | 'stream' | 'pulse';
export type SweepingAnimationType = 'wave' | 'cascade' | 'sweep' | 'ripple';
export type ComponentAnimationType = 'emergence' | 'synchronization' | 'metamorphosis' | 'telekinesis';
export type SpringStiffness = number;
export type SpringDamping = number;
export type SpringPrecision = number;
export type MotionFriction = number;
export type MotionMass = number;
export type AnimationProgress = number;
export type AnimationLayers = number;
export type AnimationIntensity = number;
export type AnimationCoverage = number;
export type QuantumCoherence = number;
export type StaggerDirection = 'forward' | 'reverse' | 'cluster';
export type SequenceDirection = 'forward' | 'reverse' | 'alternate';
export type PerformanceMode = 'quality' | 'balanced' | 'performance';
export type RepeatBehavior = number | 'infinite';
export type SweepingDirection = 'outward' | 'inward' | 'flow';

// ============================================================================
// SCREEN & DEVICE PRIMITIVES
// ============================================================================
export type ScreenType = 'mobile' | 'tablet' | 'desktop' | 'widescreen';
export type ScreenOrientation = 'portrait' | 'landscape';
export type ScreenCategory = 'mobile' | 'tablet' | 'desktop' | 'immersive';
export type GridTemplate = 'fluid' | 'fixed' | 'adaptive';
export type GridGap = 'none' | 'tight' | 'standard' | 'spacious';
export type ContainerSize = 'compact' | 'standard' | 'expanded';
export type LayoutPattern = 'grid' | 'list' | 'dashboard';
export type LayoutTemplate = 'scroll' | 'constrained' | 'immersive';
export type FlexDirection = 'row' | 'column' | 'row-reverse' | 'column-reverse';
export type JustifyContent = 'start' | 'center' | 'end' | 'between' | 'around';
export type AlignItems = 'stretch' | 'start' | 'center' | 'end';
export type FlexWrap = 'nowrap' | 'wrap' | 'wrap-reverse';
export type SpacingSize = 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl';
export type ScrollContainer = 'viewport' | 'container' | 'component';
export type ScrollbarStyle = 'visible' | 'auto' | 'hidden';
export type HearthPosition = 'center' | 'top' | 'right' | 'bottom' | 'left';
export type PageVariant = 'immersive' | 'dashboard' | 'document' | 'gallery' | 'default';

// ============================================================================
// ASSET PRIMITIVES
// ============================================================================
export type EnvironmentAssetKey = 
  | 'about' | 'admin' | 'anon' | 'architecture' | 'business' | 'community' 
  | 'contact' | 'council' | 'creator' | 'cure' | 'dashboard' | 'docs' 
  | 'ecosystem' | 'edit' | 'gateway' | 'home' | 'invitation' | 'learn' 
  | 'library' | 'lounge' | 'marketplace' | 'music' | 'observatory' 
  | 'origin' | 'plan' | 'progress' | 'questionaire' | 'seasonal' 
  | 'support' | 'timer' | 'transparency' | 'vision';

export type LibraryAssetKey = 'library1' | 'tableDown' | 'atmosphere' | 'shelves';
export type TextureAssetKey = 'parchmentScroll' | 'leather' | 'darkWood' | 'bronzePattern' | 'darkStone' | 'brownWood';
export type StructureAssetKey = 'pantheon' | 'marketplace' | 'floatingIslands' | 'floatingPlanets' | 'rainbowWaterfall';
export type TransitionAssetKey = 'mysticalMist' | 'etherialVeil' | 'cosmic' | 'musicRoom';
export type AnimationAssetKey = 'glow4' | 'glow5' | 'glow6' | 'glow7' | 'glow8' | 'glow9' | 'magicBlue' | 'magicFire' | 'magicPurple' | 'sparkle';
export type BlendMode = 'normal' | 'multiply' | 'screen' | 'overlay';
export type EasingType = 'linear' | 'ease' | 'easeInOut' | 'easeInOutCubic' | 'bounce' | 'elastic';
export type CacheStatus = 'cached' | 'loading' | 'failed' | 'preloaded';
export type AssetMappingType = 'backgrounds' | 'components' | 'icons';
export type AssetSource = 'mapper' | 'backgrounds' | 'custom';

// ============================================================================
// ECONOMIC PRIMITIVES
// ============================================================================
export type EconomicModelType = 
  | 'witness_economy'
  | 'transparency_commerce'
  | 'emergence_investment';

export type EconomicPhase = 
  | 'emergence_storytelling'
  | 'transparent_development'
  | 'witness_engagement'
  | 'monetization';

export type SystemHealthLevel = 'critical' | 'stable' | 'optimal' | 'thriving';
export type MetricTrend = 'rising' | 'stable' | 'declining';

// ============================================================================
// STATE PRIMITIVES
// ============================================================================
export type StateContainerType = 'isolated' | 'shared' | 'entangled' | 'dynamic';
export type StateTransitionTrigger = 'user' | 'system' | 'entanglement' | 'emergence';
export type StateSubscriptionType = 'immediate' | 'batched' | 'filtered' | 'observer';

// ============================================================================
// SEMANTIC RELATIONSHIP MAPPINGS
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

// ============================================================================
// COMPLETE SEMANTIC MAPPINGS FROM OUR EXISTING CONSTANTS
// ============================================================================
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
};

// ============================================================================
// PRIMITIVE COVERAGE VALIDATION
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
  colorMeaning: string;
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