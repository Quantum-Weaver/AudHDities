// src/scripts/system/gaia/maintenance/generate_schema_json.ts
// ╔═══════════════════════════════════════════════════════════════════════════╗
// ║                    GENERATE SCHEMA JSON                                   ║
// ║                    Reads database.types.ts → outputs schema-data.json     ║
// ╚═══════════════════════════════════════════════════════════════════════════╝

import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';

// ─── GAIA Extraction Layer ─────────────────────────────────────────────────
import { readDatabaseTypes } from '../../../shared/file_reader.js';
import { findMarkers } from '../../../modules/system/find_markers.js';
import { findAllClosingBraces } from '../../../modules/system/find_closing_braces.js';
import { extractTables } from '../extract/extract_tables.js';
import { extractRuntimeEnums } from '../extract/extract_runtime_enums.js';
import { extractFunctions } from '../extract/extract_functions.js';
import { logSuccess, logInfo, logError, logStep, logSeparator } from '../../../shared/logger.js';

// ─── Configuration ─────────────────────────────────────────────────────────
import { DEITY_GROUPS } from '@/config/deity_groups.js';
import { SENSITIVE_FIELDS } from '@/config/sensitive_fields.js';
import { isFunctionExcluded } from '@/config/excluded_functions.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// ═══════════════════════════════════════════════════════════════════════════
// TYPES
// ═══════════════════════════════════════════════════════════════════════════

interface SchemaColumn {
  name: string;
  type: string;
  nullable: boolean;
  description?: string;
}

interface SchemaRelationship {
  from: string;
  to: string;
  type: 'one-to-one' | 'one-to-many' | 'many-to-one';
}

interface SchemaTable {
  name: string;
  description: string;
  columns: SchemaColumn[];
  relationships: SchemaRelationship[];
}

interface SchemaEnum {
  name: string;
  values: string[];
}

interface SchemaFunction {
  name: string;
  args: string;
  returnType: string;
}

interface SchemaData {
  tables: SchemaTable[];
  enums: SchemaEnum[];
  functions: SchemaFunction[];
  generatedAt: string;
}

// ═══════════════════════════════════════════════════════════════════════════
// PARSING
// ═══════════════════════════════════════════════════════════════════════════

function parseColumnsFromRowContent(rowContent: string): SchemaColumn[] {
  const columns: SchemaColumn[] = [];
  const lines = rowContent.split('\n');

  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('//') || trimmed.startsWith('{') || trimmed.startsWith('}')) {
      continue;
    }

    const match = trimmed.match(/^(\w+)\??:\s*(.+?)(?:\s*\|\s*null)?;?\s*$/);
    if (!match) continue;

    const colName = match[1];
    let colType = match[2].trim();

    colType = colType
      .replace(/Database\["public"\]\["Enums"\]\["(\w+)"\]/g, '$1')
      .replace(/^string$/i, 'TEXT')
      .replace(/^number$/i, 'DECIMAL')
      .replace(/^boolean$/i, 'BOOLEAN')
      .replace(/^Json$/i, 'JSONB')
      .replace(/;.*$/, '')
      .trim();

    const nullable = trimmed.includes('| null') || trimmed.includes('?:');

    columns.push({ name: colName, type: colType, nullable });
  }

  return columns;
}

function deriveRelationships(
  tableName: string,
  columns: SchemaColumn[]
): SchemaRelationship[] {
  const relationships: SchemaRelationship[] = [];
  const seen = new Set<string>();

  for (const col of columns) {
    if (!col.name.endsWith('_id') || col.name === 'id') continue;

    const refTable = col.name.replace('_id', '');
    const possibleRefs = [refTable, refTable + 's', refTable.replace(/y$/, 'ie') + 's', refTable + 'es'];
    const target = possibleRefs.find((r) => r !== tableName) || refTable;

    const forwardKey = `${tableName}.${col.name}-${target}.id`;
    if (!seen.has(forwardKey)) {
      seen.add(forwardKey);
      relationships.push({
        from: `${tableName}.${col.name}`,
        to: `${target}.id`,
        type: 'many-to-one' as const,
      });
    }

    const reverseKey = `${target}.id-${tableName}.${col.name}`;
    if (!seen.has(reverseKey)) {
      seen.add(reverseKey);
      relationships.push({
        from: `${target}.id`,
        to: `${tableName}.${col.name}`,
        type: 'one-to-many' as const,
      });
    }
  }

  return relationships;
}

function getTableDeity(tableName: string): string {
  for (const group of DEITY_GROUPS) {
    if ((group.tables as readonly string[]).includes(tableName)) {
      return group.folderName;
    }
  }
  return 'ungrouped';
}

function isSensitiveField(fieldName: string): boolean {
  return (SENSITIVE_FIELDS as readonly string[]).includes(fieldName);
}

// ═══════════════════════════════════════════════════════════════════════════
// MAIN
// ═══════════════════════════════════════════════════════════════════════════

async function generateSchemaJson(): Promise<void> {
  logSeparator('═', 60);
  logStep('🔍 GAIA Schema JSON Generator');
  logSeparator('═', 60);

  // ─── Phase 1: Read database.types.ts ──────────────────────────────────
  logStep('\n📖 Reading database.types.ts');
  const { content, success } = readDatabaseTypes();
  if (!success) throw new Error('Failed to read database.types.ts');
  const lines = content.split('\n');
  logSuccess(`Read ${lines.length} lines`);

  // ─── Phase 2: Extract markers ─────────────────────────────────────────
  logStep('\n📍 Finding markers');
  const markers = findMarkers(lines, { verbose: false });
  const markersWithBraces = findAllClosingBraces(lines, markers, { verbose: false });
  logSuccess('Markers resolved');

  // ─── Phase 3: Extract tables ──────────────────────────────────────────
  logStep('\n📊 Extracting tables');
  const extractedTables = await extractTables(
    lines,
    markersWithBraces.tablesLine,
    markersWithBraces.tablesEndLine,
    { verbose: false }
  );
  logSuccess(`Extracted ${extractedTables.length} tables`);

  // ─── Phase 4: Extract enums ───────────────────────────────────────────
  logStep('\n🔢 Extracting enums');
  const runtimeEnums = await extractRuntimeEnums(
    lines,
    markersWithBraces.constantsEnumsLine,
    markersWithBraces.constantsEnumsEndLine,
    { verbose: false }
  );
  logSuccess(`Extracted ${runtimeEnums.length} enums`);

  // ─── Phase 5: Extract functions ───────────────────────────────────────
  logStep('\n⚡ Extracting functions');
  const extractedFunctions = await extractFunctions(
    lines,
    markersWithBraces.functionsLine,
    markersWithBraces.functionsEndLine,
    { verbose: false }
  );
  const filteredFunctions = extractedFunctions.filter(
    (f) => !isFunctionExcluded(f.name)
  );
  logSuccess(
    `Extracted ${extractedFunctions.length} functions, ${filteredFunctions.length} after filtering`
  );

  // ─── Phase 6: Build schema data ───────────────────────────────────────
  logStep('\n🏗️  Building schema data');

  const tables: SchemaTable[] = [];
  const tableNames = new Set<string>();

  for (const extracted of extractedTables) {
    const tableName = extracted.name;
    tableNames.add(tableName);

    const columns = parseColumnsFromRowContent(extracted.rowContent);

    for (const col of columns) {
      if (isSensitiveField(col.name)) {
        col.description = '(sensitive — data never exposed)';
      }
    }

    const relationships = deriveRelationships(tableName, columns);
    const deityFolder = getTableDeity(tableName);

    tables.push({
      name: tableName,
      description: `Table in ${deityFolder}`,
      columns,
      relationships,
    });
  }

  for (const table of tables) {
    table.relationships = table.relationships.filter((rel) => {
      const targetTable = rel.to.split('.')[0];
      return tableNames.has(targetTable);
    });
  }

  const enums: SchemaEnum[] = runtimeEnums.map((e) => ({
    name: e.name,
    values: e.values,
  }));

  const functions: SchemaFunction[] = filteredFunctions.map((f) => ({
    name: f.name,
    args: f.argsContent  || '',
    returnType: f.returnsContent  || 'unknown',
  }));

  const schemaData: SchemaData = {
    tables,
    enums,
    functions,
    generatedAt: new Date().toISOString(),
  };

  logSuccess(`Built ${tables.length} tables, ${enums.length} enums, ${functions.length} functions`);

  // ─── Phase 7: Write output ────────────────────────────────────────────
  logStep('\n💾 Writing schema-data.json');

  const outputPath = path.resolve(__dirname, '../../../../lib/schema/schema-data.json');
  fs.writeFileSync(outputPath, JSON.stringify(schemaData, null, 2));
  logSuccess(`Written to: ${outputPath}`);
  logInfo(`Size: ${(fs.statSync(outputPath).size / 1024).toFixed(1)} KB`);

  // ─── Summary ──────────────────────────────────────────────────────────
  console.log('');
  logSeparator('═', 60);
  console.log(`  Tables:      ${tables.length}`);
  console.log(`  Enums:       ${enums.length}`);
  console.log(`  Functions:   ${functions.length}`);
  console.log(`  Columns:     ${tables.reduce((sum, t) => sum + t.columns.length, 0)}`);
  console.log(
    `  Relationships: ${tables.reduce((sum, t) => sum + t.relationships.length, 0)}`
  );
  console.log(
    `  Sensitive:   ${tables.reduce((sum, t) => sum + t.columns.filter((c) => c.description?.includes('sensitive')).length, 0)}`
  );
  logSeparator('═', 60);
}

generateSchemaJson().catch((error) => {
  logError(`Schema generation failed: ${error.message}`);
  process.exit(1);
});