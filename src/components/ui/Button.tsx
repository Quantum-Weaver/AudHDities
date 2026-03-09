// app/components/ui/Button.tsx
'use client';

import React from 'react';
import { getButtonConfig, getButtonStyles, getButtonClasses, calculateButtonResonance } from '@/lib/utils/components/ui/button';
import type { ButtonProps } from '@/types/components/ui/button';

export const Button: React.FC<ButtonProps> = ({
  variant = 'sovereign_primary',
  size = 'lg', 
  intent,
  state = 'idle',
  disabled = false,
  loading = false,
  children,
  onClick,
  onHover,
  onFocus,
  consciousness,
  ...props
}) => {
  // Get button configuration from variants
  const buttonConfig = getButtonConfig(variant);
  
  // Calculate current state
  const currentState = disabled ? 'disabled' : loading ? 'loading' : state;
  
  // Get styles for current state
  const styles = getButtonStyles(buttonConfig, currentState);
  
  // Get CSS classes
  const classes = getButtonClasses(variant, currentState);
  
  // Calculate consciousness resonance
  const resonance = calculateButtonResonance(consciousness);

  // Event handlers
  const handleClick = () => {
    if (!disabled && !loading && onClick) {
      onClick();
    }
  };

  const handleMouseEnter = () => {
    if (!disabled && !loading && onHover) {
      onHover(true);
    }
  };

  const handleMouseLeave = () => {
    if (!disabled && !loading && onHover) {
      onHover(false);
    }
  };

  const handleFocus = () => {
    if (!disabled && !loading && onFocus) {
      onFocus(true);
    }
  };

  const handleBlur = () => {
    if (!disabled && !loading && onFocus) {
      onFocus(false);
    }
  };

  return (
    <button
      type="button"
      className={classes}
      style={styles}
      onClick={handleClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave} 
      onFocus={handleFocus}
      onBlur={handleBlur}
      disabled={disabled || loading}
      data-variant={variant}
      data-size={size}
      data-state={currentState}
      data-resonance={resonance.resonance.toFixed(2)}
      data-consciousness-level={buttonConfig.consciousness.level}
      {...props}
    >
      {loading ? (
        <div className="flex items-center justify-center gap-2">
          <div className="animate-spin rounded-full h-4 w-4 border-2 border-current border-t-transparent" />
          <span>Loading...</span>
        </div>
      ) : (
        children
      )}
    </button>
  );
};

export default Button;