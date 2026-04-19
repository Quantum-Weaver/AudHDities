"use client";
// components/ui/Card.tsx
// Card Component - The room within the sanctuary
// Provides contained surfaces for grouped content
// Uses COSMIC design tokens for styling

import React from 'react';
import { cn } from '@/lib/utils';
import { Button } from './Button';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/Avatar';
import { AspectRatioImage } from './AspectRatio';

export type CardVariant = 'default' | 'elevated' | 'glass' | 'outline' | 'ghost';
export type CardPadding = 'none' | 'sm' | 'md' | 'lg' | 'xl';
export type CardRadius = 'none' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'full';

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Visual style of the card */
  variant?: CardVariant;
  /** Padding inside the card */
  padding?: CardPadding;
  /** Border radius */
  radius?: CardRadius;
  /** Make card interactive (adds hover effects) */
  interactive?: boolean;
  /** Make card fill height of parent */
  fillHeight?: boolean;
  /** Make card fill width of parent */
  fillWidth?: boolean;
  /** As child element */
  asChild?: boolean;
}

/**
 * Variant classes
 */
const variantMap: Record<CardVariant, string> = {
  default: 'bg-white/5 border border-white/10',
  elevated: 'bg-white/5 border border-white/10 shadow-lg',
  glass: 'bg-white/5 backdrop-blur-md border border-white/20',
  outline: 'bg-transparent border border-white/10',
  ghost: 'bg-transparent border-none',
};

/**
 * Padding classes
 */
const paddingMap: Record<CardPadding, string> = {
  none: 'p-0',
  sm: 'p-3',
  md: 'p-4',
  lg: 'p-6',
  xl: 'p-8',
};

/**
 * Radius classes
 */
const radiusMap: Record<CardRadius, string> = {
  none: 'rounded-none',
  sm: 'rounded-sm',
  md: 'rounded-md',
  lg: 'rounded-lg',
  xl: 'rounded-xl',
  '2xl': 'rounded-2xl',
  full: 'rounded-full',
};

/**
 * Interactive hover classes
 */
const interactiveClasses = 'transition-all duration-200 hover:scale-[1.02] hover:border-cyan-500/30 hover:shadow-lg hover:shadow-cyan-500/10 cursor-pointer';

/**
 * Card Component
 * 
 * A flexible container for grouped content.
 * 
 * @example
 * <Card>
 *   <CardHeader>
 *     <CardTitle>Profile</CardTitle>
 *   </CardHeader>
 *   <CardBody>
 *     <p>Content goes here</p>
 *   </CardBody>
 *   <CardFooter>
 *     <Button>Action</Button>
 *   </CardFooter>
 * </Card>
 * 
 * @example
 * <Card variant="glass" interactive padding="lg">
 *   <img src="/image.jpg" alt="Card image" />
 *   <h3>Title</h3>
 *   <p>Description</p>
 * </Card>
 */
export const Card = React.forwardRef<HTMLDivElement, CardProps>(
  (
    {
      children,
      variant = 'default',
      padding = 'md',
      radius = 'lg',
      interactive = false,
      fillHeight = false,
      fillWidth = true,
      asChild = false,
      className,
      ...props
    },
    ref
  ) => {
    const baseClasses = cn(
      variantMap[variant],
      paddingMap[padding],
      radiusMap[radius],
      fillHeight && 'h-full',
      fillWidth && 'w-full',
      interactive && interactiveClasses,
      className
    );
    
    return (
      <div ref={ref} className={baseClasses} {...props}>
        {children}
      </div>
    );
  }
);

Card.displayName = 'Card';

// ============================================================================
// CARD COMPOSITION COMPONENTS
// ============================================================================

export interface CardHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Remove bottom spacing */
  noSpacing?: boolean;
}

/**
 * CardHeader - Top section of a card
 * Typically contains title, subtitle, and action buttons
 */
export const CardHeader = React.forwardRef<HTMLDivElement, CardHeaderProps>(
  ({ children, noSpacing = false, className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        'flex flex-col space-y-1.5',
        !noSpacing && 'pb-4 border-b border-white/10',
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
);
CardHeader.displayName = 'CardHeader';

export interface CardTitleProps extends React.HTMLAttributes<HTMLHeadingElement> {
  /** As child element (render as different heading level) */
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
}

/**
 * CardTitle - Title within a card header
 */
export const CardTitle = React.forwardRef<HTMLHeadingElement, CardTitleProps>(
  ({ children, as: Component = 'h3', className, ...props }, ref) => (
    <Component
      ref={ref}
      className={cn('text-lg font-semibold leading-none tracking-tight text-white', className)}
      {...props}
    >
      {children}
    </Component>
  )
);
CardTitle.displayName = 'CardTitle';

export interface CardDescriptionProps extends React.HTMLAttributes<HTMLParagraphElement> {}

/**
 * CardDescription - Description text within a card header
 */
export const CardDescription = React.forwardRef<HTMLParagraphElement, CardDescriptionProps>(
  ({ children, className, ...props }, ref) => (
    <p
      ref={ref}
      className={cn('text-sm text-white/60', className)}
      {...props}
    >
      {children}
    </p>
  )
);
CardDescription.displayName = 'CardDescription';

export interface CardBodyProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Remove vertical spacing */
  noSpacing?: boolean;
}

/**
 * CardBody - Main content area of a card
 */
export const CardBody = React.forwardRef<HTMLDivElement, CardBodyProps>(
  ({ children, noSpacing = false, className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(!noSpacing && 'py-4', className)}
      {...props}
    >
      {children}
    </div>
  )
);
CardBody.displayName = 'CardBody';

export interface CardFooterProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Remove top spacing */
  noSpacing?: boolean;
}

/**
 * CardFooter - Bottom section of a card
 * Typically contains actions like buttons or links
 */
export const CardFooter = React.forwardRef<HTMLDivElement, CardFooterProps>(
  ({ children, noSpacing = false, className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        'flex items-center gap-3',
        !noSpacing && 'pt-4 border-t border-white/10',
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
);
CardFooter.displayName = 'CardFooter';

export interface CardImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  /** Position of the image */
  position?: 'top' | 'bottom';
}

/**
 * CardImage - Image within a card (full width)
 */
export const CardImage = React.forwardRef<HTMLImageElement, CardImageProps>(
  ({ src, alt, position = 'top', className, ...props }, ref) => (
    <div className={cn(position === 'top' ? '-mt-px' : '-mb-px', 'mx-0 overflow-hidden')}>
      <img
        ref={ref}
        src={src}
        alt={alt}
        className={cn(
          'w-full object-cover',
          position === 'top' ? 'rounded-t-[calc(1rem-1px)]' : 'rounded-b-[calc(1rem-1px)]',
          className
        )}
        {...props}
      />
    </div>
  )
);
CardImage.displayName = 'CardImage';

// ============================================================================
// VARIANT SHORTCUTS
// ============================================================================

/**
 * GlassCard - Frosted glass effect
 */
export const GlassCard = React.forwardRef<HTMLDivElement, Omit<CardProps, 'variant'>>(
  (props, ref) => <Card ref={ref} variant="glass" {...props} />
);
GlassCard.displayName = 'GlassCard';

/**
 * ElevatedCard - With shadow
 */
export const ElevatedCard = React.forwardRef<HTMLDivElement, Omit<CardProps, 'variant'>>(
  (props, ref) => <Card ref={ref} variant="elevated" {...props} />
);
ElevatedCard.displayName = 'ElevatedCard';

/**
 * OutlineCard - Bordered only, no background
 */
export const OutlineCard = React.forwardRef<HTMLDivElement, Omit<CardProps, 'variant'>>(
  (props, ref) => <Card ref={ref} variant="outline" {...props} />
);
OutlineCard.displayName = 'OutlineCard';

/**
 * InteractiveCard - With hover effects
 */
export const InteractiveCard = React.forwardRef<HTMLDivElement, Omit<CardProps, 'interactive'>>(
  (props, ref) => <Card ref={ref} interactive {...props} />
);
InteractiveCard.displayName = 'InteractiveCard';

// ============================================================================
// COMPOSITION COMPONENTS
// ============================================================================

export interface ProductCardProps {
  image: string;
  title: string;
  price: number;
  currency?: string;
  onAction?: () => void;
  actionLabel?: string;
  variant?: CardVariant;
}

/**
 * ProductCard - Pre-built product card
 * 
 * @example
 * <ProductCard
 *   image="/product.jpg"
 *   title="Quantum Weaver Hoodie"
 *   price={49.99}
 *   onAction={() => addToCart()}
 * />
 */
export const ProductCard = React.forwardRef<HTMLDivElement, ProductCardProps>(
  ({ image, title, price, currency = '$', onAction, actionLabel = 'Purchase', variant = 'glass' }, ref) => (
    <Card ref={ref} variant={variant} interactive padding="none" className="overflow-hidden">
      <AspectRatioImage src={image} alt={title} ratio="1/1" />
      <CardBody className="p-4">
        <CardTitle className="mb-1">{title}</CardTitle>
        <p className="text-cyan-400 font-semibold">{currency}{price.toFixed(2)}</p>
      </CardBody>
      <CardFooter className="p-4 pt-0">
        <Button onClick={onAction} size="sm" className="w-full">{actionLabel}</Button>
      </CardFooter>
    </Card>
  )
);
ProductCard.displayName = 'ProductCard';

export interface UserCardProps {
  avatar: string;
  name: string;
  role?: string;
  onFollow?: () => void;
  isFollowing?: boolean;
  variant?: CardVariant;
}

/**
 * UserCard - Pre-built user/profile card
 * 
 * @example
 * <UserCard
 *   avatar="/avatar.jpg"
 *   name="Quantum Weaver"
 *   role="Creator"
 *   onFollow={() => follow()}
 * />
 */
export const UserCard = React.forwardRef<HTMLDivElement, UserCardProps>(
  ({ avatar, name, role, onFollow, isFollowing = false, variant = 'glass' }, ref) => (
    <Card ref={ref} variant={variant} interactive padding="md" className="text-center">
      <Avatar src={avatar} alt={name} size="xl" className="mx-auto mb-3" />
      <CardTitle>{name}</CardTitle>
      {role && <CardDescription>{role}</CardDescription>}
      <CardFooter className="justify-center mt-4">
        {onFollow && (
          <Button onClick={onFollow} size="sm" variant={isFollowing ? 'outline' : 'primary'}>
            {isFollowing ? 'Following' : 'Follow'}
          </Button>
        )}
      </CardFooter>
    </Card>
  )
);
UserCard.displayName = 'UserCard';

export interface MetricCardProps {
  title: string;
  value: string | number;
  icon?: React.ReactNode;
  trend?: 'up' | 'down' | 'neutral';
  trendValue?: string;
  variant?: CardVariant;
}

/**
 * MetricCard - Pre-built metric/stat card
 * 
 * @example
 * <MetricCard
 *   title="Total Sales"
 *   value="$12,345"
 *   icon={<DollarSign />}
 *   trend="up"
 *   trendValue="+12%"
 * />
 */
export const MetricCard = React.forwardRef<HTMLDivElement, MetricCardProps>(
  ({ title, value, icon, trend, trendValue, variant = 'glass' }, ref) => (
    <Card ref={ref} variant={variant} padding="md">
      <div className="flex justify-between items-start">
        <div>
          <CardDescription>{title}</CardDescription>
          <CardTitle className="text-2xl mt-1">{value}</CardTitle>
          {trend && trendValue && (
            <p className={cn(
              'text-xs mt-2',
              trend === 'up' && 'text-green-400',
              trend === 'down' && 'text-red-400',
              trend === 'neutral' && 'text-white/40'
            )}>
              {trend === 'up' && '↑'} {trend === 'down' && '↓'} {trendValue}
            </p>
          )}
        </div>
        {icon && (
          <div className="p-2 rounded-full bg-white/10">
            {icon}
          </div>
        )}
      </div>
    </Card>
  )
);
MetricCard.displayName = 'MetricCard';