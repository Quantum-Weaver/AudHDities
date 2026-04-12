// src/scripts/generators/gaia/extractFunctions.ts
// ============================================================================
// EXTRACT FUNCTIONS (GAIA)
// ============================================================================
// Purpose: Extract all function definitions from database.types.ts
// Dependencies: extractObject from modules/extract
// ============================================================================

import type { ExtractedObject } from '../../shared/types.js';
import { extractObject } from '../../modules/extract/extractObject.js';
import { logDebug, logSuccess, logWarning, logError } from '../../shared/logger.js';

export interface FunctionInfo extends ExtractedObject {
  type: 'function';
  argsContent: string;
  returnsContent: string;
}

export interface ExtractFunctionsOptions {
  verbose?: boolean;
  maxFunctions?: number;  // 0 means no limit
}

/**
 * Parse a function's content to extract Args and Returns sections
 */
function parseFunctionContent(content: string): {
  argsContent: string;
  returnsContent: string;
} {
  const lines = content.split('\n');
  
  let argsStartLine = -1;
  let argsEndLine = -1;
  let returnsStartLine = -1;
  let returnsEndLine = -1;
  
  // Find Args section start
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    if (line.match(/^\s*Args:\s*\{/)) {
      argsStartLine = i;
      break;
    }
  }
  
  // Find Returns section start
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    if (line.match(/^\s*Returns:/)) {
      returnsStartLine = i;
      break;
    }
  }
  
  // Helper to find closing brace
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
  
  let argsContent = '';
  let returnsContent = '';
  
  // Extract Args content
  if (argsStartLine !== -1) {
    const argsCloseLine = findClosingBrace(argsStartLine);
    if (argsCloseLine !== -1) {
      argsEndLine = argsCloseLine;
      const argsLines = lines.slice(argsStartLine + 1, argsEndLine);
      argsContent = argsLines.join('\n').trim();
      if (argsContent.endsWith('}')) {
        argsContent = argsContent.slice(0, -1).trim();
      }
    }
  }
  
  // Extract Returns content (single line, no braces typically)
  if (returnsStartLine !== -1) {
    const returnsLine = lines[returnsStartLine];
    // Returns: SomeType
    const returnsMatch = returnsLine.match(/Returns:\s*(.+)/);
    if (returnsMatch) {
      returnsContent = returnsMatch[1].trim();
    }
    
    // If Returns spans multiple lines
    if (returnsContent.includes('{')) {
      const returnsCloseLine = findClosingBrace(returnsStartLine);
      if (returnsCloseLine !== -1) {
        returnsEndLine = returnsCloseLine;
        const returnsLines = lines.slice(returnsStartLine + 1, returnsEndLine);
        returnsContent = returnsLines.join('\n').trim();
      }
    }
  }
  
  return {
    argsContent,
    returnsContent
  };
}

/**
 * Extract all function definitions from the parsed file
 */
export async function extractFunctions(
  lines: string[],
  functionsStartLine: number,
  functionsEndLine: number,
  options?: ExtractFunctionsOptions
): Promise<FunctionInfo[]> {
  const { verbose = false, maxFunctions = 0 } = options || {};
  const functions: FunctionInfo[] = [];
  
  if (verbose) {
    logDebug(`Extracting functions from lines ${functionsStartLine}-${functionsEndLine}`);
  }
  
  // First, get all function names by scanning the functions collection
  const startIdx = functionsStartLine - 1;
  const endIdx = functionsEndLine - 1;
  const functionNames: string[] = [];
  
  const namePattern = /^\s{6}(\w+):/;
  
  for (let i = startIdx; i <= endIdx; i++) {
    const line = lines[i];
    const match = line.match(namePattern);
    if (match) {
      functionNames.push(match[1]);
    }
  }
  
  if (verbose) {
    logDebug(`Found ${functionNames.length} function names`);
  }
  
  const functionsToProcess = maxFunctions > 0 ? functionNames.slice(0, maxFunctions) : functionNames;
  
  for (const functionName of functionsToProcess) {
    if (verbose) {
      logDebug(`Extracting function: ${functionName}`);
    }
    
    const extracted = extractObject(
      lines,
      functionsStartLine,
      functionsEndLine,
      functionName,
      { verbose: false, includeHeader: true }
    );
    
    if (!extracted) {
      logWarning(`Could not extract function: ${functionName}`);
      continue;
    }
    
    const { argsContent, returnsContent } = parseFunctionContent(extracted.content);
    
    functions.push({
      ...extracted,
      type: 'function',
      argsContent,
      returnsContent
    });
    
    if (verbose) {
      logDebug(`  Extracted ${functionName}: Args length ${argsContent.length}, Returns length ${returnsContent.length}`);
    }
  }
  
  if (verbose) {
    logSuccess(`Extracted ${functions.length} functions`);
  }
  
  return functions;
}