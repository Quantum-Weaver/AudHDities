/* @/scripts/modules/format/formatObjectConstants.ts */
// Phase 4: Format Constants.Enums section into constant objects
// Uses deity-groups.ts config for folder mapping

import type { FormattedConstantContent, ExtractedObject } from '@/scripts/shared/types.js';
import { logSuccess, logError, logInfo, logDebug, logWarning } from '@/scripts/shared/logger.js';
import { DEITY_GROUPS } from '@/config/deity-groups.js';

export interface FormatObjectConstantsOptions {
  verbose?: boolean;
  includeTimestamps?: boolean;
  outputBase?: string;
}

// Create direct mapping from enum name to deity group based on tables
const enumToDeityMap = new Map<string, { deityName: string; domain: string; folderName: string }>();

// Build mapping: for each table in each deity group, associate related enums
for (const group of DEITY_GROUPS) {
  for (const table of group.tables) {
    // Common enum patterns that relate to this table
    const relatedEnums = [
      `${table}_type`,
      `${table}_status`, 
      `${table}_tier`,
      `${table}_category`,
      `${table}_visibility`,
      `${table}_role`
    ];
    
    for (const enumName of relatedEnums) {
      if (!enumToDeityMap.has(enumName)) {
        enumToDeityMap.set(enumName, {
          deityName: group.name,
          domain: group.domain,
          folderName: group.folderName
        });
      }
    }
  }
}

/**
 * Get deity group for an enum based on direct mapping
 */
export function getDeityGroupForEnum(enumName: string): { deityName: string; domain: string; folderName: string } {
  // Direct lookup in mapping
  if (enumToDeityMap.has(enumName)) {
    return enumToDeityMap.get(enumName)!;
  }
  
  // Fallback based on enum name patterns
  if (enumName.includes('user_') || enumName.includes('profile') || enumName.includes('creator') || enumName.includes('vendor')) {
    return { deityName: 'hestia', domain: 'core', folderName: 'hestia_core' };
  }
  if (enumName.includes('product') || enumName.includes('sale') || enumName.includes('payout') || enumName.includes('subscription')) {
    return { deityName: 'plutus', domain: 'economics', folderName: 'plutus_economics' };
  }
  if (enumName.includes('post') || enumName.includes('comment') || enumName.includes('emerald') || enumName.includes('notification')) {
    return { deityName: 'hermes', domain: 'social', folderName: 'hermes_social' };
  }
  if (enumName.includes('quest') || enumName.includes('badge') || enumName.includes('sovereignty')) {
    return { deityName: 'athena', domain: 'gamification', folderName: 'athena_gamification' };
  }
  if (enumName.includes('acid_') || enumName.includes('persona') || enumName.includes('taxonomy')) {
    return { deityName: 'mnemosyne', domain: 'assessment', folderName: 'mnemosyne_assessment' };
  }
  if (enumName.includes('report') || enumName.includes('moderation') || enumName.includes('admin_') || enumName.includes('application')) {
    return { deityName: 'themis', domain: 'governance', folderName: 'themis_governance' };
  }
  if (enumName.includes('language') || enumName.includes('translation') || enumName.includes('contact_')) {
    return { deityName: 'iris', domain: 'communications', folderName: 'iris_communications' };
  }
  if (enumName.includes('file_') || enumName.includes('script_') || enumName.includes('setting')) {
    return { deityName: 'hephaestus', domain: 'infrastructure', folderName: 'hephaestus_infrastructure' };
  }
  if (enumName.includes('connection') || enumName.includes('council_') || enumName.includes('consciousness')) {
    return { deityName: 'aethelred', domain: 'connections', folderName: 'aethelred_connections' };
  }
  
  // Default
  return { deityName: 'hestia', domain: 'core', folderName: 'hestia_core' };
}

/**
 * Format a single enum object into constant file content
 */
export function formatObjectConstants(
  enumObject: ExtractedObject,
  options: FormatObjectConstantsOptions = {}
): FormattedConstantContent {
  const {
    verbose = false,
    includeTimestamps = true,
    outputBase = 'src/lib/constants'
  } = options;
  
  const timestamp = new Date().toISOString();
  const enumName = enumObject.name;
  
  // Get deity group from config-based mapping
  const deity = getDeityGroupForEnum(enumName);
  
  // Parse values from enum content
  let values: string[] = [];
  const pipeMatch = enumObject.content.match(/: (.*)/);
  if (pipeMatch) {
    values = pipeMatch[1].split('|').map(v => v.trim().replace(/['"]/g, ''));
  }
  
  if (verbose) {
    logDebug(`Formatting enum: ${enumName}`);
    logDebug(`  Deity: ${deity.deityName}`);
    logDebug(`  Domain: ${deity.domain}`);
    logDebug(`  Folder: ${deity.folderName}`);
    logDebug(`  Values: ${values.length}`);
  }
  
  // Build header
  let header = `// =====================================================\n`;
  header += `// FILE: ${outputBase}/${deity.folderName}/${enumName}.ts\n`;
  header += `// DEITY: ${deity.deityName}\n`;
  header += `// DOMAIN: ${deity.domain}\n`;
  if (includeTimestamps) {
    header += `// GENERATED: ${timestamp}\n`;
  }
  header += `// SOURCE: Constants.public.Enums.${enumName}\n`;
  header += `// =====================================================\n\n`;
  
  // Build constant content
  const constName = enumName.toUpperCase();
  const constLines: string[] = [];
  constLines.push(`export const ${constName} = {`);
  
  for (const value of values) {
    const key = value.toUpperCase();
    constLines.push(`  ${key}: '${value}',`);
  }
  
  constLines.push(`} as const;`);
  constLines.push(``);
  
  const typeName = enumName
    .split('_')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join('');
  
  constLines.push(`export type ${typeName} = typeof ${constName}[keyof typeof ${constName}];`);
  
  const constantContent = constLines.join('\n');
  const fullContent = header + constantContent;
  
  if (verbose) {
    logSuccess(`Formatted constant for ${enumName} → ${deity.folderName}/${enumName}.ts`);
  }
  
  return {
    header,
    imports: [],
    constantObject: constantContent,
    typeExport: `export type ${typeName} = typeof ${constName}[keyof typeof ${constName}];`,
    fullContent
  };
}

/**
 * Format multiple enum objects at once
 */
export function formatMultipleObjectConstants(
  enumObjects: ExtractedObject[],
  options: FormatObjectConstantsOptions = {}
): Map<string, FormattedConstantContent> {
  const results = new Map<string, FormattedConstantContent>();
  
  for (const enumObject of enumObjects) {
    const formatted = formatObjectConstants(enumObject, options);
    results.set(enumObject.name, formatted);
  }
  
  return results;
}

/**
 * Group formatted constants by deity folder name
 */
export function groupConstantsByDeity(
  formattedMap: Map<string, FormattedConstantContent>
): Map<string, { deityName: string; domain: string; folderName: string; enums: string[] }> {
  const grouped = new Map<string, { deityName: string; domain: string; folderName: string; enums: string[] }>();
  
  for (const [enumName] of formattedMap) {
    const deity = getDeityGroupForEnum(enumName);
    const key = deity.folderName;
    
    if (!grouped.has(key)) {
      grouped.set(key, {
        deityName: deity.deityName,
        domain: deity.domain,
        folderName: deity.folderName,
        enums: []
      });
    }
    
    grouped.get(key)!.enums.push(enumName);
  }
  
  return grouped;
}

/**
 * Preview formatted constants for a single enum
 */
export function previewFormattedConstant(
  enumObject: ExtractedObject,
  options: FormatObjectConstantsOptions = {}
): void {
  const formatted = formatObjectConstants(enumObject, { ...options, verbose: false });
  
  console.log(`\n  Preview of ${enumObject.name} (${getDeityGroupForEnum(enumObject.name).folderName}):`);
  console.log('  ' + '─'.repeat(50));
  const lines = formatted.fullContent.split('\n').slice(0, 20);
  for (const line of lines) {
    console.log(`  ${line}`);
  }
  if (formatted.fullContent.split('\n').length > 20) {
    console.log('  ...');
  }
  console.log('  ' + '─'.repeat(50));
}