// @/scripts/modules/extractObject.ts
// Phase 1: Extract a single object from a collection (Tables, Views, Functions, Enums)
// Returns the full object content with line numbers

import type { ExtractedObject, ObjectType } from '../shared/types.js';
import { logSuccess, logError, logInfo, logDebug, logWarning } from '../shared/logger.js';

export interface ExtractObjectOptions {
  verbose?: boolean;
  includeHeader?: boolean;    // Include the object name line in content
}

// Default pattern for matching object names
const DEFAULT_PATTERN = /^\s{6}(\w+):/;

/**
 * Extract a single object from a collection
 * 
 * @param lines - Array of lines from the parsed file
 * @param startLine - 1-indexed line where the collection starts (e.g., tablesLine)
 * @param endLine - 1-indexed line where the collection ends (e.g., tablesEndLine)
 * @param objectName - Name of the object to extract (e.g., 'profiles')
 * @param options - Optional configuration
 * @returns ExtractedObject or null if not found
 */
export function extractObject(
  lines: string[],
  startLine: number,
  endLine: number,
  objectName: string,
  options: ExtractObjectOptions = {}
): ExtractedObject | null {
  const { verbose = false, includeHeader = true } = options;
  
  // Convert to 0-indexed
  const startIdx = startLine - 1;
  const endIdx = endLine - 1;
  
  if (startIdx < 0 || startIdx >= lines.length) {
    logError(`Invalid startLine: ${startLine}`);
    return null;
  }
  
  if (endIdx < startIdx || endIdx >= lines.length) {
    logError(`Invalid endLine: ${endLine}`);
    return null;
  }
  
  if (verbose) {
    logDebug(`Searching for object "${objectName}" in lines ${startLine}-${endLine}`);
  }
  
  // Find the line where the object starts
  let objectStartLine = -1;
  let objectType: ObjectType = 'unknown';
  
  for (let i = startIdx; i <= endIdx; i++) {
    const line = lines[i];
    const match = line.match(DEFAULT_PATTERN);
    
    if (match && match[1] === objectName) {
      objectStartLine = i;
      
      // Determine object type based on context (caller can override)
      if (line.includes('Row:') || line.includes('Insert:') || line.includes('Update:')) {
        objectType = 'table';
      } else if (line.includes('Args:') || line.includes('Returns:')) {
        objectType = 'function';
      } else if (line.includes('|')) {
        objectType = 'enum';
      } else {
        objectType = 'view';
      }
      
      if (verbose) {
        logDebug(`Found "${objectName}" at line ${objectStartLine + 1} (type: ${objectType})`);
      }
      break;
    }
  }
  
  if (objectStartLine === -1) {
    if (verbose) logWarning(`Object "${objectName}" not found in collection`);
    return null;
  }
  
  // Find the opening brace on this line or next line
  let braceStartLine = objectStartLine;
  let braceFound = false;
  
  // Check current line for {
  if (lines[objectStartLine].includes('{')) {
    braceFound = true;
  } else if (objectStartLine + 1 < lines.length && lines[objectStartLine + 1].includes('{')) {
    braceStartLine = objectStartLine + 1;
    braceFound = true;
  }
  
  if (!braceFound) {
    logError(`No opening brace found for object "${objectName}"`);
    return null;
  }
  
  // Find matching closing brace
  let braceCount = 0;
  let foundOpen = false;
  let closingLine = -1;
  
  for (let i = braceStartLine; i < lines.length; i++) {
    for (let k = 0; k < lines[i].length; k++) {
      const char = lines[i][k];
      if (char === '{') {
        braceCount++;
        foundOpen = true;
      }
      if (char === '}') {
        braceCount--;
      }
    }
    if (foundOpen && braceCount === 0) {
      closingLine = i;
      break;
    }
  }
  
  if (closingLine === -1) {
    logError(`Could not find closing brace for object "${objectName}"`);
    return null;
  }
  
  // Extract content
  const startContentLine = includeHeader ? objectStartLine : objectStartLine + 1;
  const contentLines = lines.slice(startContentLine, closingLine + 1);
  const content = contentLines.join('\n');
  
  const result: ExtractedObject = {
    name: objectName,
    content,
    startLine: startContentLine + 1,
    endLine: closingLine + 1,
    type: objectType
  };
  
  if (verbose) {
    logSuccess(`Extracted ${objectType} "${objectName}" (lines ${result.startLine}-${result.endLine})`);
    logDebug(`Content length: ${content.length} characters, ${contentLines.length} lines`);
  }
  
  return result;
}

/**
 * Extract multiple objects from a collection
 * 
 * @param lines - Array of lines from the parsed file
 * @param startLine - 1-indexed line where the collection starts
 * @param endLine - 1-indexed line where the collection ends
 * @param objectNames - Array of object names to extract
 * @param options - Optional configuration
 * @returns Array of ExtractedObject (only successfully extracted ones)
 */
export function extractObjects(
  lines: string[],
  startLine: number,
  endLine: number,
  objectNames: string[],
  options: ExtractObjectOptions = {}
): ExtractedObject[] {
  const { verbose = false } = options;
  const results: ExtractedObject[] = [];
  
  if (verbose) {
    logInfo(`Extracting ${objectNames.length} objects from collection...`);
  }
  
  for (const name of objectNames) {
    const extracted = extractObject(lines, startLine, endLine, name, options);
    if (extracted) {
      results.push(extracted);
    }
  }
  
  if (verbose) {
    logSuccess(`Extracted ${results.length}/${objectNames.length} objects`);
  }
  
  return results;
}

/**
 * Extract first object from a collection
 * 
 * @param lines - Array of lines from the parsed file
 * @param startLine - 1-indexed line where the collection starts
 * @param endLine - 1-indexed line where the collection ends
 * @param options - Optional configuration
 * @returns ExtractedObject or null if collection is empty
 */
export function extractFirstObject(
  lines: string[],
  startLine: number,
  endLine: number,
  options: ExtractObjectOptions = {}
): ExtractedObject | null {
  const { verbose = false } = options;
  
  // Find the first object name in the collection
  const startIdx = startLine - 1;
  const endIdx = endLine - 1;
  
  for (let i = startIdx; i <= endIdx; i++) {
    const line = lines[i];
    const match = line.match(DEFAULT_PATTERN);
    
    if (match) {
      const firstName = match[1];
      if (verbose) {
        logDebug(`First object in collection: "${firstName}"`);
      }
      return extractObject(lines, startLine, endLine, firstName, options);
    }
  }
  
  if (verbose) {
    logWarning('No objects found in collection');
  }
  
  return null;
}

/**
 * Extract object with custom pattern (for Constants.Enums or other formats)
 * 
 * @param lines - Array of lines from the parsed file
 * @param startLine - 1-indexed line where the collection starts
 * @param endLine - 1-indexed line where the collection ends
 * @param objectName - Name of the object to extract
 * @param pattern - Custom RegExp pattern for matching object names
 * @param options - Optional configuration
 * @returns ExtractedObject or null if not found
 */
export function extractObjectWithPattern(
  lines: string[],
  startLine: number,
  endLine: number,
  objectName: string,
  pattern: RegExp,
  options: ExtractObjectOptions = {}
): ExtractedObject | null {
  const { verbose = false, includeHeader = true } = options;
  
  const startIdx = startLine - 1;
  const endIdx = endLine - 1;
  
  // Find the line where the object starts using custom pattern
  let objectStartLine = -1;
  
  for (let i = startIdx; i <= endIdx; i++) {
    const line = lines[i];
    const match = line.match(pattern);
    
    if (match && match[1] === objectName) {
      objectStartLine = i;
      if (verbose) {
        logDebug(`Found "${objectName}" at line ${objectStartLine + 1}`);
      }
      break;
    }
  }
  
  if (objectStartLine === -1) {
    return null;
  }
  
  // For enums, the value is on the same line (no braces to match)
  // Just return the line as content
  const content = lines[objectStartLine];
  
  return {
    name: objectName,
    content,
    startLine: objectStartLine + 1,
    endLine: objectStartLine + 1,
    type: 'enum'
  };
}