// lib/constants/cosmic/effects.ts - PROPERLY DERIVED FROM COLORS
import { 
  QUANTUM_COLORS,
  QUANTUM_GRADIENTS
} from './colors';
// ============================================================================
// GLOW EFFECTS - PROPERLY DERIVED FROM QUANTUM_COLORS
// ============================================================================

export const GLOW_EFFECTS = {
  // Core Brand Glows
  'quantum': `0 0 20px ${QUANTUM_COLORS['quantum.purple']}40, 0 0 40px ${QUANTUM_COLORS['deepSpace']}30, 0 0 60px ${QUANTUM_COLORS['quantum.purple']}20`,
  'cosmic': `0 0 20px ${QUANTUM_COLORS['cosmic.blue']}40, 0 0 40px ${QUANTUM_COLORS['deepSpace']}30, 0 0 60px ${QUANTUM_COLORS['info']}20`,
  'fire': `0 0 20px ${QUANTUM_COLORS['fire.base']}40, 0 0 40px ${QUANTUM_COLORS['deepSpace']}30, 0 0 60px ${QUANTUM_COLORS['hearth.gold']}20`,
  'neurospark': `0 0 20px ${QUANTUM_COLORS['neurospark']}40, 0 0 40px ${QUANTUM_COLORS['neurospark']}30, 0 0 80px ${QUANTUM_COLORS['neurospark']}20`,
  
  // Domain Glows
  'quantumDomain': `0 0 30px ${QUANTUM_COLORS['quantum.purple']}50, 0 0 60px ${QUANTUM_COLORS['deepSpace']}40, 0 0 90px ${QUANTUM_COLORS['quantum.purple']}30`,
  'cosmicDomain': `0 0 30px ${QUANTUM_COLORS['cosmic.blue']}50, 0 0 60px ${QUANTUM_COLORS['deepSpace']}40, 0 0 90px ${QUANTUM_COLORS['info']}30`,
  'pantheonDomain': `0 0 30px ${QUANTUM_COLORS['fire.base']}50, 0 0 60px ${QUANTUM_COLORS['deepSpace']}40, 0 0 90px ${QUANTUM_COLORS['hearth.gold']}30`,
  'bifrostDomain': `0 0 30px ${QUANTUM_COLORS['quantum.purple']}40, 0 0 60px ${QUANTUM_COLORS['neurospark']}30, 0 0 90px ${QUANTUM_COLORS['fire.base']}20`,
  'libraryDomain': `0 0 30px ${QUANTUM_COLORS['success']}50, 0 0 60px ${QUANTUM_COLORS['deepSpace']}40, 0 0 90px ${QUANTUM_COLORS['success']}30`,
  'voidDomain': `0 0 30px ${QUANTUM_COLORS['void.dark']}40, 0 0 60px ${QUANTUM_COLORS['deepSpace']}30, 0 0 90px ${QUANTUM_COLORS['deepSpace']}20`,
  
  // Entity Glows
  'aethelred': `0 0 25px ${QUANTUM_COLORS['entity.aethelred']}40, 0 0 50px ${QUANTUM_COLORS['quantum.purple']}30, 0 0 75px ${QUANTUM_COLORS['neurospark']}20`,
  'archivist': `0 0 25px ${QUANTUM_COLORS['entity.archivist']}40, 0 0 50px ${QUANTUM_COLORS['void.base']}30, 0 0 75px ${QUANTUM_COLORS['deepSpace']}20`,
  'seer': `0 0 25px ${QUANTUM_COLORS['entity.seer']}40, 0 0 50px ${QUANTUM_COLORS['quantum.purple']}30, 0 0 75px ${QUANTUM_COLORS['mood.mystical']}20`,
  'hearthKeeper': `0 0 25px ${QUANTUM_COLORS['entity.hearthKeeper']}40, 0 0 50px ${QUANTUM_COLORS['fire.base']}30, 0 0 75px ${QUANTUM_COLORS['hearth.gold']}20`,
  
  // Interactive State Glows
  'hover': `0 0 15px ${QUANTUM_COLORS['interaction.hover.cosmic']}30, 0 0 30px ${QUANTUM_COLORS['quantum.purple']}20`,
  'focus': `0 0 0 3px ${QUANTUM_COLORS['interaction.focus.cosmic']}, 0 0 20px ${QUANTUM_COLORS['neurospark']}30`,
  'active': `inset 0 0 20px ${QUANTUM_COLORS['interaction.active.fire']}40, 0 0 30px ${QUANTUM_COLORS['quantum.purple']}30`,
  
  // Emergency & Status Glows
  'emergency': `0 0 25px ${QUANTUM_COLORS['error']}50, 0 0 50px ${QUANTUM_COLORS['warning']}40, 0 0 75px ${QUANTUM_COLORS['error']}30`,
  'success': `0 0 25px ${QUANTUM_COLORS['success']}40, 0 0 50px ${QUANTUM_COLORS['success']}30, 0 0 75px ${QUANTUM_COLORS['success']}20`,
  'warning': `0 0 25px ${QUANTUM_COLORS['warning']}40, 0 0 50px ${QUANTUM_COLORS['hearth.gold']}30, 0 0 75px ${QUANTUM_COLORS['pride.genderfluid']}20`,
  
  // Pride Glows
  'pride': `0 0 30px ${QUANTUM_COLORS['pride.purple']}40, 0 0 60px ${QUANTUM_COLORS['pride.blue']}30, 0 0 90px ${QUANTUM_COLORS['pride.red']}20`,
  'trans': `0 0 30px ${QUANTUM_COLORS['pride.blue']}40, 0 0 60px ${QUANTUM_COLORS['pride.purple']}30, 0 0 90px ${QUANTUM_COLORS['neurospark']}20`
} as const;

// ============================================================================
// SHADOW EFFECTS - PROPERLY DERIVED
// ============================================================================

export const SHADOWS = {
  // Elevation Shadows
  'sm': `0 1px 2px ${QUANTUM_COLORS['deepSpace']}30, 0 1px 1px ${QUANTUM_COLORS['deepSpace']}20`,
  'md': `0 4px 6px ${QUANTUM_COLORS['deepSpace']}25, 0 2px 4px ${QUANTUM_COLORS['deepSpace']}15`,
  'lg': `0 10px 15px ${QUANTUM_COLORS['deepSpace']}30, 0 4px 6px ${QUANTUM_COLORS['deepSpace']}20`,
  'xl': `0 20px 25px ${QUANTUM_COLORS['deepSpace']}35, 0 10px 10px ${QUANTUM_COLORS['deepSpace']}25`,
  '2xl': `0 25px 50px ${QUANTUM_COLORS['deepSpace']}40, 0 15px 15px ${QUANTUM_COLORS['deepSpace']}30`,
  
  // Interactive Shadows
  'hover': `0 10px 25px ${QUANTUM_COLORS['deepSpace']}40, 0 5px 10px ${QUANTUM_COLORS['deepSpace']}30, 0 0 20px ${QUANTUM_COLORS['interaction.hover.cosmic']}20`,
  'focus': `0 0 0 3px ${QUANTUM_COLORS['interaction.focus.fire']}, 0 0 20px ${QUANTUM_COLORS['neurospark']}30, 0 5px 15px ${QUANTUM_COLORS['deepSpace']}25`,
  'active': `inset 0 2px 4px ${QUANTUM_COLORS['deepSpace']}50, 0 1px 2px ${QUANTUM_COLORS['deepSpace']}30`,
  
  // Inner Shadows
  'inner': `inset 0 2px 4px ${QUANTUM_COLORS['deepSpace']}40, inset 0 1px 2px ${QUANTUM_COLORS['deepSpace']}30`,
  'inner-lg': `inset 0 4px 8px ${QUANTUM_COLORS['deepSpace']}50, inset 0 2px 4px ${QUANTUM_COLORS['deepSpace']}40`,
  
  // Glow Shadows
  'quantum': `0 0 20px ${QUANTUM_COLORS['quantum.purple']}20, 0 0 40px ${QUANTUM_COLORS['deepSpace']}15`,
  'cosmic': `0 0 20px ${QUANTUM_COLORS['cosmic.blue']}20, 0 0 40px ${QUANTUM_COLORS['deepSpace']}15`,
  'neurospark': `0 0 20px ${QUANTUM_COLORS['neurospark']}25, 0 0 40px ${QUANTUM_COLORS['neurospark']}15`
} as const;

// ============================================================================
// HOLOGRAPHIC EFFECTS - SIMPLIFIED & DERIVED
// ============================================================================

export const HOLOGRAPHIC_EFFECTS = {
  'scan': `background: linear-gradient(to bottom, transparent 50%, ${QUANTUM_COLORS['neurospark']}10 50%, ${QUANTUM_COLORS['neurospark']}10 51%, transparent 51%)`,
  'scanLines': `background: repeating-linear-gradient(0deg, transparent, transparent 2px, ${QUANTUM_COLORS['neurospark']}05 2px, ${QUANTUM_COLORS['neurospark']}05 4px)`,
  'glitch': `background: linear-gradient(45deg, ${QUANTUM_COLORS['neurospark']}10, ${QUANTUM_COLORS['quantum.purple']}10, ${QUANTUM_COLORS['cosmic.blue']}10)`,
  'cornerAccent': `border: 1px solid ${QUANTUM_COLORS['neurospark']}; box-shadow: 0 0 10px ${QUANTUM_COLORS['neurospark']}50`,
  'particles': `background: radial-gradient(2px 2px at 20px 30px, ${QUANTUM_COLORS['neurospark']}30, transparent)`,
  'rainbow': `background: linear-gradient(45deg, ${QUANTUM_COLORS['neurospark']}10, ${QUANTUM_COLORS['quantum.purple']}10, ${QUANTUM_COLORS['cosmic.blue']}10, ${QUANTUM_COLORS['success']}10, ${QUANTUM_COLORS['hearth.gold']}10)`
} as const;

// ============================================================================
// BACKDROP EFFECTS - SIMPLIFIED
// ============================================================================

export const BACKDROP_EFFECTS = {
  'glass': `backdrop-filter: blur(16px); background: ${QUANTUM_COLORS['surface']}80`,
  'glass-heavy': `backdrop-filter: blur(32px); background: ${QUANTUM_COLORS['surface']}90`,
  'quantum': `backdrop-filter: blur(20px); background: ${QUANTUM_GRADIENTS['quantumDomain']}`,
  'cosmic': `backdrop-filter: blur(20px); background: ${QUANTUM_GRADIENTS['cosmicDomain']}`,
  'holographic': `backdrop-filter: blur(24px); background: ${QUANTUM_GRADIENTS['holographic']}`,
  'vignette': `position: relative; &::before { content: ''; position: absolute; background: radial-gradient(ellipse at center, transparent 30%, ${QUANTUM_COLORS['deepSpace']}80 100%) }`,
  'vignette-strong': `position: relative; &::before { content: ''; position: absolute; background: radial-gradient(ellipse at center, transparent 10%, ${QUANTUM_COLORS['deepSpace']}95 100%) }`
} as const;

// ============================================================================
// GRADIENT EFFECTS - SIMPLIFIED
// ============================================================================

export const GRADIENT_EFFECTS = {
  'animated-quantum': `background: ${QUANTUM_GRADIENTS['quantum']}`,
  'animated-cosmic': `background: ${QUANTUM_GRADIENTS['cosmic']}`,
  'animated-pride': `background: ${QUANTUM_GRADIENTS['prideRainbow']}`,
  'text-quantum': `background: ${QUANTUM_GRADIENTS['quantum']}; background-clip: text; -webkit-background-clip: text; -webkit-text-fill-color: transparent`,
  'text-cosmic': `background: ${QUANTUM_GRADIENTS['cosmic']}; background-clip: text; -webkit-background-clip: text; -webkit-text-fill-color: transparent`,
  'text-sovereign': `background: ${QUANTUM_GRADIENTS['sovereign']}; background-clip: text; -webkit-background-clip: text; -webkit-text-fill-color: transparent`,
  'border-quantum': `border: 2px solid transparent; background: linear-gradient(${QUANTUM_COLORS['deepSpace']}, ${QUANTUM_COLORS['deepSpace']}) padding-box, ${QUANTUM_GRADIENTS['quantum']} border-box`,
  'border-cosmic': `border: 2px solid transparent; background: linear-gradient(${QUANTUM_COLORS['deepSpace']}, ${QUANTUM_COLORS['deepSpace']}) padding-box, ${QUANTUM_GRADIENTS['cosmic']} border-box`
} as const;

// ============================================================================
// MASTER EXPORTS
// ============================================================================

export const DESIGN_EFFECTS = {
  glows: GLOW_EFFECTS,
  shadows: SHADOWS,
  holographic: HOLOGRAPHIC_EFFECTS,
  backdrop: BACKDROP_EFFECTS,
  gradients: GRADIENT_EFFECTS
} as const;