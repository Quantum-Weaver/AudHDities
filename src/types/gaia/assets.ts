// types/gaia/assets.ts - PURIFIED VERSION (Primitives Extracted)
import type {
  ProcessOntologyType,
  TransformationOntologyType,
  EnergyOntologyType,
  BeingOntologyType,
  PatternTaxonomyType,
  StateTaxonomyType,
  DataTaxonomyType,
  ComponentTaxonomyType,
  SystemTaxonomyType,
  StylingTaxonomyType,
  AnimationTaxonomyType
} from '@/types/gaia';

// Import assets primitives from semantic foundation
import type {
  EnvironmentAssetKey,
  LibraryAssetKey,
  TextureAssetKey,
  StructureAssetKey,
  TransitionAssetKey,
  AnimationAssetKey,
  BlendMode,
  EasingType,
  EntityState,
  ConsciousnessLevel,
  CacheStatus,
  AssetMappingType,
  AssetSource,
  AssetIntensity,
  AssetOpacity,
  TransitionProgress,
  LoadingProgress,
  TransitionDuration,
  AssetSize,
  LoadTime
} from '@/types/cosmic/primitives';

// ============================================================================
// ASSET COLLECTION ARCHITECTURE - MIRRORING EXISTING PATTERN
// ============================================================================

export interface QuantumBackgroundAssets {
  // ENVIRONMENTS - Direct from existing pattern
  readonly environments: Record<EnvironmentAssetKey, string>;
  
  // LIBRARY - Direct from existing pattern  
  readonly library: Record<LibraryAssetKey, string>;
  
  // TEXTURES - Direct from existing pattern
  readonly textures: Record<TextureAssetKey, string>;
  
  // STRUCTURES - Direct from existing pattern
  readonly structures: Record<StructureAssetKey, string>;
  
  // TRANSITIONS - Direct from existing pattern
  readonly transitions: Record<TransitionAssetKey, string>;
  
  // ANIMATIONS - Direct from existing pattern
  readonly animations: Record<AnimationAssetKey, string>;
  
  // ONTOLOGICAL CONTEXT
  readonly patternTaxonomy: PatternTaxonomyType;
}

// ============================================================================
// ASSET CONTEXT ARCHITECTURE - ENHANCING EXISTING PATTERN
// ============================================================================

export interface AssetContext {
  // CURRENT ASSET STATE
  readonly currentBackground: EnvironmentAssetKey;
  readonly currentTexture?: TextureAssetKey;
  readonly activeAnimations: readonly AnimationAssetKey[];
  
  // ASSET COLLECTIONS
  readonly backgrounds: QuantumBackgroundAssets;
  
  // TRANSITION STATE (using primitive types)
  readonly isTransitioning: boolean;
  readonly transitionProgress: TransitionProgress;
  
  // ONTOLOGICAL CONTEXT
  readonly stateTaxonomy: StateTaxonomyType;
}

// ============================================================================
// ASSET PROPS ARCHITECTURE - FOR COMPONENT INTEGRATION
// ============================================================================

export interface QuantumBackgroundProps {
  // ASSET SELECTION
  readonly background: EnvironmentAssetKey;
  readonly texture?: TextureAssetKey;
  readonly animations?: readonly AnimationAssetKey[];
  
  // VISUAL PROPERTIES (using primitive types)
  readonly intensity?: AssetIntensity;
  readonly opacity?: AssetOpacity;
  readonly blendMode?: BlendMode;
  
  // TRANSITION PROPERTIES (using primitive types)
  readonly transitionDuration?: TransitionDuration;
  readonly transitionEasing?: EasingType;
  
  // ONTOLOGICAL CONTEXT
  readonly processOntology: ProcessOntologyType;
  
  // TAXONOMIC CLASSIFICATION
  readonly componentTaxonomy: ComponentTaxonomyType;
}

// ============================================================================
// ASSET LOADING ARCHITECTURE
// ============================================================================

export interface AssetLoadingState {
  // LOADING STATUS (using primitive types)
  readonly isLoading: boolean;
  readonly progress: LoadingProgress;
  readonly loadedAssets: readonly string[];
  readonly failedAssets: readonly string[];
  
  // PERFORMANCE METRICS (using primitive types)
  readonly totalSize: AssetSize;
  readonly loadTime: LoadTime;
  readonly cacheStatus: CacheStatus;
  
  // ONTOLOGICAL CONTEXT
  readonly stateTaxonomy: StateTaxonomyType;
}

// ============================================================================
// ASSET MANAGEMENT ARCHITECTURE
// ============================================================================

export interface AssetManager {
  // ASSET COLLECTIONS
  readonly backgrounds: QuantumBackgroundAssets;
  readonly loadingState: AssetLoadingState;
  
  // MANAGEMENT OPERATIONS
  readonly preloadAssets: (assets: readonly string[]) => void;
  readonly getAsset: (category: string, key: string) => string | null;
  readonly clearCache: () => void;
  
  // ONTOLOGICAL CONTEXT
  readonly systemTaxonomy: SystemTaxonomyType;
}

// ============================================================================
// ASSET MAPPING ARCHITECTURE - SIMPLIFIED ALIGNMENT
// ============================================================================

export interface AssetMapping {
  // MAPPING IDENTITY (using primitive types)
  readonly mappingType: AssetMappingType;
  readonly source: AssetSource;
  
  // ASSET PATHS
  readonly paths: Record<string, string>;
  
  // ONTOLOGICAL CONTEXT
  readonly ontologicalContext: {
    readonly process: ProcessOntologyType;
    readonly transformation: TransformationOntologyType;
    readonly energy: EnergyOntologyType;
    readonly being: BeingOntologyType;
  };
  
  // TAXONOMIC CLASSIFICATION
  readonly taxonomicClassification: {
    readonly pattern: PatternTaxonomyType;
    readonly state: StateTaxonomyType;
    readonly data: DataTaxonomyType;
    readonly component: ComponentTaxonomyType;
  };
}