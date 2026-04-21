// scripts/system/gaia/phases/phase3_enrich_table.ts
// PHASE 3: Extract and enrich a single table

import { extractObject } from '../../../modules/extract/extract_object.js';
import { parseTableContent } from '../../../modules/format/format_object_types.js';
import { logError, logInfo, logDebug, logSuccess } from '../../../shared/logger.js';
import type { GaiaOptions } from '../index.js';

export interface EnrichedTable {
  name: string;
  deityFolder: string;
  enumRefs: string[];
  hasJson: boolean;
  rowContent: string;
  content: string;
  startLine: number;
  endLine: number;
}

export async function phase3_enrichTable(
  tableName: string,
  lines: string[],
  markers: any,
  runtimeEnums: Map<string, string[]>,
  deityFolderMap: Map<string, string>,
  options: GaiaOptions
): Promise<EnrichedTable | null> {
  const { verbose } = options;
  
  if (verbose) logInfo(`\n  📦 Extracting: ${tableName}`);
  
  // Extract table object
  const tableObj = extractObject(
    lines,
    markers.tablesLine,
    markers.tablesEndLine,
    tableName,
    { verbose }
  );
  
  if (!tableObj) {
    logError(`    Failed to extract ${tableName}`);
    return null;
  }
  
  // Parse table content
  const parsed = parseTableContent(tableObj.content);
  const deityFolder = deityFolderMap.get(tableName) || 'hestia-core';
  
  const enriched: EnrichedTable = {
    name: tableName,
    deityFolder,
    enumRefs: parsed.enumRefs,
    hasJson: parsed.hasJson,
    rowContent: parsed.rowContent,
    content: tableObj.content,
    startLine: tableObj.startLine,
    endLine: tableObj.endLine
  };
  
  if (verbose) {
    logSuccess(`    ✓ Extracted ${tableName}`);
    if (enriched.enumRefs.length > 0) {
      logDebug(`      Enums: ${enriched.enumRefs.join(', ')}`);
    }
  }
  
  return enriched;
}