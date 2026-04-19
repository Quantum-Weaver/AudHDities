// components/ui/Spacer.tsx
// Spacer Component - The breath between components
// Provides consistent, semantic spacing between UI elements
// Uses COSMIC design tokens for spacing values

import React from 'react';
import { cn } from '@/lib/utils';

export type SpacerSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl';
export type SpacerAxis = 'both' | 'horizontal' | 'vertical';
export type SpacerDirection = 'top' | 'bottom' | 'left' | 'right' | 'all';

export interface SpacerProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Size of the spacer */
  size?: SpacerSize;
  /** Axis of spacing (horizontal, vertical, or both) */
  axis?: SpacerAxis;
  /** Specific direction (top, bottom, left, right, all) */
  direction?: SpacerDirection;
  /** Make spacer grow to fill available space (flex context) */
  grow?: boolean;
  /** Make spacer shrink (flex context) */
  shrink?: boolean;
  /** Base size (when not using semantic sizes) */
  px?: number;
  /** Responsive size overrides */
  responsive?: {
    mobile?: SpacerSize;
    tablet?: SpacerSize;
    desktop?: SpacerSize;
    wide?: SpacerSize;
  };
  /** As child element (render as child instead of div) */
  asChild?: boolean;
}

/**
 * Spacing values in pixels (based on 4px grid)
 */
const spacingPxMap: Record<SpacerSize, number> = {
  xs: 4,    // 4px
  sm: 8,    // 8px
  md: 16,   // 16px
  lg: 24,   // 24px
  xl: 32,   // 32px
  '2xl': 48, // 48px
  '3xl': 64, // 64px
  '4xl': 96, // 96px
};

/**
 * Tailwind spacing classes
 */
const spacingClassMap: Record<SpacerSize, string> = {
  xs: 'w-1 h-1',      // 4px
  sm: 'w-2 h-2',      // 8px
  md: 'w-4 h-4',      // 16px
  lg: 'w-6 h-6',      // 24px
  xl: 'w-8 h-8',      // 32px
  '2xl': 'w-12 h-12', // 48px
  '3xl': 'w-16 h-16', // 64px
  '4xl': 'w-24 h-24', // 96px
};

/**
 * Direction-specific spacing classes
 */
const getDirectionClass = (size: SpacerSize, direction: SpacerDirection, axis: SpacerAxis): string => {
  const px = spacingPxMap[size];
  const classMap: Record<SpacerDirection, Record<SpacerAxis, string>> = {
    top: {
      both: `h-${px} w-full`,
      vertical: `h-${px} w-full`,
      horizontal: '',
    },
    bottom: {
      both: `h-${px} w-full`,
      vertical: `h-${px} w-full`,
      horizontal: '',
    },
    left: {
      both: `w-${px} h-full`,
      vertical: '',
      horizontal: `w-${px} h-full`,
    },
    right: {
      both: `w-${px} h-full`,
      vertical: '',
      horizontal: `w-${px} h-full`,
    },
    all: {
      both: `w-${px} h-${px}`,
      vertical: `h-${px} w-full`,
      horizontal: `w-${px} h-full`,
    },
  };
  
  return classMap[direction]?.[axis] || '';
};

/**
 * Responsive spacing classes
 */
const getResponsiveClasses = (
  responsive: SpacerProps['responsive'],
  axis: SpacerAxis,
  direction: SpacerDirection
): string => {
  if (!responsive) return '';
  
  const classes: string[] = [];
  
  if (responsive.mobile) {
    const cls = getDirectionClass(responsive.mobile, direction, axis);
    if (cls) classes.push(cls);
  }
  if (responsive.tablet) {
    const cls = getDirectionClass(responsive.tablet, direction, axis);
    if (cls) classes.push(`md:${cls}`);
  }
  if (responsive.desktop) {
    const cls = getDirectionClass(responsive.desktop, direction, axis);
    if (cls) classes.push(`lg:${cls}`);
  }
  if (responsive.wide) {
    const cls = getDirectionClass(responsive.wide, direction, axis);
    if (cls) classes.push(`xl:${cls}`);
  }
  
  return classes.join(' ');
};

/**
 * Spacer Component
 * 
 * A flexible component for creating consistent spacing between UI elements.
 * 
 * @example
 * <VStack>
 *   <div>First item</div>
 *   <Spacer size="md" />
 *   <div>Second item</div>
 * </VStack>
 * 
 * @example
 * <HStack>
 *   <div>Left</div>
 *   <Spacer grow />
 *   <div>Right</div>
 * </HStack>
 * 
 * @example
 * <div className="flex flex-col">
 *   <div>Header</div>
 *   <Spacer direction="bottom" size="lg" />
 *   <div>Content</div>
 *   <Spacer direction="top" size="xl" />
 *   <div>Footer</div>
 * </div>
 * 
 * @example
 * <Spacer axis="horizontal" size="md" responsive={{ mobile: 'sm', desktop: 'xl' }} />
 */
export const Spacer = React.forwardRef<HTMLDivElement, SpacerProps>(
  (
    {
      size = 'md',
      axis = 'both',
      direction = 'all',
      grow = false,
      shrink = false,
      px,
      responsive,
      asChild = false,
      className,
      ...props
    },
    ref
  ) => {
    // Custom pixel value overrides semantic size
    let classes = '';
    
    if (px !== undefined) {
      // Custom pixel spacing
      const isHorizontal = axis === 'horizontal' || direction === 'left' || direction === 'right';
      const isVertical = axis === 'vertical' || direction === 'top' || direction === 'bottom';
      
      if (isHorizontal && isVertical) {
        classes = `w-[${px}px] h-[${px}px]`;
      } else if (isHorizontal) {
        classes = `w-[${px}px] h-full`;
      } else if (isVertical) {
        classes = `h-[${px}px] w-full`;
      }
    } else {
      // Semantic spacing
      const baseClass = getDirectionClass(size, direction, axis);
      const responsiveClass = getResponsiveClasses(responsive, axis, direction);
      classes = cn(baseClass, responsiveClass);
    }
    
    // Flex grow/shrink
    const flexClasses = cn(
      grow && 'flex-grow',
      shrink && 'flex-shrink',
      grow && shrink && 'flex-grow flex-shrink'
    );
    
    // Base classes
    const baseClasses = cn(
      classes,
      flexClasses,
      className
    );
    
    return (
      <div ref={ref} className={baseClasses} aria-hidden="true" {...props} />
    );
  }
);

Spacer.displayName = 'Spacer';

// ============================================================================
// VARIANT SHORTCUTS
// ============================================================================

/**
 * Vertical Spacer - Adds vertical space
 * 
 * @example
 * <VStack>
 *   <div>Item 1</div>
 *   <VSpacer size="lg" />
 *   <div>Item 2</div>
 * </VStack>
 */
export const VSpacer = React.forwardRef<HTMLDivElement, Omit<SpacerProps, 'axis'>>(
  (props, ref) => <Spacer ref={ref} axis="vertical" {...props} />
);
VSpacer.displayName = 'VSpacer';

/**
 * Horizontal Spacer - Adds horizontal space
 * 
 * @example
 * <HStack>
 *   <div>Left</div>
 *   <HSpacer size="lg" />
 *   <div>Right</div>
 * </HStack>
 */
export const HSpacer = React.forwardRef<HTMLDivElement, Omit<SpacerProps, 'axis'>>(
  (props, ref) => <Spacer ref={ref} axis="horizontal" {...props} />
);
HSpacer.displayName = 'HSpacer';

/**
 * Flexible Spacer - Grows to fill available space
 * 
 * @example
 * <div className="flex">
 *   <div>Left</div>
 *   <FlexSpacer />
 *   <div>Right</div>
 * </div>
 */
export const FlexSpacer = React.forwardRef<HTMLDivElement, Omit<SpacerProps, 'grow' | 'size'>>(
  (props, ref) => <Spacer ref={ref} grow size="xs" {...props} />
);
FlexSpacer.displayName = 'FlexSpacer';

/**
 * Top Spacer - Adds space only at the top
 */
export const TopSpacer = React.forwardRef<HTMLDivElement, Omit<SpacerProps, 'direction'>>(
  (props, ref) => <Spacer ref={ref} direction="top" {...props} />
);
TopSpacer.displayName = 'TopSpacer';

/**
 * Bottom Spacer - Adds space only at the bottom
 */
export const BottomSpacer = React.forwardRef<HTMLDivElement, Omit<SpacerProps, 'direction'>>(
  (props, ref) => <Spacer ref={ref} direction="bottom" {...props} />
);
BottomSpacer.displayName = 'BottomSpacer';

/**
 * Left Spacer - Adds space only on the left
 */
export const LeftSpacer = React.forwardRef<HTMLDivElement, Omit<SpacerProps, 'direction'>>(
  (props, ref) => <Spacer ref={ref} direction="left" {...props} />
);
LeftSpacer.displayName = 'LeftSpacer';

/**
 * Right Spacer - Adds space only on the right
 */
export const RightSpacer = React.forwardRef<HTMLDivElement, Omit<SpacerProps, 'direction'>>(
  (props, ref) => <Spacer ref={ref} direction="right" {...props} />
);
RightSpacer.displayName = 'RightSpacer';

// ============================================================================
// COMPOSITION COMPONENTS
// ============================================================================

export interface SpacerGroupProps {
  children: React.ReactNode;
  spacing?: SpacerSize;
  direction?: 'horizontal' | 'vertical';
  className?: string;
}

/**
 * SpacerGroup - Automatically adds spacers between children
 * 
 * @example
 * <SpacerGroup spacing="md">
 *   <Button>Button 1</Button>
 *   <Button>Button 2</Button>
 *   <Button>Button 3</Button>
 * </SpacerGroup>
 */
export const SpacerGroup = React.forwardRef<HTMLDivElement, SpacerGroupProps>(
  ({ children, spacing = 'md', direction = 'horizontal', className }, ref) => {
    const childArray = React.Children.toArray(children);
    
    return (
      <div 
        ref={ref}
        className={cn(
          'flex',
          direction === 'horizontal' ? 'flex-row' : 'flex-col',
          className
        )}
      >
        {childArray.map((child, index) => (
          <React.Fragment key={index}>
            {child}
            {index < childArray.length - 1 && (
              direction === 'horizontal' 
                ? <HSpacer size={spacing} />
                : <VSpacer size={spacing} />
            )}
          </React.Fragment>
        ))}
      </div>
    );
  }
);
SpacerGroup.displayName = 'SpacerGroup';