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
 * Preserves quotes only when they are part of the actual value (e.g., date strings)
 */
function parseArrayValues(arrayString: string): string[] {
  // Extract everything between the first [ and the last ]
  const bracketMatch = arrayString.match(/\[([\s\S]*?)\]/);
  if (!bracketMatch) return [];
  
  let valuesString = bracketMatch[1];
  
  // Handle multi-line arrays - join continuation lines
  valuesString = valuesString.replace(/\n\s*/g, ' ');
  
  // Parse values respecting quoted strings
  const values: string[] = [];
  let current = '';
  let inQuotes = false;
  let quoteChar = '';
  
  for (let i = 0; i < valuesString.length; i++) {
    const char = valuesString[i];
    
    // Toggle quote state
    if ((char === '"' || char === "'") && (i === 0 || valuesString[i-1] !== '\\')) {
      if (!inQuotes) {
        inQuotes = true;
        quoteChar = char;
        current += char;
      } else if (char === quoteChar) {
        inQuotes = false;
        current += char;
      } else {
        current += char;
      }
    }
    // Handle comma separator (only outside quotes)
    else if (char === ',' && !inQuotes) {
      const trimmed = current.trim();
      if (trimmed) {
        // Remove outer quotes if they wrap the entire value
        let finalValue = trimmed;
        if ((finalValue.startsWith('"') && finalValue.endsWith('"')) ||
            (finalValue.startsWith("'") && finalValue.endsWith("'"))) {
          finalValue = finalValue.slice(1, -1);
        }
        values.push(finalValue);
      }
      current = '';
    }
    else {
      current += char;
    }
  }
  
  // Handle last value
  const trimmed = current.trim();
  if (trimmed) {
    let finalValue = trimmed;
    if ((finalValue.startsWith('"') && finalValue.endsWith('"')) ||
        (finalValue.startsWith("'") && finalValue.endsWith("'"))) {
      finalValue = finalValue.slice(1, -1);
    }
    values.push(finalValue);
  }
  
  return values.filter(v => v.length > 0 || v === '');
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