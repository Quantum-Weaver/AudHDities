// components/ui/Container.tsx
// Container Component - The vessel that holds our content
// Provides consistent max-width and padding constraints
// Uses COSMIC design tokens for spacing and breakpoints

import React from 'react';
import { cn } from '@/lib/utils';

export type ContainerSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'full' | 'fluid';
export type ContainerPadding = 'none' | 'sm' | 'md' | 'lg' | 'xl';

export interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Maximum width constraint */
  size?: ContainerSize;
  /** Horizontal padding */
  padding?: ContainerPadding;
  /** Vertical padding */
  paddingY?: ContainerPadding;
  /** Top padding */
  paddingTop?: ContainerPadding;
  /** Bottom padding */
  paddingBottom?: ContainerPadding;
  /** Center content horizontally */
  centered?: boolean;
  /** Remove all padding */
  noPadding?: boolean;
  /** Make container full width with max-width constraint */
  fluid?: boolean;
  /** Add a subtle border */
  bordered?: boolean;
  /** Add a background (uses COSMIC surface color) */
  background?: boolean;
  /** Add a subtle shadow */
  elevated?: boolean;
  /** As child element (render as child instead of div) */
  asChild?: boolean;
}

/**
 * Max-width values by size (matching Tailwind breakpoints)
 */
const maxWidthMap: Record<ContainerSize, string> = {
  xs: 'max-w-xs',     // 320px
  sm: 'max-w-sm',     // 384px
  md: 'max-w-md',     // 448px
  lg: 'max-w-lg',     // 512px
  xl: 'max-w-xl',     // 576px
  '2xl': 'max-w-2xl', // 672px
  full: 'max-w-full',
  fluid: 'max-w-full',
};

/**
 * Padding values by size
 */
const paddingMap: Record<ContainerPadding, string> = {
  none: 'px-0',
  sm: 'px-4',   // 16px on mobile, more on larger screens
  md: 'px-6',   // 24px on mobile, more on larger screens
  lg: 'px-8',   // 32px on mobile, more on larger screens
  xl: 'px-12',  // 48px on mobile, more on larger screens
};

const paddingYMap: Record<ContainerPadding, string> = {
  none: 'py-0',
  sm: 'py-4',
  md: 'py-6',
  lg: 'py-8',
  xl: 'py-12',
};

const paddingTopMap: Record<ContainerPadding, string> = {
  none: 'pt-0',
  sm: 'pt-4',
  md: 'pt-6',
  lg: 'pt-8',
  xl: 'pt-12',
};

const paddingBottomMap: Record<ContainerPadding, string> = {
  none: 'pb-0',
  sm: 'pb-4',
  md: 'pb-6',
  lg: 'pb-8',
  xl: 'pb-12',
};

/**
 * Responsive padding values (larger on desktop)
 */
const responsivePaddingMap: Record<ContainerPadding, string> = {
  none: 'px-0',
  sm: 'px-4 md:px-6',
  md: 'px-6 md:px-8',
  lg: 'px-8 md:px-12',
  xl: 'px-12 md:px-16',
};

/**
 * Container Component
 * 
 * A flexible layout component for consistent width and padding constraints.
 * 
 * @example
 * <Container size="lg" padding="md">
 *   <h1>Page Title</h1>
 *   <p>Page content goes here...</p>
 * </Container>
 * 
 * @example
 * <Container size="xl" centered>
 *   <HeroSection />
 * </Container>
 * 
 * @example
 * <Container fluid noPadding>
 *   <FullWidthImage />
 * </Container>
 * 
 * @example
 * <Container size="md" paddingY="lg" background elevated>
 *   <Card>
 *     <p>Elevated content with background</p>
 *   </Card>
 * </Container>
 */
export const Container = React.forwardRef<HTMLDivElement, ContainerProps>(
  (
    {
      children,
      size = 'xl',
      padding = 'md',
      paddingY,
      paddingTop,
      paddingBottom,
      centered = true,
      noPadding = false,
      fluid = false,
      bordered = false,
      background = false,
      elevated = false,
      asChild = false,
      className,
      ...props
    },
    ref
  ) => {
    // Determine max-width class
    const maxWidthClass = fluid ? 'max-w-full' : maxWidthMap[size];
    
    // Determine padding classes
    let paddingClass = '';
    let paddingYClass = '';
    let paddingTopClass = '';
    let paddingBottomClass = '';
    
    if (noPadding) {
      paddingClass = 'px-0';
      paddingYClass = 'py-0';
    } else {
      paddingClass = responsivePaddingMap[padding];
      if (paddingY) paddingYClass = paddingYMap[paddingY];
      if (paddingTop) paddingTopClass = paddingTopMap[paddingTop];
      if (paddingBottom) paddingBottomClass = paddingBottomMap[paddingBottom];
    }
    
    // Base classes
    const baseClasses = cn(
      'w-full',
      maxWidthClass,
      centered && 'mx-auto',
      paddingClass,
      paddingYClass,
      paddingTopClass,
      paddingBottomClass,
      bordered && 'border border-white/10',
      background && 'bg-white/5 backdrop-blur-sm',
      elevated && 'shadow-lg',
      className
    );
    
    return (
      <div ref={ref} className={baseClasses} {...props}>
        {children}
      </div>
    );
  }
);

Container.displayName = 'Container';

// ============================================================================
// VARIANT SHORTCUTS
// ============================================================================

/**
 * Page Container - Pre-configured for main page content
 * 
 * @example
 * <PageContainer>
 *   <PageHeader title="Dashboard" />
 *   <DashboardContent />
 * </PageContainer>
 */
export const PageContainer = React.forwardRef<HTMLDivElement, Omit<ContainerProps, 'size' | 'padding'>>(
  (props, ref) => (
    <Container 
      ref={ref} 
      size="xl" 
      padding="lg" 
      paddingY="lg" 
      {...props} 
    />
  )
);
PageContainer.displayName = 'PageContainer';

/**
 * Section Container - For consistent section spacing
 * 
 * @example
 * <SectionContainer>
 *   <h2>Features</h2>
 *   <FeatureGrid />
 * </SectionContainer>
 */
export const SectionContainer = React.forwardRef<HTMLDivElement, Omit<ContainerProps, 'size' | 'paddingY'>>(
  (props, ref) => (
    <Container 
      ref={ref} 
      size="xl" 
      padding="md" 
      paddingY="xl" 
      {...props} 
    />
  )
);
SectionContainer.displayName = 'SectionContainer';

/**
 * Narrow Container - For focused content like blog posts
 * 
 * @example
 * <NarrowContainer>
 *   <BlogPost content={post} />
 * </NarrowContainer>
 */
export const NarrowContainer = React.forwardRef<HTMLDivElement, Omit<ContainerProps, 'size'>>(
  (props, ref) => (
    <Container 
      ref={ref} 
      size="lg" 
      padding="md" 
      {...props} 
    />
  )
);
NarrowContainer.displayName = 'NarrowContainer';

/**
 * Wide Container - For immersive content like galleries
 * 
 * @example
 * <WideContainer>
 *   <ImageGallery images={images} />
 * </WideContainer>
 */
export const WideContainer = React.forwardRef<HTMLDivElement, Omit<ContainerProps, 'size'>>(
  (props, ref) => (
    <Container 
      ref={ref} 
      size="2xl" 
      padding="md" 
      {...props} 
    />
  )
);
WideContainer.displayName = 'WideContainer';

/**
 * Hero Container - For hero sections with larger padding
 * 
 * @example
 * <HeroContainer>
 *   <HeroTitle>Welcome to the Sanctuary</HeroTitle>
 *   <HeroSubtitle>Where sovereignty lives</HeroSubtitle>
 * </HeroContainer>
 */
export const HeroContainer = React.forwardRef<HTMLDivElement, Omit<ContainerProps, 'size' | 'paddingY'>>(
  (props, ref) => (
    <Container 
      ref={ref} 
      size="xl" 
      padding="lg" 
      paddingY="xl" 
      background 
      {...props} 
    />
  )
);
HeroContainer.displayName = 'HeroContainer';

/**
 * Footer Container - For footer sections
 * 
 * @example
 * <FooterContainer>
 *   <FooterContent />
 * </FooterContainer>
 */
export const FooterContainer = React.forwardRef<HTMLDivElement, Omit<ContainerProps, 'size' | 'paddingY'>>(
  (props, ref) => (
    <Container 
      ref={ref} 
      size="xl" 
      padding="md" 
      paddingY="lg" 
      bordered 
      {...props} 
    />
  )
);
FooterContainer.displayName = 'FooterContainer';

// ============================================================================
// COMPOSITION COMPONENTS
// ============================================================================

/**
 * Container Header - Consistent header spacing within a container
 */
export const ContainerHeader = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, children, ...props }, ref) => (
    <div ref={ref} className={cn('mb-8', className)} {...props}>
      {children}
    </div>
  )
);
ContainerHeader.displayName = 'ContainerHeader';

/**
 * Container Body - Consistent body spacing within a container
 */
export const ContainerBody = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, children, ...props }, ref) => (
    <div ref={ref} className={cn('space-y-6', className)} {...props}>
      {children}
    </div>
  )
);
ContainerBody.displayName = 'ContainerBody';

/**
 * Container Footer - Consistent footer spacing within a container
 */
export const ContainerFooter = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, children, ...props }, ref) => (
    <div ref={ref} className={cn('mt-8 pt-6 border-t border-white/10', className)} {...props}>
      {children}
    </div>
  )
);
ContainerFooter.displayName = 'ContainerFooter';