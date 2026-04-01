// src/utils/gaia/assets.ts
import { councilMetadata } from '@/data';
import { QUANTUM_COLORS, DOMAIN_COLORS, CONSCIOUSNESS_LEVEL_COLORS } from '@/lib/constants/cosmic';
import { ICON_VARIANTS } from '@/lib/constants/components/ui';
import { AssetMapper, EnvironmentKey } from '@/lib/constants/systems/assets/mapper';
import path from 'path';

// ============================================================================
// QUANTUM ASSET SERVICE - FIXED IMPORTS & TYPES
// ============================================================================

// ADD MISSING TYPES
type CouncilColorKey = keyof typeof QUANTUM_COLORS; 
type DomainColorKey = keyof typeof DOMAIN_COLORS;  
type ConsciousnessKey = keyof typeof CONSCIOUSNESS_LEVEL_COLORS; 

// ADD MISSING INTERFACE
interface QuantumCardProps { // Added missing interface
  assets: {
    frame?: string;
    background?: string;
    effects?: string[];
    icon?: string;
  };
}

export interface QuantumAsset {
  id: string;
  type: 'image' | 'audio' | 'video' | 'document' | 'data' | 'icon' | 'environment';
  path: string;
  metadata: {
    consciousnessTags: [];
    domain: string; // Simplified from keyof ColorSystem
    entity?: string;
    quantumSignature: string;
    sensoryIntensity: 'low' | 'medium' | 'high';
    preloadPriority: number;
  };
}

export class AssetService {
  private static preloadedAssets = new Set<string>();
  private static assetRegistry: Map<string, QuantumAsset> = new Map();

  static initialize() {
    this.registerEnvironmentAssets();
  }

  static preloadEnvironment(key: EnvironmentKey, sensoryIntensity: 'low' | 'medium' | 'high' = 'medium') {
    const environment = AssetMapper.environments[key];
    if (!environment) return;

    this.preloadImage(environment.background);
    if (environment.foreground) this.preloadImage(environment.foreground);
    
    const sensoryAssets = this.getSensoryAssets(sensoryIntensity);
    sensoryAssets.particles.forEach(particle => this.preloadImage(particle));
    sensoryAssets.ambient.forEach(ambient => this.preloadImage(ambient));
  }

  static getEnvironmentAssets(key: EnvironmentKey, variant: number = 1): { background: string; foreground?: string } {
    const environment = AssetMapper.environments[key];
    if (!environment) {
      return { background: '', foreground: undefined };
    }

    // FIXED: Use your actual variant system from AssetMapper
    const background = AssetMapper.utils.getEnvironment(key, variant).background;
    const foreground = AssetMapper.utils.getEnvironment(key, variant).foreground;

    return {
      background: this.assetExists(background) ? background : environment.background,
      foreground: foreground && this.assetExists(foreground) ? foreground : environment.foreground
    };
  }

  static getSensoryAssets(intensity: 'low' | 'medium' | 'high') {
    // FIXED: Use actual AssetMapper effects
    const particles = intensity === 'high' ? 
      AssetMapper.effects.particles.glow.slice(0, 3) : 
      intensity === 'medium' ? 
      AssetMapper.effects.particles.glow.slice(0, 1) : [];
    
    return {
      particles,
      ambient: intensity === 'low' ? [] : [AssetMapper.ambient.floatingDust[0]],
      magic: intensity === 'high' ? 
        [AssetMapper.effects.magic.blue[0], AssetMapper.effects.magic.fire[0]] : 
        []
    };
  }

  static getDomainAssets(domain: string, variant: number = 1): string[] {
    const assets: string[] = [];
    
    const envKey = this.mapDomainToEnvironment(domain as EnvironmentKey);
    if (envKey) {
      const envAssets = this.getEnvironmentAssets(envKey, variant);
      assets.push(envAssets.background);
      if (envAssets.foreground) assets.push(envAssets.foreground);
    }
    
    assets.push(...this.getDomainEffects(domain));
    return assets;
  }


  static getAvailableEnvironments(): EnvironmentKey[] {
    return Object.keys(AssetMapper.environments) as EnvironmentKey[];
  }

    static getEnvironmentMetadata(key: EnvironmentKey): { domain: string; consciousness: string[] } {
    const metadataMap: Record<EnvironmentKey, { domain: string; consciousness: string[] }> = {	
      about: { domain: 'about', consciousness: ['sovereign_focused', 'quantum_entangled'] },
      admin: { domain: 'admin', consciousness: ['receptive_open', 'quantum_entangled'] },
      anon: { domain: 'anon', consciousness: ['receptive_open', 'quantum_entangled'] },
      architecture: { domain: 'architecture', consciousness: ['receptive_open', 'quantum_entangled'] },
      business: { domain: 'business', consciousness: ['quantum_entangled', 'sovereign_focused'] },	  
      community: { domain: 'community', consciousness: ['collaborative_shared', 'receptive_open'] },
      contact: { domain: 'contact', consciousness: ['receptive_open', 'quantum_entangled'] },
      council: { domain: 'council', consciousness: ['sovereign_focused', 'quantum_entangled'] },
      creator: { domain: 'creator', consciousness: ['receptive_open', 'quantum_entangled'] },
      cure: { domain: 'cure', consciousness: ['collaborative_shared', 'receptive_open'] },
      dashboard: { domain: 'dashboard', consciousness: ['receptive_open', 'quantum_entangled'] },
      docs: { domain: 'docs', consciousness: ['receptive_open', 'quantum_entangled'] },
      ecosystem: { domain: 'ecosystem', consciousness: ['receptive_open', 'quantum_entangled'] },
      edit: { domain: 'edit', consciousness: ['receptive_open', 'quantum_entangled'] },
      gateway: { domain: 'gateway', consciousness: ['collaborative_shared', 'receptive_open'] },
      home: { domain: 'home', consciousness: ['collaborative_shared', 'receptive_open'] },
      invitation: { domain: 'invitation', consciousness: ['sovereign_focused', 'quantum_entangled'] },
      learn: { domain: 'learn', consciousness: ['receptive_open', 'quantum_entangled'] },
      library: { domain: 'library', consciousness: ['collaborative_shared', 'quantum_entangled'] },
      lounge: { domain: 'lounge', consciousness: ['collaborative_shared', 'receptive_open'] },
      marketplace: { domain: 'marketplace', consciousness: ['receptive_open', 'quantum_entangled'] },      
      music: { domain: 'music', consciousness: ['receptive_open', 'quantum_entangled'] },
      observatory: { domain: 'observatory', consciousness: ['quantum_entangled', 'sovereign_focused'] }, 
      origin: { domain: 'origin', consciousness: ['sovereign_focused', 'receptive_open'] },
      plan: { domain: 'plan', consciousness: ['receptive_open', 'quantum_entangled'] },	  
      progress: { domain: 'progress', consciousness: ['receptive_open', 'quantum_entangled'] },
      questionaire: { domain: 'questionaire', consciousness: ['receptive_open', 'quantum_entangled'] },
      seasonal: { domain: 'seasonal', consciousness: ['receptive_open', 'quantum_entangled'] },
      support: { domain: 'support', consciousness: ['collaborative_shared'] },
      timer: { domain: 'timer', consciousness: ['receptive_open', 'quantum_entangled'] },
      transparency: { domain: 'music', consciousness: ['receptive_open', 'quantum_entangled'] },
      vision: { domain: 'music', consciousness: ['receptive_open', 'quantum_entangled'] }      
    };

    return metadataMap[key] || { domain: 'quantum', consciousness: ['emergent'] };
  }

  static async validateAsset(path: string): Promise<{ valid: boolean; error?: string }> {
    try {
      const response = await fetch(path, { method: 'HEAD' });
      return { valid: response.ok };
    } catch (error) {
      return { valid: false, error: (error as Error).message };
    }
  }

  static clearUnusedAssets(keepPatterns: string[] = []) {
    const assetsToKeep = new Set(keepPatterns);
    this.preloadedAssets.forEach(asset => {
      if (!Array.from(assetsToKeep).some(pattern => asset.includes(pattern))) {
        this.preloadedAssets.delete(asset);
      }
    });
  }

  // ============================================================================
  // PRIVATE METHODS - FIXED
  // ============================================================================

  private static registerEnvironmentAssets() {
    Object.entries(AssetMapper.environments).forEach(([envKey, env]) => {
      const metadata = this.getEnvironmentMetadata(envKey as EnvironmentKey);
      
      const asset: QuantumAsset = {
        id: `env-${envKey}`,
        type: 'environment',
        path: env.background,
        metadata: {
          consciousnessTags: metadata.consciousness as [],
          domain: metadata.domain,
          quantumSignature: this.generateQuantumSignature('environment', envKey),
          sensoryIntensity: 'medium',
          preloadPriority: 8
        }
      };
      this.assetRegistry.set(asset.id, asset);

      if (env.foreground) {
        const foregroundAsset: QuantumAsset = {
          id: `env-${envKey}-foreground`,
          type: 'environment',
          path: env.foreground,
          metadata: {
            consciousnessTags: metadata.consciousness as [],
            domain: metadata.domain,
            quantumSignature: this.generateQuantumSignature('environment-foreground', envKey),
            sensoryIntensity: 'medium',
            preloadPriority: 6
          }
        };
        this.assetRegistry.set(foregroundAsset.id, foregroundAsset);
      }
    });
  }

  private static preloadImage(src: string) {
    if (this.preloadedAssets.has(src)) return;
    const img = new Image();
    img.src = src;
    this.preloadedAssets.add(src);
  }

  private static mapDomainToEnvironment(domain: EnvironmentKey): EnvironmentKey | null {
    const domainMap: Partial<Record<EnvironmentKey, EnvironmentKey>> = {
      origin: 'origin',
      observatory: 'observatory', 
      library: 'library',
      music: 'music'
    };
    return domainMap[domain] || 'council';
  }

  private static getDomainEffects(domain: string): string[] {
    // FIXED: Use actual AssetMapper effects
    const effectMap: Record<string, string[]> = {
      quantum: [AssetMapper.effects.magic.purple[0]],
      cosmic: [AssetMapper.effects.magic.blue[0]],
      library: [AssetMapper.effects.particles.glow[0]],
      void: [AssetMapper.effects.magic.purple[1]]
    };
    return effectMap[domain] || [];
  }

  private static assetExists(path: string): boolean {
    return path.length > 0;
  }

  private static generateQuantumSignature(type: string, identifier: string): string {
    const timestamp = Date.now().toString(36);
    return `${type}_${identifier}_${timestamp}`;
  }
}

// Initialize the asset service
AssetService.initialize();

export { AssetMapper };

// Utility function to get environment options for UI
export function getEnvironmentOptions(): Array<{
  value: EnvironmentKey;
  label: string;
  domain: string;
  consciousness: string[];
}> {
  return (Object.keys(AssetMapper.environments) as EnvironmentKey[]).map(key => ({
    value: key,
    label: key.charAt(0).toUpperCase() + key.slice(1),
    ...AssetService.getEnvironmentMetadata(key)
  }));
}

// Quick preload for common environments
export function preloadCommonEnvironments() {
  const commonEnvs: EnvironmentKey[] = ['council', 'library', 'community', 'home'];
  commonEnvs.forEach(env => AssetService.preloadEnvironment(env));
}

export default AssetService;