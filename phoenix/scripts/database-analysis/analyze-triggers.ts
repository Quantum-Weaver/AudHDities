import fs from 'fs';
import path from 'path';

const TRIGGERS_DIR = 'janus/triggers';

interface TriggerInfo {
  name: string;
  table: string;
  event: string;
  timing: string;
  functionName: string;
  file: string;
  lineNumber: number;
}

interface FunctionInfo {
  name: string;
  returns: string;
  language: string;
  file: string;
  lineNumber: number;
}

function analyzeTriggers() {
  console.log('\n🏛️ TRIGGER ANALYSIS\n');
  console.log('=' .repeat(60));

  const allTriggers: TriggerInfo[] = [];
  const allFunctions: FunctionInfo[] = [];
  const filesProcessed: string[] = [];

  // Check if directory exists
  if (!fs.existsSync(TRIGGERS_DIR)) {
    console.error(`❌ Directory not found: ${TRIGGERS_DIR}`);
    return;
  }

  // Get all SQL files
  const files = fs.readdirSync(TRIGGERS_DIR);

  for (const file of files) {
    if (!file.endsWith('.sql')) continue;

    const filePath = path.join(TRIGGERS_DIR, file);
    filesProcessed.push(file);
    const content = fs.readFileSync(filePath, 'utf-8');
    const lines = content.split('\n');

    // Build full content for multi-line matching
    const fullContent = content;

    // =====================================================
    // FIND ALL FUNCTIONS
    // =====================================================
    
    // Pattern 1: CREATE OR REPLACE FUNCTION name
    const funcPattern1 = /CREATE\s+OR\s+REPLACE\s+FUNCTION\s+([a-zA-Z_][a-zA-Z0-9_]*)/gi;
    let match1: RegExpExecArray | null;
    while ((match1 = funcPattern1.exec(fullContent)) !== null) {
      const beforeMatch = fullContent.substring(0, match1.index);
      const lineNumber = beforeMatch.split('\n').length;
      
      const functionName = match1[1].toLowerCase();
      
      // Try to find RETURNS and LANGUAGE after this function
      const afterMatch = fullContent.substring(match1.index);
      let returns = 'unknown';
      let language = 'unknown';
      
      const returnsMatch = afterMatch.match(/RETURNS\s+([a-zA-Z_][a-zA-Z0-9_]*)/i);
      if (returnsMatch) returns = returnsMatch[1].toLowerCase();
      
      const langMatch = afterMatch.match(/LANGUAGE\s+([a-zA-Z_][a-zA-Z0-9_]*)/i);
      if (langMatch) language = langMatch[1].toLowerCase();
      
      // Avoid duplicates (same function in same file)
      const existing = allFunctions.find(f => f.name === functionName && f.file === file);
      if (!existing) {
        allFunctions.push({
          name: functionName,
          returns: returns,
          language: language,
          file: file,
          lineNumber: lineNumber,
        });
      }
    }

    // Pattern 2: CREATE FUNCTION name (without OR REPLACE)
    const funcPattern2 = /CREATE\s+FUNCTION\s+([a-zA-Z_][a-zA-Z0-9_]*)/gi;
    let match2: RegExpExecArray | null;
    while ((match2 = funcPattern2.exec(fullContent)) !== null) {
      const beforeMatch = fullContent.substring(0, match2.index);
      const lineNumber = beforeMatch.split('\n').length;
      
      const functionName = match2[1].toLowerCase();
      
      // Try to find RETURNS and LANGUAGE after this function
      const afterMatch = fullContent.substring(match2.index);
      let returns = 'unknown';
      let language = 'unknown';
      
      const returnsMatch = afterMatch.match(/RETURNS\s+([a-zA-Z_][a-zA-Z0-9_]*)/i);
      if (returnsMatch) returns = returnsMatch[1].toLowerCase();
      
      const langMatch = afterMatch.match(/LANGUAGE\s+([a-zA-Z_][a-zA-Z0-9_]*)/i);
      if (langMatch) language = langMatch[1].toLowerCase();
      
      // Avoid duplicates (same function in same file)
      const existing = allFunctions.find(f => f.name === functionName && f.file === file);
      if (!existing) {
        allFunctions.push({
          name: functionName,
          returns: returns,
          language: language,
          file: file,
          lineNumber: lineNumber,
        });
      }
    }

    // =====================================================
    // FIND ALL TRIGGERS
    // =====================================================
    
    const triggerPattern = /CREATE\s+TRIGGER\s+([a-zA-Z_][a-zA-Z0-9_]*)\s+(BEFORE|AFTER|INSTEAD\s+OF)\s+([A-Z\s]+)\s+ON\s+([a-zA-Z_][a-zA-Z0-9_]*)\s+FOR\s+EACH\s+ROW\s+EXECUTE\s+FUNCTION\s+([a-zA-Z_][a-zA-Z0-9_]*)/gi;
    
    let triggerMatch: RegExpExecArray | null;
    while ((triggerMatch = triggerPattern.exec(fullContent)) !== null) {
      const beforeMatch = fullContent.substring(0, triggerMatch.index);
      const lineNumber = beforeMatch.split('\n').length;
      
      // Clean up the event (remove extra spaces)
      let event = triggerMatch[3].toLowerCase().trim();
      
      allTriggers.push({
        name: triggerMatch[1].toLowerCase(),
        timing: triggerMatch[2].toUpperCase().replace('INSTEAD OF', 'INSTEAD OF'),
        event: event,
        table: triggerMatch[4].toLowerCase(),
        functionName: triggerMatch[5].toLowerCase(),
        file: file,
        lineNumber: lineNumber,
      });
    }
  }

  // Deduplicate triggers (same name, same table, same file)
  const uniqueTriggers: TriggerInfo[] = [];
  const triggerKeySet = new Set<string>();
  for (const t of allTriggers) {
    const key = `${t.name}@${t.table}@${t.file}`;
    if (!triggerKeySet.has(key)) {
      triggerKeySet.add(key);
      uniqueTriggers.push(t);
    }
  }

  // Deduplicate functions (same name, same file)
  const uniqueFunctions: FunctionInfo[] = [];
  const funcKeySet = new Set<string>();
  for (const f of allFunctions) {
    const key = `${f.name}@${f.file}`;
    if (!funcKeySet.has(key)) {
      funcKeySet.add(key);
      uniqueFunctions.push(f);
    }
  }

  // Output results
  console.log(`\n📁 Files scanned: ${filesProcessed.length}`);
  console.log(`📊 Functions found: ${uniqueFunctions.length}`);
  console.log(`📊 Triggers found: ${uniqueTriggers.length}\n`);

  // List all functions
  if (uniqueFunctions.length > 0) {
    console.log('📋 FUNCTIONS:\n');
    for (const func of uniqueFunctions) {
      console.log(`  🔧 ${func.name} (returns ${func.returns}, ${func.language}) - ${func.file}:${func.lineNumber}`);
    }
    console.log('');
  } else {
    console.log('⚠️ No functions found! Check regex patterns.\n');
  }

  // Group triggers by table
  const triggersByTable = new Map<string, TriggerInfo[]>();
  for (const t of uniqueTriggers) {
    if (!triggersByTable.has(t.table)) triggersByTable.set(t.table, []);
    triggersByTable.get(t.table)!.push(t);
  }

  // List all triggers by table
  console.log('📋 TRIGGERS BY TABLE:\n');
  for (const [table, triggers] of Array.from(triggersByTable.entries()).sort()) {
    console.log(`  📌 ${table}:`);
    for (const t of triggers) {
      console.log(`      ⚡ ${t.name} (${t.timing} ${t.event}) → ${t.functionName} - ${t.file}:${t.lineNumber}`);
    }
    console.log('');
  }

  // Find duplicate trigger names (same name, same table) across different files
  console.log('=' .repeat(60));
  console.log('🔍 DUPLICATE TRIGGER NAMES (same table, different files)\n');

  const triggerNameMap = new Map<string, TriggerInfo[]>();
  for (const t of uniqueTriggers) {
    const key = `${t.name}@${t.table}`;
    if (!triggerNameMap.has(key)) triggerNameMap.set(key, []);
    triggerNameMap.get(key)!.push(t);
  }

  const duplicates = Array.from(triggerNameMap.entries()).filter(([, locs]) => locs.length > 1);

  if (duplicates.length === 0) {
    console.log('✅ No duplicate triggers on same table across files.\n');
  } else {
    console.log(`⚠️ ${duplicates.length} trigger(s) defined multiple times on same table:\n`);
    for (const [key, locs] of duplicates) {
      const [name, table] = key.split('@');
      console.log(`  📌 ${name} on ${table} appears in ${locs.length} files:`);
      for (const loc of locs) {
        console.log(`      ${loc.file}:${loc.lineNumber}`);
      }
      console.log('');
    }
  }

  // Find multiple triggers on same table/event
  console.log('=' .repeat(60));
  console.log('🔍 MULTIPLE TRIGGERS ON SAME TABLE/EVENT\n');

  const tableEventMap = new Map<string, TriggerInfo[]>();
  for (const t of uniqueTriggers) {
    const key = `${t.table}|${t.timing}|${t.event}`;
    if (!tableEventMap.has(key)) tableEventMap.set(key, []);
    tableEventMap.get(key)!.push(t);
  }

  const multipleTriggers = Array.from(tableEventMap.entries())
    .filter(([, triggers]) => triggers.length > 1)
    .map(([key, triggers]) => {
      const [table, timing, event] = key.split('|');
      return { table, timing, event, triggers };
    });

  if (multipleTriggers.length === 0) {
    console.log('✅ No multiple triggers on same table/event.\n');
  } else {
    console.log(`⚠️ ${multipleTriggers.length} table(s) have multiple triggers on same event:\n`);
    for (const mt of multipleTriggers) {
      console.log(`  📌 ${mt.table} - ${mt.timing} ${mt.event}:`);
      for (const t of mt.triggers) {
        console.log(`      ${t.name} → ${t.functionName} (${t.file}:${t.lineNumber})`);
      }
      console.log('');
    }
    console.log('  (Note: Order of execution may be important)\n');
  }

  // Find functions that are never used by triggers
  console.log('=' .repeat(60));
  console.log('🔍 UNUSED FUNCTIONS\n');

  const usedFunctions = new Set(uniqueTriggers.map(t => t.functionName));
  const unusedFunctions = uniqueFunctions.filter(f => !usedFunctions.has(f.name));

  if (unusedFunctions.length === 0) {
    console.log('✅ All functions are used by at least one trigger.\n');
  } else {
    console.log(`⚠️ ${unusedFunctions.length} function(s) not used by any trigger:\n`);
    for (const func of unusedFunctions) {
      console.log(`  📌 ${func.name} (${func.file})`);
    }
    console.log('  (Note: May be called directly or from application code)\n');
  }

  // Summary
  console.log('=' .repeat(60));
  console.log('📊 SUMMARY\n');
  console.log(`  Files scanned: ${filesProcessed.length}`);
  console.log(`  Total functions: ${uniqueFunctions.length}`);
  console.log(`  Total triggers: ${uniqueTriggers.length}`);
  console.log(`  Tables with triggers: ${triggersByTable.size}`);
  console.log(`  Duplicate triggers (same table): ${duplicates.length}`);
  console.log(`  Multiple on same table/event: ${multipleTriggers.length}`);
  console.log(`  Unused functions: ${unusedFunctions.length}`);

  // Save report
  const report = {
    timestamp: new Date().toISOString(),
    filesScanned: filesProcessed,
    totalFunctions: uniqueFunctions.length,
    totalTriggers: uniqueTriggers.length,
    functions: uniqueFunctions,
    triggersByTable: Array.from(triggersByTable.entries()).map(([table, triggers]) => ({
      table,
      triggers: triggers.map(t => ({
        name: t.name,
        timing: t.timing,
        event: t.event,
        functionName: t.functionName,
        file: t.file,
        line: t.lineNumber,
      })),
    })),
    duplicates: duplicates.map(([key, locs]) => ({
      name: key.split('@')[0],
      table: key.split('@')[1],
      locations: locs.map(l => ({ file: l.file, line: l.lineNumber })),
    })),
    multipleTriggers: multipleTriggers.map(mt => ({
      table: mt.table,
      timing: mt.timing,
      event: mt.event,
      triggers: mt.triggers.map(t => ({ name: t.name, functionName: t.functionName, file: t.file, line: t.lineNumber })),
    })),
    unusedFunctions: unusedFunctions,
  };

  fs.writeFileSync('trigger-report.json', JSON.stringify(report, null, 2));
  console.log('\n💾 Report saved to trigger-report.json');
}

analyzeTriggers();