// ============================================================================
// src/scripts/system/gaia/extract/extract_runtime_enums.ts
// ============================================================================
// ============================================================================

import { logDebug, logSuccess, logWarning } from '../../../shared/logger.js';

export interface RuntimeEnumInfo {
  name: string;           // Original snake_case name from database (e.g., 'user_tier')
  values: string[];       // Runtime values (e.g., ['community', 'ally', 'corporate', 'council'])
  content: string;        // Raw content for debugging
  startLine: number;      // 1-indexed start line
  endLine: number;        // 1-indexed end line
  type: 'runtime_enum';
}

export interface ExtractRuntimeEnumsOptions {
  verbose?: boolean;
}

const RUNTIME_ENUM_PATTERN = /^\s{6}(\w+):/;

/**
 * Parse enum values from an array string
 * Handles formats like: [ "value1", "value2", "value3" ]
 */
function parseArrayValues(arrayString: string): string[] {
  const bracketMatch = arrayString.match(/\[([\s\S]*?)\]/);
  if (!bracketMatch) return [];
  
  const valuesString = bracketMatch[1];
  
  const values = valuesString
    .split(',')
    .map(v => v.trim())
    .map(v => v.replace(/^["']|["']$/g, '')) // Remove quotes
    .filter(v => v.length > 0);
  
  return values;
}

/**
 * Extract all enum names from the constants enums section (without parsing values)
 * Used for quick scanning
 */
export function extractRuntimeEnumNames(
  lines: string[],
  constantsEnumsStartLine: number,
  constantsEnumsEndLine: number,
  options?: ExtractRuntimeEnumsOptions
): string[] {
  const { verbose = false } = options || {};
  const enumNames: string[] = [];
  
  const startIdx = constantsEnumsStartLine - 1;
  const endIdx = constantsEnumsEndLine - 1;
  
  for (let i = startIdx; i <= endIdx; i++) {
    const line = lines[i];
    const match = line.match(RUNTIME_ENUM_PATTERN);
    
    if (match) {
      enumNames.push(match[1]);
      if (verbose) {
        logDebug(`  Found enum name: ${match[1]}`);
      }
    }
  }
  
  if (verbose) {
    logSuccess(`Found ${enumNames.length} runtime enum names`);
  }
  
  return enumNames;
}

/**
 * Extract a single runtime enum by name
 */
export function extractRuntimeEnumByName(
  lines: string[],
  constantsEnumsStartLine: number,
  constantsEnumsEndLine: number,
  enumName: string,
  options?: ExtractRuntimeEnumsOptions
): RuntimeEnumInfo | null {
  const { verbose = false } = options || {};
  
  const startIdx = constantsEnumsStartLine - 1;
  const endIdx = constantsEnumsEndLine - 1;
  
  for (let i = startIdx; i <= endIdx; i++) {
    const line = lines[i];
    const match = line.match(RUNTIME_ENUM_PATTERN);
    
    if (match && match[1] === enumName) {
      let fullEnumLine = line;
      let j = i + 1;
      
      // Look for closing bracket (enum array ends with '],')
      while (j <= endIdx && !fullEnumLine.includes('],')) {
        fullEnumLine += ' ' + lines[j];
        j++;
      }
      
      const values = parseArrayValues(fullEnumLine);
      
      if (values.length === 0) {
        if (verbose) {
          logWarning(`Enum ${enumName} has no values`);
        }
        return null;
      }
      
      const result: RuntimeEnumInfo = {
        name: enumName,
        values,
        content: fullEnumLine,
        startLine: i + 1,
        endLine: j,
        type: 'runtime_enum'
      };
      
      if (verbose) {
        logDebug(`  Extracted ${enumName}: ${values.length} values`);
      }
      
      return result;
    }
  }
  
  if (verbose) {
    logWarning(`Enum ${enumName} not found`);
  }
  
  return null;
}

/**
 * Extract runtime enums from the parsed file
 * Returns ALL runtime enums found in the Constants.public.Enums section
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
  
  const startIdx = constantsEnumsStartLine - 1;
  const endIdx = constantsEnumsEndLine - 1;
  
  for (let i = startIdx; i <= endIdx; i++) {
    const line = lines[i];
    const match = line.match(RUNTIME_ENUM_PATTERN);
    
    if (match) {
      const enumName = match[1];
      
      let fullEnumLine = line;
      let j = i + 1;
      
      while (j <= endIdx && !fullEnumLine.includes('],') && !fullEnumLine.match(/\],\s*$/)) {
        fullEnumLine += ' ' + lines[j];
        j++;
      }
      
      const values = parseArrayValues(fullEnumLine);
      
      if (values.length > 0) {
        runtimeEnums.push({
          name: enumName,
          values,
          content: fullEnumLine,
          startLine: i + 1,
          endLine: j,
          type: 'runtime_enum'
        });
        
        if (verbose) {
          logDebug(`  Found runtime enum: ${enumName} with ${values.length} values`);
          if (verbose && values.length <= 10) {
            logDebug(`    Values: [${values.join(', ')}]`);
          } else if (verbose) {
            logDebug(`    Values: [${values.slice(0, 5).join(', ')}... (${values.length} total)]`);
          }
        }
      } else if (verbose) {
        logWarning(`  Skipped runtime enum: ${enumName} (no values found)`);
      }
    }
  }
  
  if (verbose) {
    logSuccess(`Extracted ${runtimeEnums.length} runtime enums`);
  }
  
  return runtimeEnums;
}

/**
 * Extract runtime enums and filter by deity folder
 * Uses enum_mapping.ts to determine which deity each enum belongs to
 */
export async function extractRuntimeEnumsByDeity(
  lines: string[],
  constantsEnumsStartLine: number,
  constantsEnumsEndLine: number,
  deityFolder: string,
  options?: ExtractRuntimeEnumsOptions
): Promise<RuntimeEnumInfo[]> {
  const { verbose = false } = options || {};
  
  // Dynamic import to avoid circular dependency
  const { getEnumFolder } = await import('@/config/enum_mapping.js');
  
  const allEnums = await extractRuntimeEnums(lines, constantsEnumsStartLine, constantsEnumsEndLine, options);
  
  const filteredEnums = allEnums.filter(enumInfo => {
    const enumDeity = getEnumFolder(enumInfo.name);
    return enumDeity === deityFolder;
  });
  
  if (verbose) {
    logDebug(`Filtered ${filteredEnums.length} runtime enums for deity: ${deityFolder}`);
  }
  
  return filteredEnums;
}

/**
 * Get the count of runtime enums without extracting all data
 * Useful for quick validation
 */
export function countRuntimeEnums(
  lines: string[],
  constantsEnumsStartLine: number,
  constantsEnumsEndLine: number,
  options?: ExtractRuntimeEnumsOptions
): number {
  const { verbose = false } = options || {};
  
  const startIdx = constantsEnumsStartLine - 1;
  const endIdx = constantsEnumsEndLine - 1;
  let count = 0;
  
  for (let i = startIdx; i <= endIdx; i++) {
    const line = lines[i];
    if (line.match(RUNTIME_ENUM_PATTERN)) {
      count++;
    }
  }
  
  if (verbose) {
    logDebug(`Found ${count} runtime enums in Constants.public.Enums section`);
  }
  
  return count;
}