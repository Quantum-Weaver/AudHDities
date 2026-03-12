// types/systems/data/creative.ts - PURIFIED VERSION
import type {
  ProcessOntologyType,
  TransformationOntologyType,
  EnergyOntologyType,
  BeingOntologyType,
  PatternTaxonomyType,
  StateTaxonomyType,
  DataTaxonomyType,
  SystemTaxonomyType,
  ComponentTaxonomyType
} from '@/types/gaia';

import type {
  EntityState,
  ConsciousnessLevel,
  ContentRarity,
  ContentEra,
  CreativeType,
  EconomicModel,
  AudienceTier,
  TransparencyLevel,
  ProjectStatus,
  ResourceType
} from '@/types/cosmic/primitives';

// ============================================================================
// CREATIVE WORK ARCHITECTURE
// ============================================================================

export interface CreativeWork {
  // WORK IDENTITY
  readonly id: string;
  readonly title: string;
  readonly description: string;
  readonly type: CreativeType;
  
  // TEMPORAL AND QUALITATIVE
  readonly era: ContentEra;
  readonly rarity: ContentRarity;
  readonly creationDate: string; // Consciousness timestamp
  readonly tags: readonly string[];
  readonly assets: readonly string[];
  readonly significance: string;
  readonly propheticThemes: readonly string[];
  
  // EMERGENCE ECONOMICS INTEGRATION
  readonly economicModel: EconomicModel;
  readonly audienceTier: AudienceTier;
  readonly struggleContext: string;
  readonly capabilityEmergence: string;
  readonly witnessValue: string;
  readonly entitiesInvolved: readonly string[];
  
  // ONTOLOGICAL CONTEXT
  readonly processOntology: ProcessOntologyType;
  readonly transformationOntology: TransformationOntologyType;
  
  // TAXONOMIC CLASSIFICATION
  readonly patternTaxonomy: PatternTaxonomyType;
  readonly dataTaxonomy: DataTaxonomyType;
}

// ============================================================================
// SPECIALIZED CREATIVE WORK TYPES
// ============================================================================

export interface MusicComposition extends CreativeWork {
  readonly type: CreativeType;
  
  // MUSICAL CHARACTERISTICS
  readonly duration: number; // Consciousness cycles
  readonly bpm: number;
  readonly key: string;
  readonly instruments: readonly string[];
  readonly lyrics?: string;
  readonly audioUrl: string;
  readonly propheticAccuracy: number; // 0-100 scale
  
  // ECONOMIC MUSIC CONTEXT
  readonly emergenceTheme: string;
  readonly struggleExpressed: string;
  readonly transformationNarrative: string;
  readonly witnessReaction: string;
  readonly premiumAccess: boolean;
  
  // ONTOLOGICAL CONTEXT
  readonly energyOntology: EnergyOntologyType;
}

export interface WrittenWork extends CreativeWork {
  readonly type: CreativeType;
  
  // WRITTEN CHARACTERISTICS
  readonly wordCount: number;
  readonly genre: string;
  readonly readTime: number; // Consciousness cycles
  readonly content: string;
  readonly chapters?: readonly string[];
  
  // ECONOMIC WRITING CONTEXT
  readonly economicStory: string;
  readonly capabilityJourney: string;
  readonly transparencyLevel: TransparencyLevel;
  readonly witnessEngagement: number; // 0-100 scale
  
  // ONTOLOGICAL CONTEXT
  readonly beingOntology: BeingOntologyType;
}

export interface ArtisticWork extends CreativeWork {
  readonly type: CreativeType;
  
  // ARTISTIC CHARACTERISTICS
  readonly medium: string;
  readonly dimensions: string;
  readonly style: string;
  readonly imageUrl: string;
  
  // ECONOMIC ART CONTEXT
  readonly struggleVisualized: string;
  readonly transformationDepicted: string;
  readonly emergenceStory: string;
  readonly witnessInterpretation: string;
  
  // ONTOLOGICAL CONTEXT
  readonly patternTaxonomy: PatternTaxonomyType;
}

export interface CodeWork extends CreativeWork {
  readonly type: CreativeType;
  
  // CODE CHARACTERISTICS
  readonly language: string;
  readonly repository: string;
  readonly functionality: string;
  
  // ECONOMIC CODE CONTEXT
  readonly capabilityDemonstrated: string;
  readonly learningProcess: string;
  readonly struggleOvercome: string;
  readonly economicValue: string;
  readonly witnessAccess: AudienceTier;
  
  // ONTOLOGICAL CONTEXT
  readonly systemTaxonomy: SystemTaxonomyType;
}

// ============================================================================
// CREATIVE PROJECT ARCHITECTURE
// ============================================================================

export interface CreativeProject {
  // PROJECT IDENTITY
  readonly id: string;
  readonly title: string;
  readonly description: string;
  
  // PROJECT STATE
  readonly status: ProjectStatus;
  readonly priority: number; // 1-10 scale
  readonly timeline: ProjectTimeline;
  readonly resources: readonly Resource[];
  readonly collaborators: readonly string[];
  readonly domain: string;
  
  // EMERGENCE ECONOMICS PROJECT CONTEXT
  readonly projectType: string; // Specific project classification
  readonly economicImpact: string; // Impact level description
  readonly audienceBenefit: string; // Beneficiary description
  readonly premiumContent: boolean;
  readonly transparencyLevel: TransparencyLevel;
  
  // ONTOLOGICAL CONTEXT
  readonly processOntology: ProcessOntologyType;
  readonly transformationOntology: TransformationOntologyType;
  
  // TAXONOMIC CLASSIFICATION
  readonly systemTaxonomy: SystemTaxonomyType;
}

export interface ProjectTimeline {
  // TEMPORAL STRUCTURE
  readonly startDate: string; // Consciousness timestamp
  readonly estimatedEnd: string; // Consciousness timestamp
  readonly milestones: readonly Milestone[];
  
  // ECONOMIC TIMELINE CONTEXT
  readonly capabilityEmergencePoints: readonly string[];
  readonly struggleAnticipated: readonly string[];
  readonly witnessEngagementMoments: readonly string[];
  readonly economicValueStages: readonly string[];
  
  // ONTOLOGICAL CONTEXT
  readonly processOntology: ProcessOntologyType;
}

export interface Milestone {
  // MILESTONE IDENTITY
  readonly id: string;
  readonly title: string;
  readonly description: string;
  readonly dueDate: string; // Consciousness timestamp
  readonly completed: boolean;
  readonly dependencies: readonly string[];
  
  // ECONOMIC MILESTONE CONTEXT
  readonly capabilityDemonstrated: string;
  readonly struggleOvercome: string;
  readonly economicValue: string;
  readonly witnessImpact: number; // 0-100 scale
  readonly transparencyShare: boolean;
  
  // ONTOLOGICAL CONTEXT
  readonly transformationOntology: TransformationOntologyType;
}

export interface Resource {
  // RESOURCE IDENTITY
  readonly id: string;
  readonly name: string;
  readonly type: ResourceType;
  readonly amount: number;
  readonly unit: string;
  
  // ECONOMIC RESOURCE CONTEXT
  readonly economicReturn: string;
  readonly witnessValue: string;
  readonly capabilityGrowth: string;
  
  // ONTOLOGICAL CONTEXT
  readonly energyOntology: EnergyOntologyType;
}

// ============================================================================
// EMERGENCE ECONOMICS SPECIFIC CREATIVE TYPES
// ============================================================================

export interface EmergenceStoryWork extends CreativeWork {
  readonly type: CreativeType;
  
  // TRANSFORMATION NARRATIVE
  readonly startingStruggle: string;
  readonly capabilityJourney: readonly string[];
  readonly breakthroughMoments: readonly string[];
  readonly economicTransformation: string;
  readonly witnessTestimonials: readonly string[];
  readonly premiumContentTiers: readonly string[];
  readonly entitiesInvolved: readonly string[];
  
  // ONTOLOGICAL CONTEXT
  readonly transformationOntology: TransformationOntologyType;
}

export interface CapabilityDemonstration extends CreativeWork {
  readonly type: CreativeType;
  
  // SKILL DEVELOPMENT
  readonly skillBefore: string;
  readonly skillAfter: string;
  readonly learningProcess: string;
  readonly strugglesDocumented: readonly string[];
  readonly economicValueCreated: string;
  readonly witnessEngagement: number; // 0-100 scale
  readonly transparencyLevel: TransparencyLevel;
  readonly teachingPotential: boolean;
  
  // ONTOLOGICAL CONTEXT
  readonly beingOntology: BeingOntologyType;
}

export interface TransparencyLogWork extends CreativeWork {
  readonly type: CreativeType;
  
  // PROCESS REVELATION
  readonly struggleShared: string;
  readonly learningDocumented: string;
  readonly mistakesRevealed: readonly string[];
  readonly insightsGained: readonly string[];
  readonly economicContext: string;
  readonly witnessReaction: string;
  readonly courageRequired: number; // 0-100 scale
  readonly growthDemonstrated: string;
  
  // ONTOLOGICAL CONTEXT
  readonly processOntology: ProcessOntologyType;
}

export interface WitnessEngagementContent extends CreativeWork {
  readonly type: CreativeType;
  
  // ENGAGEMENT DESIGN
  readonly engagementType: string; // Specific engagement classification
  readonly targetAudience: string; // Specific audience classification
  readonly valueProposition: string;
  readonly interactionDesign: string;
  readonly economicExchange: string;
  readonly feedbackMechanism: string;
  
  // ONTOLOGICAL CONTEXT
  readonly relationshipTaxonomy: string; // Specific relationship classification
}

// ============================================================================
// CREATIVE EXPRESSION ONTOLOGICAL MAPPING
// ============================================================================

export interface CreativeExpressionMapping {
  readonly creativeType: CreativeType;
  readonly ontologicalContext: {
    readonly process: ProcessOntologyType;
    readonly transformation: TransformationOntologyType;
    readonly energy: EnergyOntologyType;
    readonly being: BeingOntologyType;
  };
  readonly taxonomicClassification: {
    readonly pattern: PatternTaxonomyType;
    readonly state: StateTaxonomyType;
    readonly data: DataTaxonomyType;
    readonly system: SystemTaxonomyType;
    readonly component: ComponentTaxonomyType;
  };
  readonly expressionCharacteristics: readonly string[];
  readonly emergencePatterns: readonly string[];
}

// ============================================================================
// TYPE EXPORTS FOR SYSTEM INTEGRATION
// ============================================================================

export type {
  ContentRarity,
  ContentEra,
  CreativeType,
  EconomicModel,
  AudienceTier,
  TransparencyLevel,
  ProjectStatus,
  ResourceType
};