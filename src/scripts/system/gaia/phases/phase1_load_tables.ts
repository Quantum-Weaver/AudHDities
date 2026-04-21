// scripts/system/gaia/phases/phase1_load_tables.ts
// PHASE 1: Load tables to process based on target

import { getAllTableNames, DEITY_GROUPS } from '@/config/deity_groups.js';
import { logWarning } from '../../../shared/logger.js';
import type { GaiaOptions } from '../index.js';

export function phase1_loadTables(options: GaiaOptions): string[] {
  const allTableNames = getAllTableNames();
  const { target, targetValue } = options;
  
  if (target === 'table' && targetValue) {
    if (allTableNames.includes(targetValue)) {
      return [targetValue];
    }
    logWarning(`Table "${targetValue}" not found`);
    return [];
  }
  
  if (target === 'deity' && targetValue) {
    const deityGroup = DEITY_GROUPS.find(
      g => g.folderName === targetValue || g.name === targetValue
    );
    if (deityGroup) {
      return deityGroup.tables;
    }
    logWarning(`Deity "${targetValue}" not found`);
    return [];
  }
  
  return allTableNames;
}