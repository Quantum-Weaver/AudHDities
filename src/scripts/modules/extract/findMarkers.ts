/* src/scripts/modules/system/ */
// Phase 1: Find all key line markers in the parsed file
// Uses the lines array from fileReader.ts (already decoded from UTF-16 LE)

import type { MarkerResult } from '@/scripts/shared/types.js';
import { logSuccess, logError, logInfo, logDebug } from '@/scripts/shared/logger.js';

export interface FindMarkersOptions {
  verbose?: boolean;
}

/**
 * Find all key markers in the database.types.ts file
 * 
 * @param lines - Array of lines from the parsed file (already decoded)
 * @param options - Optional configuration
 * @returns MarkerResult with all line numbers (1-indexed)
 */
export function findMarkers(lines: string[], options: FindMarkersOptions = {}): MarkerResult {
  const { verbose = false } = options;
  
  // Initialize with -1 (not found)
  const markers: MarkerResult = {
    databaseLine: -1,
    dbWithoutInternalsLine: -1,
    publicLine: -1,
    tablesLine: -1,
    tablesEndLine: -1,
    viewsLine: -1,
    viewsEndLine: -1,
    functionsLine: -1,
    functionsEndLine: -1,
    enumsLine: -1,
    enumsEndLine: -1,
    compositeTypesLine: -1,
    compositeTypesEndLine: -1,
    constantsLine: -1,
    constantsEndLine: -1,
    constantsEnumsLine: -1,
    constantsEnumsEndLine: -1,
  };
  
  if (verbose) {
    logDebug('Searching for markers in ' + lines.length + ' lines');
  }
  
  // =====================================================
  // PASS 1: Find exact string matches
  // =====================================================
  
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    
    // Database type declaration
    if (markers.databaseLine === -1 && line.includes('export type Database = {')) {
      markers.databaseLine = i + 1;
      if (verbose) logDebug(`Found Database at line ${markers.databaseLine}`);
    }
    
    // DatabaseWithoutInternals
    if (markers.dbWithoutInternalsLine === -1 && 
        line.includes('type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">')) {
      markers.dbWithoutInternalsLine = i + 1;
      if (verbose) logDebug(`Found DatabaseWithoutInternals at line ${markers.dbWithoutInternalsLine}`);
    }
    
    // Constants declaration
    if (markers.constantsLine === -1 && line.includes('export const Constants = {')) {
      markers.constantsLine = i + 1;
      if (verbose) logDebug(`Found Constants at line ${markers.constantsLine}`);
    }
  }
  
  // =====================================================
  // PASS 2: Find nested markers (inside Database)
  // =====================================================
  
  let inDatabase = false;
  let braceDepth = 0;
  
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    
    // Track when we enter Database
    if (!inDatabase && i + 1 === markers.databaseLine) {
      inDatabase = true;
      // Count opening brace on this line
      for (const ch of line) {
        if (ch === '{') braceDepth++;
      }
      continue;
    }
    
    if (inDatabase) {
      // Count braces to track when we exit Database
      for (const ch of line) {
        if (ch === '{') braceDepth++;
        if (ch === '}') braceDepth--;
      }
      
      // Find '  public: {' (two spaces, inside Database)
      if (markers.publicLine === -1 && line.match(/^\s{2}public:\s*\{/)) {
        markers.publicLine = i + 1;
        if (verbose) logDebug(`Found public at line ${markers.publicLine}`);
      }
      
      // Exit Database when braceDepth returns to 0
      if (braceDepth === 0) {
        inDatabase = false;
      }
    }
  }
  
  // =====================================================
  // PASS 3: Find nested markers (inside public)
  // =====================================================
  
  let inPublic = false;
  braceDepth = 0;
  
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    
    // Track when we enter public
    if (!inPublic && i + 1 === markers.publicLine) {
      inPublic = true;
      for (const ch of line) {
        if (ch === '{') braceDepth++;
      }
      continue;
    }
    
    if (inPublic) {
      for (const ch of line) {
        if (ch === '{') braceDepth++;
        if (ch === '}') braceDepth--;
      }
      
      // Find '    Tables: {' (four spaces)
      if (markers.tablesLine === -1 && line.match(/^\s{4}Tables:\s*\{/)) {
        markers.tablesLine = i + 1;
        if (verbose) logDebug(`Found Tables at line ${markers.tablesLine}`);
      }
      
      // Find '    Views: {' (four spaces)
      if (markers.viewsLine === -1 && line.match(/^\s{4}Views:\s*\{/)) {
        markers.viewsLine = i + 1;
        if (verbose) logDebug(`Found Views at line ${markers.viewsLine}`);
      }
      
      // Find '    Functions: {' (four spaces)
      if (markers.functionsLine === -1 && line.match(/^\s{4}Functions:\s*\{/)) {
        markers.functionsLine = i + 1;
        if (verbose) logDebug(`Found Functions at line ${markers.functionsLine}`);
      }
      
      // Find '    Enums: {' (four spaces)
      if (markers.enumsLine === -1 && line.match(/^\s{4}Enums:\s*\{/)) {
        markers.enumsLine = i + 1;
        if (verbose) logDebug(`Found Enums (type-level) at line ${markers.enumsLine}`);
      }
      
      // Find '    CompositeTypes: {' (four spaces)
      if (markers.compositeTypesLine === -1 && line.match(/^\s{4}CompositeTypes:\s*\{/)) {
        markers.compositeTypesLine = i + 1;
        if (verbose) logDebug(`Found CompositeTypes at line ${markers.compositeTypesLine}`);
      }
      
      // Exit public when braceDepth returns to 0
      if (braceDepth === 0) {
        inPublic = false;
      }
    }
  }
  
  // =====================================================
  // PASS 4: Find nested markers (inside Constants.public, not graphql_public)
  // =====================================================
  
  let inConstants = false;
  let inConstantsPublic = false;
  braceDepth = 0;
  
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    
    // Track when we enter Constants
    if (!inConstants && i + 1 === markers.constantsLine) {
      inConstants = true;
      for (const ch of line) {
        if (ch === '{') braceDepth++;
      }
      if (verbose) logDebug(`Entered Constants at line ${i + 1}`);
      continue;
    }
    
    if (inConstants) {
      for (const ch of line) {
        if (ch === '{') braceDepth++;
        if (ch === '}') braceDepth--;
      }
      
      // Track when we enter Constants.public (NOT graphql_public)
      if (!inConstantsPublic && line.match(/^\s{2}public:\s*\{/)) {
        inConstantsPublic = true;
        if (verbose) logDebug(`Entered Constants.public at line ${i + 1}`);
      }
      
      // Find '    Enums: {' inside Constants.public (four spaces)
      if (inConstantsPublic && markers.constantsEnumsLine === -1 && line.match(/^\s{4}Enums:\s*\{/)) {
        markers.constantsEnumsLine = i + 1;
        if (verbose) logDebug(`Found Constants.public.Enums at line ${markers.constantsEnumsLine}`);
      }
      
      // Exit Constants when braceDepth returns to 0
      if (braceDepth === 0) {
        if (verbose) logDebug(`Exited Constants at line ${i + 1}`);
        inConstants = false;
        inConstantsPublic = false;
      }
    }
  }
  
  // =====================================================
  // VALIDATION
  // =====================================================
  
  if (verbose) {
    logInfo('Marker search complete');
    logInfo(`  Database: ${markers.databaseLine}`);
    logInfo(`  DatabaseWithoutInternals: ${markers.dbWithoutInternalsLine}`);
    logInfo(`  public: ${markers.publicLine}`);
    logInfo(`  Tables: ${markers.tablesLine}`);
    logInfo(`  Views: ${markers.viewsLine}`);
    logInfo(`  Functions: ${markers.functionsLine}`);
    logInfo(`  Enums: ${markers.enumsLine}`);
    logInfo(`  CompositeTypes: ${markers.compositeTypesLine}`);
    logInfo(`  Constants: ${markers.constantsLine}`);
    logInfo(`  Constants.Enums: ${markers.constantsEnumsLine}`);
  }
  
  // Check for critical missing markers
  const criticalMarkers = [
    { name: 'databaseLine', value: markers.databaseLine },
    { name: 'dbWithoutInternalsLine', value: markers.dbWithoutInternalsLine },
    { name: 'publicLine', value: markers.publicLine },
    { name: 'tablesLine', value: markers.tablesLine },
    { name: 'constantsLine', value: markers.constantsLine },
  ];
  
  for (const marker of criticalMarkers) {
    if (marker.value === -1) {
      logError(`Critical marker not found: ${marker.name}`);
    }
  }
  
  return markers;
}