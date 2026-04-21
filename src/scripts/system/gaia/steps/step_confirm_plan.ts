// scripts/system/gaia/steps/step_confirm_plan.ts
// STEP: Show generation plan and confirm

import { logSeparator, logInfo, logWarning } from '../../../shared/logger.js';
import { getFolderNameForTable } from '@/config/deity_groups.js';
import * as readline from 'readline';

function askUser(question: string): Promise<string> {
  const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
  return new Promise((resolve) => {
    rl.question(question, (answer) => {
      rl.close();
      resolve(answer);
    });
  });
}

export async function step_confirmPlan(
  tablesToProcess: string[],
  runtimeEnums: Map<string, string[]>,
  options: any
): Promise<boolean> {
  const { verbose } = options;
  
  console.log('\n');
  logSeparator('═', 60);
  logInfo('📋 GENERATION PLAN');
  logSeparator('═', 60);
  console.log('');
  
  logInfo(`📊 TABLES: ${tablesToProcess.length}`);
  if (verbose) {
    const byDeity = new Map<string, number>();
    for (const table of tablesToProcess) {
      const deity = getFolderNameForTable(table) || 'hestia-core';
      byDeity.set(deity, (byDeity.get(deity) || 0) + 1);
    }
    for (const [deity, count] of byDeity) {
      console.log(`     ${deity}: ${count} tables`);
    }
  }
  console.log('');
  
  logInfo(`🔢 ENUMS: ${runtimeEnums.size}`);
  if (verbose && runtimeEnums.size > 0) {
    const first10 = Array.from(runtimeEnums.keys()).slice(0, 10);
    console.log(`     ${first10.join(', ')}${runtimeEnums.size > 10 ? '...' : ''}`);
  }
  console.log('');
  
  logSeparator('─', 40);
  console.log('');
  console.log('Options:');
  console.log(`  [c] Continue - proceed with generation`);
  console.log(`  [n] Cancel - exit without generating`);
  console.log(`  [o] Cancel with notes - save notes and exit`);
  console.log('');
  
  const response = await askUser('Choose (c/n/o): ');
  
  if (response.toLowerCase() === 'c') return true;
  if (response.toLowerCase() === 'o') {
    console.log('\n📝 Enter your notes (press Enter twice to finish):');
    const notes: string[] = [];
    while (true) {
      const line = await askUser('');
      if (line === '') break;
      notes.push(line);
    }
    if (notes.length > 0) {
      const fs = require('fs');
      const notesPath = `./gaia-notes-${Date.now()}.txt`;
      fs.writeFileSync(notesPath, notes.join('\n'));
      console.log(`Notes saved to: ${notesPath}`);
    }
  }
  
  console.log('\n❌ Generation cancelled.');
  process.exit(0);
  return false;
}