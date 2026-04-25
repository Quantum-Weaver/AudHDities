// src/components/ui/Button.tsx
'use client';

import { forwardRef } from 'react';
import { Button as ButtonPrimitive } from '@base-ui/react/button';
import { cn } from '@/lib/utils';
import { buttonVariants } from '@/lib/constants/components/ui/button.variants';
import { Spinner } from '@/components/ui/Spinner';
import { 
  getButtonIconSizeClass, 
  getButtonAriaLabel,
  getLoadingSpinnerVariant,
} from '@/lib/utils/components/yggdrasil/button.utils';
import type { ButtonProps, IconButtonProps } from '@/types/components/yggdrasil/button.types';

// ============================================================================
// MAIN BUTTON COMPONENT
// ============================================================================

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ 
    variant = 'primary',
    size = 'md',
    fullWidth = false,
    loading = false,
    disabled = false,
    icon,
    iconPosition = 'left',
    iconOnly = false,
    loadingText,
    asChild = false,
    type = 'button',
    className,
    children,
    onClick,
    ...props 
  }, ref) => {
    
    const isDisabled = disabled || loading;
    const ariaLabel = getButtonAriaLabel({ loading, disabled, iconOnly, children });
    const iconSizeClass = getButtonIconSizeClass(size);
    
    // Map button variant to spinner variant
    const spinnerVariant = getLoadingSpinnerVariant(variant);
    
    // Determine display content
    const displayChildren = loading && loadingText ? loadingText : children;
    const showIconOnly = iconOnly && !loading;
    
    const content = (
      <>
        {/* Loading spinner overlay */}
        {loading && (
          <span className="absolute inset-0 flex items-center justify-center">
            <Spinner 
              size={size === 'xs' ? 'xs' : size === 'sm' ? 'sm' : size === 'lg' ? 'lg' : size === 'xl' ? 'xl' : 'md'}
              variant={spinnerVariant}
              speed="normal"
              type="circle"
            />
          </span>
        )}
        
        {/* Button content */}
        <span 
          className={cn(
            "inline-flex items-center justify-center gap-2",
            loading && "opacity-0"
          )}
        >
          {icon && iconPosition === 'left' && (
            <span className={iconSizeClass}>{icon}</span>
          )}
          {!showIconOnly && displayChildren}
          {icon && iconPosition === 'right' && !showIconOnly && (
            <span className={iconSizeClass}>{icon}</span>
          )}
          {showIconOnly && icon && (
            <span className={iconSizeClass}>{icon}</span>
          )}
        </span>
      </>
    );
    
    // Common props for both ButtonPrimitive and anchor cases
    const commonProps = {
      className: cn(
        buttonVariants({ variant, size, fullWidth, loading }),
        // Add transition for loading state changes
        loading && "transition-all",
        className
      ),
      disabled: isDisabled,
      'aria-label': ariaLabel,
      'aria-busy': loading,
      'data-loading': loading,
      'data-variant': variant,
      'data-size': size,
      ...props,
    };
    
    // Handle asChild (polymorphic) rendering
    if (asChild) {
      return (
        <ButtonPrimitive
          ref={ref}
          {...commonProps}
        >
          {content}
        </ButtonPrimitive>
      );
    }
    
    // Regular button rendering
    return (
      <ButtonPrimitive
        ref={ref}
        type={type}
        onClick={onClick}
        {...commonProps}
      >
        {content}
      </ButtonPrimitive>
    );
  }
);

Button.displayName = "Button";

// ============================================================================
// ICON BUTTON COMPONENT (Convenience wrapper)
// ============================================================================

const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>(
  ({ icon, 'aria-label': ariaLabel, size = 'icon', ...props }, ref) => {
    return (
      <Button
        ref={ref}
        icon={icon}
        iconOnly
        size={size}
        aria-label={ariaLabel}
        {...props}
      />
    );
  }
);

IconButton.displayName = "IconButton";

// ============================================================================
// EXPORTS
// ============================================================================

export { Button, IconButton };
export type { ButtonProps, IconButtonProps };