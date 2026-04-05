// src/scripts/modules/findClosingBraces.ts
// Phase 1: Find matching closing brace for a given opening brace position
// Handles nested braces correctly

import type { MarkerResult } from '../shared/types.js';
import { logSuccess, logError, logInfo, logDebug, logWarning } from '../shared/logger.js';

export interface FindClosingBraceOptions {
  verbose?: boolean;
  maxLines?: number;      // Maximum lines to search (safety limit)
}

/**
 * Find the matching closing brace for an opening brace at a given line
 * 
 * @param lines - Array of lines from the parsed file
 * @param startLine - 0-indexed line number where the opening brace is located
 * @param options - Optional configuration
 * @returns 0-indexed line number of the matching closing brace, or -1 if not found
 */
export function findClosingBrace(
  lines: string[], 
  startLine: number, 
  options: FindClosingBraceOptions = {}
): number {
  const { verbose = false, maxLines = 10000 } = options;
  
  if (startLine < 0 || startLine >= lines.length) {
    if (verbose) logError(`Invalid startLine: ${startLine}`);
    return -1;
  }
  
  // Find the position of the opening brace on the start line
  let bracePos = -1;
  const startLineContent = lines[startLine];
  
  for (let i = 0; i < startLineContent.length; i++) {
    if (startLineContent[i] === '{') {
      bracePos = i;
      break;
    }
  }
  
  if (bracePos === -1) {
    if (verbose) logWarning(`No opening brace found on line ${startLine + 1}`);
    return -1;
  }
  
  if (verbose) {
    logDebug(`Searching for closing brace from line ${startLine + 1}, position ${bracePos}`);
  }
  
  let braceCount = 1;  // Start with 1 for the opening brace we found
  let currentLine = startLine;
  let currentPos = bracePos + 1;
  let linesChecked = 0;
  
  while (currentLine < lines.length && linesChecked < maxLines) {
    const line = lines[currentLine];
    
    for (let i = currentPos; i < line.length; i++) {
      const char = line[i];
      
      if (char === '{') {
        braceCount++;
        if (verbose && braceCount % 100 === 0) {
          logDebug(`  Brace depth: ${braceCount} at line ${currentLine + 1}, pos ${i}`);
        }
      } else if (char === '}') {
        braceCount--;
        
        if (braceCount === 0) {
          if (verbose) {
            logDebug(`Found closing brace at line ${currentLine + 1}, position ${i}`);
          }
          return currentLine;
        }
      }
    }
    
    // Move to next line, start from beginning
    currentLine++;
    currentPos = 0;
    linesChecked++;
  }
  
  if (linesChecked >= maxLines) {
    logWarning(`Exceeded max lines (${maxLines}) while searching for closing brace`);
  } else {
    logError(`Could not find matching closing brace from line ${startLine + 1}`);
  }
  
  return -1;
}

/**
 * Find all closing braces for multiple markers in one pass
 * More efficient than calling findClosingBrace repeatedly
 * 
 * @param lines - Array of lines from the parsed file
 * @param markers - MarkerResult with opening brace positions
 * @param options - Optional configuration
 * @returns Updated MarkerResult with end line numbers filled
 */
export function findAllClosingBraces(
  lines: string[],
  markers: MarkerResult,
  options: FindClosingBraceOptions = {}
): MarkerResult {
  const { verbose = false } = options;
  
  const result = { ...markers };
  
  if (verbose) {
    logInfo('Finding all closing braces...');
  }
  
  // Collections inside Database.public
  const collections = [
    { name: 'Tables', startLine: markers.tablesLine, setter: (line: number) => result.tablesEndLine = line },
    { name: 'Views', startLine: markers.viewsLine, setter: (line: number) => result.viewsEndLine = line },
    { name: 'Functions', startLine: markers.functionsLine, setter: (line: number) => result.functionsEndLine = line },
    { name: 'Enums (type-level)', startLine: markers.enumsLine, setter: (line: number) => result.enumsEndLine = line },
    { name: 'CompositeTypes', startLine: markers.compositeTypesLine, setter: (line: number) => result.compositeTypesEndLine = line },
  ];
  
  for (const collection of collections) {
    if (collection.startLine !== -1) {
      // Convert to 0-indexed for findClosingBrace
      const startLine0 = collection.startLine - 1;
      const endLine0 = findClosingBrace(lines, startLine0, options);
      
      if (endLine0 !== -1) {
        collection.setter(endLine0 + 1); // Convert back to 1-indexed
        if (verbose) {
          logDebug(`${collection.name}: lines ${collection.startLine}-${endLine0 + 1}`);
        }
      } else {
        logWarning(`Could not find closing brace for ${collection.name}`);
      }
    }
  }
  
  // Constants section
  if (markers.constantsLine !== -1) {
    const startLine0 = markers.constantsLine - 1;
    const endLine0 = findClosingBrace(lines, startLine0, options);
    if (endLine0 !== -1) {
      result.constantsEndLine = endLine0 + 1;
      if (verbose) {
        logDebug(`Constants: lines ${markers.constantsLine}-${endLine0 + 1}`);
      }
    }
  }
  
  // Constants.Enums section
  if (markers.constantsEnumsLine !== -1) {
    const startLine0 = markers.constantsEnumsLine - 1;
    const endLine0 = findClosingBrace(lines, startLine0, options);
    if (endLine0 !== -1) {
      result.constantsEnumsEndLine = endLine0 + 1;
      if (verbose) {
        logDebug(`Constants.Enums: lines ${markers.constantsEnumsLine}-${endLine0 + 1}`);
      }
    }
  }
  
  // Database.public closing brace (for completeness)
  if (markers.publicLine !== -1) {
    const startLine0 = markers.publicLine - 1;
    const endLine0 = findClosingBrace(lines, startLine0, options);
    if (endLine0 !== -1 && verbose) {
      logDebug(`public closing brace at line ${endLine0 + 1}`);
    }
  }
  
  if (verbose) {
    logSuccess('All closing braces found');
  }
  
  return result;
}

/**
 * Helper to check if a closing brace exists for a given start line
 * 
 * @param lines - Array of lines from the parsed file
 * @param startLine - 1-indexed line number
 * @returns True if a matching closing brace exists
 */
export function hasClosingBrace(lines: string[], startLine: number): boolean {
  const endLine = findClosingBrace(lines, startLine - 1);
  return endLine !== -1;
}

/**
 * Get the content between opening and closing braces
 * 
 * @param lines - Array of lines from the parsed file
 * @param startLine - 1-indexed line number where opening brace is
 * @returns The content between braces (excluding the braces themselves)
 */
export function getBraceContent(lines: string[], startLine: number): string | null {
  const endLine = findClosingBrace(lines, startLine - 1);
  if (endLine === -1) return null;
  
  // Extract lines between start and end (excluding the braces)
  const contentLines: string[] = [];
  
  for (let i = startLine; i <= endLine; i++) {
    let line = lines[i];
    
    // Remove opening brace from first line
    if (i === startLine) {
      line = line.replace('{', '').trimEnd();
    }
    
    // Remove closing brace from last line
    if (i === endLine) {
      line = line.replace('}', '').trimEnd();
    }
    
    if (line.trim()) {
      contentLines.push(line);
    }
  }
  
  return contentLines.join('\n');
}