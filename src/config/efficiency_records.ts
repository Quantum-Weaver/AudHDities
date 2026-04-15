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
    "id": "20260414_201923",
    "timestamp": "2026-04-15T01:19:27.128Z",
    "system": "GAIA",
    "totalFilesGenerated": 230,
    "totalTimeMs": 0,
    "averageTimePerFile": 0,
    "cacheHits": 0,
    "cacheMisses": 230,
    "memoryUsage": 33609864,
    "fileTypeBreakdown": {
      "constants": 0,
      "types": 0,
      "validators": 0,
      "utils": 0,
      "api": 230,
      "hooks": 0
    }
  },
  {
    "id": "20260414_201836",
    "timestamp": "2026-04-15T01:18:40.214Z",
    "system": "GAIA",
    "totalFilesGenerated": 105,
    "totalTimeMs": 0,
    "averageTimePerFile": 0,
    "cacheHits": 0,
    "cacheMisses": 105,
    "memoryUsage": 31847528,
    "fileTypeBreakdown": {
      "constants": 0,
      "types": 0,
      "validators": 105,
      "utils": 0,
      "api": 0,
      "hooks": 0
    }
  },
  {
    "id": "20260414_201739",
    "timestamp": "2026-04-15T01:17:43.699Z",
    "system": "GAIA",
    "totalFilesGenerated": 105,
    "totalTimeMs": 0,
    "averageTimePerFile": 0,
    "cacheHits": 0,
    "cacheMisses": 105,
    "memoryUsage": 27373848,
    "fileTypeBreakdown": {
      "constants": 0,
      "types": 0,
      "validators": 105,
      "utils": 0,
      "api": 0,
      "hooks": 0
    }
  },
  {
    "id": "20260414_201530",
    "timestamp": "2026-04-15T01:15:33.149Z",
    "system": "GAIA",
    "totalFilesGenerated": 105,
    "totalTimeMs": 0,
    "averageTimePerFile": 0,
    "cacheHits": 0,
    "cacheMisses": 105,
    "memoryUsage": 30439928,
    "fileTypeBreakdown": {
      "constants": 0,
      "types": 0,
      "validators": 105,
      "utils": 0,
      "api": 0,
      "hooks": 0
    }
  },
  {
    "id": "20260414_201010",
    "timestamp": "2026-04-15T01:10:14.560Z",
    "system": "GAIA",
    "totalFilesGenerated": 335,
    "totalTimeMs": 0,
    "averageTimePerFile": 0,
    "cacheHits": 0,
    "cacheMisses": 335,
    "memoryUsage": 31859896,
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
    "id": "20260414_200648",
    "timestamp": "2026-04-15T01:06:52.175Z",
    "system": "GAIA",
    "totalFilesGenerated": 105,
    "totalTimeMs": 0,
    "averageTimePerFile": 0,
    "cacheHits": 0,
    "cacheMisses": 105,
    "memoryUsage": 29715176,
    "fileTypeBreakdown": {
      "constants": 0,
      "types": 0,
      "validators": 105,
      "utils": 0,
      "api": 0,
      "hooks": 0
    }
  },
  {
    "id": "20260414_190936",
    "timestamp": "2026-04-15T00:09:40.039Z",
    "system": "GAIA",
    "totalFilesGenerated": 105,
    "totalTimeMs": 0,
    "averageTimePerFile": 0,
    "cacheHits": 0,
    "cacheMisses": 105,
    "memoryUsage": 30350800,
    "fileTypeBreakdown": {
      "constants": 0,
      "types": 0,
      "validators": 105,
      "utils": 0,
      "api": 0,
      "hooks": 0
    }
  },
  {
    "id": "20260414_190825",
    "timestamp": "2026-04-15T00:08:30.912Z",
    "system": "GAIA",
    "totalFilesGenerated": 105,
    "totalTimeMs": 0,
    "averageTimePerFile": 0,
    "cacheHits": 0,
    "cacheMisses": 105,
    "memoryUsage": 32004432,
    "fileTypeBreakdown": {
      "constants": 0,
      "types": 0,
      "validators": 105,
      "utils": 0,
      "api": 0,
      "hooks": 0
    }
  },
  {
    "id": "20260414_190616",
    "timestamp": "2026-04-15T00:06:21.214Z",
    "system": "GAIA",
    "totalFilesGenerated": 105,
    "totalTimeMs": 0,
    "averageTimePerFile": 0,
    "cacheHits": 0,
    "cacheMisses": 105,
    "memoryUsage": 29460368,
    "fileTypeBreakdown": {
      "constants": 0,
      "types": 0,
      "validators": 105,
      "utils": 0,
      "api": 0,
      "hooks": 0
    }
  },
  {
    "id": "20260414_190550",
    "timestamp": "2026-04-15T00:05:55.098Z",
    "system": "GAIA",
    "totalFilesGenerated": 0,
    "totalTimeMs": 0,
    "averageTimePerFile": 0,
    "cacheHits": 0,
    "cacheMisses": 0,
    "memoryUsage": 30526480,
    "fileTypeBreakdown": {
      "constants": 0,
      "types": 0,
      "validators": 0,
      "utils": 0,
      "api": 0,
      "hooks": 0
    }
  },
  {
    "id": "20260414_190449",
    "timestamp": "2026-04-15T00:04:54.586Z",
    "system": "GAIA",
    "totalFilesGenerated": 105,
    "totalTimeMs": 0,
    "averageTimePerFile": 0,
    "cacheHits": 0,
    "cacheMisses": 105,
    "memoryUsage": 29348664,
    "fileTypeBreakdown": {
      "constants": 0,
      "types": 0,
      "validators": 105,
      "utils": 0,
      "api": 0,
      "hooks": 0
    }
  },
  {
    "id": "20260414_190215",
    "timestamp": "2026-04-15T00:02:21.791Z",
    "system": "GAIA",
    "totalFilesGenerated": 105,
    "totalTimeMs": 0,
    "averageTimePerFile": 0,
    "cacheHits": 0,
    "cacheMisses": 105,
    "memoryUsage": 34020704,
    "fileTypeBreakdown": {
      "constants": 0,
      "types": 0,
      "validators": 105,
      "utils": 0,
      "api": 0,
      "hooks": 0
    }
  },
  {
    "id": "20260414_185511",
    "timestamp": "2026-04-14T23:55:15.749Z",
    "system": "GAIA",
    "totalFilesGenerated": 105,
    "totalTimeMs": 0,
    "averageTimePerFile": 0,
    "cacheHits": 0,
    "cacheMisses": 105,
    "memoryUsage": 34762056,
    "fileTypeBreakdown": {
      "constants": 0,
      "types": 0,
      "validators": 105,
      "utils": 0,
      "api": 0,
      "hooks": 0
    }
  },
  {
    "id": "20260414_183908",
    "timestamp": "2026-04-14T23:39:11.605Z",
    "system": "GAIA",
    "totalFilesGenerated": 105,
    "totalTimeMs": 0,
    "averageTimePerFile": 0,
    "cacheHits": 0,
    "cacheMisses": 105,
    "memoryUsage": 34473472,
    "fileTypeBreakdown": {
      "constants": 0,
      "types": 0,
      "validators": 105,
      "utils": 0,
      "api": 0,
      "hooks": 0
    }
  },
  {
    "id": "20260414_183637",
    "timestamp": "2026-04-14T23:36:41.845Z",
    "system": "GAIA",
    "totalFilesGenerated": 105,
    "totalTimeMs": 0,
    "averageTimePerFile": 0,
    "cacheHits": 0,
    "cacheMisses": 105,
    "memoryUsage": 34562688,
    "fileTypeBreakdown": {
      "constants": 0,
      "types": 0,
      "validators": 105,
      "utils": 0,
      "api": 0,
      "hooks": 0
    }
  },
  {
    "id": "20260414_183400",
    "timestamp": "2026-04-14T23:34:06.134Z",
    "system": "GAIA",
    "totalFilesGenerated": 105,
    "totalTimeMs": 0,
    "averageTimePerFile": 0,
    "cacheHits": 0,
    "cacheMisses": 105,
    "memoryUsage": 23039888,
    "fileTypeBreakdown": {
      "constants": 0,
      "types": 0,
      "validators": 105,
      "utils": 0,
      "api": 0,
      "hooks": 0
    }
  },
  {
    "id": "20260414_173738",
    "timestamp": "2026-04-14T22:37:53.047Z",
    "system": "GAIA",
    "totalFilesGenerated": 105,
    "totalTimeMs": 0,
    "averageTimePerFile": 0,
    "cacheHits": 0,
    "cacheMisses": 105,
    "memoryUsage": 21004232,
    "fileTypeBreakdown": {
      "constants": 0,
      "types": 0,
      "validators": 105,
      "utils": 0,
      "api": 0,
      "hooks": 0
    }
  },
  {
    "id": "20260414_173157",
    "timestamp": "2026-04-14T22:31:59.790Z",
    "system": "GAIA",
    "totalFilesGenerated": 105,
    "totalTimeMs": 0,
    "averageTimePerFile": 0,
    "cacheHits": 0,
    "cacheMisses": 105,
    "memoryUsage": 28692848,
    "fileTypeBreakdown": {
      "constants": 0,
      "types": 0,
      "validators": 105,
      "utils": 0,
      "api": 0,
      "hooks": 0
    }
  },
  {
    "id": "20260414_172814",
    "timestamp": "2026-04-14T22:28:18.201Z",
    "system": "GAIA",
    "totalFilesGenerated": 105,
    "totalTimeMs": 0,
    "averageTimePerFile": 0,
    "cacheHits": 0,
    "cacheMisses": 105,
    "memoryUsage": 25860224,
    "fileTypeBreakdown": {
      "constants": 0,
      "types": 0,
      "validators": 105,
      "utils": 0,
      "api": 0,
      "hooks": 0
    }
  },
  {
    "id": "20260414_163109",
    "timestamp": "2026-04-14T21:31:12.758Z",
    "system": "GAIA",
    "totalFilesGenerated": 105,
    "totalTimeMs": 0,
    "averageTimePerFile": 0,
    "cacheHits": 0,
    "cacheMisses": 105,
    "memoryUsage": 26598256,
    "fileTypeBreakdown": {
      "constants": 0,
      "types": 0,
      "validators": 105,
      "utils": 0,
      "api": 0,
      "hooks": 0
    }
  },
  {
    "id": "20260414_162351",
    "timestamp": "2026-04-14T21:23:53.246Z",
    "system": "GAIA",
    "totalFilesGenerated": 95,
    "totalTimeMs": 0,
    "averageTimePerFile": 0,
    "cacheHits": 0,
    "cacheMisses": 95,
    "memoryUsage": 26754536,
    "fileTypeBreakdown": {
      "constants": 0,
      "types": 0,
      "validators": 0,
      "utils": 0,
      "api": 0,
      "hooks": 95
    }
  },
  {
    "id": "20260414_161806",
    "timestamp": "2026-04-14T21:18:09.407Z",
    "system": "GAIA",
    "totalFilesGenerated": 729,
    "totalTimeMs": 0,
    "averageTimePerFile": 0,
    "cacheHits": 0,
    "cacheMisses": 729,
    "memoryUsage": 29727536,
    "fileTypeBreakdown": {
      "constants": 99,
      "types": 105,
      "validators": 105,
      "utils": 95,
      "api": 230,
      "hooks": 95
    }
  },
  {
    "id": "20260414_161002",
    "timestamp": "2026-04-14T21:10:08.610Z",
    "system": "GAIA",
    "totalFilesGenerated": 105,
    "totalTimeMs": 0,
    "averageTimePerFile": 0,
    "cacheHits": 0,
    "cacheMisses": 105,
    "memoryUsage": 21046392,
    "fileTypeBreakdown": {
      "constants": 0,
      "types": 0,
      "validators": 105,
      "utils": 0,
      "api": 0,
      "hooks": 0
    }
  },
  {
    "id": "20260414_160409",
    "timestamp": "2026-04-14T21:04:12.125Z",
    "system": "GAIA",
    "totalFilesGenerated": 105,
    "totalTimeMs": 0,
    "averageTimePerFile": 0,
    "cacheHits": 0,
    "cacheMisses": 105,
    "memoryUsage": 27508768,
    "fileTypeBreakdown": {
      "constants": 0,
      "types": 0,
      "validators": 105,
      "utils": 0,
      "api": 0,
      "hooks": 0
    }
  },
  {
    "id": "20260414_155448",
    "timestamp": "2026-04-14T20:55:06.909Z",
    "system": "GAIA",
    "totalFilesGenerated": 0,
    "totalTimeMs": 0,
    "averageTimePerFile": 0,
    "cacheHits": 0,
    "cacheMisses": 0,
    "memoryUsage": 21000520,
    "fileTypeBreakdown": {
      "constants": 0,
      "types": 0,
      "validators": 0,
      "utils": 0,
      "api": 0,
      "hooks": 0
    }
  },
  {
    "id": "20260414_155434",
    "timestamp": "2026-04-14T20:54:37.102Z",
    "system": "GAIA",
    "totalFilesGenerated": 0,
    "totalTimeMs": 0,
    "averageTimePerFile": 0,
    "cacheHits": 0,
    "cacheMisses": 0,
    "memoryUsage": 22723160,
    "fileTypeBreakdown": {
      "constants": 0,
      "types": 0,
      "validators": 0,
      "utils": 0,
      "api": 0,
      "hooks": 0
    }
  },
  {
    "id": "20260414_155419",
    "timestamp": "2026-04-14T20:54:21.308Z",
    "system": "GAIA",
    "totalFilesGenerated": 0,
    "totalTimeMs": 0,
    "averageTimePerFile": 0,
    "cacheHits": 0,
    "cacheMisses": 0,
    "memoryUsage": 22382584,
    "fileTypeBreakdown": {
      "constants": 0,
      "types": 0,
      "validators": 0,
      "utils": 0,
      "api": 0,
      "hooks": 0
    }
  },
  {
    "id": "20260414_154832",
    "timestamp": "2026-04-14T20:50:04.791Z",
    "system": "GAIA",
    "totalFilesGenerated": 99,
    "totalTimeMs": 0,
    "averageTimePerFile": 0,
    "cacheHits": 0,
    "cacheMisses": 99,
    "memoryUsage": 25821296,
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
    "id": "20260414_154804",
    "timestamp": "2026-04-14T20:48:06.854Z",
    "system": "GAIA",
    "totalFilesGenerated": 0,
    "totalTimeMs": 0,
    "averageTimePerFile": 0,
    "cacheHits": 0,
    "cacheMisses": 0,
    "memoryUsage": 21952312,
    "fileTypeBreakdown": {
      "constants": 0,
      "types": 0,
      "validators": 0,
      "utils": 0,
      "api": 0,
      "hooks": 0
    }
  },
  {
    "id": "20260414_153717",
    "timestamp": "2026-04-14T20:37:20.115Z",
    "system": "GAIA",
    "totalFilesGenerated": 99,
    "totalTimeMs": 0,
    "averageTimePerFile": 0,
    "cacheHits": 0,
    "cacheMisses": 99,
    "memoryUsage": 21140056,
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
    "id": "20260414_153638",
    "timestamp": "2026-04-14T20:36:41.659Z",
    "system": "GAIA",
    "totalFilesGenerated": 88,
    "totalTimeMs": 0,
    "averageTimePerFile": 0,
    "cacheHits": 0,
    "cacheMisses": 88,
    "memoryUsage": 21586424,
    "fileTypeBreakdown": {
      "constants": 88,
      "types": 0,
      "validators": 0,
      "utils": 0,
      "api": 0,
      "hooks": 0
    }
  },
  {
    "id": "20260414_151854",
    "timestamp": "2026-04-14T20:18:58.097Z",
    "system": "GAIA",
    "totalFilesGenerated": 99,
    "totalTimeMs": 0,
    "averageTimePerFile": 0,
    "cacheHits": 0,
    "cacheMisses": 99,
    "memoryUsage": 21030056,
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
    "id": "20260414_143921",
    "timestamp": "2026-04-14T19:39:30.505Z",
    "system": "GAIA",
    "totalFilesGenerated": 729,
    "totalTimeMs": 0,
    "averageTimePerFile": 0,
    "cacheHits": 0,
    "cacheMisses": 729,
    "memoryUsage": 22841328,
    "fileTypeBreakdown": {
      "constants": 99,
      "types": 105,
      "validators": 105,
      "utils": 95,
      "api": 230,
      "hooks": 95
    }
  },
  {
    "id": "20260414_143749",
    "timestamp": "2026-04-14T19:37:57.935Z",
    "system": "GAIA",
    "totalFilesGenerated": 729,
    "totalTimeMs": 0,
    "averageTimePerFile": 0,
    "cacheHits": 0,
    "cacheMisses": 729,
    "memoryUsage": 23835776,
    "fileTypeBreakdown": {
      "constants": 99,
      "types": 105,
      "validators": 105,
      "utils": 95,
      "api": 230,
      "hooks": 95
    }
  },
  {
    "id": "20260413_232437",
    "timestamp": "2026-04-14T04:24:40.812Z",
    "system": "GAIA",
    "totalFilesGenerated": 197,
    "totalTimeMs": 0,
    "averageTimePerFile": 0,
    "cacheHits": 0,
    "cacheMisses": 197,
    "memoryUsage": 23751304,
    "fileTypeBreakdown": {
      "constants": 99,
      "types": 0,
      "validators": 98,
      "utils": 0,
      "api": 0,
      "hooks": 0
    }
  },
  {
    "id": "20260413_230225",
    "timestamp": "2026-04-14T04:02:28.921Z",
    "system": "GAIA",
    "totalFilesGenerated": 624,
    "totalTimeMs": 0,
    "averageTimePerFile": 0,
    "cacheHits": 0,
    "cacheMisses": 624,
    "memoryUsage": 24509480,
    "fileTypeBreakdown": {
      "constants": 99,
      "types": 105,
      "validators": 0,
      "utils": 95,
      "api": 230,
      "hooks": 95
    }
  },
  {
    "id": "20260413_204507",
    "timestamp": "2026-04-14T01:45:09.912Z",
    "system": "GAIA",
    "totalFilesGenerated": 99,
    "totalTimeMs": 0,
    "averageTimePerFile": 0,
    "cacheHits": 0,
    "cacheMisses": 99,
    "memoryUsage": 21014808,
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
    "id": "20260413_201450",
    "timestamp": "2026-04-14T01:14:50.832Z",
    "system": "GAIA",
    "totalFilesGenerated": 105,
    "totalTimeMs": 0,
    "averageTimePerFile": 0,
    "cacheHits": 0,
    "cacheMisses": 105,
    "memoryUsage": 17096896,
    "fileTypeBreakdown": {
      "constants": 0,
      "types": 105,
      "validators": 0,
      "utils": 0,
      "api": 0,
      "hooks": 0
    }
  },
  {
    "id": "20260413_193954",
    "timestamp": "2026-04-14T00:39:54.614Z",
    "system": "GAIA",
    "totalFilesGenerated": 729,
    "totalTimeMs": 0,
    "averageTimePerFile": 0,
    "cacheHits": 0,
    "cacheMisses": 729,
    "memoryUsage": 16561504,
    "fileTypeBreakdown": {
      "constants": 99,
      "types": 105,
      "validators": 105,
      "utils": 95,
      "api": 230,
      "hooks": 95
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