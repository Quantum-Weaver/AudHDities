// @/scripts/generators/gaia/extractTables.ts
// ============================================================================
// EXTRACT TABLES (GAIA)
// ============================================================================
// Purpose: Extract all table definitions from database.types.ts
// Dependencies: extractObject from modules/extract
// ============================================================================

import type { ExtractedObject } from '../../shared/types.js';
import { extractObject } from '../../modules/extract/extract_object.js';
import { logDebug, logSuccess, logWarning, logError } from '../../shared/logger.js';

export interface TableInfo extends ExtractedObject {
  type: 'table';
  rowContent: string;
  insertContent: string;
  updateContent: string;
  enumRefs: string[];
  hasJson: boolean;
}

export interface ExtractTablesOptions {
  verbose?: boolean;
  maxTables?: number;  // 0 means no limit
}

// Pattern for matching enum references in content
const ENUM_REF_PATTERN = /Database\["public"\]\["Enums"\]\["(\w+)"\]/g;

/**
 * Parse a table's content to extract Row, Insert, Update sections
 * Uses brace counting to find section boundaries
 */
function parseTableContent(content: string): {
  rowContent: string;
  insertContent: string;
  updateContent: string;
  enumRefs: string[];
  hasJson: boolean;
} {
  const lines = content.split('\n');
  const enumRefs: string[] = [];
  let hasJson = false;
  
  let rowStartLine = -1;
  let rowEndLine = -1;
  let insertStartLine = -1;
  let insertEndLine = -1;
  let updateStartLine = -1;
  let updateEndLine = -1;
  
  // Find section start lines
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    if (line.match(/^\s*Row:\s*\{/)) {
      rowStartLine = i;
    }
    if (line.match(/^\s*Insert:\s*\{/)) {
      insertStartLine = i;
    }
    if (line.match(/^\s*Update:\s*\{/)) {
      updateStartLine = i;
    }
  }
  
  // Helper to find closing brace line
  function findClosingBrace(startIdx: number): number {
    let braceCount = 0;
    let foundOpen = false;
    
    for (let i = startIdx; i < lines.length; i++) {
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
        return i;
      }
    }
    return -1;
  }
  
  // Extract Row section
  if (rowStartLine !== -1 && insertStartLine !== -1) {
    rowEndLine = insertStartLine - 1;
    const rowLines = lines.slice(rowStartLine + 1, rowEndLine);
    let rowContent = rowLines.join('\n').trim();
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
    
    // Extract Insert section
    if (insertStartLine !== -1 && updateStartLine !== -1) {
      insertEndLine = updateStartLine - 1;
      const insertLines = lines.slice(insertStartLine + 1, insertEndLine);
      let insertContent = insertLines.join('\n').trim();
      if (insertContent.endsWith('}')) {
        insertContent = insertContent.slice(0, -1).trim();
      }
      
      // Clean up enum references in Insert
      for (const enumRef of enumRefs) {
        const pascalCase = enumRef.split('_').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join('');
        insertContent = insertContent.replace(new RegExp(`Database\\["public"\\]\\["Enums"\\]\\["${enumRef}"\\]`, 'g'), pascalCase);
      }
      
      // Extract Update section
      if (updateStartLine !== -1) {
        const updateCloseLine = findClosingBrace(updateStartLine);
        if (updateCloseLine !== -1) {
          updateEndLine = updateCloseLine;
          const updateLines = lines.slice(updateStartLine + 1, updateEndLine);
          let updateContent = updateLines.join('\n').trim();
          if (updateContent.endsWith('}')) {
            updateContent = updateContent.slice(0, -1).trim();
          }
          
          // Clean up enum references in Update
          for (const enumRef of enumRefs) {
            const pascalCase = enumRef.split('_').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join('');
            updateContent = updateContent.replace(new RegExp(`Database\\["public"\\]\\["Enums"\\]\\["${enumRef}"\\]`, 'g'), pascalCase);
          }
          
          return {
            rowContent,
            insertContent,
            updateContent,
            enumRefs,
            hasJson
          };
        }
      }
    }
  }
  
  return {
    rowContent: '',
    insertContent: '',
    updateContent: '',
    enumRefs: [],
    hasJson: false
  };
}

/**
 * Extract all table definitions from the parsed file
 */
export async function extractTables(
  lines: string[],
  tablesStartLine: number,
  tablesEndLine: number,
  options?: ExtractTablesOptions
): Promise<TableInfo[]> {
  const { verbose = false, maxTables = 0 } = options || {};
  const tables: TableInfo[] = [];
  
  if (verbose) {
    logDebug(`Extracting tables from lines ${tablesStartLine}-${tablesEndLine}`);
  }
  
  // First, get all table names by scanning the tables collection
  const startIdx = tablesStartLine - 1;
  const endIdx = tablesEndLine - 1;
  const tableNames: string[] = [];
  
  const namePattern = /^\s{6}(\w+):/;
  
  for (let i = startIdx; i <= endIdx; i++) {
    const line = lines[i];
    const match = line.match(namePattern);
    if (match) {
      tableNames.push(match[1]);
    }
  }
  
  if (verbose) {
    logDebug(`Found ${tableNames.length} table names`);
  }
  
  const tablesToProcess = maxTables > 0 ? tableNames.slice(0, maxTables) : tableNames;
  
  for (const tableName of tablesToProcess) {
    if (verbose) {
      logDebug(`Extracting table: ${tableName}`);
    }
    
    const extracted = extractObject(
      lines,
      tablesStartLine,
      tablesEndLine,
      tableName,
      { verbose: false, includeHeader: true }
    );
    
    if (!extracted) {
      logWarning(`Could not extract table: ${tableName}`);
      continue;
    }
    
    const { rowContent, insertContent, updateContent, enumRefs, hasJson } = parseTableContent(extracted.content);
    
    tables.push({
      ...extracted,
      type: 'table',
      rowContent,
      insertContent,
      updateContent,
      enumRefs,
      hasJson
    });
    
    if (verbose) {
      logDebug(`  Extracted ${tableName}: ${enumRefs.length} enum refs, ${rowContent.split('\n').length} row fields`);
    }
  }
  
  if (verbose) {
    logSuccess(`Extracted ${tables.length} tables`);
  }
  
  return tables;
}