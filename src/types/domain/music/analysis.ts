// types/domain/music/analysis.ts - PURIFIED VERSION
import type {
  BeingOntologyType,
  ProcessOntologyType,
  PatternTaxonomyType,
  DataTaxonomyType,
  StateTaxonomyType,
  EntityTaxonomyType,
  ComponentTaxonomyType
} from '../../gaia';

import type {
  EntityState,
  ConsciousnessLevel,
  CouncilStatus,
  PropheticThemeCategory,
  ThemeSignificance,
  AnalysisMethodology
} from '../../cosmic/primitives';

import { Song } from './library'

// ============================================================================
// SONG ANALYSIS ARCHITECTURE
// ============================================================================

export interface SongBase extends Song {
  readonly title: string;
  readonly url?: string;
  readonly year: number;
  readonly propheticThemes: readonly string[];
  readonly councilStatus: CouncilStatus;
  readonly duration?: number;
  readonly bpm?: number;
  readonly key?: string;
  readonly emotionalTone?: string;
}

export interface EnhancedSong extends SongBase {
  // Enhanced with full analysis data
  readonly themeAnalysis: readonly ThemeAnalysis[];
  readonly propheticAccuracy: number; // 0-100 scale
  readonly councilInsights: readonly string[];
  readonly thematicConnections: readonly ThemeConnection[];
  readonly analysisVersion?: string;
  readonly lastAnalyzed?: string; // ISO timestamp
}

export type AnySong = SongBase | EnhancedSong;

// ============================================================================
// PROPHETIC THEME ARCHITECTURE
// ============================================================================

export interface PropheticTheme {
  readonly id: string;
  readonly name: string;
  readonly description: string;
  readonly category: PropheticThemeCategory;
  readonly significance: ThemeSignificance;
  readonly firstAppearance: number; // Year
  readonly frequency: number; // Occurrence count
  readonly connectedThemes: readonly string[];
  readonly archetypalMeaning: string;
  readonly evolutionStage?: string;
  readonly confidence?: number; // 0-100 scale
  
  // ONTOLOGICAL CONTEXT
  readonly beingOntology: BeingOntologyType;
  readonly processOntology: ProcessOntologyType;
}

export interface ThemeCategory {
  readonly id: PropheticThemeCategory;
  readonly name: string;
  readonly description: string;
  readonly themes: readonly PropheticTheme[];
  readonly significance: ThemeSignificance;
  readonly evolution: {
    readonly early: readonly string[];
    readonly middle: readonly string[];
    readonly late: readonly string[];
  };
}

export interface ThemeConnection {
  readonly source: string;
  readonly target: string;
  readonly strength: number; // 0-100 scale
  readonly description: string;
  readonly evidence?: readonly string[];
  
  // TAXONOMIC CLASSIFICATION
  readonly patternTaxonomy: PatternTaxonomyType;
}

// ============================================================================
// THEME ANALYSIS FRAMEWORK
// ============================================================================

export interface ThemeAnalysis {
  readonly theme: string;
  readonly themeData?: PropheticTheme;
  readonly frequency: number;
  readonly songs: readonly string[]; // Song titles containing this theme
  readonly significance: ThemeSignificance;
  readonly connectionStrength?: number; // 0-100 scale
  readonly propheticWeight?: number; // 0-100 scale
  readonly confidence?: number; // 0-100 scale
  readonly lyricalEvidence?: readonly string[];
  
  // ONTOLOGICAL CONTEXT
  readonly processOntology: ProcessOntologyType;
}

export interface MusicAnalysisResult {
  readonly song: AnySong;
  readonly themes: readonly ThemeAnalysis[];
  readonly councilInsights: readonly string[];
  readonly propheticAccuracy: number; // 0-100 scale
  readonly thematicDensity?: number; // 0-100 scale
  readonly evolutionSignificance?: number; // 0-100 scale
  readonly recommendedStatus?: CouncilStatus;
  readonly analysisMetadata?: {
    readonly analyzedAt: string; // ISO timestamp
    readonly analysisVersion: string;
    readonly methodology: AnalysisMethodology;
  };
}

export interface EnhancedMusicAnalysisResult extends MusicAnalysisResult {
  readonly song: EnhancedSong;
  readonly enhancedThemes: readonly PropheticTheme[];
  readonly crossSongConnections?: readonly ThemeConnection[];
}

// ============================================================================
// ANALYSIS SUMMARY STRUCTURES
// ============================================================================

export interface ThemeAnalysisSummary {
  readonly mostCommonThemes: readonly { 
    readonly theme: string; 
    readonly count: number; 
    readonly themeData?: PropheticTheme;
  }[];
  readonly themeCategories: Record<PropheticThemeCategory, number>;
  readonly themeEvolution: Record<number, readonly string[]>;
  readonly propheticDensity: Record<number, number>; // Year -> density
  readonly strongestConnections: readonly ThemeConnection[];
  readonly songsAnalyzed: number;
  readonly enhancedSongs: number;
  readonly basicSongs: number;
  
  // TAXONOMIC CLASSIFICATION
  readonly dataTaxonomy: DataTaxonomyType;
  readonly patternTaxonomy: PatternTaxonomyType;
}

export interface MusicLibraryMetadata {
  readonly totalSongs: number;
  readonly enhancedSongs: number;
  readonly basicSongs: number;
  readonly yearsCovered: readonly [number, number];
  readonly analyzedSongs: number;
  readonly propheticThemesCount: number;
  readonly uniqueThemesCount: number;
  readonly propheticAccuracyAverage: number; // 0-100 scale
  readonly lastUpdated: string; // ISO timestamp
  readonly analysisVersion: string;
  
  // ONTOLOGICAL CONTEXT
  readonly processOntology: ProcessOntologyType;
}

// ============================================================================
// FILTER AND SEARCH STRUCTURES
// ============================================================================

export interface MusicFilterOptions {
  readonly years?: readonly [number, number];
  readonly themes?: readonly string[];
  readonly categories?: readonly PropheticThemeCategory[];
  readonly status?: readonly CouncilStatus[];
  readonly significance?: readonly ThemeSignificance[];
  readonly searchQuery?: string;
  readonly songType?: string;
  readonly hasAnalysis?: boolean;
}

export interface SearchResult {
  readonly songs: readonly AnySong[];
  readonly enhancedSongs: readonly EnhancedSong[];
  readonly basicSongs: readonly SongBase[];
  readonly themes: readonly PropheticTheme[];
  readonly categories: readonly PropheticThemeCategory[];
  readonly relevance: number; // 0-100 scale
}

// ============================================================================
// ENHANCEMENT AND PROGRESS STRUCTURES
// ============================================================================

export interface SongEnhancementResult {
  readonly basicSong: SongBase;
  readonly enhancedSong: EnhancedSong;
  readonly enhancementTime: number; // milliseconds
  readonly newThemesDiscovered?: number;
  readonly accuracyImprovement?: number; // 0-100 scale
}

export interface BatchEnhancementProgress {
  readonly total: number;
  readonly completed: number;
  readonly enhanced: number;
  readonly failed: number;
  readonly currentSong?: string;
  readonly estimatedTimeRemaining?: string;
}

export interface AnalysisProgress {
  readonly status: CouncilStatus;
  readonly count: number;
  readonly percentage: number; // 0-100 scale
  readonly estimatedCompletion?: string; // ISO timestamp
  readonly enhancedCount?: number;
  readonly basicCount?: number;
  
  // TAXONOMIC CLASSIFICATION
  readonly stateTaxonomy: StateTaxonomyType;
}

// ============================================================================
// MUSIC ANALYSIS ONTOLOGICAL MAPPING
// ============================================================================

export interface MusicAnalysisMapping {
  readonly analysisType: AnalysisMethodology;
  readonly ontologicalContext: {
    readonly being: BeingOntologyType;
    readonly process: ProcessOntologyType;
    readonly pattern: PatternTaxonomyType;
  };
  readonly taxonomicClassification: {
    readonly data: DataTaxonomyType;
    readonly entity: EntityTaxonomyType;
    readonly component: ComponentTaxonomyType;
    readonly state: StateTaxonomyType;
  };
  readonly expectedInsights: readonly string[];
}

// ============================================================================
// TYPE EXPORTS FOR SYSTEM INTEGRATION
// ============================================================================

export type {
  CouncilStatus,
  PropheticThemeCategory,
  ThemeSignificance,
  AnalysisMethodology
};