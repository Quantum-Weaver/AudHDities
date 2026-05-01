## 📊 **DATA DISPLAY COMPONENTS: Overview**

Data display components are the **visualization system** of the interface—they present information in structured, scannable ways. Every table, every badge, every progress bar helps users understand their data at a glance.

**What this system provides:**
- Consistent data presentation across the application
- Accessible table structures with sorting and pagination
- Visual badges for status, categories, and tags
- User avatars with presence indicators
- Progress tracking with multiple variants

---

## 📁 **`components/ui/Table.tsx`**

```tsx
// components/ui/Table.tsx
// Table Component - The structured data grid
// Presents tabular data with sorting and accessibility

import React from 'react';
import { cn } from '@/lib/utils';
import { ChevronUp, ChevronDown } from 'lucide-react';

export type TableVariant = 'default' | 'bordered' | 'minimal';
export type TableSize = 'sm' | 'md' | 'lg';

export interface TableProps extends React.TableHTMLAttributes<HTMLTableElement> {
  /** Visual variant */
  variant?: TableVariant;
  /** Size of table cells */
  size?: TableSize;
  /** Make table full width */
  fullWidth?: boolean;
}

const variantClasses: Record<TableVariant, string> = {
  default: 'w-full caption-bottom text-sm',
  bordered: 'w-full caption-bottom text-sm border border-white/10 rounded-lg',
  minimal: 'w-full caption-bottom text-sm',
};

const cellSizeClasses: Record<TableSize, string> = {
  sm: 'px-2 py-1.5',
  md: 'px-3 py-2',
  lg: 'px-4 py-3',
};

/**
 * Table Component
 * 
 * @example
 * <Table>
 *   <TableHeader>
 *     <TableRow>
 *       <TableHead>Name</TableHead>
 *       <TableHead>Role</TableHead>
 *     </TableRow>
 *   </TableHeader>
 *   <TableBody>
 *     <TableRow>
 *       <TableCell>Quantum Weaver</TableCell>
 *       <TableCell>Creator</TableCell>
 *     </TableRow>
 *   </TableBody>
 * </Table>
 */
export const Table = React.forwardRef<HTMLTableElement, TableProps>(
  ({ variant = 'default', size = 'md', fullWidth = true, className, children, ...props }, ref) => (
    <div className={cn('relative overflow-x-auto', variant === 'bordered' && 'rounded-lg')}>
      <table
        ref={ref}
        className={cn(
          variantClasses[variant],
          fullWidth && 'w-full',
          className
        )}
        {...props}
      >
        {children}
      </table>
    </div>
  )
);
Table.displayName = 'Table';

export const TableHeader = React.forwardRef<
  HTMLTableSectionElement,
  React.HTMLAttributes<HTMLTableSectionElement>
>(({ className, ...props }, ref) => (
  <thead ref={ref} className={cn('[&_tr]:border-b', className)} {...props} />
));
TableHeader.displayName = 'TableHeader';

export const TableBody = React.forwardRef<
  HTMLTableSectionElement,
  React.HTMLAttributes<HTMLTableSectionElement>
>(({ className, ...props }, ref) => (
  <tbody ref={ref} className={cn('[&_tr:last-child]:border-0', className)} {...props} />
));
TableBody.displayName = 'TableBody';

export const TableFooter = React.forwardRef<
  HTMLTableSectionElement,
  React.HTMLAttributes<HTMLTableSectionElement>
>(({ className, ...props }, ref) => (
  <tfoot
    ref={ref}
    className={cn('border-t bg-white/5 font-medium', className)}
    {...props}
  />
));
TableFooter.displayName = 'TableFooter';

export interface TableRowProps extends React.HTMLAttributes<HTMLTableRowElement> {
  /** Make row interactive */
  interactive?: boolean;
}

export const TableRow = React.forwardRef<HTMLTableRowElement, TableRowProps>(
  ({ className, interactive = false, ...props }, ref) => (
    <tr
      ref={ref}
      className={cn(
        'border-b border-white/10 transition-colors',
        interactive && 'hover:bg-white/5 cursor-pointer',
        className
      )}
      {...props}
    />
  )
);
TableRow.displayName = 'TableRow';

export interface TableHeadProps extends React.ThHTMLAttributes<HTMLTableCellElement> {
  /** Sort direction */
  sortDirection?: 'asc' | 'desc' | null;
  /** Callback when sort is requested */
  onSort?: () => void;
  /** Size of the cell */
  size?: TableSize;
}

export const TableHead = React.forwardRef<HTMLTableCellElement, TableHeadProps>(
  ({ className, children, sortDirection, onSort, size = 'md', ...props }, ref) => (
    <th
      ref={ref}
      className={cn(
        'text-left align-middle font-medium text-white/60',
        cellSizeClasses[size],
        onSort && 'cursor-pointer select-none hover:text-white/80',
        className
      )}
      onClick={onSort}
      {...props}
    >
      <div className="flex items-center gap-1">
        {children}
        {onSort && (
          <span className="inline-flex flex-col">
            <ChevronUp
              className={cn(
                'h-3 w-3 -mb-1',
                sortDirection === 'asc' ? 'text-cyan-400' : 'text-white/30'
              )}
            />
            <ChevronDown
              className={cn(
                'h-3 w-3 -mt-1',
                sortDirection === 'desc' ? 'text-cyan-400' : 'text-white/30'
              )}
            />
          </span>
        )}
      </div>
    </th>
  )
);
TableHead.displayName = 'TableHead';

export interface TableCellProps extends React.TdHTMLAttributes<HTMLTableCellElement> {
  /** Size of the cell */
  size?: TableSize;
}

export const TableCell = React.forwardRef<HTMLTableCellElement, TableCellProps>(
  ({ className, size = 'md', ...props }, ref) => (
    <td
      ref={ref}
      className={cn('align-middle', cellSizeClasses[size], className)}
      {...props}
    />
  )
);
TableCell.displayName = 'TableCell';

export const TableCaption = React.forwardRef<
  HTMLTableCaptionElement,
  React.HTMLAttributes<HTMLTableCaptionElement>
>(({ className, ...props }, ref) => (
  <caption ref={ref} className={cn('mt-4 text-sm text-white/40', className)} {...props} />
));
TableCaption.displayName = 'TableCaption';
```

---

## 📁 **`components/ui/Badge.tsx`**

```tsx
// components/ui/Badge.tsx
// Badge Component - The status indicator
// Shows status, categories, or small amounts of information

import React from 'react';
import { cn } from '@/lib/utils';

export type BadgeVariant = 
  | 'default' 
  | 'primary' 
  | 'success' 
  | 'warning' 
  | 'error' 
  | 'info'
  | 'quantum'
  | 'cosmic'
  | 'purple'
  | 'cyan'
  | 'pink'
  | 'green';

export type BadgeSize = 'sm' | 'md' | 'lg';

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Visual variant */
  variant?: BadgeVariant;
  /** Size of the badge */
  size?: BadgeSize;
  /** Make badge rounded-full */
  pill?: boolean;
  /** Show dot indicator */
  dot?: boolean;
  /** Removable badge with close button */
  removable?: boolean;
  /** Callback when removed */
  onRemove?: () => void;
}

const variantClasses: Record<BadgeVariant, string> = {
  default: 'bg-white/10 text-white/80',
  primary: 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/30',
  success: 'bg-green-500/20 text-green-400 border border-green-500/30',
  warning: 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/30',
  error: 'bg-red-500/20 text-red-400 border border-red-500/30',
  info: 'bg-blue-500/20 text-blue-400 border border-blue-500/30',
  quantum: 'bg-quantum-purple/20 text-quantum-purple border border-quantum-purple/30',
  cosmic: 'bg-cosmic-blue/20 text-cosmic-blue border border-cosmic-blue/30',
  purple: 'bg-purple-500/20 text-purple-400 border border-purple-500/30',
  cyan: 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/30',
  pink: 'bg-pink-500/20 text-pink-400 border border-pink-500/30',
  green: 'bg-green-500/20 text-green-400 border border-green-500/30',
};

const sizeClasses: Record<BadgeSize, string> = {
  sm: 'px-1.5 py-0.5 text-xs',
  md: 'px-2 py-0.5 text-sm',
  lg: 'px-2.5 py-1 text-base',
};

const dotSizeClasses: Record<BadgeSize, string> = {
  sm: 'w-1.5 h-1.5',
  md: 'w-2 h-2',
  lg: 'w-2.5 h-2.5',
};

/**
 * Badge Component
 * 
 * @example
 * <Badge variant="primary">Active</Badge>
 * 
 * @example
 * <Badge variant="success" pill>Completed</Badge>
 * 
 * @example
 * <Badge variant="error" dot>Offline</Badge>
 */
export const Badge = React.forwardRef<HTMLDivElement, BadgeProps>(
  (
    {
      children,
      variant = 'default',
      size = 'md',
      pill = false,
      dot = false,
      removable = false,
      onRemove,
      className,
      ...props
    },
    ref
  ) => {
    return (
      <div
        ref={ref}
        className={cn(
          'inline-flex items-center gap-1.5 font-medium',
          variantClasses[variant],
          sizeClasses[size],
          pill ? 'rounded-full' : 'rounded-md',
          className
        )}
        {...props}
      >
        {dot && (
          <span
            className={cn(
              'rounded-full bg-current',
              dotSizeClasses[size]
            )}
          />
        )}
        {children}
        {removable && (
          <button
            type="button"
            onClick={onRemove}
            className={cn(
              'ml-0.5 rounded-full hover:bg-white/20 transition-colors',
              size === 'sm' ? 'p-0.5' : 'p-1'
            )}
            aria-label="Remove"
          >
            <svg
              className={cn(
                'text-current',
                size === 'sm' ? 'h-2.5 w-2.5' : 'h-3 w-3'
              )}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        )}
      </div>
    );
  }
);

Badge.displayName = 'Badge';

// ============================================================================
// BADGE GROUP
// ============================================================================

export interface BadgeGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Spacing between badges */
  spacing?: 'sm' | 'md' | 'lg';
}

const groupSpacingClasses: Record<string, string> = {
  sm: 'gap-1',
  md: 'gap-2',
  lg: 'gap-3',
};

/**
 * BadgeGroup - Container for multiple badges
 * 
 * @example
 * <BadgeGroup>
 *   <Badge>Tag 1</Badge>
 *   <Badge>Tag 2</Badge>
 *   <Badge>Tag 3</Badge>
 * </BadgeGroup>
 */
export const BadgeGroup = React.forwardRef<HTMLDivElement, BadgeGroupProps>(
  ({ children, spacing = 'md', className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn('flex flex-wrap', groupSpacingClasses[spacing], className)}
      {...props}
    >
      {children}
    </div>
  )
);
BadgeGroup.displayName = 'BadgeGroup';
```

---

## 📁 **`components/ui/Progress.tsx`**

```tsx
// components/ui/Progress.tsx
// Progress Component - The completion tracker
// Shows progress through tasks, loading states, or achievement

import React from 'react';
import { cn } from '@/lib/utils';

export type ProgressVariant = 'default' | 'success' | 'warning' | 'error' | 'quantum' | 'cosmic';
export type ProgressSize = 'sm' | 'md' | 'lg';

export interface ProgressProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Current progress value (0-100) */
  value: number;
  /** Maximum value (default 100) */
  max?: number;
  /** Visual variant */
  variant?: ProgressVariant;
  /** Size of the progress bar */
  size?: ProgressSize;
  /** Show percentage label */
  showLabel?: boolean;
  /** Label position */
  labelPosition?: 'left' | 'right' | 'top' | 'bottom';
  /** Animate the progress bar */
  animated?: boolean;
  /** Show striped pattern */
  striped?: boolean;
  /** Indeterminate state (loading) */
  indeterminate?: boolean;
}

const variantClasses: Record<ProgressVariant, string> = {
  default: 'bg-white/20',
  success: 'bg-green-500/20',
  warning: 'bg-yellow-500/20',
  error: 'bg-red-500/20',
  quantum: 'bg-quantum-purple/20',
  cosmic: 'bg-cosmic-blue/20',
};

const fillVariantClasses: Record<ProgressVariant, string> = {
  default: 'bg-white/60',
  success: 'bg-green-500',
  warning: 'bg-yellow-500',
  error: 'bg-red-500',
  quantum: 'bg-quantum-purple',
  cosmic: 'bg-cosmic-blue',
};

const sizeClasses: Record<ProgressSize, string> = {
  sm: 'h-1',
  md: 'h-2',
  lg: 'h-3',
};

/**
 * Progress Component
 * 
 * @example
 * <Progress value={65} />
 * 
 * @example
 * <Progress value={75} variant="success" showLabel />
 * 
 * @example
 * <Progress value={30} variant="quantum" size="lg" animated />
 */
export const Progress = React.forwardRef<HTMLDivElement, ProgressProps>(
  (
    {
      value,
      max = 100,
      variant = 'default',
      size = 'md',
      showLabel = false,
      labelPosition = 'right',
      animated = false,
      striped = false,
      indeterminate = false,
      className,
      ...props
    },
    ref
  ) => {
    const percentage = Math.min(100, Math.max(0, (value / max) * 100));
    
    const fillClasses = cn(
      'h-full rounded-full transition-all duration-300 ease-out',
      fillVariantClasses[variant],
      animated && 'transition-all',
      striped && 'bg-gradient-to-r from-transparent via-white/20 to-transparent bg-[length:1rem_1rem] animate-[stripe_1s_linear_infinite]'
    );
    
    const label = (
      <span className="text-xs font-medium text-white/60">
        {Math.round(percentage)}%
      </span>
    );
    
    const labelPositionClasses = {
      left: 'flex-row items-center gap-2',
      right: 'flex-row items-center gap-2',
      top: 'flex-col gap-1',
      bottom: 'flex-col gap-1',
    };
    
    const contentOrder = {
      left: () => (
        <>
          {label}
          <div className="flex-1">
            <div className={cn('w-full rounded-full overflow-hidden', variantClasses[variant], sizeClasses[size])}>
              <div
                className={fillClasses}
                style={{ width: indeterminate ? '100%' : `${percentage}%` }}
              />
            </div>
          </div>
        </>
      ),
      right: () => (
        <>
          <div className="flex-1">
            <div className={cn('w-full rounded-full overflow-hidden', variantClasses[variant], sizeClasses[size])}>
              <div
                className={fillClasses}
                style={{ width: indeterminate ? '100%' : `${percentage}%` }}
              />
            </div>
          </div>
          {label}
        </>
      ),
      top: () => (
        <>
          {label}
          <div className={cn('w-full rounded-full overflow-hidden', variantClasses[variant], sizeClasses[size])}>
            <div
              className={fillClasses}
              style={{ width: indeterminate ? '100%' : `${percentage}%` }}
            />
          </div>
        </>
      ),
      bottom: () => (
        <>
          <div className={cn('w-full rounded-full overflow-hidden', variantClasses[variant], sizeClasses[size])}>
            <div
              className={fillClasses}
              style={{ width: indeterminate ? '100%' : `${percentage}%` }}
            />
          </div>
          {label}
        </>
      ),
    };
    
    if (indeterminate) {
      return (
        <div
          ref={ref}
          className={cn(
            'w-full rounded-full overflow-hidden',
            variantClasses[variant],
            sizeClasses[size],
            className
          )}
          {...props}
        >
          <div
            className={cn(
              'h-full rounded-full animate-[indeterminate_1.5s_ease-in-out_infinite]',
              fillVariantClasses[variant]
            )}
            style={{ width: '30%' }}
          />
        </div>
      );
    }
    
    if (!showLabel) {
      return (
        <div
          ref={ref}
          className={cn(
            'w-full rounded-full overflow-hidden',
            variantClasses[variant],
            sizeClasses[size],
            className
          )}
          {...props}
        >
          <div
            className={fillClasses}
            style={{ width: `${percentage}%` }}
          />
        </div>
      );
    }
    
    return (
      <div
        ref={ref}
        className={cn(
          'flex',
          labelPositionClasses[labelPosition],
          className
        )}
        {...props}
      >
        {contentOrder[labelPosition]()}
      </div>
    );
  }
);

Progress.displayName = 'Progress';

// ============================================================================
// CIRCULAR PROGRESS
// ============================================================================

export interface CircularProgressProps extends React.SVGAttributes<SVGSVGElement> {
  /** Current progress value (0-100) */
  value: number;
  /** Maximum value (default 100) */
  max?: number;
  /** Size of the circle in pixels */
  size?: number;
  /** Stroke width */
  strokeWidth?: number;
  /** Visual variant */
  variant?: ProgressVariant;
  /** Show percentage label inside */
  showLabel?: boolean;
  /** Label format function */
  formatLabel?: (value: number) => string;
}

/**
 * CircularProgress Component - Circular progress indicator
 * 
 * @example
 * <CircularProgress value={75} size={80} />
 * 
 * @example
 * <CircularProgress value={100} variant="success" showLabel />
 */
export const CircularProgress = React.forwardRef<SVGSVGElement, CircularProgressProps>(
  (
    {
      value,
      max = 100,
      size = 60,
      strokeWidth = 4,
      variant = 'default',
      showLabel = false,
      formatLabel = (v) => `${Math.round(v)}%`,
      className,
      ...props
    },
    ref
  ) => {
    const percentage = Math.min(100, Math.max(0, (value / max) * 100));
    const radius = (size - strokeWidth) / 2;
    const circumference = radius * 2 * Math.PI;
    const strokeDashoffset = circumference - (percentage / 100) * circumference;
    
    const strokeColorClasses = {
      default: 'stroke-white/60',
      success: 'stroke-green-500',
      warning: 'stroke-yellow-500',
      error: 'stroke-red-500',
      quantum: 'stroke-quantum-purple',
      cosmic: 'stroke-cosmic-blue',
    };
    
    const trackColorClasses = {
      default: 'stroke-white/10',
      success: 'stroke-green-500/20',
      warning: 'stroke-yellow-500/20',
      error: 'stroke-red-500/20',
      quantum: 'stroke-quantum-purple/20',
      cosmic: 'stroke-cosmic-blue/20',
    };
    
    return (
      <div className="relative inline-flex items-center justify-center">
        <svg
          ref={ref}
          width={size}
          height={size}
          viewBox={`0 0 ${size} ${size}`}
          className={cn('transform -rotate-90', className)}
          {...props}
        >
          {/* Background circle */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            strokeWidth={strokeWidth}
            className={trackColorClasses[variant]}
          />
          {/* Progress circle */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            strokeWidth={strokeWidth}
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            className={cn(
              'transition-all duration-300 ease-out',
              strokeColorClasses[variant]
            )}
          />
        </svg>
        {showLabel && (
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-sm font-medium text-white">
              {formatLabel(percentage)}
            </span>
          </div>
        )}
      </div>
    );
  }
);
CircularProgress.displayName = 'CircularProgress';
```

---

## 📁 **`components/ui/Avatar.tsx`**

```tsx
// components/ui/Avatar.tsx
// Avatar Component - The user portrait
// Displays user profile images with fallback and status indicators

import React from 'react';
import { cn } from '@/lib/utils';
import { User } from 'lucide-react';

export type AvatarSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';
export type AvatarStatus = 'online' | 'offline' | 'away' | 'busy';

export interface AvatarProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Image source URL */
  src?: string | null;
  /** Alt text for image */
  alt?: string;
  /** Fallback text (initials) */
  fallback?: string;
  /** Size of the avatar */
  size?: AvatarSize;
  /** Shape of the avatar */
  shape?: 'circle' | 'square' | 'rounded';
  /** Status indicator */
  status?: AvatarStatus;
  /** Show border */
  bordered?: boolean;
  /** Border color variant */
  borderVariant?: 'default' | 'quantum' | 'cosmic' | 'gold';
}

const sizeClasses: Record<AvatarSize, string> = {
  xs: 'h-6 w-6 text-xs',
  sm: 'h-8 w-8 text-sm',
  md: 'h-10 w-10 text-base',
  lg: 'h-12 w-12 text-lg',
  xl: 'h-16 w-16 text-xl',
  '2xl': 'h-24 w-24 text-2xl',
};

const shapeClasses: Record<string, string> = {
  circle: 'rounded-full',
  square: 'rounded-none',
  rounded: 'rounded-lg',
};

const statusSizeClasses: Record<AvatarSize, string> = {
  xs: 'h-1.5 w-1.5',
  sm: 'h-2 w-2',
  md: 'h-2.5 w-2.5',
  lg: 'h-3 w-3',
  xl: 'h-4 w-4',
  '2xl': 'h-5 w-5',
};

const statusColorClasses: Record<AvatarStatus, string> = {
  online: 'bg-green-500',
  offline: 'bg-gray-500',
  away: 'bg-yellow-500',
  busy: 'bg-red-500',
};

const borderVariantClasses: Record<string, string> = {
  default: 'ring-1 ring-white/20',
  quantum: 'ring-2 ring-quantum-purple',
  cosmic: 'ring-2 ring-cosmic-blue',
  gold: 'ring-2 ring-yellow-500',
};

/**
 * Avatar Component
 * 
 * @example
 * <Avatar src="/user.jpg" alt="User" size="md" />
 * 
 * @example
 * <Avatar fallback="JD" size="lg" status="online" />
 * 
 * @example
 * <Avatar src="/user.jpg" bordered borderVariant="quantum" />
 */
export const Avatar = React.forwardRef<HTMLDivElement, AvatarProps>(
  (
    {
      src,
      alt = '',
      fallback,
      size = 'md',
      shape = 'circle',
      status,
      bordered = false,
      borderVariant = 'default',
      className,
      ...props
    },
    ref
  ) => {
    const [imgError, setImgError] = React.useState(false);
    
    const getInitials = (name: string) => {
      return name
        .split(' ')
        .map(part => part[0])
        .join('')
        .toUpperCase()
        .slice(0, 2);
    };
    
    const displayFallback = fallback || '?';
    const showImage = src && !imgError;
    
    return (
      <div
        ref={ref}
        className={cn(
          'relative inline-flex shrink-0 items-center justify-center overflow-hidden bg-white/10',
          sizeClasses[size],
          shapeClasses[shape],
          bordered && borderVariantClasses[borderVariant],
          className
        )}
        {...props}
      >
        {showImage ? (
          <img
            src={src}
            alt={alt}
            className="h-full w-full object-cover"
            onError={() => setImgError(true)}
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-white/5 text-white/60">
            {displayFallback.length === 1 ? (
              displayFallback
            ) : displayFallback.length === 2 ? (
              displayFallback
            ) : (
              <User className="h-1/2 w-1/2" />
            )}
          </div>
        )}
        
        {status && (
          <span
            className={cn(
              'absolute bottom-0 right-0 rounded-full ring-2 ring-white',
              statusSizeClasses[size],
              statusColorClasses[status]
            )}
          />
        )}
      </div>
    );
  }
);

Avatar.displayName = 'Avatar';

// ============================================================================
// AVATAR GROUP
// ============================================================================

export interface AvatarGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Avatars to display */
  avatars: Array<{
    src?: string | null;
    alt?: string;
    fallback?: string;
  }>;
  /** Size of avatars in the group */
  size?: AvatarSize;
  /** Maximum number of avatars to show */
  max?: number;
  /** Show remaining count as a badge */
  showRemaining?: boolean;
}

/**
 * AvatarGroup - Container for multiple avatars
 * 
 * @example
 * <AvatarGroup
 *   avatars={[
 *     { src: '/user1.jpg', alt: 'User 1' },
 *     { src: '/user2.jpg', alt: 'User 2' },
 *     { src: '/user3.jpg', alt: 'User 3' },
 *   ]}
 *   max={2}
 * />
 */
export const AvatarGroup = React.forwardRef<HTMLDivElement, AvatarGroupProps>(
  ({ avatars, size = 'md', max = 3, showRemaining = true, className, ...props }, ref) => {
    const visibleAvatars = avatars.slice(0, max);
    const remainingCount = avatars.length - visibleAvatars.length;
    
    return (
      <div
        ref={ref}
        className={cn('flex -space-x-2', className)}
        {...props}
      >
        {visibleAvatars.map((avatar, index) => (
          <Avatar
            key={index}
            src={avatar.src}
            alt={avatar.alt}
            fallback={avatar.fallback}
            size={size}
            className="ring-2 ring-white"
          />
        ))}
        {showRemaining && remainingCount > 0 && (
          <Avatar
            fallback={`+${remainingCount}`}
            size={size}
            className="ring-2 ring-white bg-white/20"
          />
        )}
      </div>
    );
  }
);
AvatarGroup.displayName = 'AvatarGroup';
```

---

## 📋 **DATA DISPLAY COMPONENTS SUMMARY**

| Component | Purpose | Status |
|-----------|---------|--------|
| **Table** | Structured data grid with sorting | ✅ |
| **Badge** | Status and category indicators | ✅ |
| **Progress** | Linear and circular progress tracking | ✅ |
| **Avatar** | User profile images with status | ✅ |

---

## 🏛️ **COMPLETE REFERENCE FILES**

We now have:

```
accordians.md
aspectratios.md
avatars.md
badges.md
cards.md
containers.md
data-display.md (new)
dividers.md
flex.md
form-components.md
grids.md
progress.md (in data-display)
scroll-areas.md
sections.md
skeletons.md
spacers.md
stacks.md
tables.md (in data-display)
tabs.md
```

