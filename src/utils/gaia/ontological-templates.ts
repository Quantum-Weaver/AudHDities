// src/utils/gaia/ontological-templates.ts

// ============================================================================
// DOMAIN-MAPPER TEMPLATES
// ============================================================================

export const DOMAIN_MAPPER_TEMPLATES = {
  // For new ontology objects
  ontologyObject: (data: {
    name: string;
    classification: string[];
  }) => `// Add to DOMAIN_MAPPINGS
${data.name.toUpperCase()}: {
  domain: '${data.classification[0]}Domain',
  kingdom: '${data.classification[1]}Kingdom', 
  phylum: '${data.classification[2]}Phylum',
  class: '${data.classification[3]}Class',
  order: '${data.classification[4]}Order',
  family: '${data.classification[5]}Family', 
  genus: '${data.classification[6]}Genus',
  species: '${data.classification[7]}Species'
},`,

  // For new taxonomy groups
  taxonomyGroup: (data: {
    domain: string;
    category: string;
    items: string[];
  }) => `// Add to DOMAIN_MAPPINGS under ${data.domain.toUpperCase()}_DOMAIN
${data.category.toUpperCase()}: [
${data.items.map(item => `  '${item}'`).join(',\n')}
],`,

  // For new function mappings
  functionMapping: (data: {
    category: string;
    functions: string[];
  }) => `// Add to FUNCTION_MAPPINGS
${data.category.toUpperCase()}_FUNCTIONS: [
${data.functions.map(fn => `  '${fn}'`).join(',\n')}
],`
};

// ============================================================================
// TYPE DEFINITION TEMPLATES
// ============================================================================

export const TYPE_TEMPLATES = {
  // For new ontology types
  ontologyType: (data: {
    typeName: string;
    values: string[];
  }) => `export type ${data.typeName} =
${data.values.map(v => `  | '${v}'`).join('\n')};`,

  // For new taxonomy types  
  taxonomyType: (data: {
    category: string;
    items: string[];
  }) => `export type ${data.category}TaxonomyType =
${data.items.map(item => `  | '${item}'`).join('\n')};`,

  // For new primitive types
  primitiveType: (data: {
    typeName: string;
    values: Record<string, string>;
  }) => `export type ${data.typeName} =
${Object.keys(data.values).map(key => `  | '${data.values[key]}'`).join('\n')};`,

  // For new interface types
  interfaceType: (data: {
    interfaceName: string;
    properties: Record<string, string>;
  }) => `export interface ${data.interfaceName} {
${Object.entries(data.properties).map(([key, type]) => `  ${key}: ${type};`).join('\n')}
}`
};

// ============================================================================
// PRIMITIVE TEMPLATES
// ============================================================================

export const PRIMITIVE_TEMPLATES = {
  // For semantic primitives
  semanticObject: (data: {
    key: string;
    semantics: Record<string, string>;
  }) => `export const ${data.key} = {
${Object.entries(data.semantics).map(([k, v]) => `  ${k}: '${v}'`).join(',\n')}
} as const;`,

  // For state primitives
  stateObject: (data: {
    key: string;
    states: Record<string, string>;
  }) => `export const ${data.key} = {
${Object.entries(data.states).map(([k, v]) => `  ${k}: '${v}'`).join(',\n')}
} as const;

export type ${data.key.replace(/([a-z])([A-Z])/g, '$1$2').toUpperCase()}_TYPE = 
  ${Object.values(data.states).map(v => `'${v}'`).join(' | ')};`,

  // For configuration primitives
  configObject: (data: {
    key: string;
    config: Record<string, any>;
  }) => `export const ${data.key} = {
${Object.entries(data.config).map(([k, v]) => `  ${k}: ${JSON.stringify(v, null, 2).replace(/\n/g, '\n  ')}`).join(',\n')}
} as const;`
};

// ============================================================================
// CONSTANT TEMPLATES
// ============================================================================

export const CONSTANT_TEMPLATES = {
  // For domain constants
  domainConstants: (data: {
    constantGroup: string;
    constants: Record<string, any>;
  }) => `export const ${data.constantGroup} = {
${Object.entries(data.constants).map(([k, v]) => `  ${k}: ${JSON.stringify(v, null, 2).replace(/\n/g, '\n  ')}`).join(',\n')}
} as const;`,

  // For configuration constants
  configConstants: (data: {
    configName: string;
    config: Record<string, any>;
  }) => `export const ${data.configName} = {
${Object.entries(data.config).map(([k, v]) => `  ${k}: ${JSON.stringify(v, null, 2).replace(/\n/g, '\n  ')}`).join(',\n')}
} as const;

export type ${data.configName.replace(/([a-z])([A-Z])/g, '$1$2').toUpperCase()}_TYPE = 
  typeof ${data.configName};`,

  // For value constants
  valueConstants: (data: {
    constantGroup: string;
    values: Record<string, string | number>;
  }) => `export const ${data.constantGroup} = {
${Object.entries(data.values).map(([k, v]) => `  ${k}: ${typeof v === 'string' ? `'${v}'` : v}`).join(',\n')}
} as const;`
};

// ============================================================================
// UTILITY TEMPLATES
// ============================================================================

export const UTILITY_TEMPLATES = {
  // For pure logic utilities
  pureFunction: (data: {
    functionName: string;
    parameters: string[];
    logic: string;
    returnType?: string;
  }) => `export const ${data.functionName} = (${data.parameters.join(', ')}): ${data.returnType || 'any'} => {
  ${data.logic}
};`,

  // For validation utilities
  validationFunction: (data: {
    functionName: string;
    parameter: string;
    validation: string;
  }) => `export const ${data.functionName} = (${data.parameter}: any): boolean => {
  return ${data.validation};
};`,

  // For transformation utilities
  transformationFunction: (data: {
    functionName: string;
    inputType: string;
    outputType: string;
    transformation: string;
  }) => `export const ${data.functionName} = (input: ${data.inputType}): ${data.outputType} => {
  ${data.transformation}
};`,

  // For generator utilities
  generatorFunction: (data: {
    functionName: string;
    parameters: string[];
    generation: string;
  }) => `export const ${data.functionName} = (${data.parameters.join(', ')}): any => {
  ${data.generation}
};`
};

// ============================================================================
// FILE CREATION TEMPLATES
// ============================================================================

export const FILE_TEMPLATES = {
  // For new domain files
  domainFile: (data: {
    domain: string;
    category: string;
    imports: string[];
    exports: string[];
  }) => `// src/utils/domain/${data.domain}/${data.category}.ts
${data.imports.map(imp => `import { ${imp} } from '@/lib/constants/domain/${data.domain}/${imp.toLowerCase()}';`).join('\n')}

${data.exports.map(exp => `export { ${exp} } from './${exp.toLowerCase()}';`).join('\n')}
`,

  // For new constant files
  constantFile: (data: {
    domain: string;
    category: string;
    constants: string;
  }) => `// lib/constants/domain/${data.domain}/${data.category}.ts
${data.constants}
`,

  // For new utility files
  utilityFile: (data: {
    domain: string;
    category: string;
    utilities: string;
    imports?: string[];
  }) => `// src/utils/domain/${data.domain}/${data.category}.ts
${data.imports ? data.imports.map(imp => `import { ${imp} } from '@/lib/constants/domain/${data.domain}/${imp.toLowerCase()}';`).join('\n') : ''}

${data.utilities}
`
};

// ============================================================================
// COMPLETE EXPANSION GUIDE WITH TEMPLATES
// ============================================================================

export const ONTOLOGICAL_EXPANSION_FLOW = {
  'new-ontology': [
    {
      step: 1,
      phase: 'structure',
      action: 'Define ontological type in domain-mapper',
      targetFile: 'types/gaia/domain-mapping.ts',
      validation: (input: any) => input.name && input.classification?.length === 8,
      template: (input: any) => DOMAIN_MAPPER_TEMPLATES.ontologyObject(input)
    },
    {
      step: 2,
      phase: 'structure', 
      action: 'Add to ontology types',
      targetFile: 'types/gaia/ontology-types.ts',
      validation: (input: any) => input.type && input.values?.length > 0,
      template: (input: any) => TYPE_TEMPLATES.ontologyType({
        typeName: input.type,
        values: input.values
      })
    },
    {
      step: 3,
      phase: 'essence',
      action: 'Create semantic primitives',
      targetFile: 'types/gaia/primitives.ts',
      validation: (input: any) => input.semantics && Object.keys(input.semantics).length > 0,
      template: (input: any) => PRIMITIVE_TEMPLATES.semanticObject({
        key: input.ontologyKey,
        semantics: input.semantics
      })
    },
    {
      step: 4,
      phase: 'substance',
      action: 'Define constants',
      targetFile: `lib/constants/ontology/{domain}.ts`,
      validation: (input: any) => input.constants && Object.keys(input.constants).length > 0,
      template: (input: any) => CONSTANT_TEMPLATES.domainConstants({
        constantGroup: input.constantGroup,
        constants: input.constants
      })
    },
    {
      step: 5,
      phase: 'intelligence',
      action: 'Create utilities',
      targetFile: `utils/domain/{domain}/{utilities}.ts`,
      validation: (input: any) => input.functions?.length > 0,
      template: (input: any) => input.functions.map((fn: string) => 
        UTILITY_TEMPLATES.pureFunction({
          functionName: fn,
          parameters: ['config'],
          logic: `// ${input.type} utility logic\nreturn config;`,
          returnType: 'any'
        })
      ).join('\n\n')
    }
  ],

  'new-taxonomy': [
    {
      step: 1,
      phase: 'structure',
      action: 'Define taxonomy type',
      targetFile: 'types/gaia/taxonomy-types.ts',
      validation: (input: any) => input.category && input.items?.length > 0,
      template: (input: any) => TYPE_TEMPLATES.taxonomyType({
        category: input.category,
        items: input.items
      })
    },
    {
      step: 2,
      phase: 'structure',
      action: 'Map to domain structure',
      targetFile: 'types/gaia/domain-mapping.ts', 
      validation: (input: any) => input.domain && input.mapping,
      template: (input: any) => DOMAIN_MAPPER_TEMPLATES.taxonomyGroup({
        domain: input.domain,
        category: input.category,
        items: input.items
      })
    },
    {
      step: 3,
      phase: 'essence',
      action: 'Create taxonomy primitives',
      targetFile: 'types/gaia/primitives.ts',
      validation: (input: any) => input.taxonomy && Object.keys(input.taxonomy).length > 0,
      template: (input: any) => PRIMITIVE_TEMPLATES.semanticObject({
        key: input.taxonomyKey,
        semantics: input.taxonomy
      })
    },
    {
      step: 4,
      phase: 'substance',
      action: 'Create taxonomy constants',
      targetFile: `lib/constants/taxonomy/{category}.ts`,
      validation: (input: any) => input.taxonomyConstants,
      template: (input: any) => CONSTANT_TEMPLATES.valueConstants({
        constantGroup: input.constantGroup,
        values: input.taxonomyConstants
      })
    }
  ]
};

// ============================================================================
// TEMPLATE UTILITY FUNCTIONS
// ============================================================================

export class TemplateEngine {
  static generate(flowType: 'new-ontology' | 'new-taxonomy', input: any) {
    const flow = ONTOLOGICAL_EXPANSION_FLOW[flowType];
    const results = [];
    
    for (const step of flow) {
      // Replace dynamic file paths
      let targetFile = step.targetFile;
      if (targetFile.includes('{domain}') && input.domain) {
        targetFile = targetFile.replace('{domain}', input.domain.toLowerCase());
      }
      if (targetFile.includes('{utilities}') && input.utilities) {
        targetFile = targetFile.replace('{utilities}', input.utilities.toLowerCase());
      }
      if (targetFile.includes('{category}') && input.category) {
        targetFile = targetFile.replace('{category}', input.category.toLowerCase());
      }
      
      results.push({
        step: step.step,
        phase: step.phase,
        file: targetFile,
        code: step.template(input),
        action: step.action
      });
    }
    
    return results;
  }
  
  static createFileContent(template: string, data: any): string {
    // Simple template engine for dynamic values
    return template.replace(/\{(\w+)\}/g, (match, key) => {
      return data[key] || match;
    });
  }
}