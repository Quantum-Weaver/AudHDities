// src/lib/utils/components/vegvisir/breadcrumb.utils.ts
// ╔═══════════════════════════════════════════════════════════════════════════╗
// ║                    BREADCRUMB UTILITIES                                   ║
// ║                    Pure logic — path building, truncation, separators     ║
// ╚═══════════════════════════════════════════════════════════════════════════╝

import { ChevronRight, Slash } from 'lucide-react';
import type { ReactNode } from 'react';
import type {
  BreadcrumbItem,
  BreadcrumbSeparatorType,
} from '@/types/components/vegvisir/breadcrumb.types';

// ─── Separator Icon Map ────────────────────────────────────────────────────
/** Maps separator type to its rendered icon element */
export function getSeparatorIcon(type: BreadcrumbSeparatorType): ReactNode {
  const map: Record<BreadcrumbSeparatorType, ReactNode> = {
    chevron: ChevronRight({ className: 'h-3 w-3' }),
    slash: Slash({ className: 'h-3 w-3' }),
    dot: '•',
    arrow: '→',
  };
  return map[type] ?? map.chevron;
}

// ─── Home Item ─────────────────────────────────────────────────────────────
/**
 * Ensures a Home item exists at the start of the breadcrumb trail.
 * Only adds if no existing item has label "Home" or href "/".
 */
export function ensureHomeItem(
  items: BreadcrumbItem[],
  homeHref: string = '/'
): BreadcrumbItem[] {
  const hasHome = items.some(
    (item) => item.label === 'Home' || item.href === '/'
  );

  if (hasHome) return items;

  return [
    {
      label: 'Home',
      href: homeHref,
      icon: '🏠',
    },
    ...items,
  ];
}

// ─── Truncation ────────────────────────────────────────────────────────────
export interface TruncationResult {
  /** Items to display (first + ellipsis + last N) */
  visibleItems: BreadcrumbItem[];
  /** Items hidden behind the ellipsis dropdown */
  hiddenItems: BreadcrumbItem[];
  /** Whether truncation was applied */
  isTruncated: boolean;
}

/**
 * Truncate a breadcrumb trail to show first item + last N items.
 * Hidden middle items are returned separately for dropdown rendering.
 *
 * @example
 * truncateItems([a, b, c, d, e, f], 4)
 * // => { visible: [a, '...', d, e, f], hidden: [b, c], isTruncated: true }
 */
export function truncateItems(
  items: BreadcrumbItem[],
  maxItems: number
): TruncationResult {
  if (maxItems <= 0 || items.length <= maxItems) {
    return {
      visibleItems: items,
      hiddenItems: [],
      isTruncated: false,
    };
  }

  const firstItem = items.slice(0, 1);
  const lastItems = items.slice(-(maxItems - 1));
  const hiddenItems = items.slice(1, -(maxItems - 1));

  const ellipsisItem: BreadcrumbItem = {
    label: '...',
    disabled: true,
  };

  return {
    visibleItems: [...firstItem, ellipsisItem, ...lastItems],
    hiddenItems,
    isTruncated: true,
  };
}

// ─── Path Parsing ──────────────────────────────────────────────────────────
/**
 * Build breadcrumb items from a URL pathname.
 *
 * @example
 * pathToItems('/library/quests/active')
 * // => [
 * //   { label: 'Library', href: '/library' },
 * //   { label: 'Quests', href: '/library/quests' },
 * //   { label: 'Active', isCurrent: true },
 * // ]
 */
export function pathToItems(
  pathname: string,
  labelMap?: Record<string, string>
): BreadcrumbItem[] {
  const segments = pathname.split('/').filter(Boolean);

  if (segments.length === 0) {
    return [{ label: 'Home', href: '/', isCurrent: true }];
  }

  return segments.map((segment, index) => {
    const href = '/' + segments.slice(0, index + 1).join('/');
    const isLast = index === segments.length - 1;
    const label = labelMap?.[segment] ?? capitalizePathSegment(segment);

    return {
      label,
      href: isLast ? undefined : href,
      isCurrent: isLast,
    };
  });
}

/**
 * Build breadcrumb items from a Next.js pathname with dynamic segment labels.
 * Dynamic segments like [id] are displayed with their raw bracket notation
 * unless overridden by `dynamicLabels`.
 */
export function pathToItemsWithDynamic(
  pathname: string,
  labelMap?: Record<string, string>,
  dynamicLabels?: Record<string, string>
): BreadcrumbItem[] {
  const segments = pathname.split('/').filter(Boolean);

  if (segments.length === 0) {
    return [{ label: 'Home', href: '/', isCurrent: true }];
  }

  return segments.map((segment, index) => {
    const href = '/' + segments.slice(0, index + 1).join('/');
    const isLast = index === segments.length - 1;

    let label: string;
    if (dynamicLabels && segment in dynamicLabels) {
      label = dynamicLabels[segment];
    } else if (labelMap && segment in labelMap) {
      label = labelMap[segment];
    } else {
      label = capitalizePathSegment(segment);
    }

    return {
      label,
      href: isLast ? undefined : href,
      isCurrent: isLast,
    };
  });
}

// ─── Helpers ───────────────────────────────────────────────────────────────
/**
 * Capitalize a URL path segment for display.
 * Handles kebab-case, snake_case, and camelCase.
 */
function capitalizePathSegment(segment: string): string {
  return segment
    .replace(/[-_]/g, ' ')
    .replace(/([a-z])([A-Z])/g, '$1 $2')
    .split(' ')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

/**
 * Check if a breadcrumb item is the last in the trail.
 */
export function isLastItem(
  items: BreadcrumbItem[],
  index: number
): boolean {
  return index === items.length - 1;
}

/**
 * Check if a breadcrumb item is the ellipsis placeholder.
 */
export function isEllipsisItem(item: BreadcrumbItem): boolean {
  return item.label === '...' && item.disabled === true;
}

// ─── Click Outside Hook ────────────────────────────────────────────────────
/**
 * A lightweight click-outside handler for dropdown toggles.
 * Returns a ref to attach to the dropdown container.
 *
 * Usage:
 * ```tsx
 * const ref = useClickOutside<HTMLDivElement>(() => setIsOpen(false));
 * return <div ref={ref}>...</div>;
 * ```
 *
 * Note: This is exported for use by the component. If you prefer
 * a dedicated hooks file, this can move to `hooks/useClickOutside.ts`.
 */
export function buildClickOutsideHandler(
  isOpen: boolean,
  onClose: () => void
): {
  /** Attach to the dropdown container ref */
  onMount: (element: HTMLElement | null) => void;
} {
  let element: HTMLElement | null = null;

  const handleMouseDown = (event: MouseEvent) => {
    if (element && !element.contains(event.target as Node)) {
      onClose();
    }
  };

  return {
    onMount: (el: HTMLElement | null) => {
      if (element) {
        document.removeEventListener('mousedown', handleMouseDown);
      }

      element = el;

      if (isOpen && element) {
        document.addEventListener('mousedown', handleMouseDown);
      }
    },
  };
}