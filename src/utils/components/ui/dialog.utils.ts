// src/utils/components/ui/dialog.utils.ts
// ╔═══════════════════════════════════════════════════════════════════════════╗
// ║                    DIALOG UTILITIES                                       ║
// ║                    Animation composers for open/close states              ║
// ╚═══════════════════════════════════════════════════════════════════════════╝

import { cn } from '@/lib/utils';

// ─── Overlay Animation Classes ─────────────────────────────────────────────
/** Fade-in on open, fade-out on close — overlay only */
const OVERLAY_OPEN_CLASSES = [
  'data-open:animate-in',
  'data-open:fade-in-0',
] as const;

const OVERLAY_CLOSE_CLASSES = [
  'data-closed:animate-out',
  'data-closed:fade-out-0',
] as const;

// ─── Content Animation Classes ─────────────────────────────────────────────
/** Scale+fade entrance, scale+fade exit — content panel */
const CONTENT_OPEN_CLASSES = [
  'data-open:animate-in',
  'data-open:fade-in-0',
  'data-open:zoom-in-95',
] as const;

const CONTENT_CLOSE_CLASSES = [
  'data-closed:animate-out',
  'data-closed:fade-out-0',
  'data-closed:zoom-out-95',
] as const;

// ═══════════════════════════════════════════════════════════════════════════
// PUBLIC API
// ═══════════════════════════════════════════════════════════════════════════

/**
 * Composes the complete animation classes for the dialog overlay.
 * Fade-only — no scale transform on the backdrop.
 */
export function getDialogOverlayAnimationClasses(): string {
  return cn(...OVERLAY_OPEN_CLASSES, ...OVERLAY_CLOSE_CLASSES);
}

/**
 * Composes the complete animation classes for the dialog content panel.
 * Zoom + fade for a modal entrance feel.
 */
export function getDialogContentAnimationClasses(): string {
  return cn(...CONTENT_OPEN_CLASSES, ...CONTENT_CLOSE_CLASSES);
}

/**
 * Composes all overlay classes: base + animations + custom.
 */
export function composeDialogOverlayClasses(params: {
  baseClasses: string[];
  className?: string;
}): string {
  return cn(
    ...params.baseClasses,
    getDialogOverlayAnimationClasses(),
    params.className
  );
}

/**
 * Composes all content classes: base + animations + custom.
 */
export function composeDialogContentClasses(params: {
  baseClasses: string[];
  className?: string;
}): string {
  return cn(
    ...params.baseClasses,
    getDialogContentAnimationClasses(),
    params.className
  );
}