/**
 * @system PROMETHEUS
 * @config Template Storage
 * @purpose Stub templates for all file patterns
 * @created 2026-04-12
 */

import type { Template } from 'src/scripts/system/prometheus/thesaurus';

/**
 * Template registry
 * Contains base templates for all supported file patterns
 */
export const templates: TemplateRegistry = {
  constants: {
    name: 'constants',
    content: `// TODO: Constants template content`,
    pattern: 'constants',
    context: ['typescript_file'],
    variables: ['name', 'values'],
    dependencies: [],
    version: '1.0.0'
  },
  
  types: {
    name: 'types',
    content: `// TODO: Types template content`,
    pattern: 'types',
    context: ['typescript_file'],
    variables: ['name', 'fields'],
    dependencies: [],
    version: '1.0.0'
  },
  
  validators: {
    name: 'validators',
    content: `// TODO: Validators template content`,
    pattern: 'validators',
    context: ['typescript_file'],
    variables: ['name', 'schema'],
    dependencies: ['zod'],
    version: '1.0.0'
  },
  
  utils: {
    name: 'utils',
    content: `// TODO: Utils template content`,
    pattern: 'utils',
    context: ['typescript_file'],
    variables: ['name', 'functions'],
    dependencies: [],
    version: '1.0.0'
  },
  
  api: {
    name: 'api',
    content: `// TODO: API template content`,
    pattern: 'api',
    context: ['typescript_file', 'react_component'],
    variables: ['name', 'endpoints'],
    dependencies: ['axios', '@tanstack/react-query'],
    version: '1.0.0'
  },
  
  hooks: {
    name: 'hooks',
    content: `// TODO: React hooks template content`,
    pattern: 'hooks',
    context: ['react_component'],
    variables: ['name', 'hookLogic'],
    dependencies: ['react'],
    version: '1.0.0'
  }
};

export interface TemplateRegistry {
  [pattern: string]: Template;
}

// Template variable schemas
export const TEMPLATE_VARIABLES = {
  constants: ['name', 'values'],
  types: ['name', 'fields'],
  validators: ['name', 'schema'],
  utils: ['name', 'functions'],
  api: ['name', 'endpoints', 'baseUrl'],
  hooks: ['name', 'hookLogic', 'dependencies']
} as const;

// Context-specific template variations
export const TEMPLATE_VARIATIONS = {
  typescript_file: {
    // Variations for pure TypeScript files
  },
  react_component: {
    // Variations for React components
  },
  config_file: {
    // Variations for configuration files
  }
};

// TODO: Add more detailed template content
// TODO: Include JSDoc generation
// TODO: Add test file templates
// TODO: Include storybook templates for components