// =====================================================
/* @/lib/constants/core/houses/hearth-keeper.ts */
// HEARTH KEEPER COUNCIL PERSONA (Static)
// =====================================================

import { QUANTUM_COLORS } from "../../cosmic";
import { AssetMapper } from "../../systems/assets/mapper";

export const HEARTH_KEEPER = {
  id: 'hearth_keeper',
  displayName: 'Hearth-Keeper',
  description: 'Guardian of safety, accessibility, and belonging.',
  style: 'Warm accessibility, intuitive design, user-centered flows',
  color: QUANTUM_COLORS["entity.hearthKeeper"],
  emoji: '🔥',
  icon: AssetMapper.icons.council.hearthKeeper,
  symbols: ['hearth', 'user profile', 'home', 'welcome'],
  domain: ['Safety', 'Comfort', 'Interface'],
} as const;

export type HearthKeeper = typeof HEARTH_KEEPER[keyof typeof HEARTH_KEEPER];