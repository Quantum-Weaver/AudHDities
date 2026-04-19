// components/ui/Avatar.tsx
// Avatar Component - The visual representation of sovereignty
// Provides consistent user/member avatars across the Sanctuary
// Uses COSMIC design tokens for sizing and styling

"use client"

import * as React from "react"
import { Avatar as AvatarPrimitive } from "@base-ui/react/avatar"
import { cn } from "@/lib/utils"

export type AvatarSize = "xs" | "sm" | "default" | "lg" | "xl" | "2xl" | "3xl" | "4xl"
export type AvatarStatus = "online" | "offline" | "away" | "busy" | "none"
export type AvatarVariant = "default" | "quantum" | "cosmic" | "fire" | "hearth" | "sanctuary"

export interface AvatarProps extends AvatarPrimitive.Root.Props {
  /** Size of the avatar */
  size?: AvatarSize
  /** Status indicator (online/offline/away/busy) */
  status?: AvatarStatus
  /** Visual variant for the avatar ring */
  variant?: AvatarVariant
  /** Make avatar interactive (adds hover effects) */
  interactive?: boolean
  /** Add a subtle glow effect */
  glow?: boolean
  src?: string
  alt?: string
}

/**
 * Size mappings (in pixels)
 */
const sizeMap: Record<AvatarSize, string> = {
  xs: "size-6",      // 24px
  sm: "size-8",      // 32px
  default: "size-10", // 40px
  lg: "size-12",     // 48px
  xl: "size-14",     // 56px
  "2xl": "size-16",  // 64px
  "3xl": "size-20",  // 80px
  "4xl": "size-24",  // 96px
}

/**
 * Status indicator colors and positioning
 */
const statusMap: Record<AvatarStatus, string> = {
  online: "bg-green-500",
  offline: "bg-white/20",
  away: "bg-yellow-500",
  busy: "bg-red-500",
  none: "hidden",
}

const statusSizeMap: Record<AvatarSize, string> = {
  xs: "size-1.5",
  sm: "size-2",
  default: "size-2.5",
  lg: "size-3",
  xl: "size-3.5",
  "2xl": "size-4",
  "3xl": "size-5",
  "4xl": "size-6",
}

/**
 * Variant ring colors
 */
const variantRingMap: Record<AvatarVariant, string> = {
  default: "ring-white/20",
  quantum: "ring-cyan-500/50",
  cosmic: "ring-blue-500/50",
  fire: "ring-orange-500/50",
  hearth: "ring-amber-500/50",
  sanctuary: "ring-purple-500/50",
}

/**
 * Avatar Component
 * 
 * A flexible component for user/member avatars.
 * 
 * @example
 * <Avatar src="/user.jpg" alt="User" />
 * 
 * @example
 * <Avatar size="lg" status="online" />
 * 
 * @example
 * <Avatar size="2xl" variant="quantum" glow>
 *   <AvatarImage src="/avatar.jpg" />
 *   <AvatarFallback>JD</AvatarFallback>
 * </Avatar>
 */
function Avatar({
  className,
  size = "default",
  status = "none",
  variant = "default",
  interactive = false,
  glow = false,
  ...props
}: AvatarProps) {
  return (
    <AvatarPrimitive.Root
      data-slot="avatar"
      data-size={size}
      data-status={status}
      data-variant={variant}
      className={cn(
        "group/avatar relative flex shrink-0 select-none",
        sizeMap[size],
        "rounded-full",
        variantRingMap[variant],
        "ring-2 ring-offset-2 ring-offset-deep-space",
        interactive && "cursor-pointer transition-all duration-200 hover:scale-105 hover:ring-cyan-400",
        glow && "shadow-[0_0_15px_currentColor]",
        className
      )}
      {...props}
    />
  )
}

Avatar.displayName = "Avatar"

export interface AvatarImageProps extends AvatarPrimitive.Image.Props {
  /** Alt text for the image */
  alt?: string
}

/**
 * AvatarImage - The image within the avatar
 */
function AvatarImage({ className, alt, ...props }: AvatarImageProps) {
  return (
    <AvatarPrimitive.Image
      data-slot="avatar-image"
      className={cn(
        "aspect-square size-full rounded-full object-cover",
        className
      )}
      alt={alt}
      {...props}
    />
  )
}

AvatarImage.displayName = "AvatarImage"

export interface AvatarFallbackProps extends AvatarPrimitive.Fallback.Props {
  /** Delay before showing fallback (ms) */
  delayMs?: number
}

/**
 * AvatarFallback - Shown when image fails to load
 * Displays user initials or a default icon
 */
function AvatarFallback({ className, children, delayMs = 600, ...props }: AvatarFallbackProps) {
  return (
    <AvatarPrimitive.Fallback
      data-slot="avatar-fallback"
      className={cn(
        "flex size-full items-center justify-center rounded-full bg-gradient-to-br from-white/10 to-white/5",
        "text-sm font-medium text-white/60",
        "group-data-[size=xs]/avatar:text-[8px] group-data-[size=sm]/avatar:text-[10px]",
        "group-data-[size=lg]/avatar:text-base group-data-[size=xl]/avatar:text-lg",
        "group-data-[size=2xl]/avatar:text-xl group-data-[size=3xl]/avatar:text-2xl group-data-[size=4xl]/avatar:text-3xl",
        className
      )}
      delay={delayMs}
      {...props}
    >
      {children || (
        <svg className="size-1/2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
        </svg>
      )}
    </AvatarPrimitive.Fallback>
  )
}

AvatarFallback.displayName = "AvatarFallback"

export interface AvatarBadgeProps extends React.ComponentProps<"span"> {
  /** Position of the badge */
  position?: "bottom-right" | "top-right" | "bottom-left" | "top-left"
}

/**
 * AvatarBadge - A badge overlay on the avatar (e.g., verified check, role icon)
 * 
 * @example
 * <Avatar>
 *   <AvatarImage src="/user.jpg" />
 *   <AvatarBadge>✓</AvatarBadge>
 * </Avatar>
 */
function AvatarBadge({ className, position = "bottom-right", children, ...props }: AvatarBadgeProps) {
  const positionMap: Record<string, string> = {
    "bottom-right": "right-0 bottom-0",
    "top-right": "right-0 top-0",
    "bottom-left": "left-0 bottom-0",
    "top-left": "left-0 top-0",
  }
  
  return (
    <span
      data-slot="avatar-badge"
      className={cn(
        "absolute z-10 flex items-center justify-center rounded-full",
        "bg-gradient-to-br from-cyan-500 to-purple-500 text-white",
        "ring-2 ring-deep-space",
        positionMap[position],
        // Size variations based on parent avatar size
        "group-data-[size=xs]/avatar:size-2.5 group-data-[size=xs]/avatar:text-[6px]",
        "group-data-[size=sm]/avatar:size-3 group-data-[size=sm]/avatar:text-[8px]",
        "group-data-[size=default]/avatar:size-3.5 group-data-[size=default]/avatar:text-[8px]",
        "group-data-[size=lg]/avatar:size-4 group-data-[size=lg]/avatar:text-[10px]",
        "group-data-[size=xl]/avatar:size-5 group-data-[size=xl]/avatar:text-xs",
        "group-data-[size=2xl]/avatar:size-6 group-data-[size=2xl]/avatar:text-sm",
        "group-data-[size=3xl]/avatar:size-7 group-data-[size=3xl]/avatar:text-base",
        "group-data-[size=4xl]/avatar:size-8 group-data-[size=4xl]/avatar:text-lg",
        className
      )}
      {...props}
    >
      {children}
    </span>
  )
}

AvatarBadge.displayName = "AvatarBadge"

export interface AvatarStatusIndicatorProps {
  status?: AvatarStatus
  size?: AvatarSize
}

/**
 * AvatarStatusIndicator - Standalone status indicator for avatars
 */
function AvatarStatusIndicator({ status = "none", size = "default" }: AvatarStatusIndicatorProps) {
  if (status === "none") return null
  
  return (
    <span
      className={cn(
        "absolute right-0 bottom-0 rounded-full ring-2 ring-deep-space",
        statusMap[status],
        statusSizeMap[size]
      )}
    />
  )
}

AvatarStatusIndicator.displayName = "AvatarStatusIndicator"

export interface AvatarGroupProps extends React.ComponentProps<"div"> {
  /** Maximum number of avatars to show */
  max?: number
  /** Size of avatars in the group */
  size?: AvatarSize
}

/**
 * AvatarGroup - A stack of overlapping avatars
 * 
 * @example
 * <AvatarGroup>
 *   <Avatar src="/user1.jpg" />
 *   <Avatar src="/user2.jpg" />
 *   <Avatar src="/user3.jpg" />
 * </AvatarGroup>
 */
function AvatarGroup({ className, children, max, size = "default", ...props }: AvatarGroupProps) {
  const childrenArray = React.Children.toArray(children)
  const visibleChildren = max ? childrenArray.slice(0, max) : childrenArray
  const remainingCount = max && childrenArray.length > max ? childrenArray.length - max : 0
  
  return (
    <div
      data-slot="avatar-group"
      data-size={size}
      className={cn(
        "group/avatar-group flex -space-x-2",
        "[&_[data-slot=avatar]]:ring-2 [&_[data-slot=avatar]]:ring-deep-space",
        className
      )}
      {...props}
    >
      {React.Children.map(visibleChildren, (child, i) => (
        <div key={i} className="transition-transform duration-200 hover:translate-y-[-2px]">
          {child}
        </div>
      ))}
      {remainingCount > 0 && (
        <Avatar
          size={size}
          className="ring-2 ring-deep-space"
        >
          <AvatarFallback className="bg-gradient-to-br from-white/20 to-white/10 text-white/80">
            +{remainingCount}
          </AvatarFallback>
        </Avatar>
      )}
    </div>
  )
}

AvatarGroup.displayName = "AvatarGroup"

// ============================================================================
// VARIANT SHORTCUTS
// ============================================================================

/**
 * QuantumAvatar - Avatar with quantum-themed ring
 */
function QuantumAvatar(props: Omit<AvatarProps, "variant">) {
  return <Avatar variant="quantum" {...props} />
}
QuantumAvatar.displayName = "QuantumAvatar"

/**
 * CosmicAvatar - Avatar with cosmic-themed ring
 */
function CosmicAvatar(props: Omit<AvatarProps, "variant">) {
  return <Avatar variant="cosmic" {...props} />
}
CosmicAvatar.displayName = "CosmicAvatar"

/**
 * GlowingAvatar - Avatar with glow effect
 */
function GlowingAvatar(props: Omit<AvatarProps, "glow">) {
  return <Avatar glow {...props} />
}
GlowingAvatar.displayName = "GlowingAvatar"

/**
 * InteractiveAvatar - Avatar with hover effects
 */
function InteractiveAvatar(props: Omit<AvatarProps, "interactive">) {
  return <Avatar interactive {...props} />
}
InteractiveAvatar.displayName = "InteractiveAvatar"

// ============================================================================
// EXPORTS
// ============================================================================

export {
  Avatar,
  AvatarImage,
  AvatarFallback,
  AvatarBadge,
  AvatarStatusIndicator,
  AvatarGroup,
  QuantumAvatar,
  CosmicAvatar,
  GlowingAvatar,
  InteractiveAvatar,
}