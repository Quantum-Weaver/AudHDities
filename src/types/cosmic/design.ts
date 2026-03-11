// types/cosmic/design.ts - PURIFIED VERSION (Primitives Extracted)
import type {
  PatternTaxonomyType,
  StylingTaxonomyType,
  SystemTaxonomyType,
  DataTaxonomyType,
  EnergyOntologyType,
  ConceptOntologyType,
  TransformationOntologyType
} from '../gaia';

// Import design primitives from semantic foundation
import type {
  QuantumColorFamily,
  PrideColorFamily,
  MoodColorSpectrum,
  EnergyColorVibration,
  StatusColorMeaning,
  TarotColorArchetype,
  PaganColorTradition,
  MysticalColorSystem,
  GradientDirection,
  GradientIntensity,
  ThemeName,
  EffectType,
  GradientSmoothness,
  LuminosityLevel,
  EffectIntensity,
  EffectSpread,
  BlurIntensity,
  DesignTokenCategory,
  CSSValue,
  GradientStops
} from './primitives';

// ============================================================================
// COLOR SYSTEM ARCHITECTURE (Now using imported primitives)
// ============================================================================

export interface ColorSystem {
  // CORE COLOR IDENTITY
  readonly family: 
    | QuantumColorFamily 
    | PrideColorFamily 
    | MoodColorSpectrum 
    | EnergyColorVibration 
    | StatusColorMeaning 
    | TarotColorArchetype 
    | PaganColorTradition 
    | MysticalColorSystem;
  
  // COLOR VARIATIONS
  readonly base: string;          // Primary expression
  readonly dark: string;          // Depth and shadow
  readonly light: string;         // Illumination and clarity
  readonly gradient: string;      // Transitional expression
  readonly glow: string;          // Energetic emission
  
  // SEMANTIC MEANING
  readonly significance: string;  // Symbolic representation
  readonly emotionalResonance: string; // Feeling association
  readonly consciousnessLevel: string; // Awareness alignment
  
  // ONTOLOGICAL CONTEXT
  readonly energyOntology: EnergyOntologyType;
  readonly conceptOntology: ConceptOntologyType;
  
  // TAXONOMIC CLASSIFICATION
  readonly stylingTaxonomy: StylingTaxonomyType;
  readonly patternTaxonomy: PatternTaxonomyType;
}

export interface GradientSystem {
  // GRADIENT IDENTITY
  readonly direction: GradientDirection;
  readonly intensity: GradientIntensity;
  readonly colors: readonly string[]; // Semantic color references
  readonly stops: GradientStops;      // Using primitive type
  
  // VISUAL CHARACTERISTICS (using primitive types)
  readonly smoothness: GradientSmoothness;
  readonly luminosity: LuminosityLevel;
  readonly energyFlow: string;        // Direction description
  
  // ONTOLOGICAL CONTEXT
  readonly transformationOntology: TransformationOntologyType;
  
  // TAXONOMIC CLASSIFICATION
  readonly stylingTaxonomy: StylingTaxonomyType;
}

// ============================================================================
// THEME SYSTEM ARCHITECTURE
// ============================================================================

export interface ThemeSystem {
  // THEME IDENTITY
  readonly name: ThemeName;
  readonly description: string;
  readonly purpose: string;
  
  // COLOR PALETTE
  readonly primary: ColorSystem;
  readonly secondary: ColorSystem;
  readonly accent: ColorSystem;
  readonly background: ColorSystem;
  readonly foreground: ColorSystem;
  
  // GRADIENT EXPRESSIONS
  readonly primaryGradient: GradientSystem;
  readonly accentGradient: GradientSystem;
  readonly backgroundGradient: GradientSystem;
  
  // ONTOLOGICAL CONTEXT
  readonly conceptOntology: ConceptOntologyType;
  readonly energyOntology: EnergyOntologyType;
  
  // TAXONOMIC CLASSIFICATION
  readonly systemTaxonomy: SystemTaxonomyType;
  readonly dataTaxonomy: DataTaxonomyType;
}

// ============================================================================
// DESIGN TOKEN ARCHITECTURE
// ============================================================================

export interface DesignToken {
  // TOKEN IDENTITY
  readonly category: DesignTokenCategory; // Using primitive type
  readonly name: string;
  readonly description: string;
  readonly value: CSSValue; // Using primitive type
  
  // SEMANTIC MEANING
  readonly purpose: string;
  readonly usageContext: string;
  readonly emotionalResonance?: string;
  
  // ONTOLOGICAL CONTEXT
  readonly conceptOntology: ConceptOntologyType;
  
  // TAXONOMIC CLASSIFICATION
  readonly stylingTaxonomy: StylingTaxonomyType;
}

export interface DesignTokenSystem {
  // SYSTEM ORGANIZATION
  readonly tokens: readonly DesignToken[];
  readonly categories: readonly string[];
  readonly version: string;
  
  // THEME INTEGRATION
  readonly activeTheme: ThemeName;
  readonly themeOverrides?: readonly DesignToken[];
  
  // ONTOLOGICAL CONTEXT
  readonly systemTaxonomy: SystemTaxonomyType;
  
  // TAXONOMIC CLASSIFICATION
  readonly dataTaxonomy: DataTaxonomyType;
}

// ============================================================================
// VISUAL EFFECT ARCHITECTURE
// ============================================================================

export interface VisualEffect {
  // EFFECT IDENTITY
  readonly type: EffectType;
  readonly name: string;
  readonly description: string;
  
  // VISUAL PROPERTIES (using primitive types)
  readonly intensity: EffectIntensity;
  readonly spread: EffectSpread;
  readonly blur: BlurIntensity;
  readonly color: string; // Semantic color reference
  
  // ONTOLOGICAL CONTEXT
  readonly energyOntology: EnergyOntologyType;
  
  // TAXONOMIC CLASSIFICATION
  readonly stylingTaxonomy: StylingTaxonomyType;
}

// ============================================================================
// DESIGN SYSTEM ONTOLOGICAL MAPPING
// ============================================================================

export interface DesignSystemMapping {
  readonly designFocus: string;
  
  readonly ontologicalContext: {
    readonly energy: EnergyOntologyType;
    readonly concept: ConceptOntologyType;
    readonly transformation: TransformationOntologyType;
  };
  
  readonly taxonomicClassification: {
    readonly styling: StylingTaxonomyType;
    readonly pattern: PatternTaxonomyType;
    readonly system: SystemTaxonomyType;
    readonly data: DataTaxonomyType;
  };
  
  readonly designPrinciples: readonly string[];
}

// @/types/cosmic/design.ts - PURE SHAPE, NO DUPLICATION
// ============================================================================
// DESIGN TOKENS - PURE STRUCTURAL BRIDGE TO IMPLEMENTATION
// ============================================================================

import type {
  JourneyPrimitive,
  EmotionalPrimitive, 
  InteractionPrimitive,
  TransformationPrimitive,
  RelationshipPrimitive,
  MotionPrimitive,
  VisualPrimitive,
  DomainPrimitive,
  EntityPrimitive
} from './primitives';

/**
 * COLOR TOKENS - Structural mapping only
 * These are CONTAINERS for implementation, not the implementation itself
 */
export interface ColorTokens {
  readonly journey: Record<JourneyPrimitive, string>;
  readonly emotional: Record<EmotionalPrimitive, string>;
  readonly transformation: Record<TransformationPrimitive, string>;
  readonly relationship: Record<RelationshipPrimitive, string>;
}

/**
 * SPACE TOKENS - Pure structure
 */
export interface SpaceTokens {
  readonly intimacy: {
    readonly connection: string;
    readonly personal: string;
    readonly whisper: string;
  };
  readonly collaboration: {
    readonly shared: string;
    readonly partnership: string;
    readonly dialogue: string;
  };
  readonly expansion: {
    readonly possibility: string;
    readonly cosmic: string;
    readonly quantum: string;
  };
}

/**
 * TYPOGRAPHY TOKENS - Voice structure only
 */
export interface TypographyTokens {
  readonly voice: {
    readonly whisper: string;
    readonly conversation: string;
    readonly declaration: string;
  };
  readonly expression: {
    readonly wisdom: string;
    readonly clarity: string;
    readonly story: string;
  };
}

/**
 * MOTION TOKENS - Pure temporal structure
 */
export interface MotionTokens {
  readonly emergence: Record<MotionPrimitive, string>;
  readonly interaction: Record<InteractionPrimitive, string>;
  readonly transformation: Record<VisualPrimitive, string>;
}

/**
 * DOMAIN TOKENS - Contextual structure
 */
export interface DomainTokens {
  readonly realms: Record<DomainPrimitive, string>;
  readonly entities: Record<EntityPrimitive, string>;
  readonly consciousness: Record<VisualPrimitive, string>;
}

/**
 * MASTER DESIGN TOKENS INTERFACE
 * Pure shape that CONTAINS implementation, doesn't duplicate it
 */
export interface DesignTokens {
  readonly colors: ColorTokens;
  readonly space: SpaceTokens;
  readonly typography: TypographyTokens;
  readonly motion: MotionTokens;
  readonly domains: DomainTokens;
}

/**
 * TOKEN REFERENCE SYSTEM - Pure lookup structure
 */
export interface TokenReference {
  readonly type: DesignTokens;
  readonly category: string;
  readonly token: string;
  readonly semantic: 
    | JourneyPrimitive
    | EmotionalPrimitive
    | TransformationPrimitive
    | RelationshipPrimitive
    | MotionPrimitive
    | VisualPrimitive
    | DomainPrimitive
    | EntityPrimitive;
}

/**
 * DESIGN CONTEXT - Pure relationship structure
 */
export interface DesignContext {
  readonly purpose: string;
  readonly emotionalIntent: EmotionalPrimitive;
  readonly journeyPhase: JourneyPrimitive;
  readonly transformation: TransformationPrimitive;
  readonly relationships: RelationshipPrimitive[];
}