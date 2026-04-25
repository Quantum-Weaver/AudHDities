/* @/components/ui/Kbd.tsx */
// ╔═══════════════════════════════════════════════════════════════════════════╗
// ║                    KBD COMPONENT                                          ║
// ║                    Keyboard shortcut indicator                            ║
// ╚═══════════════════════════════════════════════════════════════════════════╝

'use client';

import { cn } from '@/lib/utils';

// ─── Types ─────────────────────────────────────────────────────────────────
import type { KbdProps, KbdGroupProps } from '@/types/components/ui/kbd.types';

// ─── Constants ─────────────────────────────────────────────────────────────
import {
  KBD_BASE_CLASSES,
  KBD_COLOR_CLASSES,
  KBD_TOOLTIP_COLOR_CLASSES,
  KBD_DARK_TOOLTIP_CLASSES,
  KBD_SVG_CLASSES,
  KBD_GROUP_BASE_CLASSES,
} from '@/lib/constants/components/runes/kbd.constants';

// ═══════════════════════════════════════════════════════════════════════════
// KBD
// ═══════════════════════════════════════════════════════════════════════════

/**
 * Kbd — Displays a keyboard key or shortcut indicator.
 *
 * Automatically adapts its color scheme when nested inside a TooltipContent.
 *
 * @example
 * <Kbd>⌘</Kbd>
 *
 * @example
 * <Kbd className="ml-1">
 *   <SettingsIcon className="size-3" />
 *   S
 * </Kbd>
 */
function Kbd({ className, ...props }: KbdProps) {
  return (
    <kbd
      data-slot="kbd"
      className={cn(
        ...KBD_BASE_CLASSES,
        ...KBD_COLOR_CLASSES,
        ...KBD_TOOLTIP_COLOR_CLASSES,
        ...KBD_DARK_TOOLTIP_CLASSES,
        ...KBD_SVG_CLASSES,
        className
      )}
      {...props}
    />
  );
}

// ═══════════════════════════════════════════════════════════════════════════
// KBD GROUP
// ═══════════════════════════════════════════════════════════════════════════

/**
 * KbdGroup — Groups multiple Kbd elements for key combinations.
 *
 * Renders as a semantic <kbd> container to indicate the keys
 * should be pressed together.
 *
 * @example
 * <KbdGroup>
 *   <Kbd>⌘</Kbd>
 *   <span className="text-white/40">+</span>
 *   <Kbd>K</Kbd>
 * </KbdGroup>
 */
function KbdGroup({ className, ...props }: KbdGroupProps) {
  return (
    <kbd
      data-slot="kbd-group"
      className={cn(...KBD_GROUP_BASE_CLASSES, className)}
      {...props}
    />
  );
}

// ═══════════════════════════════════════════════════════════════════════════
// EXPORTS
// ═══════════════════════════════════════════════════════════════════════════

export { Kbd, KbdGroup };
export type { KbdProps, KbdGroupProps } from '@/types/components/ui/kbd.types';