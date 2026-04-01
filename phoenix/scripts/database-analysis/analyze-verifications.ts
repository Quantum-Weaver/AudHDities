import fs from 'fs';
import path from 'path';

const VERIFICATIONS_DIR = 'janus/verifications';

interface VerificationQuery {
  type: 'SELECT' | 'COUNT' | 'SHOW' | 'OTHER';
  target: string;
  fullQuery: string;
  file: string;
  lineNumber: number;
}

function analyzeVerifications() {
  console.log('\n🏛️ VERIFICATION ANALYSIS\n');
  console.log('=' .repeat(60));

  const allQueries: VerificationQuery[] = [];
  const filesProcessed: string[] = [];

  // Check if directory exists
  if (!fs.existsSync(VERIFICATIONS_DIR)) {
    console.error(`❌ Directory not found: ${VERIFICATIONS_DIR}`);
    return;
  }

  // Get all SQL files
  const files = fs.readdirSync(VERIFICATIONS_DIR);

  for (const file of files) {
    if (!file.endsWith('.sql')) continue;

    const filePath = path.join(VERIFICATIONS_DIR, file);
    filesProcessed.push(file);
    const content = fs.readFileSync(filePath, 'utf-8');
    const lines = content.split('\n');

    // Build full content for multi-line matching
    const fullContent = content;

    // Find all SELECT statements (verification queries)
    const selectPattern = /SELECT\s+(?:.+?)\s+FROM\s+([a-zA-Z_][a-zA-Z0-9_\.]*)/gi;
    let match: RegExpExecArray | null;
    
    // We need to find each SELECT statement's start position
    // Simpler: split by semicolons and analyze each statement
    const statements = fullContent.split(';');
    let currentLine = 0;
    
    for (let stmtIdx = 0; stmtIdx < statements.length; stmtIdx++) {
      const stmt = statements[stmtIdx].trim();
      if (!stmt) continue;
      
      // Find the line number for this statement
      const stmtStartPos = fullContent.indexOf(stmt, currentLine);
      const lineNumber = fullContent.substring(0, stmtStartPos).split('\n').length;
      currentLine = stmtStartPos + stmt.length;
      
      const upperStmt = stmt.toUpperCase();
      
      // Determine query type
      let type: 'SELECT' | 'COUNT' | 'SHOW' | 'OTHER' = 'OTHER';
      if (upperStmt.startsWith('SELECT')) {
        type = 'SELECT';
      } else if (upperStmt.startsWith('SHOW')) {
        type = 'SHOW';
      }
      
      // Extract target (table or view being queried)
      let target = 'unknown';
      
      // Look for FROM clause
      const fromMatch = stmt.match(/FROM\s+([a-zA-Z_][a-zA-Z0-9_\.]*)/i);
      if (fromMatch) {
        target = fromMatch[1].toLowerCase();
      }
      
      // Look for IN clause (for SHOW or SELECT with IN)
      const inMatch = stmt.match(/IN\s*\(\s*['"]?([a-zA-Z_][a-zA-Z0-9_\.]*)['"]?/i);
      if (inMatch && target === 'unknown') {
        target = inMatch[1].toLowerCase();
      }
      
      allQueries.push({
        type: type,
        target: target,
        fullQuery: stmt.substring(0, 200) + (stmt.length > 200 ? '...' : ''),
        file: file,
        lineNumber: lineNumber,
      });
    }
  }

  // Output results
  console.log(`\n📁 Files scanned: ${filesProcessed.length}`);
  console.log(`📊 Verification queries found: ${allQueries.length}\n`);

  // Group by target
  const byTarget = new Map<string, VerificationQuery[]>();
  for (const q of allQueries) {
    if (!byTarget.has(q.target)) byTarget.set(q.target, []);
    byTarget.get(q.target)!.push(q);
  }

  // List all queries by target
  console.log('📋 VERIFICATION QUERIES BY TARGET:\n');
  for (const [target, queries] of Array.from(byTarget.entries()).sort()) {
    console.log(`  📌 ${target}:`);
    for (const q of queries) {
      console.log(`      ${q.type} - ${q.file}:${q.lineNumber}`);
      console.log(`         ${q.fullQuery}`);
    }
    console.log('');
  }

  // Expected core tables to verify
  const expectedTables = [
    // Gamification
    'quests', 'user_quests', 'badges', 'user_badges', 
    'learning_paths', 'lessons', 'progress', 'life_cycles',
    // Infrastructure
    'file_registry', 'file_type_standards', 'settings',
    'scheduling', 'calendar', 'analytics', 'maintenance',
    // Social
    'posts', 'comments', 'reactions', 'messages', 'activity', 'emeralds', 'notifications',
    // Identity
    'profiles', 'user_private', 'user_financial', 'creator_profiles', 
    'vendor_profiles', 'community_profiles', 'channels',
    // Communications
    'contact_submissions', 'email_communications', 'localization', 'culuralization',
    // Assessment
    'acid_test_questions', 'acid_test_answers', 'acid_test_results',
    'taxonomy', 'ontology',
    // Economy
    'products', 'contributions', 'sales', 'residual_payouts', 'subscriptions',
    // Governance
    'reports', 'moderation_actions', 'applications', 'admin_logs', 'rate_limits',
  ];

  const coveredTables = new Set(byTarget.keys());
  const missingTables: string[] = [];

  for (const table of expectedTables) {
    if (!coveredTables.has(table)) {
      missingTables.push(table);
    }
  }

  // Check coverage
  console.log('=' .repeat(60));
  console.log('🔍 COVERAGE ANALYSIS\n');

  if (missingTables.length === 0) {
    console.log('✅ All expected tables have verification coverage.\n');
  } else {
    console.log(`⚠️ ${missingTables.length} table(s) missing verification queries:\n`);
    for (const table of missingTables) {
      console.log(`  📌 ${table}`);
    }
    console.log('\n  (Consider adding verification queries for these tables)\n');
  }

  // Check for duplicate queries (same target and similar content)
  console.log('=' .repeat(60));
  console.log('🔍 DUPLICATE VERIFICATION QUERIES\n');

  const duplicateMap = new Map<string, VerificationQuery[]>();
  for (const q of allQueries) {
    const key = `${q.target}|${q.type}`;
    if (!duplicateMap.has(key)) duplicateMap.set(key, []);
    duplicateMap.get(key)!.push(q);
  }

  const duplicates = Array.from(duplicateMap.entries())
    .filter(([, queries]) => queries.length > 1)
    .map(([key, queries]) => {
      const [target, type] = key.split('|');
      return { target, type, queries };
    });

  if (duplicates.length === 0) {
    console.log('✅ No duplicate verification patterns found.\n');
  } else {
    console.log(`⚠️ ${duplicates.length} target(s) have multiple verification queries:\n`);
    for (const dup of duplicates) {
      console.log(`  📌 ${dup.target} (${dup.type}):`);
      for (const q of dup.queries) {
        console.log(`      ${q.file}:${q.lineNumber}`);
      }
      console.log('');
    }
    console.log('  (Note: Multiple verifications may be intentional for different aspects)\n');
  }

  // Check for verification of enums
  console.log('=' .repeat(60));
  console.log('🔍 ENUM VERIFICATION\n');

  const enumVerifications = allQueries.filter(q => 
    q.fullQuery.toLowerCase().includes('pg_type') || 
    q.fullQuery.toLowerCase().includes('typname')
  );

  if (enumVerifications.length === 0) {
    console.log('⚠️ No enum verification queries found.\n');
  } else {
    console.log(`✅ Found ${enumVerifications.length} enum verification(s):\n`);
    for (const q of enumVerifications) {
      console.log(`  📌 ${q.file}:${q.lineNumber}`);
    }
    console.log('');
  }

  // Summary
  console.log('=' .repeat(60));
  console.log('📊 SUMMARY\n');
  console.log(`  Files scanned: ${filesProcessed.length}`);
  console.log(`  Total verification queries: ${allQueries.length}`);
  console.log(`  Unique targets: ${byTarget.size}`);
  console.log(`  Expected tables: ${expectedTables.length}`);
  console.log(`  Tables covered: ${coveredTables.size}`);
  console.log(`  Tables missing: ${missingTables.length}`);
  console.log(`  Duplicate patterns: ${duplicates.length}`);
  console.log(`  Enum verifications: ${enumVerifications.length}`);

  // Save report
  const report = {
    timestamp: new Date().toISOString(),
    filesScanned: filesProcessed,
    totalQueries: allQueries.length,
    byTarget: Array.from(byTarget.entries()).map(([target, queries]) => ({
      target,
      queries: queries.map(q => ({
        type: q.type,
        file: q.file,
        line: q.lineNumber,
        snippet: q.fullQuery,
      })),
    })),
    missingTables: missingTables,
    duplicates: duplicates.map(dup => ({
      target: dup.target,
      type: dup.type,
      files: dup.queries.map(q => ({ file: q.file, line: q.lineNumber })),
    })),
    enumVerifications: enumVerifications.map(q => ({ file: q.file, line: q.lineNumber })),
  };

  fs.writeFileSync('verification-report.json', JSON.stringify(report, null, 2));
  console.log('\n💾 Report saved to verification-report.json');
}

analyzeVerifications();