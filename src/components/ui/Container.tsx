// src/components/ui/Container.tsx
// ╔═══════════════════════════════════════════════════════════════════════════╗
// ║                    CONTAINER COMPONENT                                    ║
// ║                    The vessel that holds our content                       ║
// ║                    All values from COSMIC constants                        ║
// ╚═══════════════════════════════════════════════════════════════════════════╝

import React from 'react';
import { cn } from '@/lib/utils';

// ─── Types ─────────────────────────────────────────────────────────────────
import type {
  ContainerProps,
  PageContainerProps,
  SectionContainerProps,
  NarrowContainerProps,
  WideContainerProps,
  HeroContainerProps,
  FooterContainerProps,
} from '@/types/components/hof/container.types';

// ─── Constants ─────────────────────────────────────────────────────────────
import {
  CONTAINER_CENTERED_CLASS,
  CONTAINER_HEADER_MARGIN_BOTTOM,
  CONTAINER_BODY_GAP,
  CONTAINER_FOOTER_MARGIN_TOP,
  CONTAINER_FOOTER_PADDING_TOP,
  CONTAINER_FOOTER_DIVIDER,
} from '@/lib/constants/components/hof/container.constants';

// ─── Variants ──────────────────────────────────────────────────────────────
import {
  containerVariants,
} from '@/lib/constants/components/hof/container.variants';

// ─── Utilities ─────────────────────────────────────────────────────────────
import {
  getContainerSizeClass,
  getContainerPaddingXClass,
  getContainerPaddingYClass,
  getContainerPaddingTopClass,
  getContainerPaddingBottomClass,
  resolveContainerVisualVariant,
} from '@/lib/utils/components/hof/container.utils';

// ═══════════════════════════════════════════════════════════════════════════
// CONTAINER
// ═══════════════════════════════════════════════════════════════════════════

/**
 * Container — Flexible layout component for consistent width and padding.
 *
 * @example
 * <Container size="lg" padding="md">
 *   <h1>Page Title</h1>
 * </Container>
 *
 * @example
 * <Container size="md" paddingY="lg" background elevated>
 *   <Card>Elevated content with background</Card>
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
      visual,
      bordered = false,
      background = false,
      elevated = false,
      asChild = false,
      className,
      ...props
    },
    ref
  ) => {
    const maxWidthClass = getContainerSizeClass(size, fluid);
    const resolvedVisual = resolveContainerVisualVariant({
      visual,
      bordered,
      background,
      elevated,
    });

    const classes = cn(
      containerVariants({ visual: resolvedVisual }),
      maxWidthClass,
      centered && CONTAINER_CENTERED_CLASS,
      noPadding
        ? 'px-0 py-0'
        : [
            getContainerPaddingXClass(padding),
            getContainerPaddingYClass(paddingY),
            getContainerPaddingTopClass(paddingTop),
            getContainerPaddingBottomClass(paddingBottom),
          ],
      className
    );

    const Comp = asChild ? 'div' : 'div'; // `asChild` pattern would use Slot from Radix
    return (
      <Comp ref={ref} className={classes} {...props}>
        {children}
      </Comp>
    );
  }
);
Container.displayName = 'Container';

// ═══════════════════════════════════════════════════════════════════════════
// VARIANT SHORTCUTS
// ═══════════════════════════════════════════════════════════════════════════

/**
 * PageContainer — Pre-configured for main page content.
 */
export const PageContainer = React.forwardRef<
  HTMLDivElement,
  PageContainerProps
>((props, ref) => (
  <Container ref={ref} size="xl" padding="lg" paddingY="lg" {...props} />
));
PageContainer.displayName = 'PageContainer';

/**
 * SectionContainer — For consistent section spacing.
 */
export const SectionContainer = React.forwardRef<
  HTMLDivElement,
  SectionContainerProps
>((props, ref) => (
  <Container ref={ref} size="xl" padding="md" paddingY="xl" {...props} />
));
SectionContainer.displayName = 'SectionContainer';

/**
 * NarrowContainer — For focused content like blog posts.
 */
export const NarrowContainer = React.forwardRef<
  HTMLDivElement,
  NarrowContainerProps
>((props, ref) => (
  <Container ref={ref} size="lg" padding="md" {...props} />
));
NarrowContainer.displayName = 'NarrowContainer';

/**
 * WideContainer — For immersive content like galleries.
 */
export const WideContainer = React.forwardRef<
  HTMLDivElement,
  WideContainerProps
>((props, ref) => (
  <Container ref={ref} size="2xl" padding="md" {...props} />
));
WideContainer.displayName = 'WideContainer';

/**
 * HeroContainer — For hero sections with larger padding.
 */
export const HeroContainer = React.forwardRef<
  HTMLDivElement,
  HeroContainerProps
>((props, ref) => (
  <Container
    ref={ref}
    size="xl"
    padding="lg"
    paddingY="xl"
    background
    {...props}
  />
));
HeroContainer.displayName = 'HeroContainer';

/**
 * FooterContainer — For footer sections.
 */
export const FooterContainer = React.forwardRef<
  HTMLDivElement,
  FooterContainerProps
>((props, ref) => (
  <Container
    ref={ref}
    size="xl"
    padding="md"
    paddingY="lg"
    bordered
    {...props}
  />
));
FooterContainer.displayName = 'FooterContainer';

// ═══════════════════════════════════════════════════════════════════════════
// COMPOSITION COMPONENTS
// ═══════════════════════════════════════════════════════════════════════════

/**
 * ContainerHeader — Consistent header spacing within a container.
 */
export const ContainerHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, children, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(CONTAINER_HEADER_MARGIN_BOTTOM, className)}
    {...props}
  >
    {children}
  </div>
));
ContainerHeader.displayName = 'ContainerHeader';

/**
 * ContainerBody — Consistent body spacing within a container.
 */
export const ContainerBody = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, children, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(CONTAINER_BODY_GAP, className)}
    {...props}
  >
    {children}
  </div>
));
ContainerBody.displayName = 'ContainerBody';

/**
 * ContainerFooter — Consistent footer spacing within a container.
 */
export const ContainerFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, children, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      CONTAINER_FOOTER_MARGIN_TOP,
      CONTAINER_FOOTER_PADDING_TOP,
      CONTAINER_FOOTER_DIVIDER,
      className
    )}
    {...props}
  >
    {children}
  </div>
));
ContainerFooter.displayName = 'ContainerFooter';

// ═══════════════════════════════════════════════════════════════════════════
// EXPORTS
// ═══════════════════════════════════════════════════════════════════════════

export type {
  ContainerProps,
  PageContainerProps,
  SectionContainerProps,
  NarrowContainerProps,
  WideContainerProps,
  HeroContainerProps,
  FooterContainerProps,
  ContainerSize,
  ContainerPadding,
  ContainerVisualVariant,
} from '@/types/components/hof/container.types';