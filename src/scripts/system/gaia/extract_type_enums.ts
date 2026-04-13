// ============================================================================
// @/scripts/generators/gaia/extractTypeEnums.ts
// EXTRACT TYPE ENUMS (GAIA)
// ============================================================================

import type { ExtractedObject } from '../../shared/types.js';
import { logDebug, logSuccess, logWarning } from '../../shared/logger.js';

export interface TypeEnumInfo extends ExtractedObject {
  type: 'type_enum';
  values: string[];
}

export interface ExtractTypeEnumsOptions {
  verbose?: boolean;
}

// Pattern for matching type enums: "enum_name:"
const TYPE_ENUM_PATTERN = /^\s{6}(\w+):/;

/**
 * Parse enum values from a union type string
 */
function parseUnionValues(unionString: string): string[] {
  // Remove the enum name and colon
  const afterColon = unionString.replace(/^\s*\w+:\s*/, '');
  
  // Split by | and trim quotes and whitespace
  const values = afterColon
    .split('|')
    .map(v => v.trim().replace(/^["']|["']$/g, ''))
    .filter(v => v.length > 0);
  
  return values;
}

/**
 * Extract type enums from the parsed file
 */
export async function extractTypeEnums(
  lines: string[],
  enumsStartLine: number,
  enumsEndLine: number,
  options?: ExtractTypeEnumsOptions
): Promise<TypeEnumInfo[]> {
  const { verbose = false } = options || {};
  const typeEnums: TypeEnumInfo[] = [];
  
  if (verbose) {
    logDebug(`Extracting type enums from lines ${enumsStartLine}-${enumsEndLine}`);
  }
  
  const startIdx = enumsStartLine - 1;
  const endIdx = enumsEndLine - 1;
  
  for (let i = startIdx; i <= endIdx; i++) {
    const line = lines[i];
    const match = line.match(TYPE_ENUM_PATTERN);
    
    if (match) {
      const enumName = match[1];
      
      // Collect all lines until we find a semicolon or end of enum
      let fullEnumLine = line;
      let j = i + 1;
      while (j <= endIdx && !fullEnumLine.includes(';')) {
        fullEnumLine += ' ' + lines[j];
        j++;
      }
      
      const values = parseUnionValues(fullEnumLine);
      
      if (values.length > 0) {
        typeEnums.push({
          name: enumName,
          content: fullEnumLine,
          startLine: i + 1,
          endLine: j,
          type: 'type_enum',
          values
        });
        
        if (verbose) {
          logDebug(`  Found type enum: ${enumName} with ${values.length} values`);
        }
      }
    }
  }
  
  if (verbose) {
    logSuccess(`Extracted ${typeEnums.length} type enums`);
  }
  
  return typeEnums;
}