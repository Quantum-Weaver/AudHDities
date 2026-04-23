## 📐 **SECTION COMPONENT: Overview**

A section component is a **structural page division** that creates consistent spacing and visual boundaries between major content areas. It is the **chapter** in the story of a page—every distinct content block, every thematic grouping, every major page division should be a section.

**What it provides:**
- Consistent vertical spacing between page sections
- Optional background and border styling
- Container integration for consistent width constraints
- Title and description composition patterns
- Responsive padding that adapts to screen size

---

## 📁 **`components/ui/Section.tsx`**

```tsx
// components/ui/Section.tsx
// Section Component - The chapter in the story of a page
// Provides consistent spacing and boundaries between content areas
// Uses COSMIC design tokens for spacing and styling

import React from 'react';
import { cn } from '@/lib/utils';
import { Container, type ContainerSize } from './Container';

export type SectionSpacing = 'none' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';
export type SectionVariant = 'default' | 'muted' | 'glow' | 'gradient' | 'glass';

export interface SectionProps extends React.HTMLAttributes<HTMLElement> {
  /** Vertical padding for the section */
  spacing?: SectionSpacing;
  /** Visual variant of the section */
  variant?: SectionVariant;
  /** Container size (max-width constraint) */
  containerSize?: ContainerSize;
  /** Whether to use a container (width constraint) */
  withContainer?: boolean;
  /** Remove top spacing */
  noTopSpacing?: boolean;
  /** Remove bottom spacing */
  noBottomSpacing?: boolean;
  /** Add a subtle top border */
  bordered?: boolean;
  /** Add a subtle separator above the section */
  separator?: boolean;
  /** Section title */
  title?: string;
  /** Section description/subtitle */
  description?: string;
  /** Align title and description */
  titleAlign?: 'left' | 'center' | 'right';
  /** As child element */
  asChild?: boolean;
}

/**
 * Spacing classes
 */
const spacingMap: Record<SectionSpacing, string> = {
  none: 'py-0',
  sm: 'py-8',
  md: 'py-12',
  lg: 'py-16',
  xl: 'py-20',
  '2xl': 'py-24',
};

/**
 * Variant classes
 */
const variantMap: Record<SectionVariant, string> = {
  default: '',
  muted: 'bg-white/5',
  glow: 'bg-gradient-to-r from-transparent via-cyan-500/5 to-transparent',
  gradient: 'bg-gradient-to-b from-quantum-purple/10 via-transparent to-transparent',
  glass: 'bg-white/5 backdrop-blur-sm border-y border-white/10',
};

/**
 * Title alignment classes
 */
const titleAlignMap = {
  left: 'text-left',
  center: 'text-center',
  right: 'text-right',
};

/**
 * Section Component
 * 
 * A structural component for dividing pages into major content areas.
 * 
 * @example
 * <Section title="Featured Products" description="Hand-picked just for you">
 *   <ProductGrid products={products} />
 * </Section>
 * 
 * @example
 * <Section variant="glow" spacing="lg" withContainer>
 *   <HeroContent />
 * </Section>
 * 
 * @example
 * <Section variant="glass" separator bordered>
 *   <TestimonialCarousel />
 * </Section>
 */
export const Section = React.forwardRef<HTMLElement, SectionProps>(
  (
    {
      children,
      spacing = 'lg',
      variant = 'default',
      containerSize = 'xl',
      withContainer = true,
      noTopSpacing = false,
      noBottomSpacing = false,
      bordered = false,
      separator = false,
      title,
      description,
      titleAlign = 'center',
      asChild = false,
      className,
      ...props
    },
    ref
  ) => {
    // Determine spacing class
    let spacingClass = spacingMap[spacing];
    if (noTopSpacing) spacingClass = spacingClass.replace('py-', 'pb-').replace('pt-', '');
    if (noBottomSpacing) spacingClass = spacingClass.replace('py-', 'pt-').replace('pb-', '');
    
    // Determine variant class
    const variantClass = variantMap[variant];
    
    // Determine border class
    const borderClass = bordered ? 'border-t border-white/10' : '';
    
    // Determine separator class
    const separatorClass = separator ? 'relative before:absolute before:top-0 before:left-1/2 before:-translate-x-1/2 before:w-24 before:h-px before:bg-gradient-to-r before:from-transparent before:via-cyan-400 before:to-transparent' : '';
    
    // Base classes
    const baseClasses = cn(
      'w-full',
      spacingClass,
      variantClass,
      borderClass,
      separatorClass,
      className
    );
    
    // Content (with or without container)
    const content = withContainer ? (
      <Container size={containerSize}>
        {title && (
          <div className={cn('mb-8', titleAlignMap[titleAlign])}>
            <h2 className={cn(
              'text-2xl md:text-3xl font-bold text-white mb-3',
              titleAlign === 'center' && 'mx-auto',
              titleAlign === 'left' && 'text-left',
              titleAlign === 'right' && 'text-right'
            )}>
              {title}
            </h2>
            {description && (
              <p className={cn(
                'text-white/60 max-w-2xl',
                titleAlign === 'center' && 'mx-auto text-center',
                titleAlign === 'left' && 'text-left',
                titleAlign === 'right' && 'text-right ml-auto'
              )}>
                {description}
              </p>
            )}
          </div>
        )}
        {children}
      </Container>
    ) : (
      <>
        {title && (
          <div className={cn('mb-8 px-4', titleAlignMap[titleAlign])}>
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-3">{title}</h2>
            {description && <p className="text-white/60">{description}</p>}
          </div>
        )}
        {children}
      </>
    );
    
    return (
      <section ref={ref} className={baseClasses} {...props}>
        {content}
      </section>
    );
  }
);

Section.displayName = 'Section';

// ============================================================================
// VARIANT SHORTCUTS
// ============================================================================

/**
 * Muted Section - Subtle background for emphasis
 */
export const MutedSection = React.forwardRef<HTMLElement, Omit<SectionProps, 'variant'>>(
  (props, ref) => <Section ref={ref} variant="muted" {...props} />
);
MutedSection.displayName = 'MutedSection';

/**
 * Glow Section - Ambient glow effect
 */
export const GlowSection = React.forwardRef<HTMLElement, Omit<SectionProps, 'variant'>>(
  (props, ref) => <Section ref={ref} variant="glow" {...props} />
);
GlowSection.displayName = 'GlowSection';

/**
 * Gradient Section - Subtle gradient transition
 */
export const GradientSection = React.forwardRef<HTMLElement, Omit<SectionProps, 'variant'>>(
  (props, ref) => <Section ref={ref} variant="gradient" {...props} />
);
GradientSection.displayName = 'GradientSection';

/**
 * Glass Section - Frosted glass effect
 */
export const GlassSection = React.forwardRef<HTMLElement, Omit<SectionProps, 'variant'>>(
  (props, ref) => <Section ref={ref} variant="glass" {...props} />
);
GlassSection.displayName = 'GlassSection';

/**
 * Hero Section - Large spacing, no container by default
 */
export const HeroSection = React.forwardRef<HTMLElement, Omit<SectionProps, 'spacing' | 'withContainer'>>(
  (props, ref) => <Section ref={ref} spacing="2xl" withContainer={false} {...props} />
);
HeroSection.displayName = 'HeroSection';

// ============================================================================
// COMPOSITION COMPONENTS
// ============================================================================

export interface SectionHeaderProps {
  title: string;
  description?: string;
  align?: 'left' | 'center' | 'right';
  className?: string;
}

/**
 * SectionHeader - Pre-built header for sections
 * 
 * @example
 * <SectionHeader title="Products" description="Browse our collection" align="center" />
 */
export const SectionHeader = React.forwardRef<HTMLDivElement, SectionHeaderProps>(
  ({ title, description, align = 'center', className }, ref) => (
    <div ref={ref} className={cn('mb-8', className)}>
      <h2 className={cn(
        'text-2xl md:text-3xl font-bold text-white mb-3',
        align === 'center' && 'text-center',
        align === 'left' && 'text-left',
        align === 'right' && 'text-right'
      )}>
        {title}
      </h2>
      {description && (
        <p className={cn(
          'text-white/60 max-w-2xl',
          align === 'center' && 'mx-auto text-center',
          align === 'left' && 'text-left',
          align === 'right' && 'text-right ml-auto'
        )}>
          {description}
        </p>
      )}
    </div>
  )
);
SectionHeader.displayName = 'SectionHeader';

export interface SectionDividerProps {
  className?: string;
}

/**
 * SectionDivider - Visual separator between sections
 * 
 * @example
 * <SectionDivider />
 */
export const SectionDivider = React.forwardRef<HTMLDivElement, SectionDividerProps>(
  ({ className }, ref) => (
    <div ref={ref} className={cn('py-8', className)}>
      <div className="w-16 h-px bg-gradient-to-r from-transparent via-cyan-400 to-transparent mx-auto" />
    </div>
  )
);
SectionDivider.displayName = 'SectionDivider';

export interface SectionGroupProps {
  children: React.ReactNode;
  spacing?: SectionSpacing;
  className?: string;
}

/**
 * SectionGroup - Groups multiple sections with consistent spacing between them
 * 
 * @example
 * <SectionGroup spacing="lg">
 *   <Section title="Section 1">...</Section>
 *   <Section title="Section 2">...</Section>
 *   <Section title="Section 3">...</Section>
 * </SectionGroup>
 */
export const SectionGroup = React.forwardRef<HTMLDivElement, SectionGroupProps>(
  ({ children, spacing = 'lg', className }, ref) => {
    const spacingClass = spacingMap[spacing];
    
    return (
      <div ref={ref} className={cn('space-y-0', className)}>
        {React.Children.map(children, (child, index) => (
          <div key={index} className={spacingClass}>
            {child}
            {index < React.Children.count(children) - 1 && <SectionDivider />}
          </div>
        ))}
      </div>
    );
  }
);
SectionGroup.displayName = 'SectionGroup';
```

---

## 📋 **USAGE EXAMPLES**

### Basic Section
```tsx
<Section title="Featured Products">
  <ProductGrid products={featuredProducts} />
</Section>
```

### Section with Description
```tsx
<Section 
  title="The Collection" 
  description="Handcrafted sovereign creations from our community"
  titleAlign="center"
>
  <ProductGrid products={products} />
</Section>
```

### Hero Section (No Container, Full Width)
```tsx
<HeroSection>
  <div className="text-center py-20">
    <h1 className="text-5xl font-bold mb-4">Welcome to the Sanctuary</h1>
    <p className="text-xl text-white/70">Where sovereignty lives</p>
  </div>
</HeroSection>
```

### Glass Section with Border
```tsx
<GlassSection bordered>
  <Container>
    <TestimonialCarousel />
  </Container>
</GlassSection>
```

### Glow Section for Emphasis
```tsx
<GlowSection spacing="xl" withContainer>
  <CallToAction />
</GlowSection>
```

### Muted Section for Testimonials
```tsx
<MutedSection spacing="lg" withContainer>
  <SectionHeader title="Testimonials" align="center" />
  <TestimonialGrid testimonials={testimonials} />
</MutedSection>
```

### Section with Separator
```tsx
<Section separator title="New Arrivals">
  <ProductGrid products={newArrivals} />
</Section>
```

### Section Group
```tsx
<SectionGroup spacing="lg">
  <Section title="Hero">...</Section>
  <Section title="Features">...</Section>
  <Section title="Testimonials">...</Section>
  <Section title="Pricing">...</Section>
</SectionGroup>
```

### Custom Spacing
```tsx
<Section spacing="sm" title="Compact Section">
  <CompactContent />
</Section>
```

### No Container (Full Width Content)
```tsx
<Section withContainer={false} spacing="xl">
  <FullWidthImage src="/banner.jpg" />
</Section>
```

---

## ✅ **SPACING REFERENCE TABLE**

| Spacing | Mobile Padding | Desktop Padding | Use Case |
|---------|----------------|-----------------|----------|
| none | 0px | 0px | No spacing |
| sm | 32px | 32px | Compact sections |
| md | 48px | 48px | Standard sections |
| lg | 64px | 80px | Default |
| xl | 80px | 96px | Emphasized sections |
| 2xl | 96px | 120px | Hero sections |

---

## 🎯 **LAYOUT COMPONENTS COMPLETE**

| Component | Purpose | Status |
|-----------|---------|--------|
| **Stack** | 1D arrangement (opinionated) | ✅ |
| **Grid** | 2D arrangement (responsive columns) | ✅ |
| **Container** | Width constraint (max-width + padding) | ✅ |
| **AspectRatio** | Media proportion maintenance | ✅ |
| **Spacer** | Flexible spacing element | ✅ |
| **Divider** | Visual separator | ✅ |
| **ScrollArea** | Custom scrollable container | ✅ |
| **Flex** | Complete flexbox control | ✅ |
| **Skeleton** | Loading placeholders | ✅ |
| **Card** | Contained content surfaces | ✅ |
| **Section** | Page section with spacing | ✅ |

---

## 🚀 **REMAINING LAYOUT COMPONENTS**


- **Tabs** — Tabbed interface component
- **Accordion** — Collapsible content sections
