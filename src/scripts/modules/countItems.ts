// @/scripts/modules/countItems.ts
// Phase 1: Count items inside a collection (Tables, Views, Functions, Enums)
// Extracts item names and provides statistics

import type { CollectionInfo } from '../shared/types.js';
import { logSuccess, logError, logInfo, logDebug, logWarning, logObjectSummary } from '../shared/logger.js';

export interface CountItemsOptions {
  verbose?: boolean;
  maxItemsToList?: number;  // Maximum number of item names to store in the result
  pattern?: RegExp;         // Custom pattern for matching items
}

// Default pattern for matching object names in a collection
// Matches lines like: "      table_name: {" (6 spaces, then word, then colon, then optional brace)
const DEFAULT_PATTERN = /^\s{6}(\w+):/;

/**
 * Count items in a collection and extract their names
 * 
 * @param lines - Array of lines from the parsed file
 * @param startLine - 1-indexed line where the collection starts (e.g., tablesLine)
 * @param endLine - 1-indexed line where the collection ends (e.g., tablesEndLine)
 * @param options - Optional configuration
 * @returns CollectionInfo with count and item names
 */
export function countItemsInCollection(
  lines: string[],
  startLine: number,
  endLine: number,
  options: CountItemsOptions = {}
): CollectionInfo {
  const { 
    verbose = false, 
    maxItemsToList = 50,
    pattern = DEFAULT_PATTERN
  } = options;
  
  const itemNames: string[] = [];
  let itemCount = 0;
  
  // Convert to 0-indexed for array access
  const startIdx = startLine - 1;
  const endIdx = endLine - 1;
  
  if (startIdx < 0 || startIdx >= lines.length) {
    logError(`Invalid startLine: ${startLine}`);
    return {
      name: 'Unknown',
      startLine,
      endLine,
      itemCount: 0,
      itemNames: []
    };
  }
  
  if (endIdx < startIdx || endIdx >= lines.length) {
    logError(`Invalid endLine: ${endLine}`);
    return {
      name: 'Unknown',
      startLine,
      endLine,
      itemCount: 0,
      itemNames: []
    };
  }
  
  if (verbose) {
    logDebug(`Scanning lines ${startLine}-${endLine} for items matching pattern`);
  }
  
  for (let i = startIdx; i <= endIdx; i++) {
    const line = lines[i];
    const match = line.match(pattern);
    
    if (match) {
      const itemName = match[1];
      itemNames.push(itemName);
      itemCount++;
      
      if (verbose && itemCount <= 10) {
        logDebug(`  Found item ${itemCount}: ${itemName} at line ${i + 1}`);
      }
    }
  }
  
  // Trim itemNames to maxItemsToList if needed
  const trimmedNames = itemNames.slice(0, maxItemsToList);
  
  if (verbose) {
    logObjectSummary(`Items found`, itemCount, trimmedNames.slice(0, 10));
    if (itemNames.length > maxItemsToList) {
      logDebug(`  (showing first ${maxItemsToList} of ${itemNames.length} items)`);
    }
  }
  
  return {
    name: 'Unknown',  // Will be set by caller
    startLine,
    endLine,
    itemCount,
    itemNames: trimmedNames
  };
}

/**
 * Count all collections at once (Tables, Views, Functions, Enums, CompositeTypes)
 * 
 * @param lines - Array of lines from the parsed file
 * @param markers - MarkerResult with start and end lines for each collection
 * @param options - Optional configuration
 * @returns Object with CollectionInfo for each collection
 */
export function countAllCollections(
  lines: string[],
  markers: {
    tablesLine: number;
    tablesEndLine: number;
    viewsLine: number;
    viewsEndLine: number;
    functionsLine: number;
    functionsEndLine: number;
    enumsLine: number;
    enumsEndLine: number;
    compositeTypesLine: number;
    compositeTypesEndLine: number;
  },
  options: CountItemsOptions = {}
): {
  tables: CollectionInfo;
  views: CollectionInfo;
  functions: CollectionInfo;
  enums: CollectionInfo;
  compositeTypes: CollectionInfo;
} {
  const { verbose = false } = options;
  
  if (verbose) {
    logInfo('Counting all collections...');
  }
  
  const tables = countItemsInCollection(lines, markers.tablesLine, markers.tablesEndLine, options);
  tables.name = 'Tables';
  
  const views = countItemsInCollection(lines, markers.viewsLine, markers.viewsEndLine, options);
  views.name = 'Views';
  
  const functions = countItemsInCollection(lines, markers.functionsLine, markers.functionsEndLine, options);
  functions.name = 'Functions';
  
  const enums = countItemsInCollection(lines, markers.enumsLine, markers.enumsEndLine, options);
  enums.name = 'Enums (type-level)';
  
  const compositeTypes = countItemsInCollection(lines, markers.compositeTypesLine, markers.compositeTypesEndLine, options);
  compositeTypes.name = 'CompositeTypes';
  
  if (verbose) {
    logSuccess('Collections counted:');
    logObjectSummary(tables.name, tables.itemCount, tables.itemNames.slice(0, 5));
    logObjectSummary(views.name, views.itemCount, views.itemNames.slice(0, 5));
    logObjectSummary(functions.name, functions.itemCount, functions.itemNames.slice(0, 5));
    logObjectSummary(enums.name, enums.itemCount, enums.itemNames.slice(0, 5));
    logObjectSummary(compositeTypes.name, compositeTypes.itemCount, compositeTypes.itemNames.slice(0, 5));
  }
  
  return {
    tables,
    views,
    functions,
    enums,
    compositeTypes
  };
}

/**
 * Count items in Constants.Enums collection (runtime enums)
 * 
 * @param lines - Array of lines from the parsed file
 * @param startLine - 1-indexed line where Constants.Enums starts
 * @param endLine - 1-indexed line where Constants.Enums ends
 * @param options - Optional configuration
 * @returns CollectionInfo with enum names and count
 */
export function countConstantsEnums(
  lines: string[],
  startLine: number,
  endLine: number,
  options: CountItemsOptions = {}
): CollectionInfo {
  // Constants.Enums uses different indentation (6 spaces)
  const constantsPattern = /^\s{6}(\w+):/;
  
  const result = countItemsInCollection(lines, startLine, endLine, {
    ...options,
    pattern: constantsPattern
  });
  result.name = 'Constants.Enums (runtime)';
  
  return result;
}

/**
 * Get specific item names by index or range
 * 
 * @param itemNames - Array of item names
 * @param startIndex - Starting index (0-based)
 * @param count - Number of items to get
 * @returns Array of item names
 */
export function getItemRange(itemNames: string[], startIndex: number, count: number): string[] {
  return itemNames.slice(startIndex, startIndex + count);
}

/**
 * Check if a specific item exists in a collection
 * 
 * @param itemNames - Array of item names
 * @param targetName - Name to search for
 * @returns True if item exists
 */
export function itemExists(itemNames: string[], targetName: string): boolean {
  return itemNames.includes(targetName);
}

/**
 * Find the line number of a specific item in a collection
 * 
 * @param lines - Array of lines from the parsed file
 * @param startLine - 1-indexed line where the collection starts
 * @param endLine - 1-indexed line where the collection ends
 * @param itemName - Name of the item to find
 * @param pattern - Pattern to match item names (default: DEFAULT_PATTERN)
 * @returns 1-indexed line number of the item, or -1 if not found
 */
export function findItemLine(
  lines: string[],
  startLine: number,
  endLine: number,
  itemName: string,
  pattern: RegExp = DEFAULT_PATTERN
): number {
  const startIdx = startLine - 1;
  const endIdx = endLine - 1;
  
  for (let i = startIdx; i <= endIdx; i++) {
    const line = lines[i];
    const match = line.match(pattern);
    
    if (match && match[1] === itemName) {
      return i + 1; // Convert back to 1-indexed
    }
  }
  
  return -1;
}