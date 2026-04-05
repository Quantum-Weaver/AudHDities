// src/scripts/approve-staged.ts
import { approveAllStagedFiles, listStagedFiles } from '../modules/staging.js';
import { logHeader, logError, logSuccess, logInfo, logSeparator } from '../shared/logger.js';

async function main() {
  console.log('\n');
  logSeparator();
  logHeader('🏛️ APPROVE STAGED CHANGES');
  logSeparator();
  console.log('\n');
  
  const stagedFiles = listStagedFiles({ verbose: true });
  
  if (stagedFiles.length === 0) {
    logInfo('No staged files found.');
    return;
  }
  
  logInfo(`Found ${stagedFiles.length} staged files:`);
  for (const file of stagedFiles) {
    console.log(`  📁 ${file}`);
  }
  
  console.log('');
  const result = approveAllStagedFiles({ verbose: true });
  
  logSeparator();
  logSuccess(`Approved: ${result.approved}`);
  if (result.failed > 0) {
    logError(`Failed: ${result.failed}`);
  }
  logSeparator();
}

main();