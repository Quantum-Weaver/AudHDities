// @/config/efficiency_records.ts
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
    "id": "20260413_113632",
    "timestamp": "2026-04-13T16:36:33.633Z",
    "system": "GAIA",
    "totalFilesGenerated": 198,
    "totalTimeMs": 0,
    "averageTimePerFile": 0,
    "cacheHits": 0,
    "cacheMisses": 198,
    "memoryUsage": 24125544,
    "fileTypeBreakdown": {
      "constants": 198,
      "types": 0,
      "validators": 0,
      "utils": 0,
      "api": 0,
      "hooks": 0
    }
  },
  {
    "id": "20260413_112916",
    "timestamp": "2026-04-13T16:29:16.777Z",
    "system": "GAIA",
    "totalFilesGenerated": 99,
    "totalTimeMs": 0,
    "averageTimePerFile": 0,
    "cacheHits": 0,
    "cacheMisses": 99,
    "memoryUsage": 31499536,
    "fileTypeBreakdown": {
      "constants": 99,
      "types": 0,
      "validators": 0,
      "utils": 0,
      "api": 0,
      "hooks": 0
    }
  },
  {
    "id": "20260413_102950",
    "timestamp": "2026-04-13T15:29:51.415Z",
    "system": "GAIA",
    "totalFilesGenerated": 498,
    "totalTimeMs": 0,
    "averageTimePerFile": 0,
    "cacheHits": 0,
    "cacheMisses": 498,
    "memoryUsage": 25293104,
    "fileTypeBreakdown": {
      "constants": 198,
      "types": 105,
      "validators": 99,
      "utils": 96,
      "api": 0,
      "hooks": 0
    }
  },
  {
    "id": "20260413_102930",
    "timestamp": "2026-04-13T15:29:31.316Z",
    "system": "GAIA",
    "totalFilesGenerated": 99,
    "totalTimeMs": 0,
    "averageTimePerFile": 0,
    "cacheHits": 0,
    "cacheMisses": 99,
    "memoryUsage": 21482904,
    "fileTypeBreakdown": {
      "constants": 99,
      "types": 0,
      "validators": 0,
      "utils": 0,
      "api": 0,
      "hooks": 0
    }
  },
  {
    "id": "20260413_102121",
    "timestamp": "2026-04-13T15:21:21.619Z",
    "system": "GAIA",
    "totalFilesGenerated": 99,
    "totalTimeMs": 0,
    "averageTimePerFile": 0,
    "cacheHits": 0,
    "cacheMisses": 99,
    "memoryUsage": 23722584,
    "fileTypeBreakdown": {
      "constants": 99,
      "types": 0,
      "validators": 0,
      "utils": 0,
      "api": 0,
      "hooks": 0
    }
  },
  {
    "id": "20260413_011341",
    "timestamp": "2026-04-13T06:13:43.288Z",
    "system": "GAIA",
    "totalFilesGenerated": 399,
    "totalTimeMs": 0,
    "averageTimePerFile": 0,
    "cacheHits": 0,
    "cacheMisses": 399,
    "memoryUsage": 27398688,
    "fileTypeBreakdown": {
      "constants": 99,
      "types": 105,
      "validators": 99,
      "utils": 96,
      "api": 0,
      "hooks": 0
    }
  },
  {
    "id": "20260413_005512",
    "timestamp": "2026-04-13T05:55:14.253Z",
    "system": "GAIA",
    "totalFilesGenerated": 238,
    "totalTimeMs": 0,
    "averageTimePerFile": 0,
    "cacheHits": 0,
    "cacheMisses": 238,
    "memoryUsage": 24717264,
    "fileTypeBreakdown": {
      "constants": 106,
      "types": 8,
      "validators": 7,
      "utils": 7,
      "api": 14,
      "hooks": 96
    }
  },
  {
    "id": "20260413_005454",
    "timestamp": "2026-04-13T05:54:55.691Z",
    "system": "GAIA",
    "totalFilesGenerated": 99,
    "totalTimeMs": 0,
    "averageTimePerFile": 0,
    "cacheHits": 0,
    "cacheMisses": 99,
    "memoryUsage": 28475992,
    "fileTypeBreakdown": {
      "constants": 99,
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
const RECORDS_PATH = path.join(PROJECT_ROOT, '@/config/efficiency_records.ts');

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
  
  const content = `// @/config/efficiency_records.ts
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
const RECORDS_PATH = path.join(PROJECT_ROOT, '@/config/efficiency_records.ts');

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