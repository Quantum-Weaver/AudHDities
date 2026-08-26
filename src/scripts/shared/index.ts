// src/scripts/shared/pause.ts
// ============================================================================
// ============================================================================
// ============================================================================

import * as readline from 'readline';
import { logInfo, logWarning, logError, logDebug } from './logger.js';

export interface PauseOptions {
  /** Custom prompt message */
  prompt?: string;
  /** Timeout in milliseconds (0 = no timeout) */
  timeoutMs?: number;
  /** Default action after timeout ('continue', 'stop', 'retry') */
  defaultAction?: 'continue' | 'stop' | 'retry';
  /** Whether to show phase summary before pause */
  showSummary?: boolean;
  /** Phase summary data to display */
  summaryData?: Record<string, unknown>;
  /** Whether to clear console before pause (for cleaner output) */
  clearConsole?: boolean;
}

export interface PauseResult {
  /** User's choice */
  action: 'continue' | 'stop' | 'retry' | 'timeout';
  /** Whether to continue execution */
  shouldContinue: boolean;
  /** Whether to retry the current phase */
  shouldRetry: boolean;
  /** Any additional notes from user */
  notes?: string;
}

/**
 * Create readline interface for user input
 */
function createReadline(): readline.Interface {
  return readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });
}

/**
 * Display a formatted phase summary
 */
function displaySummary(summaryData: Record<string, unknown>): void {
  console.log('\n  📊 Phase Summary:');
  for (const [key, value] of Object.entries(summaryData)) {
    const formattedKey = key.replace(/([A-Z])/g, ' $1').toLowerCase();
    console.log(`      ${formattedKey}: ${value}`);
  }
  console.log('');
}

/**
 * Prompt user with timeout support
 */
async function promptWithTimeout(
  rl: readline.Interface,
  question: string,
  timeoutMs: number = 0,
  defaultAnswer: string = ''
): Promise<string> {
  if (timeoutMs <= 0) {
    return new Promise((resolve) => {
      rl.question(question, (answer) => {
        resolve(answer || defaultAnswer);
      });
    });
  }
  
  return new Promise((resolve) => {
    let resolved = false;
    
    const timer = setTimeout(() => {
      if (!resolved) {
        resolved = true;
        console.log(`\n  ⏰ Timeout (${timeoutMs / 1000}s). Using default: ${defaultAnswer || 'continue'}`);
        resolve(defaultAnswer || 'continue');
        rl.close();
      }
    }, timeoutMs);
    
    rl.question(question, (answer) => {
      if (!resolved) {
        resolved = true;
        clearTimeout(timer);
        resolve(answer || defaultAnswer);
        rl.close();
      }
    });
  });
}

/**
 * Pause execution and wait for user input
 * 
 * @param phaseName - Name of the current phase
 * @param options - Pause configuration options
 * @returns Promise with user's decision
 */
export async function pauseForReview(
  phaseName: string,
  options: PauseOptions = {}
): Promise<PauseResult> {
  const {
    prompt = `Continue to next phase?`,
    timeoutMs = 0,
    defaultAction = 'continue',
    showSummary = false,
    summaryData = {},
    clearConsole = false
  } = options;
  
  if (clearConsole) {
    console.clear();
  }
  
  console.log('\n');
  logInfo(`⏸️  PAUSE: ${phaseName} Complete`);
  console.log('─'.repeat(50));
  
  if (showSummary && Object.keys(summaryData).length > 0) {
    displaySummary(summaryData);
  }
  
  console.log('\n  Options:');
  console.log('    [c] Continue - Proceed to next phase');
  console.log('    [s] Stop - Abort generation');
  console.log('    [r] Retry - Repeat this phase');
  console.log('    [n] Notes - Add notes before continuing');
  
  const rl = createReadline();
  const question = `\n  ${prompt} (c/s/r/n) [${defaultAction[0]}]: `;
  
  const answer = await promptWithTimeout(rl, question, timeoutMs, defaultAction[0]);
  
  let notes: string | undefined;
  let action: PauseResult['action'];
  
  switch (answer.toLowerCase().trim()) {
    case 's':
    case 'stop':
      action = 'stop';
      logWarning(`\n  Stopping at user request. Phase: ${phaseName}`);
      break;
    case 'r':
    case 'retry':
      action = 'retry';
      logInfo(`\n  Retrying phase: ${phaseName}`);
      break;
    case 'n':
    case 'notes':
      action = 'continue';
      const notesRl = createReadline();
      notes = await new Promise<string>((resolve) => {
        notesRl.question('\n  Enter notes (optional, press Enter to skip): ', (noteAnswer) => {
          notesRl.close();
          resolve(noteAnswer || '');
        });
      });
      if (notes) {
        logInfo(`  Notes saved: ${notes.substring(0, 100)}${notes.length > 100 ? '...' : ''}`);
      }
      break;
    case 'c':
    case 'continue':
    default:
      action = 'continue';
      logInfo('  Continuing...');
      break;
  }
  
  if (answer === '' && timeoutMs === 0) {
    action = 'continue';
  }
  
  console.log('─'.repeat(50));
  
  return {
    action,
    shouldContinue: action === 'continue',
    shouldRetry: action === 'retry',
    notes
  };
}

/**
 * Quick pause with simple yes/no confirmation
 * 
 * @param message - Confirmation message
 * @param defaultYes - Whether default is yes
 * @returns Promise<boolean> - True if confirmed
 */
export async function confirmAction(
  message: string,
  defaultYes: boolean = false
): Promise<boolean> {
  const rl = createReadline();
  const defaultText = defaultYes ? 'Y/n' : 'y/N';
  const question = `${message} (${defaultText}): `;
  
  const answer = await promptWithTimeout(rl, question, 0, defaultYes ? 'y' : 'n');
  rl.close();
  
  const normalized = answer.toLowerCase().trim();
  
  if (defaultYes) {
    return normalized !== 'n';
  }
  return normalized === 'y' || normalized === 'yes';
}

/**
 * Pause with automatic continuation after timeout (for automated runs)
 * 
 * @param phaseName - Name of the current phase
 * @param timeoutSeconds - Seconds to wait before auto-continue
 * @returns Promise<boolean> - True if continuing
 */
export async function autoPause(
  phaseName: string,
  timeoutSeconds: number = 5
): Promise<boolean> {
  console.log('\n');
  logInfo(`⏸️  PAUSE: ${phaseName} Complete`);
  console.log(`  Auto-continuing in ${timeoutSeconds} seconds...`);
  
  return new Promise((resolve) => {
    const timer = setTimeout(() => {
      console.log('  Continuing...');
      resolve(true);
    }, timeoutSeconds * 1000);
    
    // Allow early continue with Enter key
    const rl = createReadline();
    rl.question('  Press Enter to continue now...', () => {
      clearTimeout(timer);
      rl.close();
      resolve(true);
    });
  });
}

/**
 * Check if running in CI/automated environment
 */
export function isAutomatedEnvironment(): boolean {
  return process.env.CI === 'true' || 
         process.env.NODE_ENV === 'test' ||
         process.env.GITHUB_ACTIONS === 'true';
}

/**
 * Intelligent pause that adapts to environment
 */
export async function intelligentPause(
  phaseName: string,
  options: PauseOptions = {}
): Promise<PauseResult> {
  if (isAutomatedEnvironment()) {
    logDebug(`Auto-continuing phase: ${phaseName} (CI environment)`);
    return {
      action: 'continue',
      shouldContinue: true,
      shouldRetry: false
    };
  }
  
  return pauseForReview(phaseName, options);
}

export default {
  pauseForReview,
  confirmAction,
  autoPause,
  intelligentPause,
  isAutomatedEnvironment
};