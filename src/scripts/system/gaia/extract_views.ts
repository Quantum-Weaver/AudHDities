// src/scripts/system/gaia/extract_views.ts
// ============================================================================
// EXTRACT VIEWS (GAIA)
// ============================================================================
// Purpose: Extract all view definitions from database.types.ts
// Dependencies: extractObject from modules/extract
// ============================================================================

import type { ExtractedObject } from '../../shared/types.js';
import { extractObject } from '../../modules/extract/extract_object.js';
import { logDebug, logSuccess, logWarning, logError } from '../../shared/logger.js';

export interface ViewInfo extends ExtractedObject {
  type: 'view';
  rowContent: string;
  enumRefs: string[];
  hasJson: boolean;
}

export interface ExtractViewsOptions {
  verbose?: boolean;
  maxViews?: number;  // 0 means no limit
}

// Pattern for matching enum references in content
const ENUM_REF_PATTERN = /Database\["public"\]\["Enums"\]\["(\w+)"\]/g;

/**
 * Parse a view's content to extract Row section
 * Views only have Row (no Insert/Update)
 */
function parseViewContent(content: string): {
  rowContent: string;
  enumRefs: string[];
  hasJson: boolean;
} {
  const lines = content.split('\n');
  const enumRefs: string[] = [];
  let hasJson = false;
  
  let rowStartLine = -1;
  let rowEndLine = -1;
  
  // Find Row section start
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    if (line.match(/^\s*Row:\s*\{/)) {
      rowStartLine = i;
      break;
    }
  }
  
  if (rowStartLine === -1) {
    return {
      rowContent: '',
      enumRefs: [],
      hasJson: false
    };
  }
  
  // Find closing brace for Row
  let braceCount = 0;
  let foundOpen = false;
  
  for (let i = rowStartLine; i < lines.length; i++) {
    for (const char of lines[i]) {
      if (char === '{') {
        braceCount++;
        foundOpen = true;
      }
      if (char === '}') {
        braceCount--;
      }
    }
    if (foundOpen && braceCount === 0) {
      rowEndLine = i;
      break;
    }
  }
  
  if (rowEndLine === -1) {
    return {
      rowContent: '',
      enumRefs: [],
      hasJson: false
    };
  }
  
  // Extract Row content (excluding the Row: { and closing })
  const rowLines = lines.slice(rowStartLine + 1, rowEndLine);
  let rowContent = rowLines.join('\n').trim();
  
  // Remove trailing closing brace if present
  if (rowContent.endsWith('}')) {
    rowContent = rowContent.slice(0, -1).trim();
  }
  
  // Extract enum references from Row content
  let match;
  while ((match = ENUM_REF_PATTERN.exec(rowContent)) !== null) {
    if (!enumRefs.includes(match[1])) {
      enumRefs.push(match[1]);
    }
  }
  
  // Check for Json references
  hasJson = rowContent.includes('Json');
  
  // Clean up enum references (replace with PascalCase placeholder)
  for (const enumRef of enumRefs) {
    const pascalCase = enumRef.split('_').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join('');
    rowContent = rowContent.replace(new RegExp(`Database\\["public"\\]\\["Enums"\\]\\["${enumRef}"\\]`, 'g'), pascalCase);
  }
  
  return {
    rowContent,
    enumRefs,
    hasJson
  };
}

/**
 * Extract all view definitions from the parsed file
 */
export async function extractViews(
  lines: string[],
  viewsStartLine: number,
  viewsEndLine: number,
  options?: ExtractViewsOptions
): Promise<ViewInfo[]> {
  const { verbose = false, maxViews = 0 } = options || {};
  const views: ViewInfo[] = [];
  
  if (verbose) {
    logDebug(`Extracting views from lines ${viewsStartLine}-${viewsEndLine}`);
  }
  
  // First, get all view names by scanning the views collection
  const startIdx = viewsStartLine - 1;
  const endIdx = viewsEndLine - 1;
  const viewNames: string[] = [];
  
  const namePattern = /^\s{6}(\w+):/;
  
  for (let i = startIdx; i <= endIdx; i++) {
    const line = lines[i];
    const match = line.match(namePattern);
    if (match) {
      viewNames.push(match[1]);
    }
  }
  
  if (verbose) {
    logDebug(`Found ${viewNames.length} view names`);
  }
  
  const viewsToProcess = maxViews > 0 ? viewNames.slice(0, maxViews) : viewNames;
  
  for (const viewName of viewsToProcess) {
    if (verbose) {
      logDebug(`Extracting view: ${viewName}`);
    }
    
    const extracted = extractObject(
      lines,
      viewsStartLine,
      viewsEndLine,
      viewName,
      { verbose: false, includeHeader: true }
    );
    
    if (!extracted) {
      logWarning(`Could not extract view: ${viewName}`);
      continue;
    }
    
    const { rowContent, enumRefs, hasJson } = parseViewContent(extracted.content);
    
    views.push({
      ...extracted,
      type: 'view',
      rowContent,
      enumRefs,
      hasJson
    });
    
    if (verbose) {
      logDebug(`  Extracted ${viewName}: ${enumRefs.length} enum refs, ${rowContent.split('\n').length} row fields`);
    }
  }
  
  if (verbose) {
    logSuccess(`Extracted ${views.length} views`);
  }
  
  return views;
}