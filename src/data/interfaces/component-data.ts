// app/data/interfaces/component-data.ts - UPDATED WITH MAPPING
import { BUTTON_VARIANTS, CARD_VARIANTS } from '@/lib/constants/components/ui/variants';

export const COMPONENT_DATA = {
  buttons: {
    variants: {
      // Map simple names to rich variant configurations
      sovereign: BUTTON_VARIANTS.sovereign_primary,
      quantum: BUTTON_VARIANTS.quantum_ghost, 
      emergency: BUTTON_VARIANTS.emergency_action,
      cosmic: BUTTON_VARIANTS.collaborative_secondary
    }
  },
  
  cards: {
    variants: {
      // Map simple names to rich card variants  
      portal: CARD_VARIANTS.portal_transition,
      feature: CARD_VARIANTS.entity_profile,
      emergency: CARD_VARIANTS.interactive_control,
      holographic: CARD_VARIANTS.data_display
    }
  },
  
  icons: {
    domains: {
      quantum: { color: 'text-quantum-purple', glow: 'glow-quantum' },
      cosmic: { color: 'text-cosmic-blue', glow: 'glow-cosmic' },
      library: { color: 'text-arcane-gold', glow: 'glow-fire' },
      void: { color: 'text-gray-400', glow: 'glow-void' }
    }
  }
} as const;