// types/domain/music/library.ts - PURIFIED VERSION
import type {
  BeingOntologyType,
  ProcessOntologyType,
  PatternTaxonomyType,
  DataTaxonomyType,
  EntityTaxonomyType,
  StateTaxonomyType,
  SystemTaxonomyType
} from '../../gaia';

import type {
  ConsciousnessLevel,
  EntityState,
  AnalysisStatus, 
  LyricSectionType, 
  ImpactAssessment, 
  AccuracyTrend, 
  TimePeriod
} from '../../cosmic/primitives';

// ============================================================================
// MUSIC LIBRARY ARCHITECTURE
// ============================================================================

export interface MusicLibrary {
  // LIBRARY CORE
  readonly metadata: LibraryMetadata;
  readonly songs: readonly Song[];
  readonly analyses: AnalysisRegistry;
  readonly insights: readonly PropheticInsight[];
  readonly statistics: LibraryStatistics;
  
  // ONTOLOGICAL CONTEXT
  readonly beingOntology: BeingOntologyType;
  readonly processOntology: ProcessOntologyType;
  
  // TAXONOMIC CLASSIFICATION
  readonly entityTaxonomy: EntityTaxonomyType;
  readonly dataTaxonomy: DataTaxonomyType;
}

// ============================================================================
// LIBRARY METADATA STRUCTURE
// ============================================================================

export interface LibraryMetadata {
  // QUANTITATIVE MEASURES
  readonly totalSongs: number;
  readonly yearsCovered: readonly [number, number];
  
  // QUALITATIVE ATTRIBUTES
  readonly analysisVersion: string;
  readonly accuracyThreshold: number; // 0-100 scale
  readonly consistencyThreshold: number; // 0-100 scale
  
  // ONTOLOGICAL CONTEXT
  readonly processOntology: ProcessOntologyType;
}

// ============================================================================
// SONG CREATIVE ARCHITECTURE
// ============================================================================

export interface Song {
  // CORE IDENTITY
  readonly id?: string;
  readonly title: string;
  readonly year?: number;
  readonly url?: string;
  // CREATIVE ATTRIBUTES
  readonly attributes?: SongAttributes;
  readonly lyrics?: readonly LyricSection[];
  readonly themes?: readonly string[];
  readonly propheticThemes?: readonly string[];
  
  // ANALYSIS STATE
  readonly analysisStatus?: AnalysisStatus;
  readonly consciousnessLevel?: ConsciousnessLevel;
  readonly councilStatus?: string;
  
  // TAXONOMIC CLASSIFICATION
  readonly entityTaxonomy?: EntityTaxonomyType;
  readonly patternTaxonomy?: PatternTaxonomyType;
}

export interface SongAttributes {
  // CREATIVE CHARACTERISTICS
  readonly genre: string;
  readonly tone: string;
  readonly complexity: number; // 0-100 scale
  readonly influences: readonly string[];
  readonly production: ProductionNotes;
  
  // ONTOLOGICAL CONTEXT
  readonly beingOntology: BeingOntologyType;
}

// ============================================================================
// LYRICAL EXPRESSION STRUCTURES
// ============================================================================

export interface LyricSection {
  // STRUCTURAL IDENTITY
  readonly type: LyricSectionType;
  readonly content: string;
  
  // EMOTIONAL AND PROPHETIC QUALITIES
  readonly intensity: number; // 0-100 scale
  readonly propheticDensity: number; // 0-100 scale
  
  // ONTOLOGICAL CONTEXT
  readonly processOntology: ProcessOntologyType;
}

// ============================================================================
// PRODUCTION NOTES (Temporary until primitives Phase 2)
// ============================================================================

export interface ProductionNotes {
  readonly technicalApproach: string;
  readonly creativeDecisions: readonly string[];
  readonly challengesOvercome: readonly string[];
  readonly innovations: readonly string[];
}

// ============================================================================
// ANALYSIS REGISTRY FRAMEWORK
// ============================================================================

export interface AnalysisRegistry {
  // ANALYSIS MAPPINGS (structural only)
  readonly mappings: readonly AnalysisMapping[];
  readonly completion: AnalysisCompletion;
  readonly quality: AnalysisQuality;
  
  // TAXONOMIC CLASSIFICATION
  readonly systemTaxonomy: SystemTaxonomyType;
  readonly dataTaxonomy: DataTaxonomyType;
}

export interface AnalysisMapping {
  readonly songId: string;
  readonly analysisId: string;
  readonly mappingStrength: number; // 0-100 scale
}

export interface AnalysisCompletion {
  // COMPLETION METRICS
  readonly completed: number;
  readonly inProgress: number;
  readonly pending: number;
  readonly completionRate: number; // 0-100 scale
  
  // TAXONOMIC CLASSIFICATION
  readonly stateTaxonomy: StateTaxonomyType;
}

export interface AnalysisQuality {
  // QUALITY METRICS
  readonly averageAccuracy: number; // 0-100 scale
  readonly themeConsistency: number; // 0-100 scale
  readonly approvalRate: number; // 0-100 scale
  readonly insightRate: number; // 0-100 scale
  
  // ONTOLOGICAL CONTEXT
  readonly processOntology: ProcessOntologyType;
}

// ============================================================================
// PROPHETIC INSIGHT ARCHITECTURE
// ============================================================================

export interface PropheticInsight {
  // INSIGHT IDENTITY
  readonly id: string;
  readonly sourceAnalysis: string;
  readonly category: string;
  readonly description: string;
  
  // CONFIDENCE AND IMPACT
  readonly confidence: number; // 0-100 scale
  readonly impact: ImpactAssessment;
  readonly validated: boolean;
  
  // ONTOLOGICAL CONTEXT
  readonly beingOntology: BeingOntologyType;
  readonly processOntology: ProcessOntologyType;
}

// ============================================================================
// LIBRARY STATISTICAL ANALYSIS
// ============================================================================

export interface LibraryStatistics {
  // THEMATIC ANALYSIS
  readonly totalThemes: number;
  readonly averageThemes: number;
  readonly accuracyDistribution: AccuracyDistribution;
  readonly temporalPatterns: readonly TemporalPattern[];
  
  // TAXONOMIC CLASSIFICATION
  readonly dataTaxonomy: DataTaxonomyType;
  readonly patternTaxonomy: PatternTaxonomyType;
}

export interface AccuracyDistribution {
  readonly high: number; // Count of high accuracy analyses
  readonly medium: number; // Count of medium accuracy analyses
  readonly low: number; // Count of low accuracy analyses
  
  // TAXONOMIC CLASSIFICATION
  readonly dataTaxonomy: DataTaxonomyType;
}

export interface TemporalPattern {
  readonly period: TimePeriod;
  readonly themeFrequency: number;
  readonly accuracyTrend: AccuracyTrend;
  
  // ONTOLOGICAL CONTEXT
  readonly processOntology: ProcessOntologyType;
}

// ============================================================================
// MUSIC LIBRARY ONTOLOGICAL MAPPING
// ============================================================================

export interface MusicLibraryMapping {
  readonly libraryType: string;
  readonly ontologicalContext: {
    readonly being: BeingOntologyType;
    readonly process: ProcessOntologyType;
    readonly pattern: PatternTaxonomyType;
  };
  readonly taxonomicClassification: {
    readonly entity: EntityTaxonomyType;
    readonly data: DataTaxonomyType;
    readonly system: SystemTaxonomyType;
    readonly state: StateTaxonomyType;
  };
  readonly creativeDomains: readonly string[];
}

// ============================================================================
// LIBRARY EVOLUTION TRACKING
// ============================================================================

export interface LibraryEvolution {
  readonly currentState: EntityState;
  readonly growthMetrics: {
    readonly thematicExpansion: number; // 0-100 scale
    readonly analyticalDepth: number; // 0-100 scale
    readonly propheticAccuracy: number; // 0-100 scale
    readonly integrationLevel: number; // 0-100 scale
  };
  readonly evolutionaryPatterns: readonly string[];
  readonly nextGrowthPhase?: string;
}

// ============================================================================
// TYPE EXPORTS FOR SYSTEM INTEGRATION
// ============================================================================

export type {
  AnalysisStatus,
  LyricSectionType,
  ImpactAssessment,
  AccuracyTrend,
  TimePeriod
};