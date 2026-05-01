## ➖ **DIVIDER COMPONENT: Overview**

A divider component is a **visual separation element** that creates clear boundaries between content sections. It is the **pause** between thoughts—a subtle but important way to organize information and guide the eye.

**What it replaces:**
- Manual border utilities scattered across components
- Inconsistent separator styling
- Hardcoded colors and spacing

**What it provides:**
- Multiple visual styles (light, subtle, bold, glowing)
- Orientation options (horizontal, vertical)
- Label support for section headers
- Dashed, dotted, and gradient variants
- Responsive behavior

---

## 📁 **`components/ui/Divider.tsx`**

```tsx
// components/ui/Divider.tsx
// Divider Component - The pause between thoughts
// Provides visual separation between content sections
// Uses COSMIC design tokens for colors and spacing

import React from 'react';
import { cn } from '@/lib/utils';

export type DividerVariant = 'light' | 'subtle' | 'bold' | 'glow' | 'gradient';
export type DividerOrientation = 'horizontal' | 'vertical';
export type DividerStyle = 'solid' | 'dashed' | 'dotted';

export interface DividerProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Visual style of the divider */
  variant?: DividerVariant;
  /** Orientation of the divider */
  orientation?: DividerOrientation;
  /** Line style (solid, dashed, dotted) */
  lineStyle?: DividerStyle;
  /** Optional label text to display in the center */
  label?: string;
  /** Optional icon to display with label */
  icon?: React.ReactNode;
  /** Thickness of the divider line */
  thickness?: 'thin' | 'normal' | 'thick';
  /** Length of the divider (for vertical) or max-width (for horizontal) */
  length?: 'full' | 'short' | 'medium' | 'long';
  /** Add spacing around the divider */
  spaced?: boolean;
  /** Custom spacing size */
  spacingSize?: 'sm' | 'md' | 'lg';
  /** Animate the divider on appear */
  animated?: boolean;
  /** As child element (render as child instead of div) */
  asChild?: boolean;
}

/**
 * Variant color mappings
 */
const variantClassMap: Record<DividerVariant, string> = {
  light: 'bg-white/10',
  subtle: 'bg-white/20',
  bold: 'bg-white/40',
  glow: 'bg-gradient-to-r from-transparent via-cyan-400 to-transparent',
  gradient: 'bg-gradient-to-r from-quantum-purple via-neurospark to-quantum-purple',
};

/**
 * Variant color mappings for vertical orientation
 */
const variantVerticalClassMap: Record<DividerVariant, string> = {
  light: 'bg-white/10',
  subtle: 'bg-white/20',
  bold: 'bg-white/40',
  glow: 'bg-gradient-to-b from-transparent via-cyan-400 to-transparent',
  gradient: 'bg-gradient-to-b from-quantum-purple via-neurospark to-quantum-purple',
};

/**
 * Thickness mappings
 */
const thicknessClassMap: Record<string, string> = {
  thin: 'h-px',
  normal: 'h-0.5',
  thick: 'h-1',
};

const thicknessVerticalClassMap: Record<string, string> = {
  thin: 'w-px',
  normal: 'w-0.5',
  thick: 'w-1',
};

/**
 * Length mappings for horizontal dividers
 */
const lengthHorizontalClassMap: Record<string, string> = {
  full: 'w-full',
  short: 'w-16',
  medium: 'w-32',
  long: 'w-48',
};

/**
 * Length mappings for vertical dividers
 */
const lengthVerticalClassMap: Record<string, string> = {
  full: 'h-full',
  short: 'h-8',
  medium: 'h-16',
  long: 'h-24',
};

/**
 * Line style mappings
 */
const lineStyleClassMap: Record<DividerStyle, string> = {
  solid: '',
  dashed: 'bg-none border-t border-dashed',
  dotted: 'bg-none border-t border-dotted',
};

const lineStyleVerticalClassMap: Record<DividerStyle, string> = {
  solid: '',
  dashed: 'bg-none border-l border-dashed',
  dotted: 'bg-none border-l border-dotted',
};

/**
 * Spacing size mappings
 */
const spacingClassMap: Record<string, string> = {
  sm: 'my-2',
  md: 'my-4',
  lg: 'my-6',
};

const spacingVerticalClassMap: Record<string, string> = {
  sm: 'mx-2',
  md: 'mx-4',
  lg: 'mx-6',
};

/**
 * Divider Component
 * 
 * A flexible component for creating visual separation between content.
 * 
 * @example
 * <Divider />
 * 
 * @example
 * <Divider variant="glow" label="Section Break" />
 * 
 * @example
 * <Divider orientation="vertical" length="medium" spaced />
 * 
 * @example
 * <Divider variant="gradient" lineStyle="dashed" thickness="thick" />
 */
export const Divider = React.forwardRef<HTMLDivElement, DividerProps>(
  (
    {
      variant = 'subtle',
      orientation = 'horizontal',
      lineStyle = 'solid',
      label,
      icon,
      thickness = 'normal',
      length = 'full',
      spaced = false,
      spacingSize = 'md',
      animated = false,
      asChild = false,
      className,
      ...props
    },
    ref
  ) => {
    // Determine color class
    const colorClass = orientation === 'horizontal' 
      ? variantClassMap[variant] 
      : variantVerticalClassMap[variant];
    
    // Determine thickness class
    const thicknessClass = orientation === 'horizontal'
      ? thicknessClassMap[thickness]
      : thicknessVerticalClassMap[thickness];
    
    // Determine length class
    const lengthClass = orientation === 'horizontal'
      ? lengthHorizontalClassMap[length]
      : lengthVerticalClassMap[length];
    
    // Determine line style class
    const styleClass = orientation === 'horizontal'
      ? lineStyleClassMap[lineStyle]
      : lineStyleVerticalClassMap[lineStyle];
    
    // Determine spacing class
    const spacingClass = spaced 
      ? (orientation === 'horizontal' ? spacingClassMap[spacingSize] : spacingVerticalClassMap[spacingSize])
      : '';
    
    // Animation class
    const animationClass = animated ? 'animate-fadeIn scale-in' : '';
    
    // Base classes for the line
    const lineClasses = cn(
      colorClass,
      thicknessClass,
      lengthClass,
      styleClass,
      lineStyle !== 'solid' && 'border-white/20',
      animationClass
    );
    
    // If there's a label, render labeled divider
    if (label || icon) {
      return (
        <div 
          ref={ref}
          className={cn(
            'flex items-center gap-4',
            orientation === 'vertical' && 'flex-col',
            spacingClass,
            className
          )}
          {...props}
        >
          <div className={cn(lineClasses, 'flex-1')} />
          <div className="flex items-center gap-2 text-white/40 text-sm whitespace-nowrap">
            {icon && <span className="w-4 h-4">{icon}</span>}
            {label && <span>{label}</span>}
          </div>
          <div className={cn(lineClasses, 'flex-1')} />
        </div>
      );
    }
    
    // Simple divider
    return (
      <div
        ref={ref}
        className={cn(
          orientation === 'horizontal' ? 'w-full' : 'h-full',
          'flex',
          orientation === 'horizontal' ? 'flex-row' : 'flex-col',
          spacingClass,
          className
        )}
        {...props}
      >
        <div className={lineClasses} />
      </div>
    );
  }
);

Divider.displayName = 'Divider';

// ============================================================================
// VARIANT SHORTCUTS
// ============================================================================

/**
 * Light Divider - Subtle separation
 */
export const LightDivider = React.forwardRef<HTMLDivElement, Omit<DividerProps, 'variant'>>(
  (props, ref) => <Divider ref={ref} variant="light" {...props} />
);
LightDivider.displayName = 'LightDivider';

/**
 * Subtle Divider - Default, gentle separation
 */
export const SubtleDivider = React.forwardRef<HTMLDivElement, Omit<DividerProps, 'variant'>>(
  (props, ref) => <Divider ref={ref} variant="subtle" {...props} />
);
SubtleDivider.displayName = 'SubtleDivider';

/**
 * Bold Divider - Strong visual separation
 */
export const BoldDivider = React.forwardRef<HTMLDivElement, Omit<DividerProps, 'variant'>>(
  (props, ref) => <Divider ref={ref} variant="bold" {...props} />
);
BoldDivider.displayName = 'BoldDivider';

/**
 * Glow Divider - Animated, attention-grabbing
 */
export const GlowDivider = React.forwardRef<HTMLDivElement, Omit<DividerProps, 'variant'>>(
  (props, ref) => <Divider ref={ref} variant="glow" animated {...props} />
);
GlowDivider.displayName = 'GlowDivider';

/**
 * Gradient Divider - Colorful transition
 */
export const GradientDivider = React.forwardRef<HTMLDivElement, Omit<DividerProps, 'variant'>>(
  (props, ref) => <Divider ref={ref} variant="gradient" thickness="thin" {...props} />
);
GradientDivider.displayName = 'GradientDivider';

/**
 * Vertical Divider - For side-by-side content
 */
export const VerticalDivider = React.forwardRef<HTMLDivElement, Omit<DividerProps, 'orientation'>>(
  (props, ref) => <Divider ref={ref} orientation="vertical" {...props} />
);
VerticalDivider.displayName = 'VerticalDivider';

/**
 * Dashed Divider - For draft or in-progress sections
 */
export const DashedDivider = React.forwardRef<HTMLDivElement, Omit<DividerProps, 'lineStyle'>>(
  (props, ref) => <Divider ref={ref} lineStyle="dashed" {...props} />
);
DashedDivider.displayName = 'DashedDivider';

/**
 * Dotted Divider - For light, delicate separation
 */
export const DottedDivider = React.forwardRef<HTMLDivElement, Omit<DividerProps, 'lineStyle'>>(
  (props, ref) => <Divider ref={ref} lineStyle="dotted" {...props} />
);
DottedDivider.displayName = 'DottedDivider';

// ============================================================================
// COMPOSITION COMPONENTS
// ============================================================================

export interface DividerWithTextProps {
  text: string;
  variant?: DividerVariant;
  icon?: React.ReactNode;
  className?: string;
}

/**
 * DividerWithText - Labeled divider for section headers
 * 
 * @example
 * <DividerWithText text="Featured Content" />
 */
export const DividerWithText = React.forwardRef<HTMLDivElement, DividerWithTextProps>(
  ({ text, variant = 'subtle', icon, className }, ref) => (
    <Divider 
      ref={ref}
      label={text} 
      icon={icon} 
      variant={variant} 
      className={className}
    />
  )
);
DividerWithText.displayName = 'DividerWithText';

export interface SectionDividerProps {
  title: string;
  subtitle?: string;
  variant?: DividerVariant;
  className?: string;
}

/**
 * SectionDivider - Enhanced divider for major section breaks
 * 
 * @example
 * <SectionDivider title="Products" subtitle="Browse our collection" />
 */
export const SectionDivider = React.forwardRef<HTMLDivElement, SectionDividerProps>(
  ({ title, subtitle, variant = 'glow', className }, ref) => (
    <div ref={ref} className={cn('py-8', className)}>
      <Divider variant={variant} label={title} />
      {subtitle && (
        <p className="text-center text-white/40 text-sm mt-3">{subtitle}</p>
      )}
    </div>
  )
);
SectionDivider.displayName = 'SectionDivider';
```

---

## 📋 **USAGE EXAMPLES**

### Basic Horizontal Divider
```tsx
<div>
  <h2>Section One</h2>
  <Divider />
  <p>Content after divider</p>
</div>
```

### Glowing Section Divider
```tsx
<Divider variant="glow" animated />
```

### Labeled Divider
```tsx
<Divider label="Continue Reading" />
```

### Divider with Icon
```tsx
<Divider icon={<StarIcon />} label="Featured" />
```

### Vertical Divider (between columns)
```tsx
<div className="flex">
  <div className="flex-1">Left column</div>
  <VerticalDivider length="medium" spaced />
  <div className="flex-1">Right column</div>
</div>
```

### Gradient Divider for Major Sections
```tsx
<Divider variant="gradient" thickness="thick" spaced />
```

### Dashed Divider for Draft Content
```tsx
<Divider lineStyle="dashed" variant="light" />
```

### SectionDivider Component
```tsx
<SectionDivider 
  title="The Collection" 
  subtitle="Handcrafted sovereign creations" 
  variant="glow"
/>
```

### DividerWithText Component
```tsx
<DividerWithText text="More from this creator" variant="subtle" />
```

### In a Stack Layout
```tsx
<VStack space="lg">
  <Card>Item 1</Card>
  <Divider variant="subtle" />
  <Card>Item 2</Card>
  <Divider variant="glow" animated />
  <Card>Item 3</Card>
</VStack>
```

### In a Form
```tsx
<VStack space="md">
  <Input label="Name" />
  <Input label="Email" />
  <Divider variant="dashed" label="Optional Information" />
  <Input label="Company" />
  <Input label="Role" />
</VStack>
```

---

## ✅ **DESIGN TOKENS ALIGNMENT**

| Variant | Color | Use Case |
|---------|-------|----------|
| light | `white/10` | Minimal separation |
| subtle | `white/20` | Default separation |
| bold | `white/40` | Strong visual break |
| glow | Cyan gradient | Section emphasis |
| gradient | Purple → Cyan → Purple | Major transitions |

| Thickness | Height/Width | Use Case |
|-----------|--------------|----------|
| thin | 1px | Fine separation |
| normal | 2px | Default |
| thick | 4px | Major breaks |

| Length (Horizontal) | Width | Use Case |
|---------------------|-------|----------|
| short | 64px | Small separators |
| medium | 128px | Standard |
| long | 192px | Wide |
| full | 100% | Full width |

---

## 🎯 **LAYOUT COMPONENTS COMPLETE**

| Component | Purpose | Status |
|-----------|---------|--------|
| **Stack** | 1D arrangement (vertical/horizontal) | ✅ |
| **Grid** | 2D arrangement (responsive columns) | ✅ |
| **Container** | Width constraint (max-width + padding) | ✅ |
| **AspectRatio** | Media proportion maintenance | ✅ |
| **Spacer** | Flexible spacing element | ✅ |
| **Divider** | Visual separator | ✅ |

---

## 🚀 **REMAINING LAYOUT COMPONENTS**

- **ScrollArea** — Custom scrollable container
- **Flex** — More flexible than Stack (row/column + wrap + grow + shrink)
- **Skeleton** — Loading placeholders with aspect ratio support
- **Card** — Container with consistent styling
- **Section** — Page section with consistent spacing
