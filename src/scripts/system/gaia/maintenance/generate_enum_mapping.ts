// src/scripts/system/gaia/maintenance/generate_enum_mapping.ts
// ============================================================================
// GENERATE ENUM MAPPING
// ============================================================================

import { getDeityFolderForObject } from "@/config/object_categories.js";
import type { EnumMappingEntry } from "@/config/enum_mapping.js";
import type { EnrichedTable } from "../enrich/enrich_objects.js";

interface EnumReference {
  enumName: string;
  tableName: string;
  deityFolder: string;
  tablePriority: number;
}

const DEITY_PRIORITY: Record<string, number> = {
  'hestia-core': 100,
  'plutus-economics': 90,
  'hermes-social': 80,
  'athena-gamification': 70,
  'mnemosyne-assessment': 60,
  'themis-governance': 50,
  'iris-communications': 40,
  'hephaestus-infrastructure': 30,
  'aethelred-connections': 20,
  'daedalus-meta': 10,
};

const MANUAL_OVERRIDES: Record<string, string> = {
  'payout_method': 'hestia-core',
  'user_tier': 'hestia-core',
  'council_house': 'hestia-core',
};

/**
 * Generate enum mapping from enriched tables
 * Note: enumRefs are no longer on EnrichedTable - 
 * we need to get them from the original extraction or regenerate
 */
export function generateEnumMapping(
  tables: EnrichedTable[],
  getEnumRefsForTable: (tableName: string) => string[]
): Record<string, EnumMappingEntry> {
  const references: Map<string, EnumReference[]> = new Map();
  
  for (const table of tables) {
    const deityFolder = table.deityFolder;
    const priority = DEITY_PRIORITY[deityFolder] || 0;
    const enumRefs = getEnumRefsForTable(table.name);
    
    for (const enumRef of enumRefs) {
      if (!references.has(enumRef)) {
        references.set(enumRef, []);
      }
      references.get(enumRef)!.push({
        enumName: enumRef,
        tableName: table.name,
        deityFolder,
        tablePriority: priority
      });
    }
  }
  
  const mapping: Record<string, EnumMappingEntry> = {};
  
  for (const [enumName, refs] of references) {
    if (MANUAL_OVERRIDES[enumName]) {
      mapping[enumName] = {
        enumName,
        deityFolder: MANUAL_OVERRIDES[enumName],
        referencedIn: refs.map(r => r.tableName),
        priority: 100
      };
      continue;
    }
    
    const bestMatch = refs.reduce((best, current) => 
      current.tablePriority > best.tablePriority ? current : best, refs[0]);
    
    mapping[enumName] = {
      enumName,
      deityFolder: bestMatch.deityFolder,
      referencedIn: refs.map(r => r.tableName),
      priority: bestMatch.tablePriority
    };
  }
  
  mapping.default = {
    enumName: 'default',
    deityFolder: 'hestia-core',
    referencedIn: [],
    priority: 0
  };
  
  return mapping;
}