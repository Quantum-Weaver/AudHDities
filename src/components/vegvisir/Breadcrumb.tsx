// components/vegvisir/Breadcrumb.tsx
// ╔═══════════════════════════════════════════════════════════════════════════╗
// ║                    BREADCRUMB COMPONENT                                   ║
// ║                    The trail of stones through the forest                 ║
// ╚═══════════════════════════════════════════════════════════════════════════╝

import React, { useState, useRef, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { ChevronRight, Home, Slash, MoreHorizontal } from 'lucide-react';
import { ensureHomeItem, truncateItems } from '@/lib/utils/components/vegvisir/breadcrumb.utils';

export type BreadcrumbSize = 'sm' | 'md' | 'lg';
export type BreadcrumbSeparator = 'chevron' | 'slash' | 'dot' | 'arrow';

export interface BreadcrumbItem {
  label: string;
  href?: string;
  icon?: React.ReactNode;
  isCurrent?: boolean;
  disabled?: boolean;
}

export interface BreadcrumbProps extends React.HTMLAttributes<HTMLElement> {
  items: BreadcrumbItem[];
  size?: BreadcrumbSize;
  separator?: BreadcrumbSeparator;
  showHome?: boolean;
  homeHref?: string;
  maxItems?: number;
}

const sizeClasses: Record<BreadcrumbSize, string> = {
  sm: 'text-xs',
  md: 'text-sm',
  lg: 'text-base',
};

const separatorIcons: Record<BreadcrumbSeparator, React.ReactNode> = {
  chevron: <ChevronRight className="h-3 w-3" />,
  slash: <Slash className="h-3 w-3" />,
  dot: <span className="text-star-dust/40">•</span>,
  arrow: <span className="text-star-dust/40">→</span>,
};

/**
 * Breadcrumb Component
 */
export const Breadcrumb = React.forwardRef<HTMLElement, BreadcrumbProps>(
  (
    {
      items,
      size = 'md',
      separator = 'chevron',
      showHome = true,
      homeHref = '/',
      maxItems = 0,
      className,
      ...props
    },
    ref
  ) => {
const displayItems = showHome
  ? ensureHomeItem(items, homeHref)
  : [...items];
    
  let truncatedItems = displayItems;
  let isTruncated = false;
  let hiddenItems: BreadcrumbItem[] = [];

  if (maxItems > 0 && displayItems.length > maxItems) {
    ({ visibleItems: truncatedItems, hiddenItems, isTruncated } = truncateItems(displayItems, maxItems));
  }
    
    const separatorIcon = separatorIcons[separator];
    
    return (
      <nav
        ref={ref}
        aria-label="Breadcrumb"
        className={cn('flex items-center flex-wrap', sizeClasses[size], className)}
        {...props}
      >
        <ol className="flex flex-wrap items-center gap-1">
          {truncatedItems.map((item, index) => {
            const isLast = index === truncatedItems.length - 1;
            const isCurrent = item.isCurrent || isLast;
            
            return (
              <li key={index} className="flex items-center gap-1">
                {index > 0 && (
                  <span className="text-star-dust/40 mx-1" aria-hidden="true">
                    {separatorIcon}
                  </span>
                )}
                
                {isTruncated && item.label === '...' ? (
                  <BreadcrumbDropdown items={hiddenItems} separator={separator} size={size} />
                ) : item.href && !isCurrent && !item.disabled ? (
                  <a
                    href={item.href}
                    className={cn(
                      'flex items-center gap-1.5 transition-colors',
                      'text-star-dust/60 hover:text-neurospark',
                      'focus:outline-none focus:ring-2 focus:ring-cyan-400/20 rounded'
                    )}
                  >
                    {item.icon}
                    <span>{item.label}</span>
                  </a>
                ) : (
                  <span
                    className={cn(
                      'flex items-center gap-1.5',
                      isCurrent ? 'text-star-dust font-medium' : 'text-star-dust/40',
                      item.disabled && 'opacity-50 cursor-not-allowed'
                    )}
                    aria-current={isCurrent ? 'page' : undefined}
                  >
                    {item.icon}
                    <span>{item.label}</span>
                  </span>
                )}
              </li>
            );
          })}
        </ol>
      </nav>
    );
  }
);

Breadcrumb.displayName = 'Breadcrumb';

// ============================================================================
// BREADCRUMB DROPDOWN (for truncated items)
// ============================================================================

export interface BreadcrumbDropdownProps {
  items: BreadcrumbItem[];
  separator?: BreadcrumbSeparator;
  size?: BreadcrumbSize;
  dropdownLabel?: string;
}

const BreadcrumbDropdown = React.forwardRef<HTMLDivElement, BreadcrumbDropdownProps>(
  ({ items, separator = 'chevron', size = 'md', dropdownLabel = '...' }, ref) => {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);
    
    useEffect(() => {
      const handleClickOutside = (event: MouseEvent) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
          setIsOpen(false);
        }
      };
      
      if (isOpen) {
        document.addEventListener('mousedown', handleClickOutside);
      }
      
      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
      };
    }, [isOpen]);
    
    const separatorIcon = separatorIcons[separator];
    const sizeClass = sizeClasses[size];
    
    return (
      <div ref={ref} className="relative inline-flex items-center">
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className={cn(
            'flex items-center gap-1 transition-colors',
            sizeClass,
            'text-star-dust/60 hover:text-neurospark',
            'focus:outline-none focus:ring-2 focus:ring-cyan-400/20 rounded'
          )}
          aria-label="Show more breadcrumb items"
          aria-expanded={isOpen}
        >
          <MoreHorizontal className="h-3 w-3" />
          <span>{dropdownLabel}</span>
        </button>
        
        {isOpen && (
          <div
            ref={dropdownRef}
            className="absolute left-0 top-full mt-2 z-50 min-w-[160px] rounded-lg bg-surface border border-white/10 shadow-lg py-1 animate-in fade-in zoom-in-95 duration-100"
          >
            {items.map((item, idx) => (
              <React.Fragment key={idx}>
                {idx > 0 && (
                  <div className="px-3 py-1">
                    <span className="text-star-dust/20 text-xs">{separatorIcon}</span>
                  </div>
                )}
                {item.href && !item.disabled ? (
                  <a
                    href={item.href}
                    className="block px-3 py-1.5 text-sm text-star-dust/80 hover:bg-white/5 transition-colors"
                    onClick={() => setIsOpen(false)}
                  >
                    <span className="flex items-center gap-2">
                      {item.icon && <span className="text-star-dust/40">{item.icon}</span>}
                      {item.label}
                    </span>
                  </a>
                ) : (
                  <span
                    className={cn(
                      'block px-3 py-1.5 text-sm',
                      item.isCurrent ? 'text-neurospark' : 'text-star-dust/40',
                      item.disabled && 'opacity-50 cursor-not-allowed'
                    )}
                  >
                    <span className="flex items-center gap-2">
                      {item.icon && <span className="text-star-dust/40">{item.icon}</span>}
                      {item.label}
                    </span>
                  </span>
                )}
              </React.Fragment>
            ))}
          </div>
        )}
      </div>
    );
  }
);
BreadcrumbDropdown.displayName = 'BreadcrumbDropdown';

// ============================================================================
// BREADCRUMB ITEM (Individual)
// ============================================================================

export interface BreadcrumbItemComponentProps {
  label: string;
  href?: string;
  icon?: React.ReactNode;
  isCurrent?: boolean;
  disabled?: boolean;
  isLast?: boolean;
  separator?: React.ReactNode;
  size?: BreadcrumbSize;
  className?: string;
}

export const BreadcrumbItem = React.forwardRef<HTMLLIElement, BreadcrumbItemComponentProps>(
  (
    {
      label,
      href,
      icon,
      isCurrent = false,
      disabled = false,
      isLast = false,
      separator,
      size = 'md',
      className,
      ...props
    },
    ref
  ) => {
    const sizeClass = sizeClasses[size];
    
    return (
      <li
        ref={ref}
        className={cn('flex items-center gap-1', className)}
        {...props}
      >
        {separator && (
          <span className="text-star-dust/40" aria-hidden="true">
            {separator}
          </span>
        )}
        
        {href && !isCurrent && !disabled ? (
          <a
            href={href}
            className={cn(
              'flex items-center gap-1.5 transition-colors',
              sizeClass,
              'text-star-dust/60 hover:text-neurospark',
              'focus:outline-none focus:ring-2 focus:ring-cyan-400/20 rounded'
            )}
          >
            {icon}
            <span>{label}</span>
          </a>
        ) : (
          <span
            className={cn(
              'flex items-center gap-1.5',
              sizeClass,
              isCurrent ? 'text-star-dust font-medium' : 'text-star-dust/40',
              disabled && 'opacity-50 cursor-not-allowed'
            )}
            aria-current={isCurrent ? 'page' : undefined}
          >
            {icon}
            <span>{label}</span>
          </span>
        )}
      </li>
    );
  }
);
BreadcrumbItem.displayName = 'BreadcrumbItem';

// ============================================================================
// BREADCRUMB SEPARATOR
// ============================================================================

export interface BreadcrumbSeparatorComponentProps {
  children?: React.ReactNode;
  type?: BreadcrumbSeparator;
  className?: string;
}

export const BreadcrumbSeparator = React.forwardRef<HTMLSpanElement, BreadcrumbSeparatorComponentProps>(
  ({ children, type = 'chevron', className, ...props }, ref) => (
    <span
      ref={ref}
      className={cn('text-star-dust/40 mx-1', className)}
      aria-hidden="true"
      {...props}
    >
      {children || separatorIcons[type]}
    </span>
  )
);
BreadcrumbSeparator.displayName = 'BreadcrumbSeparator';

// ============================================================================
// BREADCRUMB LIST
// ============================================================================

export interface BreadcrumbListProps extends React.HTMLAttributes<HTMLOListElement> {
  size?: BreadcrumbSize;
}

export const BreadcrumbList = React.forwardRef<HTMLOListElement, BreadcrumbListProps>(
  ({ children, size = 'md', className, ...props }, ref) => (
    <ol
      ref={ref}
      className={cn('flex flex-wrap items-center gap-1', sizeClasses[size], className)}
      {...props}
    >
      {children}
    </ol>
  )
);
BreadcrumbList.displayName = 'BreadcrumbList';

// ============================================================================
// BREADCRUMB WITH DROPDOWN (Pre-configured)
// ============================================================================

export interface BreadcrumbWithDropdownProps extends Omit<BreadcrumbProps, 'maxItems'> {
  /** Maximum number of items to show before truncation */
  maxItems?: number;
  /** Custom label for the dropdown trigger */
  dropdownLabel?: string;
}

/**
 * BreadcrumbWithDropdown - Pre-configured breadcrumb with dropdown for long paths
 * 
 * @example
 * <BreadcrumbWithDropdown
 *   items={longBreadcrumbItems}
 *   maxItems={3}
 *   showHome
 * />
 */
export const BreadcrumbWithDropdown = React.forwardRef<HTMLElement, BreadcrumbWithDropdownProps>(
  ({ items, maxItems = 3, dropdownLabel = '...', ...props }, ref) => {
    return (
      <Breadcrumb
        ref={ref}
        items={items}
        maxItems={maxItems}
        {...props}
      />
    );
  }
);
BreadcrumbWithDropdown.displayName = 'BreadcrumbWithDropdown';