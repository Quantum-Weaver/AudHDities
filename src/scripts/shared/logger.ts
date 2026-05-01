/* src/scripts/shared/logger.ts */
// Centralized logging utilities
// Single source for all console output across all modules

export const colors = {
  reset: '\x1b[0m',
  green: '\x1b[32m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  cyan: '\x1b[36m',
  magenta: '\x1b[35m',
  white: '\x1b[37m',
  gray: '\x1b[90m',
};

// =====================================================
// CORE LOGGING FUNCTIONS
// =====================================================

export function logSuccess(message: string): void {
  console.log(`${colors.green}✅ ${message}${colors.reset}`);
}

export function logError(message: string): void {
  console.log(`${colors.red}❌ ${message}${colors.reset}`);
}

export function logInfo(message: string): void {
  console.log(`${colors.blue}📌 ${message}${colors.reset}`);
}

export function logWarning(message: string): void {
  console.log(`${colors.yellow}⚠️ ${message}${colors.reset}`);
}

export function logStep(message: string): void {
  console.log(`${colors.cyan}${message}${colors.reset}`);
}

export function logDebug(message: string): void {
  console.log(`${colors.gray}🔍 ${message}${colors.reset}`);
}

export function logBom(message: string): void {
  console.log(`${colors.magenta}🔍 ${message}${colors.reset}`);
}

export function logSeparator(char: string = '─', length: number = 60): void {
  console.log(`${colors.yellow}${char.repeat(length)}${colors.reset}`);
}

export function logHeader(title: string): void {
  console.log('\n');
  logSeparator();
  logStep(title);
  logSeparator();
  console.log('\n');
}

export function logSubHeader(title: string): void {
  console.log('\n');
  logSeparator('─', 40);
  logInfo(title);
  logSeparator('─', 40);
  console.log('\n');
}

// =====================================================
// PROGRESS AND STATUS LOGGING
// =====================================================

export interface ProgressOptions {
  total: number;
  current: number;
  label?: string;
}

export function logProgress(options: ProgressOptions): void {
  const { total, current, label = 'Progress' } = options;
  const percent = Math.round((current / total) * 100);
  const barLength = 20;
  const filled = Math.round((percent / 100) * barLength);
  const empty = barLength - filled;
  const bar = '█'.repeat(filled) + '░'.repeat(empty);
  
  console.log(`${colors.cyan}${label}:${colors.reset} ${bar} ${percent}% (${current}/${total})`);
}

// =====================================================
// OBJECT DISPLAY HELPERS
// =====================================================

export function logObjectSummary(name: string, count: number, firstFew?: string[]): void {
  logSuccess(`${name}: ${count} items`);
  if (firstFew && firstFew.length > 0) {
    console.log(`   First ${firstFew.length}: ${firstFew.join(', ')}`);
  }
}

export function logLineRange(label: string, startLine: number, endLine: number): void {
  console.log(`   ${label}: lines ${startLine}-${endLine}`);
}

// =====================================================
// SECTION HEADERS
// =====================================================

export function logSectionStart(sectionName: string): void {
  console.log('\n');
  logSeparator('─', 50);
  logStep(`📁 SECTION: ${sectionName}`);
  logSeparator('─', 50);
  console.log('\n');
}

export function logSectionEnd(sectionName: string): void {
  console.log(`\n✅ ${sectionName} complete\n`);
}

// =====================================================
// FILE PREVIEW
// =====================================================

export function logFilePreview(fileName: string, content: string, maxLines: number = 30): void {
  console.log(`\n  Preview of ${fileName}:`);
  console.log('  ' + '─'.repeat(50));
  const lines = content.split('\n').slice(0, maxLines);
  for (const line of lines) {
    console.log(`  ${line}`);
  }
  if (content.split('\n').length > maxLines) {
    console.log('  ...');
  }
  console.log('  ' + '─'.repeat(50));
}