// src/utils/components/ui/tabs.utils.ts
// ╔═══════════════════════════════════════════════════════════════════════════╗
// ║                    TABS UTILITIES                                         ║
// ║                    Class composition, state resolution                    ║
// ╚═══════════════════════════════════════════════════════════════════════════╝

import { cn } from '@/lib/utils';
import { tabsListVariants, tabsTriggerVariants, tabsPanelVariants } from '@/lib/constants/components/ui/tabs.variants';
import {
  TABS_ORIENTATION,
  TABS_TRIGGER_VARIANT,
  TABS_SIZE,
} from '@/lib/constants/components/ui/tabs.constants';
import type {
  TabsVariant,
  TabsSize,
  TabsOrientation,
} from '@/lib/constants/components/ui/tabs.constants';

// ─── List Class Composition ────────────────────────────────────────────────
export function composeTabsListClasses(params: {
  variant: TabsVariant;
  orientation: TabsOrientation;
  size: TabsSize;
  fullWidth: boolean;
  className?: string;
}): string {
  return cn(
    tabsListVariants({
      variant: params.variant,
      orientation: params.orientation,
      size: params.size,
      fullWidth: params.fullWidth,
    }),
    params.className
  );
}

// ─── Trigger Class Composition ─────────────────────────────────────────────
export function composeTabsTriggerClasses(params: {
  variant: TabsVariant;
  size: TabsSize;
  orientation: TabsOrientation;
  isActive: boolean;
  disabled: boolean;
  className?: string;
}): string {
  const sizeClass = params.size
    ? `${TABS_SIZE[params.size].fontSize} ${TABS_ORIENTATION[params.orientation].triggerPadding}`
    : '';

  const stateClass = params.disabled
    ? 'opacity-50 cursor-not-allowed'
    : params.isActive
      ? TABS_TRIGGER_VARIANT[params.variant].active
      : TABS_TRIGGER_VARIANT[params.variant].inactive;

  return cn(
    tabsTriggerVariants({
      variant: params.variant,
      size: params.size,
      orientation: params.orientation,
      state: params.disabled ? 'disabled' : params.isActive ? 'active' : 'inactive',
    }),
    params.className
  );
}

// ─── Panel Class Composition ───────────────────────────────────────────────
export function composeTabsPanelClasses(params: {
  orientation: TabsOrientation;
  hidden: boolean;
  className?: string;
}): string {
  return cn(
    tabsPanelVariants({
      orientation: params.orientation,
      hidden: params.hidden,
    }),
    params.className
  );
}

// ─── Badge Class Composition ───────────────────────────────────────────────
export function composeTabsBadgeClasses(params: {
  variant: 'default' | 'primary' | 'success' | 'warning';
  className?: string;
}): string {
  const { TABS_BADGE_VARIANT, TABS_BADGE_CLASSES } = require('@/lib/constants/components/ui/tabs.constants');
  const variantColors = TABS_BADGE_VARIANT[params.variant];
  return cn(TABS_BADGE_CLASSES, variantColors.bg, variantColors.text, params.className);
}