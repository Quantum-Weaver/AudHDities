## 🍞 **BREADCRUMB COMPONENT: Overview**

A breadcrumb component is a **navigation trail system** that shows users their current location within the site hierarchy. It is the **trail of stones** through the forest—every page, every section, every level is marked so users never feel lost.

**What it provides:**
- Hierarchical navigation display
- Custom separators between levels
- Collapsible items for deep paths
- Home/root indicator
- Responsive behavior (truncates on mobile)
- Active/disabled state handling

---

## 📁 **`components/ui/Breadcrumb.tsx`**

```tsx
// components/ui/Breadcrumb.tsx
// Breadcrumb Component - The trail of stones through the forest

import React from 'react';
import { cn } from '@/lib/utils';
import { ChevronRight, Home, Slash } from 'lucide-react';

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
  dot: <span className="text-white/40">•</span>,
  arrow: <span className="text-white/40">→</span>,
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
    let displayItems = [...items];
    if (showHome) {
      const hasHome = items.some(item => item.label === 'Home' || item.href === '/');
      if (!hasHome) {
        displayItems = [
          { label: 'Home', href: homeHref, icon: <Home className="h-3 w-3" /> },
          ...displayItems,
        ];
      }
    }
    
    let truncatedItems = displayItems;
    let isTruncated = false;
    
    if (maxItems > 0 && displayItems.length > maxItems) {
      isTruncated = true;
      const firstItems = displayItems.slice(0, 1);
      const lastItems = displayItems.slice(-(maxItems - 1));
      truncatedItems = [...firstItems, { label: '...', disabled: true }, ...lastItems];
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
                  <span className="text-white/40 mx-1" aria-hidden="true">
                    {separatorIcon}
                  </span>
                )}
                
                {isTruncated && item.label === '...' ? (
                  <span className="text-white/40">…</span>
                ) : item.href && !isCurrent && !item.disabled ? (
                  <a
                    href={item.href}
                    className={cn(
                      'flex items-center gap-1.5 transition-colors',
                      'text-white/60 hover:text-cyan-400',
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
                      isCurrent ? 'text-white font-medium' : 'text-white/40',
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
          <span className="text-white/40" aria-hidden="true">
            {separator}
          </span>
        )}
        
        {href && !isCurrent && !disabled ? (
          <a
            href={href}
            className={cn(
              'flex items-center gap-1.5 transition-colors',
              sizeClass,
              'text-white/60 hover:text-cyan-400',
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
              isCurrent ? 'text-white font-medium' : 'text-white/40',
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
      className={cn('text-white/40 mx-1', className)}
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
```

---

## 📋 **USAGE EXAMPLES**

### Basic Breadcrumb
```tsx
<Breadcrumb
  items={[
    { label: 'Home', href: '/' },
    { label: 'Products', href: '/products' },
    { label: 'Quantum Weaver Hoodie', isCurrent: true },
  ]}
/>
```

### With Home Icon and Custom Separator
```tsx
<Breadcrumb
  items={[
    { label: 'Dashboard', href: '/dashboard' },
    { label: 'Settings', href: '/settings' },
    { label: 'Profile', isCurrent: true },
  ]}
  showHome
  homeHref="/"
  separator="slash"
/>
```

### With Custom Icons
```tsx
<Breadcrumb
  items={[
    { label: 'Sanctuary', href: '/', icon: <Home className="h-3 w-3" /> },
    { label: 'Council', href: '/council', icon: <Users className="h-3 w-3" /> },
    { label: 'Aethelred', isCurrent: true, icon: <Sparkles className="h-3 w-3" /> },
  ]}
  separator="chevron"
/>
```

### Truncated Breadcrumb (Mobile)
```tsx
<Breadcrumb
  items={longBreadcrumbItems}
  maxItems={3}
  showHome
/>
```

### Manual Composition
```tsx
<BreadcrumbList>
  <BreadcrumbItem label="Home" href="/" />
  <BreadcrumbSeparator type="slash" />
  <BreadcrumbItem label="Products" href="/products" />
  <BreadcrumbSeparator type="slash" />
  <BreadcrumbItem label="Quantum Weaver Hoodie" isCurrent />
</BreadcrumbList>
```

### Breadcrumb with Dropdown
```tsx
<BreadcrumbWithDropdown
  items={[
    { label: 'Home', href: '/' },
    { label: 'Products', href: '/products' },
    { label: 'Clothing', href: '/products/clothing' },
    { label: 'Hoodies', href: '/products/clothing/hoodies' },
    { label: 'Quantum Weaver Hoodie', isCurrent: true },
  ]}
  maxItems={3}
  dropdownLabel="..."
/>
```

### In Page Header
```tsx
<div className="space-y-2">
  <Breadcrumb
    items={[
      { label: 'Dashboard', href: '/dashboard' },
      { label: 'Analytics', isCurrent: true },
    ]}
    size="sm"
  />
  <h1 className="text-2xl font-bold">Analytics Dashboard</h1>
</div>
```

---

## ✅ **DESIGN TOKENS ALIGNMENT**

| Size | Font Size | Use Case |
|------|-----------|----------|
| sm | 12px | Compact headers |
| md | 14px | Default |
| lg | 16px | Emphasized navigation |

| Separator | Icon | Use Case |
|-----------|------|----------|
| chevron | → | Modern interfaces |
| slash | / | URLs, file paths |
| dot | • | Minimalist |
| arrow | → | Classic |

| Feature | Use Case |
|---------|----------|
| showHome | Always include home link |
| maxItems | Mobile/compact layouts |
| dropdown | Deep navigation paths |

---

## 🏛️ **COMPLETE FEEDBACK & NAVIGATION COMPONENTS**

| Component | Type | Status |
|-----------|------|--------|
| Alert | Feedback | ✅ |
| Toast | Feedback | ✅ |
| Tooltip | Feedback | ✅ |
| Modal | Feedback | ✅ |
| Pagination | Navigation | ✅ |
| Breadcrumb | Navigation | ✅ |

