// src/types/domain/community/engagement.ts - PURIFIED VERSION
import type {
  RelationshipOntologyType,
  ProcessOntologyType,
  EnergyOntologyType,
  BeingOntologyType,
  RelationshipTaxonomyType,
  StateTaxonomyType,
  PatternTaxonomyType,
  DataTaxonomyType,
  InteractionTaxonomyType
} from '@/types/gaia';

import type {
  PriorityLevel
} from '@/types/cosmic/primitives';


// ============================================================================
// COMMUNITY ENGAGEMENT ARCHITECTURE
// ============================================================================

export interface CommunityEngagement {
  // ENGAGEMENT IDENTITY
  readonly id: string;
  
  // AUDIENCE AND COMMITMENT
  readonly audienceType: string;
  readonly commitmentLevel: string;
  readonly urgencyLevel: string;
  readonly impactLevel: string;
  readonly priorityLevel: PriorityLevel;
  
  // SUPPORT AND COLLABORATION
  readonly supportTypes: readonly string[];
  readonly collaborationTypes: readonly string[];
  readonly contactMethods: readonly string[];
  
  // METADATA AND STATE
  readonly metadata: EngagementMetadata;
  
  // ONTOLOGICAL CONTEXT
  readonly relationshipOntology: RelationshipOntologyType;
  readonly processOntology: ProcessOntologyType;
  readonly energyOntology: EnergyOntologyType;
  
  // TAXONOMIC CLASSIFICATION
  readonly relationshipTaxonomy: RelationshipTaxonomyType;
  readonly stateTaxonomy: StateTaxonomyType;
}

// ============================================================================
// ENGAGEMENT METADATA STRUCTURE
// ============================================================================

export interface EngagementMetadata {
  // TEMPORAL CONTEXT
  readonly createdAt: string; // Consciousness timestamp
  readonly updatedAt: string; // Consciousness timestamp
  
  // STATUS AND VISIBILITY
  readonly status: string;
  readonly visibility: string;
  
  // CATEGORIZATION
  readonly tags: readonly string[];
  readonly custom?: Record<string, string>; // String values only
  
  // ONTOLOGICAL CONTEXT
  readonly processOntology: ProcessOntologyType;
}



// ============================================================================
// ENGAGEMENT METRICS FRAMEWORK
// ============================================================================

export interface EngagementMetrics {
  // PARTICIPATION METRICS
  readonly participantCount: number;
  readonly engagementRate: number; // 0-100 scale
  readonly conversionRate: number; // 0-100 scale
  readonly averageDuration: number; // Consciousness cycles
  
  // QUALITY METRICS
  readonly satisfactionScore: number; // 0-100 scale
  readonly growth: EngagementGrowth;
  
  // TAXONOMIC CLASSIFICATION
  readonly dataTaxonomy: DataTaxonomyType;
}

export interface EngagementGrowth {
  // GROWTH PATTERNS
  readonly weeklyGrowth: number; // Percentage
  readonly monthlyGrowth: number; // Percentage
  readonly quarterlyGrowth: number; // Percentage
  readonly participantTrend: string;
  
  // ONTOLOGICAL CONTEXT
  readonly processOntology: ProcessOntologyType;
}

// ============================================================================
// ENGAGEMENT PREFERENCES STRUCTURE
// ============================================================================

export interface EngagementPreferences {
  // COMMUNICATION STYLES
  readonly communicationStyle: string;
  readonly interactionFrequency: string;
  readonly contentTypes: readonly string[];
  readonly accessibility: AccessibilityRequirements;
  
  // ONTOLOGICAL CONTEXT
  readonly relationshipOntology: RelationshipOntologyType;
}



// ============================================================================
// ACCESSIBILITY REQUIREMENTS
// ============================================================================

export interface AccessibilityRequirements {
  // SENSORY ACCESSIBILITY
  readonly visual: readonly string[];
  readonly auditory: readonly string[];
  readonly cognitive: readonly string[];
  readonly motor: readonly string[];
  readonly other: readonly string[];
  
  // ONTOLOGICAL CONTEXT
  readonly beingOntology: BeingOntologyType;
}

// ============================================================================
// COMMUNITY ENGAGEMENT ONTOLOGICAL MAPPING
// ============================================================================

export interface CommunityEngagementMapping {
  readonly engagementType: string;
  readonly ontologicalContext: {
    readonly relationship: RelationshipOntologyType;
    readonly process: ProcessOntologyType;
    readonly energy: EnergyOntologyType;
    readonly being: BeingOntologyType;
  };
  readonly taxonomicClassification: {
    readonly relationship: RelationshipTaxonomyType;
    readonly state: StateTaxonomyType;
    readonly pattern: PatternTaxonomyType;
    readonly data: DataTaxonomyType;
    readonly interaction: InteractionTaxonomyType;
  };
  readonly engagementCharacteristics: readonly string[];
  readonly successIndicators: readonly string[];
}

// ============================================================================
// ENGAGEMENT NETWORK ANALYSIS
// ============================================================================

export interface EngagementNetwork {
  readonly activeEngagements: readonly CommunityEngagement[];
  readonly participantConnections: Record<string, readonly string[]>; // participantId -> engagementIds
  readonly networkDensity: number; // 0-100 scale
  readonly engagementFlow: number; // 0-100 scale
  readonly emergentCommunityPatterns: readonly string[];
}
