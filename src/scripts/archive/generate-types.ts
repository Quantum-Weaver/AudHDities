// src/scripts/generate-types.ts
// INCREMENT 1: Parser Foundation
// Purpose: Locate and log enums and table structures from database.types.ts
// Does NOT write any files yet
// ES Module compatible

import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';
import ts from 'typescript';

// ES module equivalents for __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configuration
const DB_TYPES_PATH = path.join(process.cwd(), 'src/types/supabase/database.types.ts');
const VERBOSE = true;

// =====================================================
// UTILITY FUNCTIONS
// =====================================================

function log(message: string, indent: number = 0): void {
  if (!VERBOSE) return;
  const prefix = '  '.repeat(indent);
  console.log(`${prefix}${message}`);
}

function logSuccess(message: string): void {
  console.log(`✅ ${message}`);
}

function logError(message: string): void {
  console.log(`❌ ${message}`);
}

function logInfo(message: string): void {
  console.log(`📌 ${message}`);
}

function logSeparator(): void {
  console.log('─'.repeat(60));
}

// =====================================================
// NODE VISITORS
// =====================================================

export interface EnumInfo {
  name: string;
  values: string[];
}

export interface TableInfo {
  name: string;
  rowType: string;
  lineStart: number;
  lineEnd: number;
}

export interface ParseResult {
  enums: EnumInfo[];
  tables: TableInfo[];
  errors: string[];
}

export function parseDatabaseTypes(filePath: string): ParseResult {
  log(`Parsing: ${filePath}`);
  logSeparator();

  const result: ParseResult = {
    enums: [],
    tables: [],
    errors: []
  };

  // Read and parse file
  const fileContent = fs.readFileSync(filePath, 'utf-8');
  const sourceFile = ts.createSourceFile(
    filePath,
    fileContent,
    ts.ScriptTarget.Latest,
    true
  );

  let inConstants = false;
  let inGraphqlPublic = false;
  let inEnums = false;
  let inDatabase = false;
  let inPublic = false;
  let inTables = false;
  let currentEnumName: string | null = null;
  let currentEnumValues: string[] = [];
  let currentTableName: string | null = null;
  let currentTableRowStart = 0;
  let currentTableRowEnd = 0;
  let braceDepth = 0;
  let targetBraceDepth = 0;

  // Walk the AST
  function visit(node: ts.Node) {
    // Track brace depth for structural context
    if (ts.isBlock(node) || ts.isObjectLiteralExpression(node)) {
      braceDepth++;
    }

    // =====================================================
    // LOCATE: export const Constants
    // =====================================================
    if (ts.isVariableStatement(node)) {
      const declarations = node.declarationList.declarations;
      for (const decl of declarations) {
        if (ts.isIdentifier(decl.name) && decl.name.text === 'Constants') {
          log('Found: export const Constants');
          inConstants = true;
          logSuccess('Constants located');
        }
      }
    }

    // =====================================================
    // LOCATE: graphql_public
    // =====================================================
    if (inConstants && ts.isPropertyAssignment(node) && ts.isIdentifier(node.name)) {
      if (node.name.text === 'graphql_public') {
        log('Found: graphql_public');
        inGraphqlPublic = true;
        logSuccess('graphql_public located');
      }
    }

    // =====================================================
    // LOCATE: Enums
    // =====================================================
    if (inGraphqlPublic && ts.isPropertyAssignment(node) && ts.isIdentifier(node.name)) {
      if (node.name.text === 'Enums') {
        log('Found: Enums');
        inEnums = true;
        logSuccess('Enums container located');
      }
    }

    // =====================================================
    // EXTRACT ENUM VALUES
    // =====================================================
    if (inEnums && ts.isPropertyAssignment(node) && ts.isIdentifier(node.name)) {
      currentEnumName = node.name.text;
      currentEnumValues = [];
      log(`  Processing enum: ${currentEnumName}`, 1);

      // Look for the array values
      if (ts.isArrayLiteralExpression(node.initializer)) {
        for (const element of node.initializer.elements) {
          if (ts.isStringLiteral(element)) {
            currentEnumValues.push(element.text);
          }
        }
        result.enums.push({
          name: currentEnumName,
          values: currentEnumValues
        });
        log(`    Values: [${currentEnumValues.join(', ')}]`, 2);
        logSuccess(`Enum ${currentEnumName} extracted with ${currentEnumValues.length} values`);
      }
    }

    // =====================================================
    // LOCATE: export type Database
    // =====================================================
    if (ts.isTypeAliasDeclaration(node) && node.name.text === 'Database') {
      log('Found: export type Database');
      inDatabase = true;
      logSuccess('Database type located');
    }

    // =====================================================
    // LOCATE: public
    // =====================================================
    if (inDatabase && ts.isPropertySignature(node) && ts.isIdentifier(node.name)) {
      if (node.name.text === 'public') {
        log('Found: public');
        inPublic = true;
        logSuccess('public namespace located');
      }
    }

    // =====================================================
    // LOCATE: Tables
    // =====================================================
    if (inPublic && ts.isPropertySignature(node) && ts.isIdentifier(node.name)) {
      if (node.name.text === 'Tables') {
        log('Found: Tables');
        inTables = true;
        logSuccess('Tables container located');
      }
    }

    // =====================================================
    // EXTRACT TABLE NAMES
    // =====================================================
    if (inTables && ts.isPropertySignature(node) && ts.isIdentifier(node.name)) {
      currentTableName = node.name.text;
      currentTableRowStart = node.getStart(sourceFile);
      currentTableRowEnd = node.getEnd();
      
      log(`  Found table: ${currentTableName}`, 1);
      
      result.tables.push({
        name: currentTableName,
        rowType: 'Row', // Will be refined in next increment
        lineStart: currentTableRowStart,
        lineEnd: currentTableRowEnd
      });
    }

    ts.forEachChild(node, visit);
    
    // Decrement brace depth when leaving blocks
    if (ts.isBlock(node) || ts.isObjectLiteralExpression(node)) {
      braceDepth--;
    }
  }

  visit(sourceFile);

  // Summary
  logSeparator();
  logInfo(`Parsing complete:`);
  log(`  Enums found: ${result.enums.length}`);
  log(`  Tables found: ${result.tables.length}`);
  log(`  Errors: ${result.errors.length}`);

  return result;
}

// =====================================================
// MAIN EXECUTION
// =====================================================

function main(): void {
  console.log('\n');
  logSeparator();
  logInfo('AETHELRED TYPE GENERATOR - INCREMENT 1');
  logInfo('Parser Foundation - Read Only Mode');
  logSeparator();
  console.log('\n');

  // Check if database.types.ts exists
  if (!fs.existsSync(DB_TYPES_PATH)) {
    logError(`Database types file not found at: ${DB_TYPES_PATH}`);
    process.exit(1);
  }

  logSuccess(`Database types file located: ${DB_TYPES_PATH}`);
  console.log('\n');

  // Parse the file
  const result = parseDatabaseTypes(DB_TYPES_PATH);

  // Display results
  console.log('\n');
  logSeparator();
  logInfo('EXTRACTION RESULTS');
  logSeparator();

  // Display enums
  console.log('\n');
  logInfo(`ENUMS (${result.enums.length}):`);
  for (const enumInfo of result.enums) {
    console.log(`  📋 ${enumInfo.name}: [${enumInfo.values.slice(0, 5).join(', ')}${enumInfo.values.length > 5 ? '...' : ''}]`);
  }

  // Display tables
  console.log('\n');
  logInfo(`TABLES (${result.tables.length}):`);
  
  // Group tables by first letter for easier reading
  const tablesByLetter: Record<string, string[]> = {};
  for (const table of result.tables) {
    const firstLetter = table.name[0].toUpperCase();
    if (!tablesByLetter[firstLetter]) tablesByLetter[firstLetter] = [];
    tablesByLetter[firstLetter].push(table.name);
  }

  for (const [letter, tables] of Object.entries(tablesByLetter).sort()) {
    console.log(`  📁 ${letter}: ${tables.join(', ')}`);
  }

  // Report Hestia group tables (for verification)
  console.log('\n');
  logInfo('HESTIA GROUP TABLES (Core Identity):');
  const hestiaTables = [
    'profiles',
    'user_private',
    'user_financial',
    'creator_profiles',
    'vendor_profiles',
    'community_profiles',
    'channels'
  ];
  
  for (const tableName of hestiaTables) {
    const found = result.tables.some(t => t.name === tableName);
    if (found) {
      logSuccess(`  ✓ ${tableName}`);
    } else {
      logError(`  ✗ ${tableName} (not found)`);
    }
  }

  // Final status
  console.log('\n');
  logSeparator();
  if (result.errors.length === 0) {
    logSuccess('Parser validation complete. Ready for Increment 2.');
  } else {
    logError(`Parser completed with ${result.errors.length} errors.`);
    for (const err of result.errors) {
      console.log(`  ⚠️ ${err}`);
    }
  }
  logSeparator();
  console.log('\n');
}

// Run main function (ES module compatible)
main();