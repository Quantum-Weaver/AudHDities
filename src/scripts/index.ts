// @/scripts/index.ts
// Main orchestrator - Processes ALL objects with categorization and deity grouping

import { readDatabaseTypes } from './shared/file_reader.js';
import { findMarkers } from './modules/system/find_markers.js';
import { findAllClosingBraces } from './modules/system/find_closing_braces.js';
import { countAllCollections, countConstantsEnums } from './modules/system/count_items.js';
import { extractObject } from './modules/extract/extract_object.js';
import { getDeityGroupForTable, getFolderNameForTable } from '@/config/deity_groups.js';
import { getObjectCategory, type ObjectCategory } from '@/config/object_categories.js';
import { generateConstantFile, generateMultipleConstantFiles } from './system/gaia/generate_constants.js';
import { generateSingleTypeFile, generateMultipleTypeFiles } from './system/gaia/generate_type_files.js';
// Import the discovery module
import { discoverDirectories, ensureAllDirectories } from './modules/discover/discover_directories.js';
// Import the enum mapping function
import { getTableCategory } from '@/config/object_categories.js';
import { 
  logHeader, logSuccess, logError, logInfo, 
  logSeparator, logWarning, logDebug 
} from '@/scripts/shared/logger.js';
import { getEnumFolder } from '@/config/enum_mapping.js';
import { toPascalCase, formatObjectTypes } from './modules/format/format_object_types.js';
import { generateIndexesForPaths } from './system/gaia/generate_index_files.js';
import { generateValidatorsForTables } from './system/gaia/generate_validators.js';
import { needsValidatorGeneration } from '@/config/workflow_config.js';
import { generateApiRoutesForTables } from './system/gaia/generate_api_routes.js';
import { getWorkflowConfig } from '@/config/workflow_config.js';

async function main(): Promise<void> {
  console.log('\n');
  logSeparator();
  logHeader('🏛️ AETHELRED TYPE GENERATOR');
  logSeparator();
  console.log('\n');
  
  // =====================================================
  // PHASE 1: File Reader
  // =====================================================
  
  logInfo('PHASE 1: Reading File');
  logSeparator('─', 40);
  console.log('\n');
  
  const fileResult = readDatabaseTypes();
  
  if (!fileResult.success) {
    logError(`Failed to read file: ${fileResult.error}`);
    process.exit(1);
  }
  
  const lines = fileResult.content.split(/\r?\n/);
  logSuccess(`File loaded: ${lines.length} lines, ${fileResult.encoding}`);
  
  console.log('\n');
  logSuccess('PHASE 1 COMPLETE');
  logSeparator('─', 40);
  console.log('\n');
  
// =====================================================
// PHASE 1.5: Discover Directories
// =====================================================

logInfo('PHASE 1.5: Discovering Directories');
logSeparator('─', 40);
console.log('\n');

// Discover current state
let directoryState = discoverDirectories({ verbose: true, maxDepth: 2 });

// Ensure all required directories exist
logInfo('\nEnsuring required directories exist...');
directoryState = ensureAllDirectories({ verbose: true, maxDepth: 2 });

console.log('\n');
logSuccess('PHASE 1.5 COMPLETE');
logSeparator('─', 40);
console.log('\n');

  // =====================================================
  // PHASE 2: Find Markers
  // =====================================================
  
  logInfo('PHASE 2: Finding Markers');
  logSeparator('─', 40);
  console.log('\n');
  
  const markers = findMarkers(lines, { verbose: false });
  
  logInfo('Marker Locations:');
  logInfo(`  Database: line ${markers.databaseLine}`);
  logInfo(`  public: line ${markers.publicLine}`);
  logInfo(`  Tables: line ${markers.tablesLine}`);
  logInfo(`  Views: line ${markers.viewsLine}`);
  logInfo(`  Functions: line ${markers.functionsLine}`);
  logInfo(`  Enums (type-level): line ${markers.enumsLine}`);
  logInfo(`  CompositeTypes: line ${markers.compositeTypesLine}`);
  logInfo(`  Constants: line ${markers.constantsLine}`);
  logInfo(`  Constants.Enums: line ${markers.constantsEnumsLine}`);
  
  console.log('\n');
  logSuccess('PHASE 2 COMPLETE');
  logSeparator('─', 40);
  console.log('\n');
  
  // =====================================================
  // PHASE 3: Find Closing Braces
  // =====================================================
  
  logInfo('PHASE 3: Finding Closing Braces');
  logSeparator('─', 40);
  console.log('\n');
  
  const completeMarkers = findAllClosingBraces(lines, markers, { verbose: false });
  
  logInfo('Collection Ranges:');
  logInfo(`  Tables: lines ${completeMarkers.tablesLine}-${completeMarkers.tablesEndLine}`);
  logInfo(`  Views: lines ${completeMarkers.viewsLine}-${completeMarkers.viewsEndLine}`);
  logInfo(`  Functions: lines ${completeMarkers.functionsLine}-${completeMarkers.functionsEndLine}`);
  logInfo(`  Enums: lines ${completeMarkers.enumsLine}-${completeMarkers.enumsEndLine}`);
  logInfo(`  CompositeTypes: lines ${completeMarkers.compositeTypesLine}-${completeMarkers.compositeTypesEndLine}`);
  logInfo(`  Constants: lines ${completeMarkers.constantsLine}-${completeMarkers.constantsEndLine}`);
  
  console.log('\n');
  logSuccess('PHASE 3 COMPLETE');
  logSeparator('─', 40);
  console.log('\n');
  
  // =====================================================
  // PHASE 4: Count and Categorize All Collections
  // =====================================================
  
  logInfo('PHASE 4: Counting and Categorizing Collections');
  logSeparator('─', 40);
  console.log('\n');
  
  const collections = countAllCollections(lines, completeMarkers, { verbose: false, maxItemsToList: 200 });
  
  console.log('\n📌 COLLECTION COUNTS:');
  logInfo(`  Tables: ${collections.tables.itemCount} items`);
  logInfo(`  Views: ${collections.views.itemCount} items`);
  logInfo(`  Functions: ${collections.functions.itemCount} items`);
  logInfo(`  Enums (type-level): ${collections.enums.itemCount} items`);
  logInfo(`  CompositeTypes: ${collections.compositeTypes.itemCount} items`);
  
  // =====================================================
  // PHASE 5: Process Tables with Categorization
  // =====================================================
  
  console.log('\n');
  logInfo('PHASE 5: Processing Tables with Categorization');
  logSeparator('─', 40);
  console.log('\n');
  
  const tableResults: Array<{
    name: string;
    deityGroup: string;
    folderName: string;
    handlingLevel: string;
    category: ObjectCategory;
    exists: boolean;
  }> = [];
  
  for (const tableName of collections.tables.itemNames) {
    // Get deity group from config
    const deityGroup = getDeityGroupForTable(tableName);
    const folderName = getFolderNameForTable(tableName) || 'unassigned';
    const category = getObjectCategory('table', tableName);
    
    // Check if file already exists (for type files)
    const typeFilePath = `@/types/${folderName}/${tableName}.ts`;
    const fileExists = require('fs').existsSync(typeFilePath);
    // In Phase 5, after checking fileExists, add:
    if (tableName === 'profiles' || tableName === 'products') {
      console.log(`\n  DEBUG: ${tableName}`);
      console.log(`    folderName: ${folderName}`);
      console.log(`    typeFilePath: ${typeFilePath}`);
      console.log(`    fileExists: ${fileExists}`);
      console.log(`    getFolderNameForTable: ${getFolderNameForTable(tableName)}`);
    }
    tableResults.push({
      name: tableName,
      deityGroup: deityGroup?.name || 'unassigned',
      folderName,
      handlingLevel: category.handlingLevel,
      category,
      exists: fileExists
    });
  }
  
  // Display table categorization
  console.log('📌 TABLE CATEGORIZATION:');
  console.log('');
  
  // Group by handling level
  const byHandlingLevel: Record<string, string[]> = {};
  for (const result of tableResults) {
    if (!byHandlingLevel[result.handlingLevel]) {
      byHandlingLevel[result.handlingLevel] = [];
    }
    byHandlingLevel[result.handlingLevel].push(result.name);
  }
  
  for (const [level, tables] of Object.entries(byHandlingLevel)) {
    const levelColor = level === 'full_crud' ? '🟢' : level === 'assessment' ? '🟡' : level === 'join_table' ? '🔵' : '⚪';
    console.log(`  ${levelColor} ${level}: ${tables.length} tables`);
    for (const table of tables.slice(0, 10)) {
      const result = tableResults.find(r => r.name === table);
      const status = result?.exists ? '📁 exists' : '✨ new';
      console.log(`      └─ ${table} (${result?.deityGroup}) [${status}]`);
    }
    if (tables.length > 10) {
      console.log(`      └─ ... and ${tables.length - 10} more`);
    }
    console.log('');
  }
  // =====================================================
  // PHASE 6: Process Views
  // =====================================================
  
  console.log('📌 VIEW CATEGORIZATION:');
  console.log('');
  
  for (const viewName of collections.views.itemNames) {
    const category = getObjectCategory('view', viewName);
    const fileExists = require('fs').existsSync(`@/types/views/${viewName}.ts`);
    const status = fileExists ? '📁 exists' : '✨ new';
    console.log(`  👁️ ${viewName} (${category.handlingLevel}) [${status}]`);
  }
  
  // =====================================================
  // PHASE 7: Process Functions
  // =====================================================
  
  console.log('\n📌 FUNCTION CATEGORIZATION:');
  console.log('');
  
  for (const functionName of collections.functions.itemNames.slice(0, 20)) {
    const category = getObjectCategory('function', functionName);
    console.log(`  ⚙️ ${functionName} (${category.handlingLevel})`);
  }
  if (collections.functions.itemCount > 20) {
    console.log(`  ... and ${collections.functions.itemCount - 20} more`);
  }
  
  // =====================================================
  // PHASE 8: Process Enums (Type-Level vs Runtime)
  // =====================================================
  
  console.log('\n📌 ENUM CATEGORIZATION:');
  console.log('');
  
  // Type-level enums
  for (const enumName of collections.enums.itemNames.slice(0, 15)) {
    const category = getObjectCategory('type_enum', enumName);
    const constPath = `@/lib/constants/core/${enumName}.ts`;
    const constExists = require('fs').existsSync(constPath);
    const status = constExists ? '📁 exists' : '✨ new';
    console.log(`  📋 ${enumName} (type-level) [${status}]`);
  }
  if (collections.enums.itemCount > 15) {
    console.log(`  ... and ${collections.enums.itemCount - 15} more`);
  }
  
  // Runtime enums (Constants)
  if (completeMarkers.constantsEnumsLine !== -1 && completeMarkers.constantsEnumsEndLine !== -1) {
    const runtimeEnums = countConstantsEnums(
      lines,
      completeMarkers.constantsEnumsLine,
      completeMarkers.constantsEnumsEndLine,
      { verbose: false }
    );
    
    console.log('\n📌 RUNTIME ENUMS (Constants.public.Enums):');
    console.log('');
    
    // Compare with type-level
    const typeLevelSet = new Set(collections.enums.itemNames);
    const runtimeSet = new Set(runtimeEnums.itemNames);
    const onlyInTypeLevel = collections.enums.itemNames.filter(n => !runtimeSet.has(n));
    const onlyInRuntime = runtimeEnums.itemNames.filter(n => !typeLevelSet.has(n));
    
    if (onlyInTypeLevel.length === 0 && onlyInRuntime.length === 0) {
      logSuccess('  ✅ Type-level and runtime enums match perfectly');
    } else {
      if (onlyInTypeLevel.length > 0) {
        logWarning(`  ⚠️ Only in type-level: ${onlyInTypeLevel.join(', ')}`);
      }
      if (onlyInRuntime.length > 0) {
        logWarning(`  ⚠️ Only in runtime: ${onlyInRuntime.join(', ')}`);
      }
    }
  }
  
  // =====================================================
  // PHASE 9: Summary
  // =====================================================
  
  console.log('\n');
  logSeparator();
  logInfo('PROCESSING SUMMARY');
  logSeparator();
  console.log('');
  
  // Count files by status
  const newFiles = tableResults.filter(r => !r.exists).length;
  const existingFiles = tableResults.filter(r => r.exists).length;
  
  logInfo(`Tables: ${collections.tables.itemCount} total`);
  logInfo(`  ✨ New type files to create: ${newFiles}`);
  logInfo(`  📁 Existing type files: ${existingFiles}`);
  logInfo(`  🏛️ Deity groups represented: ${new Set(tableResults.map(r => r.deityGroup)).size}`);
  logInfo(`  📋 Handling levels: ${Object.keys(byHandlingLevel).join(', ')}`);
  
  console.log('\n');
  logSeparator();
  logSuccess('FOUNDATION PHASES COMPLETE');
  logInfo('Ready for:');
  logInfo('  📄 Phase 10 - Constants Generation');
  logInfo('  📄 Phase 11 - Type File Generation');
  logInfo('  📄 Phase 12 - Utility Generation');
  logInfo('  📄 Phase 13 - API Generation');
  logInfo('  📄 Phase 14 - Hook Generation');
  logSeparator();
  console.log('\n');

  // =====================================================
  // PHASE 10: Generate Constants and Type Files
  // =====================================================
  
  console.log('\n');
  logInfo('PHASE 10: Generating Constants and Type Files');
  logSeparator('─', 40);
  console.log('\n');
    
  // Ask user if they want to write files
  const readline = require('readline').createInterface({ input: process.stdin, output: process.stdout });
  const shouldWrite = await new Promise<boolean>((resolve) => {
    readline.question('Write files to disk? (y/N): ', (answer: string) => {
      readline.close();
      resolve(answer.toLowerCase() === 'y');
    });
  });
  
  if (!shouldWrite) {
    logInfo('Skipping file generation. Run again with "y" to write files.');
  } else {
    logInfo('Starting file generation...');
    console.log('');
    
    // Parse runtime enums
    let runtimeEnums = new Map<string, string[]>();
    if (completeMarkers.constantsEnumsLine !== -1 && completeMarkers.constantsEnumsEndLine !== -1) {
      const constantsEnumsStartIdx = completeMarkers.constantsEnumsLine - 1;
      const constantsEnumsEndIdx = completeMarkers.constantsEnumsEndLine - 1;
      const constantsEnumsLines = lines.slice(constantsEnumsStartIdx, constantsEnumsEndIdx + 1);
      const constantsEnumsContent = constantsEnumsLines.join('\n');
      
      const regex = /^\s{6}(\w+):\s*\[([\s\S]*?)\],/gm;
      let match;
      while ((match = regex.exec(constantsEnumsContent)) !== null) {
        const enumName = match[1];
        const valuesString = match[2];
        const values = valuesString
          .split(',')
          .map(v => v.trim().replace(/^["']|["']$/g, ''))
          .filter(v => v.length > 0);
        if (values.length > 0) {
          runtimeEnums.set(enumName, values);
        }
      }
      logSuccess(`Loaded ${runtimeEnums.size} runtime enums`);
    }
    
    // Track which enums we've generated
    const generatedConstants = new Map<string, { values: string[]; folder: string }>();
    
    // Process ALL tables (or a subset for testing)
    const tablesToProcess = collections.tables.itemNames; // All tables
    // const tablesToProcess = ['profiles', 'products', 'posts']; // For testing
    
    logInfo(`Processing ${tablesToProcess.length} tables...`);
    console.log('');
    
    let typesGenerated = 0;
    let constantsGenerated = 0;
    
    for (const tableName of tablesToProcess) {
      const folder = getFolderNameForTable(tableName) || 'hestia-core';
      const category = getTableCategory(tableName);
      
      // Extract table content
      const tableContent = extractObject(
        lines,
        completeMarkers.tablesLine,
        completeMarkers.tablesEndLine,
        tableName,
        { verbose: false }
      );
      
      if (!tableContent) {
        logWarning(`Could not extract table: ${tableName}`);
        continue;
      }
      
      // Parse and format the type file
      const parsed = {
        name: tableName,
        content: tableContent.content,
        startLine: tableContent.startLine,
        endLine: tableContent.endLine,
        type: 'table' as const,
        rowContent: undefined,
        insertContent: undefined,
        updateContent: undefined,
        enumRefs: undefined,
        hasJson: undefined
      };
      
      const formatted = formatObjectTypes(parsed, category, {
        deityGroup: folder,
        outputFolder: folder,
        verbose: false
      });
      
      // Write type file
      const typeResult = await generateSingleTypeFile(tableName, formatted, folder, {
        verbose: false,
        dryRun: true,
        askForApproval: false,
        forceOverwrite: false
      });
      if (typeResult.action === 'dryrun') {
        logInfo(`  Would create/update: ${folder}/${tableName}.ts`);
      }
      if (typeResult.success && typeResult.action !== 'skipped') {
        typesGenerated++;
        if (typeResult.action === 'created') {
          logSuccess(`  Created type: ${folder}/${tableName}.ts`);
        } else if (typeResult.action === 'updated') {
          logWarning(`  Updated type: ${folder}/${tableName}.ts`);
        }
      }
      
      // Find enum references to generate constants
      const enumPattern = /Database\["public"\]\["Enums"\]\["(\w+)"\]/g;
      let match;
      while ((match = enumPattern.exec(tableContent.content)) !== null) {
        const enumName = match[1];
        if (!generatedConstants.has(enumName)) {
          const enumValues = runtimeEnums.get(enumName);
          if (enumValues) {
            const enumFolder = getEnumFolder(enumName);
            generatedConstants.set(enumName, { values: enumValues, folder: enumFolder });
          }
        }
      }
    }
    
    // Generate all pending constants
    logInfo(`\nGenerating ${generatedConstants.size} constant files...`);
    
    for (const [enumName, { values, folder }] of generatedConstants) {
      const constResult = await generateConstantFile(enumName, values, folder, {
        verbose: false,
        dryRun: true,
        askForApproval: false,
        forceOverwrite: false
      });
      
      if (constResult.success && constResult.action !== 'skipped') {
        constantsGenerated++;
        if (constResult.action === 'created') {
          logSuccess(`  Created constant: ${folder}/${enumName}.ts`);
        } else if (constResult.action === 'updated') {
          logWarning(`  Updated constant: ${folder}/${enumName}.ts`);
        }
      }
    }
    
    // Summary
    console.log('\n');
    logSeparator();
    logInfo('GENERATION SUMMARY');
    logSeparator();
    logSuccess(`Type files generated: ${typesGenerated}`);
    logSuccess(`Constant files generated: ${constantsGenerated}`);
    logInfo(`Total tables processed: ${tablesToProcess.length}`);
  }

  // =====================================================
  // PHASE 11: Generate Validator Files
  // =====================================================
  
  console.log('\n');
  logInfo('PHASE 11: Generating Validator Files');
  logSeparator('─', 40);
  console.log('\n');
    
  // Collect tables that need validators (full_crud tables)
  const validatorTables: Array<{ name: string; content: string }> = [];
  
  // Process full_crud tables first
const tablesNeedingValidators = tableResults
  .filter(r => needsValidatorGeneration(r.name))
  .map(r => r.name);
  
  logInfo(`Processing ${tablesNeedingValidators.length} full_crud tables for validators...`);
  
  for (const tableName of tablesNeedingValidators) {
    const tableContent = extractObject(
      lines,
      completeMarkers.tablesLine,
      completeMarkers.tablesEndLine,
      tableName,
      { verbose: false }
    );
    
    if (tableContent) {
      validatorTables.push({
        name: tableName,
        content: tableContent.content
      });
    }
  }
  
  const validatorResult = await generateValidatorsForTables(validatorTables, {
    verbose: true,
    dryRun: !shouldWrite,
    forceOverwrite: false
  });
  
  logInfo(`Validators processed: ${validatorTables.length} tables`);

  /*// =====================================================
  // PHASE 12: Generate Index Files
  // =====================================================
  
  console.log('\n');
  logInfo('PHASE 12: Generating Index Files');
  logSeparator('─', 40);
  console.log('\n');
    
  const indexResult = await generateIndexesForPaths(
    [
      '@/lib/constants',
      '@/types',
      '@/utils'
    ],
    { verbose: true, dryRun: !shouldWrite }
  );
  
  logSeparator('─', 40);
  logInfo('INDEX GENERATION SUMMARY');
  logSeparator('─', 40);
  logSuccess(`Created: ${indexResult.created}`);
  logSuccess(`Updated: ${indexResult.updated}`);
  logInfo(`Skipped: ${indexResult.skipped}`);
  if (indexResult.errors.length > 0) {
    logError(`Errors: ${indexResult.errors.length}`);
  } */

  // =====================================================
  // PHASE 13: Generate API Routes (Limited to 10)
  // =====================================================
  
  console.log('\n');
  logInfo('PHASE 13: Generating API Routes');
  logSeparator('─', 40);
  console.log('\n');
    
  // Build API list from table results (limit to 10 for verification)
  const apiTables = tableResults
    .filter(r => ['full_crud', 'assessment', 'join_table'].includes(r.handlingLevel))
    .slice(0, 10)  // ← LIMIT TO 10 TABLES
    .map(r => {
      const config = getWorkflowConfig(r.name);
      return {
        name: r.name,
        hasGetList: config.generateApiGetList,
        hasGetSingle: config.generateApiGetSingle,
        hasPost: config.generateApiPost,
        hasPut: config.generateApiPut,
        hasDelete: config.generateApiDelete,
        specialRoutes: config.generateApiSpecial || []
      };
    });
  
  logInfo(`Generating API routes for ${apiTables.length} tables (limited to 10 for verification)`);
  
  const apiResult = await generateApiRoutesForTables(apiTables, {
    verbose: true,
    dryRun: !shouldWrite,
    forceOverwrite: false
  });
  
  logInfo(`API routes processed for ${apiTables.length} tables`); 

}


// Run the main function
main().catch((error) => {
  logError(`Fatal error: ${error.message}`);
  process.exit(1);
});