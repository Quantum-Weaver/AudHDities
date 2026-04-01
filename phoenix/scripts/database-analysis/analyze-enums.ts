import fs from 'fs';
import path from 'path';

const ENUMS_DIR = 'janus/enums';

interface EnumInfo {
  name: string;
  file: string;
  lineNumber: number;
}

function analyzeEnums() {
  console.log('\n🏛️ ENUM ANALYSIS\n');
  console.log('=' .repeat(60));

  const allEnums: EnumInfo[] = [];
  const filesProcessed: string[] = [];

  // Check if directory exists
  if (!fs.existsSync(ENUMS_DIR)) {
    console.error(`❌ Directory not found: ${ENUMS_DIR}`);
    return;
  }

  // Get all SQL files
  const files = fs.readdirSync(ENUMS_DIR);

  for (const file of files) {
    if (!file.endsWith('.sql')) continue;

    const filePath = path.join(ENUMS_DIR, file);
    filesProcessed.push(file);
    const content = fs.readFileSync(filePath, 'utf-8');
    const lines = content.split('\n');

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];
      
      // Look for CREATE TYPE ... AS ENUM
      const match = line.match(/CREATE\s+TYPE\s+([a-zA-Z_][a-zA-Z0-9_]*)/i);
      if (match) {
        allEnums.push({
          name: match[1].toLowerCase(),
          file: file,
          lineNumber: i + 1,
        });
      }
    }
  }

  // Output results
  console.log(`\n📁 Files scanned: ${filesProcessed.length}`);
  console.log(`📊 Enums found: ${allEnums.length}\n`);

  // Group by name to find duplicates
  const enumMap = new Map<string, EnumInfo[]>();
  for (const e of allEnums) {
    if (!enumMap.has(e.name)) enumMap.set(e.name, []);
    enumMap.get(e.name)!.push(e);
  }

  // List all enums
  console.log('📋 ALL ENUMS:\n');
  for (const [name, locations] of Array.from(enumMap.entries()).sort()) {
    console.log(`  📌 ${name}`);
    for (const loc of locations) {
      console.log(`      ${loc.file}:${loc.lineNumber}`);
    }
    console.log('');
  }

  // Check for duplicates
  const duplicates = Array.from(enumMap.entries()).filter(([_, locs]) => locs.length > 1);

  console.log('=' .repeat(60));
  console.log('🔍 DUPLICATES\n');

  if (duplicates.length === 0) {
    console.log('✅ No duplicate enums found.\n');
  } else {
    console.log(`⚠️ ${duplicates.length} enum(s) defined in multiple files:\n`);
    for (const [name, locs] of duplicates) {
      console.log(`  📌 ${name} appears in ${locs.length} files:`);
      for (const loc of locs) {
        console.log(`      ${loc.file}:${loc.lineNumber}`);
      }
      console.log('');
    }
  }

  // Summary
  console.log('=' .repeat(60));
  console.log('📊 SUMMARY\n');
  console.log(`  Files scanned: ${filesProcessed.length}`);
  console.log(`  Unique enums: ${enumMap.size}`);
  console.log(`  Duplicates: ${duplicates.length}`);

  // Save report
  const report = {
    timestamp: new Date().toISOString(),
    filesScanned: filesProcessed,
    totalUniqueEnums: enumMap.size,
    duplicates: duplicates.map(([name, locs]) => ({
      name,
      locations: locs.map(l => ({ file: l.file, line: l.lineNumber })),
    })),
    allEnums: Array.from(enumMap.keys()).sort(),
  };

  fs.writeFileSync('enum-report.json', JSON.stringify(report, null, 2));
  console.log('\n💾 Report saved to enum-report.json');
}

analyzeEnums();