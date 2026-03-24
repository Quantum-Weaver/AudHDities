// src/utils/gaia/assets.ts - FIXED VERSION
import { HearthKeeperIcon } from '@/components/ui/icons';
import { councilMetadata } from '@/data';
import { QUANTUM_COLORS, DOMAIN_COLORS, CONSCIOUSNESS_LEVEL_COLORS } from '@/lib/constants';
import { ICON_VARIANTS } from '@/lib/constants/components/ui';
import { AssetMapper, EnvironmentKey } from '@/lib/constants/systems/assets/mapper';
import type { 
  IconName, 
  DesignTokenCategory, 
  ConsciousnessMode, 
  CouncilEntity
} from '@/types/cosmic/primitives';
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
    consciousnessTags: ConsciousnessMode[];
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

  static getEntityAssets(entity: CouncilEntity): { icon: string; effects: string[] } {
    const iconPath = this.getEntityIcon(entity);
    const effects = this.getEntityEffects(entity);
    
    return { icon: iconPath, effects };
  }

  static getAvailableEnvironments(): EnvironmentKey[] {
    return Object.keys(AssetMapper.environments) as EnvironmentKey[];
  }

  static getEnvironmentMetadata(key: EnvironmentKey): { domain: string; consciousness: string[] } {
    const metadataMap: Record<EnvironmentKey, { domain: string; consciousness: string[] }> = {
      council: { domain: 'council', consciousness: ['sovereign_focused', 'quantum_entangled'] },
      library: { domain: 'library', consciousness: ['collaborative_shared', 'quantum_entangled'] },
      community: { domain: 'community', consciousness: ['collaborative_shared', 'receptive_open'] },
      gateway: { domain: 'gateway', consciousness: ['collaborative_shared', 'receptive_open'] },
      cure: { domain: 'lounge', consciousness: ['collaborative_shared', 'receptive_open'] },
      music: { domain: 'music', consciousness: ['receptive_open', 'quantum_entangled'] },
      origin: { domain: 'origin', consciousness: ['sovereign_focused', 'receptive_open'] },
      support: { domain: 'support', consciousness: ['collaborative_shared'] },
      home: { domain: 'home', consciousness: ['collaborative_shared', 'receptive_open'] },
      observatory: { domain: 'observatory', consciousness: ['quantum_entangled', 'sovereign_focused'] },
      architecture: { domain: 'architecture', consciousness: ['sovereign_focused', 'quantum_entangled'] },
      invitation: { domain: 'invitation', consciousness: ['receptive_open', 'collaborative_shared'] },
      lounge: { domain: 'lounge', consciousness: ['collaborative_shared', 'receptive_open'] }
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
          consciousnessTags: metadata.consciousness as ConsciousnessMode[],
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
            consciousnessTags: metadata.consciousness as ConsciousnessMode[],
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

  private static getEntityEffects(entity: CouncilEntity): string[] {
    const entityEffectMap: Partial<Record<CouncilEntity, string[]>> = {
      aethelred: [AssetMapper.effects.glows.magic[0]],
      archivist: [AssetMapper.effects.magic.blue[0]],
      seer: [AssetMapper.effects.magic.purple[1]],
      'hearth-keeper': [AssetMapper.effects.particles.glow[0]]
    };
    return entityEffectMap[entity] || [];
  }

  private static getEntityIcon(entity: CouncilEntity): string {
    const entityIconMap: Partial<Record<CouncilEntity, string>> = {
      aethelred: AssetMapper.icons.council.aethelred,
      archivist: AssetMapper.icons.council.archivist,
      seer: AssetMapper.icons.council.seer,
      'hearth-keeper': AssetMapper.icons.council.hearthKeeper
    };
    return entityIconMap[entity] || AssetMapper.icons.council.aethelred;
  }

  private static getIconPath(name: IconName): string {
    return `/icons/${name}.svg`;
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