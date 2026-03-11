// types/systems/data/api.ts - PURIFIED VERSION
import type {
  ProcessOntologyType,
  TransformationOntologyType,
  EnergyOntologyType,
  BeingOntologyType,
  PatternTaxonomyType,
  StateTaxonomyType,
  DataTaxonomyType,
  SystemTaxonomyType,
  RelationshipTaxonomyType,
  ArchitectureTaxonomyType
} from '@/types/gaia';

import type {
  EntityState,
  ApiProtocolType,
  ApiAuthenticationType,
  ApiEndpointType,
  ApiResponseStatus,
  ApiRateLimitTier,
  ApiCacheStrategy,
  ApiVersioningStrategy,
  RateLimitStrategy,
  ConsciousnessLevel
} from '@/types/cosmic/primitives';
import { PerformanceOptimization } from '@/types/systems/layout/store'
// ============================================================================
// API ENDPOINT ARCHITECTURE
// ============================================================================

export interface ApiEndpoint {
  // ENDPOINT IDENTITY
  readonly id: string;
  readonly path: string;
  readonly method: string;
  readonly type: ApiEndpointType;
  
  // FUNCTIONAL SPECIFICATION
  readonly description: string;
  readonly parameters: readonly ApiParameter[];
  readonly responses: readonly ApiResponse[];
  readonly examples: readonly ApiExample[];
  
  // SECURITY AND ACCESS
  readonly authentication: ApiAuthenticationType;
  readonly rateLimit: ApiRateLimit;
  readonly permissions: readonly string[];
  
  // ONTOLOGICAL CONTEXT
  readonly processOntology: ProcessOntologyType;
  
  // TAXONOMIC CLASSIFICATION
  readonly systemTaxonomy: SystemTaxonomyType;
}

export interface ApiParameter {
  // PARAMETER IDENTITY
  readonly name: string;
  readonly type: string;
  readonly location: string;
  
  // CONSTRAINT SPECIFICATION
  readonly required: boolean;
  readonly defaultValue?: unknown;
  readonly validation: ParameterValidation;
  readonly description: string;
  
  // ONTOLOGICAL CONTEXT
  readonly dataTaxonomy: DataTaxonomyType;
}

export interface ParameterValidation {
  // VALIDATION PROPERTIES
  readonly pattern?: string;
  readonly minimum?: number;
  readonly maximum?: number;
  readonly enum?: readonly string[];
  readonly custom?: string;
  
  // ONTOLOGICAL CONTEXT
  readonly processOntology: ProcessOntologyType;
}

export interface ApiResponse {
  // RESPONSE IDENTITY
  readonly status: ApiResponseStatus;
  readonly code: number;
  
  // CONTENT SPECIFICATION
  readonly description: string;
  readonly schema: string;
  readonly headers: readonly ApiHeader[];
  readonly examples: readonly ResponseExample[];
  
  // ONTOLOGICAL CONTEXT
  readonly transformationOntology: TransformationOntologyType;
}

export interface ApiHeader {
  // HEADER SPECIFICATION
  readonly name: string;
  readonly value: string;
  readonly description: string;
  readonly required: boolean;
  
  // ONTOLOGICAL CONTEXT
  readonly dataTaxonomy: DataTaxonomyType;
}

export interface ApiExample {
  // EXAMPLE SPECIFICATION
  readonly name: string;
  readonly request: Record<string, unknown>;
  readonly response: Record<string, unknown>;
  readonly description: string;
  
  // ONTOLOGICAL CONTEXT
  readonly processOntology: ProcessOntologyType;
}

export interface ResponseExample {
  // RESPONSE EXAMPLE SPECIFICATION
  readonly name: string;
  readonly data: Record<string, unknown>;
  readonly description: string;
  
  // ONTOLOGICAL CONTEXT
  readonly dataTaxonomy: DataTaxonomyType;
}

export interface ApiRateLimit {
  // RATE LIMIT SPECIFICATION
  readonly tier: ApiRateLimitTier;
  readonly requestsPerMinute: number;
  readonly burstCapacity: number;
  readonly strategy: RateLimitStrategy;
  
  // ONTOLOGICAL CONTEXT
  readonly systemTaxonomy: SystemTaxonomyType;
}

// ============================================================================
// API SCHEMA ARCHITECTURE
// ============================================================================

export interface ApiSchema {
  // SCHEMA IDENTITY
  readonly id: string;
  readonly name: string;
  readonly version: string;
  readonly protocol: ApiProtocolType;
  
  // STRUCTURE DEFINITION
  readonly endpoints: readonly ApiEndpoint[];
  readonly models: readonly ApiModel[];
  readonly enums: readonly ApiEnum[];
  
  // VERSIONING AND EVOLUTION
  readonly versioning: ApiVersioning;
  readonly deprecations: readonly ApiDeprecation[];
  
  // ONTOLOGICAL CONTEXT
  readonly architectureTaxonomy: ArchitectureTaxonomyType;
  
  // TAXONOMIC CLASSIFICATION
  readonly systemTaxonomy: SystemTaxonomyType;
}

export interface ApiModel {
  // MODEL IDENTITY
  readonly name: string;
  readonly description: string;
  
  // STRUCTURE DEFINITION
  readonly properties: readonly ModelProperty[];
  readonly required: readonly string[];
  readonly extends?: string;
  
  // ONTOLOGICAL CONTEXT
  readonly dataTaxonomy: DataTaxonomyType;
}

export interface ModelProperty {
  // PROPERTY IDENTITY
  readonly name: string;
  readonly type: string;
  
  // PROPERTY SPECIFICATION
  readonly description: string;
  readonly format?: string;
  readonly constraints: PropertyConstraints;
  
  // ONTOLOGICAL CONTEXT
  readonly dataTaxonomy: DataTaxonomyType;
}

export interface PropertyConstraints {
  // CONSTRAINT PROPERTIES
  readonly nullable: boolean;
  readonly readOnly: boolean;
  readonly writeOnly: boolean;
  readonly pattern?: string;
  readonly minimum?: number;
  readonly maximum?: number;
  
  // ONTOLOGICAL CONTEXT
  readonly processOntology: ProcessOntologyType;
}

export interface ApiEnum {
  // ENUM IDENTITY
  readonly name: string;
  readonly description: string;
  
  // VALUE DEFINITION
  readonly values: readonly EnumValue[];
  readonly type: string;
  
  // ONTOLOGICAL CONTEXT
  readonly dataTaxonomy: DataTaxonomyType;
}

export interface EnumValue {
  // VALUE SPECIFICATION
  readonly name: string;
  readonly value: string | number;
  readonly description: string;
  
  // ONTOLOGICAL CONTEXT
  readonly dataTaxonomy: DataTaxonomyType;
}

export interface ApiVersioning {
  // VERSIONING SPECIFICATION
  readonly strategy: ApiVersioningStrategy;
  readonly current: string;
  readonly supported: readonly string[];
  readonly deprecated: readonly string[];
  
  // ONTOLOGICAL CONTEXT
  readonly transformationOntology: TransformationOntologyType;
}

export interface ApiDeprecation {
  // DEPRECATION SPECIFICATION
  readonly endpoint: string;
  readonly deprecatedVersion: string;
  readonly sunsetVersion: string;
  readonly migration: string;
  readonly alternatives: readonly string[];
  
  // ONTOLOGICAL CONTEXT
  readonly processOntology: ProcessOntologyType;
}

// ============================================================================
// API SECURITY ARCHITECTURE
// ============================================================================

export interface ApiSecurity {
  // SECURITY IDENTITY
  readonly id: string;
  readonly name: string;
  
  // AUTHENTICATION CONFIGURATION
  readonly authentication: SecurityAuthentication;
  readonly authorization: SecurityAuthorization;
  readonly encryption: SecurityEncryption;
  
  // COMPLIANCE AND AUDITING
  readonly compliance: SecurityCompliance;
  readonly auditing: SecurityAuditing;
  
  // ONTOLOGICAL CONTEXT
  readonly systemTaxonomy: SystemTaxonomyType;
}

export interface SecurityAuthentication {
  // AUTHENTICATION SPECIFICATION
  readonly type: ApiAuthenticationType;
  readonly providers: readonly AuthProvider[];
  readonly multiFactor: boolean;
  readonly session: SessionConfig;
  
  // ONTOLOGICAL CONTEXT
  readonly processOntology: ProcessOntologyType;
}

export interface AuthProvider {
  // PROVIDER SPECIFICATION
  readonly name: string;
  readonly type: string;
  readonly configuration: Record<string, unknown>;
  
  // ONTOLOGICAL CONTEXT
  readonly systemTaxonomy: SystemTaxonomyType;
}

export interface SessionConfig {
  // SESSION CONFIGURATION
  readonly timeout: number; // Consciousness cycles
  readonly renewal: boolean;
  readonly maxSessions: number;
  
  // ONTOLOGICAL CONTEXT
  readonly stateTaxonomy: StateTaxonomyType;
}

export interface SecurityAuthorization {
  // AUTHORIZATION SPECIFICATION
  readonly model: string;
  readonly roles: readonly SecurityRole[];
  readonly permissions: readonly SecurityPermission[];
  
  // ONTOLOGICAL CONTEXT
  readonly relationshipTaxonomy: RelationshipTaxonomyType;
}

export interface SecurityRole {
  // ROLE SPECIFICATION
  readonly name: string;
  readonly description: string;
  readonly permissions: readonly string[];
  
  // ONTOLOGICAL CONTEXT
  readonly systemTaxonomy: SystemTaxonomyType;
}

export interface SecurityPermission {
  // PERMISSION SPECIFICATION
  readonly name: string;
  readonly description: string;
  readonly resources: readonly string[];
  readonly actions: readonly string[];
  
  // ONTOLOGICAL CONTEXT
  readonly processOntology: ProcessOntologyType;
}

export interface SecurityEncryption {
  // ENCRYPTION SPECIFICATION
  readonly inTransit: EncryptionConfig;
  readonly atRest: EncryptionConfig;
  readonly keyManagement: KeyManagement;
  
  // ONTOLOGICAL CONTEXT
  readonly systemTaxonomy: SystemTaxonomyType;
}

export interface EncryptionConfig {
  // ENCRYPTION CONFIGURATION
  readonly algorithm: string;
  readonly keySize: number;
  readonly mode: string;
  
  // ONTOLOGICAL CONTEXT
  readonly processOntology: ProcessOntologyType;
}

export interface KeyManagement {
  // KEY MANAGEMENT SPECIFICATION
  readonly provider: string;
  readonly rotation: number; // Consciousness cycles
  readonly backup: boolean;
  
  // ONTOLOGICAL CONTEXT
  readonly systemTaxonomy: SystemTaxonomyType;
}

export interface SecurityCompliance {
  // COMPLIANCE SPECIFICATION
  readonly standards: readonly string[];
  readonly certifications: readonly string[];
  readonly requirements: readonly ComplianceRequirement[];
  
  // ONTOLOGICAL CONTEXT
  readonly systemTaxonomy: SystemTaxonomyType;
}

export interface ComplianceRequirement {
  // REQUIREMENT SPECIFICATION
  readonly standard: string;
  readonly requirement: string;
  readonly implementation: string;
  
  // ONTOLOGICAL CONTEXT
  readonly processOntology: ProcessOntologyType;
}

export interface SecurityAuditing {
  // AUDITING SPECIFICATION
  readonly enabled: boolean;
  readonly retention: number; // Consciousness cycles
  readonly events: readonly AuditEvent[];
  
  // ONTOLOGICAL CONTEXT
  readonly dataTaxonomy: DataTaxonomyType;
}

export interface AuditEvent {
  // EVENT SPECIFICATION
  readonly type: string;
  readonly description: string;
  readonly severity: string;
  
  // ONTOLOGICAL CONTEXT
  readonly processOntology: ProcessOntologyType;
}

// ============================================================================
// API PERFORMANCE ARCHITECTURE
// ============================================================================

export interface ApiPerformance {
  // PERFORMANCE IDENTITY
  readonly id: string;
  readonly name: string;
  
  // CACHING CONFIGURATION
  readonly caching: PerformanceCaching;
  readonly compression: PerformanceCompression;
  readonly optimization: PerformanceOptimization;
  
  // MONITORING AND METRICS
  readonly monitoring: PerformanceMonitoring;
  
  // ONTOLOGICAL CONTEXT
  readonly energyOntology: EnergyOntologyType;
  
  // TAXONOMIC CLASSIFICATION
  readonly systemTaxonomy: SystemTaxonomyType;
}

export interface PerformanceCaching {
  // CACHING CONFIGURATION
  readonly strategy: ApiCacheStrategy;
  readonly ttl: number; // Consciousness cycles
  readonly size: number;
  readonly invalidation: CacheInvalidation;
  
  // ONTOLOGICAL CONTEXT
  readonly systemTaxonomy: SystemTaxonomyType;
}

export interface CacheInvalidation {
  // INVALIDATION SPECIFICATION
  readonly strategy: string;
  readonly events: readonly string[];
  
  // ONTOLOGICAL CONTEXT
  readonly processOntology: ProcessOntologyType;
}

export interface PerformanceCompression {
  // COMPRESSION CONFIGURATION
  readonly enabled: boolean;
  readonly algorithms: readonly string[];
  readonly minSize: number;
  
  // ONTOLOGICAL CONTEXT
  readonly dataTaxonomy: DataTaxonomyType;
}

export interface QueryOptimization {
  // QUERY OPTIMIZATION
  readonly maxDepth: number;
  readonly maxComplexity: number;
  readonly timeout: number; // Consciousness cycles
  
  // ONTOLOGICAL CONTEXT
  readonly processOntology: ProcessOntologyType;
}

export interface ResponseOptimization {
  // RESPONSE OPTIMIZATION
  readonly pagination: PaginationConfig;
  readonly fieldSelection: boolean;
  readonly compression: boolean;
  
  // ONTOLOGICAL CONTEXT
  readonly dataTaxonomy: DataTaxonomyType;
}

export interface PaginationConfig {
  // PAGINATION CONFIGURATION
  readonly defaultSize: number;
  readonly maxSize: number;
  readonly strategy: string;
  
  // ONTOLOGICAL CONTEXT
  readonly processOntology: ProcessOntologyType;
}

export interface ConnectionOptimization {
  // CONNECTION OPTIMIZATION
  readonly keepAlive: boolean;
  readonly timeout: number; // Consciousness cycles
  readonly poolSize: number;
  
  // ONTOLOGICAL CONTEXT
  readonly systemTaxonomy: SystemTaxonomyType;
}

export interface PerformanceMonitoring {
  // MONITORING CONFIGURATION
  readonly metrics: readonly PerformanceMetric[];
  readonly alerts: readonly PerformanceAlert[];
  readonly dashboards: readonly MonitoringDashboard[];
  
  // ONTOLOGICAL CONTEXT
  readonly stateTaxonomy: StateTaxonomyType;
}

export interface PerformanceMetric {
  // METRIC SPECIFICATION
  readonly name: string;
  readonly description: string;
  readonly unit: string;
  readonly aggregation: string;
  
  // ONTOLOGICAL CONTEXT
  readonly dataTaxonomy: DataTaxonomyType;
}

export interface PerformanceAlert {
  // ALERT SPECIFICATION
  readonly metric: string;
  readonly condition: string;
  readonly threshold: number;
  readonly severity: string;
  
  // ONTOLOGICAL CONTEXT
  readonly processOntology: ProcessOntologyType;
}

export interface MonitoringDashboard {
  // DASHBOARD SPECIFICATION
  readonly name: string;
  readonly description: string;
  readonly widgets: readonly DashboardWidget[];
  
  // ONTOLOGICAL CONTEXT
  readonly systemTaxonomy: SystemTaxonomyType;
}

export interface DashboardWidget {
  // WIDGET SPECIFICATION
  readonly type: string;
  readonly metric: string;
  readonly configuration: Record<string, unknown>;
  
  // ONTOLOGICAL CONTEXT
  readonly dataTaxonomy: DataTaxonomyType;
}

// ============================================================================
// API SYSTEM ONTOLOGICAL MAPPING
// ============================================================================

export interface ApiSystemMapping {
  readonly apiType: ApiProtocolType;
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
    readonly relationship: RelationshipTaxonomyType;
    readonly architecture: ArchitectureTaxonomyType;
  };
  readonly integrationPatterns: readonly string[];
  readonly communicationCharacteristics: readonly string[];
}

// ============================================================================
// TYPE EXPORTS FOR SYSTEM INTEGRATION
// ============================================================================

export type {
  ApiProtocolType,
  ApiAuthenticationType,
  ApiEndpointType,
  ApiResponseStatus,
  ApiRateLimitTier,
  ApiCacheStrategy,
  ApiVersioningStrategy,
  RateLimitStrategy
};