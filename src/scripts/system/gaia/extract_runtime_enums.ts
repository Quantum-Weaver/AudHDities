// ============================================================================
// src/scripts/generators/gaia/extractRuntimeEnums.ts
// EXTRACT RUNTIME ENUMS (GAIA)
// ============================================================================

import type { ExtractedObject } from '../../shared/types.js';
import { logDebug, logSuccess, logWarning } from '../../shared/logger.js';

export interface RuntimeEnumInfo extends ExtractedObject {
  type: 'runtime_enum';
  values: string[];
}

export interface ExtractRuntimeEnumsOptions {
  verbose?: boolean;
}

// Pattern for matching runtime enums: "enum_name: [ ... ],"
const RUNTIME_ENUM_PATTERN = /^\s{6}(\w+):/;

/**
 * Parse enum values from an array string
 */
function parseArrayValues(arrayString: string): string[] {
  // Extract everything between the first [ and the last ]
  const bracketMatch = arrayString.match(/\[([\s\S]*?)\]/);
  if (!bracketMatch) return [];
  
  const valuesString = bracketMatch[1];
  // Split by comma, trim quotes and whitespace
  const values = valuesString
    .split(',')
    .map(v => v.trim().replace(/^["']|["']$/g, ''))
    .filter(v => v.length > 0);
  
  return values;
}

/**
 * Extract runtime enums from the parsed file
 */
export async function extractRuntimeEnums(
  lines: string[],
  constantsEnumsStartLine: number,
  constantsEnumsEndLine: number,
  options?: ExtractRuntimeEnumsOptions
): Promise<RuntimeEnumInfo[]> {
  const { verbose = false } = options || {};
  const runtimeEnums: RuntimeEnumInfo[] = [];
  
  if (verbose) {
    logDebug(`Extracting runtime enums from lines ${constantsEnumsStartLine}-${constantsEnumsEndLine}`);
  }
  
  // Get all enum names from the constants enums section
  const startIdx = constantsEnumsStartLine - 1;
  const endIdx = constantsEnumsEndLine - 1;
  
  for (let i = startIdx; i <= endIdx; i++) {
    const line = lines[i];
    const match = line.match(RUNTIME_ENUM_PATTERN);
    
    if (match) {
      const enumName = match[1];
      
      // Extract the full enum line (may span multiple lines)
      let fullEnumLine = line;
      let j = i + 1;
      // Look for closing bracket
      while (j <= endIdx && !fullEnumLine.includes('],')) {
        fullEnumLine += ' ' + lines[j];
        j++;
      }
      
      const values = parseArrayValues(fullEnumLine);
      
      if (values.length > 0) {
        runtimeEnums.push({
          name: enumName,
          content: fullEnumLine,
          startLine: i + 1,
          endLine: j,
          type: 'runtime_enum',
          values
        });
        
        if (verbose) {
          logDebug(`  Found runtime enum: ${enumName} with ${values.length} values`);
        }
      }
    }
  }
  
  if (verbose) {
    logSuccess(`Extracted ${runtimeEnums.length} runtime enums`);
  }
  
  return runtimeEnums;
}