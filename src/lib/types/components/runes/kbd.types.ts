// src/types/components/runes/kbd.types.ts
// ╔═══════════════════════════════════════════════════════════════════════════╗
// ║                    KBD TYPES                                              ║
// ║                    All type definitions for the Kbd component             ║
// ╚═══════════════════════════════════════════════════════════════════════════╝

/**
 * Props for the Kbd component.
 * Extends the native HTML <kbd> element attributes.
 *
 * @example
 * <Kbd>⌘</Kbd>
 * <Kbd className="ml-1">Ctrl</Kbd>
 */
export type KbdProps = React.ComponentProps<'kbd'>;

/**
 * Props for the KbdGroup component.
 * Groups multiple Kbd elements to represent key combinations.
 *
 * Note: Renders as a <kbd> element with data-slot="kbd-group"
 * for semantic grouping of keyboard shortcuts.
 *
 * @example
 * <KbdGroup>
 *   <Kbd>⌘</Kbd>
 *   <span>+</span>
 *   <Kbd>K</Kbd>
 * </KbdGroup>
 */
export type KbdGroupProps = React.ComponentProps<'div'>;