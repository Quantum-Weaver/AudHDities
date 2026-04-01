import fs from 'fs';
import path from 'path';

const SCHEMAS_DIR = 'janus/schemas';

interface TableInfo {
  name: string;
  file: string;
  lineNumber: number;
  referencedTables: string[];
}

function analyzeSchemas() {
  console.log('\n🏛️ SCHEMA ANALYSIS\n');
  console.log('=' .repeat(60));

  const allTables: TableInfo[] = [];
  const filesProcessed: string[] = [];

  // Check if directory exists
  if (!fs.existsSync(SCHEMAS_DIR)) {
    console.error(`❌ Directory not found: ${SCHEMAS_DIR}`);
    return;
  }

  // Get all SQL files
  const files = fs.readdirSync(SCHEMAS_DIR);

  for (const file of files) {
    if (!file.endsWith('.sql')) continue;

    const filePath = path.join(SCHEMAS_DIR, file);
    filesProcessed.push(file);
    const content = fs.readFileSync(filePath, 'utf-8');
    const lines = content.split('\n');

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];
      
      // Look for CREATE TABLE statements
      const createMatch = line.match(/CREATE\s+TABLE\s+(?:IF NOT EXISTS\s+)?([a-zA-Z_][a-zA-Z0-9_]*)/i);
      if (createMatch) {
        const tableName = createMatch[1].toLowerCase();
        
        // Find references to other tables in the same statement
        const references: string[] = [];
        let j = i;
        let fullStmt = '';
        while (j < lines.length && !lines[j].trim().endsWith(';')) {
          fullStmt += lines[j] + ' ';
          j++;
        }
        fullStmt += lines[j];
        
        // Find all REFERENCES clauses
        const refMatches = fullStmt.matchAll(/REFERENCES\s+([a-zA-Z_][a-zA-Z0-9_]*)/gi);
        for (const ref of refMatches) {
          references.push(ref[1].toLowerCase());
        }
        
        allTables.push({
          name: tableName,
          file: file,
          lineNumber: i + 1,
          referencedTables: [...new Set(references)],
        });
      }
    }
  }

  // Output results
  console.log(`\n📁 Files scanned: ${filesProcessed.length}`);
  console.log(`📊 Tables found: ${allTables.length}\n`);

  // Group by name to find duplicates
  const tableMap = new Map<string, TableInfo[]>();
  for (const t of allTables) {
    if (!tableMap.has(t.name)) tableMap.set(t.name, []);
    tableMap.get(t.name)!.push(t);
  }

  // List all tables
  console.log('📋 ALL TABLES:\n');
  for (const [name, locations] of Array.from(tableMap.entries()).sort()) {
    console.log(`  📌 ${name}`);
    for (const loc of locations) {
      console.log(`      ${loc.file}:${loc.lineNumber}`);
    }
    console.log('');
  }

  // Check for duplicates
  const duplicates = Array.from(tableMap.entries()).filter(([_, locs]) => locs.length > 1);

  console.log('=' .repeat(60));
  console.log('🔍 DUPLICATES\n');

  if (duplicates.length === 0) {
    console.log('✅ No duplicate tables found.\n');
  } else {
    console.log(`⚠️ ${duplicates.length} table(s) defined in multiple files:\n`);
    for (const [name, locs] of duplicates) {
      console.log(`  📌 ${name} appears in ${locs.length} files:`);
      for (const loc of locs) {
        console.log(`      ${loc.file}:${loc.lineNumber}`);
      }
      console.log('');
    }
  }

  // Check for foreign key references to missing tables
  console.log('=' .repeat(60));
  console.log('🔍 FOREIGN KEY REFERENCES\n');

  const allTableNames = new Set(tableMap.keys());
  const missingRefs: { table: string; references: string[]; file: string }[] = [];

  for (const table of allTables) {
    const missing = table.referencedTables.filter(ref => !allTableNames.has(ref));
    if (missing.length > 0) {
      missingRefs.push({
        table: table.name,
        references: missing,
        file: table.file,
      });
    }
  }

  if (missingRefs.length === 0) {
    console.log('✅ All foreign key references resolved.\n');
  } else {
    console.log(`⚠️ ${missingRefs.length} table(s) reference missing tables:\n`);
    for (const ref of missingRefs) {
      console.log(`  📌 ${ref.table} references: ${ref.references.join(', ')}`);
      console.log(`      File: ${ref.file}\n`);
    }
  }

  // Summary
  console.log('=' .repeat(60));
  console.log('📊 SUMMARY\n');
  console.log(`  Files scanned: ${filesProcessed.length}`);
  console.log(`  Unique tables: ${tableMap.size}`);
  console.log(`  Duplicates: ${duplicates.length}`);
  console.log(`  Missing references: ${missingRefs.length}`);

  // Save report
  const report = {
    timestamp: new Date().toISOString(),
    filesScanned: filesProcessed,
    totalUniqueTables: tableMap.size,
    duplicates: duplicates.map(([name, locs]) => ({
      name,
      locations: locs.map(l => ({ file: l.file, line: l.lineNumber })),
    })),
    missingReferences: missingRefs,
    allTables: Array.from(tableMap.keys()).sort(),
  };

  fs.writeFileSync('schema-report.json', JSON.stringify(report, null, 2));
  console.log('\n💾 Report saved to schema-report.json');
}

analyzeSchemas();