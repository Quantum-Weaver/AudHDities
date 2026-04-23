## 🔲 **GRID LAYOUT COMPONENT: Overview**

A grid layout component is a **responsive arrangement system** that handles columns, gaps, and alignment consistently across all components. It is the **skeletal framework** upon which our UI components are placed—every dashboard, every gallery, every card grid uses it.

**What it replaces:**
- Manual CSS Grid classes scattered across components
- Inconsistent responsive breakpoint logic
- Hardcoded column counts that break on different screens

**What it provides:**
- Responsive columns (mobile → tablet → desktop → wide)
- Consistent gap spacing (based on our design tokens)
- Auto-fit and auto-fill options for dynamic content
- Column span and row span support
- Nested grid support

---

## 📁 **`components/ui/Grid.tsx`**

```tsx
// components/ui/Grid.tsx
// Grid Layout Component - The skeletal framework of the UI
// Provides responsive column layouts with consistent gaps
// Uses COSMIC design tokens for spacing values

import React from 'react';
import { cn } from '@/lib/utils';

export type GridSpacing = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'none';
export type GridAlign = 'start' | 'center' | 'end' | 'stretch';
export type GridJustify = 'start' | 'center' | 'end' | 'between' | 'around' | 'evenly';
export type GridFlow = 'row' | 'col' | 'row-dense' | 'col-dense';

export interface GridProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Gap between grid items */
  gap?: GridSpacing;
  /** Number of columns on mobile (0 = auto) */
  cols?: number | string;
  /** Number of columns on tablet (0 = auto) */
  colsMd?: number | string;
  /** Number of columns on desktop (0 = auto) */
  colsLg?: number | string;
  /** Number of columns on wide screens (0 = auto) */
  colsXl?: number | string;
  /** Minimum column width (for auto-fit/fill) */
  minColWidth?: string;
  /** Use auto-fit instead of fixed columns */
  autoFit?: boolean;
  /** Use auto-fill instead of fixed columns */
  autoFill?: boolean;
  /** Vertical alignment of grid items */
  align?: GridAlign;
  /** Horizontal alignment of grid items */
  justify?: GridJustify;
  /** Grid flow direction */
  flow?: GridFlow;
  /** Row gap (overrides gap for rows) */
  rowGap?: GridSpacing;
  /** Column gap (overrides gap for columns) */
  colGap?: GridSpacing;
  /** Responsive gap overrides */
  responsiveGap?: {
    mobile?: GridSpacing;
    tablet?: GridSpacing;
    desktop?: GridSpacing;
    wide?: GridSpacing;
  };
  /** As child element (render as child instead of div) */
  asChild?: boolean;
}

const gapMap: Record<GridSpacing, string> = {
  xs: 'gap-1',      // 4px
  sm: 'gap-2',      // 8px
  md: 'gap-4',      // 16px
  lg: 'gap-6',      // 24px
  xl: 'gap-8',      // 32px
  '2xl': 'gap-12',  // 48px
  none: 'gap-0',
};

const rowGapMap: Record<GridSpacing, string> = {
  xs: 'gap-y-1',
  sm: 'gap-y-2',
  md: 'gap-y-4',
  lg: 'gap-y-6',
  xl: 'gap-y-8',
  '2xl': 'gap-y-12',
  none: 'gap-y-0',
};

const colGapMap: Record<GridSpacing, string> = {
  xs: 'gap-x-1',
  sm: 'gap-x-2',
  md: 'gap-x-4',
  lg: 'gap-x-6',
  xl: 'gap-x-8',
  '2xl': 'gap-x-12',
  none: 'gap-x-0',
};

const alignMap: Record<GridAlign, string> = {
  start: 'items-start',
  center: 'items-center',
  end: 'items-end',
  stretch: 'items-stretch',
};

const justifyMap: Record<GridJustify, string> = {
  start: 'justify-start',
  center: 'justify-center',
  end: 'justify-end',
  between: 'justify-between',
  around: 'justify-around',
  evenly: 'justify-evenly',
};

const flowMap: Record<GridFlow, string> = {
  row: 'grid-flow-row',
  col: 'grid-flow-col',
  'row-dense': 'grid-flow-row-dense',
  'col-dense': 'grid-flow-col-dense',
};

/**
 * Convert column count to Tailwind grid-cols class
 */
const getColsClass = (cols: number | string | undefined): string => {
  if (!cols || cols === 'auto' || cols === 0) return '';
  if (typeof cols === 'number') return `grid-cols-${cols}`;
  return cols;
};

/**
 * Grid Component
 * 
 * A flexible layout component for responsive grid arrangements.
 * 
 * @example
 * <Grid cols={2} gap="md">
 *   <Card>Item 1</Card>
 *   <Card>Item 2</Card>
 *   <Card>Item 3</Card>
 *   <Card>Item 4</Card>
 * </Grid>
 * 
 * @example
 * <Grid 
 *   cols={1} 
 *   colsMd={2} 
 *   colsLg={3} 
 *   colsXl={4} 
 *   gap="lg"
 * >
 *   {products.map(product => <ProductCard key={product.id} {...product} />)}
 * </Grid>
 * 
 * @example
 * <Grid minColWidth="300px" autoFit gap="md">
 *   {items.map(item => <div key={item.id}>{item.content}</div>)}
 * </Grid>
 */
export const Grid = React.forwardRef<HTMLDivElement, GridProps>(
  (
    {
      children,
      gap = 'md',
      cols,
      colsMd,
      colsLg,
      colsXl,
      minColWidth,
      autoFit = false,
      autoFill = false,
      align = 'stretch',
      justify = 'start',
      flow = 'row',
      rowGap,
      colGap,
      responsiveGap,
      asChild = false,
      className,
      ...props
    },
    ref
  ) => {
    // Determine gap classes
    let gapClass = gapMap[gap];
    let rowGapClass = rowGap ? rowGapMap[rowGap] : '';
    let colGapClass = colGap ? colGapMap[colGap] : '';
    
    // Apply responsive gap if provided
    if (responsiveGap) {
      const classes: string[] = [];
      if (responsiveGap.mobile) classes.push(gapMap[responsiveGap.mobile]);
      if (responsiveGap.tablet) classes.push(`md:${gapMap[responsiveGap.tablet]}`);
      if (responsiveGap.desktop) classes.push(`lg:${gapMap[responsiveGap.desktop]}`);
      if (responsiveGap.wide) classes.push(`xl:${gapMap[responsiveGap.wide]}`);
      if (classes.length > 0) gapClass = classes.join(' ');
    }
    
    // Determine column classes
    let colsClass = '';
    
    // Auto-fit/fill with min width
    if (minColWidth) {
      const repeatType = autoFit ? 'auto-fit' : autoFill ? 'auto-fill' : '';
      if (repeatType) {
        colsClass = `grid-cols-[repeat(${repeatType},minmax(${minColWidth},1fr))]`;
      }
    } 
    // Fixed columns
    else {
      const baseCols = getColsClass(cols);
      const mdCols = colsMd ? getColsClass(colsMd) : '';
      const lgCols = colsLg ? getColsClass(colsLg) : '';
      const xlCols = colsXl ? getColsClass(colsXl) : '';
      
      colsClass = cn(
        baseCols,
        mdCols && `md:${mdCols}`,
        lgCols && `lg:${lgCols}`,
        xlCols && `xl:${xlCols}`
      );
    }
    
    // Base classes
    const baseClasses = cn(
      'grid',
      colsClass,
      gapClass,
      rowGapClass,
      colGapClass,
      alignMap[align],
      justifyMap[justify],
      flowMap[flow],
      className
    );
    
    return (
      <div ref={ref} className={baseClasses} {...props}>
        {children}
      </div>
    );
  }
);

Grid.displayName = 'Grid';

// ============================================================================
// SUB-COMPONENTS
// ============================================================================

export interface GridItemProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Column span (1-12 or 'full' or 'auto') */
  colSpan?: number | 'full' | 'auto';
  /** Column span on tablet */
  colSpanMd?: number | 'full' | 'auto';
  /** Column span on desktop */
  colSpanLg?: number | 'full' | 'auto';
  /** Column span on wide screens */
  colSpanXl?: number | 'full' | 'auto';
  /** Row span (1-12 or 'full' or 'auto') */
  rowSpan?: number | 'full' | 'auto';
  /** Start column (1-12 or 'auto') */
  colStart?: number | 'auto';
  /** Start row (1-12 or 'auto') */
  rowStart?: number | 'auto';
}

/**
 * Convert span value to Tailwind class
 */
const getSpanClass = (span: number | 'full' | 'auto', prefix: string): string => {
  if (span === 'full') return `${prefix}-span-full`;
  if (span === 'auto') return `${prefix}-span-auto`;
  if (typeof span === 'number') return `${prefix}-span-${span}`;
  return '';
};

/**
 * GridItem Component
 * 
 * A child component for Grid that allows column and row spanning.
 * 
 * @example
 * <Grid cols={12}>
 *   <GridItem colSpan={6}>Half width</GridItem>
 *   <GridItem colSpan={6}>Half width</GridItem>
 *   <GridItem colSpan={12}>Full width</GridItem>
 * </Grid>
 * 
 * @example
 * <Grid cols={12}>
 *   <GridItem colSpan={4} colSpanMd={6} colSpanLg={3}>Responsive span</GridItem>
 * </Grid>
 */
export const GridItem = React.forwardRef<HTMLDivElement, GridItemProps>(
  (
    {
      children,
      colSpan,
      colSpanMd,
      colSpanLg,
      colSpanXl,
      rowSpan,
      colStart,
      rowStart,
      className,
      ...props
    },
    ref
  ) => {
    const colSpanClass = colSpan ? getSpanClass(colSpan, 'col') : '';
    const colSpanMdClass = colSpanMd ? `md:${getSpanClass(colSpanMd, 'col')}` : '';
    const colSpanLgClass = colSpanLg ? `lg:${getSpanClass(colSpanLg, 'col')}` : '';
    const colSpanXlClass = colSpanXl ? `xl:${getSpanClass(colSpanXl, 'col')}` : '';
    
    const rowSpanClass = rowSpan ? getSpanClass(rowSpan, 'row') : '';
    
    const colStartClass = colStart && colStart !== 'auto' ? `col-start-${colStart}` : '';
    const rowStartClass = rowStart && rowStart !== 'auto' ? `row-start-${rowStart}` : '';
    
    const baseClasses = cn(
      colSpanClass,
      colSpanMdClass,
      colSpanLgClass,
      colSpanXlClass,
      rowSpanClass,
      colStartClass,
      rowStartClass,
      className
    );
    
    return (
      <div ref={ref} className={baseClasses} {...props}>
        {children}
      </div>
    );
  }
);

GridItem.displayName = 'GridItem';

// ============================================================================
// VARIANT SHORTCUTS
// ============================================================================

/**
 * Responsive Grid - Pre-configured with common breakpoints
 * 
 * @example
 * <ResponsiveGrid>
 *   {items.map(item => <Card key={item.id}>{item.title}</Card>)}
 * </ResponsiveGrid>
 */
export const ResponsiveGrid = React.forwardRef<HTMLDivElement, Omit<GridProps, 'cols' | 'colsMd' | 'colsLg' | 'colsXl'>>(
  (props, ref) => (
    <Grid 
      ref={ref} 
      cols={1} 
      colsMd={2} 
      colsLg={3} 
      colsXl={4} 
      gap="md" 
      {...props} 
    />
  )
);
ResponsiveGrid.displayName = 'ResponsiveGrid';

/**
 * Dashboard Grid - For admin/council dashboards
 */
export const DashboardGrid = React.forwardRef<HTMLDivElement, Omit<GridProps, 'cols' | 'colsMd' | 'colsLg'>>(
  (props, ref) => (
    <Grid 
      ref={ref} 
      cols={1} 
      colsMd={2} 
      colsLg={3} 
      gap="lg" 
      {...props} 
    />
  )
);
DashboardGrid.displayName = 'DashboardGrid';

/**
 * Masonry Grid - Auto-fit with minimum width
 * 
 * @example
 * <MasonryGrid minColWidth="280px">
 *   {images.map(image => <ImageCard key={image.id} {...image} />)}
 * </MasonryGrid>
 */
export const MasonryGrid = React.forwardRef<HTMLDivElement, Omit<GridProps, 'autoFit' | 'autofill'>>(
  ({ minColWidth = '280px', gap = 'md', ...props }, ref) => (
    <Grid 
      ref={ref} 
      autoFit 
      minColWidth={minColWidth} 
      gap={gap} 
      {...props} 
    />
  )
);
MasonryGrid.displayName = 'MasonryGrid';

/**
 * Form Grid - For form layouts with labels and inputs
 */
export const FormGrid = React.forwardRef<HTMLDivElement, Omit<GridProps, 'cols' | 'gap'>>(
  (props, ref) => (
    <Grid 
      ref={ref} 
      cols={1} 
      colsMd={2} 
      gap="md" 
      {...props} 
    />
  )
);
FormGrid.displayName = 'FormGrid';
```

---

## 📋 **USAGE EXAMPLES**

### Basic Grid (2 columns on mobile, 4 on desktop)
```tsx
<Grid cols={2} colsLg={4} gap="md">
  <Card>Item 1</Card>
  <Card>Item 2</Card>
  <Card>Item 3</Card>
  <Card>Item 4</Card>
</Grid>
```

### Responsive Grid (1 → 2 → 3 → 4 columns)
```tsx
<ResponsiveGrid>
  {products.map(product => (
    <ProductCard key={product.id} product={product} />
  ))}
</ResponsiveGrid>
```

### Masonry Grid (Auto-fit cards)
```tsx
<MasonryGrid minColWidth="300px" gap="lg">
  {images.map(image => (
    <ImageCard key={image.id} image={image} />
  ))}
</MasonryGrid>
```

### Grid with Column Span
```tsx
<Grid cols={12} gap="md">
  <GridItem colSpan={12}>
    <HeroSection />
  </GridItem>
  <GridItem colSpan={6} colSpanMd={4} colSpanLg={3}>
    <Sidebar />
  </GridItem>
  <GridItem colSpan={6} colSpanMd={8} colSpanLg={9}>
    <MainContent />
  </GridItem>
</Grid>
```

### Dashboard Grid
```tsx
<DashboardGrid>
  <StatCard title="Revenue" value="$12,345" />
  <StatCard title="Users" value="1,234" />
  <StatCard title="Products" value="567" />
  <StatCard title="Quests" value="89" />
  <GridItem colSpan={2}>
    <ChartCard />
  </GridItem>
</DashboardGrid>
```

### Form Grid
```tsx
<FormGrid>
  <Input label="First Name" placeholder="John" />
  <Input label="Last Name" placeholder="Doe" />
  <GridItem colSpan={2}>
    <Input label="Email" placeholder="john@example.com" />
  </GridItem>
  <GridItem colSpan={2}>
    <Button>Submit</Button>
  </GridItem>
</FormGrid>
```

---

## ✅ **DESIGN TOKENS ALIGNMENT**

| Gap Token | Value | Tailwind Class |
|-----------|-------|----------------|
| xs | 4px | `gap-1` |
| sm | 8px | `gap-2` |
| md | 16px | `gap-4` |
| lg | 24px | `gap-6` |
| xl | 32px | `gap-8` |
| 2xl | 48px | `gap-12` |

These match our COSMIC design system spacing tokens.

---

## 🎯 **GRID + STACK: THE LAYOUT SYSTEM**

Together, `Stack` and `Grid` form the complete layout foundation:

| Component | Purpose | Use Case |
|-----------|---------|----------|
| **Stack** | Vertical/horizontal arrangement | Forms, lists, toolbars, page sections |
| **Grid** | 2D arrangement | Dashboards, galleries, card grids |
| **VStack** | Vertical only | Page content, form layouts |
| **HStack** | Horizontal only | Navigation, button groups |
| **ResponsiveGrid** | Responsive columns | Product listings, image galleries |
| **MasonryGrid** | Auto-fit cards | Dynamic content, image walls |
| **DashboardGrid** | Admin dashboards | Stats, charts, management |
| **FormGrid** | Form layouts | Multi-column forms |

---

## 🚀 **NEXT**

- **Container** — Max-width container with padding
- **Spacer** — Flexible spacing element
- **Divider** — Visual separator
- **AspectRatio** — Consistent aspect ratio container
- **ScrollArea** — Custom scrollable container
