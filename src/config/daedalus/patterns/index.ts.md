/**
 * @system DAEDALUS
 * @config Pattern Definitions
 * @purpose Generation patterns and their behaviors
 * @created 2026-04-12
 */

import type { PatternDefinition } from '@/scripts/system/daedalus/thesaurus';

/**
 * Pattern registry
 * Defines all known generation patterns and their properties
 */
export const patterns: PatternRegistry = {
  constants: {
    name: 'constants',
    description: 'Constant values and enums',
    contexts: ['typescript_file', 'config_file'],
    defaultTemplate: 'constants',
    namingRule: 'SCREAMING_SNAKE_CASE for values, PascalCase for enums',
    examples: [
      'export const MAX_RETRIES = 3;',
      'export enum Status { ACTIVE, INACTIVE }'
    ]
  },
  
  types: {
    name: 'types',
    description: 'TypeScript type definitions and interfaces',
    contexts: ['typescript_file'],
    defaultTemplate: 'types',
    namingRule: 'PascalCase for types, I prefix optional for interfaces',
    examples: [
      'export type UserId = string;',
      'export interface User { id: UserId; name: string; }'
    ]
  },
  
  validators: {
    name: 'validators',
    description: 'Zod validation schemas',
    contexts: ['typescript_file'],
    defaultTemplate: 'validators',
    namingRule: 'camelCase with Schema suffix',
    examples: [
      'export const userSchema = z.object({ id: z.string() });'
    ]
  },
  
  utils: {
    name: 'utils',
    description: 'Utility functions and helpers',
    contexts: ['typescript_file'],
    defaultTemplate: 'utils',
    namingRule: 'camelCase',
    examples: [
      'export function formatDate(date: Date): string { ... }'
    ]
  },
  
  api: {
    name: 'api',
    description: 'API client functions and React Query hooks',
    contexts: ['typescript_file', 'react_component'],
    defaultTemplate: 'api',
    namingRule: 'camelCase, useQuery/useMutation for hooks',
    examples: [
      'export const useUser = (id: string) => useQuery({ ... });'
    ]
  },
  
  hooks: {
    name: 'hooks',
    description: 'Custom React hooks',
    contexts: ['react_component'],
    defaultTemplate: 'hooks',
    namingRule: 'use prefix, camelCase',
    examples: [
      'export function useLocalStorage<T>(key: string) { ... }'
    ]
  }
};

export interface PatternRegistry {
  [pattern: string]: PatternDefinition;
}

// Pattern relationships (which patterns commonly import others)
export const PATTERN_DEPENDENCIES: PatternDependencyMap = {
  api: ['types', 'validators', 'constants'],
  hooks: ['types', 'utils'],
  validators: ['types'],
  utils: ['types', 'constants']
};

export interface PatternDependencyMap {
  [pattern: string]: string[];
}

// Pattern generation order (dependencies first)
export const GENERATION_ORDER: string[] = [
  'constants',
  'types', 
  'validators',
  'utils',
  'api',
  'hooks'
];

// Pattern-specific validation rules
export const PATTERN_VALIDATION = {
  constants: {
    mustExport: true,
    allowDefaultExport: false
  },
  types: {
    mustExport: true,
    allowDefaultExport: false
  },
  hooks: {
    mustExport: true,
    nameMustStartWith: 'use'
  }
};

// TODO: Add more sophisticated pattern relationships
// TODO: Include pattern composition rules
// TODO: Add pattern migration paths
// TODO: Define pattern anti-patterns to avoid