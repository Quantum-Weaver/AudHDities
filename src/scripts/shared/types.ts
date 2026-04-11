// @/scripts/shared/types.ts
// Shared TypeScript interfaces for all parsing modules
// Single source of truth for data structures

import type { ExtractedObject as ExtractedObjectType } from './types.js';

// =====================================================
// FILE READING RESULTS
// =====================================================

export interface FileReadResult {
  success: boolean;
  encoding: string;
  content: string;           // Clean content, BOM stripped
  rawContent: string;        // Original content with BOM (if needed)
  bomType: 'utf-8' | 'utf-16le' | 'utf-16be' | 'none';
  error?: string;
}

export interface ParsedFile {
  content: string;
  lines: string[];
  totalLines: number;
  encoding: string;
  bomType: 'utf-8' | 'utf-16le' | 'utf-16be' | 'none';
}

// =====================================================
// MARKER RESULTS (Line numbers for key sections)
// =====================================================

export interface MarkerResult {
  // Database markers
  databaseLine: number;           // 'export type Database = {'
  dbWithoutInternalsLine: number; // 'type DatabaseWithoutInternals = ...'
  
  // Public section markers
  publicLine: number;             // '  public: {'
  
  // Collection markers inside public
  tablesLine: number;             // '    Tables: {'
  tablesEndLine: number;          // Closing brace of Tables
  viewsLine: number;              // '    Views: {'
  viewsEndLine: number;           // Closing brace of Views
  functionsLine: number;          // '    Functions: {'
  functionsEndLine: number;       // Closing brace of Functions
  enumsLine: number;              // '    Enums: {'
  enumsEndLine: number;           // Closing brace of Enums
  compositeTypesLine: number;     // '    CompositeTypes: {'
  compositeTypesEndLine: number;  // Closing brace of CompositeTypes
  
  // Constants markers
  constantsLine: number;          // 'export const Constants = {'
  constantsEndLine: number;       // Closing brace of Constants
  constantsEnumsLine: number;     // '    Enums: {' inside Constants
  constantsEnumsEndLine: number;  // Closing brace of Enums inside Constants
}

// =====================================================
// EXTRACTED OBJECT
// =====================================================

export type ObjectType = 'table' | 'view' | 'function' | 'enum' | 'composite' | 'unknown';

export interface ExtractedObject {
  name: string;                   // Object name (e.g., 'profiles', 'user_tier')
  content: string;               // Full content as string
  startLine: number;             // 1-indexed start line
  endLine: number;               // 1-indexed end line
  type: ObjectType;              // What kind of object this is
}

export interface ExtractedObjectWithDetails extends ExtractedObject {
  rowContent?: string;           // For tables: the Row definition
  insertContent?: string;        // For tables: the Insert definition
  updateContent?: string;        // For tables: the Update definition
  values?: string[];             // For enums: the array of values
  enumRefs?: string[];           // Enum references found in content
  hasJson?: boolean;             // Whether Json type is referenced
}

// =====================================================
// COLLECTION RESULTS
// =====================================================

export interface CollectionInfo {
  name: string;                  // 'Tables', 'Views', 'Functions', 'Enums'
  startLine: number;             // 1-indexed start line
  endLine: number;               // 1-indexed end line
  itemCount: number;             // Number of items in collection
  itemNames: string[];           // Names of all items (or first N)
}

export interface CollectionResult {
  tables: CollectionInfo;
  views: CollectionInfo;
  functions: CollectionInfo;
  enums: CollectionInfo;
  compositeTypes: CollectionInfo;
}

// =====================================================
// CONFIGURATION AND RULES
// =====================================================

export interface ObjectConfig {
  deityGroup?: string;           // 'hestia_core', 'plutus_economics', etc.
  outputFolder?: string;         // Where to write the file
  skipGeneration?: boolean;      // Whether to skip this object
  customTemplate?: string;       // Optional custom template path
  sensitiveFields?: string[];    // Fields to exclude from public interfaces
}

export interface ConfigRules {
  defaultDeityGroup: string;
  tableMapping: Record<string, ObjectConfig>;
  viewMapping: Record<string, ObjectConfig>;
  functionMapping: Record<string, ObjectConfig>;
  enumMapping: Record<string, ObjectConfig>;
}

// =====================================================
// CHECKLIST AND PROGRESS TRACKING
// =====================================================

export interface ChecklistProgress {
  objectName: string;
  objectType: ObjectType;
  
  // Phase flags
  extracted: boolean;
  analyzed: boolean;
  typesGenerated: boolean;
  constantsGenerated: boolean;
  utilsGenerated: boolean;
  apisGenerated: boolean;
  
  // Metadata
  startTime?: Date;
  endTime?: Date;
  errors: string[];
  warnings: string[];
}

export interface PipelineProgress {
  totalObjects: number;
  processedObjects: number;
  currentObject: string | null;
  currentPhase: string;
  checklist: Map<string, ChecklistProgress>;
}

// =====================================================
// VALIDATION RESULTS
// =====================================================

export interface ValidationResult {
  valid: boolean;
  errors: string[];
  warnings: string[];
  suggestions?: string[];
}

export interface FileValidationResult extends ValidationResult {
  filePath: string;
  lineCount: number;
  size: number;
}

// =====================================================
// GENERATION RESULTS
// =====================================================

export interface GeneratedFile {
  path: string;
  content: string;
  overwrite: boolean;
  validated: boolean;
}

export interface GenerationResult {
  success: boolean;
  filesCreated: string[];
  filesSkipped: string[];
  filesOverwritten: string[];
  errors: string[];
  warnings: string[];
}

// =====================================================
// OBJECT CONTENT FORMATS
// =====================================================

export interface FormattedTypeContent {
  header: string;
  imports: string[];
  coreTypes: string;
  derivedTypes: string;
  fullContent: string;
}

export interface FormattedConstantContent {
  header: string;
  imports: string[];
  constantObject: string;
  typeExport: string;
  fullContent: string;
}

export interface FormattedUtilContent {
  header: string;
  imports: string[];
  functions: string;
  exports: string;
  fullContent: string;
}

export interface FormattedApiContent {
  header: string;
  imports: string[];
  routeHandler: string;
  validation: string;
  fullContent: string;
}

// =====================================================
// HELPER TYPE FOR PATTERN MATCHING
// =====================================================

export interface PatternMatch {
  pattern: RegExp;
  name: string;
  startOffset?: number;
}

// =====================================================
// RE-EXPORT FOR CONVENIENCE
// =====================================================

export type { ExtractedObjectType };