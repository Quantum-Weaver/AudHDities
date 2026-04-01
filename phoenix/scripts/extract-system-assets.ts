import * as fs from 'fs';
import * as path from 'path';

/**
 * Extract components_needed, api_endpoints, hooks_needed, utils_needed, constants_needed
 * from all data_objects across all pagan_systems in the JSON file
 */

interface DataObject {
  object_name: string;
  components_needed?: string[];
  api_endpoints?: string[];
  hooks_needed?: string[];
  utils_needed?: string[];
  constants_needed?: string[];
  notes?: string;
  description?: string;
}

interface PaganSystem {
  system: string;
  deity: string;
  council_role: string;
  data_objects: DataObject[];
}

interface SystemsJson {
  pagan_systems: PaganSystem[];
}

interface ExtractedAsset {
  name: string;
  source_object: string;
  source_system: string;
  type: 'component' | 'api_endpoint' | 'hook' | 'util' | 'constant';
}

interface OrganizedAssets {
  components: ExtractedAsset[];
  api_endpoints: ExtractedAsset[];
  hooks: ExtractedAsset[];
  utils: ExtractedAsset[];
  constants: ExtractedAsset[];
}

/**
 * Main extraction function
 */
function extractAssets(systemsJsonPath: string): OrganizedAssets {
  // Read and parse JSON file
  const rawData = fs.readFileSync(systemsJsonPath, 'utf-8');
  const systemsData: SystemsJson = JSON.parse(rawData);

  const assets: OrganizedAssets = {
    components: [],
    api_endpoints: [],
    hooks: [],
    utils: [],
    constants: []
  };

  // Iterate through all systems and their data objects
  for (const system of systemsData.pagan_systems) {
    for (const dataObject of system.data_objects) {
      const sourceObject = dataObject.object_name;
      const sourceSystem = system.system;

      // Extract components
      if (dataObject.components_needed && Array.isArray(dataObject.components_needed)) {
        for (const component of dataObject.components_needed) {
          assets.components.push({
            name: component,
            source_object: sourceObject,
            source_system: sourceSystem,
            type: 'component'
          });
        }
      }

      // Extract API endpoints
      if (dataObject.api_endpoints && Array.isArray(dataObject.api_endpoints)) {
        for (const endpoint of dataObject.api_endpoints) {
          assets.api_endpoints.push({
            name: endpoint,
            source_object: sourceObject,
            source_system: sourceSystem,
            type: 'api_endpoint'
          });
        }
      }

      // Extract hooks
      if (dataObject.hooks_needed && Array.isArray(dataObject.hooks_needed)) {
        for (const hook of dataObject.hooks_needed) {
          assets.hooks.push({
            name: hook,
            source_object: sourceObject,
            source_system: sourceSystem,
            type: 'hook'
          });
        }
      }

      // Extract utils
      if (dataObject.utils_needed && Array.isArray(dataObject.utils_needed)) {
        for (const util of dataObject.utils_needed) {
          assets.utils.push({
            name: util,
            source_object: sourceObject,
            source_system: sourceSystem,
            type: 'util'
          });
        }
      }

      // Extract constants
      if (dataObject.constants_needed && Array.isArray(dataObject.constants_needed)) {
        for (const constant of dataObject.constants_needed) {
          assets.constants.push({
            name: constant,
            source_object: sourceObject,
            source_system: sourceSystem,
            type: 'constant'
          });
        }
      }
    }
  }

  return assets;
}

/**
 * Generate a deduplicated list (preserving first occurrence)
 */
function deduplicateAssets(assets: OrganizedAssets): OrganizedAssets {
  const seen = {
    components: new Set<string>(),
    api_endpoints: new Set<string>(),
    hooks: new Set<string>(),
    utils: new Set<string>(),
    constants: new Set<string>()
  };

  const result: OrganizedAssets = {
    components: [],
    api_endpoints: [],
    hooks: [],
    utils: [],
    constants: []
  };

  for (const asset of assets.components) {
    if (!seen.components.has(asset.name)) {
      seen.components.add(asset.name);
      result.components.push(asset);
    }
  }

  for (const asset of assets.api_endpoints) {
    if (!seen.api_endpoints.has(asset.name)) {
      seen.api_endpoints.add(asset.name);
      result.api_endpoints.push(asset);
    }
  }

  for (const asset of assets.hooks) {
    if (!seen.hooks.has(asset.name)) {
      seen.hooks.add(asset.name);
      result.hooks.push(asset);
    }
  }

  for (const asset of assets.utils) {
    if (!seen.utils.has(asset.name)) {
      seen.utils.add(asset.name);
      result.utils.push(asset);
    }
  }

  for (const asset of assets.constants) {
    if (!seen.constants.has(asset.name)) {
      seen.constants.add(asset.name);
      result.constants.push(asset);
    }
  }

  return result;
}

/**
 * Generate markdown report
 */
function generateMarkdownReport(assets: OrganizedAssets, outputPath: string): void {
  const lines: string[] = [];

  lines.push('# 🏛️ AUDHDITIES ASSET INVENTORY\n');
  lines.push(`*Generated: ${new Date().toISOString()}*\n`);
  lines.push('---\n');

  // Components Section
  lines.push('## 🧩 Components\n');
  lines.push('| Component | Source Object | Source System |');
  lines.push('|:---|:---|:---|');

  for (const component of assets.components) {
    lines.push(`| \`${component.name}\` | ${component.source_object} | ${component.source_system} |`);
  }
  lines.push(`\n*Total: ${assets.components.length} components*\n`);
  lines.push('---\n');

  // API Endpoints Section
  lines.push('## 🌐 API Endpoints\n');
  lines.push('| Endpoint | Source Object | Source System |');
  lines.push('|:---|:---|:---|');

  for (const endpoint of assets.api_endpoints) {
    lines.push(`| \`${endpoint.name}\` | ${endpoint.source_object} | ${endpoint.source_system} |`);
  }
  lines.push(`\n*Total: ${assets.api_endpoints.length} endpoints*\n`);
  lines.push('---\n');

  // Hooks Section
  lines.push('## 🪝 Hooks\n');
  lines.push('| Hook | Source Object | Source System |');
  lines.push('|:---|:---|:---|');

  for (const hook of assets.hooks) {
    lines.push(`| \`${hook.name}\` | ${hook.source_object} | ${hook.source_system} |`);
  }
  lines.push(`\n*Total: ${assets.hooks.length} hooks*\n`);
  lines.push('---\n');

  // Utils Section
  lines.push('## 🔧 Utilities\n');
  lines.push('| Utility | Source Object | Source System |');
  lines.push('|:---|:---|:---|');

  for (const util of assets.utils) {
    lines.push(`| \`${util.name}\` | ${util.source_object} | ${util.source_system} |`);
  }
  lines.push(`\n*Total: ${assets.utils.length} utilities*\n`);
  lines.push('---\n');

  // Constants Section
  lines.push('## 📊 Constants\n');
  lines.push('| Constant | Source Object | Source System |');
  lines.push('|:---|:---|:---|');

  for (const constant of assets.constants) {
    lines.push(`| \`${constant.name}\` | ${constant.source_object} | ${constant.source_system} |`);
  }
  lines.push(`\n*Total: ${assets.constants.length} constants*\n`);
  lines.push('---\n');

  // Write to file
  fs.writeFileSync(outputPath, lines.join('\n'), 'utf-8');
  console.log(`Markdown report generated at: ${outputPath}`);
}

/**
 * Generate JSON output of all extracted assets
 */
function generateJsonOutput(assets: OrganizedAssets, outputPath: string): void {
  const output = {
    generated_at: new Date().toISOString(),
    summary: {
      total_components: assets.components.length,
      total_api_endpoints: assets.api_endpoints.length,
      total_hooks: assets.hooks.length,
      total_utils: assets.utils.length,
      total_constants: assets.constants.length,
      grand_total: assets.components.length + assets.api_endpoints.length + 
                    assets.hooks.length + assets.utils.length + assets.constants.length
    },
    assets
  };

  fs.writeFileSync(outputPath, JSON.stringify(output, null, 2), 'utf-8');
  console.log(`JSON output generated at: ${outputPath}`);
}

/**
 * Generate a grouped outline by source system
 */
function generateGroupedOutline(assets: OrganizedAssets, outputPath: string): void {
  const lines: string[] = [];

  lines.push('# 🏛️ AUDHDITIES ASSET OUTLINE (By System)\n');
  lines.push(`*Generated: ${new Date().toISOString()}*\n`);

  // Group components by source system
  const componentsBySystem = new Map<string, { object: string; name: string }[]>();
  for (const comp of assets.components) {
    if (!componentsBySystem.has(comp.source_system)) {
      componentsBySystem.set(comp.source_system, []);
    }
    componentsBySystem.get(comp.source_system)!.push({
      object: comp.source_object,
      name: comp.name
    });
  }

  // Group API endpoints by source system
  const apiBySystem = new Map<string, { object: string; name: string }[]>();
  for (const api of assets.api_endpoints) {
    if (!apiBySystem.has(api.source_system)) {
      apiBySystem.set(api.source_system, []);
    }
    apiBySystem.get(api.source_system)!.push({
      object: api.source_object,
      name: api.name
    });
  }

  // Group hooks by source system
  const hooksBySystem = new Map<string, { object: string; name: string }[]>();
  for (const hook of assets.hooks) {
    if (!hooksBySystem.has(hook.source_system)) {
      hooksBySystem.set(hook.source_system, []);
    }
    hooksBySystem.get(hook.source_system)!.push({
      object: hook.source_object,
      name: hook.name
    });
  }

  // Group utils by source system
  const utilsBySystem = new Map<string, { object: string; name: string }[]>();
  for (const util of assets.utils) {
    if (!utilsBySystem.has(util.source_system)) {
      utilsBySystem.set(util.source_system, []);
    }
    utilsBySystem.get(util.source_system)!.push({
      object: util.source_object,
      name: util.name
    });
  }

  // Group constants by source system
  const constantsBySystem = new Map<string, { object: string; name: string }[]>();
  for (const constant of assets.constants) {
    if (!constantsBySystem.has(constant.source_system)) {
      constantsBySystem.set(constant.source_system, []);
    }
    constantsBySystem.get(constant.source_system)!.push({
      object: constant.source_object,
      name: constant.name
    });
  }

  // Generate outline for each system
  const allSystems = new Set([
    ...componentsBySystem.keys(),
    ...apiBySystem.keys(),
    ...hooksBySystem.keys(),
    ...utilsBySystem.keys(),
    ...constantsBySystem.keys()
  ]);

  for (const system of Array.from(allSystems).sort()) {
    lines.push(`## 🏛️ ${system}\n`);

    // Components for this system
    const sysComponents = componentsBySystem.get(system) || [];
    if (sysComponents.length > 0) {
      lines.push('### 🧩 Components');
      for (const comp of sysComponents) {
        lines.push(`- \`${comp.name}\` — *from ${comp.object}*`);
      }
      lines.push('');
    }

    // API Endpoints for this system
    const sysApis = apiBySystem.get(system) || [];
    if (sysApis.length > 0) {
      lines.push('### 🌐 API Endpoints');
      for (const api of sysApis) {
        lines.push(`- \`${api.name}\` — *from ${api.object}*`);
      }
      lines.push('');
    }

    // Hooks for this system
    const sysHooks = hooksBySystem.get(system) || [];
    if (sysHooks.length > 0) {
      lines.push('### 🪝 Hooks');
      for (const hook of sysHooks) {
        lines.push(`- \`${hook.name}\` — *from ${hook.object}*`);
      }
      lines.push('');
    }

    // Utils for this system
    const sysUtils = utilsBySystem.get(system) || [];
    if (sysUtils.length > 0) {
      lines.push('### 🔧 Utilities');
      for (const util of sysUtils) {
        lines.push(`- \`${util.name}\` — *from ${util.object}*`);
      }
      lines.push('');
    }

    // Constants for this system
    const sysConstants = constantsBySystem.get(system) || [];
    if (sysConstants.length > 0) {
      lines.push('### 📊 Constants');
      for (const constant of sysConstants) {
        lines.push(`- \`${constant.name}\` — *from ${constant.object}*`);
      }
      lines.push('');
    }

    lines.push('---\n');
  }

  fs.writeFileSync(outputPath, lines.join('\n'), 'utf-8');
  console.log(`Grouped outline generated at: ${outputPath}`);
}

/**
 * Main execution
 */
function main() {
  // Configuration - adjust paths as needed
  const inputPath = path.join(process.cwd(), 'systems.json');
  const outputDir = path.join(process.cwd(), 'asset-inventory');

  // Create output directory if it doesn't exist
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  try {
    console.log('📁 Reading systems.json...');
    const assets = extractAssets(inputPath);
    const deduplicated = deduplicateAssets(assets);

    console.log('\n📊 Extraction Summary:');
    console.log(`   Components: ${assets.components.length} (${deduplicated.components.length} unique)`);
    console.log(`   API Endpoints: ${assets.api_endpoints.length} (${deduplicated.api_endpoints.length} unique)`);
    console.log(`   Hooks: ${assets.hooks.length} (${deduplicated.hooks.length} unique)`);
    console.log(`   Utils: ${assets.utils.length} (${deduplicated.utils.length} unique)`);
    console.log(`   Constants: ${assets.constants.length} (${deduplicated.constants.length} unique)`);
    console.log(`   TOTAL: ${assets.components.length + assets.api_endpoints.length + assets.hooks.length + assets.utils.length + assets.constants.length} assets`);

    // Generate outputs
    generateMarkdownReport(deduplicated, path.join(outputDir, 'asset-inventory.md'));
    generateJsonOutput(deduplicated, path.join(outputDir, 'asset-inventory.json'));
    generateGroupedOutline(deduplicated, path.join(outputDir, 'asset-outline-by-system.md'));

    console.log('\n✅ All outputs generated successfully!');
    console.log(`   Output directory: ${outputDir}`);

  } catch (error) {
    console.error('❌ Error:', error);
    process.exit(1);
  }
}

// Run the script
main();