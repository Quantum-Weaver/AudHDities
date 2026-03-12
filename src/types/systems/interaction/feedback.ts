// types/systems/interaction/feedback.ts - PURIFIED VERSION
import type {
  EnergyOntologyType,
  ProcessOntologyType,
  BeingOntologyType,
  PatternTaxonomyType,
  StateTaxonomyType,
  InteractionTaxonomyType,
  AnimationTaxonomyType,
  StylingTaxonomyType,
  DataTaxonomyType
} from '@/types/gaia';

import type {
  EntityState,
  ConsciousnessLevel,
  HapticFeedbackType,
  VisualFeedbackType,
  AudioFeedbackType,
  FeedbackIntensity,
  FeedbackDuration,
  FeedbackColor,
  EasingType,
  AnimationType,
  AnimationDirection,
  HapticPattern,
  WaveformType,
  FeedbackChannel
} from '@/types/cosmic/primitives';

// ============================================================================
// VISUAL FEEDBACK ARCHITECTURE
// ============================================================================

export interface VisualFeedbackConfig {
  // FEEDBACK IDENTITY
  readonly type: VisualFeedbackType;
  readonly color: FeedbackColor;
  readonly duration: FeedbackDuration;
  readonly easing: EasingType;
  readonly intensity: FeedbackIntensity;
  
  // VISUAL PROPERTIES
  readonly animation: VisualAnimation;
  readonly glow: GlowEffect;
  
  // ONTOLOGICAL CONTEXT
  readonly energyOntology: EnergyOntologyType;
  
  // TAXONOMIC CLASSIFICATION
  readonly stylingTaxonomy: StylingTaxonomyType;
}

export interface VisualAnimation {
  // ANIMATION PROPERTIES
  readonly type: AnimationType;
  readonly direction: AnimationDirection;
  readonly scale: number; // 0.1-2.0 scale
  
  // ONTOLOGICAL CONTEXT
  readonly processOntology: ProcessOntologyType;
  
  // TAXONOMIC CLASSIFICATION
  readonly animationTaxonomy: AnimationTaxonomyType;
}

export interface GlowEffect {
  // GLOW PROPERTIES
  readonly intensity: number; // 0-100 scale
  readonly color: string; // CSS color value
  readonly spread: number; // 0-50 scale
  readonly blur: number; // 0-100 scale
  
  // ONTOLOGICAL CONTEXT
  readonly energyOntology: EnergyOntologyType;
}

// ============================================================================
// HAPTIC FEEDBACK ARCHITECTURE
// ============================================================================

export interface HapticFeedbackConfig {
  // FEEDBACK IDENTITY
  readonly type: HapticFeedbackType;
  readonly intensity: FeedbackIntensity;
  readonly duration: FeedbackDuration;
  readonly pattern: HapticPattern;
  
  // PHYSICAL PROPERTIES
  readonly vibration: VibrationProfile;
  readonly resonance: number; // 0-100 scale
  
  // ONTOLOGICAL CONTEXT
  readonly energyOntology: EnergyOntologyType;
  
  // TAXONOMIC CLASSIFICATION
  readonly interactionTaxonomy: InteractionTaxonomyType;
}

export interface VibrationProfile {
  // VIBRATION PROPERTIES
  readonly amplitude: number; // 0-100 scale
  readonly frequency: number; // Hz
  readonly waveform: WaveformType;
  readonly attack: number; // 0-1000 ms
  readonly decay: number; // 0-1000 ms
  
  // ONTOLOGICAL CONTEXT
  readonly processOntology: ProcessOntologyType;
}

// ============================================================================
// AUDIO FEEDBACK ARCHITECTURE
// ============================================================================

export interface AudioFeedbackConfig {
  // FEEDBACK IDENTITY
  readonly type: AudioFeedbackType;
  readonly volume: number; // 0-100 scale
  readonly duration: FeedbackDuration;
  readonly pitch: number; // Hz
  
  // SOUND PROPERTIES
  readonly waveform: WaveformType;
  readonly envelope: AudioEnvelope;
  readonly harmonics: number; // 0-10 scale
  
  // ONTOLOGICAL CONTEXT
  readonly energyOntology: EnergyOntologyType;
  
  // TAXONOMIC CLASSIFICATION
  readonly patternTaxonomy: PatternTaxonomyType;
}

export interface AudioEnvelope {
  // ENVELOPE PROPERTIES
  readonly attack: number; // 0-1000 ms
  readonly decay: number; // 0-1000 ms
  readonly sustain: number; // 0-100 scale
  readonly release: number; // 0-1000 ms
  
  // ONTOLOGICAL CONTEXT
  readonly processOntology: ProcessOntologyType;
}

// ============================================================================
// FEEDBACK SYSTEM CONFIGURATION
// ============================================================================

export interface FeedbackSystemConfig {
  // HAPTIC CONFIGURATION
  readonly haptic: HapticSystemConfig;
  
  // VISUAL CONFIGURATION
  readonly visual: VisualSystemConfig;
  
  // AUDIO CONFIGURATION
  readonly audio: AudioSystemConfig;
  
  // SYSTEM-WIDE SETTINGS
  readonly globalIntensity: FeedbackIntensity;
  readonly accessibility: AccessibilitySettings;
  
  // ONTOLOGICAL CONTEXT
  readonly processOntology: ProcessOntologyType;
  
  // TAXONOMIC CLASSIFICATION
  readonly systemTaxonomy: string; // Will be specific system taxonomy
}

export interface HapticSystemConfig {
  // HAPTIC SETTINGS
  readonly enabled: boolean;
  readonly defaultIntensity: HapticFeedbackType;
  readonly maximumIntensity: number; // 0-100 scale
  readonly patterns: readonly HapticPattern[];
  
  // ONTOLOGICAL CONTEXT
  readonly energyOntology: EnergyOntologyType;
}

export interface VisualSystemConfig {
  // VISUAL SETTINGS
  readonly enabled: boolean;
  readonly defaultDuration: FeedbackDuration;
  readonly colorThemes: Record<FeedbackColor, string>; // CSS color values
  readonly animationPreferences: readonly AnimationType[];
  
  // ONTOLOGICAL CONTEXT
  readonly energyOntology: EnergyOntologyType;
}

export interface AudioSystemConfig {
  // AUDIO SETTINGS
  readonly enabled: boolean;
  readonly defaultVolume: number; // 0-100 scale
  readonly frequencyRange: FrequencyRange;
  readonly waveformPreferences: readonly WaveformType[];
  
  // ONTOLOGICAL CONTEXT
  readonly energyOntology: EnergyOntologyType;
}

export interface FrequencyRange {
  // FREQUENCY BOUNDARIES
  readonly min: number; // Hz
  readonly max: number; // Hz
  readonly preferred: number; // Hz
}

export interface AccessibilitySettings {
  // ACCESSIBILITY OPTIONS
  readonly reducedMotion: boolean;
  readonly highContrast: boolean;
  readonly screenReader: boolean;
  readonly customFeedback: CustomFeedbackOptions;
  
  // ONTOLOGICAL CONTEXT
  readonly beingOntology: BeingOntologyType;
}

export interface CustomFeedbackOptions {
  // CUSTOMIZATION
  readonly alternativeHaptic: readonly HapticFeedbackType[];
  readonly alternativeVisual: readonly VisualFeedbackType[];
  readonly alternativeAudio: readonly AudioFeedbackType[];
  readonly intensityMultiplier: number; // 0.5-2.0 scale
}

// ============================================================================
// FEEDBACK EVENT ARCHITECTURE
// ============================================================================

export interface FeedbackEventPayload {
  // EVENT IDENTITY
  readonly type: FeedbackChannel;
  readonly feedback: FeedbackType;
  readonly element?: string; // Consciousness element identifier
  readonly context?: string; // Consciousness context identifier
  
  // INTENSITY AND TIMING
  readonly intensity?: FeedbackIntensity;
  readonly duration?: FeedbackDuration;
  readonly timestamp: string; // Consciousness timestamp
  
  // METADATA
  readonly source: string; // Event origin
  readonly correlationId?: string; // Related event tracking
  
  // ONTOLOGICAL CONTEXT
  readonly processOntology: ProcessOntologyType;
  
  // TAXONOMIC CLASSIFICATION
  readonly dataTaxonomy: DataTaxonomyType;
}

export type FeedbackType = 
  | HapticFeedbackType 
  | VisualFeedbackType 
  | AudioFeedbackType;

// ============================================================================
// FEEDBACK SYSTEM ONTOLOGICAL MAPPING
// ============================================================================

export interface FeedbackSystemMapping {
  readonly feedbackType: FeedbackType;
  readonly ontologicalContext: {
    readonly energy: EnergyOntologyType;
    readonly process: ProcessOntologyType;
    readonly being: BeingOntologyType;
  };
  readonly taxonomicClassification: {
    readonly pattern: PatternTaxonomyType;
    readonly state: StateTaxonomyType;
    readonly interaction: InteractionTaxonomyType;
    readonly animation: AnimationTaxonomyType;
    readonly styling: StylingTaxonomyType;
    readonly data: DataTaxonomyType;
  };
  readonly sensoryCharacteristics: readonly string[];
  readonly resonancePatterns: readonly string[];
}

// ============================================================================
// TYPE EXPORTS FOR SYSTEM INTEGRATION
// ============================================================================

export type {
  HapticFeedbackType,
  VisualFeedbackType,
  AudioFeedbackType,
  FeedbackIntensity,
  FeedbackDuration,
  FeedbackColor,
  EasingType,
  AnimationType,
  AnimationDirection,
  HapticPattern,
  WaveformType,
  FeedbackChannel
};