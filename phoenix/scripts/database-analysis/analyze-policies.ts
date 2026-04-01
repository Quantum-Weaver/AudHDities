import fs from 'fs';
import path from 'path';

const POLICIES_DIR = 'janus/policies';

interface PolicyInfo {
  name: string;
  table: string;
  operation: string;
  file: string;
  lineNumber: number;
}

function analyzePolicies() {
  console.log('\n🏛️ POLICY ANALYSIS\n');
  console.log('=' .repeat(60));

  const allPolicies: PolicyInfo[] = [];
  const allTables: string[] = [];
  const filesProcessed: string[] = [];

  // Check if directory exists
  if (!fs.existsSync(POLICIES_DIR)) {
    console.error(`❌ Directory not found: ${POLICIES_DIR}`);
    return;
  }

  // Get all SQL files
  const files = fs.readdirSync(POLICIES_DIR);

  for (const file of files) {
    if (!file.endsWith('.sql')) continue;

    const filePath = path.join(POLICIES_DIR, file);
    filesProcessed.push(file);
    const content = fs.readFileSync(filePath, 'utf-8');
    const lines = content.split('\n');

    // Find all RLS enable statements
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];
      const rlsMatch = line.match(/ALTER\s+TABLE\s+([a-zA-Z_][a-zA-Z0-9_]*)\s+ENABLE\s+ROW\s+LEVEL\s+SECURITY/i);
      if (rlsMatch) {
        allTables.push(rlsMatch[1].toLowerCase());
      }
    }

    // Find all CREATE POLICY statements - simpler: just search the whole content
    // Pattern: CREATE POLICY "name" ON table
    const policyRegex = /CREATE\s+POLICY\s+"?([a-zA-Z_][a-zA-Z0-9_]*)"?\s+ON\s+([a-zA-Z_][a-zA-Z0-9_]*)/gi;
    let match;
    
    while ((match = policyRegex.exec(content)) !== null) {
      const policyName = match[1].toLowerCase();
      const tableName = match[2].toLowerCase();
      
      // Find the line number where this policy starts
      const beforeMatch = content.substring(0, match.index);
      const lineNumber = beforeMatch.split('\n').length;
      
      // Determine operation type (look for FOR SELECT, FOR INSERT, etc. after the policy)
      const afterMatch = content.substring(match.index);
      const opMatch = afterMatch.match(/FOR\s+(SELECT|INSERT|UPDATE|DELETE|ALL)/i);
      const operation = opMatch ? opMatch[1].toUpperCase() : 'ALL';
      
      allPolicies.push({
        name: policyName,
        table: tableName,
        operation: operation,
        file: file,
        lineNumber: lineNumber,
      });
    }
  }

  // Get unique tables with RLS
  const tablesWithRLS = new Set(allTables);

  // Group policies by table
  const policiesByTable = new Map<string, PolicyInfo[]>();
  for (const p of allPolicies) {
    if (!policiesByTable.has(p.table)) policiesByTable.set(p.table, []);
    policiesByTable.get(p.table)!.push(p);
  }

  // Output results
  console.log(`\n📁 Files scanned: ${filesProcessed.length}`);
  console.log(`📊 Policies found: ${allPolicies.length}`);
  console.log(`📊 Tables with RLS enabled: ${tablesWithRLS.size}\n`);

  // List all policies by table
  console.log('📋 POLICIES BY TABLE:\n');
  for (const [table, policies] of Array.from(policiesByTable.entries()).sort()) {
    const hasRLS = tablesWithRLS.has(table) ? '✅ RLS ON' : '⚠️ RLS OFF';
    console.log(`  📌 ${table} (${hasRLS}):`);
    for (const p of policies) {
      console.log(`      🔒 ${p.name} (${p.operation}) - ${p.file}:${p.lineNumber}`);
    }
    console.log('');
  }

  // Find tables with RLS but no policies
  const tablesWithRLSOnly = Array.from(tablesWithRLS).filter(t => !policiesByTable.has(t));
  if (tablesWithRLSOnly.length > 0) {
    console.log('=' .repeat(60));
    console.log('⚠️ TABLES WITH RLS BUT NO POLICIES\n');
    for (const table of tablesWithRLSOnly) {
      console.log(`  📌 ${table} has RLS enabled but no policies defined`);
    }
    console.log('');
  }

  // Find policies for tables without RLS
  const policiesWithoutRLS = Array.from(policiesByTable.entries())
    .filter(([table, _]) => !tablesWithRLS.has(table));
  
  if (policiesWithoutRLS.length > 0) {
    console.log('=' .repeat(60));
    console.log('⚠️ POLICIES ON TABLES WITHOUT RLS (will fail)\n');
    for (const [table, policies] of policiesWithoutRLS) {
      console.log(`  📌 ${table} has ${policies.length} policies but RLS is not enabled`);
      for (const p of policies) {
        console.log(`      ${p.name} (${p.operation}) - ${p.file}`);
      }
      console.log('');
    }
  }

  // Check for tables with neither RLS nor policies (in the policy files)
  const allTablesInPolicies = new Set(policiesByTable.keys());
  const tablesWithNeither = Array.from(allTablesInPolicies).filter(t => !tablesWithRLS.has(t));
  if (tablesWithNeither.length > 0) {
    console.log('=' .repeat(60));
    console.log('⚠️ TABLES WITH POLICIES BUT NO RLS (already shown above)\n');
  }

  // Summary
  console.log('=' .repeat(60));
  console.log('📊 SUMMARY\n');
  console.log(`  Files scanned: ${filesProcessed.length}`);
  console.log(`  Total policies: ${allPolicies.length}`);
  console.log(`  Tables with RLS: ${tablesWithRLS.size}`);
  console.log(`  Tables with policies: ${policiesByTable.size}`);
  console.log(`  Tables with RLS only (no policies): ${tablesWithRLSOnly.length}`);
  console.log(`  Tables with policies only (no RLS): ${policiesWithoutRLS.length}`);

  // Save report
  const report = {
    timestamp: new Date().toISOString(),
    filesScanned: filesProcessed,
    totalPolicies: allPolicies.length,
    tablesWithRLS: Array.from(tablesWithRLS),
    policiesByTable: Array.from(policiesByTable.entries()).map(([table, policies]) => ({
      table,
      rlsEnabled: tablesWithRLS.has(table),
      policies: policies.map(p => ({ name: p.name, operation: p.operation, file: p.file, line: p.lineNumber })),
    })),
    tablesWithRLSOnly: tablesWithRLSOnly,
    policiesWithoutRLS: policiesWithoutRLS.map(([table, policies]) => ({
      table,
      policies: policies.map(p => ({ name: p.name, operation: p.operation, file: p.file })),
    })),
  };

  fs.writeFileSync('policy-report.json', JSON.stringify(report, null, 2));
  console.log('\n💾 Report saved to policy-report.json');
}

analyzePolicies();