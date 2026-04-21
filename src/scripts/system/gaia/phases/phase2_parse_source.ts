// scripts/system/gaia/phases/phase2_parse_source.ts
// PHASE 2: Parse database.types.ts, get markers and runtime enums

import { readDatabaseTypes } from '../../../shared/file_reader.js';
import { findMarkers } from '../../../modules/system/find_markers.js';
import { findAllClosingBraces } from '../../../modules/system/find_closing_braces.js';
import { getAllTableNames, getFolderNameForTable } from '@/config/deity_groups.js';
import { logError, logSuccess } from '../../../shared/logger.js';
import type { GaiaOptions } from '../index.js';

export async function phase2_parseSource(options: GaiaOptions): Promise<{
  lines: string[];
  markers: any;
  runtimeEnums: Map<string, string[]>;
  deityFolderMap: Map<string, string>;
}> {
  const { verbose } = options;
  
  // Read file
  const { content, success } = readDatabaseTypes();
  if (!success) throw new Error('Failed to read database.types.ts');
  
  const lines = content.split('\n');
  
  // Find markers
  const markers = findMarkers(lines, { verbose });
  const markersWithBraces = findAllClosingBraces(lines, markers, { verbose });
  
  // Extract runtime enums
  const runtimeEnums = extractRuntimeEnums(lines, markersWithBraces);
  
  // Build deity folder map
  const deityFolderMap = new Map<string, string>();
  const allTableNames = getAllTableNames();
  for (const table of allTableNames) {
    const folder = getFolderNameForTable(table) || 'hestia-core';
    deityFolderMap.set(table, folder);
  }
  
  return { lines, markers: markersWithBraces, runtimeEnums, deityFolderMap };
}

function extractRuntimeEnums(lines: string[], markers: any): Map<string, string[]> {
  const enums = new Map<string, string[]>();
  
  if (markers.constantsEnumsLine === -1 || markers.constantsEnumsEndLine === -1) {
    return enums;
  }
  
  const startIdx = markers.constantsEnumsLine - 1;
  const endIdx = markers.constantsEnumsEndLine - 1;
  const enumPattern = /^\s{6}(\w+):/;
  
  for (let i = startIdx; i <= endIdx; i++) {
    const line = lines[i];
    const match = line.match(enumPattern);
    
    if (match) {
      const enumName = match[1];
      let fullLine = line;
      let j = i + 1;
      while (j <= endIdx && !fullLine.includes('],')) {
        fullLine += ' ' + lines[j];
        j++;
      }
      
      const bracketMatch = fullLine.match(/\[([\s\S]*?)\]/);
      if (bracketMatch) {
        const values = bracketMatch[1]
          .split(',')
          .map(v => v.trim().replace(/^["']|["']$/g, ''))
          .filter(v => v.length > 0);
        
        if (values.length > 0) {
          enums.set(enumName, values);
        }
      }
    }
  }
  
  return enums;
}