// src/scripts/system/gaia/generate_enum_mapping.ts

import { getDeityFolderForObject } from "@/config/object_categories";
import { EnumMappingEntry } from "./enrich_objects";
import { TableInfo } from "./extract_tables";

interface EnumReference {
  enumName: string;
  tableName: string;
  deityFolder: string;
  tablePriority: number;  // Based on deity group priority
}

// Priority weights by deity (higher = more important)
const DEITY_PRIORITY: Record<string, number> = {
  'hestia-core': 100,
  'plutus-economics': 90,
  'hermes-social': 80,
  'athena-gamification': 70,
  'mnemosyne-assessment': 60,
  'themis-governance': 50,
  'iris-communications': 40,
  'hephaestus-infrastructure': 30,
  'aethelred-connections': 20
};

export function generateEnumMapping(tables: TableInfo[]): Record<string, EnumMappingEntry> {
  const references: Map<string, EnumReference[]> = new Map();
  
  for (const table of tables) {
    const deityFolder = getDeityFolderForObject('runtime_enum', table.name);
    const priority = DEITY_PRIORITY[deityFolder] || 0;
    
    for (const enumRef of table.enumRefs) {
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
    // Find the reference with highest priority
    const bestMatch = refs.reduce((best, current) => 
      current.tablePriority > best.tablePriority ? current : best, refs[0]);
    
    mapping[enumName] = {
      enumName,
      deityFolder: bestMatch.deityFolder,
      referencedIn: refs.map(r => r.tableName),
      priority: bestMatch.tablePriority
    };
  }
  
  // Add default fallback
  mapping.default = {
    enumName: 'default',
    deityFolder: 'hestia-core',
    referencedIn: [],
    priority: 0
  };
  
  return mapping;
}