// src/config/efficiency_records.ts
// ============================================================================
// EFFICIENCY RECORDS - Performance tracking for COSMIC and GAIA
// ============================================================================
// ⚠️⚠️⚠️ AUTO-GENERATED DATA SECTION - Updated by COSMIC/GAIA ⚠️⚠️⚠️
// ⚠️⚠️⚠️ DO NOT EDIT BETWEEN THE MARKERS                    ⚠️⚠️⚠️
// ============================================================================

// >>>>>>>>>> AUTO-GENERATED DATA - START <<<<<<<<<<

export interface ProcessingRecord {
  id: string;
  timestamp: string;
  system: 'COSMIC' | 'GAIA';
  totalFilesGenerated: number;
  totalTimeMs: number;
  averageTimePerFile: number;
  cacheHits: number;
  cacheMisses: number;
  memoryUsage: number;
  fileTypeBreakdown: Record<string, number>;
}

export interface ResourceProfile {
  fileType: string;
  averageGenerationTimeMs: number;
  typicalSize: number;
  dependencies: string[];
}

export const EFFICIENCY_RECORDS: ProcessingRecord[] = [
  {
    "id": "20260417_045109",
    "timestamp": "2026-04-17T09:51:13.365Z",
    "system": "GAIA",
    "totalFilesGenerated": 36,
    "totalTimeMs": 0,
    "averageTimePerFile": 0,
    "cacheHits": 0,
    "cacheMisses": 36,
    "memoryUsage": 20439192,
    "fileTypeBreakdown": {
      "constants": 6,
      "types": 5,
      "validators": 5,
      "utils": 5,
      "api": 10,
      "hooks": 5
    }
  },
  {
    "id": "20260416_203542",
    "timestamp": "2026-04-17T01:35:46.387Z",
    "system": "GAIA",
    "totalFilesGenerated": 335,
    "totalTimeMs": 0,
    "averageTimePerFile": 0,
    "cacheHits": 0,
    "cacheMisses": 335,
    "memoryUsage": 27576464,
    "fileTypeBreakdown": {
      "constants": 0,
      "types": 0,
      "validators": 105,
      "utils": 0,
      "api": 230,
      "hooks": 0
    }
  },
  {
    "id": "20260416_182032",
    "timestamp": "2026-04-16T23:20:34.390Z",
    "system": "GAIA",
    "totalFilesGenerated": 335,
    "totalTimeMs": 0,
    "averageTimePerFile": 0,
    "cacheHits": 0,
    "cacheMisses": 335,
    "memoryUsage": 24061048,
    "fileTypeBreakdown": {
      "constants": 0,
      "types": 0,
      "validators": 105,
      "utils": 0,
      "api": 230,
      "hooks": 0
    }
  },
  {
    "id": "20260415_151814",
    "timestamp": "2026-04-15T20:18:16.583Z",
    "system": "GAIA",
    "totalFilesGenerated": 0,
    "totalTimeMs": 0,
    "averageTimePerFile": 0,
    "cacheHits": 0,
    "cacheMisses": 0,
    "memoryUsage": 23184672,
    "fileTypeBreakdown": {
      "constants": 0,
      "types": 0,
      "validators": 0,
      "utils": 0,
      "api": 0,
      "hooks": 0
    }
  }
];

export const RESOURCE_PROFILES: ResourceProfile[] = [];

// >>>>>>>>>> AUTO-GENERATED DATA - END <<<<<<<<<<

// ============================================================================
// MANUAL FUNCTIONS SECTION - Preserved across updates
// ============================================================================

import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const PROJECT_ROOT = path.resolve(__dirname, '../..');
const RECORDS_PATH = path.join(PROJECT_ROOT, 'src/config/efficiency_records.ts');

// ============================================================================
// PUBLIC API - PRESERVED FUNCTIONS
// ============================================================================

/**
 * Add a processing record
 */
export function addRecord(record: ProcessingRecord): void {
  EFFICIENCY_RECORDS.unshift(record);
  if (EFFICIENCY_RECORDS.length > 1000) {
    EFFICIENCY_RECORDS.length = 1000;
  }
  saveDataOnly();
}

/**
 * Get estimated time for a generation run
 */
export function estimateRunTime(fileTypes: Record<string, number>): number {
  let total = 0;
  for (const [fileType, count] of Object.entries(fileTypes)) {
    const profile = RESOURCE_PROFILES.find(p => p.fileType === fileType);
    if (profile) {
      total += profile.averageGenerationTimeMs * count;
    }
  }
  return total;
}

/**
 * Get efficiency statistics
 */
export function getEfficiencyStats(): {
  averageTotalTime: number;
  fastestRun: ProcessingRecord | null;
  slowestRun: ProcessingRecord | null;
  totalFilesGenerated: number;
  totalRuns: number;
  averageFilesPerRun: number;
} {
  if (EFFICIENCY_RECORDS.length === 0) {
    return {
      averageTotalTime: 0,
      fastestRun: null,
      slowestRun: null,
      totalFilesGenerated: 0,
      totalRuns: 0,
      averageFilesPerRun: 0
    };
  }
  
  let totalTime = 0;
  let fastest = EFFICIENCY_RECORDS[0];
  let slowest = EFFICIENCY_RECORDS[0];
  let totalFiles = 0;
  
  for (const record of EFFICIENCY_RECORDS) {
    totalTime += record.totalTimeMs;
    totalFiles += record.totalFilesGenerated;
    if (record.totalTimeMs < fastest.totalTimeMs) fastest = record;
    if (record.totalTimeMs > slowest.totalTimeMs) slowest = record;
  }
  
  return {
    averageTotalTime: totalTime / EFFICIENCY_RECORDS.length,
    fastestRun: fastest,
    slowestRun: slowest,
    totalFilesGenerated: totalFiles,
    totalRuns: EFFICIENCY_RECORDS.length,
    averageFilesPerRun: totalFiles / EFFICIENCY_RECORDS.length
  };
}

/**
 * Update resource profile
 */
export function updateResourceProfile(fileType: string, actualTimeMs: number, actualSize: number): void {
  const profileIndex = RESOURCE_PROFILES.findIndex(p => p.fileType === fileType);
  if (profileIndex !== -1) {
    RESOURCE_PROFILES[profileIndex].averageGenerationTimeMs = 
      RESOURCE_PROFILES[profileIndex].averageGenerationTimeMs * 0.8 + actualTimeMs * 0.2;
    RESOURCE_PROFILES[profileIndex].typicalSize = 
      RESOURCE_PROFILES[profileIndex].typicalSize * 0.8 + actualSize * 0.2;
    saveDataOnly();
  }
}

// ============================================================================
// INTERNAL FUNCTIONS
// ============================================================================

/**
 * Save only the data section (preserves functions)
 */
function saveDataOnly(): void {
  const content = fs.readFileSync(RECORDS_PATH, 'utf-8');
  
  // Find the auto-generated data markers
  const startMarker = '// >>>>>>>>>> AUTO-GENERATED DATA - START <<<<<<<<<<';
  const endMarker = '// >>>>>>>>>> AUTO-GENERATED DATA - END <<<<<<<<<<';
  
  const startIndex = content.indexOf(startMarker);
  const endIndex = content.indexOf(endMarker);
  
  if (startIndex === -1 || endIndex === -1) {
    // Fallback: rewrite entire file
    rewriteEntireFile();
    return;
  }
  
  // Generate new data section
  const newDataSection = `${startMarker}\n\n${generateDataSectionContent()}\n\n${endMarker}`;
  
  // Preserve everything before and after
  const beforeData = content.substring(0, startIndex);
  const afterData = content.substring(endIndex + endMarker.length);
  
  const newContent = beforeData + newDataSection + afterData;
  
  fs.writeFileSync(RECORDS_PATH, newContent, 'utf-8');
}

/**
 * Generate the data section content
 */
function generateDataSectionContent(): string {
  return `export interface ProcessingRecord {
  id: string;
  timestamp: string;
  system: 'COSMIC' | 'GAIA';
  totalFilesGenerated: number;
  totalTimeMs: number;
  averageTimePerFile: number;
  cacheHits: number;
  cacheMisses: number;
  memoryUsage: number;
  fileTypeBreakdown: Record<string, number>;
}

export interface ResourceProfile {
  fileType: string;
  averageGenerationTimeMs: number;
  typicalSize: number;
  dependencies: string[];
}

export const EFFICIENCY_RECORDS: ProcessingRecord[] = ${JSON.stringify(EFFICIENCY_RECORDS, null, 2)};

export const RESOURCE_PROFILES: ResourceProfile[] = ${JSON.stringify(RESOURCE_PROFILES, null, 2)};`;
}

/**
 * Rewrite entire file (fallback)
 */
function rewriteEntireFile(): void {
  const dataSection = generateDataSectionContent();
  const functionsSection = getFunctionsSection();
  
  const content = `// src/config/efficiency_records.ts
// ============================================================================
// EFFICIENCY RECORDS - Performance tracking for COSMIC and GAIA
// ============================================================================
// ⚠️⚠️⚠️ AUTO-GENERATED DATA SECTION - Updated by COSMIC/GAIA ⚠️⚠️⚠️
// ⚠️⚠️⚠️ DO NOT EDIT BETWEEN THE MARKERS                    ⚠️⚠️⚠️
// ============================================================================

// >>>>>>>>>> AUTO-GENERATED DATA - START <<<<<<<<<<

${dataSection}

// >>>>>>>>>> AUTO-GENERATED DATA - END <<<<<<<<<<

// ============================================================================
// MANUAL FUNCTIONS SECTION - Preserved across updates
// ============================================================================

${functionsSection}
`;
  
  fs.writeFileSync(RECORDS_PATH, content, 'utf-8');
}

/**
 * Get the functions section (preserved)
 */
function getFunctionsSection(): string {
  return `import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const PROJECT_ROOT = path.resolve(__dirname, '../..');
const RECORDS_PATH = path.join(PROJECT_ROOT, 'src/config/efficiency_records.ts');

export function addRecord(record: ProcessingRecord): void {
  EFFICIENCY_RECORDS.unshift(record);
  if (EFFICIENCY_RECORDS.length > 1000) {
    EFFICIENCY_RECORDS.length = 1000;
  }
  saveDataOnly();
}

export function estimateRunTime(fileTypes: Record<string, number>): number {
  let total = 0;
  for (const [fileType, count] of Object.entries(fileTypes)) {
    const profile = RESOURCE_PROFILES.find(p => p.fileType === fileType);
    if (profile) {
      total += profile.averageGenerationTimeMs * count;
    }
  }
  return total;
}

export function getEfficiencyStats(): {
  averageTotalTime: number;
  fastestRun: ProcessingRecord | null;
  slowestRun: ProcessingRecord | null;
  totalFilesGenerated: number;
  totalRuns: number;
  averageFilesPerRun: number;
} {
  if (EFFICIENCY_RECORDS.length === 0) {
    return {
      averageTotalTime: 0,
      fastestRun: null,
      slowestRun: null,
      totalFilesGenerated: 0,
      totalRuns: 0,
      averageFilesPerRun: 0
    };
  }
  
  let totalTime = 0;
  let fastest = EFFICIENCY_RECORDS[0];
  let slowest = EFFICIENCY_RECORDS[0];
  let totalFiles = 0;
  
  for (const record of EFFICIENCY_RECORDS) {
    totalTime += record.totalTimeMs;
    totalFiles += record.totalFilesGenerated;
    if (record.totalTimeMs < fastest.totalTimeMs) fastest = record;
    if (record.totalTimeMs > slowest.totalTimeMs) slowest = record;
  }
  
  return {
    averageTotalTime: totalTime / EFFICIENCY_RECORDS.length,
    fastestRun: fastest,
    slowestRun: slowest,
    totalFilesGenerated: totalFiles,
    totalRuns: EFFICIENCY_RECORDS.length,
    averageFilesPerRun: totalFiles / EFFICIENCY_RECORDS.length
  };
}

export function updateResourceProfile(fileType: string, actualTimeMs: number, actualSize: number): void {
  const profileIndex = RESOURCE_PROFILES.findIndex(p => p.fileType === fileType);
  if (profileIndex !== -1) {
    RESOURCE_PROFILES[profileIndex].averageGenerationTimeMs = 
      RESOURCE_PROFILES[profileIndex].averageGenerationTimeMs * 0.8 + actualTimeMs * 0.2;
    RESOURCE_PROFILES[profileIndex].typicalSize = 
      RESOURCE_PROFILES[profileIndex].typicalSize * 0.8 + actualSize * 0.2;
    saveDataOnly();
  }
}

function saveDataOnly(): void {
  const content = fs.readFileSync(RECORDS_PATH, 'utf-8');
  const startMarker = '// >>>>>>>>>> AUTO-GENERATED DATA - START <<<<<<<<<<';
  const endMarker = '// >>>>>>>>>> AUTO-GENERATED DATA - END <<<<<<<<<<';
  
  const startIndex = content.indexOf(startMarker);
  const endIndex = content.indexOf(endMarker);
  
  if (startIndex === -1 || endIndex === -1) {
    return;
  }
  
  const newDataSection = startMarker + '\\n\\n' + generateDataSectionContent() + '\\n\\n' + endMarker;
  const beforeData = content.substring(0, startIndex);
  const afterData = content.substring(endIndex + endMarker.length);
  
  fs.writeFileSync(RECORDS_PATH, beforeData + newDataSection + afterData, 'utf-8');
}

function generateDataSectionContent(): string {
  return \`export interface ProcessingRecord {
  id: string;
  timestamp: string;
  system: 'COSMIC' | 'GAIA';
  totalFilesGenerated: number;
  totalTimeMs: number;
  averageTimePerFile: number;
  cacheHits: number;
  cacheMisses: number;
  memoryUsage: number;
  fileTypeBreakdown: Record<string, number>;
}

export interface ResourceProfile {
  fileType: string;
  averageGenerationTimeMs: number;
  typicalSize: number;
  dependencies: string[];
}

export const EFFICIENCY_RECORDS: ProcessingRecord[] = \${JSON.stringify(EFFICIENCY_RECORDS, null, 2)};

export const RESOURCE_PROFILES: ResourceProfile[] = \${JSON.stringify(RESOURCE_PROFILES, null, 2)};\`;
}`;
}