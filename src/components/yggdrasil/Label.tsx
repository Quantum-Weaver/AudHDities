// src/components/yggdrasil/Label.tsx
// ╔═══════════════════════════════════════════════════════════════════════════╗
// ║                    LABEL COMPONENT                                        ║
// ║                    Form field label with variant support                  ║
// ╚═══════════════════════════════════════════════════════════════════════════╝

'use client';

import React from 'react';
import { cn } from '@/lib/utils';
import { labelVariants } from '@/lib/constants/components/yggdrasil/label.variants';
import { LABEL_DISABLED_OPACITY } from '@/lib/constants/components/yggdrasil/label.constants';
import type { LabelVariant, LabelSize } from '@/lib/constants/components/yggdrasil/label.variants';
import type { LabelProps } from '@/types/components/yggdrasil/label.types';

export type { LabelSize };
export type { LabelProps };

/**
 * Label — Form field label with required, optional, and error states.
 *
 * @example
 * <Label htmlFor="email" required>Email Address</Label>
 *
 * @example
 * <Label htmlFor="bio" optional>Biography</Label>
 *
 * @example
 * <Label htmlFor="name" error>Name is required</Label>
 */
export const Label = React.forwardRef<HTMLLabelElement, LabelProps>(
  (
    {
      children,
      size = 'md',
      required = false,
      optional = false,
      error = false,
      disabled = false,
      className,
      ...props
    },
    ref
  ) => {
    // Determine variant from props — mutually exclusive priority
    let variant: LabelVariant = 'default';
    if (error) variant = 'error';
    else if (required) variant = 'required';
    else if (optional) variant = 'optional';

    return (
      <label
        ref={ref}
        className={cn(
          labelVariants({ variant, size }),
          disabled && LABEL_DISABLED_OPACITY,
          className
        )}
        {...props}
      >
        {children}
      </label>
    );
  }
);

Label.displayName = 'Label';